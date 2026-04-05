import Image from "next/image";
import Link from "next/link";

export function Logo({ href = "/", compact = false }) {
  return (
    <Link className="inline-flex items-center gap-3" href={href}>
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Image alt="Noir Table logo" fill priority sizes="44px" src="/logo-mark.svg" />
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-2xl tracking-tight text-white">Noir Table</span>
          <span className="text-[11px] uppercase tracking-[0.34em] text-white/45">
            Private Dining Club
          </span>
        </span>
      ) : null}
    </Link>
  );
}
