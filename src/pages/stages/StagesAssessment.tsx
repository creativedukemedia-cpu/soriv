import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import {
  buildAnswerResults,
  STAGES_QUESTIONS,
  type AnswerResult,
} from "@/data/stagesOfChange";
import StagesIntro from "./StagesIntro";
import StagesQuestions from "./StagesQuestions";
import StagesConclusion from "./StagesConclusion";

type Step = "intro" | "questions" | "conclusion";

function StagesAssessment() {
  const [step, setStep] = useState<Step>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 0 | 1>>({});
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [furthestCompleted, setFurthestCompleted] = useState(0);

  const total = STAGES_QUESTIONS.length;
  const progressValue =
    step === "intro"
      ? 0
      : step === "conclusion"
        ? 100
        : (furthestCompleted / total) * 100;

  const handleAnswer = (
    question: (typeof STAGES_QUESTIONS)[number],
    score: 0 | 1,
  ) => {
    setAnswers((prev) => ({ ...prev, [question.number]: score }));
  };

  const handleNext = () => {
    const completedThrough = currentIndex + 1;
    setFurthestCompleted((prev) => Math.max(prev, completedThrough));

    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    setResults(buildAnswerResults(answers));
    setStep("conclusion");
  };

  const handleRestart = () => {
    setStep("intro");
    setCurrentIndex(0);
    setAnswers({});
    setResults([]);
    setFurthestCompleted(0);
  };

  const statusLabel =
    step === "intro"
      ? "Before you begin"
      : step === "conclusion"
        ? "Results"
        : `Question ${currentIndex + 1} of ${total}`;

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
              Where are you at?
            </p>
            <p className="text-xs text-muted-foreground">{statusLabel}</p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <Link
              to="/"
              className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Exit
            </Link>
            <p className="text-xs text-muted-foreground">
              You can leave anytime
            </p>
          </div>
        </div>
        <Progress value={progressValue} className="h-1.5 rounded-none" />
      </div>

      <main className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-10 md:py-16">
        <p className="mb-8 text-sm font-bold tracking-wide text-foreground/70">
          SOR <span className="text-primary">IV</span>
        </p>

        {step === "intro" && (
          <StagesIntro onStart={() => setStep("questions")} />
        )}
        {step === "questions" && (
          <StagesQuestions
            currentIndex={currentIndex}
            answers={answers}
            onAnswer={handleAnswer}
            onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            onNext={handleNext}
          />
        )}
        {step === "conclusion" && (
          <StagesConclusion answers={results} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}

export default StagesAssessment;
