import React from "react";
import HeroSection from "@/components/HeroSection";
import MissionBlock from "@/components/MissionBlock";
import WhyChooseUsBlock from "@/components/WhyChooseUsBlock";
import { LazyImage } from "@/components/LazyImage";

function About() {
  return (
        <div className="bg-background">
          <section className="relative overflow-hidden">
            <HeroSection
              badge="About SORIV"
              headline="Supporting students, recovery, and community through education."
              description="SORIV brings together behavioral health expertise, student leadership, and digital tools to increase opioid awareness, connect people to care, and strengthen campus-community support."
              backgroundImageUrl="/drugneedle.jpg"
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
                <span className="text-foreground font-semibold">About Us</span>
              </nav>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6 rounded-3xl border border-secondary/25 bg-card/80 p-6 shadow-[0_24px_80px_-56px_var(--color-primary)]">
                <h2 className="text-xl font-semibold text-foreground">
                  About SORIV
                </h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#about-soriv"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      About SORIV
                    </a>
                  </li>
                  <li>
                    <a
                      href="#unique-collaboration"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Unique Collaboration
                    </a>
                  </li>
                  <li>
                    <a
                      href="#opportunity"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Opportunity
                    </a>
                  </li>
                  <li>
                    <a
                      href="#get-involved"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Get Involved
                    </a>
                  </li>
                  <li>
                    <a
                      href="#mission"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Mission
                    </a>
                  </li>
                  <li>
                    <a
                      href="#why-this-approach"
                      className="block rounded-xl px-3 py-2 text-foreground hover:bg-secondary/10 hover:text-primary"
                    >
                      Why This Approach
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            <article className="space-y-14">
              <section
                id="about-soriv"
                className="scroll-mt-28 rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]"
              >
                <h2 className="text-3xl font-semibold text-foreground">
                  About SORIV
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  The SORIV Project bridges behavioral health, student
                  leadership, and practical digital tools so individuals and
                  families can find support faster and make informed decisions.
                  Our focus is on building accessible resources and awareness
                  campaigns that reduce stigma and connect people to care.
                </p>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Funded by the Maryland Department of Behavioral Health and
                  developed in collaboration with the UMES Counseling Education
                  Program, SORIV aims to engage students, faculty, and community
                  partners around prevention and recovery.
                </p>
              </section>

              <section
                id="unique-collaboration"
                className="scroll-mt-28 rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]"
              >
                <h2 className="text-3xl font-semibold text-foreground">
                  A Unique Collaboration
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  Counseling Education and Computer Science students are
                  building tools together to create practical, community-facing
                  impact. The SORIV initiative brings together diverse skills so
                  our work is both evidence-informed and student-centered.
                </p>
                <ul className="mt-6 space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>
                      Provide easy access to relevant behavioral health
                      resources.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>
                      Increase awareness and opioid education efforts.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>
                      Measure outcomes and improve effectiveness over time.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>Strengthen campus-community partnerships.</span>
                  </li>
                </ul>
              </section>

              <section
                id="opportunity"
                className="scroll-mt-28 rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                  <div>
                    <LazyImage
                      src="/opportunity.jpg"
                      alt="Counseling students opportunities"
                      wrapperClassName="aspect-4/3 w-full overflow-hidden rounded-3xl"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-foreground">
                      Opportunity for Counseling Education Students
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-muted-foreground">
                      Counseling Education students are encouraged to apply for
                      the SORIV Grant Initiative. This work provides hands-on
                      experience in community outreach, recovery education, and
                      partnership development.
                    </p>
                    <ul className="mt-6 grid gap-3 text-muted-foreground sm:grid-cols-2">
                      <li className="rounded-2xl bg-secondary/25 px-4 py-3">
                        Professional development experiences
                      </li>
                      <li className="rounded-2xl bg-secondary/25 px-4 py-3">
                        Service-learning project completion
                      </li>
                      <li className="rounded-2xl bg-secondary/25 px-4 py-3">
                        Community outreach support
                      </li>
                      <li className="rounded-2xl bg-secondary/25 px-4 py-3">
                        Awareness event facilitation
                      </li>
                    </ul>
                    <p className="mt-5 inline-flex rounded-full border border-secondary/45 px-5 py-2 text-sm font-medium text-primary">
                      A stipend is provided for participation.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="get-involved"
                className="scroll-mt-28 rounded-[2rem] border border-secondary/25 bg-card/80 p-8 shadow-[0_22px_66px_-44px_var(--color-primary)]"
              >
                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                  <div>
                    <h2 className="text-3xl font-semibold text-foreground">
                      Get Involved. Make an Impact. Be Part of the Solution.
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-muted-foreground">
                      Our goal is a stronger, more informed community through
                      behavioral health knowledge, student innovation, and local
                      engagement.
                    </p>
                    <p className="mt-5 text-base font-medium text-primary">
                      Contact the SORIV Team through the UMES Counselor
                      Education Program.
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Dr. Kimberly Poole-Sykes, Dept Chair | Angel Cooper,
                      Program Assistant
                    </p>
                    <a
                      href="mailto:soriv@umes.edu"
                      className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-brand-deep-maroon"
                    >
                      Contact The Team
                    </a>
                  </div>
                  <div>
                    <LazyImage
                      src="/impact.jpg"
                      alt="Community impact and outreach"
                      wrapperClassName="aspect-4/3 w-full overflow-hidden rounded-3xl"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </section>

              <section id="mission" className="scroll-mt-28 space-y-6">
                <MissionBlock
                  heading="Our Mission"
                  content="SORIV is committed to empowering students and communities with evidence-based information, accessible resources, and meaningful support pathways to reduce opioid-related harm and promote recovery."
                  centered={false}
                />
              </section>

              <section
                id="why-this-approach"
                className="scroll-mt-28 space-y-6"
              >
                <WhyChooseUsBlock
                  heading="Why This Approach Works"
                  subheading="Built by students, for students"
                  items={[
                    "Students know what students need—relatable, judgment-free information delivered through channels they trust.",
                    "Community partnerships amplify our reach and ensure we're meeting real needs beyond campus walls.",
                    "Data-driven outcomes mean we continuously improve what works and adjust what doesn't.",
                  ]}
                />
              </section>
            </article>
          </section>

        </div>
  );
}

export default About;
