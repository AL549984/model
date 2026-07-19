import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src/data");
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");

function loadDotEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && process.env[key] == null) process.env[key] = value;
  }
}

loadDotEnv(path.join(process.env.HOME ?? "", ".hermes/.env"));
loadDotEnv(path.join(root, ".env"));

const env = process.env;
const FEISHU_BASE_URL = env.FEISHU_BASE_URL || "https://open.feishu.cn";
const MIN_A_CASES = Number(env.MODEL_ATLAS_MIN_A_CASES ?? 3);
const TARGET_A_CASES = Number(env.MODEL_ATLAS_TARGET_A_CASES ?? 5);
const LARK_CLI_USER_TOKEN = "__lark_cli_user__";
const VENDOR_ID_ALIASES = new Map([
  ["bytedance_seed", "bytedance-seed"],
  ["sakana", "sakana-ai"]
]);

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
}

function writeJson(file, data) {
  fs.writeFileSync(path.join(dataDir, file), `${JSON.stringify(data, null, 2)}\n`);
}

function uniqueList(values) {
  return [...new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))];
}

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function canonicalVendorId(value) {
  const id = String(value ?? "").trim();
  return VENDOR_ID_ALIASES.get(id) ?? id;
}

function parseBool(value, fallback = false) {
  if (typeof value === "boolean") return value;
  const text = String(value ?? "").trim().toLowerCase();
  if (["true", "yes", "y", "1", "是", "已审核", "auto_approved"].includes(text)) return true;
  if (["false", "no", "n", "0", "否", "rejected", "auto_rejected"].includes(text)) return false;
  return fallback;
}

function normalizeFeishuValue(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) {
    return value.map(normalizeFeishuValue).filter(Boolean).join(" ; ");
  }
  if (typeof value === "object") {
    if ("text" in value) return normalizeFeishuValue(value.text);
    if ("name" in value) return normalizeFeishuValue(value.name);
    if ("link" in value) return normalizeFeishuValue(value.link);
    if ("url" in value) return normalizeFeishuValue(value.url);
    if ("value" in value) return normalizeFeishuValue(value.value);
    if ("en_us" in value) return normalizeFeishuValue(value.en_us);
    if ("zh_cn" in value) return normalizeFeishuValue(value.zh_cn);
  }
  return String(value);
}

function pick(fields, names, fallback = "") {
  for (const name of names) {
    if (Object.hasOwn(fields, name)) {
      const value = normalizeFeishuValue(fields[name]);
      if (value !== "") return value;
    }
  }
  return fallback;
}

function splitList(value) {
  return uniqueList(String(value ?? "").split(/\s*[;\n,，]\s*/));
}

function parseSources(value) {
  return uniqueList(
    String(value ?? "").split(/\s*(?:[;\n]|,(?=\s*https?:\/\/))\s*/)
  );
}

function looksLikeUrl(value) {
  return /^https?:\/\//i.test(String(value ?? "").trim());
}

function hasText(value) {
  return String(value ?? "").trim().length > 0;
}

function modelCompletenessScore(model) {
  const placeholders = /^(?:暂无数据|待核验|否或官方未披露)$/;
  const fields = [
    "name",
    "vendorId",
    "vendor",
    "headline",
    "summary",
    "releaseDate",
    "modelId",
    "context",
    "output",
    "modality",
    "reasoning",
    "price",
    "officialLink",
    "notes"
  ];
  const fieldScore = fields.reduce((score, field) => {
    const value = String(model[field] ?? "").trim();
    return score + (value && !placeholders.test(value) ? 1 : 0);
  }, 0);
  return fieldScore + (model.sources?.length ?? 0) * 3;
}

function mergeModelsById(input) {
  const byId = new Map();
  const duplicateIds = new Set();
  const listFields = ["sources", "platforms", "fit", "avoid", "riskNotes"];

  for (const model of input) {
    const existing = byId.get(model.id);
    if (!existing) {
      byId.set(model.id, model);
      continue;
    }

    duplicateIds.add(model.id);
    const incomingIsRicher =
      modelCompletenessScore(model) > modelCompletenessScore(existing);
    const primary = incomingIsRicher ? model : existing;
    const secondary = incomingIsRicher ? existing : model;
    const merged = { ...secondary, ...primary };
    for (const field of listFields) {
      merged[field] = uniqueList([
        ...(existing[field] ?? []),
        ...(model[field] ?? [])
      ]);
    }
    merged.supplementalSourceCount = merged.sources.filter(
      (source) => !source.includes("artificialanalysis.ai")
    ).length;
    byId.set(model.id, merged);
  }

  return {
    models: [...byId.values()],
    duplicateIds: [...duplicateIds].sort()
  };
}

