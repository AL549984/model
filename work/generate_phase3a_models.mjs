import fs from "fs";
import path from "path";

const outDir = path.resolve("outputs/models");
fs.mkdirSync(outDir, { recursive: true });

const today = "2026-06-25";

const cards = [
  {
    file: "claude-fable-5.md",
    model: "Claude Fable 5",
    title: "Claude Fable 5：Mythos 级长周期 Agentic Work 的公开样板",
    publishability: "Publishable",
    vendor: "Anthropic / Claude",
    release: "2026-06-09",
    modelId: "claude-fable-5",
    context: "1M tokens",
    output: "128K tokens",
    modality: "text/image input, text output",
    reasoning: "是，adaptive thinking always on；不能关闭 thinking",
    pricing: "$10 / 1M input tokens, $50 / 1M output tokens",
    platforms: "Claude API, Claude Platform on AWS, Amazon Bedrock, Google Vertex AI, Microsoft Foundry；部分平台可用性需复核",
    official: "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5",
    conclusion: "Claude Fable 5 是当前项目中证据最完整的 Model Atlas 2.0 样板：官方发布、API 信息、谱系位置、风险限制和 8 条 A 类公开案例都已经成型。它适合做 Phase 3A 的 anchor card。",
    lineage: "Fable 5 位于 Claude Opus 4.x 之后，是 Anthropic 将 Mythos-class 能力做成广泛发布版本的关键节点。它与 Claude Mythos 5 能力同源，但 Fable 5 带有安全分类器、拒答、fallback、30 天数据保留和非 ZDR 限制。",
    capabilities: [
      "长周期 agentic coding：公开案例显示它能维持多模块工程上下文，而不只是生成单文件 demo。",
      "复杂知识工作：官方早期反馈和 docs 将其定位到 demanding reasoning、research synthesis、document-heavy workflows。",
      "工具和工程验证：适合需要规划、代码实现、调试、运行检查和文档产出的任务链。",
      "多模态输入：支持图像/PDF/表格/图表理解，但输出仍是文本。"
    ],
    evals: "官方 benchmark 能说明它在 coding、knowledge work、research 和 agentic tasks 上的定位，但模型卡不能只堆分数。Phase 3A 解读重点是：Fable 5 的边界推进在于更长任务链、更强工具协作和更稳定工程上下文，而不是单项分数。",
    cases: [
      "A：LAAS WebGPU Open World，Braffolk，repo + live demo，展示长周期 WebGPU/Three.js 工程。",
      "A：World of ClaudeCraft，next-choken / levy-street，Reddit + repo + site，展示 browser MMORPG 多系统工程。",
      "A：Midwinter DOS reverse engineering，Reddit + video + project site，展示逆向工程和证据 ledger。",
      "A：ComfyUI KJNodes PR，GitHub PR，展示开源代码贡献与人类测试协作。"
    ],
    good: ["长周期代码代理任务", "复杂文档/代码库分析", "高价值原型和研究工作流", "需要上下文保持和工具协作的任务"],
    bad: ["低成本批量生成", "严格 zero data retention 场景", "不能接受拒答/fallback 的自动化链路", "需要确定地域/平台可用性的生产部署但尚未复核"],
    compare: "相对 Claude Opus 4.x，Fable 5 的核心变化是公开 Mythos-class 能力和更长周期 agentic work 定位；相对 GPT-5.5 xHigh / Gemini 3.x / DeepSeek V3.2，它的优势是当前已有更强公开案例库，但成本、保留和 safety/fallback 风险更明显。",
    risks: ["30 天数据保留，非 ZDR。", "高风险请求可能拒答或 fallback。", "价格高，不适合低价值高频调用。", "公开 A 类案例仍偏开发者 demo，企业生产级案例需要继续补证。"],
    advice: "开发者和研究团队可以把 Fable 5 当作长周期 agentic work 的高端候选；企业生产前必须先验证数据保留、fallback、平台可用性和成本。",
    sources: [
      "Anthropic release: https://www.anthropic.com/news/claude-fable-5-mythos-5",
      "Claude API docs: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5",
      "Case library v2: ../claude-fable-5-case-library-v2.md",
      "Phase 1 model card: ../claude-fable-5-model-card-2.0.md"
    ],
    qa: { caseA: 8, caseB: 5, sourceRisk: "LOW", oldReuse: "structured reuse from Phase 1 sample, not copy-paste", action: "PASS" }
  },
  {
    file: "gpt-5-5-xhigh.md",
    model: "GPT-5.5 xHigh",
    title: "GPT-5.5 xHigh：OpenAI 最高推理强度下的专业工作模型，而不是独立新模型",
    publishability: "Limited",
    vendor: "OpenAI",
    release: "2026-04 左右发布 GPT-5.5；xHigh 是 reasoning.effort 设置，不是单独发布模型",
    modelId: "gpt-5.5 + reasoning.effort=xhigh",
    context: "1M tokens",
    output: "128K tokens",
    modality: "text/image input, text output",
    reasoning: "是；GPT-5.5 支持 none/low/medium/high/xhigh reasoning.effort",
    pricing: "GPT-5.5 base API price: $5 / 1M input tokens, $30 / 1M output tokens；xHigh 会增加延迟和推理成本，应通过 eval 证明收益",
    platforms: "OpenAI API, Codex, ChatGPT；具体产品可用性和 xHigh 映射需按官方 docs/产品面复核",
    official: "https://developers.openai.com/api/docs/models/gpt-5.5",
    conclusion: "GPT-5.5 xHigh 值得进入 Phase 3A，因为它是 OpenAI 当前专业工作和 coding/reasoning 的高端对照点。但它应写成 GPT-5.5 的 xHigh 推理强度配置，而不是伪造一个独立模型。",
    lineage: "GPT-5.5 位于 GPT-5.4 之后，是 OpenAI 面向复杂专业工作、coding、research、data analysis 的当前 frontier family。xHigh 是 reasoning effort 轴，Phase 1.5 规范中应作为 variant_id 或配置记录。",
    capabilities: [
      "复杂专业工作：官方介绍强调 coding、research、data analysis、document-heavy tasks。",
      "长上下文和大输出：官方模型页列出 1M context 和 128K max output。",
      "更强推理配置：xHigh 适合在 eval 显示收益时用于更难任务。",
      "工具/agent 工作流：官方 reasoning docs 将 GPT-5.5 定位到 multi-step agentic workflows 和 Codex CLI。"
    ],
    evals: "官方发布文给出 GDPval、OSWorld-Verified、Tau2-bench Telecom、Terminal-Bench 等分数；模型卡应把这些读成 professional work 和 computer-use/agentic workflow 的信号，而不是直接等同真实用户案例。",
    cases: [
      "当前没有结构化 A 类案例库。",
      "官方发布文包含客户评价和内部案例，如 K-1 税表流程、comms 自动化、研究数据分析，但这些还没有拆成 evidence intake rows。",
      "因此本卡只能 Limited 发布，并在页面顶部提示公开可核验案例不足。"
    ],
    good: ["复杂 coding/research/data workflows", "需要高推理强度的 agentic task", "长上下文专业材料处理", "作为 OpenAI vs Claude/Gemini/DeepSeek 的对比锚点"],
    bad: ["低延迟/低成本任务", "没有 eval 证明 xHigh 收益的场景", "把 xHigh 当独立模型 ID 的数据结构", "需要 A 类公开案例支撑但尚未补证的传播页"],
    compare: "相对 GPT-5.4，GPT-5.5 官方称更强、更持久、更适合复杂专业工作；相对 Claude Fable 5，OpenAI 有更强官方企业叙事，但当前本项目还缺 A 类案例库；相对 Gemini 3 Pro Preview，GPT-5.5 仍是活跃 API 模型，而 Gemini 3 Pro Preview 已停用。",
    risks: ["xHigh 不是单独模型，数据表要避免误建 model_id。", "官方客户评价不是 A 类案例。", "xHigh 增加延迟/成本，不能默认推荐。", "公开案例库未补，Limited 发布。"],
    advice: "把 GPT-5.5 xHigh 用作 OpenAI 高端专业工作对照模型；模型卡正文可以先 Limited 发布，但进入网站重点位前必须补 evidence rows 和案例快照。",
    sources: [
      "OpenAI model docs: https://developers.openai.com/api/docs/models/gpt-5.5",
      "OpenAI latest model guide: https://developers.openai.com/api/docs/guides/latest-model",
      "OpenAI GPT-5.5 release: https://openai.com/index/introducing-gpt-5-5/",
      "Reasoning models docs: https://developers.openai.com/api/docs/guides/reasoning"
    ],
    qa: { caseA: 0, caseB: 0, sourceRisk: "MEDIUM", oldReuse: "new card from official docs; no old card body reused", action: "LIMITED" }
  },
  {
    file: "deepseek-v3-2.md",
    model: "DeepSeek V3.2",
    title: "DeepSeek V3.2：把 thinking 和 tool-use 合到一起的开放 reasoning-agent 节点",
    publishability: "Limited",
    vendor: "DeepSeek",
    release: "2025-12-01",
    modelId: "DeepSeek-V3.2；API alias / provider model ID 待按 DeepSeek /models 与 pricing docs 核验",
    context: "官方发布文强调长上下文效率；具体 context window 待从模型卡或 /models 响应核验",
    output: "官方未披露 / 待核验",
    modality: "text；其他模态官方未披露 / 待核验",
    reasoning: "是；官方称 V3.2 将 thinking 直接集成到 tool-use，并支持 thinking 与 non-thinking 模式下的 tool-use",
    pricing: "DeepSeek pricing docs 按模型/模式计价；V3.2 当前价格需从 pricing page 快照确认",
    platforms: "DeepSeek App/Web/API, Hugging Face, 第三方云/模型平台；具体生产入口需核验",
    official: "https://api-docs.deepseek.com/news/news251201",
    conclusion: "DeepSeek V3.2 是 Phase 3A 里最适合代表开放 reasoning-agent 路线的模型：官方 release 明确强调 thinking-in-tool-use、agent training data synthesis 和 efficiency。但本项目还没有 A 类案例库，所以只能 Limited。",
    lineage: "V3.2 位于 DeepSeek V3.1 / V3.2-Exp 之后，是 V 系列向 reasoning + agent tool-use 合流的关键节点。Speciale 是 deep reasoning 变体，不应混进 V3.2 基础卡。",
    capabilities: [
      "thinking in tool-use：官方 release 称它是 DeepSeek 首个把 thinking 直接集成到 tool-use 的模型。",
      "agent 数据合成：官方称训练数据覆盖 1,800+ environments 和 85k+ complex instructions。",
      "效率路线：V3.2 继承/发展 DeepSeek Sparse Attention 方向，强调长上下文计算效率。",
      "开放生态：Hugging Face / 论文 / API 文档都能作为后续模型卡补证入口。"
    ],
    evals: "DeepSeek 官方和 Hugging Face 页面给出大量 benchmark/competition 信号，但 Phase 3A 不把它们包装成案例。评测应作为能力边界背景，真实案例要到 Phase 3B 单独补证。",
    cases: [
      "No verified public A cases found in current project outputs.",
      "Reddit、第三方模型平台、教程和部署 recipes 只能作为 B/C 线索。",
      "Phase 3B 需要优先追 open-source repo/demo/production integration 的原始证据。"
    ],
    good: ["开放 reasoning model 对比", "tool-use / agentic workflows", "DeepSeek 生态迁移", "成本敏感的 reasoning/coding 实验"],
    bad: ["必须立即有企业生产 A 类案例的传播页", "无法承受 API alias 不稳定的系统", "把 Speciale 与 base V3.2 混为一谈", "未复核价格/context 的生产部署"],
    compare: "相对 DeepSeek R1，V3.2 的重点不是单纯 thinking，而是 thinking + tool-use + agent training。相对 GPT-5.5/Claude Fable 5，它的优势是开放生态和成本/效率叙事，短板是案例库和企业生产证据未补。",
    risks: ["API alias 与 canonical model ID 需核验。", "V3.2 与 V3.2-Speciale 必须分卡或分变体。", "benchmark 不能当案例。", "价格/context 需快照。"],
    advice: "把 DeepSeek V3.2 作为开放 reasoning-agent 路线的第一批 Limited 卡；先讲清技术拐点，再在 Phase 3B 补 A 类案例。",
    sources: [
      "DeepSeek V3.2 release: https://api-docs.deepseek.com/news/news251201",
      "DeepSeek API docs: https://api-docs.deepseek.com/",
      "DeepSeek pricing: https://api-docs.deepseek.com/quick_start/pricing",
      "DeepSeek V3.2 Hugging Face: https://huggingface.co/deepseek-ai/DeepSeek-V3.2"
    ],
    qa: { caseA: 0, caseB: 0, sourceRisk: "MEDIUM", oldReuse: "new card from official release/docs; no old card body reused", action: "LIMITED" }
  },
  {
    file: "qwen3-max-thinking.md",
    model: "Qwen3 Max Thinking",
    title: "Qwen3 Max Thinking：Qwen3 旗舰 reasoning 变体，先 Limited 再补证",
    publishability: "Limited",
    vendor: "Qwen / Alibaba",
    release: "2026-01 左右公开资料出现；准确发布日期需以 Qwen / Alibaba 官方页快照为准",
    modelId: "qwen3-max-thinking；Alibaba Cloud Model Studio API ID 待核验",
    context: "官方未披露 / 待核验；Qwen3 系列和 Model Studio 支持 thinking budget 与长上下文能力，但本模型具体 context 需源确认",
    output: "官方未披露 / 待核验",
    modality: "text reasoning；是否支持多模态需以具体 Model Studio 条目为准",
    reasoning: "是；Qwen3 Max Thinking 是 flagship reasoning model，Qwen docs 也说明 Qwen3 支持 thinking budget / thinking modes",
    pricing: "待 Model Studio 价格页核验",
    platforms: "Qwen / Alibaba Cloud Model Studio；其他第三方平台不作为 canonical source",
    official: "https://qwen.ai/blog?id=qwen3-max-thinking",
    conclusion: "Qwen3 Max Thinking 是 Qwen / Alibaba 在 Phase 3A 里最适合代表 thinking/reasoning 路线的候选。但官方资料与 Model Studio API ID、价格、context 还需要快照，所以只能 Limited。",
    lineage: "它位于 Qwen3 Max 之上或旁支，是 Max 系列的 thinking/test-time scaling 变体。按照 Phase 1.5 命名规范，slug 固定为 qwen3-max-thinking，不能和 qwen3-max 合并。",
    capabilities: [
      "旗舰 reasoning：Qwen 官方博客称其为 latest flagship reasoning model。",
      "adaptive tool use / test-time scaling：官方和 Alibaba Cloud 资料强调高级推理、工具使用和 test-time compute。",
      "thinking budget 生态：Qwen docs 显示 Qwen3 支持 thinking budget，尤其 Model Studio API 有相关能力。",
      "对比价值：适合作为 Claude/OpenAI/Gemini/DeepSeek 之外的中国厂商 frontier thinking 对照。"
    ],
    evals: "官方博客和社区文章会强调强 benchmark，但 Phase 3A 不能把 benchmark 当真实案例。模型卡应解释它在 reasoning/tool-use 方向的意义，同时明确缺少公开 A 类案例库。",
    cases: [
      "No verified public A cases found in current project outputs.",
      "Qwen 官方博客、Alibaba Cloud Community、YouTube 初测和 Reddit 讨论都属于 C/B 线索，不进精选。",
      "Phase 3B 需要追到具体 repo/demo/product artifact 后才能升级案例状态。"
    ],
    good: ["复杂推理任务", "tool-use / agentic workflow 测试", "Qwen 生态模型对比", "中英文 reasoning 能力评估"],
    bad: ["需要明确 API ID/价格/context 的生产部署但尚未核验", "需要 A 类公开案例支撑的传播精选", "把 Qwen3 Max 和 Max Thinking 混成同一模型", "把 benchmark/介绍文当案例"],
    compare: "相对 Qwen3 Max，它强调 thinking/test-time scaling；相对 DeepSeek V3.2，它更像 closed flagship reasoning 变体；相对 GPT-5.5 xHigh，它同样需要区分 base model 与 thinking/effort 轴。",
    risks: ["准确发布日期、API ID、context、价格仍需官方快照。", "当前 case_status 是 platform_only。", "社区 benchmark 和介绍文不能当 A 类案例。", "第三方平台命名不可作为 canonical source。"],
    advice: "适合作为 Qwen 线第一张 Limited 模型卡；先冻结 slug 和谱系，Phase 3B 再补案例证据。",
    sources: [
      "Qwen official blog: https://qwen.ai/blog?id=qwen3-max-thinking",
      "Qwen3 Max blog: https://qwen.ai/blog?id=qwen3-max",
      "Qwen docs quickstart: https://qwen.readthedocs.io/en/latest/getting_started/quickstart.html",
      "Alibaba Cloud Model Studio model list: https://www.alibabacloud.com/help/en/model-studio/models"
    ],
    qa: { caseA: 0, caseB: 0, sourceRisk: "MEDIUM-HIGH", oldReuse: "new card from official/blog docs; no old card body reused", action: "LIMITED" }
  },
  {
    file: "gemini-3-pro-preview.md",
    model: "Gemini 3 Pro Preview",
    title: "Gemini 3 Pro Preview：已经停用的 Gemini 3 预览锚点，不应作为新发布模型页",
    publishability: "Hold",
    vendor: "Google / Gemini",
    release: "Preview；Google 官方迁移公告显示 2026-03-09 停用",
    modelId: "gemini-3-pro-preview",
    context: "已停用；历史规格不再作为生产建议",
    output: "已停用；历史规格不再作为生产建议",
    modality: "multimodal preview；当前应迁移到 Gemini 3.1 Pro Preview",
    reasoning: "是，Gemini 3 系列属于 thinking/reasoning 方向；但此 preview 已退役",
    pricing: "不适用；已停用",
    platforms: "Gemini API / AI Studio 历史 preview；已于 2026-03-09 迁移/停用",
    official: "https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-preview",
    conclusion: "这张卡的价值是纠偏：Phase 2.5 把 Gemini 3 Pro Preview 列为 P0，但官方文档显示它已经 shut down，并要求迁移到 Gemini 3.1 Pro Preview。因此 Phase 3A 不应把它作为可发布模型页，只能 HOLD 或作为 Archive / migration note。",
    lineage: "Gemini 3 Pro Preview 是 Gemini 3 系列的历史预览节点，后续由 Gemini 3.1 Pro Preview 取代。正式 Phase 3 应把 Gemini 3.1 Pro Preview 作为 Google P0，而不是继续写已停用 preview。",
    capabilities: [
      "历史定位：state-of-the-art reasoning model with advanced multimodal understanding。",
      "迁移价值：它能说明 Google preview 生命周期和版本迁移策略。",
      "对比价值：可作为 Gemini 3.1 Pro Preview 的前代，不适合作为当前代表模型。"
    ],
    evals: "历史 benchmark 不应作为当前模型推荐依据。官方 lifecycle 和 shutdown 信息比旧评测更重要。",
    cases: [
      "No verified public A cases should be collected for active website model page.",
      "任何历史案例都应转到 Archive 或 migration notes，除非明确需要解释 Gemini 3 -> 3.1 的迁移。"
    ],
    good: ["Archive", "Gemini 生命周期说明", "解释为什么 P0 应改为 Gemini 3.1 Pro Preview"],
    bad: ["当前生产部署", "网站重点模型页", "新案例库建设", "与活跃模型同台推荐"],
    compare: "Gemini 3.1 Pro Preview 是它的后继。相对 GPT-5.5 / Claude Fable 5 / DeepSeek V3.2，这个模型现在不应进入活跃 P0 卡。",
    risks: ["如果继续写成活跃模型，会误导读者。", "所有使用建议都应转向 Gemini 3.1 Pro Preview。", "旧 Wiki/Phase 2.5 候选需要修正。"],
    advice: "不要发布为活跃模型卡；将其标 HOLD，并在 Phase 3A QA 中建议替换为 Gemini 3.1 Pro Preview。",
    sources: [
      "Gemini 3 Pro Preview model page: https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-preview",
      "Migration discussion: https://discuss.ai.google.dev/t/migrate-from-gemini-3-pro-preview-to-gemini-3-1-pro-preview-before-march-9-2026/127062",
      "Gemini 3.1 Pro Preview model page: https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview",
      "Gemini API models list: https://ai.google.dev/gemini-api/docs/models"
    ],
    qa: { caseA: 0, caseB: 0, sourceRisk: "HIGH", oldReuse: "new card from official lifecycle info; no old card body reused", action: "HOLD" }
  }
];

