import type { EvidenceRoomReport } from "./types.js";

export function formatSummary(report: EvidenceRoomReport) {
  return [
    `Generated: ${report.generatedAt}`,
    `Routes: ${report.items}`,
    `Average artifact coverage: ${report.averageArtifactCoverage}`,
    `Average freshness: ${report.averageFreshness}`,
    `Average review readiness: ${report.averageReviewReadiness}`,
    `Average control evidence: ${report.averageControlEvidence}`,
    `Ready evidence packs: ${report.readyEvidencePacks}`,
    `Blocked evidence packs: ${report.blockedEvidencePacks}`,
    `Average review prep days: ${report.averageReviewPrepDays}`,
    `Hours recovered per quarter: ${report.hoursRecoveredPerQuarter}`,
    `Findings: ${report.findingsList.length}`,
    `OK: ${report.ok ? "yes" : "no"}`
  ].join("\n");
}

export function formatJson(report: EvidenceRoomReport) {
  return JSON.stringify(report, null, 2);
}
