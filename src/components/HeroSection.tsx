import React from "react";

interface HeroSectionProps {
  badge?: string;
  headline: string;
  description?: string;
  ctaButtons?: Array<{
    label: string;
    isPrimary?: boolean;
    href?: string; // <-- use href instead of onClick
  }>;
  backgroundImageUrl?: string;
}

function HeroSection({
  badge,
  headline,
  description,
  ctaButtons = [],
  backgroundImageUrl,
}: HeroSectionProps) {
  const textColorClass = backgroundImageUrl ? "text-white" : "text-foreground";
  const descriptionColorClass = backgroundImageUrl
    ? "text-white/80"
    : "text-muted-foreground";
  const badgeStyleClass = backgroundImageUrl
    ? "border-white/20 bg-white/10 text-white"
    : "border-secondary/40 bg-background/70 text-primary";

  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-4">
      {backgroundImageUrl ? (
        <>
          {/* Decorative only; headline describes the section. */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(68,157,209,0.18),transparent_36%),radial-gradient(circle_at_88%_20%,rgba(244,159,4,0.1),transparent_34%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          {badge && (
            <p
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm ${badgeStyleClass}`}
            >
              {badge}
            </p>
          )}

          <h1
            className={`font-brand-display mt-6 text-5xl md:text-6xl font-extrabold leading-tight ${textColorClass}`}
          >
            {headline}
          </h1>

          {description && (
            <p
              className={`mt-6 text-lg leading-8 ${descriptionColorClass} max-w-2xl`}
            >
              {description}
            </p>
          )}

          {ctaButtons.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {ctaButtons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    btn.isPrimary
                      ? "bg-primary text-primary-foreground hover:-translate-y-0.5 shadow-[0_12px_28px_-16px_var(--color-primary)]"
                      : "border border-secondary/45 bg-background/70 text-primary hover:border-secondary hover:bg-background"
                  }`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
