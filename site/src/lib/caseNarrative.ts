import { publicizeText } from "./publicCopy";

export type CaseNarrativeInput = {
  id?: string;
  title?: string;
  modelName?: string;
  userOrOrg?: string;
  sourcePlatform?: string;
  sourceType?: string;
  taskCategory?: string;
  taskDescription?: string;
  outputResult?: string;
  modelContribution?: string;
  riskNotes?: string;
  evidenceGrade?: string;
  collectedAt?: string;
};

type UseCaseRule = {
  terms: string[];
  label: string;
  headline: string;
};

const useCaseRules: UseCaseRule[] = [
  { terms: ["webgpu", "threejs", "3d", "procedural_world", "open world"], label: "3D 与 Web 交互", headline: "浏览器 3D 世界构建" },
  { terms: ["browser_game", "mmorpg", "game", "roblox", "godot", "survivor"], label: "游戏与交互原型", headline: "可玩交互原型构建" },
  { terms: ["code_review", "test_generation", "testing", "qa"], label: "代码审查与测试", headline: "代码审查和测试生成" },
  { terms: ["agentic_coding", "coding_agent", "codex", "claude code", "vscode", "software", "repo"], label: "代码代理与软件工程", headline: "软件工程任务执行" },
  { terms: ["deep_research", "research", "paper", "report", "analysis"], label: "研究与报告生成", headline: "研究分析和报告生成" },
  { terms: ["rag", "knowledge", "qa", "question", "search"], label: "知识库与检索问答", headline: "知识检索和问答" },
  { terms: ["document", "pdf", "ocr", "resume", "invoice", "contract"], label: "文档理解与处理", headline: "文档理解和结构化处理" },
  { terms: ["image", "video", "audio", "voice", "speech", "multimodal", "subtitle"], label: "多模态生成与理解", headline: "多模态内容处理" },
  { terms: ["translation", "localization", "translator"], label: "翻译与本地化", headline: "翻译和本地化处理" },
  { terms: ["finance", "trading", "stock", "equity", "deal"], label: "金融与商业分析", headline: "金融和商业分析" },
  { terms: ["health", "medical", "bio", "genomics", "cell", "drug"], label: "医疗与生命科学", headline: "医疗和生命科学分析" },
  { terms: ["multiagent", "workflow", "agent", "automation", "assistant"], label: "智能体工作流", headline: "智能体流程编排" }
];

const platformLabels: Array<[string, string]> = [
  ["github", "公开代码库"],
  ["hugging face", "Hugging Face 公开空间"],
  ["hf", "Hugging Face 公开空间"],
  ["reddit", "社区原帖"],
  ["youtube", "视频证据"],
  ["vercel", "在线 Demo"],
  ["official", "官方页面"],
  ["product_site", "产品页面"],
  ["blog", "博客记录"],
  ["web_search", "公开网页"]
];

function normalize(value: unknown) {
  return publicizeText(value).replace(/\s+/g, " ").trim();
}

function clip(value: unknown, limit = 260) {
  const text = normalize(value);
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1)}…`;
}

function hasCjk(value: string) {
  return /[\u3400-\u9fff]/.test(value);
}

function searchableCaseText(item: CaseNarrativeInput) {
  return [
    item.title,
    item.taskCategory,
    item.taskDescription,
    item.outputResult,
    item.modelContribution
  ].map((value) => String(value ?? "").toLowerCase()).join(" ");
}

function pickUseCase(item: CaseNarrativeInput) {
  const haystack = searchableCaseText(item);
  return useCaseRules.find((rule) => rule.terms.some((term) => haystack.includes(term))) ?? {
    label: "真实任务执行",
    headline: "真实任务执行"
  };
}

function platformSummary(sourcePlatform: unknown) {
  const raw = normalize(sourcePlatform);
  const lower = raw.toLowerCase();
  const labels = platformLabels
    .filter(([term]) => lower.includes(term))
    .map(([, label]) => label);
  return Array.from(new Set(labels)).slice(0, 3).join("、") || raw || "公开来源";
}

function sourceAssetPhrase(item: CaseNarrativeInput) {
  const platform = platformSummary(item.sourcePlatform);
  if (platform.includes("代码库")) return "公开代码、README 或项目配置";
  if (platform.includes("Hugging Face")) return "公开 Space、模型社区页面或源码";
  if (platform.includes("视频")) return "视频记录、页面说明或可访问产物";
  if (platform.includes("Demo")) return "在线 Demo 或公开运行入口";
  return "原始证据链接和可访问产物";
}

function originalFallback(original: string, fallback: string) {
  if (!original) return fallback;
  if (hasCjk(original)) return original;
  return `${fallback} 原始资料写作：${clip(original, 220)}`;
}

function readableUser(value: unknown) {
  const text = normalize(value);
  return text || "公开使用者";
}

function conciseUser(value: string) {
  if (!value || value === "公开使用者") return "";
  return clip(value, 36);
}

export function buildCaseNarrative(item: CaseNarrativeInput) {
  const useCase = pickUseCase(item);
  const modelName = normalize(item.modelName) || "该模型";
  const user = readableUser(item.userOrOrg);
  const platform = platformSummary(item.sourcePlatform);
  const sourceAsset = sourceAssetPhrase(item);
  const grade = normalize(item.evidenceGrade) || "A";
  const collectedAt = normalize(item.collectedAt);
  const originalTitle = normalize(item.title);
  const originalTask = normalize(item.taskDescription);
  const originalOutput = normalize(item.outputResult);
  const originalContribution = normalize(item.modelContribution);
  const originalRisk = normalize(item.riskNotes);

  const userPrefix = conciseUser(user);
  const displayTitle = userPrefix
    ? `${userPrefix} 使用 ${modelName} 处理${useCase.headline}`
    : `${modelName} 用于${useCase.headline}`;
  const deck = `${user} 公开的${useCase.label}案例，来源为 ${platform}${collectedAt ? `，复核于 ${collectedAt}` : ""}。`;
  const summary = `${deck} Model Atlas 将它标记为 ${grade} 类证据，因为它同时具备具体使用者、具体任务、公开原始证据和可访问产物。`;

  const taskBrief = originalFallback(
    originalTask,
    `这是一个围绕${useCase.headline}的真实任务，公开材料可以回溯到具体使用者和具体产物。`
  );
  const outputBrief = originalFallback(
    originalOutput,
    `公开材料提供${sourceAsset}，可用于核验任务结果、项目形态和模型绑定关系。`
  );
  const contributionBrief = originalFallback(
    originalContribution,
    `${modelName} 在该案例中承担${useCase.headline}相关的生成、分析、编排或实现角色。`
  );
  const riskBrief = originalFallback(
    originalRisk,
    "当前判断基于公开材料；若产物下线、仓库变更或模型参与比例仅来自作者自述，需要在引用前重新复核。"
  );

  const tags = Array.from(new Set([
    useCase.label,
    platform,
    `${grade} 类可核验`,
    normalize(item.sourceType) || "真实案例"
  ])).filter(Boolean).slice(0, 4);

  return {
    displayTitle,
    originalTitle,
    deck,
    summary,
    useCaseLabel: useCase.label,
    useCaseHeadline: useCase.headline,
    platformLabel: platform,
    taskBrief,
    outputBrief,
    contributionBrief,
    riskBrief,
    tags
  };
}
