import { readFile } from "node:fs/promises";
import { analyze } from "./analyze.js";
import { formatJson, formatSummary } from "./format.js";
import type { EvidenceRoomItem } from "./types.js";

const [, , filePath = "fixtures/trust-center-evidence-room.json", format = "--format", output = "summary"] =
  process.argv;

if (format !== "--format" || !["summary", "json"].includes(output)) {
  console.error("usage: trust-center-evidence-room <file> --format <summary|json>");
  process.exit(1);
}

const items = JSON.parse(await readFile(filePath, "utf8")) as EvidenceRoomItem[];
const report = analyze(items);

process.stdout.write(output === "json" ? formatJson(report) : formatSummary(report));
