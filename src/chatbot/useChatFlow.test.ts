import assert from "node:assert/strict";
import { test } from "node:test";
import { CRISIS_MESSAGE } from "./crisis.ts";
import {
  LOCAL_SERVICES_ASK_ID,
  LOCAL_SERVICES_RESULTS_ID,
  LOCATION_INVALID_REPLY,
  NATIONAL_RESOURCES,
} from "./resources.ts";
import { ROOT_ID, getNode } from "./tree.ts";
import {
  PLACEHOLDER_REPLY,
  createInitialState,
  goBack,
  restartFlow,
  selectOption,
  submitFreeText,
} from "./useChatFlow.ts";

function goToLocalServicesAsk(s: { n: number }) {
  let state = createInitialState(s);
  state = selectOption(state, "faq7-answer", s);
  state = selectOption(state, "faq7-followup", s);
  state = selectOption(state, LOCAL_SERVICES_ASK_ID, s);
  return state;
}

function seq() {
  return { n: 0 };
}

test("starts at root with the root prompt", () => {
  const state = createInitialState(seq());
  const root = getNode(ROOT_ID)!;
  assert.equal(state.currentNodeId, ROOT_ID);
  assert.equal(state.path.length, 1);
  assert.equal(state.inCrisis, false);
  assert.equal(state.history.length, 1);
  assert.equal(state.history[0]?.role, "assistant");
  assert.equal(state.history[0]?.text, root.text);
});

test("select navigates FAQ 1 through the written pathway", () => {
  const s = seq();
  let state = createInitialState(s);

  state = selectOption(state, "faq1-answer", s);
  assert.equal(state.currentNodeId, "faq1-answer");
  assert.equal(state.history.at(-1)?.text, getNode("faq1-answer")!.text);

  state = selectOption(state, "faq1-followup", s);
  assert.equal(state.currentNodeId, "faq1-followup");

  state = selectOption(state, "faq1-warning-signs", s);
  assert.equal(state.currentNodeId, "faq1-warning-signs");
  assert.equal(
    state.history.at(-1)?.text,
    getNode("faq1-warning-signs")!.text,
  );

  state = selectOption(state, "faq1-next", s);
  assert.equal(state.currentNodeId, "faq1-next");
  assert.ok(state.path.includes("faq1-answer"));
  assert.ok(state.history.some((m) => m.role === "user" && m.text === "Warning signs"));
});

test("select ignores unknown option ids", () => {
  const s = seq();
  const before = createInitialState(s);
  const after = selectOption(before, "not-a-real-option", s);
  assert.deepEqual(after, before);
});

test("placeholder nodes show the fixed referral reply", () => {
  const s = seq();
  let state = createInitialState(s);
  state = selectOption(state, "faq1-answer", s);
  state = selectOption(state, "faq1-followup", s);
  state = selectOption(state, "faq1-ph-approach", s);

  assert.equal(state.currentNodeId, "faq1-ph-approach");
  assert.equal(getNode("faq1-ph-approach")!.kind, "placeholder");
  assert.equal(state.history.at(-1)?.text, PLACEHOLDER_REPLY);
  assert.equal(
    PLACEHOLDER_REPLY,
    "I do not have information on that yet. Please call 988 or SAMHSA at 1-800-662-4357.",
  );
  assert.notEqual(state.history.at(-1)?.text, "TODO_CLIENT_CONTENT");
});

test("back returns to the previous node and trims history", () => {
  const s = seq();
  let state = createInitialState(s);
  state = selectOption(state, "faq2-answer", s);
  state = selectOption(state, "faq2-followup", s);
  assert.equal(state.currentNodeId, "faq2-followup");
  assert.equal(state.path.length, 3);

  state = goBack(state, s);
  assert.equal(state.currentNodeId, "faq2-answer");
  assert.equal(state.path.length, 2);
  assert.equal(state.history.at(-1)?.nodeId, "faq2-answer");

  state = goBack(state, s);
  assert.equal(state.currentNodeId, ROOT_ID);
  assert.equal(state.path.length, 1);
  assert.equal(state.history.length, 1);
});

test("back at root is a no-op", () => {
  const s = seq();
  const before = createInitialState(s);
  const after = goBack(before, s);
  assert.equal(after.currentNodeId, ROOT_ID);
  assert.equal(after.history.length, 1);
});

