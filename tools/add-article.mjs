#!/usr/bin/env node
// Append an article to docs/manifest.json — safe for a cron/generator to call.
//
// Usage:
//   node tools/add-article.mjs \
//     --title "The Antikythera Mechanism" \
//     --category "History" \
//     --teaser "A 2,000-year-old hand-cranked computer pulled from a shipwreck." \
//     --file "docs/antikythera-mechanism.html"
//
// Colours are auto-derived from the title in the feed, so you don't pass any.
// Re-running with an existing --file just updates that entry (no duplicates).

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "docs", "manifest.json");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const entry = {
  title: arg("title"),
  category: arg("category") || "Curiosity",
  teaser: arg("teaser") || "",
  file: arg("file"),
};

if (!entry.title || !entry.file) {
  console.error("Error: --title and --file are required.");
  process.exit(1);
}

const data = JSON.parse(await readFile(manifestPath, "utf8"));
data.articles ??= [];

const existing = data.articles.findIndex((a) => a.file === entry.file);
if (existing !== -1) {
  data.articles[existing] = entry;            // update in place
} else {
  data.articles.unshift(entry);               // newest first
}

await writeFile(manifestPath, JSON.stringify(data, null, 2) + "\n");
console.log(`${existing !== -1 ? "Updated" : "Added"}: ${entry.title} (${data.articles.length} total)`);
