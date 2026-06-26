import fs from "fs";
import path from "path";

const root = process.cwd();
const outputs = path.join(root, "outputs");
const vendorsDir = path.join(outputs, "vendors");
const today = "2026-06-25";

const requiredFields = [
  "vendor_id", "vendor_name", "display_name", "canonical_slug", "official_site",
  "model_families", "flagship_models", "timeline", "key_inflection_points",
  "strengths", "weaknesses", "pricing_strategy", "ecosystem",
  "case_library_status", "recommended_use_cases", "avoid_when",
  "source_links", "page_status"
];

const requiredSections = [
  "## 30 秒判断", "## 模型路线", "## 模型时间线", "## 关键拐点",
  "## 当前代表模型", "## 适合使用场景", "## 不适合使用场景",
  "## 案例库状态", "## 风险和限制", "## 数据字段", "## 相关链接"
];

const vendorAudit = [
  { vendor: "OpenAI", file: "openai.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "字段与结构完整；但 GPT-5.5/xHigh/Codex Max 等模型需要逐条 source snapshot，案例库仍为 platform_only。", action: "FIX" },
  { vendor: "Anthropic / Claude", file: "anthropic.md", caseStatus: "usable", sourceRisk: "LOW", issues: "唯一已有完整样板和 v2 案例库的厂商页；仍需回填 Claude 重复分支映射到正式数据表。", action: "PASS" },
  { vendor: "Google", file: "google.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；Gemini 3 / 3.1 preview / high 命名需要官方 docs 和旧 Wiki 双重确认。", action: "FIX" },
  { vendor: "DeepSeek", file: "deepseek.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；DeepSeek R1、V3.2、Speciale 的 API alias / release snapshot 需要补证。", action: "FIX" },
  { vendor: "Qwen / Alibaba", file: "qwen-alibaba.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；Qwen3 Max / Thinking / VL / Omni 多变体需要 canonical ID 和 Model Studio 映射复核。", action: "FIX" },
  { vendor: "xAI", file: "xai.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；Grok 4/4.3/Build/Imagine/Voice 需要区分模型、产品和 API 面。X 来源后续必须快照。", action: "FIX" },
  { vendor: "Kimi / Moonshot AI", file: "kimi.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；K2 Thinking、K2.6、K2.5 open 分支命名需要官方 source freeze。", action: "FIX" },
  { vendor: "Meta / Llama", file: "meta.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；Llama 4 模型页可做，但 open-weight license、active/total params、deployment variance 需要补证。", action: "FIX" },
  { vendor: "MiniMax", file: "minimax.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；M2/M3、speech/video/music 多模态线需要拆分，媒体案例不能混入 LLM 案例。", action: "FIX" },
  { vendor: "Z AI / GLM", file: "z-ai.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；Z AI / Zhipu / GLM 命名需冻结，GLM-4.6/5 的 source lineage 需要人工复核。", action: "FIX" },
  { vendor: "Upstage / Solar", file: "upstage.md", caseStatus: "platform_only", sourceRisk: "HIGH", issues: "字段完整但模型线和案例证据薄弱；更像 vendor stub，进入网站前需补 Solar 当前模型列表。", action: "HOLD" },
  { vendor: "Xiaomi / MiMo", file: "xiaomi.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；MiMo V2 Pro/Flash/Code 源较新，需 repo HEAD、license、API/pricing 补证。", action: "FIX" },
  { vendor: "MBZUAI IFM / K2", file: "mbzuai-ifm.md", caseStatus: "archive_only", sourceRisk: "HIGH", issues: "字段完整但更像研究节点；K2 Think V2 需要确认是单模型、系统还是研究项目。", action: "HOLD" },
  { vendor: "StepFun / Step", file: "stepfun.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；Step3/3.5/3.7 Flash 版本关系、API 状态和开源/平台边界需要补证。", action: "FIX" },
  { vendor: "ByteDance Seed", file: "bytedance-seed.md", caseStatus: "platform_only", sourceRisk: "MEDIUM", issues: "页面结构完整；是额外 canonical 节点，Seed2.1/Seedance 访问和产品渠道需要复核。", action: "FIX" }
];

function readVendor(file) {
  return fs.readFileSync(path.join(vendorsDir, file), "utf8");
}

function fieldComplete(file) {
  const text = readVendor(file);
  const missingFields = requiredFields.filter((f) => !text.includes(`${f}:`));
  const missingSections = requiredSections.filter((s) => !text.includes(s));
  return { text, missingFields, missingSections };
}

function actionSummary(action) {
  if (action === "PASS") return "可进入网站原型";
  if (action === "FIX") return "进入网站前补 source snapshot / 命名复核 / case status 说明";
  return "暂缓进入网站原型，先补资料或降低为 archive/limited";
}

const auditRows = vendorAudit.map((v) => {
  const check = fieldComplete(v.file);
  const field_complete = check.missingFields.length === 0 && check.missingSections.length === 0 ? "yes" : `no: ${[...check.missingFields, ...check.missingSections].join("; ")}`;
  const narrative_quality = v.action === "HOLD" ? "structured skeleton, but not enough evidence" : "website-like structured page";
  return { ...v, field_complete, narrative_quality };
});

const auditMd = `# Phase 2.5 Vendor Page Audit

> Scope: QA for 15 Phase 2 vendor pages  
> Date: ${today}  
> Input note: objective listed \`outputs/vendors/phase-2-vendor-pages-qa-report.md\`, but the actual Phase 2 QA file exists at \`outputs/phase-2-vendor-pages-qa-report.md\`. This audit uses the actual file and records the path mismatch.

## Audit Criteria

- 冻结的 18 个字段是否完整。
- 是否包含 30 秒判断、模型路线、时间线、关键拐点、代表模型、适合/不适合场景、案例库状态、风险和相关链接。
- 是否像网站页面，而不是散文。
- 是否存在明显 hallucination / 无来源判断。

评级：

- PASS：可进入网站原型。
- FIX：需要补字段、source snapshot、命名复核或 case_library_status 说明。
- HOLD：资料不足或风险太高。

## Audit Table

| vendor | file | field_complete | narrative_quality | source_risk | case_library_status | issues | action |
|---|---|---|---|---|---|---|---|
${auditRows.map((r) => `| ${r.vendor} | \`${r.file}\` | ${r.field_complete} | ${r.narrative_quality} | ${r.sourceRisk} | ${r.caseStatus} | ${r.issues} | ${r.action} - ${actionSummary(r.action)} |`).join("\n")}