function evidenceGate(caseItem) {
  const explicitGrade = String(caseItem.evidenceGrade ?? "").trim().toUpperCase();
  if (explicitGrade && explicitGrade !== "A") {
    return {
      evidenceGrade: explicitGrade,
      showcaseEligible: false,
      selectedForModelCard: false,
      reviewStatus: caseItem.reviewStatus || "auto_candidate",
      riskNotes: caseItem.riskNotes || `显式证据等级为 ${explicitGrade}，不进入 A 类精选。`
    };
  }

  const sourceType = String(caseItem.sourceType ?? "").toLowerCase();
  const hasCore =
    hasText(caseItem.modelId) &&
    hasText(caseItem.userOrOrg) &&
    hasText(caseItem.taskDescription) &&
    hasText(caseItem.outputResult) &&
    hasText(caseItem.modelContribution);
  const hasUrls = looksLikeUrl(caseItem.originalEvidenceUrl) && looksLikeUrl(caseItem.artifactUrl);
  const bannedType = ["collection", "evaluation", "tutorial", "overview", "invalid"].includes(sourceType);

  if (sourceType === "real_case" && hasCore && hasUrls) {
    return {
      evidenceGrade: "A",
      showcaseEligible: true,
      selectedForModelCard: parseBool(caseItem.selectedForModelCard, true),
      reviewStatus: "auto_approved",
      riskNotes: caseItem.riskNotes || "自动 gate 通过；仍需保留来源快照和 URL 健康检查记录。"
    };
  }

  if (!bannedType && hasText(caseItem.modelId) && looksLikeUrl(caseItem.originalEvidenceUrl)) {
    return {
      evidenceGrade: "B",
      showcaseEligible: false,
      selectedForModelCard: false,
      reviewStatus: "auto_candidate",
      riskNotes: caseItem.riskNotes || "自动 gate 判定为 B：缺少完整公开产物、任务或模型贡献链路。"
    };
  }

  if (["evaluation", "tutorial", "overview"].includes(sourceType)) {
    return {
      evidenceGrade: "C",
      showcaseEligible: false,
      selectedForModelCard: false,
      reviewStatus: "auto_background",
      riskNotes: caseItem.riskNotes || "自动 gate 判定为 C：可作背景，不进入真实案例精选。"
    };
  }

  return {
    evidenceGrade: "D",
    showcaseEligible: false,
    selectedForModelCard: false,
    reviewStatus: "auto_rejected",
    riskNotes: caseItem.riskNotes || "自动 gate 判定为 D：缺少可核验原始证据或产物链路。"
  };
}

