import React from "react";
import HeroSection from "@/components/HeroSection";
import CtaStrip from "@/components/CtaStrip";
import { LazyImage } from "@/components/LazyImage";

function Resources() {
  const resources = [
    "/flyer-1.png",
    "/flyer-2.png",
    "/flyer-3.png",
    "/save-a-life.png",
    "/not-alone.png",
  ];

  return (
        <div className="bg-background">
          {/* Hero Section */}
          <HeroSection
            badge="Resource Library"
            headline="Resources and Flyers"
            description="Browse and share these materials to help students recognize risk, respond quickly, and connect to support."
            ctaButtons={[{ label: "Download All Resources", isPrimary: true }]}
          />

          {/* Resource Layout */}
          <section className="py-12 md:py-16 px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-2xl font-semibold text-foreground mb-8">
                Featured Flyers & Materials
              </h2>
              <div className="grid gap-8">
                {resources.map((src) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-[2rem] border border-secondary/25 bg-card/80 p-4 shadow-[0_20px_60px_-40px_var(--color-primary)]"
                  >
                    <LazyImage
                      src={src}
                      alt="SORIV resource flyer"
                      wrapperClassName="w-full"
                      className="w-full object-contain"
                    />
                  </div>
                ))}
              </div>
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
                      <a href="#" className="text-primary hover:underline">
                        SAMHSA National Helpline
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Naloxone Distribution Sites
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Recovery Support Services
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Educational Webinars
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    Quick Reference
                  </h3>
                  <ul className="mt-4 space-y-3 text-muted-foreground">
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Overdose Response Guide
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Naloxone How-To
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Campus Resources Directory
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Student Peer Support Network
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>
  );
}

export default Resources;