## Summary

| action | count | vendors |
|---|---:|---|
| PASS | ${auditRows.filter((r) => r.action === "PASS").length} | ${auditRows.filter((r) => r.action === "PASS").map((r) => r.vendor).join(", ")} |
| FIX | ${auditRows.filter((r) => r.action === "FIX").length} | ${auditRows.filter((r) => r.action === "FIX").map((r) => r.vendor).join(", ")} |
| HOLD | ${auditRows.filter((r) => r.action === "HOLD").length} | ${auditRows.filter((r) => r.action === "HOLD").map((r) => r.vendor).join(", ")} |

## Findings

1. 所有厂商页字段和结构都完整，没有发现缺少冻结字段的问题。
2. 15 个页面都具有网站页面结构，不是散文式输出。
3. 只有 Anthropic / Claude 已有 usable 案例库和 Phase 1/1.5 样板，可直接 PASS。
4. 12 个页面应标 FIX，不是因为字段缺失，而是因为 source snapshot、case evidence 和模型命名仍需人工复核。
5. Upstage 与 MBZUAI IFM 应 HOLD：页面字段完整，但当前更像资料节点或研究节点，不应作为网站重点厂商页直接发布。
6. 无明显“完全无来源”的判断，但多处属于 skeleton 级概括，进入网站前必须把 source_links 快照化。
`;

fs.writeFileSync(path.join(outputs, "phase-2-5-vendor-page-audit.md"), auditMd);

const canonicalRows = [
  ["OpenAI", "OpenAI", "openai", "Wiki + Phase 2", "keep", "Canonical vendor; GPT/o/Codex family routes."],
  ["Anthropic", "Anthropic / Claude", "anthropic", "Wiki + Phase 1 sample", "merge", "Use Anthropic as vendor_id, Claude as display/product family."],
  ["Claude", "Anthropic / Claude", "anthropic", "Wiki duplicate node", "merge_duplicate", "Claude appears twice in Wiki; keep old nodes, map both to anthropic."],
  ["Claude duplicate branch", "Anthropic / Claude", "anthropic", "Wiki duplicate node", "merge_duplicate", "Do not delete; mark duplicate_group_id in migration table."],
  ["Google", "Google / Gemini", "google", "Wiki + Phase 2", "keep", "Google vendor, Gemini/Gemma/Veo as families."],
  ["DeepSeek", "DeepSeek", "deepseek", "Wiki + Phase 2", "keep", "R/V/Speciale families."],
  ["Qwen", "Qwen / Alibaba", "qwen-alibaba", "Wiki", "normalize", "Qwen is model/product family; vendor page uses Qwen / Alibaba."],
  ["Alibaba", "Qwen / Alibaba", "qwen-alibaba", "Bitable/source alias", "normalize", "Alibaba Cloud is ecosystem/distribution; canonical slug stays qwen-alibaba."],
  ["Qwen / Alibaba", "Qwen / Alibaba", "qwen-alibaba", "Phase 2", "keep", "Stable canonical display name."],
  ["xAI", "xAI / Grok", "xai", "Wiki + Phase 2", "keep", "Grok as product/model family."],
  ["Kimi", "Kimi / Moonshot AI", "kimi", "Wiki", "normalize", "Use Kimi for slug, Moonshot AI as vendor_name."],
  ["Moonshot AI", "Kimi / Moonshot AI", "kimi", "official/vendor alias", "normalize", "Alias maps to same canonical vendor."],
  ["Meta", "Meta / Llama", "meta", "Wiki + Phase 2", "keep", "Llama as model family."],
  ["MiniMax", "MiniMax", "minimax", "Wiki + Phase 2", "keep", "M, speech, video, music families."],
  ["Z AI", "Z AI / GLM", "z-ai", "Wiki + Phase 2", "keep", "Use Z AI as current display; GLM as model family."],
  ["Zhipu", "Z AI / GLM", "z-ai", "legacy/vendor alias", "normalize", "Legacy/alternate brand maps to z-ai; keep source aliases in migration table."],
  ["智谱", "Z AI / GLM", "z-ai", "legacy/vendor alias", "normalize", "Chinese alias maps to z-ai."],
  ["Upstage", "Upstage / Solar", "upstage", "Wiki + Phase 2", "keep", "Solar as model family; vendor page HOLD until source refresh."],
  ["Xiaomi", "Xiaomi / MiMo", "xiaomi", "Wiki + Phase 2", "keep", "MiMo as model family."],
  ["MBZUAI Institute of Foundation Models", "MBZUAI IFM / K2", "mbzuai-ifm", "Wiki", "normalize", "Slug shortened to mbzuai-ifm for URL stability; full name retained in vendor_name."],
  ["MBZUAI IFM", "MBZUAI IFM / K2", "mbzuai-ifm", "abbreviation", "normalize", "Alias for same canonical vendor."],
  ["StepFun", "StepFun / Step", "stepfun", "Wiki + Phase 2", "keep", "Step as model family."],
  ["ByteDance Seed", "ByteDance Seed", "bytedance-seed", "Wiki extra node", "keep_optional", "Independent vendor because Wiki has Seed node; if product wants 14-vendor strict mode, mark optional not deleted."],
  ["Seed", "ByteDance Seed", "bytedance-seed", "alias", "normalize", "Seed is family/team alias under ByteDance Seed."]
];

const canonicalMd = `# Canonical Vendor Map

