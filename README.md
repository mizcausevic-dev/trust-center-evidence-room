# Trust Center Evidence Room

Executive trust-room surface for evidence packaging, artifact freshness, review readiness, and buyer-safe diligence posture across the Kinetic Gain executive-intelligence estate.

- Live: `https://trust.kineticgain.com/`
- Repo: `mizcausevic-dev/trust-center-evidence-room`

## What it does
- maps reusable trust packets to ownership, blockers, control areas, and next move
- keeps artifact coverage, proof freshness, review readiness, and control evidence in one lane
- separates ready, needs-work, and blocked trust rooms before the next procurement, legal, or security review
- exposes the same trust posture through HTML, JSON APIs, screenshots, and a reproducible CLI

## Routes
- `/`
- `/evidence-room`
- `/artifact-gaps`
- `/review-readiness`
- `/verification`
- `/docs`

## Local run
```powershell
cd trust-center-evidence-room
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI
```powershell
npx trust-center-evidence-room fixtures/trust-center-evidence-room.json --format summary
npx trust-center-evidence-room fixtures/trust-center-evidence-room-clean.json --format json
```

## Verification
- synthetic sample data only
- no live customer trust centers, diligence packets, or private review artifacts
- all routes and packets are generated from the sample export in this repo
