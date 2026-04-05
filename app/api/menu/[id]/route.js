import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/admin";
import { validateMenuPayload } from "@/lib/menu-validation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

function validateUpdatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request payload.";
  }

  if (
    payload.price !== undefined &&
    (Number.isNaN(Number(payload.price)) || Number(payload.price) <= 0)
  ) {
    return "Price must be a positive number.";
  }

  if (
    payload.rating !== undefined &&
    (Number.isNaN(Number(payload.rating)) || Number(payload.rating) < 1 || Number(payload.rating) > 5)
  ) {
    return "Rating must be between 1 and 5.";
  }

  return null;
}

async function requireAdminUser() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    };
  }

  if (!isAdminUser(user)) {
    return {
      error: NextResponse.json({ error: "Only admin users can manage menu items." }, { status: 403 })
    };
  }

  return {
    user
  };
}

export async function PATCH(request, { params }) {
  const adminCheck = await requireAdminUser();

  if (adminCheck.error) {
    return adminCheck.error;
  }

  const payload = await request.json();
  const isFullEdit =
    payload.name !== undefined ||
    payload.description !== undefined ||
    payload.category !== undefined ||
    payload.image_url !== undefined;

  const validationError = isFullEdit ? validateMenuPayload(payload) : validateUpdatePayload(payload);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const updateValues = {};

  ["name", "description", "category", "image_url"].forEach((field) => {
    if (payload[field] !== undefined) {
      updateValues[field] = payload[field];
    }
  });

  if (payload.price !== undefined) {
    updateValues.price = Number(payload.price);
  }

  if (payload.rating !== undefined) {
    updateValues.rating = Number(payload.rating);
  }

  if (payload.is_available !== undefined) {
    updateValues.is_available = Boolean(payload.is_available);
  }

  const adminClient = getSupabaseAdminClient();
  const { data, error } = await adminClient
    .from("menu_items")
    .update(updateValues)
    .eq("id", params.id)
    .select("id, name, is_available")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    item: data,
    message: `${data.name} has been updated.`
  });
}

export async function DELETE(_request, { params }) {
  const adminCheck = await requireAdminUser();

  if (adminCheck.error) {
    return adminCheck.error;
  }

  const adminClient = getSupabaseAdminClient();
  const { error } = await adminClient.from("menu_items").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Dish deleted successfully."
  });
}