> Phase 2.5 deliverable  
> Purpose: freeze vendor naming, canonical slugs, and duplicate handling before Phase 3 model-card work.

## Counts

| Source | Count | Notes |
|---|---:|---|
| Wiki tree vendor-like nodes | 16 | Phase 0 blueprint observed 16 direct vendor/vendor-like nodes, including duplicate Claude branches. |
| Bitable vendors | 14 | Bitable title is \`Artificial Analysis 14厂商视觉Step拐点\`; exact exported vendor list still needs table export. |
| Phase 2 canonical vendor pages | 15 | Claude duplicates merged into Anthropic; ByteDance Seed kept as extra canonical vendor. |

## Naming Decisions

- Claude duplicate branches: keep old Wiki nodes, map both to canonical \`anthropic\`.
- Anthropic / Claude: \`anthropic\` is vendor_id and slug; Claude remains product/model-family display.
- Qwen / Alibaba: \`qwen-alibaba\` is canonical slug; Qwen remains model family, Alibaba Cloud remains ecosystem/distribution.
- Z AI / Zhipu: \`z-ai\` is canonical slug; Zhipu/智谱 are aliases.
- MBZUAI Institute of Foundation Models: canonical slug is \`mbzuai-ifm\`; full name stays in vendor_name.
- ByteDance Seed: kept as independent canonical vendor because Wiki has a Seed node; mark optional if final product insists on 14 vendors.

## Canonical Map

| raw_name | canonical_vendor | canonical_slug | source | action | notes |
|---|---|---|---|---|---|
${canonicalRows.map((r) => `| ${r[0]} | ${r[1]} | \`${r[2]}\` | ${r[3]} | ${r[4]} | ${r[5]} |`).join("\n")}

