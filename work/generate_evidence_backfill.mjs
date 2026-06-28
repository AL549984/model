import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const siteDataDir = path.join(root, "site/src/data");
const outputsDir = path.join(root, "outputs");
const workDir = path.join(root, "work");

const models = JSON.parse(fs.readFileSync(path.join(siteDataDir, "models.json"), "utf8"));
const cases = JSON.parse(fs.readFileSync(path.join(siteDataDir, "cases.json"), "utf8"));
const metrics = JSON.parse(fs.readFileSync(path.join(siteDataDir, "metrics.json"), "utf8"));

const MIN_A_CASES = Number(process.env.MODEL_ATLAS_MIN_A_CASES ?? 3);
const TARGET_A_CASES = Number(process.env.MODEL_ATLAS_TARGET_A_CASES ?? 5);

const highPriorityVendors = new Set(["openai", "anthropic", "google", "deepseek", "qwen-alibaba"]);
const familyOnlyPatterns = [
  /\b(high|xhigh|max)\b/i,
  /\bpreview\b/i,
  /\bexp\b/i,
  /\bthinking\b/i,
  /\breasoning\b/i,
  /\b\d{4}\b/,
  /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i
];
const futureOrUnstablePatterns = [
  /\bgpt-5\.[1-9]/i,
  /\bclaude (?:4|mythos 5|opus 4)/i,
  /\bqwen3\.[5-9]/i,
  /\bgrok 4\./i,
  /\bglm-5\b/i,
  /\bseed2\.1/i
];

const vendorTargets = {
  "openai": [
    "OpenAI customer stories / news",
    "OpenAI platform model docs",
    "customer product blog or press release"
  ],
  "anthropic": [
    "Anthropic customer stories",
    "Anthropic docs model overview",
    "customer product page or engineering blog"
  ],
  "google": [
    "Google Cloud customer stories",
    "Google AI / DeepMind model docs",
    "Vertex AI customer implementation"
  ],
  "deepseek": [
    "DeepSeek official docs / release notes",
    "GitHub repos declaring the exact model",
    "developer project demos with source"
  ],
  "qwen-alibaba": [
    "Qwen official blog / docs",
    "ModelScope or GitHub model page",
    "developer project demos with source"
  ],
  "meta": [
    "Llama official case studies",
    "Meta AI model cards",
    "customer implementation pages"
  ],
  "xai": [
    "xAI docs / release posts",
    "X product announcements with snapshots",
    "customer or developer artifacts"
  ]
};

function hasACase(model) {
  return cases.some((item) => item.modelId === model.id && item.evidenceGrade === "A" && item.showcaseEligible);
}

function isInactiveModel(model) {
  return model.publishability === "Archive" || model.publishability === "Hold";
}

function aCaseCountFor(model) {
  return cases.filter((item) => item.modelId === model.id && item.evidenceGrade === "A" && item.showcaseEligible).length;
}

function minDeficitFor(model) {
  if (isInactiveModel(model)) return 0;
  return Math.max(0, MIN_A_CASES - aCaseCountFor(model));
}

function targetDeficitFor(model) {
  if (isInactiveModel(model)) return 0;
  return Math.max(0, TARGET_A_CASES - aCaseCountFor(model));
}

function sourceCount(model) {
  return (model.sources ?? []).filter((source) => !String(source).includes("artificialanalysis.ai")).length;
}

function isFamilyOrVariant(model) {
  return familyOnlyPatterns.some((pattern) => pattern.test(model.name)) || familyOnlyPatterns.some((pattern) => pattern.test(model.slug));
}

function isFutureOrUnstable(model) {
  return futureOrUnstablePatterns.some((pattern) => pattern.test(model.name)) || futureOrUnstablePatterns.some((pattern) => pattern.test(model.slug));
}