function mapModelRecord(record, existingById) {
  const fields = record.fields ?? record;
  const name = pick(fields, ["name", "模型名", "model_name", "Model Name"]);
  const id = pick(fields, ["id", "slug", "model_id", "模型 ID"], slugify(name));
  const existing = existingById.get(id) ?? {};
  const vendor = pick(fields, ["vendor", "厂商", "Vendor"], existing.vendor ?? "");
  const vendorId = canonicalVendorId(
    pick(fields, ["vendorId", "vendor_id", "厂商 ID"], existing.vendorId ?? slugify(vendor))
  );
  const sources = parseSources(pick(fields, ["sources", "source_links", "来源链接", "来源和证据"], existing.sources?.join("; ") ?? ""));

  return {
    ...existing,
    id,
    name: name || existing.name || id,
    slug: pick(fields, ["slug", "页面 slug"], existing.slug ?? id),
    vendorId,
    vendor: vendor || existing.vendor || vendorId,
    publishability: pick(fields, ["publishability", "发布状态", "状态"], existing.publishability ?? "Limited"),
    caseStatus: existing.caseStatus ?? "暂无已验证 A 类案例",
    sourceStatus: existing.sourceStatus ?? "来自飞书同步；字段缺失时保持待补证。",
    headline: pick(fields, ["headline", "标题"], existing.headline ?? `${name || id} 的飞书同步模型卡。`),
    summary: pick(fields, ["summary", "摘要", "30 秒结论"], existing.summary ?? "来自飞书同步模型卡；证据强度由自动 gate 决定。"),
    releaseDate: pick(fields, ["releaseDate", "release_date", "发布时间"], existing.releaseDate ?? "暂无数据"),
    modelId: pick(fields, ["modelId", "api_model_id", "API Model ID", "模型 API ID"], existing.modelId ?? id),
    context: pick(fields, ["context", "上下文"], existing.context ?? "暂无数据"),
    output: pick(fields, ["output", "输出"], existing.output ?? "暂无数据"),
    modality: pick(fields, ["modality", "模态"], existing.modality ?? "文本 / 多模态待核验"),
    reasoning: pick(fields, ["reasoning", "推理"], existing.reasoning ?? "否或官方未披露"),
    price: pick(fields, ["price", "价格"], existing.price ?? "官方未披露 / 暂无数据"),
    platforms: splitList(pick(fields, ["platforms", "可用平台"], existing.platforms?.join("; ") ?? vendor)),
    officialLink: pick(fields, ["officialLink", "official_link", "官方链接"], existing.officialLink ?? sources[0] ?? ""),
    score: Number(pick(fields, ["score", "AA 评分"], existing.score ?? "")) || (existing.score ?? null),
    scoreDelta: existing.scoreDelta ?? null,
    vendorOrder: existing.vendorOrder ?? null,
    artificialAnalysisId: pick(fields, ["artificialAnalysisId", "aa_id"], existing.artificialAnalysisId ?? null),
    baseModelReleaseDate: pick(fields, ["baseModelReleaseDate", "基础模型发布时间"], existing.baseModelReleaseDate ?? "Artificial Analysis 未披露"),
    notes: pick(fields, ["notes", "备注"], existing.notes ?? ""),
    sourceKind: "feishu",
    capabilities: existing.capabilities ?? {
      codingAgent: "待核验",
      longContext: "暂无数据",
      research: "待核验",
      openEcosystem: "待核验",
      lifecycleRisk: "中"
    },
    fit: splitList(pick(fields, ["fit", "适合场景"], existing.fit?.join("; ") ?? "作为完整模型索引和厂商路线追踪入口")),
    avoid: splitList(pick(fields, ["avoid", "不适合"], existing.avoid?.join("; ") ?? "缺少真实案例时不要包装成推荐")),
    aCaseCount: existing.aCaseCount ?? 0,
    sourceCoverage: sources.length > 0 ? "supplemented" : existing.sourceCoverage ?? "aa_only",
    supplementalSourceCount: sources.filter((source) => !source.includes("artificialanalysis.ai")).length,
    riskNotes: splitList(pick(fields, ["riskNotes", "风险备注"], existing.riskNotes?.join("; ") ?? "自动同步字段；缺失值保持待补证。")),
    sources,
    sourceFile: "Feishu Bitable"
  };
}

