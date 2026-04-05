import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function validateMenuPayload(payload) {
  const requiredFields = ["name", "description", "price", "category", "image_url", "rating"];
  const missingField = requiredFields.find((field) => payload[field] === undefined || payload[field] === "");

  if (missingField) {
    return `Missing required field: ${missingField}`;
  }

  if (Number.isNaN(Number(payload.price)) || Number(payload.price) <= 0) {
    return "Price must be a positive number.";
  }

  if (Number.isNaN(Number(payload.rating)) || Number(payload.rating) < 1 || Number(payload.rating) > 5) {
    return "Rating must be between 1 and 5.";
  }

  return null;
}

export async function POST(request) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Only admin users can publish menu items." }, { status: 403 });
  }

  const payload = await request.json();
  const validationError = validateMenuPayload(payload);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("menu_items")
    .insert({
      name: payload.name,
      description: payload.description,
      price: Number(payload.price),
      category: payload.category,
      image_url: payload.image_url,
      rating: Number(payload.rating)
    })
    .select("id, name")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    item: data,
    message: `${data.name} has been added to the menu.`
  });
}

