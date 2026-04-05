import { DishCardSkeleton } from "@/components/menu/dish-card-skeleton";

export default function ProtectedLoading() {
  return (
    <div className="space-y-8">
      <div className="glass-panel h-60 animate-pulse rounded-[2rem]" />
      <div className="glass-panel h-20 animate-pulse rounded-[2rem]" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <DishCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