function mapCaseRecord(record, existingModelsById) {
  const fields = record.fields ?? record;
  const title = pick(fields, ["title", "case_title", "案例标题"]);
  const modelId = pick(fields, ["modelId", "model_id", "模型 ID"]);
  const model = existingModelsById.get(modelId) ?? {};
  const id = pick(fields, ["id", "case_id", "案例 ID"], slugify(`${modelId}-${title}`));
  const caseItem = {
    id,
    title,
    vendor: pick(fields, ["vendor", "厂商"], model.vendor ?? ""),
    vendorId: pick(fields, ["vendorId", "vendor_id", "厂商 ID"], model.vendorId ?? ""),
    modelId,
    modelName: pick(fields, ["modelName", "model_name", "模型名"], model.name ?? modelId),
    userOrOrg: pick(fields, ["userOrOrg", "user_or_org", "使用者", "组织"]),
    originalEvidenceUrl: pick(fields, ["originalEvidenceUrl", "original_evidence_url", "原始证据 URL"]),
    artifactUrl: pick(fields, ["artifactUrl", "artifact_url", "产物 URL"]),
    sourcePlatform: pick(fields, ["sourcePlatform", "source_platform", "来源平台"]),
    sourceType: pick(fields, ["sourceType", "source_type", "来源类型"], "real_case"),
    taskCategory: pick(fields, ["taskCategory", "task_category", "任务分类"]),
    taskDescription: pick(fields, ["taskDescription", "task_description", "任务描述"]),
    outputResult: pick(fields, ["outputResult", "output_result", "输出结果"]),
    modelContribution: pick(fields, ["modelContribution", "model_contribution", "模型贡献"]),
    evidenceGrade: pick(fields, ["evidence_grade", "evidenceGrade", "证据等级"], ""),
    showcaseEligible: parseBool(pick(fields, ["showcase_eligible", "showcaseEligible", "可精选"], false)),
    selectedForModelCard: parseBool(pick(fields, ["selected_for_model_card", "selectedForModelCard", "进入模型卡"], false)),
    riskNotes: pick(fields, ["riskNotes", "risk_notes", "风险备注"]),
    collectedAt: pick(fields, ["collectedAt", "collected_at", "采集时间"], new Date().toISOString().slice(0, 10)),
    reviewStatus: pick(fields, ["review_status", "reviewStatus", "审核状态"], "")
  };

  const gate = evidenceGate(caseItem);
  return { ...caseItem, ...gate };
}

function hydrateModelsWithCases(models, cases) {
  const counts = new Map();
  for (const item of cases) {
    if (item.evidenceGrade === "A" && item.showcaseEligible) {
      counts.set(item.modelId, (counts.get(item.modelId) ?? 0) + 1);
    }
  }
  return models.map((model) => {
    const aCaseCount = counts.get(model.id) ?? 0;
    const publishability = model.publishability === "Archive"
      ? "Archive"
      : model.publishability === "Hold" && aCaseCount < TARGET_A_CASES
        ? "Hold"
        : aCaseCount >= TARGET_A_CASES
          ? "Publishable"
          : "Hold";
    const riskNotes = [...(model.riskNotes ?? [])];
    riskNotes[0] = aCaseCount >= TARGET_A_CASES
      ? `已达到 ${TARGET_A_CASES} 条 A 类案例目标线；仍需保存原始证据、产物页截图和页面快照。`
      : aCaseCount >= MIN_A_CASES
        ? `已达到 ${MIN_A_CASES} 条 A 类案例公开达标线；继续补齐到 ${TARGET_A_CASES} 条。`
        : aCaseCount > 0
          ? `已有 ${aCaseCount} 条 A 类案例，但低于 ${MIN_A_CASES} 条公开达标线。`
          : `暂无自动 gate 通过的 A 类案例；目标是至少 ${MIN_A_CASES} 条，完整补齐为 ${TARGET_A_CASES} 条。`;
    return {
      ...model,
      publishability,
      aCaseCount,
      caseStatus: aCaseCount >= TARGET_A_CASES
        ? `已有 ${aCaseCount} 条自动 gate 通过的 A 类案例，达到完整补齐线`
        : aCaseCount >= MIN_A_CASES
          ? `已有 ${aCaseCount} 条自动 gate 通过的 A 类案例，达到公开达标线`
          : aCaseCount > 0
            ? `已有 ${aCaseCount} 条自动 gate 通过的 A 类案例，低于公开达标线`
            : "暂无自动 gate 通过的 A 类案例",
      riskNotes
    };
  });
}

function larkCliFetch(pathname, { method = "GET", body } = {}) {
  const profile = env.FEISHU_LARK_CLI_PROFILE || "model-card-legacy";
  const [apiPath, query = ""] = pathname.split("?");
  const args = ["--profile", profile, "api", method, apiPath, "--as", "user", "--format", "json"];
  if (query) {
    args.push("--params", JSON.stringify(Object.fromEntries(new URLSearchParams(query))));
  }
  if (body) args.push("--data", JSON.stringify(body));
  const result = spawnSync("lark-cli", args, { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`lark-cli user API failed (${result.status}): ${result.stderr || result.stdout}`);
  }
  const payload = JSON.parse(result.stdout);
  if (payload.code !== 0) {
    throw new Error(`Feishu user API error: ${JSON.stringify(payload)}`);
  }
  return payload;
}

