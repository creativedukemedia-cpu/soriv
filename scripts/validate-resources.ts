/**
 * Fails if any resource lastVerified date is older than 180 days.
 * Usage: node --experimental-strip-types scripts/validate-resources.ts
 */
import { ALL_RESOURCES, type Resource } from "../src/chatbot/resources.ts";

const MAX_AGE_DAYS = 180;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function ageInDays(isoDate: string, now: Date): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const verified = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(verified.getTime())) return null;
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  return Math.floor((today - verified.getTime()) / MS_PER_DAY);
}

function main(): void {
  const now = new Date();
  const errors: string[] = [];

  if (ALL_RESOURCES.length === 0) {
    errors.push("No resources found.");
  }

  for (const resource of ALL_RESOURCES) {
    checkResource(resource, now, errors);
  }

  if (errors.length > 0) {
    console.error("validate-resources failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }

  console.log(
    `validate-resources ok: ${ALL_RESOURCES.length} entries, all lastVerified within ${MAX_AGE_DAYS} days`,
  );
}

function checkResource(
  resource: Resource,
  now: Date,
  errors: string[],
): void {
  const age = ageInDays(resource.lastVerified, now);
  if (age === null) {
    errors.push(
      `${resource.name}: invalid lastVerified "${resource.lastVerified}" (expected YYYY-MM-DD)`,
    );
    return;
  }
  if (age > MAX_AGE_DAYS) {
    errors.push(
      `${resource.name}: lastVerified ${resource.lastVerified} is ${age} days old (max ${MAX_AGE_DAYS})`,
    );
  }
  if (age < 0) {
    errors.push(
      `${resource.name}: lastVerified ${resource.lastVerified} is in the future`,
    );
  }
}

main();
