import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  renderArtifactGaps,
  renderDocs,
  renderEvidenceRoom,
  renderOverview,
  renderReviewReadiness,
  renderSample,
  renderVerification
} from "../src/services/render.js";
import {
  artifactGaps,
  evidenceRoom,
  payload,
  reviewReadiness,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const outDir = path.resolve("site");

async function emit(filePath: string, contents: string) {
  const target = path.join(outDir, filePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

await rm(outDir, { recursive: true, force: true });

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("evidence-room", "index.html")]: renderEvidenceRoom(),
  [path.join("artifact-gaps", "index.html")]: renderArtifactGaps(),
  [path.join("review-readiness", "index.html")]: renderReviewReadiness(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://trust.kineticgain.com/sitemap.xml\n",
  "sitemap.xml":
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://trust.kineticgain.com/</loc></url><url><loc>https://trust.kineticgain.com/evidence-room/</loc></url><url><loc>https://trust.kineticgain.com/artifact-gaps/</loc></url><url><loc>https://trust.kineticgain.com/review-readiness/</loc></url><url><loc>https://trust.kineticgain.com/verification/</loc></url><url><loc>https://trust.kineticgain.com/docs/</loc></url></urlset>',
  [path.join("api", "dashboard-summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "evidence-room.json")]: JSON.stringify(evidenceRoom(), null, 2),
  [path.join("api", "artifact-gaps.json")]: JSON.stringify(artifactGaps(), null, 2),
  [path.join("api", "review-readiness.json")]: JSON.stringify(reviewReadiness(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: renderSample(),
  [path.join("api", "payload.json")]: JSON.stringify(payload(), null, 2)
};

for (const [filePath, contents] of Object.entries(files)) {
  await emit(filePath, contents);
}