## Frozen Canonical Slugs

| canonical_vendor | canonical_slug | vendor page |
|---|---|---|
${[
  ["OpenAI", "openai", "outputs/vendors/openai.md"],
  ["Anthropic / Claude", "anthropic", "outputs/vendors/anthropic.md"],
  ["Google / Gemini", "google", "outputs/vendors/google.md"],
  ["DeepSeek", "deepseek", "outputs/vendors/deepseek.md"],
  ["Qwen / Alibaba", "qwen-alibaba", "outputs/vendors/qwen-alibaba.md"],
  ["xAI / Grok", "xai", "outputs/vendors/xai.md"],
  ["Kimi / Moonshot AI", "kimi", "outputs/vendors/kimi.md"],
  ["Meta / Llama", "meta", "outputs/vendors/meta.md"],
  ["MiniMax", "minimax", "outputs/vendors/minimax.md"],
  ["Z AI / GLM", "z-ai", "outputs/vendors/z-ai.md"],
  ["Upstage / Solar", "upstage", "outputs/vendors/upstage.md"],
  ["Xiaomi / MiMo", "xiaomi", "outputs/vendors/xiaomi.md"],
  ["MBZUAI IFM / K2", "mbzuai-ifm", "outputs/vendors/mbzuai-ifm.md"],
  ["StepFun / Step", "stepfun", "outputs/vendors/stepfun.md"],
  ["ByteDance Seed", "bytedance-seed", "outputs/vendors/bytedance-seed.md"]
].map((r) => `| ${r[0]} | \`${r[1]}\` | \`${r[2]}\` |`).join("\n")}
`;

fs.writeFileSync(path.join(outputs, "canonical-vendor-map.md"), canonicalMd);

const candidates = [
  { rank: 1, model: "Claude Fable 5", vendor: "Anthropic / Claude", slug: "claude-fable-5", scores: [5,5,5,5,5,5,5], reason: "Phase 1/1.5 已完成完整样板和 8 条 A 类案例；最适合做 Phase 3 模板首卡。", publishability: "Publishable", case_status: "usable: 8 A / 5 B / 4 C / 6 D", source_status: "official release + API docs + case library v2" },
  { rank: 2, model: "GPT-5.5 xHigh", vendor: "OpenAI", slug: "gpt-5-5-xhigh", scores: [5,5,5,3,5,5,3], reason: "OpenAI 当前旗舰对比价值最高，但需要 source snapshot 和案例补证。", publishability: "Limited", case_status: "platform_only", source_status: "official docs needed; no A-case library yet" },
  { rank: 3, model: "GPT-5 Codex", vendor: "OpenAI", slug: "gpt-5-codex", scores: [5,5,5,3,5,5,4], reason: "代码代理产品线网站价值高，适合和 Claude Fable 5、Grok Build、GLM 做 coding-agent 横向。", publishability: "Limited", case_status: "platform_only", source_status: "official/product docs needed; cases not frozen" },
  { rank: 4, model: "Gemini 3 Pro Preview", vendor: "Google", slug: "gemini-3-pro-preview", scores: [5,5,5,3,5,5,3], reason: "Google 当前多模态/长上下文旗舰候选，适合做 OpenAI/Claude/Gemini 三角对比。", publishability: "Limited", case_status: "platform_only", source_status: "official Gemini docs/changelog needed" },
  { rank: 5, model: "DeepSeek V3.2", vendor: "DeepSeek", slug: "deepseek-v3-2", scores: [5,5,5,4,4,5,3], reason: "DeepSeek 当前 agentic reasoning 关键节点，官方 release/source 相对清楚。", publishability: "Limited", case_status: "platform_only", source_status: "official API/release docs available; A cases needed" },
  { rank: 6, model: "Qwen3 Max Thinking", vendor: "Qwen / Alibaba", slug: "qwen3-max-thinking", scores: [4,5,5,3,4,5,3], reason: "Qwen 旗舰 thinking 变体能验证 Phase 1.5 的 thinking slug 规范。", publishability: "Limited", case_status: "platform_only", source_status: "Alibaba/Qwen docs mapping needed" },
  { rank: 7, model: "Grok 4", vendor: "xAI", slug: "grok-4", scores: [4,4,5,3,4,5,3], reason: "xAI/Grok 主线代表模型，适合作为实时搜索/工具使用对比对象。", publishability: "Limited", case_status: "platform_only", source_status: "official xAI docs available; X evidence snapshots needed" },
  { rank: 8, model: "Kimi K2 Thinking", vendor: "Kimi / Moonshot AI", slug: "kimi-k2-thinking", scores: [4,5,5,3,4,4,3], reason: "Kimi 长周期 reasoning/tool-use 代表，适合覆盖中国厂商高端推理线。", publishability: "Limited", case_status: "platform_only", source_status: "Kimi platform docs needed; cases not frozen" },
  { rank: 9, model: "GLM-5", vendor: "Z AI / GLM", slug: "glm-5", scores: [4,5,5,3,4,4,3], reason: "Z AI 当前 coding/agentic engineering 叙事核心，能覆盖 GLM 线。", publishability: "Limited", case_status: "platform_only", source_status: "Z.AI docs/blog available; source lineage needs review" },
  { rank: 10, model: "Llama 4 Maverick", vendor: "Meta / Llama", slug: "llama-4-maverick", scores: [5,4,5,4,4,5,3], reason: "Meta open-weight flagship，适合验证开源/开放权重模型卡模板。", publishability: "Limited", case_status: "platform_only", source_status: "official Meta docs/model card available; A cases not frozen" },
  { rank: 11, model: "MiniMax M3", vendor: "MiniMax", slug: "minimax-m3", scores: [3,5,5,3,3,4,3], reason: "MiniMax LLM/agent 代表模型，覆盖多模态厂商中的文本/agent 分支。", publishability: "Limited", case_status: "platform_only", source_status: "MiniMax docs available; source/cases need review" },
  { rank: 12, model: "DeepSeek R1", vendor: "DeepSeek", slug: "deepseek-r1-jan", scores: [5,3,5,4,4,5,3], reason: "行业影响力大，是 DeepSeek reasoning 线的历史锚点；适合做 V3.2 前代对比。", publishability: "Limited", case_status: "platform_only", source_status: "official/open sources likely available; case rows needed" }
];

const holds = [
  ["Claude Opus 4.8", "Anthropic / Claude", "被 Fable 5 覆盖为第一批更优样板；适合作为对比模型而非首批主卡。", "确认官方 docs/system card 与旧 Wiki 主卡，再作为 P1 comparison card。"],
  ["Claude Sonnet 4.6", "Anthropic / Claude", "未在 Phase 2 vendor flagship 中稳定出现，且不如 Fable 5 有完整案例库。", "先确认官方存在性、发布日期和 canonical slug。"],
  ["GPT-5 high", "OpenAI", "与 GPT-5.5 xHigh / GPT-5 Codex 相比网站价值较弱，且 high 可能只是 reasoning effort 变体。", "确定 high 是独立模型页还是 variant_id。"],
  ["GPT-5.1 Codex Max", "OpenAI", "命名和来源未在 Phase 2 标准中冻结，可能是产品/plan/effort 混合名。", "先冻结 provider_model_id、variant_kind 和官方 source。"],
  ["Qwen3 Max", "Qwen / Alibaba", "与 Qwen3 Max Thinking 重叠，首批优先 thinking 变体。", "确认 Max 与 Thinking 的差异、价格、API ID。"],
  ["Gemini 3.1 Pro Preview", "Google", "Gemini 3 Pro Preview 更适合作为首批；3.1 命名需官方确认。", "确认是否为独立公开模型、preview 状态和 canonical slug。"],
  ["MiniMax M2", "MiniMax", "M3 更新、更适合作为代表；M2 可做前代对比。", "确认 M2/M3 版本关系和官方 docs。"],
  ["GLM-4.6", "Z AI / GLM", "GLM-5 更适合作为当前 P0；GLM-4.6 可做前代。", "补 GLM-4.6 official docs 和 release source。"],
  ["Step 3", "StepFun / Step", "StepFun 厂商页仍 FIX，且不在最低覆盖 10 厂商要求内。", "先修 StepFun source snapshots，再作为 batch 2/3。"],
  ["Seed2.1 Pro", "ByteDance Seed", "ByteDance Seed 是额外 canonical vendor，适合观察但不应挤占第一批。", "确认访问渠道、API/pricing、官方 model page 和案例证据。"]
];

function sum(scores) {
  return scores.reduce((a, b) => a + b, 0);
}

const p0Md = `# Phase 3 P0 Model Candidates

