import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

const totalPages = 10;

const navButtonClassName =
  "cursor-pointer rounded-full border border-secondary p-2 text-primary-foreground bg-primary transition-all duration-200 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40";

const choiceClassName = (active: boolean) =>
  `flex w-full cursor-pointer items-center rounded-xl border px-4 py-4 text-left text-base font-semibold transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-background/70 text-foreground hover:border-primary/40 hover:bg-primary/5"
  }`;

type Q2Key =
  | "Alcohol"
  | "Marijuana"
  | "PrescriptionPainMedicationNotPrescribedToYou"
  | "PrescriptionMedicationInAWayNotPrescribed"
  | "Cocaine"
  | "Heroin"
  | "FentanylOrUnknownStreetPills"
  | "VapingNicotine"
  | "Other"
  | "PreferNotToSay";

type Q4Key =
  | "Academics"
  | "MentalHealth"
  | "Relationships"
  | "Finances"
  | "PhysicalHealth"
  | "NotAffectedMe"
  | "PreferNotToSay";

type Q8Key =
  | "SocialMedia"
  | "CampusEvents"
  | "Email"
  | "PostersFlyers"
  | "ClassroomPresentations"
  | "StudentOrgs";

const q2Options: { key: Q2Key; label: string }[] = [
  { key: "Alcohol", label: "Alcohol" },
  { key: "Marijuana", label: "Marijuana" },
  {
    key: "PrescriptionPainMedicationNotPrescribedToYou",
    label:
      "Prescription pain medication not prescribed to you (e.g., oxycodone, Percocet)",
  },
  {
    key: "PrescriptionMedicationInAWayNotPrescribed",
    label: "Prescription medication in a way not prescribed",
  },
  { key: "Cocaine", label: "Cocaine" },
  { key: "Heroin", label: "Heroin" },
  {
    key: "FentanylOrUnknownStreetPills",
    label: "Fentanyl or unknown street pills",
  },
  { key: "VapingNicotine", label: "Vaping/Nicotine" },
  { key: "Other", label: "Other" },
  { key: "PreferNotToSay", label: "Prefer not to say" },
];

const q4Options: { key: Q4Key; label: string }[] = [
  { key: "Academics", label: "Academics" },
  { key: "MentalHealth", label: "Mental Health" },
  { key: "Relationships", label: "Relationships" },
  { key: "Finances", label: "Finances" },
  { key: "PhysicalHealth", label: "Physical Health" },
  { key: "NotAffectedMe", label: "It has not affected me" },
  { key: "PreferNotToSay", label: "Prefer not to say" },
];

const q8Options: { key: Q8Key; label: string }[] = [
  { key: "SocialMedia", label: "Social media" },
  { key: "CampusEvents", label: "Campus events" },
  { key: "Email", label: "Email" },
  { key: "PostersFlyers", label: "Posters/Flyers" },
  { key: "ClassroomPresentations", label: "Classroom presentations" },
  { key: "StudentOrgs", label: "Student organizations" },
];