function list(items) {
  return items.map((x) => `- ${x}`).join("\n");
}

function renderCard(c) {
  return `# ${c.title}

> Phase 3A model card  
> publishability: \`${c.publishability}\`  
> generated_at: ${today}

## 30 秒结论

${c.conclusion}

## 基本信息

- 厂商：${c.vendor}
- 发布时间：${c.release}
- 模型 ID：${c.modelId}
- 上下文：${c.context}
- 输出：${c.output}
- 模态：${c.modality}
- 是否推理模型：${c.reasoning}
- 价格：${c.pricing}
- 可用平台：${c.platforms}
- 官方链接：${c.official}

## 它在厂商模型谱系中的位置

${c.lineage}

## 关键能力判断

${list(c.capabilities)}

## 官方评测怎么读

${c.evals}

## 真实案例精选

${list(c.cases)}

## 适合场景

${list(c.good)}

## 不适合场景

${list(c.bad)}

## 和前代 / 竞品对比

${c.compare}

## 风险和限制

${list(c.risks)}

## 一句话使用建议

${c.advice}

## 来源和证据

${list(c.sources)}
`;
}

for (const card of cards) {
  fs.writeFileSync(path.join(outDir, card.file), renderCard(card));
}

const qaRows = cards.map((c) => {
  const evidenceStatus = c.qa.caseA > 0 ? "A/B/C evidence available" : c.publishability === "Hold" ? "lifecycle risk; no active-case work" : "official sources only; case library missing";
  const quality = c.qa.action === "PASS" ? "website-ready" : c.qa.action === "HOLD" ? "archive/migration note only" : "usable with Limited label";
  return `| ${c.model} | ${c.publishability} | ${evidenceStatus} | ${c.qa.caseA} | ${c.qa.caseB} | ${c.qa.sourceRisk} | ${c.qa.oldReuse} | ${quality} | ${c.qa.action} |`;
});

