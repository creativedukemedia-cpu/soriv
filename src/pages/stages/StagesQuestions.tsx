import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  STAGES_QUESTIONS,
  type StageQuestion,
} from "@/data/stagesOfChange";

type StagesQuestionsProps = {
  currentIndex: number;
  answers: Record<number, 0 | 1>;
  onAnswer: (question: StageQuestion, score: 0 | 1) => void;
  onPrev: () => void;
  onNext: () => void;
};

const navButtonClassName =
  "cursor-pointer rounded-full border border-secondary p-2 text-primary-foreground bg-primary transition-all duration-200 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40";

const choiceClassName = (active: boolean) =>
  `flex w-full cursor-pointer items-center justify-center rounded-xl border px-4 py-4 text-base font-semibold transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-background/70 text-foreground hover:border-primary/40 hover:bg-primary/5"
  }`;

function StagesQuestions({
  currentIndex,
  answers,
  onAnswer,
  onPrev,
  onNext,
}: StagesQuestionsProps) {
  const question = STAGES_QUESTIONS[currentIndex];
  const total = STAGES_QUESTIONS.length;
  const selected = answers[question.number];
  const isLast = currentIndex === total - 1;

  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Question {question.number}
        </p>
        <p className="shrink-0 text-sm text-muted-foreground">
          {question.number} / {total}
        </p>
      </div>

      <h2 className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
        {question.text}
      </h2>

      <p className="text-sm text-muted-foreground">
        Reflect on how you feel today. There are no right or wrong answers.
      </p>

      <div key={question.number} className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className={choiceClassName(selected === 1)}
          onClick={() => onAnswer(question, 1)}
          aria-pressed={selected === 1}
        >
          True
        </button>
        <button
          type="button"
          className={choiceClassName(selected === 0)}
          onClick={() => onAnswer(question, 0)}
          aria-pressed={selected === 0}
        >
          False
        </button>
      </div>

      <div className="flex w-full items-center justify-between pt-2">
        <button
          type="button"
          className={navButtonClassName}
          onClick={onPrev}
          disabled={currentIndex === 0}
          aria-label="Previous question"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          className={navButtonClassName}
          onClick={onNext}
          disabled={selected === undefined}
          aria-label={isLast ? "See results" : "Next question"}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default StagesQuestions;