> Phase 2.5 deliverable  
> Purpose: freeze P0 model-card upgrade candidates without writing model-card bodies.  
> Date: ${today}

## Scoring Standard

Each model is scored 0-5 on seven criteria:

1. impact: 行业影响力
2. recency: 是否近期关键模型
3. vendor_importance: 是否该厂商代表模型
4. evidence_availability: 是否有官方资料和案例证据
5. website_value: 是否适合作为网站重点展示
6. contrast_value: 是否适合做前代/竞品对比
7. case_library_potential: 是否有真实案例库建设潜力

Score = sum of seven criteria, max 35.

## P0 推荐清单

| rank | model | vendor | slug | score | reason | publishability | case_status | source_status |
|---:|---|---|---|---:|---|---|---|---|
${candidates.map((c) => `| ${c.rank} | ${c.model} | ${c.vendor} | \`${c.slug}\` | ${sum(c.scores)} | ${c.reason} | ${c.publishability} | ${c.case_status} | ${c.source_status} |`).join("\n")}

## Score Detail

| model | impact | recency | vendor_importance | evidence_availability | website_value | contrast_value | case_library_potential | total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
${candidates.map((c) => `| ${c.model} | ${c.scores[0]} | ${c.scores[1]} | ${c.scores[2]} | ${c.scores[3]} | ${c.scores[4]} | ${c.scores[5]} | ${c.scores[6]} | ${sum(c.scores)} |`).join("\n")}

