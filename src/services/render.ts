import { toExport } from "../analyze.js";
import { sampleTrustCenterEvidenceRoom } from "../data/sampleVerticalBrief.js";
import {
  artifactGaps,
  evidenceRoom,
  payload,
  reviewReadiness,
  riskMap,
  summary,
  verification
} from "./verticalBriefService.js";

const productTitle = "Trust Center Evidence Room";
const domain = "https://trust.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function shell(title: string, active: string, body: string, description: string) {
  const routes = [
    ["/", "Overview"],
    ["/evidence-room", "Evidence room"],
    ["/artifact-gaps", "Artifact gaps"],
    ["/review-readiness", "Review readiness"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ];

  const nav = routes
    .map(([href, label]) => {
      const current = href === active ? ' aria-current="page"' : "";
      return `<a href="${href}"${current}>${label}</a>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${productTitle} · ${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${domain}${active === "/" ? "/" : `${active}/`}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${productTitle} · ${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${domain}${active === "/" ? "/" : `${active}/`}" />
    <meta name="twitter:card" content="summary_large_image" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #071019;
        --panel: #101a2b;
        --panel-alt: #0d1624;
        --ink: #ecf2ff;
        --muted: #9fb1c9;
        --accent: #45f2b4;
        --line: rgba(114, 142, 188, 0.24);
        --chip: rgba(73, 242, 180, 0.12);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(85, 92, 224, 0.18), transparent 36%),
          linear-gradient(180deg, #071019, #081221 55%, #0b1830);
        color: var(--ink);
      }
      a { color: #8fd0ff; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .wrap { max-width: 1200px; margin: 0 auto; padding: 40px 24px 56px; }
      .hero, .section, .table-wrap {
        background: rgba(16, 26, 43, 0.94);
        border: 1px solid var(--line);
        border-radius: 28px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
      }
      .hero { padding: 28px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(69, 242, 180, 0.3);
        background: rgba(69, 242, 180, 0.08);
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font: 600 12px/1.2 "Consolas", monospace;
      }
      h1, h2, h3 {
        margin: 18px 0 10px;
        font-family: Georgia, serif;
        line-height: 1.05;
      }
      h1 { font-size: clamp(40px, 7vw, 72px); max-width: 14ch; }
      h2 { font-size: clamp(28px, 4vw, 42px); }
      .lede, .section p, td, th, li, .metric-copy {
        color: var(--muted);
        line-height: 1.6;
      }
      .topbar {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        align-items: center;
        margin-bottom: 18px;
      }
      .product { font: 700 24px/1.2 "Segoe UI", system-ui, sans-serif; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; }
      nav a {
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.02);
        color: var(--muted);
      }
      nav a[aria-current="page"] {
        border-color: rgba(69, 242, 180, 0.4);
        background: var(--chip);
        color: var(--ink);
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 14px;
        margin-top: 22px;
      }
      .metric {
        padding: 18px;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--line);
        border-radius: 22px;
      }
      .metric-label {
        color: var(--muted);
        font: 600 12px/1.2 "Consolas", monospace;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .metric-value {
        display: block;
        margin-top: 10px;
        font: 700 34px/1 Georgia, serif;
      }
      .section, .table-wrap { margin-top: 28px; padding: 24px; }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
        margin-top: 18px;
      }
      .card {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid var(--line);
        background: var(--panel-alt);
      }
      .pill {
        display: inline-flex;
        align-items: center;
        padding: 7px 11px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.02);
        color: var(--muted);
        font: 600 12px/1.1 "Consolas", monospace;
      }
      .pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
      .table-wrap table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 14px;
      }
      th, td {
        text-align: left;
        vertical-align: top;
        padding: 14px 12px;
        border-top: 1px solid var(--line);
      }
      th {
        color: var(--ink);
        font: 600 12px/1.2 "Consolas", monospace;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      footer {
        margin-top: 28px;
        padding-top: 18px;
        border-top: 1px solid var(--line);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 12px;
        color: var(--muted);
      }
      .footer-links { display: flex; flex-wrap: wrap; gap: 16px; }
      code {
        padding: 2px 6px;
        border-radius: 6px;
        background: rgba(255,255,255,0.05);
      }
      ul { padding-left: 20px; }
      @media (max-width: 720px) {
        .topbar { flex-direction: column; align-items: flex-start; }
        .wrap { padding: 18px 14px 28px; }
        .hero, .section, .table-wrap { padding: 18px; border-radius: 20px; }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <section class="hero">
        <div class="topbar">
          <div class="product">${productTitle}</div>
          <nav>${nav}</nav>
        </div>
        <span class="eyebrow">Executive intelligence · trust packaging</span>
        ${body}
        <footer>
          <div>Reusable trust packets, artifact freshness, review readiness, and buyer-safe diligence posture for executive teams.</div>
          <div class="footer-links">
            <a href="https://github.com/mizcausevic-dev/">GitHub</a>
            <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
            <a href="https://kineticgain.com/">Kinetic Gain</a>
          </div>
        </footer>
      </section>
    </div>
  </body>
</html>`;
}

export function renderOverview() {
  const executiveSummary = summary();
  const rooms = evidenceRoom();
  const risks = riskMap().slice(0, 5);
  const cards = rooms
    .slice(0, 6)
    .map(
      (item) => `<article class="card">
        <span class="pill">${escapeHtml(item.evidenceState)}</span>
        <h3>${escapeHtml(item.buyer)}</h3>
        <p>${escapeHtml(item.operatingQuestion)}</p>
        <div class="pills">
          <span class="pill">${escapeHtml(item.owner)}</span>
          <span class="pill">${escapeHtml(item.reviewStage)}</span>
        </div>
      </article>`
    )
    .join("");
  const riskRows = risks
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.buyer)}</td>
        <td>${escapeHtml(item.code)}</td>
        <td>${escapeHtml(item.severity)}</td>
        <td>${escapeHtml(item.message)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Overview",
    "/",
    `
      <h1>Package trust evidence into reusable executive rooms.</h1>
      <p class="lede">Trust Center Evidence Room keeps artifact coverage, freshness, review readiness, and control evidence together so AI, FinTech, biotech, healthcare, and public-sector diligence stops feeling bespoke.</p>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Evidence rooms</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled trust packets in the current sample estate.</div></div>
        <div class="metric"><span class="metric-label">Artifact coverage</span><span class="metric-value">${executiveSummary.averageArtifactCoverage}</span><div class="metric-copy">Average evidence coverage across the reusable packet set.</div></div>
        <div class="metric"><span class="metric-label">Freshness</span><span class="metric-value">${executiveSummary.averageFreshness}</span><div class="metric-copy">How current the trust proofs stay before buyer review begins.</div></div>
        <div class="metric"><span class="metric-label">Review readiness</span><span class="metric-value">${executiveSummary.averageReviewReadiness}</span><div class="metric-copy">How close each room is to being buyer-safe without manual stitching.</div></div>
        <div class="metric"><span class="metric-label">Ready packs</span><span class="metric-value">${executiveSummary.readyEvidencePacks}</span><div class="metric-copy">Trust packets strong enough to reuse right now.</div></div>
        <div class="metric"><span class="metric-label">Hours recovered</span><span class="metric-value">${formatNumber(executiveSummary.hoursRecoveredPerQuarter)}</span><div class="metric-copy">Modeled quarterly hours recovered once trust rooms become reusable.</div></div>
      </div>
      <section class="section">
        <h2>Evidence room map</h2>
        <p>Each room keeps the buyer, owner, headline gap, and next move visible before the next trust or procurement cycle opens.</p>
        <div class="grid">${cards}</div>
      </section>
      <section class="table-wrap">
        <h2>Risk map</h2>
        <p>The risk map keeps missing artifacts, stale proof, weak readiness, and blocked ownership visible before diligence drags the deal.</p>
        <table>
          <thead>
            <tr><th>Buyer</th><th>Code</th><th>Severity</th><th>Message</th></tr>
          </thead>
          <tbody>${riskRows}</tbody>
        </table>
      </section>
    `,
    "Executive trust-room surface for evidence packaging, artifact freshness, review readiness, and buyer-safe diligence posture."
  );
}

