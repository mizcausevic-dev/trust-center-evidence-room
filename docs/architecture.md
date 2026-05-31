# Architecture

Trust Center Evidence Room is a static-friendly TypeScript executive-intelligence layer for the Kinetic Gain trust, diligence, and buyer-readiness estate.

- `src/data/sampleVerticalBrief.ts` holds the modeled trust packets, owners, buyers, company tags, and related surfaces.
- `src/analyze.ts` scores artifact coverage, freshness, review readiness, control evidence, and prep-day drag.
- `src/services/verticalBriefService.ts` exposes the evidence-room, artifact-gap, review-readiness, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` renders the executive HTML surfaces and the sample JSON output.
- `scripts/prerender.ts` emits the static site, API payloads, `robots.txt`, and `sitemap.xml` for GitHub Pages.
