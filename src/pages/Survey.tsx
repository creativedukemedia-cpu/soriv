import React from "react";
import HeroSection from "@/components/HeroSection";
import { LazyImage } from "@/components/LazyImage";

function Survey() {
  return (
    <div className="bg-background">
      <HeroSection
        badge="Student Survey"
        headline="Share Your Experience"
        description="Your anonymous feedback helps us improve resources and support. This short survey takes about 5 minutes to complete."
        ctaButtons={[
          {
            label: "Start Survey",
            isPrimary: true,
            href: "/survey/take",
          },
        ]}
      />

      <section className="border-t border-secondary/25 px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-4xl gap-8 rounded-[2rem] border border-secondary/25 bg-card/80 p-6 shadow-[0_22px_66px_-44px_var(--color-primary)] md:grid-cols-[1.15fr_0.85fr] md:p-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Student voices matter
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              Help shape the support students need.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Your perspective helps SORIV understand how to make resources,
              education, and support more useful for the campus community.
            </p>
          </div>
          <LazyImage
            src="/student-survey-campus.webp"
            alt="A group of college students talking outdoors"
            wrapperClassName="aspect-4/3 w-full overflow-hidden rounded-2xl"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-t border-secondary/25 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-semibold text-foreground">
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
                Quick, straightforward questions designed to gather meaningful
                insights without taking up too much of your time.
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
                We value your honest thoughts. Whether you plan or do not plan
                to take the survey, share your true perspective.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Survey;
