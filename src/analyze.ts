import type { EvidenceRoomExport, EvidenceRoomItem, EvidenceRoomReport, Finding } from "./types.js";

function average(items: EvidenceRoomItem[], pick: (item: EvidenceRoomItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: EvidenceRoomItem): Finding[] {
  const findings: Finding[] = [];

  if (item.evidenceState === "READY" && item.artifactCoverageScore >= 85 && item.controlEvidenceScore >= 80) {
    findings.push({
      code: "reusable-evidence-pack",
      severity: "high",
      sector: item.sector,
      buyer: item.buyer,
      message: "This evidence room is strong enough to reuse across new trust and diligence cycles right now."
    });
  }

  if (item.artifactCoverageScore < 78 || item.reviewReadinessScore < 70) {
    findings.push({
      code: "missing-artifact-coverage",
      severity: "high",
      sector: item.sector,
      buyer: item.buyer,
      message: "The evidence room is still too thin or fragmented, so reviewers will keep asking for manual follow-up packets."
    });
  }

  if (item.freshnessScore < 74 || item.controlEvidenceScore < 72) {
    findings.push({
      code: "stale-proof",
      severity: "medium",
      sector: item.sector,
      buyer: item.buyer,
      message: "The proof set is not fresh or tightly linked enough yet, so the trust story still feels brittle."
    });
  }

  if (item.reviewPrepDays > 7) {
    findings.push({
      code: "slow-review-readiness",
      severity: item.reviewPrepDays > 10 ? "high" : "low",
      sector: item.sector,
      buyer: item.buyer,
      message: "Review prep still takes too long, which slows diligence cycles and weakens buyer confidence."
    });
  }

  if (item.evidenceState === "BLOCKED") {
    findings.push({
      code: "blocked-by-ownership",
      severity: "high",
      sector: item.sector,
      buyer: item.buyer,
      message: "This trust room is blocked by missing ownership or packaging, so the buyer path cannot move cleanly."
    });
  }

  return findings;
}

export function analyze(items: EvidenceRoomItem[], options: { now?: string } = {}): EvidenceRoomReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const readyEvidencePacks = items.filter((item) => item.evidenceState === "READY").length;
  const blockedEvidencePacks = items.filter((item) => item.evidenceState === "BLOCKED").length;
  const averageReviewPrepDays = Number(
    (items.reduce((sum, item) => sum + item.reviewPrepDays, 0) / items.length).toFixed(1)
  );

  return {
    generatedAt,
    items: items.length,
    averageArtifactCoverage: average(items, (item) => item.artifactCoverageScore),
    averageFreshness: average(items, (item) => item.freshnessScore),
    averageReviewReadiness: average(items, (item) => item.reviewReadinessScore),
    averageControlEvidence: average(items, (item) => item.controlEvidenceScore),
    readyEvidencePacks,
    blockedEvidencePacks,
    averageReviewPrepDays,
    hoursRecoveredPerQuarter: readyEvidencePacks * 24 + items.filter((item) => item.reviewPrepDays > 7).length * 10,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: EvidenceRoomItem[], now?: string): EvidenceRoomExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
