"use client";

import { Heart, Sparkles } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useMenuFilters } from "@/hooks/use-menu-filters";
import { FiltersBar } from "@/components/menu/filters-bar";
import { DishCard } from "@/components/menu/dish-card";
import { EmptyState } from "@/components/ui/empty-state";

export function FavoritesExperience({ user, favoriteItems, initialFavoriteIds }) {
  const { query, setQuery, activeCategory, setActiveCategory, filteredItems } =
    useMenuFilters(favoriteItems);
  const { favoriteIds, pendingItemIds, toggleFavorite } = useFavorites(
    user.id,
    initialFavoriteIds
  );

  const categoryCounts = favoriteItems.reduce(
    (counts, item) => {
      counts.All += 1;
      counts[item.category] = (counts[item.category] || 0) + 1;
      return counts;
    },
    {
      All: 0
    }
  );

  return (
    <div className="space-y-10">
      <section className="glass-panel rounded-[2.25rem] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-accent-gold">Your saved dining list</p>
        <h1 className="mt-4 text-5xl font-semibold text-white sm:text-6xl">Favorites</h1>
        <p className="mt-5 max-w-3xl text-sm leading-8 text-white/68 sm:text-base">
          Every favorite is stored per user in Supabase, so you can return to your go-to plates
          whenever you sign in.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
            <Heart className="h-5 w-5 text-accent-coral" />
            <p className="mt-3 text-sm text-white/50">Saved dishes</p>
            <p className="mt-1 text-lg font-semibold text-white">{favoriteItems.length}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
            <Sparkles className="h-5 w-5 text-accent-mint" />
            <p className="mt-3 text-sm text-white/50">Synced live</p>
            <p className="mt-1 text-lg font-semibold text-white">Across menu and favorites</p>
          </div>
        </div>
      </section>

      <FiltersBar
        activeCategory={activeCategory}
        categoryCounts={categoryCounts}
        query={query}
        setActiveCategory={setActiveCategory}
        setQuery={setQuery}
      />

      {favoriteItems.length === 0 ? (
        <EmptyState
          ctaHref="/menu"
          ctaLabel="Browse the menu"
          description="You have not saved any dishes yet. Explore the menu and tap the heart button to build your personal shortlist."
          title="No favorites yet"
        />
      ) : null}

      {favoriteItems.length > 0 && filteredItems.length === 0 ? (
        <EmptyState
          description="No saved dishes match your current search. Try another term or switch categories."
          title="Nothing matched this filter"
        />
      ) : null}

      {filteredItems.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <DishCard
              isFavorite={favoriteIds.includes(item.id)}
              isPending={pendingItemIds.includes(item.id)}
              item={item}
              key={item.id}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

