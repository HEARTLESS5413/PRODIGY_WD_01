import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/admin";
import { curatedMenuSeed } from "@/lib/menu-seed";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const adminClient = getSupabaseAdminClient();
    const isAdmin = isAdminUser(user);

    const { count } = await adminClient.from("menu_items").select("id", { count: "exact", head: true });

    if ((count ?? 0) > 0 && !isAdmin) {
      return NextResponse.json(
        {
          error: "The sample menu has already been loaded. Only configured admin users can reseed it."
        },
        { status: 403 }
      );
    }

    const { error } = await adminClient.from("menu_items").upsert(curatedMenuSeed, {
      onConflict: "name"
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message:
        count > 0
          ? "Chef-curated sample menu refreshed."
          : "Chef-curated sample menu loaded successfully."
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to seed the menu. Check your service role key."
      },
      { status: 500 }
    );
  }
}
