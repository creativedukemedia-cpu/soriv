import { LOCATION_PROMPT } from "./resources.ts";

export type NodeKind =
  | "answer"
  | "question"
  | "resource"
  | "crisis"
  | "placeholder";

export type ChatOption = {
  label: string;
  next: string;
};

export type ChatNode = {
  id: string;
  kind: NodeKind;
  text: string;
  options: ChatOption[];
};

export const ROOT_ID = "root";

export const nodes: Record<string, ChatNode> = {
  root: {
    id: "root",
    kind: "question",
    text: "Select a question:",
    options: [
      {
        label:
          "Can someone struggle with substance use even if they appear to have their life together?",
        next: "faq1-answer",
      },
      {
        label:
          "Can stress, anxiety, depression, or other emotional struggles contribute to substance use?",
        next: "faq2-answer",
      },
      {
        label:
          "Why might someone continue using substances even when they know the consequences?",
        next: "faq3-answer",
      },
      {
        label:
          "How can substance use affect children and other family members, even when they are not using substances themselves?",
        next: "faq4-answer",
      },
      {
        label:
          "How can I support someone who is struggling with substance use without enabling harmful behavior?",
        next: "faq5-answer",
      },
      {
        label:
          "What if someone wants help but feels ashamed, afraid, or worried about being judged?",
        next: "faq6-answer",
      },
      {
        label:
          "What does recovery really look like, and how can someone begin?",
        next: "faq7-answer",
      },
    ],
  },

  // --- FAQ 1 ---
  "faq1-answer": {
    id: "faq1-answer",
    kind: "answer",
    text: "Yes. Substance use challenges can affect people regardless of their education, employment, family responsibilities, or outward appearance. Some individuals continue to meet daily responsibilities while privately struggling. Avoiding assumptions and approaching people with compassion can reduce stigma and encourage them to seek support.",
    options: [{ label: "Continue", next: "faq1-followup" }],
  },
  "faq1-followup": {
    id: "faq1-followup",
    kind: "question",
    text: "Would you like to learn about possible warning signs, or how to approach someone you are concerned about?",
    options: [
      { label: "Warning signs", next: "faq1-warning-signs" },
      {
        label: "How to approach someone you are concerned about",
        next: "faq1-ph-approach",
      },
    ],
  },
  "faq1-warning-signs": {
    id: "faq1-warning-signs",
    kind: "answer",
    text: "Possible warning signs include using more than intended, unsuccessful attempts to cut back, strong cravings, neglecting responsibilities, or continuing to use despite harmful effects. These signs do not replace a professional assessment, but they may indicate that support would be helpful.",
    options: [{ label: "Continue", next: "faq1-next" }],
  },
  "faq1-next": {
    id: "faq1-next",
    kind: "question",
    text: "Are you concerned about your own substance use, or about someone else?",
    options: [
      { label: "Your own substance use", next: "faq1-ph-own" },
      { label: "Someone else", next: "faq1-ph-someone-else" },
    ],
  },
  "faq1-ph-approach": {
    id: "faq1-ph-approach",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq1-ph-own": {
    id: "faq1-ph-own",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq1-ph-someone-else": {
    id: "faq1-ph-someone-else",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },

  // --- FAQ 2 ---
  "faq2-answer": {
    id: "faq2-answer",
    kind: "answer",
    text: "Yes. Some people use substances to cope with difficult emotions, overwhelming stress, traumatic experiences, or mental health symptoms. Although substances may temporarily change how someone feels, they can also worsen emotional distress over time. Addressing mental health and substance use together can be an important part of recovery.",
    options: [{ label: "Continue", next: "faq2-followup" }],
  },
  "faq2-followup": {
    id: "faq2-followup",
    kind: "question",
    text: "Would you like to explore ways to cope with stress without substances, or learn about professional support?",
    options: [
      { label: "Ways to cope with stress", next: "faq2-cope-stress" },
      { label: "Professional support", next: "faq2-ph-professional" },
    ],
  },
  "faq2-cope-stress": {
    id: "faq2-cope-stress",
    kind: "answer",
    text: "Consider talking with someone you trust, trying slow breathing or grounding exercises, maintaining a regular sleep routine, engaging in physical activity, or making time for activities that help you feel connected. If distress is persistent or overwhelming, a mental health professional can help you explore additional strategies.",
    options: [{ label: "Continue", next: "faq2-next" }],
  },
  "faq2-next": {
    id: "faq2-next",
    kind: "question",
    text: "Would you also like information about counseling or low-cost support options?",
    options: [
      { label: "Yes", next: "faq2-ph-yes-counseling" },
      { label: "No", next: "faq2-ph-no-counseling" },
    ],
  },
  "faq2-ph-professional": {
    id: "faq2-ph-professional",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq2-ph-yes-counseling": {
    id: "faq2-ph-yes-counseling",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq2-ph-no-counseling": {
    id: "faq2-ph-no-counseling",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },

  // --- FAQ 3 ---
  "faq3-answer": {
    id: "faq3-answer",
    kind: "answer",
    text: "Substance use disorders are complex health conditions that can affect decision-making, cravings, and behavior. A person may want to stop but struggle with cravings, withdrawal symptoms, emotional distress, or environmental pressures. Understanding these challenges can replace blame with informed support while recognizing the importance of treatment and personal responsibility.",
    options: [{ label: "Continue", next: "faq3-followup" }],
  },
  "faq3-followup": {
    id: "faq3-followup",
    kind: "question",
    text: "Would you like to learn more about addiction, treatment options, or ways to support someone who is struggling?",
    options: [
      { label: "Addiction", next: "faq3-ph-addiction" },
      { label: "Treatment options", next: "faq3-treatment-options" },
      {
        label: "Ways to support someone who is struggling",
        next: "faq3-ph-support-someone",
      },
    ],
  },
  "faq3-treatment-options": {
    id: "faq3-treatment-options",
    kind: "answer",
    text: "Treatment may include counseling, medications when appropriate, peer recovery support, and other services matched to a person's needs. A healthcare professional or substance use treatment provider can help someone understand available options. Some substances can cause dangerous withdrawal symptoms, so medical guidance is important before stopping or reducing use.",
    options: [{ label: "Continue", next: "faq3-next" }],
  },
  "faq3-next": {
    id: "faq3-next",
    kind: "question",
    text: "Would you like help finding a treatment provider or learning how to start the conversation with someone?",
    options: [
      {
        label: "Finding a treatment provider",
        next: "faq3-ph-find-provider",
      },
      {
        label: "How to start the conversation with someone",
        next: "faq3-ph-start-conversation",
      },
    ],
  },
  "faq3-ph-addiction": {
    id: "faq3-ph-addiction",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq3-ph-support-someone": {
    id: "faq3-ph-support-someone",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq3-ph-find-provider": {
    id: "faq3-ph-find-provider",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq3-ph-start-conversation": {
    id: "faq3-ph-start-conversation",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },

  // --- FAQ 4 ---
  "faq4-answer": {
    id: "faq4-answer",
    kind: "answer",
    text: "Substance use can affect the whole family. Children and other loved ones may experience stress, uncertainty, changes in routines, financial difficulties, or strained relationships. They may feel confused, worried, or responsible for problems they did not cause. Families can benefit from education, counseling, support groups, and boundaries that promote safety and emotional well-being.",
    options: [{ label: "Continue", next: "faq4-followup" }],
  },
  "faq4-followup": {
    id: "faq4-followup",
    kind: "question",
    text: "Are you looking for ways to support a child or family member, or information about family counseling and support services?",
    options: [
      { label: "Supporting a child", next: "faq4-supporting-child" },
      {
        label: "Supporting a family member",
        next: "faq4-ph-family-member",
      },
      {
        label: "Family counseling and support services",
        next: "faq4-ph-family-counseling",
      },
    ],
  },
  "faq4-supporting-child": {
    id: "faq4-supporting-child",
    kind: "answer",
    text: "Offer reassurance that the child is not responsible for an adult's substance use. Use age-appropriate, honest language, maintain safe and predictable routines when possible, and identify a trusted adult the child can talk to. If a child's safety is at risk, seek appropriate professional or emergency help.",
    options: [{ label: "Continue", next: "faq4-next" }],
  },
  "faq4-next": {
    id: "faq4-next",
    kind: "question",
    text: "Would you like resources for family support, counseling, or help with an immediate safety concern?",
    options: [
      { label: "Family support", next: "faq4-ph-family-support" },
      { label: "Counseling", next: "faq4-ph-counseling" },
      {
        label: "Immediate safety concern",
        next: "faq4-ph-safety",
      },
    ],
  },
  "faq4-ph-family-member": {
    id: "faq4-ph-family-member",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq4-ph-family-counseling": {
    id: "faq4-ph-family-counseling",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq4-ph-family-support": {
    id: "faq4-ph-family-support",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq4-ph-counseling": {
    id: "faq4-ph-counseling",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq4-ph-safety": {
    id: "faq4-ph-safety",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },

  // --- FAQ 5 ---
  "faq5-answer": {
    id: "faq5-answer",
    kind: "answer",
    text: "Support means promoting a person's health and safety without taking responsibility for every choice or action. You can listen without judgment, encourage professional treatment, express concern honestly, and establish boundaries that protect your well-being. Avoid providing substances or participating in unsafe situations. You can offer support, but you cannot force another person to recover.",
    options: [{ label: "Continue", next: "faq5-followup" }],
  },
  "faq5-followup": {
    id: "faq5-followup",
    kind: "question",
    text: "Would you like examples of healthy boundaries, advice on starting a difficult conversation, or information about treatment resources?",
    options: [
      { label: "Healthy boundaries", next: "faq5-healthy-boundaries" },
      {
        label: "Starting a difficult conversation",
        next: "faq5-ph-difficult-conversation",
      },
      { label: "Treatment resources", next: "faq5-ph-treatment-resources" },
    ],
  },
  "faq5-healthy-boundaries": {
    id: "faq5-healthy-boundaries",
    kind: "answer",
    text: 'A boundary describes what you can and cannot do to protect your safety and well-being. For example: "I care about you, and I can help you look for treatment, but I cannot give you money for substances or allow unsafe behavior in my home." Choose boundaries you can maintain and seek support for yourself, too.',
    options: [{ label: "Continue", next: "faq5-next" }],
  },
  "faq5-next": {
    id: "faq5-next",
    kind: "question",
    text: "Would you like help planning a conversation, finding treatment options, or finding support for yourself?",
    options: [
      { label: "Planning a conversation", next: "faq5-ph-plan-conversation" },
      {
        label: "Finding treatment options",
        next: "faq5-ph-find-treatment",
      },
      {
        label: "Finding support for yourself",
        next: "faq5-ph-support-yourself",
      },
    ],
  },
  "faq5-ph-difficult-conversation": {
    id: "faq5-ph-difficult-conversation",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq5-ph-treatment-resources": {
    id: "faq5-ph-treatment-resources",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq5-ph-plan-conversation": {
    id: "faq5-ph-plan-conversation",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq5-ph-find-treatment": {
    id: "faq5-ph-find-treatment",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq5-ph-support-yourself": {
    id: "faq5-ph-support-yourself",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },

  // --- FAQ 6 ---
  "faq6-answer": {
    id: "faq6-answer",
    kind: "answer",
    text: "Fear of judgment can prevent people from seeking help. Someone may worry about disappointing loved ones, losing relationships, or being labeled because of their struggles. Asking for help is a positive step toward change. A trusted healthcare professional, counselor, or treatment provider can help the person explore options and identify appropriate support.",
    options: [{ label: "Continue", next: "faq6-followup" }],
  },
  "faq6-followup": {
    id: "faq6-followup",
    kind: "question",
    text: "Would you feel more comfortable exploring support options, learning what to expect from treatment, or finding a resource near you?",
    options: [
      {
        label: "Exploring support options",
        next: "faq6-ph-support-options",
      },
      {
        label: "What to expect from treatment",
        next: "faq6-expect-treatment",
      },
      {
        label: "Finding a resource near you",
        next: "faq6-ph-resource-near",
      },
    ],
  },
  "faq6-expect-treatment": {
    id: "faq6-expect-treatment",
    kind: "answer",
    text: "A first conversation often involves discussing a person's concerns, health, substance use, goals, and support needs. The provider can explain possible next steps and answer questions. The person can ask about privacy, costs, available services, and what treatment may involve.",
    options: [{ label: "Continue", next: "faq6-next" }],
  },
  "faq6-next": {
    id: "faq6-next",
    kind: "question",
    text: "Would you like help locating a service, or would you prefer tips for talking to a trusted person first?",
    options: [
      { label: "Help locating a service", next: "faq6-ph-locate-service" },
      {
        label: "Tips for talking to a trusted person first",
        next: "faq6-ph-trusted-person",
      },
    ],
  },
  "faq6-ph-support-options": {
    id: "faq6-ph-support-options",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq6-ph-resource-near": {
    id: "faq6-ph-resource-near",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq6-ph-locate-service": {
    id: "faq6-ph-locate-service",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq6-ph-trusted-person": {
    id: "faq6-ph-trusted-person",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },

  // --- FAQ 7 ---
  "faq7-answer": {
    id: "faq7-answer",
    kind: "answer",
    text: "Recovery is a personal process that may involve treatment, counseling, peer support, lifestyle changes, and rebuilding relationships. Progress may not always be straightforward, and setbacks do not mean recovery is impossible. A person can begin by speaking with a healthcare professional, contacting a treatment provider, or connecting with a trusted support service. The best starting point depends on the person's needs and safety.",
    options: [{ label: "Continue", next: "faq7-followup" }],
  },
  "faq7-followup": {
    id: "faq7-followup",
    kind: "question",
    text: "What kind of support would be most helpful right now: mental health counseling, substance use treatment, peer support, family support, or help finding local services?",
    options: [
      {
        label: "Mental health counseling",
        next: "faq7-ph-mental-health",
      },
      {
        label: "Substance use treatment",
        next: "faq7-ph-substance-treatment",
      },
      { label: "Peer support", next: "faq7-ph-peer-support" },
      { label: "Family support", next: "faq7-ph-family-support" },
      {
        label: "Help finding local services",
        next: "faq7-local-services",
      },
    ],
  },
  "faq7-local-services": {
    id: "faq7-local-services",
    kind: "question",
    text: LOCATION_PROMPT,
    // Location is collected via limited free text (county or ZIP only).
    options: [],
  },
  "faq7-local-results": {
    id: "faq7-local-results",
    kind: "resource",
    text: "Here are verified resources for that area.",
    options: [{ label: "Continue", next: "faq7-next" }],
  },
  "faq7-next": {
    id: "faq7-next",
    kind: "question",
    text: "Would you like to see contact information for local services, or learn what questions to ask a provider before starting?",
    options: [
      {
        label: "Contact information for local services",
        next: "faq7-ph-local-contacts",
      },
      {
        label: "What questions to ask a provider before starting",
        next: "faq7-ph-provider-questions",
      },
    ],
  },
  "faq7-ph-mental-health": {
    id: "faq7-ph-mental-health",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq7-ph-substance-treatment": {
    id: "faq7-ph-substance-treatment",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq7-ph-peer-support": {
    id: "faq7-ph-peer-support",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq7-ph-family-support": {
    id: "faq7-ph-family-support",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq7-ph-local-contacts": {
    id: "faq7-ph-local-contacts",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
  "faq7-ph-provider-questions": {
    id: "faq7-ph-provider-questions",
    kind: "placeholder",
    text: "TODO_CLIENT_CONTENT",
    options: [],
  },
};

export function getNode(id: string): ChatNode | undefined {
  return nodes[id];
}