function priorityFor(model) {
  if (isInactiveModel(model)) return "P3";
  const count = aCaseCountFor(model);
  if (count >= TARGET_A_CASES) return "P2";
  if (isFutureOrUnstable(model)) return "P0";
  if ((model.score ?? 0) >= 40) return "P0";
  if (count > 0 && count < MIN_A_CASES) return "P0";
  if (count >= MIN_A_CASES && count < TARGET_A_CASES) return "P1";
  if ((model.score ?? 0) >= 25 || String(model.reasoning ?? "").includes("是") || highPriorityVendors.has(model.vendorId)) return "P1";
  return "P2";
}

function blockerFor(model) {
  if (isInactiveModel(model)) return "归档或暂停状态，先确认是否仍需公开模型页。";
  const count = aCaseCountFor(model);
  if (count >= TARGET_A_CASES) return "已达到 5 条目标线，下一步是补快照和 URL 健康检查。";
  if (count >= MIN_A_CASES) return `已有 ${count} 条 A 类案例，继续补到 5 条目标线。`;
  if (count > 0) return `已有 ${count} 条 A 类案例，但低于 3 条公开达标线。`;
  if (isFutureOrUnstable(model)) return "模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。";
  if (isFamilyOrVariant(model)) return "更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。";
  return "缺少具体使用者、具体任务、具体产物和原始证据 URL。";
}

function statusFor(model) {
  if (isInactiveModel(model)) return "archive_review";
  const count = aCaseCountFor(model);
  if (count >= TARGET_A_CASES) return "target_met_snapshot_refresh";
  if (count >= MIN_A_CASES) return "top_up_to_target";
  if (count > 0) return "below_min_case_coverage";
  if (isFutureOrUnstable(model)) return "identity_first";
  return "needs_a_case";
}

function requiredEvidenceFor(model) {
  if (isInactiveModel(model)) {
    return [
      "当前不进入活跃模型目标线，暂停自动补案例。",
      "若恢复为活跃模型，先确认模型身份、公开可用性和一手资料，再补 A 类案例。"
    ];
  }
  const items = [];
  const count = aCaseCountFor(model);
  if (sourceCount(model) === 0) items.push("补官方发布、docs、model card 或等价一手资料。");
  if (count < MIN_A_CASES) items.push(`补到至少 ${MIN_A_CASES} 条 A 类案例：具体主体、任务、产物、原始证据 URL、artifact URL。`);
  if (count < TARGET_A_CASES) items.push(`继续补齐到 ${TARGET_A_CASES} 条 A 类案例，优先覆盖不同平台和不同任务类型。`);
  if (isFutureOrUnstable(model)) items.push("先确认模型名、发布日期、可用平台和是否为真实公开模型。");
  if (isFamilyOrVariant(model) && !isFutureOrUnstable(model)) items.push("确认是否应并入家族模型页，而不是单独追独立案例。");
  items.push("A/B 证据必须保存快照，不能只保留 live URL。");
  return items;
}

function queryText(model, suffix) {
  return `${model.name} ${model.vendor} ${suffix}`.replace(/\s+/g, " ").trim();
}

function searchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function queriesFor(model) {
  const queries = [
    queryText(model, "case study customer"),
    queryText(model, "built with GitHub demo"),
    queryText(model, "production use product blog"),
    queryText(model, "model card docs API pricing context window"),
    queryText(model, "真实使用 案例 项目 开源"),
    queryText(model, "GitHub README built with"),
    queryText(model, "B站 使用 案例 demo"),
    queryText(model, "微信公众号 使用 案例 产品")
  ];
  return queries.map((query) => ({ query, url: searchUrl(query) }));
}

function tsvEscape(value) {
  return String(value ?? "").replace(/\t/g, " ").replace(/\r?\n/g, " ");
}

