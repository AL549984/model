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
  const backfill = backfillById.get(model.id);
  return {
    taskId: `hermes-case-crawl-${model.id}`,
    modelId: model.id,
    modelName: model.name,
    vendorId: model.vendorId,
    vendor: model.vendor,
    priority: backfill?.priority ?? "P2",
    status: backfill?.status ?? "needs_a_case",
    publishability: model.publishability,
    aCaseCount: model.aCaseCount ?? 0,
    officialSources: model.sources ?? [],
    crawlSources: sourceTargetsFor(model),
    queries: backfill?.searchQueries?.map((item) => item.query) ?? [
      `${model.name} ${model.vendor} case study customer`,
      `${model.name} built with GitHub demo`,
      `${model.name} production use product blog`
    ],
    outputContract: {
      table: "cases",
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
    }
  };
});

fs.writeFileSync(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), tasks }, null, 2)}\n`);
console.log(`Exported ${tasks.length} Hermes crawl task(s) to ${path.relative(repoRoot, outputPath)}.`);
