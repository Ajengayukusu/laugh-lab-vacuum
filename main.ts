// SPDX-License-Identifier: MIT
// One-Liner Laugh Lab — one short funny line answering a prompt, at
// most 200 characters. The prompt is the robot vacuum's excuse after
// eating a sock. The joke is the rebrand: it did not eat the sock, it
// relocated it somewhere safe forever.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I didn't eat your sock. I relocated it to a place of honour under the sofa, where it will be safe forever.";

const MAX_CHARS = 200;

function entryLine(): string {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry must be a single line");
  }
  // No control characters and no accidental double spaces: either would
  // break the one-line rendering the judge sees.
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (/  /.test(line)) {
    throw new Error("entry must not contain double spaces");
  }
  return line;
}

function main(): void {
  const line = entryLine();
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.log(`wrote ${line.length} characters to /output/entry.txt`);
}

main();