const backfill = models
  .map((model) => {
    const aCase = hasACase(model);
    const priority = priorityFor(model);
    return {
      modelId: model.id,
      slug: model.slug,
      modelName: model.name,
      vendorId: model.vendorId,
      vendor: model.vendor,
      publishability: model.publishability,
      aCaseCount: aCaseCountFor(model),
      minACases: MIN_A_CASES,
      targetACases: TARGET_A_CASES,
      minDeficit: minDeficitFor(model),
      targetDeficit: targetDeficitFor(model),
      sourceCount: sourceCount(model),
      score: model.score ?? null,
      priority,
      status: statusFor(model),
      blocker: blockerFor(model),
      requiredEvidence: requiredEvidenceFor(model),
      targetSources: vendorTargets[model.vendorId] ?? [
        "official release or docs",
        "customer story or product page",
        "public repo, demo, PR, video or engineering blog"
      ],
      searchQueries: queriesFor(model),
      upgradeGate: aCase
        ? isInactiveModel(model)
          ? "Archive/Hold 状态不自动升级；需人工恢复为活跃模型后再评估案例覆盖。"
          : aCaseCountFor(model) >= MIN_A_CASES
          ? `达到公开达标线；继续补到 ${TARGET_A_CASES} 条并补 evidence_snapshot_url、artifact 快照和关键字段复核。`
          : `已有案例但未达标；补到至少 ${MIN_A_CASES} 条 A 类案例后，才能公开达标。`
        : isInactiveModel(model)
          ? "Archive/Hold 状态不自动补案例；需人工恢复为活跃模型后再进入 backfill。"
          : `只有补到至少 ${MIN_A_CASES} 条审核通过的 A 类案例后，才能从 Limited 升为 Publishable；${TARGET_A_CASES} 条视为补齐。`
    };
  })
  .sort((a, b) => {
    const order = { P0: 0, P1: 1, P2: 2, P3: 3 };
    return order[a.priority] - order[b.priority] || a.vendor.localeCompare(b.vendor) || a.modelName.localeCompare(b.modelName);
  });

fs.writeFileSync(path.join(siteDataDir, "evidenceBackfill.json"), `${JSON.stringify(backfill, null, 2)}\n`);

const tsvHeader = [
  "priority",
  "status",
  "vendor",
  "vendor_id",
  "model_name",
  "model_id",
  "publishability",
  "a_case_count",
  "min_a_cases",
  "target_a_cases",
  "min_deficit",
  "target_deficit",
  "source_count",
  "blocker",
  "required_evidence",
  "search_query_1",
  "search_query_2",
  "search_query_3",
  "search_query_4",
  "search_query_5",
  "search_query_6",
  "search_query_7",
  "search_query_8"
];
const tsvRows = backfill.map((item) => [
  item.priority,
  item.status,
  item.vendor,
  item.vendorId,
  item.modelName,
  item.modelId,
  item.publishability,
  item.aCaseCount,
  item.minACases,
  item.targetACases,
  item.minDeficit,
  item.targetDeficit,
  item.sourceCount,
  item.blocker,
  item.requiredEvidence.join(" / "),
  ...item.searchQueries.map((query) => query.query)
].map(tsvEscape).join("\t"));
fs.writeFileSync(path.join(workDir, "evidence-backfill-intake.tsv"), `${tsvHeader.join("\t")}\n${tsvRows.join("\n")}\n`);

const counts = backfill.reduce((acc, item) => {
  acc[item.priority] = (acc[item.priority] ?? 0) + 1;
  acc[item.status] = (acc[item.status] ?? 0) + 1;
  return acc;
}, {});
const limited = backfill.filter((item) => item.publishability === "Limited");
const p0 = backfill.filter((item) => item.priority === "P0");
const activeBackfill = backfill.filter((item) => !["Archive", "Hold"].includes(item.publishability));
const minReady = activeBackfill.filter((item) => item.aCaseCount >= MIN_A_CASES).length;
const targetReady = activeBackfill.filter((item) => item.aCaseCount >= TARGET_A_CASES).length;
const minDeficit = activeBackfill.reduce((sum, item) => sum + item.minDeficit, 0);
const targetDeficit = activeBackfill.reduce((sum, item) => sum + item.targetDeficit, 0);

