"use client";

import { useDeferredValue, useState } from "react";

export function useMenuFilters(items) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [item.name, item.description, item.category].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      );

    return matchesCategory && matchesQuery;
  });

  const groupedItems = filteredItems.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }

    groups[item.category].push(item);
    return groups;
  }, {});

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    filteredItems,
    groupedItems
  };
}

