import { Search } from "lucide-react";
import { categories } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function FiltersBar({
  activeCategory,
  categoryCounts,
  query,
  setActiveCategory,
  setQuery
}) {
  return (
    <div className="glass-panel rounded-[2rem] p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <Input
            className="pl-11"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search dishes, flavors, or categories..."
            value={query}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const count = categoryCounts[category] ?? 0;

            return (
              <button
                key={category}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition duration-300",
                  isActive
                    ? "border-accent-gold/40 bg-accent-gold/12 text-white"
                    : "border-white/10 bg-white/4 text-white/60 hover:border-white/20 hover:text-white"
                )}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
                <span className="ml-2 text-white/45">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