export function renderEvidenceRoom() {
  const cards = evidenceRoom()
    .map(
      (item) => `<article class="card">
        <span class="pill">${escapeHtml(item.evidenceState)}</span>
        <h3>${escapeHtml(item.buyer)}</h3>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Control area:</strong> ${escapeHtml(item.controlArea)}</p>
        <p><strong>Question:</strong> ${escapeHtml(item.operatingQuestion)}</p>
        <p><strong>Gap:</strong> ${escapeHtml(item.headlineGap)}</p>
        <p><strong>Next move:</strong> ${escapeHtml(item.nextMove)}</p>
        <div class="pills">
          <span class="pill">${escapeHtml(item.reviewStage)}</span>
        </div>
      </article>`
    )
    .join("");

  return shell(
    "Evidence room",
    "/evidence-room",
    `
      <h1>Keep every trust room, owner, and blocker visible.</h1>
      <p class="lede">The evidence-room view shows which trust packets are reusable, which still need work, and where ownership is still blocking the buyer path.</p>
      <section class="section">
        <h2>Trust packet queue</h2>
        <div class="grid">${cards}</div>
      </section>
    `,
    "Evidence-room view for trust packet ownership, blocker visibility, and reusable diligence packaging."
  );
}

export function renderArtifactGaps() {
  const rows = artifactGaps()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.buyer)}</td>
        <td>${escapeHtml(item.controlArea)}</td>
        <td>${item.artifactCoverageScore}</td>
        <td>${item.freshnessScore}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Artifact gaps",
    "/artifact-gaps",
    `
      <h1>See where evidence still feels thin or stale.</h1>
      <p class="lede">The artifact-gap view turns trust packaging into a readable inventory of coverage, freshness, and company-tag context.</p>
      <section class="table-wrap">
        <h2>Artifact inventory</h2>
        <table>
          <thead>
            <tr><th>Owner</th><th>Buyer</th><th>Control area</th><th>Coverage</th><th>Freshness</th><th>Company tags</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `,
    "Artifact-gap inventory for trust packets, evidence freshness, and proof coverage."
  );
}

