import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(siteRoot, "..");

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(siteRoot, relativePath), "utf8"));
}

function assert(condition, message, details = "") {
  if (!condition) {
    throw new Error(details ? `${message}: ${details}` : message);
  }
}

function requireText(source, label, expected) {
  assert(source.includes(expected), `${label} missing expected text`, expected);
}

function forbidText(source, label, forbidden) {
  assert(!source.includes(forbidden), `${label} contains stale or off-brief text`, forbidden);
}

const [metrics, models, cases, evidenceArchive, evidenceArchiveHistory, siteReadme, rootReadme] = await Promise.all([
  readJson("src/data/metrics.json"),
  readJson("src/data/models.json"),
  readJson("src/data/cases.json"),
  readJson("src/data/evidence-archive.json"),
  readJson("src/data/evidence-archive-history.json"),
  readFile(path.join(siteRoot, "README.md"), "utf8"),
  readFile(path.join(repoRoot, "README.md"), "utf8")
]);

const activeModels = models.filter((model) => !["Archive", "Hold"].includes(model.publishability));
const aCases = cases.filter((item) => item.evidenceGrade === "A" && item.showcaseEligible);
const modelIds = new Set(models.map((model) => model.id));
const modelSlugs = new Set(models.map((model) => model.slug));
const caseIds = new Set(cases.map((item) => item.id));
const aCasesByModel = new Map();

for (const item of aCases) {
  aCasesByModel.set(item.modelId, (aCasesByModel.get(item.modelId) || 0) + 1);
}

const targetCasesPerModel = Number(metrics.targetCasesPerModel ?? 5);
const activeModelsMeetingTarget = activeModels.filter((model) => (aCasesByModel.get(model.id) || 0) >= targetCasesPerModel);
const activeModelsBelowTarget = activeModels.filter((model) => (aCasesByModel.get(model.id) || 0) < targetCasesPerModel);

const expected = {
  vendors: new Set(models.map((model) => model.vendor)).size,
  totalModels: models.length,
  activeModels: activeModels.length,
  archiveModels: models.filter((model) => model.publishability === "Archive").length,
  aCases: aCases.length,
  totalCases: cases.length,
  activeModelsMeetingTarget: activeModelsMeetingTarget.length,
  activeCaseDeficitToTarget: Number(metrics.activeCaseDeficitToTarget ?? NaN),
  datasetCut: String(metrics.datasetCut)
};

assert(Number(metrics.models) === expected.totalModels, "metrics.models does not match models.json", `${metrics.models} !== ${expected.totalModels}`);
assert(Number(metrics.activeModels) === expected.activeModels, "metrics.activeModels does not match models.json", `${metrics.activeModels} !== ${expected.activeModels}`);
assert(Number(metrics.archiveModels) === expected.archiveModels, "metrics.archiveModels does not match models.json", `${metrics.archiveModels} !== ${expected.archiveModels}`);
assert(Number(metrics.verifiedACases) === expected.aCases, "metrics.verifiedACases does not match cases.json", `${metrics.verifiedACases} !== ${expected.aCases}`);
assert(Number(metrics.activeModelsMeetingTargetCaseCoverage) === expected.activeModelsMeetingTarget, "metrics active target coverage mismatch", `${metrics.activeModelsMeetingTargetCaseCoverage} !== ${expected.activeModelsMeetingTarget}`);
assert(modelIds.size === models.length, "duplicate model ids detected");
assert(modelSlugs.size === models.length, "duplicate model slugs detected");
assert(caseIds.size === cases.length, "duplicate case ids detected");
assert(activeModelsBelowTarget.length === 0, "active models below target A-case coverage", activeModelsBelowTarget.map((model) => `${model.id}:${aCasesByModel.get(model.id) || 0}`).join(", "));
assert(Number(metrics.activeModelsMeetingTargetCaseCoverage) === expected.activeModels, "not all active models meet target coverage", `${metrics.activeModelsMeetingTargetCaseCoverage} !== ${expected.activeModels}`);

const orphanACases = aCases.filter((item) => !modelIds.has(item.modelId));
assert(orphanACases.length === 0, "A showcase cases reference missing models", orphanACases.map((item) => `${item.id}->${item.modelId}`).join(", "));

const modelCountMismatches = models
  .map((model) => ({
    id: model.id,
    declared: Number(model.aCaseCount ?? 0),
    actual: aCasesByModel.get(model.id) || 0
  }))
  .filter((item) => item.declared !== item.actual);
assert(modelCountMismatches.length === 0, "model aCaseCount does not match A-case aggregation", modelCountMismatches.map((item) => `${item.id}:${item.declared}/${item.actual}`).join(", "));

const totalModelACases = models.reduce((sum, model) => sum + Number(model.aCaseCount ?? 0), 0);
assert(totalModelACases === aCases.length, "sum of model aCaseCount does not match A showcase cases", `${totalModelACases} !== ${aCases.length}`);

