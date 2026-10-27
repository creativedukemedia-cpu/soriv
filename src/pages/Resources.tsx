import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CtaStrip from "@/components/CtaStrip";
import ResourceSlideshow from "@/components/ResourceSlideshow";

function Resources() {
  const resources = [
    "/flyer-1.webp",
    "/flyer-2.webp",
    "/flyer-3.webp",
    "/save-a-life.webp",
    "/not-alone.webp",
    "/fact-sheet-fentanyl.png",
    "/Recovery.png",
    "/Support.png",
  ];

  const [downloading, setDownloading] = useState(false);

  const handleDownloadAll = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      for (const src of resources) {
        try {
          const response = await fetch(encodeURI(src));
          if (!response.ok) continue;

          const objectUrl = URL.createObjectURL(await response.blob());
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = decodeURIComponent(
            src.split("/").pop() || "resource.png",
          );
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
          await new Promise((resolve) => window.setTimeout(resolve, 250));
        } catch {
          continue;
        }
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
        <div className="bg-background">
          {/* Hero Section */}
          <HeroSection
            badge="Resource Library"
            headline="Resources and Flyers"
            description="Browse and share these materials to help students recognize risk, respond quickly, and connect to support."
            ctaButtons={[
              {
                label: downloading
                  ? "Downloading…"
                  : "Download All Resources",
                isPrimary: true,
                disabled: downloading,
                onClick: handleDownloadAll,
              },
            ]}
          />

          {/* Resource Layout */}
          <section className="py-12 md:py-16 px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-2xl font-semibold text-foreground mb-8">
                Featured Flyers & Materials
              </h2>
              <ResourceSlideshow images={resources} />
            </div>
          </section>

          {/* CTA: Custom Resources */}
          <CtaStrip
            statement="Need a custom resource for your campus event or training?"
            buttonLabel="Email the SORIV team"
            buttonHref="mailto:soriv@umes.edu"
          />

          {/* Additional Resources Section */}
          <section className="py-12 md:py-16 px-4 border-t border-secondary/25">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6">
                <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    External Resources
                  </h3>
                  <ul className="mt-4 space-y-3 text-muted-foreground">
                    <li>
                      <a
                        href="https://website-media.com/somerset-county-health-departmetn/somerset-co-health-dept-2024/2026/03/20155301/March-2026-Tri-County-Resource-Guide.pdf"
                        className="text-primary hover:underline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        March 2026 Tri-County Resource Guide (PDF)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://988lifeline.org"
                        className="text-primary hover:underline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        988 Suicide &amp; Crisis Lifeline
                      </a>
                      <span className="ml-2">988</span>
                    </li>
                    <li>
                      <a
                        href="https://findtreatment.gov"
                        className="text-primary hover:underline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        FindTreatment.gov
                      </a>
                      <span className="ml-2">
                        SAMHSA National Helpline: 1-800-662-4357
                      </span>
                    </li>
                    <li>Naloxone Distribution Sites</li>
                    <li>Recovery Support Services</li>
                    <li>Educational Webinars</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    Quick Reference
                  </h3>
                  <ul className="mt-4 space-y-3 text-muted-foreground">
                    <li>Overdose Response Guide</li>
                    <li>Naloxone How-To</li>
                    <li>Campus Resources Directory</li>
                    <li>Student Peer Support Network</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>
  );
}

export default Resources;
