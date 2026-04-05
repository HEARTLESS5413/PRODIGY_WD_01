export function DishCardSkeleton() {
  return (
    <div className="glass-panel overflow-hidden rounded-[1.85rem]">
      <div className="aspect-[4/3] animate-pulse bg-white/6" />
      <div className="space-y-4 p-5">
        <div className="h-4 w-24 animate-pulse rounded-full bg-white/8" />
        <div className="h-8 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div className="space-y-2">
          <div className="h-3 animate-pulse rounded-full bg-white/8" />
          <div className="h-3 w-11/12 animate-pulse rounded-full bg-white/8" />
          <div className="h-3 w-4/5 animate-pulse rounded-full bg-white/8" />
        </div>
        <div className="h-11 animate-pulse rounded-2xl bg-white/8" />
      </div>
    </div>
  );
}

