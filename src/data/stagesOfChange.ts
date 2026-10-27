export type StageId =
  | "precontemplation"
  | "contemplation"
  | "preparation"
  | "action"
  | "maintenance"
  | "relapse";

export type AnswerResult = {
  questionNumber: number;
  stage: StageId;
  score: 0 | 1;
};

export type StageQuestion = {
  number: number;
  text: string;
  stage: StageId;
};

export const STAGE_ORDER: StageId[] = [
  "precontemplation",
  "contemplation",
  "preparation",
  "action",
  "maintenance",
  "relapse",
];

export const STAGE_LABELS: Record<StageId, string> = {
  precontemplation: "Precontemplation",
  contemplation: "Contemplation",
  preparation: "Preparation",
  action: "Action",
  maintenance: "Maintenance",
  relapse: "Relapse",
};

export const STAGES_QUESTIONS: StageQuestion[] = [
  {
    number: 1,
    text: "I have issues in my life that I need to work on.",
    stage: "contemplation",
  },
  {
    number: 2,
    text: "I am making changes in my life.",
    stage: "action",
  },
  {
    number: 3,
    text: "I don't see any problems with my life right now.",
    stage: "precontemplation",
  },
  {
    number: 4,
    text: "I know I need better resources to help me stop myself from going back to my old, unhealthy behaviors.",
    stage: "relapse",
  },
  {
    number: 5,
    text: "I am ready to do things differently.",
    stage: "preparation",
  },
  {
    number: 6,
    text: "I need a little help to continue doing things differently.",
    stage: "maintenance",
  },
  {
    number: 7,
    text: "Everyone else is the problem, not me.",
    stage: "precontemplation",
  },
  {
    number: 8,
    text: "I am working to prevent myself from relapsing back to my old, unhealthy behaviors.",
    stage: "maintenance",
  },
  {
    number: 9,
    text: "I think it's time to do things differently.",
    stage: "contemplation",
  },
  {
    number: 10,
    text: "There's really nothing I need to change about me or how I'm living my life.",
    stage: "precontemplation",
  },
  {
    number: 11,
    text: "I want to learn more about how my life would change if I did things differently.",
    stage: "preparation",
  },
  {
    number: 12,
    text: "Anyone can talk about change, but I am doing it.",
    stage: "action",
  },
  {
    number: 13,
    text: "I'm not sure what will cause me to fall back into my old, unhealthy behaviors.",
    stage: "relapse",
  },
  {
    number: 14,
    text: "I'm not sure I am ready to do things differently in my life.",
    stage: "contemplation",
  },
  {
    number: 15,
    text: "I am working to overcome obstacles in order to change my life.",
    stage: "action",
  },
  {
    number: 16,
    text: "I'm ready to put things in place to make a change.",
    stage: "preparation",
  },
  {
    number: 17,
    text: "I am aware of and encourage my new healthy behaviors and seek support when necessary.",
    stage: "maintenance",
  },
  {
    number: 18,
    text: "I had some success doing things differently but fell back into my old ways of doing things.",
    stage: "relapse",
  },
];

export function scoreStages(answers: AnswerResult[]): Record<StageId, number> {
  const totals = Object.fromEntries(
    STAGE_ORDER.map((stage) => [stage, 0]),
  ) as Record<StageId, number>;

  for (const answer of answers) {
    totals[answer.stage] += answer.score;
  }

  return totals;
}

export function buildAnswerResults(
  answers: Record<number, 0 | 1>,
): AnswerResult[] {
  return STAGES_QUESTIONS.map((question) => ({
    questionNumber: question.number,
    stage: question.stage,
    score: answers[question.number] ?? 0,
  }));
}
