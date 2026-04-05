import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, ctaLabel, ctaHref, action }) {
  return (
    <div className="glass-panel flex flex-col items-center gap-5 rounded-[2rem] px-6 py-12 text-center sm:px-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/8">
        <Sparkles className="h-6 w-6 text-accent-gold" />
      </div>
      <div className="space-y-3">
        <h3 className="text-3xl font-semibold text-white">{title}</h3>
        <p className="mx-auto max-w-xl text-sm leading-7 text-white/65 sm:text-base">{description}</p>
      </div>
      {ctaHref ? (
        <Link href={ctaHref}>
          <Button>{ctaLabel}</Button>
        </Link>
      ) : null}
      {!ctaHref && action ? action : null}
    </div>
  );
}