const archiveCaseIds = new Set((evidenceArchive.cases ?? []).map((item) => item.caseId));
const aCaseIds = new Set(aCases.map((item) => item.id));
const missingArchiveCases = aCases.filter((item) => !archiveCaseIds.has(item.id));
const staleArchiveCases = (evidenceArchive.cases ?? []).filter((item) => !aCaseIds.has(item.caseId));
assert(Number(evidenceArchive.schemaVersion) === 1, "evidence archive schema version mismatch");
assert(Number(evidenceArchive.summary?.aCaseCount ?? NaN) === aCases.length, "evidence archive A-case count mismatch", `${evidenceArchive.summary?.aCaseCount} !== ${aCases.length}`);
assert(Number(evidenceArchive.summary?.manifestedCases ?? NaN) === aCases.length, "evidence archive manifested case count mismatch", `${evidenceArchive.summary?.manifestedCases} !== ${aCases.length}`);
assert(Number(evidenceArchive.summary?.missingOriginalEvidence ?? NaN) === 0, "evidence archive has cases missing original evidence");
assert(Number(evidenceArchive.summary?.missingArtifact ?? NaN) === 0, "evidence archive has cases missing artifact URLs");
assert(missingArchiveCases.length === 0, "A showcase cases missing evidence archive entries", missingArchiveCases.map((item) => item.id).join(", "));
assert(staleArchiveCases.length === 0, "evidence archive has stale case entries", staleArchiveCases.map((item) => item.caseId).join(", "));

const nonSnapshottedCases = (evidenceArchive.cases ?? []).filter((item) => item.snapshotStatus !== "snapshotted");
const issueCaseCount = (evidenceArchive.snapshotIssues ?? []).reduce((sum, item) => sum + Number(item.cases ?? 0), 0);
const entriesMissingIssue = nonSnapshottedCases.filter((item) => !item.snapshotIssue?.code || !item.snapshotIssue?.label || !item.snapshotIssue?.action);
assert(Number(evidenceArchive.summary?.snapshotIssueTypes ?? NaN) === (evidenceArchive.snapshotIssues ?? []).length, "evidence archive snapshot issue type count mismatch");
assert(issueCaseCount === nonSnapshottedCases.length, "snapshot issue cases do not match non-snapshotted cases", `${issueCaseCount} !== ${nonSnapshottedCases.length}`);
assert(entriesMissingIssue.length === 0, "non-snapshotted entries missing snapshot issue metadata", entriesMissingIssue.map((item) => item.caseId).join(", "));

const currentHistory = (evidenceArchiveHistory.snapshots ?? []).find((item) => item.id === `current-${metrics.datasetCut}`);
assert(Number(evidenceArchiveHistory.schemaVersion) === 1, "evidence archive history schema version mismatch");
assert(Boolean(currentHistory), "evidence archive history missing current dataset cut", `current-${metrics.datasetCut}`);
assert(Number(currentHistory?.snapshottedCases ?? NaN) === Number(evidenceArchive.summary?.snapshottedCases ?? NaN), "evidence archive history snapshotted count mismatch");
assert(Number(currentHistory?.pendingSnapshotCases ?? NaN) === Number(evidenceArchive.summary?.pendingSnapshotCases ?? NaN), "evidence archive history pending count mismatch");

const sharedRequired = [
  `活跃模型：${expected.activeModels} 个`,
  `A 类精选案例：${expected.aCases} 条`,
  `总案例记录：${expected.totalCases} 条`,
  `活跃模型剩余目标缺口：${expected.activeCaseDeficitToTarget}`,
  "/updates",
  "/llms.txt",
  "/atlas.json",
  "/evidence-archive.json",
  "/evidence-archive-history.json"
];

for (const text of sharedRequired) {
  requireText(rootReadme, "root README", text);
  requireText(siteReadme, "site README", text);
}

const siteRequired = [
  `厂商页面：${expected.vendors} 个`,
  `总模型：${expected.totalModels} 个`,
  `已归档模型：${expected.archiveModels} 个`,
  `达到 ${targetCasesPerModel} 条 A 类精选案例目标线的活跃模型：${expected.activeModelsMeetingTarget} 个`,
  `数据截点：${expected.datasetCut}`,
  "Signal Observatory x Living Archive",
  "复制研究包",
  "/cases/[id]",
  "/methodology",
  "/evidence-archive.json",
  "/evidence-archive-history.json",
  "/sitemap.xml"
];

for (const text of siteRequired) {
  requireText(siteReadme, "site README", text);
}

const forbidden = [
  "系统事务所",
  "数字工作室",
  "开始系统诊断",
  "服务客户",
  "Verified A-grade cases: 8",
  "Models with verified public A cases: 1",
  "Models without verified public A cases: 115",
  "Claude Fable 5 currently has 8 verified A cases",
  "Dataset cut: 2026-06-26"
];

for (const text of forbidden) {
  forbidText(rootReadme, "root README", text);
  forbidText(siteReadme, "site README", text);
}

console.log(`content qa passed: ${expected.totalModels} models / ${expected.aCases} A cases / data cut ${expected.datasetCut}`);