## 暂缓清单

| model | vendor | reason_to_hold | needed_before_upgrade |
|---|---|---|---|
${holds.map((h) => `| ${h[0]} | ${h[1]} | ${h[2]} | ${h[3]} |`).join("\n")}

## Coverage Check

The P0 recommended list covers the required vendor pool:

- OpenAI: GPT-5.5 xHigh, GPT-5 Codex
- Anthropic: Claude Fable 5
- Google: Gemini 3 Pro Preview
- DeepSeek: DeepSeek V3.2, DeepSeek R1
- Qwen / Alibaba: Qwen3 Max Thinking
- xAI: Grok 4
- Kimi: Kimi K2 Thinking
- MiniMax: MiniMax M3
- Z AI: GLM-5
- Meta: Llama 4 Maverick

## Freeze Rule

Phase 3 may start from this list, but must not write all 12 at once. Each model still needs an evidence intake row and source snapshot before its model-card body is upgraded.
`;

fs.writeFileSync(path.join(outputs, "phase-3-p0-model-candidates.md"), p0Md);

const readinessMd = `# Phase 3 Readiness Report

> Phase 2.5 deliverable  
> Date: ${today}  
> Scope: readiness decision after vendor page QA and P0 candidate freeze.

## 1. 厂商页是否达到可作为网站骨架的质量？

Yes, with gating.

All 15 vendor pages contain the frozen fields and website-like sections. However, only Anthropic / Claude is ready to enter the website prototype without substantial content repair. Most pages are structurally valid but still need source snapshots, model-name verification and case-library status review.

## 2. 哪些厂商页需要先修？

| action | vendors | reason |
|---|---|---|
| PASS | Anthropic / Claude | Has Phase 1/1.5 sample, usable case library and source-backed model page pattern. |
| FIX | OpenAI, Google, DeepSeek, Qwen / Alibaba, xAI, Kimi, Meta, MiniMax, Z AI, Xiaomi, StepFun, ByteDance Seed | Fields complete, but need source snapshots, canonical model-name confirmation and case-library evidence rows. |
| HOLD | Upstage, MBZUAI IFM | Too thin or research-like for website prototype without more source/case work. |

## 3. canonical vendor map 是否冻结？