const passOrLimited = cards.filter((c) => c.qa.action === "PASS" || c.qa.action === "LIMITED").length;

const qa = `# Phase 3A Model Card QA Report

> Scope: first batch P0 model-card upgrade  
> Date: ${today}  
> Rule: no 107-card full upgrade; no case-library expansion; no old card deletion.

## Batch Selection

Selected from Phase 2.5 frozen P0 list:

1. Claude Fable 5
2. GPT-5.5 xHigh
3. Gemini 3 Pro Preview
4. DeepSeek V3.2
5. Qwen3 Max Thinking

Important correction: Gemini 3 Pro Preview is included because it was in the frozen Phase 2.5 first-batch recommendation, but official Google docs show it has been shut down and migrated to Gemini 3.1 Pro Preview. Therefore its action is HOLD.

## QA Table

| model | publishability | evidence_status | case_count_A | case_count_B | source_risk | old_card_reuse | quality | action |
|---|---|---:|---:|---|---|---|---|---|
${qaRows.join("\n")}

## Completion Gate

| Gate | Result |
|---|---|
| First batch size is 3-5 models | PASS: 5 |
| At least 3 models PASS or LIMITED | PASS: ${passOrLimited} |
| No full 107-card upgrade | PASS |
| No old cards deleted or modified | PASS |
| No benchmark/tutorial/overview treated as real case | PASS |
| Weak evidence disclosed | PASS |

## Actions

- PASS: Claude Fable 5 can enter website model page as the anchor sample.
- LIMITED: GPT-5.5 xHigh, DeepSeek V3.2, Qwen3 Max Thinking can publish only with prominent case-evidence warnings.
- HOLD: Gemini 3 Pro Preview should not be published as an active model page; replace with Gemini 3.1 Pro Preview in the next P0 candidate revision.

## Recommendation

Phase 3A passes the minimum gate because 4 models are PASS or LIMITED. Proceed to Phase 3B for case-library补证, but prioritize:

1. GPT-5.5 xHigh evidence intake rows.
2. DeepSeek V3.2 A/B case search.
3. Qwen3 Max Thinking A/B case search.
4. Google P0 replacement decision: Gemini 3.1 Pro Preview instead of Gemini 3 Pro Preview.
`;

fs.writeFileSync(path.join(outDir, "phase-3a-model-card-qa-report.md"), qa);

console.log(`Generated ${cards.length} Phase 3A model cards and QA report.`);