async function feishuFetch(pathname, { method = "GET", token, body } = {}) {
  if (token === LARK_CLI_USER_TOKEN) {
    return larkCliFetch(pathname, { method, body });
  }

  const response = await fetch(`${FEISHU_BASE_URL}${pathname}`, {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const payload = await response.json();
  if (!response.ok || payload.code !== 0) {
    throw new Error(`Feishu API error ${response.status}: ${payload.code ?? ""} ${payload.msg ?? response.statusText}`);
  }
  return payload;
}

async function getTenantAccessToken() {
  if ((env.FEISHU_SYNC_AUTH_MODE || env.FEISHU_IMPORT_AUTH_MODE) === "lark-cli-user") {
    return LARK_CLI_USER_TOKEN;
  }

  const appId = env.FEISHU_APP_ID;
  const appSecret = env.FEISHU_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error("Missing FEISHU_APP_ID or FEISHU_APP_SECRET.");
  }
  const payload = await feishuFetch("/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    body: { app_id: appId, app_secret: appSecret }
  });
  return payload.tenant_access_token;
}

async function listBitableRecords({ token, appToken, tableId }) {
  const records = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams({ page_size: "500" });
    if (pageToken) params.set("page_token", pageToken);
    const payload = await feishuFetch(`/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records?${params}`, { token });
    records.push(...(payload.data?.items ?? []));
    pageToken = payload.data?.page_token ?? "";
  } while (pageToken);
  return records;
}

function updateVendorModelCounts(models) {
  const vendors = readJson("vendors.json");
  const modelCountByVendor = new Map();
  for (const model of models) {
    modelCountByVendor.set(model.vendorId, (modelCountByVendor.get(model.vendorId) ?? 0) + 1);
  }

  const nextVendors = vendors.map((vendor) => {
    const modelCount = modelCountByVendor.get(vendor.id) ?? 0;
    if (Number(vendor.modelCount ?? 0) === modelCount) return vendor;
    return { ...vendor, modelCount };
  });

  writeJson("vendors.json", nextVendors);
}

function updateMetrics() {
  const models = readJson("models.json");
  const cases = readJson("cases.json");
  const vendors = readJson("vendors.json");
  const metrics = readJson("metrics.json");
  const activeModels = models.filter((model) => !["Archive", "Hold"].includes(model.publishability));
  const publishableModels = models.filter((model) => model.publishability === "Publishable").length;
  const archiveModels = models.filter((model) => model.publishability === "Archive").length;
  const limitedModels = models.filter((model) => model.publishability === "Limited").length;
  const holdModels = models.filter((model) => model.publishability === "Hold").length;
  const modelsWithCases = models.filter((model) => Number(model.aCaseCount ?? 0) > 0).length;
  const activeModelsWithCases = activeModels.filter((model) => Number(model.aCaseCount ?? 0) > 0).length;
  const modelsMeetingMinCaseCoverage = models.filter((model) => Number(model.aCaseCount ?? 0) >= MIN_A_CASES).length;
  const modelsMeetingTargetCaseCoverage = models.filter((model) => Number(model.aCaseCount ?? 0) >= TARGET_A_CASES).length;
  const activeModelsMeetingMinCaseCoverage = activeModels.filter((model) => Number(model.aCaseCount ?? 0) >= MIN_A_CASES).length;
  const activeModelsMeetingTargetCaseCoverage = activeModels.filter((model) => Number(model.aCaseCount ?? 0) >= TARGET_A_CASES).length;
  const caseDeficitToMin = models.reduce((sum, model) => sum + Math.max(0, MIN_A_CASES - Number(model.aCaseCount ?? 0)), 0);
  const caseDeficitToTarget = models.reduce((sum, model) => sum + Math.max(0, TARGET_A_CASES - Number(model.aCaseCount ?? 0)), 0);
  const activeCaseDeficitToMin = activeModels.reduce((sum, model) => sum + Math.max(0, MIN_A_CASES - Number(model.aCaseCount ?? 0)), 0);
  const activeCaseDeficitToTarget = activeModels.reduce((sum, model) => sum + Math.max(0, TARGET_A_CASES - Number(model.aCaseCount ?? 0)), 0);
  writeJson("metrics.json", {
    ...metrics,
    vendors: vendors.length,
    models: models.length,
    activeModels: activeModels.length,
    publishableModels,
    limitedModels,
    archiveModels,
    holdModels,
    officialPatchModels: models.filter((model) => model.preserveOnFeishuSync === true || model.sourceKind === "official_patch").length,
    verifiedACases: cases.filter((item) => item.evidenceGrade === "A" && item.showcaseEligible).length,
    modelsWithCases,
    modelsWithoutCases: models.length - modelsWithCases,
    activeModelsWithCases,
    activeModelsWithoutCases: activeModels.length - activeModelsWithCases,
    minCasesPerModel: MIN_A_CASES,
    targetCasesPerModel: TARGET_A_CASES,
    modelsMeetingMinCaseCoverage,
    modelsMeetingTargetCaseCoverage,
    activeModelsMeetingMinCaseCoverage,
    activeModelsMeetingTargetCaseCoverage,
    caseDeficitToMin,
    caseDeficitToTarget,
    activeCaseDeficitToMin,
    activeCaseDeficitToTarget,
    datasetCut: new Date().toISOString().slice(0, 10),
    sourceNote: "Feishu Bitable sync + official patch preservation + automatic evidence gate; missing fields remain explicit."
  });
}

