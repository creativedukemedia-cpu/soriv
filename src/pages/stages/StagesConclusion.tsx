import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  STAGE_LABELS,
  STAGE_ORDER,
  scoreStages,
  type AnswerResult,
} from "@/data/stagesOfChange";

type StagesConclusionProps = {
  answers: AnswerResult[];
  onRestart: () => void;
};

function StagesConclusion({ answers, onRestart }: StagesConclusionProps) {
  const totals = scoreStages(answers);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Your stage scores
        </h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Each stage is scored from your True answers (0–3). Ties can mean you
          sit between stages.
        </p>
      </div>

      <ul className="space-y-3">
        {STAGE_ORDER.map((stage) => (
          <li
            key={stage}
            className="flex items-center justify-between border-b border-border/80 py-3"
          >
            <span className="font-medium text-foreground">
              {STAGE_LABELS[stage]}
            </span>
            <span className="tabular-nums text-lg font-semibold text-primary">
              {totals[stage]}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={onRestart}
          className="cursor-pointer rounded-full bg-primary text-primary-foreground hover:bg-secondary"
        >
          Retake
        </Button>
        <Button
          asChild
          variant="outline"
          className="cursor-pointer rounded-full"
        >
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default StagesConclusion;
