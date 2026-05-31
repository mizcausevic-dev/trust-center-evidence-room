import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleTrustCenterEvidenceRoom } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleTrustCenterEvidenceRoom, { now: "2026-05-31T23:40:00Z" });
    expect(report.items).toBe(7);
  });

  it("computes positive trust-room metrics", () => {
    const report = analyze(sampleTrustCenterEvidenceRoom, { now: "2026-05-31T23:40:00Z" });
    expect(report.averageArtifactCoverage).toBeGreaterThan(0);
    expect(report.averageFreshness).toBeGreaterThan(0);
    expect(report.averageReviewReadiness).toBeGreaterThan(0);
    expect(report.averageControlEvidence).toBeGreaterThan(0);
  });

  it("counts ready and blocked evidence packs", () => {
    const report = analyze(sampleTrustCenterEvidenceRoom, { now: "2026-05-31T23:40:00Z" });
    expect(report.readyEvidencePacks).toBeGreaterThanOrEqual(1);
    expect(report.blockedEvidencePacks).toBeGreaterThanOrEqual(1);
  });

  it("emits evidence quality and ownership findings", () => {
    const report = analyze(sampleTrustCenterEvidenceRoom, { now: "2026-05-31T23:40:00Z" });
    expect(report.findingsList.some((finding) => finding.code === "reusable-evidence-pack")).toBe(true);
    expect(
      report.findingsList.some((finding) =>
        ["missing-artifact-coverage", "stale-proof", "slow-review-readiness", "blocked-by-ownership"].includes(
          finding.code
        )
      )
    ).toBe(true);
  });

  it("rolls up recovered time", () => {
    const report = analyze(sampleTrustCenterEvidenceRoom, { now: "2026-05-31T23:40:00Z" });
    expect(report.hoursRecoveredPerQuarter).toBeGreaterThan(0);
  });
});
