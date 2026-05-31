import express from "express";
import {
  renderArtifactGaps,
  renderDocs,
  renderEvidenceRoom,
  renderOverview,
  renderReviewReadiness,
  renderSample,
  renderVerification
} from "./services/render.js";
import {
  artifactGaps,
  evidenceRoom,
  payload,
  riskMap,
  reviewReadiness,
  summary,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/evidence-room", (_req, res) => res.type("html").send(renderEvidenceRoom()));
  app.get("/artifact-gaps", (_req, res) => res.type("html").send(renderArtifactGaps()));
  app.get("/review-readiness", (_req, res) => res.type("html").send(renderReviewReadiness()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/evidence-room", (_req, res) => res.json(evidenceRoom()));
  app.get("/api/artifact-gaps", (_req, res) => res.json(artifactGaps()));
  app.get("/api/review-readiness", (_req, res) => res.json(reviewReadiness()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.type("application/json").send(renderSample()));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? "3000");
  createApp().listen(port, () => {
    console.log(`trust-center-evidence-room listening on http://127.0.0.1:${port}`);
  });
}