export function renderReviewReadiness() {
  const rows = reviewReadiness()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.buyer)}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${item.reviewReadinessScore}</td>
        <td>${item.controlEvidenceScore}</td>
        <td>${item.reviewPrepDays}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
        <td>${escapeHtml(item.relatedSurfaces.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Review readiness",
    "/review-readiness",
    `
      <h1>Keep review prep, control evidence, and related surfaces together.</h1>
      <p class="lede">The review-readiness view shows whether each trust room can stand up to procurement, legal, and security review without a manual scramble.</p>
      <section class="table-wrap">
        <h2>Readiness matrix</h2>
        <table>
          <thead>
            <tr><th>Buyer</th><th>Owner</th><th>Readiness</th><th>Control evidence</th><th>Prep days</th><th>Company tags</th><th>Related surfaces</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `,
    "Review-readiness matrix for trust packets, control evidence, and buyer-safe diligence prep."
  );
}

export function renderVerification() {
  const items = verification()
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return shell(
    "Verification",
    "/verification",
    `
      <h1>Verification posture stays explicit.</h1>
      <p class="lede">This trust-room surface is synthetic, read-only, and reproducible from the included sample export. This page keeps those guardrails easy to audit before the repo is shown externally.</p>
      <section class="section">
        <h2>Verification notes</h2>
        <ul>${items}</ul>
      </section>
    `,
    "Verification notes for the synthetic trust-room surface, sample export, and read-only diligence workflow."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `
      <h1>Trust Center Evidence Room docs</h1>
      <p class="lede">This repo packages buyer-safe trust evidence into one readable surface: evidence room, artifact gaps, review readiness, and risk map.</p>
      <section class="section">
        <h2>Core routes</h2>
        <ul>
          <li><code>/evidence-room</code> keeps owner, buyer, blockers, and next move visible.</li>
          <li><code>/artifact-gaps</code> compares proof coverage and freshness.</li>
          <li><code>/review-readiness</code> shows where control evidence and prep days still drag review cycles.</li>
          <li><code>/verification</code> makes the synthetic and read-only posture explicit.</li>
        </ul>
      </section>
    `,
    "Product documentation for Trust Center Evidence Room and its evidence, artifact, and readiness routes."
  );
}

export function renderSample() {
  return JSON.stringify(toExport(sampleTrustCenterEvidenceRoom, payload().generatedAt), null, 2);
}
