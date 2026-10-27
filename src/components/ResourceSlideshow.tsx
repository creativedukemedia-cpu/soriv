import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { LazyImage } from "@/components/LazyImage";
import { cn } from "@/lib/utils";

type ResourceSlideshowProps = {
  images: string[];
};

function filenameFromSrc(src: string) {
  return src.split("/").pop() || "resource.png";
}

function ResourceSlideshow({ images }: ResourceSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const count = images.length;
  const activeSrc = images[activeIndex] ?? images[0];

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Keyboard: strip focus or lightbox
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (lightboxOpen) {
        if (event.key === "Escape") setLightboxOpen(false);
        if (event.key === "ArrowLeft") goPrev();
        if (event.key === "ArrowRight") goNext();
        return;
      }

      const strip = stripRef.current;
      if (!strip) return;
      if (
        document.activeElement !== strip &&
        !strip.contains(document.activeElement)
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setLightboxOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, goPrev, goNext]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightboxOpen]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  if (count === 0) return null;

  return (
    <div className="w-full">
      <div
        ref={stripRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Resource flyers"
        className="relative outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Filmstrip viewport */}
        <div className="relative overflow-hidden py-6 md:py-10">
          <div className="relative mx-auto flex h-[min(62vh,520px)] w-full max-w-5xl items-center justify-center">
            {images.map((src, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;
              const abs = Math.abs(offset);
              const scale = isActive ? 1 : abs === 1 ? 0.78 : 0.62;
              const opacity = abs > 2 ? 0 : isActive ? 1 : abs === 1 ? 0.75 : 0.4;
              const translateX =
                offset === 0
                  ? "0%"
                  : `calc(${offset * 58}% + ${offset * 0.5}rem)`;
              const zIndex = 20 - abs;

              return (
                <button
                  key={src}
                  type="button"
                  aria-label={
                    isActive
                      ? `Open flyer ${index + 1} of ${count} fullscreen`
                      : `Show flyer ${index + 1} of ${count}`
                  }
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => {
                    if (isActive) setLightboxOpen(true);
                    else goTo(index);
                  }}
                  className={cn(
                    "absolute left-1/2 top-1/2 w-[min(78vw,340px)] origin-center overflow-hidden rounded-xl bg-transparent p-0 shadow-none transition-all duration-300 ease-out md:w-[min(42vw,380px)]",
                    isActive ? "cursor-zoom-in" : "cursor-pointer",
                  )}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: abs > 2 ? "none" : "auto",
                  }}
                >
                  <LazyImage
                    src={src}
                    alt={`SOR IV resource flyer ${index + 1}`}
                    wrapperClassName="aspect-3/4 w-full"
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </button>
              );
            })}
          </div>

          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous flyer"
            onClick={goPrev}
            className="absolute left-1 top-1/2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-border md:left-2 md:size-12"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Next flyer"
            onClick={goNext}
            className="absolute right-1 top-1/2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-border md:right-2 md:size-12"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-2 flex items-center justify-center gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to flyer ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === activeIndex
                  ? "w-6 bg-primary"
                  : "w-2.5 bg-border hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {activeIndex + 1} / {count}
          <span className="mx-2 text-border">·</span>
          Tap the center flyer to view fullscreen
        </p>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Flyer fullscreen view"
          className="fixed inset-0 z-50 flex flex-col bg-black/90"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-sm font-medium">
              Flyer {activeIndex + 1} of {count}
            </p>
            <div className="inline-flex items-center overflow-hidden rounded-full bg-white/10">
              <a
                href={activeSrc}
                download={filenameFromSrc(activeSrc)}
                aria-label="Download flyer"
                className="inline-flex size-10 items-center justify-center text-white transition hover:bg-white/15"
              >
                <Download className="size-4" />
              </a>
              <button
                type="button"
                aria-label="Close fullscreen"
                onClick={() => setLightboxOpen(false)}
                className="inline-flex size-10 items-center justify-center text-white transition hover:bg-white/15"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 pb-6 md:px-16">
            <button
              type="button"
              aria-label="Previous flyer"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-4 md:size-12"
            >
              <ChevronLeft className="size-6" />
            </button>

            <div
              className="flex h-full max-h-full w-full max-w-4xl items-center justify-center"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={activeSrc}
                alt={`SOR IV resource flyer ${activeIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                draggable={false}
              />
            </div>

            <button
              type="button"
              aria-label="Next flyer"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              className="absolute right-2 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-4 md:size-12"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceSlideshow;
