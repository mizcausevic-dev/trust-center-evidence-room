export type EvidenceSector =
  | "AI_PLATFORM"
  | "CLOUD_IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "GOVTECH_PUBLIC_SECTOR"
  | "HEALTHTECH";

export type ReviewStage = "TRUST_REVIEW" | "SECURITY_REVIEW" | "LEGAL_REVIEW" | "PROCUREMENT_REVIEW";

export type EvidenceState = "READY" | "NEEDS_WORK" | "BLOCKED";

export interface EvidenceRoomItem {
  id: string;
  owner: string;
  buyer: string;
  sector: EvidenceSector;
  reviewStage: ReviewStage;
  evidenceState: EvidenceState;
  controlArea: string;
  operatingQuestion: string;
  currentEvidence: string;
  headlineGap: string;
  artifactCoverageScore: number;
  freshnessScore: number;
  reviewReadinessScore: number;
  controlEvidenceScore: number;
  reviewPrepDays: number;
  boardStory: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
}

export interface EvidenceRoomExport {
  generatedAt: string;
  items: EvidenceRoomItem[];
}

export type FindingCode =
  | "reusable-evidence-pack"
  | "missing-artifact-coverage"
  | "stale-proof"
  | "slow-review-readiness"
  | "blocked-by-ownership";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  sector: EvidenceSector;
  buyer: string;
  message: string;
}

export interface EvidenceRoomReport {
  generatedAt: string;
  items: number;
  averageArtifactCoverage: number;
  averageFreshness: number;
  averageReviewReadiness: number;
  averageControlEvidence: number;
  readyEvidencePacks: number;
  blockedEvidencePacks: number;
  averageReviewPrepDays: number;
  hoursRecoveredPerQuarter: number;
  findingsList: Finding[];
  ok: boolean;
}
