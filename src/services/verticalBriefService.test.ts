import { describe, expect, it } from "vitest";
import {
  artifactGaps,
  evidenceRoom,
  payload,
  riskMap,
  reviewReadiness,
  summary,
  verification
} from "./verticalBriefService.js";

describe("security questionnaire answer studio service", () => {
  it("returns an executive summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the evidence room", () => {
    expect(evidenceRoom()[0]?.buyer).toBeTruthy();
  });

  it("returns the artifact gaps view", () => {
    expect(artifactGaps()[0]?.artifactCoverageScore).toBeGreaterThan(0);
  });

  it("returns the review readiness view", () => {
    expect(reviewReadiness()[0]?.reviewReadinessScore).toBeGreaterThan(0);
  });

  it("keeps the board story in the readiness view", () => {
    expect(reviewReadiness()[0]?.boardStory).toBeTruthy();
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
    expect(payload().verification.length).toBeGreaterThan(0);
  });
});
