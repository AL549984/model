import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const outputDir = path.join(siteRoot, "visual-qa");
const port = Number(process.env.MODEL_ATLAS_QA_PORT ?? 4339);
const baseUrl = process.env.MODEL_ATLAS_QA_URL ?? `http://127.0.0.1:${port}`;
const evidenceArchive = JSON.parse(readFileSync(path.join(siteRoot, "src/data/evidence-archive.json"), "utf8"));
const evidenceArchiveHistory = JSON.parse(readFileSync(path.join(siteRoot, "src/data/evidence-archive-history.json"), "utf8"));
const expectedSnapshottedCases = Number(evidenceArchive?.summary?.snapshottedCases ?? 0);
const expectedPendingSnapshotCases = Number(evidenceArchive?.summary?.pendingSnapshotCases ?? 0);
const expectedACases = Number(evidenceArchive?.summary?.aCaseCount ?? 0);
const expectedHistorySnapshots = Number(evidenceArchiveHistory?.snapshots?.length ?? 0);
const expectedHistoryProgress = (evidenceArchiveHistory?.snapshots ?? [])
  .map((snapshot) => String(snapshot.snapshottedCases ?? ""))
  .join(" -> ");
const expectedTopSnapshotIssue = evidenceArchive?.snapshotIssues?.[0] ?? {};
const expectedNextSnapshotHost = expectedTopSnapshotIssue?.hosts?.[0]?.host ?? "";
const evidenceArchiveByCaseId = new Map((evidenceArchive?.cases ?? []).map((entry) => [entry.caseId, entry]));

function expectedArchiveLabel(caseId) {
  const status = evidenceArchiveByCaseId.get(caseId)?.snapshotStatus;
  if (status === "snapshotted") return "已快照";
  if (status === "partial_snapshot") return "部分快照";
  if (status === "snapshot_attention") return "需关注";
  return "待快照";
}

const routes = [
  { name: "home-desktop", path: "/", viewport: { width: 1440, height: 1024 } },
  { name: "home-pulse", path: "/", viewport: { width: 1440, height: 1024 }, scrollSelector: ".ma-pulse" },
  { name: "home-pulse-to-drawer", path: "/", viewport: { width: 1440, height: 1024 }, action: "home-pulse-case-drawer" },
  { name: "home-health", path: "/", viewport: { width: 1440, height: 1024 }, scrollSelector: ".ma-health" },
  { name: "home-cases", path: "/", viewport: { width: 1440, height: 1024 }, scrollSelector: "#cases" },
  { name: "home-case-to-drawer", path: "/", viewport: { width: 1440, height: 1024 }, action: "home-case-drawer" },
  { name: "home-mobile", path: "/", viewport: { width: 390, height: 844 } },
  { name: "command-desktop", path: "/", viewport: { width: 1440, height: 1024 }, action: "command-search" },
  { name: "command-mobile", path: "/", viewport: { width: 390, height: 844 }, action: "command-search" },
  { name: "models-coding", path: "/models?quick=coding", viewport: { width: 1440, height: 1024 } },
  { name: "models-add-to-compare", path: "/models?quick=coding", viewport: { width: 1440, height: 1024 }, action: "model-add-to-compare" },
  { name: "updates-desktop", path: "/updates", viewport: { width: 1440, height: 1024 } },
  { name: "updates-distribution", path: "/updates", viewport: { width: 1440, height: 1024 }, scrollSelector: ".updates-distribution" },
  { name: "updates-mobile", path: "/updates", viewport: { width: 390, height: 844 } },
  { name: "model-detail-desktop", path: "/models/gpt-5-5-xhigh", viewport: { width: 1440, height: 1024 } },
  { name: "model-detail-evidence-distribution", path: "/models/gpt-5-5-xhigh", viewport: { width: 1440, height: 1024 }, scrollSelector: "[data-evidence-distribution]" },
  { name: "model-detail-copy-link", path: "/models/gpt-5-5-xhigh", viewport: { width: 1440, height: 1024 }, action: "copy-model-link" },
  { name: "model-detail-case-to-drawer", path: "/models/gpt-5-5-xhigh", viewport: { width: 1440, height: 1024 }, action: "model-case-drawer" },
  { name: "model-detail-timeline-link", path: "/models/gpt-5-5-xhigh", viewport: { width: 1440, height: 1024 }, action: "model-timeline-case" },
  { name: "model-detail-mobile", path: "/models/gpt-5-5-xhigh", viewport: { width: 390, height: 844 } },
  { name: "cases-coding", path: "/cases?type=coding", viewport: { width: 1440, height: 1024 } },
  { name: "cases-confidence", path: "/cases?confidence=aplus", viewport: { width: 1440, height: 1024 } },
  { name: "cases-snapshotted", path: "/cases?snapshot=snapshotted", viewport: { width: 1440, height: 1024 } },
  { name: "cases-pending-snapshot", path: "/cases?snapshot=pending_snapshot", viewport: { width: 1440, height: 1024 } },
  { name: "cases-drawer", path: "/cases?case=cf5-case-laas-webgpu-world", viewport: { width: 1440, height: 1024 } },
  { name: "cases-drawer-snapshotted", path: "/cases?case=aws-food-analyzer-haiku", viewport: { width: 1440, height: 1024 } },
  { name: "cases-copy-evidence-link", path: "/cases?case=cf5-case-laas-webgpu-world", viewport: { width: 1440, height: 1024 }, action: "copy-evidence-link" },
  { name: "cases-drawer-mobile", path: "/cases?case=cf5-case-laas-webgpu-world", viewport: { width: 390, height: 844 } },
  { name: "case-detail-desktop", path: "/cases/cf5-case-laas-webgpu-world", viewport: { width: 1440, height: 1024 } },
  { name: "case-detail-snapshotted", path: "/cases/aws-food-analyzer-haiku", viewport: { width: 1440, height: 1024 } },
  { name: "case-detail-copy-link", path: "/cases/cf5-case-laas-webgpu-world", viewport: { width: 1440, height: 1024 }, action: "copy-case-page" },
  { name: "case-detail-mobile", path: "/cases/cf5-case-laas-webgpu-world", viewport: { width: 390, height: 844 } },
  { name: "compare-desktop", path: "/compare", viewport: { width: 1440, height: 1024 } },
  { name: "compare-copy-view", path: "/compare", viewport: { width: 1440, height: 1024 }, action: "copy-compare-view" },
  { name: "compare-copy-brief", path: "/compare", viewport: { width: 1440, height: 1024 }, action: "copy-compare-brief" },
  { name: "compare-coding", path: "/compare", viewport: { width: 1440, height: 1024 }, action: "coding-scenario" },
  { name: "compare-rationale", path: "/compare", viewport: { width: 1440, height: 1024 }, scrollSelector: "#compare-rationale" },
  { name: "compare-board", path: "/compare", viewport: { width: 1440, height: 1024 }, scrollSelector: ".compare-board" },
  { name: "compare-mobile", path: "/compare", viewport: { width: 390, height: 844 } }
];

