"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function useFavorites(userId, initialFavoriteIds = []) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [favoriteIds, setFavoriteIds] = useState(initialFavoriteIds);
  const [pendingItemIds, setPendingItemIds] = useState([]);

  useEffect(() => {
    setFavoriteIds(initialFavoriteIds);
  }, [initialFavoriteIds]);

  useEffect(() => {
    if (!userId) {
      return undefined;
    }

    const channel = supabase
      .channel(`favorites:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "favorites",
          filter: `user_id=eq.${userId}`
        },
        async () => {
          const { data, error } = await supabase
            .from("favorites")
            .select("menu_item_id")
            .eq("user_id", userId);

          if (!error) {
            setFavoriteIds((data ?? []).map((item) => item.menu_item_id));
            startTransition(() => router.refresh());
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase, userId]);

  async function toggleFavorite(menuItemId) {
    if (!userId) {
      toast.error("Please log in to save favorites.");
      return;
    }

    const isAlreadyFavorite = favoriteIds.includes(menuItemId);
    const optimisticFavorites = isAlreadyFavorite
      ? favoriteIds.filter((id) => id !== menuItemId)
      : [...favoriteIds, menuItemId];

    setFavoriteIds(optimisticFavorites);
    setPendingItemIds((current) => [...new Set([...current, menuItemId])]);

    const query = supabase.from("favorites");
    const { error } = isAlreadyFavorite
      ? await query.delete().eq("user_id", userId).eq("menu_item_id", menuItemId)
      : await query.insert({
          user_id: userId,
          menu_item_id: menuItemId
        });

    if (error) {
      setFavoriteIds(favoriteIds);
      toast.error(error.message);
    } else {
      toast.success(isAlreadyFavorite ? "Removed from favorites." : "Added to favorites.");
      startTransition(() => router.refresh());
    }

    setPendingItemIds((current) => current.filter((id) => id !== menuItemId));
  }

  return {
    favoriteIds,
    pendingItemIds,
    toggleFavorite
  };
}

