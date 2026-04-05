import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function getSessionUser() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function getProfile(userId) {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, role, created_at")
    .eq("id", userId)
    .maybeSingle();

  return data;
}

export async function getMenuItems() {
  const supabase = createClient();
  const { data } = await supabase
    .from("menu_items")
    .select("id, name, description, price, category, image_url, rating, created_at, updated_at")
    .order("category", {
      ascending: true
    })
    .order("rating", {
      ascending: false
    });

  return data ?? [];
}

export async function getFavoriteIds(userId) {
  const supabase = createClient();
  const { data } = await supabase
    .from("favorites")
    .select("menu_item_id")
    .eq("user_id", userId);

  return (data ?? []).map((item) => item.menu_item_id);
}

export async function getFavoriteItems(userId) {
  const supabase = createClient();
  const { data } = await supabase
    .from("favorites")
    .select(
      `
        id,
        created_at,
        menu_item:menu_items (
          id,
          name,
          description,
          price,
          category,
          image_url,
          rating,
          created_at,
          updated_at
        )
      `
    )
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false
    });

  return (data ?? [])
    .map((item) => item.menu_item)
    .filter(Boolean);
}

export async function getMenuPageData() {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const [profile, menuItems, favoriteIds] = await Promise.all([
    getProfile(user.id),
    getMenuItems(),
    getFavoriteIds(user.id)
  ]);

  return {
    user,
    profile,
    menuItems,
    favoriteIds
  };
}

export async function getFavoritesPageData() {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const [profile, favoriteItems, favoriteIds] = await Promise.all([
    getProfile(user.id),
    getFavoriteItems(user.id),
    getFavoriteIds(user.id)
  ]);

  return {
    user,
    profile,
    favoriteItems,
    favoriteIds
  };
}