function QuestionShell({
  number,
  title,
  hint,
  children,
  onPrev,
  onNext,
  showPrev,
  nextLabel,
  nextDisabled,
}: {
  number: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
  onPrev: () => void;
  onNext: () => void;
  showPrev: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">Question {number}</p>
        <p className="shrink-0 text-sm text-muted-foreground">
          {number} / {totalPages}
        </p>
      </div>

      <h2 className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>

      {hint ? (
        <p className="text-sm text-muted-foreground">{hint}</p>
      ) : null}

      {children}

      <div className="flex w-full items-center justify-between pt-2">
        {showPrev ? (
          <button
            type="button"
            className={navButtonClassName}
            onClick={onPrev}
            aria-label="Previous question"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          className={
            nextLabel
              ? "cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
              : navButtonClassName
          }
          onClick={onNext}
          disabled={nextDisabled}
          aria-label={nextLabel ?? "Next question"}
        >
          {nextLabel ?? <ChevronRight className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}

function SurveyForm() {
  const [step, setStep] = useState<"questions" | "thanks">("questions");
  const [nav, setNav] = useState(1);

  const [q1, setq1] = useState("Prefer not to say");
  const [q2, setq2] = useState<Record<Q2Key, boolean>>({
    Alcohol: false,
    Marijuana: false,
    PrescriptionPainMedicationNotPrescribedToYou: false,
    PrescriptionMedicationInAWayNotPrescribed: false,
    Cocaine: false,
    Heroin: false,
    FentanylOrUnknownStreetPills: false,
    VapingNicotine: false,
    Other: false,
    PreferNotToSay: true,
  });
  const [q3, setq3] = useState("Prefer not to say");
  const [q4, setq4] = useState<Record<Q4Key, boolean>>({
    Academics: false,
    MentalHealth: false,
    Relationships: false,
    Finances: false,
    PhysicalHealth: false,
    NotAffectedMe: false,
    PreferNotToSay: true,
  });
  const [q5, setq5] = useState("Unsure");
  const [q6, setq6] = useState("Unsure");
  const [q7, setq7] = useState("No");
  const [q8, setq8] = useState<Record<Q8Key, boolean>>({
    SocialMedia: false,
    CampusEvents: false,
    Email: false,
    PostersFlyers: false,
    ClassroomPresentations: false,
    StudentOrgs: false,
  });
  const [q9, setq9] = useState("");
  const [q10, setq10] = useState("");

  const progressValue =
    step === "thanks" ? 100 : ((nav - 1) / totalPages) * 100;

  const nextNav = () => setNav((n) => Math.min(totalPages, n + 1));
  const prevNav = () => setNav((n) => Math.max(1, n - 1));

  const toggleQ2 = (key: Q2Key) => {
    setq2((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === "PreferNotToSay" && next.PreferNotToSay) {
        return {
          Alcohol: false,
          Marijuana: false,
          PrescriptionPainMedicationNotPrescribedToYou: false,
          PrescriptionMedicationInAWayNotPrescribed: false,
          Cocaine: false,
          Heroin: false,
          FentanylOrUnknownStreetPills: false,
          VapingNicotine: false,
          Other: false,
          PreferNotToSay: true,
        };
      }
      if (key !== "PreferNotToSay" && next[key]) next.PreferNotToSay = false;
      return next;
    });
  };

  const toggleQ4 = (key: Q4Key) => {
    setq4((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === "PreferNotToSay" && next.PreferNotToSay) {
        return {
          Academics: false,
          MentalHealth: false,
          Relationships: false,
          Finances: false,
          PhysicalHealth: false,
          NotAffectedMe: false,
          PreferNotToSay: true,
        };
      }
      if (key !== "PreferNotToSay" && next[key]) next.PreferNotToSay = false;
      return next;
    });
  };

  const toggleQ8 = (key: Q8Key) => {
    setq8((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const singleChoices = (
    value: string,
    options: string[],
    onPick: (v: string) => void,
  ) => (
    <div className="grid gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={choiceClassName(value === option)}
          onClick={() => onPick(option)}
          aria-pressed={value === option}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const multiChoices = <K extends string>(
    state: Record<K, boolean>,
    options: { key: K; label: string }[],
    onToggle: (key: K) => void,
  ) => (
    <div className="grid gap-3">
      {options.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={choiceClassName(state[key])}
          onClick={() => onToggle(key)}
          aria-pressed={state[key]}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const renderQuestion = () => {
    switch (nav) {
      case 1:
        return (
          <QuestionShell
            number={1}
            title="Have you ever used drugs or misused prescription medication?"
            onPrev={prevNav}
            onNext={nextNav}
            showPrev={false}
          >
            {singleChoices(
              q1,
              ["Yes", "No", "Prefer not to say"],
              setq1,
            )}
          </QuestionShell>
        );
      case 2:
        return (
          <QuestionShell
            number={2}
            title="Which substances have you used?"
            hint="Select all that apply."
            onPrev={prevNav}
            onNext={nextNav}
            showPrev
          >
            {multiChoices(q2, q2Options, toggleQ2)}
          </QuestionShell>
        );
      case 3:
        return (
          <QuestionShell
            number={3}
            title="How often do you currently use any substance?"
            onPrev={prevNav}
            onNext={nextNav}
            showPrev
          >
            {singleChoices(
              q3,
              [
                "Never",
                "Rarely (a few times a year)",
                "Occasionally (monthly)",
                "Regularly (weekly)",
                "Daily",
                "Prefer not to say",
              ],
              setq3,
            )}
          </QuestionShell>
        );
      case 4:
        return (
          <QuestionShell
            number={4}
            title="Do you feel your substance use has ever negatively affected your:"
            hint="Select all that apply."
            onPrev={prevNav}
            onNext={nextNav}
            showPrev
          >
            {multiChoices(q4, q4Options, toggleQ4)}
          </QuestionShell>
        );
      case 5:
        return (
          <QuestionShell
            number={5}
            title="Have you ever felt concerned about your own substance use?"
            onPrev={prevNav}
            onNext={nextNav}
            showPrev
          >
            {singleChoices(q5, ["Yes", "No", "Unsure"], setq5)}
          </QuestionShell>
        );
      case 6:
        return (
          <QuestionShell
            number={6}
            title="Do you know where to find help on campus for substance use concerns?"
            onPrev={prevNav}
            onNext={nextNav}
            showPrev
          >
            {singleChoices(q6, ["Yes", "No", "Unsure"], setq6)}
          </QuestionShell>
        );
      case 7:
        return (
          <QuestionShell
            number={7}
            title="Would you like more information about substance use resources?"
            onPrev={prevNav}
            onNext={nextNav}
            showPrev
          >
            {singleChoices(q7, ["Yes", "No"], setq7)}
          </QuestionShell>
        );
      case 8:
        return (
          <QuestionShell
            number={8}
            title="What is the best way for the university to share information about substance use and support?"
            hint="Select all that apply."
            onPrev={prevNav}
            onNext={nextNav}
            showPrev
          >
            {multiChoices(q8, q8Options, toggleQ8)}
          </QuestionShell>
        );
      case 9:
        return (
          <QuestionShell
            number={9}
            title="(Optional) What is your current academic level?"
            hint="Select one, or leave empty."
            onPrev={prevNav}
            onNext={nextNav}
            showPrev
          >
            <div className="grid gap-3">
              {[
                "Freshman",
                "Sophomore",
                "Junior",
                "Senior",
                "Graduate student",
              ].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={choiceClassName(q9 === level)}
                  onClick={() =>
                    setq9((prev) => (prev === level ? "" : level))
                  }
                  aria-pressed={q9 === level}
                >
                  {level}
                </button>
              ))}
            </div>
          </QuestionShell>
        );
      case 10:
        return (
          <QuestionShell
            number={10}
            title="(Optional) Anything else you'd like us to know?"
            onPrev={prevNav}
            onNext={() => setStep("thanks")}
            showPrev
            nextLabel="Submit"
          >
            <Textarea
              value={q10}
              onChange={(e) => setq10(e.target.value)}
              placeholder="Share anything else here…"
              className="min-h-32 rounded-xl border-border bg-background/70"
            />
          </QuestionShell>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(107,30,42,0.08),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(201,162,39,0.1),_transparent_45%)]"
      />

      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Student Survey
            </p>
            <p className="text-xs text-muted-foreground">
              {step === "thanks"
                ? "Complete"
                : `Question ${nav} of ${totalPages}`}
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <Link
              to="/survey"
              className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Exit
            </Link>
            <p className="text-xs text-muted-foreground">You can leave anytime</p>
          </div>
        </div>
        <Progress value={progressValue} className="h-1.5 rounded-none" />
      </div>

      <main className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-10 md:py-16">
        <p className="mb-8 text-sm font-bold tracking-wide text-foreground/70">
          SOR <span className="text-primary">IV</span>
        </p>

        {step === "thanks" ? (
          <div className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Thank you for filling out the survey
              </h1>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Your anonymous feedback helps SOR IV improve resources and
                support for students on campus.
              </p>
            </div>
            <Button
              asChild
              className="cursor-pointer rounded-full bg-primary text-primary-foreground hover:bg-secondary"
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        ) : (
          renderQuestion()
        )}
      </main>
    </div>
  );
}

export default SurveyForm;
