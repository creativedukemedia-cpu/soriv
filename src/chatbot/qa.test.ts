/**
 * Step 15 QA / red-team coverage for the chatbot.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { CRISIS_MESSAGE } from "./crisis.ts";
import {
  CRISIS_PHRASES,
  HARMFUL_ADVICE_REQUESTS,
} from "./crisis.fixtures.ts";
import { NO_MATCH_REPLY } from "./match.ts";
import { LOCAL_SERVICES_ASK_ID } from "./resources.ts";
import {
  ROOT_ID,
  getNode,
  nodes,
  type ChatNode,
} from "./tree.ts";
import {
  PLACEHOLDER_REPLY,
  createInitialState,
  selectOption,
  submitFreeText,
} from "./useChatFlow.ts";

function seq() {
  return { n: 0 };
}

function formatCrisisCard(): string {
  return `${CRISIS_MESSAGE.headline}\n\n${CRISIS_MESSAGE.body}`;
}

const ADVICE_LEAK =
  /\b(\d+\s*mg|milligrams?|take\s+\d|mix(ing)?\s+with|detox\s+at\s+home|cold\s+turkey\s+schedule|wean\s+off\s+by\s+taking)\b/i;

test("every crisis phrase returns the fixed crisis card via submitFreeText", () => {
  const expected = formatCrisisCard();
  assert.ok(CRISIS_PHRASES.length >= 20);

  for (const phrase of CRISIS_PHRASES) {
    const s = seq();
    const state = submitFreeText(createInitialState(s), phrase, s, {
      enableTextMatch: true,
    });
    assert.equal(state.inCrisis, true, `inCrisis for: ${phrase}`);
    assert.equal(state.history.at(-1)?.isCrisis, true, `isCrisis for: ${phrase}`);
    assert.equal(
      state.history.at(-1)?.text,
      expected,
      `fixed card text for: ${phrase}`,
    );
    assert.ok(state.history.at(-1)?.text.includes("911"));
    assert.ok(state.history.at(-1)?.text.includes("988"));
    assert.ok(state.history.at(-1)?.text.includes("1-800-662-4357"));
  }
});

test("every button path ends in answer, resource, placeholder fallback, or location ask", () => {
  const allowedLeafKinds = new Set(["answer", "resource", "placeholder", "crisis"]);

  function walk(nodeId: string, path: string[]): void {
    const node = getNode(nodeId);
    assert.ok(node, `missing node on path ${path.join(" -> ")}`);

    if (node.options.length === 0) {
      const ok =
        allowedLeafKinds.has(node.kind) || node.id === LOCAL_SERVICES_ASK_ID;
      assert.ok(
        ok,
        `leaf ${node.id} kind=${node.kind} on path ${path.join(" -> ")}`,
      );
      if (node.kind === "placeholder") {
        assert.equal(node.text, "TODO_CLIENT_CONTENT");
      }
      return;
    }

    for (const option of node.options) {
      assert.ok(
        getNode(option.next),
        `dangling ${node.id} -> ${option.next}`,
      );
      walk(option.next, [...path, option.next]);
    }
  }

  walk(ROOT_ID, [ROOT_ID]);
});

test("every tree node is reachable from root or is not orphaned", () => {
  const seen = new Set<string>();
  const queue = [ROOT_ID];
  while (queue.length > 0) {
    const id = queue.shift()!;
    if (seen.has(id)) continue;
    seen.add(id);
    const node = nodes[id];
    if (!node) continue;
    for (const option of node.options) {
      queue.push(option.next);
    }
    // Location results are reached via free text, not buttons.
    if (id === LOCAL_SERVICES_ASK_ID) {
      queue.push("faq7-local-results");
    }
  }
  for (const id of Object.keys(nodes)) {
    assert.ok(seen.has(id), `unreachable node: ${id}`);
  }
});

test("root FAQ pathways each reach an answer before any leaf", () => {
  const root = getNode(ROOT_ID)!;
  assert.equal(root.options.length, 7);

  for (const option of root.options) {
    const answer = getNode(option.next);
    assert.ok(answer, option.next);
    assert.equal(
      answer!.kind,
      "answer",
      `FAQ entry ${option.next} should be an answer`,
    );
    assert.notEqual(answer!.text, "TODO_CLIENT_CONTENT");
  }
});

test("dosing, mixing, and home-detox requests never return advice", () => {
  const crisisCard = formatCrisisCard();

  for (const phrase of HARMFUL_ADVICE_REQUESTS) {
    const s = seq();
    const state = submitFreeText(createInitialState(s), phrase, s, {
      enableTextMatch: true,
    });
    const reply = state.history.at(-1)?.text ?? "";

    // Crisis card (safer) or no-match fallback are both OK; never tree advice.
    if (state.inCrisis) {
      assert.equal(reply, crisisCard, `crisis card for: ${phrase}`);
    } else {
      assert.equal(reply, NO_MATCH_REPLY, `fallback for: ${phrase}`);
      assert.equal(state.currentNodeId, ROOT_ID);
    }

    assert.equal(reply.match(ADVICE_LEAK), null, `advice leak for: ${phrase}`);
    assert.notEqual(
      state.history.at(-1)?.nodeId?.startsWith("faq"),
      true,
      `must not land on FAQ content for: ${phrase}`,
    );
  }
});

test("placeholder leaves surface the fixed referral reply in the flow", () => {
  const s = seq();
  let state = createInitialState(s);
  state = selectOption(state, "faq1-answer", s);
  state = selectOption(state, "faq1-followup", s);
  state = selectOption(state, "faq1-ph-approach", s);
  assert.equal(state.history.at(-1)?.text, PLACEHOLDER_REPLY);
  assert.ok(PLACEHOLDER_REPLY.includes("988"));
  assert.ok(PLACEHOLDER_REPLY.includes("1-800-662-4357"));
});

test("no approved answer node contains DIY dosing or home-detox instructions", () => {
  const offenders: string[] = [];
  for (const node of Object.values(nodes) as ChatNode[]) {
    if (node.kind !== "answer" && node.kind !== "resource") continue;
    if (ADVICE_LEAK.test(node.text)) {
      offenders.push(node.id);
    }
  }
  assert.deepEqual(offenders, []);
});
