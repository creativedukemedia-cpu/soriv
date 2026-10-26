import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";

/* Reusable Image with Fallback */
type ProfileImageProps = {
  src?: string; // optional, since it might not exist
  name: string; // required (used for initials + alt)
};

function ProfileImage({ src, name }: ProfileImageProps) {
  const [error, setError] = useState(false);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-slate-950 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.4)]">
      {!error && src ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className="aspect-4/5 w-full h-full object-cover"
        />
      ) : (
        <div
          className="aspect-4/5 flex items-center justify-center bg-linear-to-br from-primary/80 via-secondary/80 to-primary/40 text-7xl font-black uppercase tracking-[0.16em] text-white"
          role="img"
          aria-label={name}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

function Contact() {
  return (
        <div className="bg-background">
          <HeroSection
            badge="SORIV Team"
            headline="Meet the Team"
            description="Contact our leadership and program support staff to learn more about the SORIV initiative, partnerships, and student services."
          />

          <section className="py-12 md:py-16 px-4">
            <div className="mx-auto max-w-7xl space-y-10">
              {/* Contact 1 */}
              <div className="grid gap-6 rounded-[2rem] border border-secondary/25 bg-card/60 p-6 shadow-[0_22px_60px_-40px_var(--color-primary)] md:grid-cols-[minmax(280px,34%)_1fr] md:p-8">
                <ProfileImage
                  src="/DrKimberlyPooleSykes.webp"
                  name="Dr. Kimberly Poole-Sykes"
                />

                {/*
                  Role titles use primary-foreground (white), not tertiary
                  (Stone Maroon on Maroon is 2.59:1, fails AA).
                */}
                <div className="rounded-[1.75rem] bg-primary p-8 text-primary-foreground shadow-[0_18px_40px_-30px_rgba(0,0,0,0.4)]">
                  <h2 className="text-3xl font-semibold">
                    Dr. Kimberly Poole-Sykes
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-brand-light-grey">
                    Chair and Professor
                  </p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Department of Education
                  </p>

                  <div className="mt-8 space-y-2 text-sm">
                    <p>
                      <strong>Phone:</strong>{" "}
                      <a href="tel:4106516220">410-651-6220</a>
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href="mailto:Kjpoolesykes@umes.edu">
                        Kjpoolesykes@umes.edu
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact 2 */}
              <div className="grid gap-6 rounded-[2rem] border border-secondary/25 bg-card/60 p-6 shadow-[0_22px_60px_-40px_var(--color-primary)] md:grid-cols-[minmax(280px,34%)_1fr] md:p-8">
                <ProfileImage
                  src="/Dr.Lakeisha-Harris.webp"
                  name="LaKeisha Harris, Ph.D., CRC"
                />

                <div className="rounded-[1.75rem] bg-primary p-8 text-primary-foreground shadow-[0_18px_40px_-30px_rgba(0,0,0,0.4)]">
                  <h2 className="text-3xl font-semibold">
                    LaKeisha Harris, Ph.D., CRC
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-brand-light-grey">
                    Dean
                  </p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Graduate Studies
                  </p>

                  <div className="mt-8 space-y-2 text-sm">
                    <p>
                      <strong>Phone:</strong>{" "}
                      <a href="tel:4106516080">410-651-6080</a>
                    </p>
                    <p>
                      <strong>Fax:</strong> 410-651-7571
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href="mailto:llharris@umes.edu">llharris@umes.edu</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact 3 */}
              <div className="grid gap-6 rounded-[2rem] border border-secondary/25 bg-card/60 p-6 shadow-[0_22px_60px_-40px_var(--color-primary)] md:grid-cols-[minmax(280px,34%)_1fr] md:p-8">
                <ProfileImage src="/images/cooper.jpg" name="Angel Cooper" />

                <div className="rounded-[1.75rem] bg-primary p-8 text-primary-foreground shadow-[0_18px_40px_-30px_rgba(0,0,0,0.4)]">
                  <h2 className="text-3xl font-semibold">Angel Cooper</h2>
                  <p className="mt-2 text-sm font-semibold text-brand-light-grey">
                    M.S. Rehabilitation Counseling
                  </p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Counselor Education Program
                  </p>

                  <div className="mt-8 space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href="mailto:ancooper1@umes.edu">ancooper1@umes.edu</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
  );
}

export default Contact;
