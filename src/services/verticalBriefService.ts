import { analyze } from "../analyze.js";
import { sampleTrustCenterEvidenceRoom } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleTrustCenterEvidenceRoom, { now: "2026-05-31T23:59:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageArtifactCoverage: report.averageArtifactCoverage,
    averageFreshness: report.averageFreshness,
    averageReviewReadiness: report.averageReviewReadiness,
    averageControlEvidence: report.averageControlEvidence,
    readyEvidencePacks: report.readyEvidencePacks,
    blockedEvidencePacks: report.blockedEvidencePacks,
    averageReviewPrepDays: report.averageReviewPrepDays,
    hoursRecoveredPerQuarter: report.hoursRecoveredPerQuarter,
    highFindings,
    recommendation:
      "Standardize AI, identity, and healthcare trust packets first, tighten FinTech and biotech artifact freshness next, and package public-sector ownership as the final explicit unblocker."
  };
}

export function evidenceRoom() {
  return sampleTrustCenterEvidenceRoom.map((item) => ({
    owner: item.owner,
    buyer: item.buyer,
    reviewStage: item.reviewStage,
    evidenceState: item.evidenceState,
    controlArea: item.controlArea,
    operatingQuestion: item.operatingQuestion,
    headlineGap: item.headlineGap,
    nextMove: item.nextMove
  }));
}

export function artifactGaps() {
  return sampleTrustCenterEvidenceRoom.map((item) => ({
    owner: item.owner,
    buyer: item.buyer,
    controlArea: item.controlArea,
    artifactCoverageScore: item.artifactCoverageScore,
    freshnessScore: item.freshnessScore,
    currentEvidence: item.currentEvidence,
    companyTags: item.companyTags
  }));
}

export function reviewReadiness() {
  return sampleTrustCenterEvidenceRoom.map((item) => ({
    buyer: item.buyer,
    owner: item.owner,
    reviewReadinessScore: item.reviewReadinessScore,
    controlEvidenceScore: item.controlEvidenceScore,
    reviewPrepDays: item.reviewPrepDays,
    boardStory: item.boardStory,
    companyTags: item.companyTags,
    relatedSurfaces: item.relatedSurfaces
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic trust-room data only - no live customer trust centers, evidence packets, or diligence artifacts are included.",
    "Artifact coverage, freshness, review readiness, control evidence, and prep-day metrics are modeled from the sample trust-room set in this repo.",
    "This surface is read-only and designed to show how Kinetic Gain can package reusable trust evidence as an executive product.",
    "Company tags and related surfaces are synthetic evidence-design aids rather than audited references.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    evidenceRoom: evidenceRoom(),
    artifactGaps: artifactGaps(),
    reviewReadiness: reviewReadiness(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleTrustCenterEvidenceRoom
  };
}