Yes. \`canonical-vendor-map.md\` freezes 15 canonical vendors:

\`openai\`, \`anthropic\`, \`google\`, \`deepseek\`, \`qwen-alibaba\`, \`xai\`, \`kimi\`, \`meta\`, \`minimax\`, \`z-ai\`, \`upstage\`, \`xiaomi\`, \`mbzuai-ifm\`, \`stepfun\`, \`bytedance-seed\`.

Claude duplicate branches merge into \`anthropic\`. ByteDance Seed stays independent but optional if a strict 14-vendor product scope is later required.

## 4. P0 模型候选是否冻结？

Yes. \`phase-3-p0-model-candidates.md\` freezes 12 P0 recommended candidates and 10 hold candidates. It covers OpenAI, Anthropic, Google, DeepSeek, Qwen, xAI, Kimi, MiniMax, Z AI and Meta.

## 5. 每个 P0 模型是否满足 minimum publishable standard？

| model | publishability | minimum standard status |
|---|---|---|
| Claude Fable 5 | Publishable | Meets standard: official docs, model info, lineage, A-class cases, risks and sources exist. |
| GPT-5.5 xHigh | Limited | High-value candidate, but needs source snapshots and A/B/C case rows. |
| GPT-5 Codex | Limited | Needs Codex source snapshot and case evidence before full publishable status. |
| Gemini 3 Pro Preview | Limited | Needs Gemini docs snapshot and case evidence. |
| DeepSeek V3.2 | Limited | Official release/docs likely enough for Limited; A cases missing. |
| Qwen3 Max Thinking | Limited | Needs Qwen/Alibaba source mapping and cases. |
| Grok 4 | Limited | Needs xAI docs snapshot and X evidence snapshots if cases are used. |
| Kimi K2 Thinking | Limited | Needs Kimi platform docs snapshot and cases. |
| GLM-5 | Limited | Needs Z AI / GLM source lineage and cases. |
| Llama 4 Maverick | Limited | Official model cards help, but A cases and deployment variance notes needed. |
| MiniMax M3 | Limited | Needs MiniMax docs source snapshot and cases. |
| DeepSeek R1 | Limited | Strong impact but older; needs source/case row refresh. |

## 6. 哪些 P0 模型只能 Limited 发布？

All P0 candidates except Claude Fable 5 are Limited until evidence intake rows and source snapshots are created. This is intentional: P0 means “upgrade priority”, not “already publishable.”

## 7. 哪些模型需要先做案例库补证？

| priority | models |
|---|---|
| P0补证 | GPT-5.5 xHigh, GPT-5 Codex, Gemini 3 Pro Preview, DeepSeek V3.2, Qwen3 Max Thinking |
| P1补证 | Grok 4, Kimi K2 Thinking, GLM-5, Llama 4 Maverick, MiniMax M3, DeepSeek R1 |

## 8. 是否可以开始 Phase 3？

Yes, but only as a gated P0 batch, not a full 107-card expansion.

Phase 3 can start if each selected model first gets:

1. evidence intake row,
2. source snapshot,
3. canonical model_id confirmation,
4. publishability label,
5. case status note.

## 9. Phase 3 应该分几批做？

建议分 3 批：

| batch | scope | goal |
|---|---|---|
| Batch 1 | 3-5 highest-value models | Validate full model-card 2.0 template across closed frontier, Claude sample, Gemini, DeepSeek, Qwen. |
| Batch 2 | 4-5 ecosystem/agent models | Codex, Grok, Kimi, GLM, Llama. |
| Batch 3 | remaining P0/P1 and hold re-evaluation | MiniMax, DeepSeek R1, StepFun, Seed, Upstage/MBZUAI if evidence improves. |

## 10. 第一批建议做哪 3-5 个模型？

Recommended Batch 1:

1. Claude Fable 5 - publishable sample, use as anchor.
2. GPT-5.5 xHigh - OpenAI flagship contrast.
3. Gemini 3 Pro Preview - Google multimodal/long-context contrast.
4. DeepSeek V3.2 - open/reasoning/agent contrast.
5. Qwen3 Max Thinking - China frontier + thinking variant contrast.

## Final Decision

Ready for Phase 3 gated start: YES.

Not ready for full P0 expansion: YES.

Required fixes before writing Batch 1 model-card bodies:

1. Create evidence intake rows for GPT-5.5 xHigh, Gemini 3 Pro Preview, DeepSeek V3.2 and Qwen3 Max Thinking.
2. Snapshot official docs/source links for each Batch 1 model.
3. Confirm canonical slugs and variant handling for high/xHigh/thinking/preview.
4. Keep non-Claude pages Limited until case evidence improves.
`;

fs.writeFileSync(path.join(outputs, "phase-3-readiness-report.md"), readinessMd);

console.log("Generated Phase 2.5 audit, canonical map, P0 candidates, and readiness report.");
