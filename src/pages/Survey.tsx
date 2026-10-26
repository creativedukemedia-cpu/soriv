import React from "react";
import HeroSection from "@/components/HeroSection";

function Survey() {
  return (
    <div className="bg-background">
      {/* Hero Section */}

      <HeroSection
        badge="Student Survey"
        headline="Share Your Experience"
        description="Your anonymous feedback helps us improve resources and support. This short survey takes about 5 minutes to complete."
        ctaButtons={[
          {
            label: "Start Survey",
            isPrimary: true,
            href: "https://forms.cloud.microsoft/r/AbAbkgpjHP?origin=lprLink",
          },
        ]}
      />

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-4 border-t border-secondary/25">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            About This Survey
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Your Privacy Matters
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                All responses are completely anonymous and confidential. We
                never collect personally identifiable information.
              </p>
            </div>
            <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Takes 5 Minutes
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Quick, straightforward questions designed to gather
                meaningful insights without taking up too much of your time.
              </p>
            </div>
            <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Helps Our Mission
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Your feedback directly impacts how we develop resources and
                support services for your campus community.
              </p>
            </div>
            <div className="rounded-xl border border-secondary/25 bg-card/80 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                No Wrong Answers
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                We value your honest thoughts, whether you plan or don't
                plan to take the survey, share your true perspective.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Survey;
