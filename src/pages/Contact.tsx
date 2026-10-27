import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";

type ProfileImageProps = {
  src: string;
  name: string;
};

function ProfileImage({ src, name }: ProfileImageProps) {
  const [error, setError] = useState(false);
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border/60 sm:h-28 sm:w-28">
      {!error ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/80 via-secondary/80 to-primary/40 text-2xl font-bold uppercase tracking-wide text-white"
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

      <section className="px-4 pb-16 pt-10 md:pt-12">
        <div className="mx-auto max-w-xl">
          <article className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b border-border/70 py-6 first:pt-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
            <ProfileImage
              src="/dr-kimberly-poole-sykes.webp"
              name="Dr. Kimberly Poole-Sykes"
            />
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                Dr. Kimberly Poole-Sykes
              </h2>
              <p className="mt-2 text-sm font-medium text-primary">
                Chair and Professor
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Department of Education
              </p>
              <div className="mt-3 space-y-1 text-sm text-foreground">
                <p>
                  <strong>Phone:</strong>{" "}
                  <a className="hover:text-primary" href="tel:4106516220">
                    410-651-6220
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    className="break-all hover:text-primary"
                    href="mailto:Kjpoolesykes@umes.edu"
                  >
                    Kjpoolesykes@umes.edu
                  </a>
                </p>
              </div>
            </div>
          </article>

          <article className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b border-border/70 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
            <ProfileImage
              src="/Dr.Lakeisha-Harris.webp"
              name="LaKeisha Harris, Ph.D., CRC"
            />
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                LaKeisha Harris, Ph.D., CRC
              </h2>
              <p className="mt-2 text-sm font-medium text-primary">Dean</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Graduate Studies
              </p>
              <div className="mt-3 space-y-1 text-sm text-foreground">
                <p>
                  <strong>Phone:</strong>{" "}
                  <a className="hover:text-primary" href="tel:4106516080">
                    410-651-6080
                  </a>
                </p>
                <p>
                  <strong>Fax:</strong> 410-651-7571
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a className="hover:text-primary" href="mailto:llharris@umes.edu">
                    llharris@umes.edu
                  </a>
                </p>
              </div>
            </div>
          </article>

          <article className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b border-border/70 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
            <ProfileImage
              src="/angel-cooper-headshot.jpeg"
              name="Angel Cooper"
            />
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                Angel Cooper
              </h2>
              <p className="mt-2 text-sm font-medium text-primary">
                M.S. Rehabilitation Counseling
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Counselor Education Program
              </p>
              <div className="mt-3 space-y-1 text-sm text-foreground">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    className="break-all hover:text-primary"
                    href="mailto:ancooper1@umes.edu"
                  >
                    ancooper1@umes.edu
                  </a>
                </p>
              </div>
            </div>
          </article>

          <section className="pt-8">
            <h2 className="text-lg font-semibold text-foreground">Quick Links</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="text-primary underline-offset-4 hover:underline"
                  href="https://www.umes.edu/grad/"
                >
                  UMES Graduate Studies
                </a>
              </li>
              <li>
                <a
                  className="text-primary underline-offset-4 hover:underline"
                  href="https://www.umes.edu/education/"
                >
                  UMES Department of Education
                </a>
              </li>
              <li>
                <a
                  className="text-primary underline-offset-4 hover:underline"
                  href="https://www.umes.edu/education/counselor-education/"
                >
                  UMES Counselor Education
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Contact;
