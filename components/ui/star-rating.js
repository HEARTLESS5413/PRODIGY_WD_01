import { Star } from "lucide-react";

export function StarRating({ value }) {
  return (
    <div className="flex items-center gap-1 text-accent-gold">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index + 1 <= Math.round(value);
        return (
          <Star
            key={index}
            className={`h-4 w-4 ${filled ? "fill-current text-accent-gold" : "text-white/20"}`}
          />
        );
      })}
      <span className="ml-1 text-xs font-medium text-white/65">{value.toFixed(1)}</span>
    </div>
  );
}
