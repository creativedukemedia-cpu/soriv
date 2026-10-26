import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  LOCAL_SERVICES_ASK_ID,
  LOCAL_SERVICES_RESULTS_ID,
} from "../src/chatbot/resources.ts";
import { nodes, ROOT_ID, type ChatNode } from "../src/chatbot/tree.ts";

/** Edges reached by limited free text (not button options). */
const FREE_TEXT_EDGES: ReadonlyArray<readonly [string, string]> = [
  [LOCAL_SERVICES_ASK_ID, LOCAL_SERVICES_RESULTS_ID],
];

type PlaceholderRow = {
  nodeId: string;
  parentFaq: string;
  buttonLabel: string;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const strict = process.argv.includes("--strict");
const writePlaceholders = process.argv.includes("--write-placeholders");

function faqFromId(id: string): string {
  const match = /^faq(\d+)/.exec(id);
  return match ? `FAQ ${match[1]}` : "root / other";
}

function collectPlaceholders(): PlaceholderRow[] {
  const rows: PlaceholderRow[] = [];
  for (const node of Object.values(nodes)) {
    for (const option of node.options) {
      const target = nodes[option.next];
      if (target?.kind === "placeholder") {
        rows.push({
          nodeId: target.id,
          parentFaq: faqFromId(node.id),
          buttonLabel: option.label,
        });
      }
    }
  }
  rows.sort((a, b) => {
    const faqCmp = a.parentFaq.localeCompare(b.parentFaq);
    if (faqCmp !== 0) return faqCmp;
    return a.nodeId.localeCompare(b.nodeId);
  });
  return rows;
}

function findDanglingIds(): string[] {
  const dangling: string[] = [];
  for (const node of Object.values(nodes)) {
    for (const option of node.options) {
      if (!nodes[option.next]) {
        dangling.push(`${node.id} -> ${option.next} (label: ${option.label})`);
      }
    }
  }
  return dangling;
}

function findUnreachable(): string[] {
  if (!nodes[ROOT_ID]) {
    return [`missing root id "${ROOT_ID}"`];
  }
  const seen = new Set<string>();
  const queue: string[] = [ROOT_ID];
  while (queue.length > 0) {
    const id = queue.shift()!;
    if (seen.has(id)) continue;
    seen.add(id);
    const node = nodes[id];
    if (!node) continue;
    for (const option of node.options) {
      if (!seen.has(option.next)) queue.push(option.next);
    }
    for (const [from, to] of FREE_TEXT_EDGES) {
      if (from === id && !seen.has(to)) queue.push(to);
    }
  }
  return Object.keys(nodes).filter((id) => !seen.has(id));
}

function findIdMismatches(): string[] {
  const mismatches: string[] = [];
  for (const [key, node] of Object.entries(nodes)) {
    if (key !== node.id) {
      mismatches.push(`key "${key}" !== node.id "${node.id}"`);
    }
  }
  return mismatches;
}

function placeholdersMarkdown(rows: PlaceholderRow[]): string {
  const lines = [
    "# Chatbot placeholders (client content owed)",
    "",
    "These buttons lead to nodes with text `TODO_CLIENT_CONTENT`. No pathway text was provided in `docs/faq.md` / Group_2_FAQ.pdf.",
    "",
    "| Node id | Parent FAQ | Button label that leads here |",
    "| --- | --- | --- |",
  ];
  for (const row of rows) {
    const label = row.buttonLabel.replace(/\|/g, "\\|");
    lines.push(`| \`${row.nodeId}\` | ${row.parentFaq} | ${label} |`);
  }
  lines.push("");
  return lines.join("\n");
}

function main(): void {
  const errors: string[] = [];

  const mismatches = findIdMismatches();
  if (mismatches.length > 0) {
    errors.push("ID mismatches:");
    errors.push(...mismatches.map((m) => `  - ${m}`));
  }

  const dangling = findDanglingIds();
  if (dangling.length > 0) {
    errors.push("Dangling option targets:");
    errors.push(...dangling.map((d) => `  - ${d}`));
  }

  const unreachable = findUnreachable();
  if (unreachable.length > 0) {
    errors.push("Unreachable nodes:");
    errors.push(...unreachable.map((u) => `  - ${u}`));
  }

  const placeholders = collectPlaceholders();
  const placeholderNodes = Object.values(nodes).filter(
    (n: ChatNode) => n.kind === "placeholder",
  );

  if (writePlaceholders) {
    const outPath = join(repoRoot, "docs/placeholders.md");
    writeFileSync(outPath, placeholdersMarkdown(placeholders), "utf8");
    console.log(`Wrote ${outPath} (${placeholders.length} rows)`);
  }

  if (strict && placeholderNodes.length > 0) {
    errors.push(
      `--strict: ${placeholderNodes.length} placeholder node(s) still present:`,
    );
    errors.push(...placeholderNodes.map((n) => `  - ${n.id}`));
  }

  if (errors.length > 0) {
    console.error("validate-tree failed:\n" + errors.join("\n"));
    process.exit(1);
  }

  console.log(
    `validate-tree ok: ${Object.keys(nodes).length} nodes, ${placeholders.length} placeholder edges` +
      (strict ? " (strict)" : ""),
  );
}

main();
