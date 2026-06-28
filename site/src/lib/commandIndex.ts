import casesData from "../data/cases.json";
import modelsData from "../data/models.json";
import vendorsData from "../data/vendors.json";
import { buildCaseNarrative } from "./caseNarrative";

type CommandItemType = "入口" | "专题" | "方法" | "厂商" | "模型" | "案例";

export type CommandIndexItem = {
  type: CommandItemType;
  title: string;
  subtitle: string;
  href: string;
  keywords: string;
};

type VendorRecord = {
  id: string;
  slug?: string;
  displayName: string;
  status?: string;
  caseLibraryStatus?: string;
  positioning?: string;
  families?: string[];
  strengths?: string[];
  modelCount?: number;
};

type ModelRecord = {
  id: string;
  name: string;
  slug: string;
  vendor?: string;
  modelId?: string;
  publishability?: string;
  summary?: string;
  modality?: string;
  capabilities?: {
    codingAgent?: string;
    longContext?: string;
    research?: string;
  };
  fit?: string[];
  aCaseCount?: number;
};

type CaseRecord = {
  id: string;
  title: string;
  vendor?: string;
  vendorId?: string;
  modelId?: string;
  modelName?: string;
  userOrOrg?: string;
  sourcePlatform?: string;
  sourceType?: string;
  taskCategory?: string;
  taskDescription?: string;
  outputResult?: string;
  modelContribution?: string;
  evidenceGrade?: string;
  showcaseEligible?: boolean;
};

const vendors = vendorsData as VendorRecord[];
const models = modelsData as ModelRecord[];
const cases = casesData as CaseRecord[];

function clip(value: unknown, limit = 180) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function joinKeywords(parts: unknown[], limit = 360) {
  return clip(parts.filter(Boolean).map((part) => clip(part, 120)).join(" "), limit);
}

export function buildCommandIndex(): CommandIndexItem[] {
  const showcaseCases = cases.filter((item) => item.evidenceGrade === "A" && item.showcaseEligible);
  const aCaseCount = showcaseCases.length;

  return [
    { type: "入口", title: "首页观测台", subtitle: "数据概览、粒子图谱、精选入口", href: "/", keywords: "hero atlas 首页 指标 粒子 图谱" },
    { type: "入口", title: "模型库", subtitle: `按厂商、能力、状态浏览 ${models.length} 个模型档案`, href: "/models", keywords: "models 模型 索引 厂商 能力 状态" },
    { type: "入口", title: "案例库", subtitle: `公开可核验的 ${aCaseCount} 条 A 类真实使用案例`, href: "/cases", keywords: "cases 案例 证据 A类 公开 可核验" },
    { type: "入口", title: "模型对比", subtitle: "按任务场景比较候选模型", href: "/compare", keywords: "compare 对比 选型 coding 成本" },
    { type: "入口", title: "数据更新日志", subtitle: "数据截点、最近入库、复核批次和自动化链路", href: "/updates", keywords: "updates 更新 日志 最近入库 数据截点 复核 Hermes Astro Vercel" },
    { type: "专题", title: "Coding Agent 专题", subtitle: "代码代理、软件工程与长周期任务案例", href: "/topics/coding-agent", keywords: "coding agent 代码 编程 软件工程 专题" },
    { type: "方法", title: "证据分级与自动化流程", subtitle: "A/B/C/D 规则与 Hermes 到 Vercel 的发布链路", href: "/methodology", keywords: "method 方法 证据 分级 Hermes Astro Vercel" },
    ...vendors.map((vendor) => ({
      type: "厂商" as const,
      title: vendor.displayName,
      subtitle: `${vendor.modelCount ?? 0} 个模型 · ${vendor.caseLibraryStatus === "usable" ? "案例库可用" : "持续补证"}`,
      href: `/vendors/${vendor.slug ?? vendor.id}`,
      keywords: joinKeywords([vendor.id, vendor.status, vendor.positioning, ...(vendor.families ?? []), ...(vendor.strengths ?? [])], 300)
    })),
    ...models.map((model) => ({
      type: "模型" as const,
      title: model.name,
      subtitle: `${model.vendor ?? "未知厂商"} · ${model.aCaseCount ?? 0} 条 A 类案例 · ${model.publishability ?? "待核验"}`,
      href: `/models/${model.slug}`,
      keywords: joinKeywords([
        model.id,
        model.vendor,
        model.modelId,
        model.summary,
        model.modality,
        model.capabilities?.codingAgent,
        model.capabilities?.longContext,
        model.capabilities?.research,
        ...(model.fit ?? [])
      ], 340)
    })),
    ...showcaseCases.map((item) => {
      const narrative = buildCaseNarrative(item);
      return {
        type: "案例" as const,
        title: narrative.displayTitle,
        subtitle: `${item.modelName ?? "未知模型"} · ${narrative.useCaseLabel} · ${item.evidenceGrade ?? "待定"} 类证据`,
        href: `/cases/${item.id}`,
        keywords: joinKeywords([
          narrative.originalTitle,
          narrative.summary,
          narrative.taskBrief,
          narrative.outputBrief,
          narrative.contributionBrief,
          ...(narrative.tags ?? []),
          item.vendor,
          item.vendorId,
          item.modelId,
          item.modelName,
          item.userOrOrg,
          item.sourcePlatform,
          item.sourceType,
          item.taskCategory,
          item.taskDescription,
          item.outputResult,
          item.modelContribution
        ], 360)
      };
    })
  ];
}