if (dryRun) {
  const models = readJson("models.json");
  const cases = readJson("cases.json");
  const hydrated = hydrateModelsWithCases(models, cases);
  const changed = hydrated.filter((model, index) => model.publishability !== models[index].publishability).length;
  console.log(JSON.stringify({ mode: "dry-run", models: models.length, cases: cases.length, publishabilityChangesIfHydrated: changed }, null, 2));
  process.exit(0);
}

const appToken = env.FEISHU_BITABLE_APP_TOKEN;
const modelTableId = env.FEISHU_MODELS_TABLE_ID;
const caseTableId = env.FEISHU_CASES_TABLE_ID;
if (!appToken || !modelTableId || !caseTableId) {
  throw new Error("Missing FEISHU_BITABLE_APP_TOKEN, FEISHU_MODELS_TABLE_ID or FEISHU_CASES_TABLE_ID.");
}

const existingModels = readJson("models.json");
const existingModelsById = new Map(existingModels.map((model) => [model.id, model]));
const token = await getTenantAccessToken();
const modelRecords = await listBitableRecords({ token, appToken, tableId: modelTableId });
const ignoredModelIds = new Set(
  splitList(env.MODEL_ATLAS_IGNORED_MODEL_IDS ?? "test123")
);
const mappedModels = modelRecords
  .map((record) => mapModelRecord(record, existingModelsById))
  .filter((model) => !ignoredModelIds.has(model.id));
const dedupedModels = mergeModelsById(mappedModels);
let models = dedupedModels.models;
const syncedModelIds = new Set(models.map((model) => model.id));
const preservedOfficialPatches = existingModels.filter((model) =>
  !syncedModelIds.has(model.id) &&
  (model.preserveOnFeishuSync === true || model.sourceKind === "official_patch")
);
if (preservedOfficialPatches.length > 0) {
  models.push(...preservedOfficialPatches);
}
let modelsById = new Map(models.map((model) => [model.id, model]));
const caseRecords = await listBitableRecords({ token, appToken, tableId: caseTableId });
const cases = caseRecords.map((record) => mapCaseRecord(record, modelsById));
models = hydrateModelsWithCases(models, cases);

writeJson("models.json", models);
writeJson("cases.json", cases);
updateVendorModelCounts(models);
updateMetrics();

const duplicateNotice = dedupedModels.duplicateIds.length > 0
  ? ` Suppressed duplicate IDs: ${dedupedModels.duplicateIds.join(", ")}.`
  : "";
const ignoredNotice = ignoredModelIds.size > 0
  ? ` Ignored test IDs: ${[...ignoredModelIds].join(", ")}.`
  : "";
console.log(
  `Synced ${models.length} unique model(s) from ${modelRecords.length} Feishu record(s) ` +
  `and ${cases.length} case candidate(s).${duplicateNotice}${ignoredNotice}`
);
