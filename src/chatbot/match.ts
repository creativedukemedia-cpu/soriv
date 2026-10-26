import { ROOT_ID, nodes, type ChatNode } from "./tree.ts";

/** Max characters accepted for optional typed input (after trim). */
export const MAX_TEXT_INPUT_LENGTH = 280;

/** Minimum keyword overlap to accept a tree match. */
export const MATCH_SCORE_THRESHOLD = 3;

export const NO_MATCH_REPLY =
  "I do not have approved information on that. You can pick a topic below, or call 988 or SAMHSA at 1-800-662-4357.";

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "can",
  "do",
  "for",
  "from",
  "how",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "may",
  "me",
  "my",
  "no",
  "not",
  "of",
  "on",
  "or",
  "our",
  "so",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "to",
  "too",
  "up",
  "was",
  "we",
  "what",
  "when",
  "which",
  "who",
  "will",
  "with",
  "would",
  "you",
  "your",
]);

export type MatchResult = {
  nodeId: string | null;
  score: number;
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

function uniqueTokens(text: string): Set<string> {
  return new Set(tokenize(text));
}

/** Labels on other nodes that navigate to this node id. */
function buildInboundLabels(): Map<string, string[]> {
  const inbound = new Map<string, string[]>();
  for (const node of Object.values(nodes)) {
    for (const option of node.options) {
      const list = inbound.get(option.next) ?? [];
      list.push(option.label);
      inbound.set(option.next, list);
    }
  }
  return inbound;
}

const INBOUND_LABELS = buildInboundLabels();

function isMatchable(node: ChatNode): boolean {
  // Root is only a menu. Placeholders are not approved answers.
  if (node.id === ROOT_ID) return false;
  return (
    node.kind === "answer" ||
    node.kind === "question" ||
    node.kind === "resource"
  );
}

/** Approved text for this node, plus labels that navigate here (not child buttons). */
function corpusForNode(node: ChatNode): string {
  const inbound = INBOUND_LABELS.get(node.id) ?? [];
  return [node.text, ...inbound].join(" ");
}

function kindRank(kind: ChatNode["kind"]): number {
  if (kind === "answer") return 3;
  if (kind === "resource") return 2;
  if (kind === "question") return 1;
  return 0;
}

/**
 * Score overlap between the visitor's words and a node's approved text/labels.
 * No external services. Never invents answers.
 */
export function scoreNodeAgainstQuery(query: string, node: ChatNode): number {
  if (!isMatchable(node)) return 0;
  const queryTokens = uniqueTokens(query);
  if (queryTokens.size === 0) return 0;

  const nodeTokens = uniqueTokens(corpusForNode(node));
  let score = 0;
  for (const token of queryTokens) {
    if (nodeTokens.has(token)) score += 1;
  }
  return score;
}

/**
 * Find the closest tree node by keyword overlap.
 * Returns null nodeId when below threshold (caller shows NO_MATCH_REPLY + root).
 */
export function matchQueryToNode(query: string): MatchResult {
  const capped = query.trim().slice(0, MAX_TEXT_INPUT_LENGTH);
  if (!capped) return { nodeId: null, score: 0 };

  let bestId: string | null = null;
  let bestScore = 0;
  let bestRank = -1;

  for (const node of Object.values(nodes)) {
    const score = scoreNodeAgainstQuery(capped, node);
    const rank = kindRank(node.kind);
    if (
      score > bestScore ||
      (score === bestScore && score > 0 && rank > bestRank)
    ) {
      bestScore = score;
      bestId = node.id;
      bestRank = rank;
    }
  }

  if (bestScore < MATCH_SCORE_THRESHOLD || !bestId) {
    return { nodeId: null, score: bestScore };
  }

  return { nodeId: bestId, score: bestScore };
}

export function capTextInput(text: string): string {
  return text.trim().slice(0, MAX_TEXT_INPUT_LENGTH);
}
