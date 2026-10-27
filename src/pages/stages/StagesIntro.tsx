import React from "react";
import { Button } from "@/components/ui/button";

type StagesIntroProps = {
  onStart: () => void;
};

function StagesIntro({ onStart }: StagesIntroProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Self-check
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Where are you at?
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          A short readiness-to-change check with 18 true/false statements about
          how you feel today. It is a self-reflection tool, not a diagnosis, and
          your answers stay in your browser.
        </p>
      </div>

      <ul className="space-y-3 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>Takes about 3–5 minutes.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>There are no right or wrong answers.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>
            At the end, you&apos;ll see which stage of change fits you most.
          </span>
        </li>
      </ul>

      <Button
        type="button"
        onClick={onStart}
        className="w-fit cursor-pointer rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-secondary"
      >
        Begin
      </Button>
    </div>
  );
}

export default StagesIntro;
