"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-base-950 px-6 text-white">
        <div className="glass-panel max-w-xl rounded-[2rem] px-8 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-accent-gold">Something broke</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">The dining room hit a snag.</h1>
          <p className="mt-4 text-sm leading-7 text-white/65">
            Check your environment variables and Supabase configuration, then try loading the page
            again.
          </p>
          <Button className="mt-8" onClick={reset}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}

