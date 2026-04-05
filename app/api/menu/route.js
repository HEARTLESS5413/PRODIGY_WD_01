import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/admin";
import { validateMenuPayload } from "@/lib/menu-validation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isAdminUser(user)) {
    return NextResponse.json({ error: "Only admin users can publish menu items." }, { status: 403 });
  }

  const payload = await request.json();
  const validationError = validateMenuPayload(payload);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const adminClient = getSupabaseAdminClient();

  const { data, error } = await adminClient
    .from("menu_items")
    .insert({
      name: payload.name,
      description: payload.description,
      price: Number(payload.price),
      category: payload.category,
      image_url: payload.image_url,
      rating: Number(payload.rating),
      is_available: payload.is_available ?? true
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
