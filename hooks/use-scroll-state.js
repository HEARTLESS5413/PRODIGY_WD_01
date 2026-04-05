"use client";

import { useEffect, useState } from "react";

export function useScrollState(offset = 16) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > offset);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return hasScrolled;
}

