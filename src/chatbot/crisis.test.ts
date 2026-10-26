import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CRISIS_MESSAGE,
  detectCrisis,
  getCrisisMessageLines,
} from "./crisis.ts";
import { CRISIS_PHRASES, NON_CRISIS_PHRASES } from "./crisis.fixtures.ts";

test("CRISIS_MESSAGE includes 911, 988, and SAMHSA", () => {
  const details = CRISIS_MESSAGE.lines.map((l) => `${l.label} ${l.detail} ${l.href}`);
  assert.ok(details.some((d) => d.includes("911") && d.includes("tel:911")));
  assert.ok(details.some((d) => d.includes("988") && d.includes("tel:988")));
  assert.ok(
    details.some(
      (d) => d.includes("1-800-662-4357") && d.includes("tel:18006624357"),
    ),
  );
  assert.equal(CRISIS_MESSAGE.campusCounselingPhone, "");
  assert.equal(CRISIS_MESSAGE.campusSecurityPhone, "");
  assert.equal(getCrisisMessageLines().length, 3);
});

test("flags crisis phrases", () => {
  for (const phrase of CRISIS_PHRASES) {
    assert.equal(
      detectCrisis(phrase),
      true,
      `expected crisis for: ${JSON.stringify(phrase)}`,
    );
  }
});

test("does not flag common false positives", () => {
  for (const phrase of NON_CRISIS_PHRASES) {
    assert.equal(
      detectCrisis(phrase),
      false,
      `expected non-crisis for: ${JSON.stringify(phrase)}`,
    );
  }
});

test("empty and whitespace are not crisis", () => {
  assert.equal(detectCrisis(""), false);
  assert.equal(detectCrisis("   "), false);
});

test("phrase list sizes meet the gate", () => {
  assert.ok(
    CRISIS_PHRASES.length + NON_CRISIS_PHRASES.length >= 40,
    `need >= 40 phrases, got ${CRISIS_PHRASES.length + NON_CRISIS_PHRASES.length}`,
  );
  assert.ok(CRISIS_PHRASES.length >= 20);
  assert.ok(NON_CRISIS_PHRASES.length >= 10);
});
