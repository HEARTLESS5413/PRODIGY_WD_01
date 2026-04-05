"use client";

import { motion } from "framer-motion";
import { Heart, SearchCode, ShieldCheck, Sparkles } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useMenuFilters } from "@/hooks/use-menu-filters";
import { formatCurrency } from "@/lib/utils";
import { ChefDesk } from "@/components/menu/chef-desk";
import { FiltersBar } from "@/components/menu/filters-bar";
import { MenuSection } from "@/components/menu/menu-section";
import { SeedMenuButton } from "@/components/menu/seed-menu-button";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";

export function MenuExperience({ user, profile, isAdmin, menuItems, initialFavoriteIds }) {
  const { query, setQuery, activeCategory, setActiveCategory, filteredItems, groupedItems } =
    useMenuFilters(menuItems);
  const { favoriteIds, pendingItemIds, toggleFavorite } = useFavorites(
    user.id,
    initialFavoriteIds
  );

  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Guest";
  const availableCount = menuItems.filter((item) => item.is_available).length;
  const unavailableCount = menuItems.length - availableCount;

  const categoryCounts = menuItems.reduce(
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
      <section className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-[2.25rem] p-6 sm:p-8"
          initial={{ opacity: 0, y: 16 }}
        >
          <p className="text-xs uppercase tracking-[0.34em] text-accent-gold">Welcome back</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold text-white sm:text-6xl">
            Your next favorite plate is waiting, {displayName.split(" ")[0]}.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/68 sm:text-base">
            Explore a living menu, save the dishes you love, and keep every choice tied to your
            secure account.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Curated menu",
                value: `${menuItems.length} dishes`
              },
              {
                icon: Heart,
                title: "Favorites saved",
                value: `${favoriteIds.length} selections`
              },
              {
                icon: ShieldCheck,
                title: isAdmin ? "Admin access" : "Logged in as",
                value: isAdmin ? "Full menu control" : user.email
              }
            ].map((stat) => (
              <div key={stat.title} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <stat.icon className="h-5 w-5 text-accent-gold" />
                <p className="mt-4 text-sm text-white/50">{stat.title}</p>
                <p className="mt-1 text-lg font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="gradient-border rounded-[2.25rem] p-6"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.06 }}
        >
          <div className="glass-panel h-full rounded-[1.75rem] p-6">
            <SectionHeading
              eyebrow="Tonight's spotlight"
              title="Dining intelligence at a glance"
              description="Search, filter, and return to your favorites with zero friction."
            />
            <div className="mt-8 space-y-4">
              {[
                {
                  icon: SearchCode,
                  title: "Smart search",
                  description: "Find dishes by flavor, ingredient story, or category in real time."
                },
                {
                  icon: Heart,
                  title: "Instant favorites",
                  description: "Save dishes with a single tap and see updates reflected live."
                },
                {
                  icon: Sparkles,
                  title: "Premium data design",
                  description: `Average ticket: ${formatCurrency(
                    menuItems.reduce((sum, item) => sum + Number(item.price), 0) /
                      Math.max(menuItems.length, 1)
                  )}`
                },
                {
                  icon: ShieldCheck,
                  title: isAdmin ? "Availability control" : "Live availability",
                  description: `${availableCount} available, ${unavailableCount} unavailable`
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/8 bg-black/25 px-4 py-4"
                >
                  <item.icon className="h-5 w-5 text-accent-mint" />
                  <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <FiltersBar
        activeCategory={activeCategory}
        categoryCounts={categoryCounts}
        query={query}
        setActiveCategory={setActiveCategory}
        setQuery={setQuery}
      />

      {menuItems.length === 0 ? (
        <EmptyState
          action={<SeedMenuButton />}
          description="Your database is ready, but the menu is empty. Load the curated sample menu or publish dishes from the Chef Desk once you configure an admin email."
          title="Your restaurant menu is ready for its first service"
        />
      ) : null}

      {isAdmin ? <ChefDesk /> : null}

      {menuItems.length > 0 && filteredItems.length === 0 ? (
        <EmptyState
          description="No dishes match your current search and category filters. Try another keyword or switch back to all categories."
          title="No dishes matched this search"
        />
      ) : null}

      {Object.entries(groupedItems).map(([title, items], index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 18 }}
          key={title}
          transition={{ delay: index * 0.04 }}
        >
          <MenuSection
            favoriteIds={favoriteIds}
            isAdmin={isAdmin}
            items={items}
            pendingItemIds={pendingItemIds}
            title={title}
            onToggleFavorite={toggleFavorite}
          />
        </motion.div>
      ))}
    </div>
  );
}
