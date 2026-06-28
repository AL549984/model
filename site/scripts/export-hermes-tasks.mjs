import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(root, "..");
const dataDir = path.join(root, "src/data");
const outputPath = path.join(repoRoot, "work/hermes-model-case-tasks.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
}

const models = readJson("models.json");
const evidenceBackfill = readJson("evidenceBackfill.json");
const backfillById = new Map(evidenceBackfill.map((item) => [item.modelId, item]));
const MIN_A_CASES = Number(process.env.MODEL_ATLAS_MIN_A_CASES ?? 3);
const TARGET_A_CASES = Number(process.env.MODEL_ATLAS_TARGET_A_CASES ?? 5);

function sourceTargetsFor(model) {
  const common = [
    { id: "official_web", label: "官网 / docs / customer stories", weight: 1.0 },
    { id: "github", label: "GitHub repos / issues / PRs", weight: 0.95 },
    { id: "web_search", label: "公开网页 / 产品博客 / 新闻稿", weight: 0.9 },
    { id: "youtube", label: "YouTube videos", weight: 0.75 },
    { id: "bilibili", label: "B 站视频", weight: 0.75 },
    { id: "x", label: "X / Twitter", weight: 0.65 },
    { id: "wechat", label: "微信公众号文章", weight: 0.6 },
    { id: "xiaohongshu", label: "小红书笔记", weight: 0.45 },
    { id: "douyin", label: "抖音视频", weight: 0.45 }
  ];
  if (["qwen-alibaba", "deepseek", "kimi", "z-ai", "bytedance-seed", "xiaomi"].includes(model.vendorId)) {
    return common.sort((a, b) => {
      const cnBoost = new Set(["wechat", "bilibili", "xiaohongshu", "douyin"]);
      return (cnBoost.has(b.id) ? 1 : 0) - (cnBoost.has(a.id) ? 1 : 0) || b.weight - a.weight;
    });
  }
  return common;
}

const tasks = models.map((model) => {
  const inactive = ["Archive", "Hold"].includes(model.publishability);
  const backfill = backfillById.get(model.id);
  const aCaseCount = backfill?.aCaseCount ?? model.aCaseCount ?? 0;
  const minACases = backfill?.minACases ?? MIN_A_CASES;
  const targetACases = backfill?.targetACases ?? TARGET_A_CASES;
  const minDeficit = inactive ? 0 : (backfill?.minDeficit ?? Math.max(0, minACases - aCaseCount));
  const targetDeficit = inactive ? 0 : (backfill?.targetDeficit ?? Math.max(0, targetACases - aCaseCount));
  return {
    taskId: `hermes-case-crawl-${model.id}`,
    modelId: model.id,
    modelName: model.name,
    vendorId: model.vendorId,
    vendor: model.vendor,
    priority: inactive ? "P3" : (backfill?.priority ?? "P2"),
    status: inactive ? "archive_review" : (backfill?.status ?? "needs_a_case"),
    publishability: model.publishability,
    aCaseCount,
    minACases,
    targetACases,
    minDeficit,
    targetDeficit,
    publicReady: aCaseCount >= minACases,
    fullCoverageReady: aCaseCount >= targetACases,
    crawlBudget: {
      minCandidatesPerMissingACase: 12,
      targetCandidateCount: Math.max(12, targetDeficit * 12),
      maxCandidatesPerRun: Math.max(24, Math.min(80, targetDeficit * 18 || 24))
    },
    officialSources: model.sources ?? [],
    crawlSources: sourceTargetsFor(model),
    queries: backfill?.searchQueries?.map((item) => item.query) ?? [
      `${model.name} ${model.vendor} case study customer`,
      `${model.name} built with GitHub demo`,
      `${model.name} production use product blog`
    ],
    outputContract: {
      table: "cases",
      minAcceptedACases: minACases,
      targetAcceptedACases: targetACases,
      stopWhen: `accepted A cases for ${model.id} >= ${targetACases}`,
      requiredFields: [
        "case_id",
        "case_title",
        "model_id",
        "model_name",
        "vendor_id",
        "vendor",
        "user_or_org",
        "original_evidence_url",
        "artifact_url",
        "source_platform",
        "source_type",
        "task_category",
        "task_description",
        "output_result",
        "model_contribution",
        "risk_notes",
        "collected_at"
      ]
    },
    autoGate: {
      publishAOnlyWhen: [
        "source_type is real_case",
        "model_id maps to a known model",
        "user_or_org is present",
        "task_description is present",
        "output_result is present",
        "model_contribution is present",
        "original_evidence_url is http(s)",
        "artifact_url is http(s)",
        "source is not collection, benchmark-only, tutorial-only or search-summary-only"
      ],
      noHumanReview: true
    },
    dedupeKeys: [
      "model_id + original_evidence_url",
      "model_id + artifact_url",
      "case_id"
    ],
    rejectIf: [
      "collection page only",
      "benchmark / leaderboard only",
      "tutorial or prompt template only",
      "launch post without concrete user artifact",
      "model family mentioned but exact model/variant not bound",
      "artifact is private or not reachable"
    ],
    preferDiversity: {
      sourcePlatforms: 2,
      taskCategories: 2
    }
  };
});

const activeTasks = tasks.filter((task) => !["Archive", "Hold"].includes(task.publishability));
const rawAllModelMinDeficit = models.reduce((sum, model) => sum + Math.max(0, MIN_A_CASES - Number(model.aCaseCount ?? 0)), 0);
const rawAllModelTargetDeficit = models.reduce((sum, model) => sum + Math.max(0, TARGET_A_CASES - Number(model.aCaseCount ?? 0)), 0);
const activeMinDeficit = activeTasks.reduce((sum, task) => sum + task.minDeficit, 0);
const activeTargetDeficit = activeTasks.reduce((sum, task) => sum + task.targetDeficit, 0);

const summary = {
  models: tasks.length,
  activeModels: activeTasks.length,
  minACases: MIN_A_CASES,
  targetACases: TARGET_A_CASES,
  publicReady: activeTasks.filter((task) => task.publicReady).length,
  fullCoverageReady: activeTasks.filter((task) => task.fullCoverageReady).length,
  minDeficit: activeMinDeficit,
  targetDeficit: activeTargetDeficit,
  activeMinDeficit,
  activeTargetDeficit,
  allModelMinDeficit: rawAllModelMinDeficit,
  allModelTargetDeficit: rawAllModelTargetDeficit
};

fs.writeFileSync(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), summary, tasks }, null, 2)}\n`);
console.log(`Exported ${tasks.length} Hermes crawl task(s) to ${path.relative(repoRoot, outputPath)}.`);
console.log(`Case coverage: publicReady=${summary.publicReady}/${summary.activeModels}, fullCoverageReady=${summary.fullCoverageReady}/${summary.activeModels}, minDeficit=${summary.minDeficit}, targetDeficit=${summary.targetDeficit}.`);
