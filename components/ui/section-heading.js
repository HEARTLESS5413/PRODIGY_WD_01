export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-accent-gold">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-4xl font-semibold text-white sm:text-5xl">{title}</h2>
      {description ? (
        <p className="text-sm leading-7 text-white/70 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}