test("restart clears the path and returns to root", () => {
  const s = seq();
  let state = createInitialState(s);
  state = selectOption(state, "faq3-answer", s);
  state = selectOption(state, "faq3-followup", s);
  state = selectOption(state, "faq3-treatment-options", s);

  state = restartFlow(s);
  assert.equal(state.currentNodeId, ROOT_ID);
  assert.deepEqual(state.path, [ROOT_ID]);
  assert.equal(state.inCrisis, false);
  assert.equal(state.history.length, 1);
  assert.equal(state.history[0]?.text, getNode(ROOT_ID)!.text);
});

test("free text with crisis language returns the fixed crisis message", () => {
  const s = seq();
  let state = createInitialState(s);
  state = submitFreeText(state, "I want to kill myself", s);

  assert.equal(state.inCrisis, true);
  assert.equal(state.history.at(-2)?.role, "user");
  assert.equal(state.history.at(-2)?.text, "I want to kill myself");
  assert.equal(state.history.at(-1)?.isCrisis, true);
  assert.ok(
    state.history.at(-1)?.text.includes(CRISIS_MESSAGE.headline),
  );
  assert.ok(state.history.at(-1)?.text.includes("911"));
  assert.ok(state.history.at(-1)?.text.includes("988"));
  assert.ok(state.history.at(-1)?.text.includes("1-800-662-4357"));
});

test("free text without crisis does not change state outside location ask", () => {
  const s = seq();
  const before = createInitialState(s);
  const after = submitFreeText(before, "Tell me about recovery", s, {
    enableTextMatch: false,
  });
  assert.deepEqual(after, before);
});

test("FAQ 7 local services asks for county or ZIP and shows national fallback", () => {
  const s = seq();
  let state = goToLocalServicesAsk(s);
  assert.equal(state.currentNodeId, LOCAL_SERVICES_ASK_ID);
  assert.equal(getNode(LOCAL_SERVICES_ASK_ID)!.options.length, 0);

  state = submitFreeText(state, "Wicomico", s);
  assert.equal(state.currentNodeId, LOCAL_SERVICES_RESULTS_ID);
  const reply = state.history.at(-1)?.text ?? "";
  assert.ok(reply.includes("national resources"));
  for (const resource of NATIONAL_RESOURCES) {
    assert.ok(reply.includes(resource.name));
    assert.ok(reply.includes(`Last verified: ${resource.lastVerified}`));
  }

  state = selectOption(state, "faq7-next", s);
  assert.equal(state.currentNodeId, "faq7-next");
});

test("ZIP lookup also falls back to national listings", () => {
  const s = seq();
  let state = goToLocalServicesAsk(s);
  state = submitFreeText(state, "21801", s);
  assert.equal(state.currentNodeId, LOCAL_SERVICES_RESULTS_ID);
  assert.ok(state.history.at(-1)?.text.includes("FindTreatment.gov"));
});

test("location ask rejects free text that is not county or ZIP", () => {
  const s = seq();
  let state = goToLocalServicesAsk(s);
  state = submitFreeText(state, "please find me a clinic nearby", s);
  assert.equal(state.currentNodeId, LOCAL_SERVICES_ASK_ID);
  assert.equal(state.history.at(-1)?.text, LOCATION_INVALID_REPLY);
});

test("crisis still wins over location lookup", () => {
  const s = seq();
  let state = goToLocalServicesAsk(s);
  state = submitFreeText(state, "I want to kill myself", s);
  assert.equal(state.inCrisis, true);
  assert.ok(state.history.at(-1)?.text.includes(CRISIS_MESSAGE.headline));
});

test("select is blocked while in crisis until back or restart", () => {
  const s = seq();
  let state = createInitialState(s);
  state = submitFreeText(state, "I want to kill myself", s);
  const blocked = selectOption(state, "faq1-answer", s);
  assert.equal(blocked.currentNodeId, ROOT_ID);
  assert.equal(blocked.inCrisis, true);

  state = goBack(blocked, s);
  assert.equal(state.inCrisis, false);
  state = selectOption(state, "faq1-answer", s);
  assert.equal(state.currentNodeId, "faq1-answer");
});

test("restart after crisis resets fully", () => {
  const s = seq();
  let state = createInitialState(s);
  state = selectOption(state, "faq1-answer", s);
  state = submitFreeText(state, "I am suicidal", s);
  state = restartFlow(s);
  assert.equal(state.currentNodeId, ROOT_ID);
  assert.equal(state.inCrisis, false);
  assert.equal(state.history.length, 1);
});
