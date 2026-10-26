import React from "react";
import HeroSection from "@/components/HeroSection";
import MissionBlock from "@/components/MissionBlock";
import WhyChooseUsBlock from "@/components/WhyChooseUsBlock";
import { LazyImage } from "@/components/LazyImage";

function Home() {
  return (
        <div className="bg-background">
          <section className="relative overflow-hidden">
            <HeroSection
              badge="SORIV Education Hub"
              headline="Real talk about opioids, risk, and how to protect your people."
              description="Quick, clear, and student-friendly info for spotting warning signs early, reducing harm, and getting support fast on campus and in your community."
              backgroundImageUrl="/drugneedle.jpg"
              ctaButtons={[
                {
                  label: "Explore Resources",
                  isPrimary: true,
                  href: "/resources",
                },
                {
                  label: "Take the Survey",
                  isPrimary: false,
                  href: "https://forms.cloud.microsoft/r/AbAbkgpjHP?origin=lprLink",
                },
              ]}
            />
            <div className="mx-auto max-w-7xl px-4 pb-8 text-sm text-muted-foreground">
              <nav className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em]">
                <a
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </a>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-semibold">SOR</span>
              </nav>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6 rounded-3xl border border-secondary/25 bg-card/80 p-6 shadow-[0_24px_80px_-56px_var(--color-primary)]">
                <h2 className="text-xl font-semibold text-foreground">
                  On this page
                </h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#intro"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Overview
                    </a>
                  </li>
                  <li>
                    <a
                      href="#why-this-matters"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Why This Matters
                    </a>
                  </li>
                  <li>
                    <a
                      href="#what-are-opioids"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      What Are Opioids
                    </a>
                  </li>
                  <li>
                    <a
                      href="#signs-and-response"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Signs & Response
                    </a>
                  </li>
                  <li>
                    <a
                      href="#prevention"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Prevention
                    </a>
                  </li>
                  <li>
                    <a
                      href="#why-soriv-matters"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Why SORIV Matters
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            <article className="space-y-14">
              <section
                id="intro"
                className="scroll-mt-28 rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]"
              >
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                      Discover SORIV
                    </p>
                    <h2 className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl">
                      Real talk about opioids, risk, and how to protect your
                      people.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                      SORIV delivers concise, student-friendly guidance so
                      students, friends, and campus communities can recognize
                      warning signs early and act quickly to reduce harm.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="/resources"
                        className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_12px_28px_-16px_var(--color-primary)] transition hover:-translate-y-0.5"
                      >
                        Explore Resources
                      </a>
                      <a
                        href="/survey"
                        className="inline-flex rounded-full border border-secondary/40 bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/10"
                      >
                        Take the Survey
                      </a>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[2rem] bg-slate-950 shadow-[0_24px_80px_-56px_rgba(0,0,0,0.35)]">
                    <LazyImage
                      src="/drugneedle.jpg"
                      alt="Substance use prevention"
                      wrapperClassName="aspect-4/3 w-full"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </section>

              <section
                id="why-this-matters"
                className="scroll-mt-28 rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]"
              >
                <h2 className="text-3xl font-semibold text-foreground">
                  Why this matters right now
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  The opioid crisis impacts students, families, and campus
                  communities directly. SORIV helps people respond with
                  confidence, connect to support, and reduce the risk of harm
                  before it becomes a tragedy.
                </p>
              </section>

              <section
                id="what-are-opioids"
                className="scroll-mt-28 rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]"
              >
                <h2 className="text-3xl font-semibold text-foreground">
                  What are opioids?
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  Opioids include prescription pain medicines and illegal
                  substances. Misuse can quickly lead to dependence, overdose,
                  and death, especially when fentanyl is present in the drug
                  supply.
                </p>
              </section>

              <section
                id="signs-and-response"
                className="scroll-mt-28 grid gap-6 lg:grid-cols-2"
              >
                <article className="rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]">
                  <h2 className="text-3xl font-semibold text-foreground">
                    Opioid misuse signs
                  </h2>
                  <ul className="mt-5 space-y-3 text-muted-foreground">
                    {[
                      "Unresponsiveness",
                      "Pinpoint pupils",
                      "Fevers and body aches",
                      "Missing school or work responsibilities",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]">
                  <h2 className="text-3xl font-semibold text-foreground">
                    How to respond fast
                  </h2>
                  <ul className="mt-5 space-y-3 text-muted-foreground">
                    {[
                      "Recognize overdose signs",
                      "Call 911 immediately",
                      "Administer naloxone if available",
                      "Stay until medical help arrives",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </section>

              <section
                id="prevention"
                className="scroll-mt-28 rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]"
              >
                <MissionBlock
                  heading="Prevention beats panic."
                  content="Only trust reliable health information sources, take medication exactly as prescribed, and use safe disposal methods for unused medication."
                  centered={false}
                />
              </section>

              <section
                id="why-soriv-matters"
                className="scroll-mt-28 space-y-6"
              >
                <WhyChooseUsBlock
                  heading="Why SORIV Matters"
                  subheading="Supporting your health and safety every step of the way"
                  items={[
                    "Provides easy access to relevant behavioral health resources.",
                    "Increases awareness and opioid education efforts.",
                    "Measures outcomes and improves effectiveness over time.",
                  ]}
                />
              </section>
            </article>
          </section>

        </div>
  );
}

export default Home;
