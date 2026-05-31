import { readdir, rm, writeFile } from "node:fs/promises";
import { sampleTrustCenterEvidenceRoom } from "../src/data/sampleVerticalBrief.js";

async function main() {
  const clean = sampleTrustCenterEvidenceRoom.map((item) => ({
    ...item,
    evidenceState: item.evidenceState === "BLOCKED" ? ("NEEDS_WORK" as const) : item.evidenceState,
    artifactCoverageScore: Math.max(item.artifactCoverageScore, 84),
    freshnessScore: Math.max(item.freshnessScore, 80),
    reviewReadinessScore: Math.max(item.reviewReadinessScore, 82),
    controlEvidenceScore: Math.max(item.controlEvidenceScore, 80),
    reviewPrepDays: Math.min(item.reviewPrepDays, 6)
  }));

  await writeFile(
    "fixtures/trust-center-evidence-room.json",
    JSON.stringify(sampleTrustCenterEvidenceRoom, null, 2) + "\n"
  );
  await writeFile(
    "fixtures/trust-center-evidence-room-clean.json",
    JSON.stringify(clean, null, 2) + "\n"
  );

  const expected = new Set(["trust-center-evidence-room.json", "trust-center-evidence-room-clean.json"]);
  for (const file of await readdir("fixtures")) {
    if (expected.has(file)) {
      continue;
    }
    try {
      await rm(`fixtures/${file}`);
    } catch {
      // Ignore cleanup misses during scaffold replacement.
    }
  }
}

await main();
