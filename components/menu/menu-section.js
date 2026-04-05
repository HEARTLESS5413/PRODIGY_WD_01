import { DishCard } from "@/components/menu/dish-card";

export function MenuSection({
  title,
  items,
  favoriteIds,
  isAdmin,
  pendingItemIds,
  onToggleFavorite
}) {
  return (
    <section className="space-y-6" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-white/45">Curated category</p>
          <h2 className="mt-2 text-4xl font-semibold text-white">{title}</h2>
        </div>
        <p className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/55">
          {items.length} dishes
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <DishCard
            isFavorite={favoriteIds.includes(item.id)}
            isAdmin={isAdmin}
            isPending={pendingItemIds.includes(item.id)}
            item={item}
            key={item.id}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