function startServer() {
  if (process.env.MODEL_ATLAS_QA_URL) return null;
  const child = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(port)], {
    cwd: siteRoot,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, FORCE_COLOR: "0" }
  });
  child.stdout.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));
  return child;
}

async function waitForServer(timeoutMs = 20000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Retry until the local dev server is ready.
    }
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
  throw new Error(`Timed out waiting for ${baseUrl}`);
}

function sanitizeText(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

async function checkEndpoint(name, path, validate) {
  try {
    const response = await fetch(`${baseUrl}${path}`);
    const text = await response.text();
    const validation = validate(text, response);
    return {
      name,
      path,
      status: response.status,
      passed: response.ok && validation.passed,
      detail: validation.detail
    };
  } catch (error) {
    return {
      name,
      path,
      status: "error",
      passed: false,
      detail: error instanceof Error ? error.message : String(error)
    };
  }
}

await mkdir(outputDir, { recursive: true });
const server = startServer();

try {
  await waitForServer();
  const endpointChecks = await Promise.all([
    checkEndpoint("llms", "/llms.txt", (text) => ({
      passed: text.includes("Model Atlas 模型图谱") && text.includes("/atlas.json") && text.includes("/evidence-archive-history.json") && text.includes("A 类精选案例") && text.includes("证据可信度"),
      detail: `${text.length} chars`
    })),
    checkEndpoint("atlas-json", "/atlas.json", (text) => {
      const payload = JSON.parse(text);
      return {
        passed: payload?.name === "Model Atlas 模型图谱" && Number(payload?.counts?.aCases ?? 0) >= 680 && Boolean(payload?.routes?.updates) && Boolean(payload?.routes?.llms) && Boolean(payload?.routes?.evidenceArchive) && Boolean(payload?.routes?.evidenceArchiveHistory) && Number(payload?.evidenceArchive?.summary?.manifestedCases ?? 0) >= 680 && Number(payload?.evidenceArchive?.latestHistory?.snapshottedCases ?? 0) === expectedSnapshottedCases && Number(payload?.evidenceArchive?.snapshotIssues?.[0]?.cases ?? 0) === expectedPendingSnapshotCases && String(payload?.recentCases?.[0]?.url ?? "").includes("/cases/") && String(payload?.recentCases?.[0]?.evidenceDrawerUrl ?? "").includes("/cases?case=") && Number(payload?.recentCases?.[0]?.evidenceTrust?.score ?? 0) > 0,
        detail: `${payload?.counts?.models ?? 0} models / ${payload?.counts?.aCases ?? 0} A cases`
      };
    }),
    checkEndpoint("evidence-archive-json", "/evidence-archive.json", (text) => {
      const payload = JSON.parse(text);
      return {
        passed: payload?.schemaVersion === 1 && Number(payload?.summary?.aCaseCount ?? 0) >= 680 && Number(payload?.summary?.manifestedCases ?? 0) === Number(payload?.summary?.aCaseCount ?? -1) && Number(payload?.summary?.missingOriginalEvidence ?? -1) === 0 && Number(payload?.summary?.missingArtifact ?? -1) === 0 && Number(payload?.summary?.targets ?? 0) > Number(payload?.summary?.aCaseCount ?? 0) && Number(payload?.summary?.snapshottedCases ?? 0) === expectedSnapshottedCases && Number(payload?.summary?.pendingSnapshotCases ?? -1) === expectedPendingSnapshotCases && Number(payload?.summary?.snapshotAttentionCases ?? -1) === 0 && Number(payload?.summary?.snapshotIssueTypes ?? 0) >= 1 && Number(payload?.snapshotIssues?.[0]?.cases ?? 0) === expectedPendingSnapshotCases,
        detail: `${payload?.summary?.manifestedCases ?? 0} cases / ${payload?.summary?.targets ?? 0} targets / ${payload?.summary?.snapshottedCases ?? 0} snapshotted / ${payload?.summary?.snapshotIssueTypes ?? 0} issue types`
      };
    }),
    checkEndpoint("evidence-archive-history-json", "/evidence-archive-history.json", (text) => {
      const payload = JSON.parse(text);
      const latest = payload?.snapshots?.at(-1);
      return {
        passed: payload?.schemaVersion === 1 && Number(payload?.snapshots?.length ?? 0) >= 2 && Number(latest?.snapshottedCases ?? 0) === expectedSnapshottedCases && Number(latest?.pendingSnapshotCases ?? -1) === expectedPendingSnapshotCases,
        detail: `${payload?.snapshots?.length ?? 0} snapshots / latest ${latest?.snapshottedCases ?? 0} snapshotted`
      };
    }),
    checkEndpoint("sitemap", "/sitemap.xml", (text) => ({
      passed: text.includes("/llms.txt") && text.includes("/atlas.json") && text.includes("/evidence-archive.json") && text.includes("/evidence-archive-history.json") && text.includes("/updates") && text.includes("/cases/cf5-case-laas-webgpu-world") && text.includes("<lastmod>"),
      detail: `${(text.match(/<url>/g) ?? []).length} urls`
    })),
    checkEndpoint("robots", "/robots.txt", (text) => ({
      passed: text.includes("Sitemap:") && text.includes("AI-Index:"),
      detail: sanitizeText(text)
    }))
  ]);
  const browser = await chromium.launch();
  const results = [];

  for (const route of routes) {
    const page = await browser.newPage({ viewport: route.viewport });
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: "load" });
    if (route.scrollSelector) {
      await page.locator(route.scrollSelector).scrollIntoViewIfNeeded();
    }
    if (route.action === "coding-scenario") {
      await page.locator('[data-scenario="coding"]').click();
      await page.waitForTimeout(300);
    }
    if (route.action === "command-search") {
      await page.locator("[data-command-open]").filter({ visible: true }).first().click();
      await page.locator("#command-search-input").fill("coding");
      await page.locator("[data-command-result]").first().waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(300);
    }
    if (route.action === "copy-model-link") {
      await page.locator('[data-copy-original="复制模型档案"]').click();
      await page.locator("#copy-toast").waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(150);
    }
    if (route.action === "copy-evidence-link") {
      await page.locator('[data-copy-original="复制证据链接"]').click();
      await page.locator("#copy-toast").waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(150);
    }
    if (route.action === "copy-case-page") {
      await page.locator('[data-copy-original="复制案例页"]').click();
      await page.locator("#copy-toast").waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(150);
    }
    if (route.action === "copy-compare-view") {
      await page.locator("#compare-copy-view").click();
      await page.locator("#copy-toast").waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(150);
    }
    if (route.action === "copy-compare-brief") {
      await page.locator("#compare-copy-brief").waitFor({ state: "visible", timeout: 5000 });
      await page.locator("#compare-copy-brief").click();
      await page.locator("#copy-toast").waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(150);
    }
    if (route.action === "model-add-to-compare") {
      const compareLink = page.locator("[data-model-compare]").filter({ visible: true }).first();
      const compareHref = await compareLink.getAttribute("href");
      route.expectedCompareModel = new URL(compareHref, baseUrl).searchParams.get("models");
      await compareLink.click();
      await page.waitForURL(/\/compare\?models=/, { timeout: 8000 });
      await page.locator("#compare-rationale").waitFor({ state: "visible", timeout: 8000 });
      await page.waitForTimeout(300);
    }
    if (route.action === "home-case-drawer") {
      await page.locator(".ma-case-card").first().click();
      await page.waitForURL(/\/cases\?case=/, { timeout: 8000 });
      await page.locator("#case-drawer[aria-hidden='false']").waitFor({ state: "visible", timeout: 8000 });
      await page.waitForTimeout(300);
    }
    if (route.action === "home-pulse-case-drawer") {
      await page.locator(".ma-pulse-stream > div").first().locator("a").first().click();
      await page.waitForURL(/\/cases\?case=/, { timeout: 8000 });
      await page.locator("#case-drawer[aria-hidden='false']").waitFor({ state: "visible", timeout: 8000 });
      await page.waitForTimeout(300);
    }
    if (route.action === "model-case-drawer") {
      await page.locator("[data-case-open]").first().click();
      await page.waitForURL(/\/cases\?case=/, { timeout: 8000 });
      await page.locator("#case-drawer[aria-hidden='false']").waitFor({ state: "visible", timeout: 8000 });
      await page.waitForTimeout(300);
    }
    if (route.action === "model-timeline-case") {
      await page.locator("a[href^='/cases?case=']").first().click();
      await page.waitForURL(/\/cases\?case=/, { timeout: 8000 });
      await page.locator("#case-drawer[aria-hidden='false']").waitFor({ state: "visible", timeout: 8000 });
      await page.waitForTimeout(300);
    }
    await page.waitForTimeout(500);

    const checks = await page.evaluate(() => {
      function parseRgb(value) {
        const match = String(value || "").match(/rgba?\(([^)]+)\)/);
        if (!match) return null;
        const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
        if (parts.length < 3) return null;
        return {
          r: parts[0],
          g: parts[1],
          b: parts[2],
          a: parts.length > 3 ? parts[3] : 1
        };
      }

      function rgbToHsl({ r, g, b }) {
        const rn = r / 255;
        const gn = g / 255;
        const bn = b / 255;
        const max = Math.max(rn, gn, bn);
        const min = Math.min(rn, gn, bn);
        const lightness = (max + min) / 2;
        if (max === min) return { hue: 0, saturation: 0, lightness };
        const delta = max - min;
        const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        let hue = 0;
        if (max === rn) hue = (gn - bn) / delta + (gn < bn ? 6 : 0);
        if (max === gn) hue = (bn - rn) / delta + 2;
        if (max === bn) hue = (rn - gn) / delta + 4;
        return { hue: hue * 60, saturation, lightness };
      }

      function isForbiddenSignal(value) {
        const rgb = parseRgb(value);
        if (!rgb || rgb.a < 0.32) return false;
        const chroma = Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b);
        if (chroma < 38) return false;
        const hsl = rgbToHsl(rgb);
        return hsl.hue >= 195 && hsl.hue <= 285 && hsl.saturation >= 0.28 && hsl.lightness >= 0.18 && hsl.lightness <= 0.86;
      }

      const forbiddenPaletteSamples = Array.from(document.querySelectorAll("body *")).flatMap((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return [];
        const style = window.getComputedStyle(el);
        const properties = ["color", "backgroundColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"];
        return properties
          .filter((property) => isForbiddenSignal(style[property]))
          .map((property) => ({
            tag: el.tagName.toLowerCase(),
            className: String(el.getAttribute("class") || "").slice(0, 80),
            property,
            value: style[property],
            text: String(el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80)
          }));
      }).slice(0, 8);

      const actions = Array.from(document.querySelectorAll("a, button")).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          text: String(el.textContent ?? "").trim().replace(/\s+/g, " "),
          width: Math.round(rect.width),
          scrollWidth: el.scrollWidth,
          overflow: el.scrollWidth > Math.ceil(rect.width) + 1
        };
      }).filter((item) => item.text && item.overflow);

      return {
        title: document.title,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        overflowingActions: actions,
        forbiddenPaletteSamples,
        dataCut: document.body.textContent?.includes("DATA CUT") ? "visible" : "",
        copyToast: document.querySelector("#copy-toast:not([hidden])")?.textContent?.trim() ?? "",
        copiedButtonText: document.querySelector('[data-copy-state="copied"]')?.textContent?.trim() ?? "",
        jsonLdTypes: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap((script) => {
          try {
            const parsed = JSON.parse(script.textContent || "[]");
            const nodes = Array.isArray(parsed) ? parsed : [parsed];
            return nodes.map((node) => node?.["@type"]).filter(Boolean);
          } catch {
            return ["parse-error"];
          }
        })
      };
    });

    if ((route.path === "/models" || route.path.startsWith("/models?")) && route.action !== "model-add-to-compare") {
      checks.visibleCount = await page.locator("#visible-count").textContent().then(sanitizeText);
      checks.quickLabel = await page.locator("#quick-filter-label").textContent().then(sanitizeText);
    }

    if (route.path === "/updates") {
      checks.updatesTitle = await page.locator(".updates-hero h1").textContent().then(sanitizeText);
      checks.updatesDataCut = await page.locator(".updates-hero__stamp strong").textContent().then(sanitizeText);
      checks.updatesLatestCase = await page.locator(".updates-feed a strong").first().textContent().then(sanitizeText);
      checks.updatesDistribution = await page.locator(".updates-distribution h2").textContent().then(sanitizeText).catch(() => "");
      checks.updatesArchive = await page.locator(".updates-archive").textContent().then(sanitizeText).catch(() => "");
      checks.updatesQueue = await page.locator("[data-updates-archive-queue]").textContent().then(sanitizeText).catch(() => "");
      checks.updatesIssues = await page.locator("[data-updates-snapshot-issues]").textContent().then(sanitizeText).catch(() => "");
      checks.updatesHistory = await page.locator("[data-updates-archive-history]").textContent().then(sanitizeText).catch(() => "");
      checks.updatesHistoryProgress = await page
        .locator("[data-history-snapshotted]")
        .evaluateAll((items) => items.map((item) => item.getAttribute("data-history-snapshotted") || "").join(" -> "))
        .catch(() => "");
    }

    if (route.scrollSelector === ".ma-pulse") {
      checks.homePulseCaseHref = await page.locator(".ma-pulse-stream > div").first().locator("a").first().getAttribute("href").then(sanitizeText);
      checks.homePulseCaseMeta = await page.locator(".ma-pulse-stream > div").first().locator("em").first().textContent().then(sanitizeText);
    }

    if (route.scrollSelector === ".ma-health") {
      checks.healthTitle = await page.locator(".ma-health h2").textContent().then(sanitizeText);
      checks.healthCoverage = await page.locator(".ma-health-score strong").textContent().then(sanitizeText);
    }

    if (route.scrollSelector === "#cases") {
      checks.homeCaseHref = await page.locator(".ma-case-card").first().getAttribute("href").then(sanitizeText);
      checks.homeCaseCta = await page.locator(".ma-case-card em").first().textContent().then(sanitizeText);
    }

    if (route.path === "/cases" || route.path.startsWith("/cases?")) {
      checks.visibleCount = await page.locator("#case-visible-count").textContent().then(sanitizeText);
      checks.filterLabel = await page.locator("#case-filter-label").textContent().then(sanitizeText);
      checks.caseTrust = await page.locator("[data-evidence-trust]").first().textContent().then(sanitizeText).catch(() => "");
      if (route.path.includes("case=")) {
        checks.caseDrawerTitle = await page.locator(".case-record__head h2").textContent().then(sanitizeText);
        checks.caseDrawerState = await page.locator("#case-drawer").getAttribute("aria-hidden").then(sanitizeText);
        checks.caseDrawerTrust = await page.locator(".case-record__trust").textContent().then(sanitizeText);
        checks.caseDrawerArchive = await page.locator(".case-record__archive").textContent().then(sanitizeText);
      } else {
        checks.closedDrawerVisible = await page.locator("#case-drawer").evaluate((element) => {
          const style = window.getComputedStyle(element);
          return !element.hidden && style.display !== "none";
        });
      }
    }

    if (route.path.startsWith("/cases/")) {
      checks.caseDetailTitle = await page.locator(".case-detail-hero h1").textContent().then(sanitizeText);
      checks.caseDetailDrawerHref = await page.locator(".case-detail-actions a").first().getAttribute("href").then(sanitizeText);
      checks.caseDetailModelHref = await page.locator(".case-detail-actions a").nth(1).getAttribute("href").then(sanitizeText);
      checks.caseDetailTrust = await page.locator(".case-detail-side [data-evidence-trust]").textContent().then(sanitizeText);
      checks.caseDetailArchive = await page.locator(".case-detail-archive").textContent().then(sanitizeText);
    }

    if (route.action === "home-case-drawer") {
      checks.homeCaseTargetUrl = page.url();
      checks.caseDrawerTitle = await page.locator(".case-record__head h2").textContent().then(sanitizeText);
      checks.caseDrawerState = await page.locator("#case-drawer").getAttribute("aria-hidden").then(sanitizeText);
      checks.caseDrawerArchive = await page.locator(".case-record__archive").textContent().then(sanitizeText);
    }

    if (route.action === "home-pulse-case-drawer") {
      checks.homePulseTargetUrl = page.url();
      checks.caseDrawerTitle = await page.locator(".case-record__head h2").textContent().then(sanitizeText);
      checks.caseDrawerState = await page.locator("#case-drawer").getAttribute("aria-hidden").then(sanitizeText);
      checks.caseDrawerArchive = await page.locator(".case-record__archive").textContent().then(sanitizeText);
    }

    if (route.path.startsWith("/models/gpt-5-5-xhigh")) {
      if (route.action === "model-case-drawer" || route.action === "model-timeline-case") {
        checks.modelCaseTargetUrl = page.url();
        checks.caseDrawerTitle = await page.locator(".case-record__head h2").textContent().then(sanitizeText);
        checks.caseDrawerState = await page.locator("#case-drawer").getAttribute("aria-hidden").then(sanitizeText);
        checks.caseDrawerArchive = await page.locator(".case-record__archive").textContent().then(sanitizeText);
      } else {
        checks.archiveSummary = await page.locator("text=档案摘要").first().textContent().then(sanitizeText);
        checks.evidenceCompleteness = await page.locator("text=证据完整度").first().textContent().then(sanitizeText);
        checks.evidenceDistribution = await page.locator("[data-evidence-distribution] h2").textContent().then(sanitizeText);
        checks.evidenceDistributionCases = await page.locator("[data-evidence-distribution] .evidence-distribution__stamp strong").textContent().then(sanitizeText);
        checks.modelSnapshotHealth = await page.locator("[data-model-snapshot-health]").textContent().then(sanitizeText);
        checks.modelRepresentativeCases = await page.locator("[data-representative-cases]").textContent().then(sanitizeText);
        checks.modelTimelineHref = await page.locator("a[href^='/cases?case=']").first().getAttribute("href").then(sanitizeText).catch(() => "");
      }
    }

    if (route.path.startsWith("/compare") || route.action === "model-add-to-compare") {
      checks.compareVerdict = await page.locator("#compare-verdict").textContent().then(sanitizeText);
      checks.compareScenario = await page.locator("[data-scenario].is-active span").textContent().then(sanitizeText);
      checks.compareUrl = page.url();
      checks.compareRationale = await page.locator("#compare-rationale").textContent().then(sanitizeText);
      checks.compareRationaleChinese = checks.compareRationale.includes("推荐理由") && checks.compareRationale.includes("证据依据") && checks.compareRationale.includes("下一步复核");
      checks.compareSnapshotSignal = checks.compareRationale.includes("证据快照");
      checks.compareExpectedModel = route.expectedCompareModel;
      checks.compareFromModel = route.action === "model-add-to-compare" ? page.url().includes(`/compare?models=`) && page.url().includes(String(route.expectedCompareModel ?? "")) : undefined;
      checks.compareBrief = await page.locator("#compare-copy-brief").getAttribute("data-copy-url").then(sanitizeText).catch(() => "");
      checks.compareBriefReady = checks.compareBrief.includes("Model Atlas 研究包") && checks.compareBrief.includes("推荐模型") && checks.compareBrief.includes("证据依据") && checks.compareBrief.includes("代表证据") && checks.compareBrief.includes("下一步复核") && checks.compareBrief.includes("证据快照");
      checks.compareNextReviewHref = await page.locator("#compare-rationale a").last().getAttribute("href").then(sanitizeText);
    }

    if (route.action === "command-search") {
      checks.commandState = await page.locator("#command-palette").getAttribute("aria-hidden").then(sanitizeText);
      checks.commandIndexState = await page.locator("#command-palette").getAttribute("data-index-state").then(sanitizeText);
      checks.commandCount = await page.locator("#command-result-count").textContent().then(sanitizeText);
      checks.commandFirstResult = await page.locator("[data-command-result]").first().textContent().then(sanitizeText);
    }

    const screenshotPath = path.join(outputDir, `auto-${route.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    await page.close();

    const compareRoute = route.path.startsWith("/compare") || route.action === "model-add-to-compare";
    const passed = !checks.horizontalOverflow
      && checks.overflowingActions.length === 0
      && checks.forbiddenPaletteSamples.length === 0
      && !checks.closedDrawerVisible
      && (!compareRoute || checks.compareRationaleChinese)
      && (!compareRoute || checks.compareSnapshotSignal)
      && (!compareRoute || checks.compareBriefReady)
      && (route.action !== "model-add-to-compare" || checks.compareFromModel)
      && (route.action !== "copy-compare-brief" || checks.copyToast === "研究包已复制")
      && (route.name !== "updates-desktop" || (checks.updatesArchive.includes(`${expectedSnapshottedCases} / ${expectedACases}`) && checks.updatesArchive.includes(`${expectedPendingSnapshotCases} 待快照`)))
      && (!route.name.startsWith("updates-") || (checks.updatesQueue.includes("下一批证据快照队列") && checks.updatesQueue.includes("npm run evidence:snapshot") && (!expectedNextSnapshotHost || checks.updatesQueue.includes(expectedNextSnapshotHost))))
      && (!route.name.startsWith("updates-") || (checks.updatesIssues.includes("待处理原因队列") && checks.updatesIssues.includes(String(expectedTopSnapshotIssue.label ?? "")) && checks.updatesIssues.includes(`${expectedPendingSnapshotCases} cases`)))
      && (!route.name.startsWith("updates-") || (checks.updatesHistory.includes("证据快照正在变成可追踪资产") && checks.updatesHistory.includes(`${expectedSnapshottedCases} 已快照`) && checks.updatesHistory.includes(`${expectedHistorySnapshots} 个进度节点`) && checks.updatesHistoryProgress === expectedHistoryProgress))
      && (route.name !== "cases-snapshotted" || (checks.filterLabel.includes("已快照") && checks.visibleCount === String(expectedSnapshottedCases)))
      && (route.name !== "cases-pending-snapshot" || (checks.filterLabel.includes("待快照") && checks.visibleCount === String(expectedPendingSnapshotCases)))
      && (route.name !== "cases-drawer" || checks.caseDrawerArchive.includes(expectedArchiveLabel("cf5-case-laas-webgpu-world")))
      && (route.name !== "cases-drawer-snapshotted" || checks.caseDrawerArchive.includes("已快照"))
      && (route.name !== "case-detail-desktop" || checks.caseDetailArchive.includes(expectedArchiveLabel("cf5-case-laas-webgpu-world")))
      && (route.name !== "case-detail-snapshotted" || checks.caseDetailArchive.includes("已快照"))
      && (!route.name.startsWith("model-detail-") || route.action || (checks.modelSnapshotHealth.includes("证据快照覆盖") && checks.modelSnapshotHealth.includes("待快照")))
      && (!route.name.startsWith("model-detail-") || route.action || (checks.modelRepresentativeCases.includes("代表案例排序") && checks.modelRepresentativeCases.includes("证据可信度")));
    results.push({ ...route, screenshotPath, passed, checks });
  }

  await browser.close();

  const failed = results.filter((result) => !result.passed);
  const failedEndpoints = endpointChecks.filter((result) => !result.passed);
  const routeReports = results.map((result) => [
    `## ${result.name}`,
    "",
    `- path: ${result.path}`,
    `- viewport: ${result.viewport.width} x ${result.viewport.height}`,
    `- passed: ${result.passed}`,
    `- screenshot: ${result.screenshotPath}`,
    `- horizontal overflow: ${result.checks.horizontalOverflow}`,
    `- overflowing actions: ${result.checks.overflowingActions.length}`,
    `- forbidden palette samples: ${result.checks.forbiddenPaletteSamples?.length ?? 0}`,
    result.checks.forbiddenPaletteSamples?.length ? `- forbidden palette preview: ${JSON.stringify(result.checks.forbiddenPaletteSamples)}` : "",
    result.checks.jsonLdTypes?.length ? `- json-ld types: ${result.checks.jsonLdTypes.join(", ")}` : "",
    result.checks.visibleCount ? `- visible count: ${result.checks.visibleCount}` : "",
    result.checks.quickLabel ? `- quick label: ${result.checks.quickLabel}` : "",
    result.checks.updatesTitle ? `- updates title: ${result.checks.updatesTitle}` : "",
    result.checks.updatesDataCut ? `- updates data cut: ${result.checks.updatesDataCut}` : "",
    result.checks.updatesLatestCase ? `- updates latest case: ${result.checks.updatesLatestCase}` : "",
    result.checks.updatesDistribution ? `- updates distribution: ${result.checks.updatesDistribution}` : "",
    result.checks.updatesArchive ? `- updates archive: ${result.checks.updatesArchive}` : "",
    result.checks.updatesQueue ? `- updates archive queue: ${result.checks.updatesQueue}` : "",
    result.checks.updatesIssues ? `- updates snapshot issues: ${result.checks.updatesIssues}` : "",
    result.checks.updatesHistory ? `- updates archive history: ${result.checks.updatesHistory}` : "",
    result.checks.updatesHistoryProgress ? `- updates archive history progress: ${result.checks.updatesHistoryProgress}` : "",
    result.checks.homePulseCaseHref ? `- home pulse case href: ${result.checks.homePulseCaseHref}` : "",
    result.checks.homePulseCaseMeta ? `- home pulse case meta: ${result.checks.homePulseCaseMeta}` : "",
    result.checks.homePulseTargetUrl ? `- home pulse target url: ${result.checks.homePulseTargetUrl}` : "",
    result.checks.healthTitle ? `- health title: ${result.checks.healthTitle}` : "",
    result.checks.healthCoverage ? `- health coverage: ${result.checks.healthCoverage}` : "",
    result.checks.homeCaseHref ? `- home case href: ${result.checks.homeCaseHref}` : "",
    result.checks.homeCaseCta ? `- home case cta: ${result.checks.homeCaseCta}` : "",
    result.checks.homeCaseTargetUrl ? `- home case target url: ${result.checks.homeCaseTargetUrl}` : "",
    result.checks.filterLabel ? `- filter label: ${result.checks.filterLabel}` : "",
    result.checks.caseTrust ? `- case trust: ${result.checks.caseTrust}` : "",
    typeof result.checks.closedDrawerVisible === "boolean" ? `- closed drawer visible: ${result.checks.closedDrawerVisible}` : "",
    result.checks.caseDrawerTitle ? `- case drawer title: ${result.checks.caseDrawerTitle}` : "",
    result.checks.caseDrawerState ? `- case drawer aria-hidden: ${result.checks.caseDrawerState}` : "",
    result.checks.caseDrawerTrust ? `- case drawer trust: ${result.checks.caseDrawerTrust}` : "",
    result.checks.caseDrawerArchive ? `- case drawer archive: ${result.checks.caseDrawerArchive}` : "",
    result.checks.caseDetailTitle ? `- case detail title: ${result.checks.caseDetailTitle}` : "",
    result.checks.caseDetailDrawerHref ? `- case detail drawer href: ${result.checks.caseDetailDrawerHref}` : "",
    result.checks.caseDetailModelHref ? `- case detail model href: ${result.checks.caseDetailModelHref}` : "",
    result.checks.caseDetailTrust ? `- case detail trust: ${result.checks.caseDetailTrust}` : "",
    result.checks.caseDetailArchive ? `- case detail archive: ${result.checks.caseDetailArchive}` : "",
    result.checks.modelCaseTargetUrl ? `- model case target url: ${result.checks.modelCaseTargetUrl}` : "",
    result.checks.modelTimelineHref ? `- model timeline href: ${result.checks.modelTimelineHref}` : "",
    result.checks.archiveSummary ? `- archive summary: ${result.checks.archiveSummary}` : "",
    result.checks.evidenceCompleteness ? `- evidence completeness: ${result.checks.evidenceCompleteness}` : "",
    result.checks.evidenceDistribution ? `- evidence distribution: ${result.checks.evidenceDistribution}` : "",
    result.checks.evidenceDistributionCases ? `- evidence distribution cases: ${result.checks.evidenceDistributionCases}` : "",
    result.checks.modelSnapshotHealth ? `- model snapshot health: ${result.checks.modelSnapshotHealth}` : "",
    result.checks.modelRepresentativeCases ? `- model representative cases: ${result.checks.modelRepresentativeCases}` : "",
    result.checks.dataCut ? `- data cut status: ${result.checks.dataCut}` : "",
    result.checks.copyToast ? `- copy toast: ${result.checks.copyToast}` : "",
    result.checks.copiedButtonText ? `- copied button text: ${result.checks.copiedButtonText}` : "",
    result.checks.compareVerdict ? `- compare verdict: ${result.checks.compareVerdict}` : "",
    result.checks.compareScenario ? `- compare scenario: ${result.checks.compareScenario}` : "",
    result.checks.compareRationale ? `- compare rationale: ${result.checks.compareRationale}` : "",
    typeof result.checks.compareRationaleChinese === "boolean" ? `- compare rationale chinese: ${result.checks.compareRationaleChinese}` : "",
    typeof result.checks.compareSnapshotSignal === "boolean" ? `- compare snapshot signal: ${result.checks.compareSnapshotSignal}` : "",
    typeof result.checks.compareBriefReady === "boolean" ? `- compare brief ready: ${result.checks.compareBriefReady}` : "",
    result.checks.compareBrief ? `- compare brief preview: ${result.checks.compareBrief.slice(0, 280)}` : "",
    result.checks.compareExpectedModel ? `- compare expected model: ${result.checks.compareExpectedModel}` : "",
    typeof result.checks.compareFromModel === "boolean" ? `- compare from model link: ${result.checks.compareFromModel}` : "",
    result.checks.compareNextReviewHref ? `- compare next review href: ${result.checks.compareNextReviewHref}` : "",
    result.checks.compareUrl ? `- compare url: ${result.checks.compareUrl}` : "",
    result.checks.commandState ? `- command palette aria-hidden: ${result.checks.commandState}` : "",
    result.checks.commandIndexState ? `- command index state: ${result.checks.commandIndexState}` : "",
    result.checks.commandCount ? `- command count: ${result.checks.commandCount}` : "",
    result.checks.commandFirstResult ? `- command first result: ${result.checks.commandFirstResult}` : ""
  ].filter(Boolean).join("\n"));

  const endpointReport = endpointChecks.map((result) => [
    `## endpoint:${result.name}`,
    "",
    `- path: ${result.path}`,
    `- status: ${result.status}`,
    `- passed: ${result.passed}`,
    `- detail: ${result.detail}`
  ].join("\n"));

  const report = [
    "# Visual QA",
    "",
    `Base URL: ${baseUrl}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Endpoint Checks",
    "",
    endpointReport.join("\n\n"),
    "",
    routeReports.join("\n\n"),
    "",
    failed.length || failedEndpoints.length ? `final result: failed (${failed.length} routes / ${failedEndpoints.length} endpoints)` : "final result: passed"
  ].join("\n");

  await writeFile(path.join(outputDir, "auto-visual-qa-report.md"), report);
  console.log(report);

  if (failed.length || failedEndpoints.length) process.exitCode = 1;
} finally {
  if (server) server.kill("SIGTERM");
}
