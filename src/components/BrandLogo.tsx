import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Official UMES logos (May 2025 brand kit).
 *
 * Logo rules (from UMES Brand Guidelines v1.0 May 2025):
 * - Clear space: leave at least the width of the “U” in “University” on all sides.
 * - Primary minimum size: 1-3/8" / 413px wide (print and digital).
 * - Use Secondary 1 / Secondary 2 / wordmark / hawk when space is limited.
 * - Do not rearrange, rotate, stretch, recolor, or add/remove logo elements.
 * - “HBCU 1886” must remain on the primary brandmark.
 * - Colorways: RGB main on light backgrounds; alt / KO on maroon or dark.
 *
 * Nav uses Secondary 1 (space-limited). Footer can use Primary at >= 413px.
 */

export type BrandLogoVariant =
  | "primary"
  | "primary-on-dark"
  | "secondary-1"
  | "secondary-1-on-dark"
  | "secondary-2"
  | "secondary-2-on-dark";

const LOGO_SRC: Record<BrandLogoVariant, string> = {
  primary: "/brand/logos/primary-rgb.png",
  "primary-on-dark": "/brand/logos/primary-on-dark.png",
  "secondary-1": "/brand/logos/secondary-1-rgb.png",
  "secondary-1-on-dark": "/brand/logos/secondary-1-on-dark.png",
  "secondary-2": "/brand/logos/secondary-2-rgb.png",
  "secondary-2-on-dark": "/brand/logos/secondary-2-on-dark.png",
};

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  /** Display height in CSS (width follows aspect ratio). */
  className?: string;
  imgClassName?: string;
  /** When true, wraps in a home Link. */
  linked?: boolean;
  /** Extra program label beside the mark (e.g. SOR-IV). */
  programLabel?: string;
};

function BrandLogo({
  variant = "secondary-1",
  className,
  imgClassName,
  linked = true,
  programLabel = "SOR-IV",
}: BrandLogoProps) {
  const isPrimary = variant.startsWith("primary");
  const src = LOGO_SRC[variant];

  const mark = (
    <span
      className={cn(
        "inline-flex items-center",
        // Clear space ≈ “U” width: use padding around the mark.
        isPrimary ? "p-3" : "p-2",
        className,
      )}
    >
      <img
        src={src}
        alt="University of Maryland Eastern Shore"
        width={isPrimary ? 413 : 96}
        height={isPrimary ? 207 : 96}
        className={cn(
          "h-auto w-auto object-contain",
          isPrimary
            ? "min-w-[min(100%,413px)] max-h-16 md:max-h-20"
            : "h-10 w-10 md:h-12 md:w-12",
          imgClassName,
        )}
        decoding="async"
      />
      {programLabel ? (
        <span className="ml-2 border-l border-border pl-2 font-brand-sans text-sm font-bold tracking-wide text-primary md:text-base">
          {programLabel}
        </span>
      ) : null}
    </span>
  );

  if (!linked) return mark;

  return (
    <Link
      to="/"
      className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`University of Maryland Eastern Shore${programLabel ? `, ${programLabel}` : ""} home`}
    >
      {mark}
    </Link>
  );
}

export default BrandLogo;