const mdLines = [
  "# Evidence Backfill Full Plan",
  "",
  `> Generated from site data. Dataset cut: ${metrics.datasetCut}.`,
  "",
  "## Summary",
  "",
  `- Models: ${metrics.models}`,
  `- Active models: ${activeBackfill.length}`,
  `- Publishable models: ${metrics.publishableModels}`,
  `- Limited models: ${metrics.limitedModels}`,
  `- Archive models: ${metrics.archiveModels}`,
  `- Verified A-grade cases: ${metrics.verifiedACases}`,
  `- Models without A-grade cases: ${metrics.modelsWithoutCases}`,
  `- Minimum public case line: ${MIN_A_CASES} A-grade cases per model`,
  `- Full target case line: ${TARGET_A_CASES} A-grade cases per model`,
  `- Models meeting minimum line: ${minReady}`,
  `- Models meeting full target line: ${targetReady}`,
  `- A-case deficit to minimum line: ${minDeficit}`,
  `- A-case deficit to full target line: ${targetDeficit}`,
  `- Backfill rows: ${backfill.length}`,
  `- P0 rows: ${counts.P0 ?? 0}`,
  `- P1 rows: ${counts.P1 ?? 0}`,
  `- P2 rows: ${counts.P2 ?? 0}`,
  `- P3 rows: ${counts.P3 ?? 0}`,
  "",
  "## Operating Rule",
  "",
  `Full backfill means every model is chased to at least ${MIN_A_CASES} verified A-grade real-use cases, with ${TARGET_A_CASES} as the full target. A model should not be treated as public-ready merely because it has one case.`,
  "",
  "## Priority Meaning",
  "",
  "| Priority | Meaning | Action |",
  "|---|---|---|",
  "| P0 | High-value or identity-risk rows | Verify model identity first, then hunt A cases |",
  "| P1 | Rows near the public line or strong candidates | Hunt A cases and official facts |",
  "| P2 | Lower-risk rows or rows already at target | Refresh fields, snapshots or family mapping |",
  "| P3 | Archive / hold rows | Confirm whether to keep, merge or remove |",
  "",
  "## P0 Backfill Queue",
  "",
  "| Vendor | Model | Status | Blocker | First search query |",
  "|---|---|---|---|---|",
  ...p0.map((item) => `| ${item.vendor} | ${item.modelName} | ${item.status} | ${item.blocker} | ${item.searchQueries[0].query} |`),
  "",
  "## All Limited Rows",
  "",
  "| Priority | Vendor | Model | Status | A cases | Source count | Blocker |",
  "|---|---|---|---|---:|---:|---|",
  ...limited.map((item) => `| ${item.priority} | ${item.vendor} | ${item.modelName} | ${item.status} | ${item.aCaseCount} | ${item.sourceCount} | ${item.blocker} |`),
  "",
  "## Full-Coverage Rule For Hermes",
  "",
  `- Minimum public line: ${MIN_A_CASES} A cases per model.`,
  `- Full target line: ${TARGET_A_CASES} A cases per model.`,
  "- Keep crawling a model until `targetDeficit` reaches 0, unless `archive_review` or identity validation fails.",
  "- Do not duplicate one product launch across multiple model variants unless the original evidence names the exact variant.",
  "- Prefer diversity: at least two different source platforms and at least two different task categories when possible.",
  "",
  "## Generated Files",
  "",
  "- `site/src/data/evidenceBackfill.json`: data used by model detail pages.",
  "- `work/evidence-backfill-intake.tsv`: copyable intake table for research work.",
  "- `outputs/evidence-backfill-full-plan.md`: this plan.",
  ""
];

fs.writeFileSync(path.join(outputsDir, "evidence-backfill-full-plan.md"), `${mdLines.join("\n")}`);

console.log(`Generated ${backfill.length} backfill rows.`);
console.log(`P0=${counts.P0 ?? 0} P1=${counts.P1 ?? 0} P2=${counts.P2 ?? 0} P3=${counts.P3 ?? 0}`);
