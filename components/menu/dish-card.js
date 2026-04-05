import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { cn, formatCurrency } from "@/lib/utils";

export function DishCard({ item, isFavorite, isPending, onToggleFavorite }) {
  return (
    <article className="glass-panel group overflow-hidden rounded-[1.85rem]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          alt={item.name}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={item.image_url}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl">
          <StarRating value={item.rating} />
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">{item.category}</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">{item.name}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-sm font-semibold text-accent-gold">
            {formatCurrency(item.price)}
          </span>
        </div>

        <p className="text-sm leading-7 text-white/65">{item.description}</p>

        <Button
          className={cn(
            "w-full justify-center rounded-2xl",
            isFavorite ? "bg-white text-base-950 hover:brightness-95" : ""
          )}
          disabled={isPending}
          onClick={() => onToggleFavorite(item.id)}
          variant={isFavorite ? "secondary" : "ghost"}
        >
          <Heart className={cn("h-4 w-4", isFavorite ? "fill-current text-accent-coral" : "")} />
          {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
        </Button>
      </div>
    </article>
  );
}

