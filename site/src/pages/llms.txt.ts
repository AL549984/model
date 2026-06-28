import models from "../data/models.json";
import cases from "../data/cases.json";
import metrics from "../data/metrics.json";
import evidenceArchive from "../data/evidence-archive.json";
import { buildCaseNarrative } from "../lib/caseNarrative";
import { buildEvidenceTrust } from "../lib/evidenceTrust";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "../lib/seo";

const activeModels = models.filter((model) => !["Archive", "Hold"].includes(model.publishability));
const aCases = cases.filter((item) => item.evidenceGrade === "A" && item.showcaseEligible);
const topModels = [...activeModels]
  .sort((a, b) => Number(b.aCaseCount ?? 0) - Number(a.aCaseCount ?? 0) || Number(b.score ?? 0) - Number(a.score ?? 0))
  .slice(0, 16);
const recentCases = [...aCases]
  .sort((a, b) => String(b.collectedAt ?? "").localeCompare(String(a.collectedAt ?? "")))
  .slice(0, 16);

function line(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export function GET() {
  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Model Atlas 是一个中文 AI 模型资料库和真实使用案例库。它优先收录可公开核验的 A 类案例，并把模型、厂商、证据、对比和 Coding Agent 专题连接成可浏览的档案系统。",
    "",
    "## 数据状态",
    "",
    `- 数据截点：${metrics.datasetCut}`,
    `- 活跃模型：${metrics.activeModels}`,
    `- A 类精选案例：${metrics.verifiedACases}`,
    `- 达到 5 条 A 类精选案例的活跃模型：${metrics.activeModelsMeetingTargetCaseCoverage}`,
    `- 活跃模型剩余目标缺口：${metrics.activeCaseDeficitToTarget}`,
    `- 方法论：${metrics.methodology}`,
    "",
    "## 主要入口",
    "",
    `- 首页：${absoluteUrl("/")}`,
    `- 模型库：${absoluteUrl("/models")}`,
    `- 案例库：${absoluteUrl("/cases")}`,
    `- 模型对比：${absoluteUrl("/compare")}`,
    `- 数据更新日志：${absoluteUrl("/updates")}`,
    `- Coding Agent 专题：${absoluteUrl("/topics/coding-agent")}`,
    `- 证据方法：${absoluteUrl("/methodology")}`,
    "",
    "## 机器可读入口",
    "",
    `- Atlas 摘要 JSON：${absoluteUrl("/atlas.json")}`,
    `- 证据归档清单 JSON：${absoluteUrl("/evidence-archive.json")}`,
    `- 证据快照历史 JSON：${absoluteUrl("/evidence-archive-history.json")}`,
    `- 全站命令索引 JSON：${absoluteUrl("/command-index.json")}`,
    `- Sitemap：${absoluteUrl("/sitemap.xml")}`,
    "",
    "## 证据分级",
    "",
    "- A：公开可核验的真实使用案例，可进入精选展示。",
    "- B：有价值但模型绑定较弱或证据不足，保留为候选。",
    "- C：背景材料，用于理解模型、厂商或场景。",
    "- D：证据不足、不可采用，或不属于真实使用案例。",
    "",
    "## 证据可信度",
    "",
    "- 证据可信度由证据等级、原始证据、公开产物、复核状态、任务细节完整度和来源类型计算。",
    "- A+ 完整链路表示具备原始证据、公开产物、复核通过和高强度来源信号。",
    "- 可信评分用于辅助判断证据链完整度，不替代原始链接复核。",
    "",
    "## 证据归档状态",
    "",
    `- 归档清单覆盖 A 类案例：${evidenceArchive.summary.manifestedCases}/${evidenceArchive.summary.aCaseCount}`,
    `- 待归档证据目标：${evidenceArchive.summary.targets}`,
    `- 已快照案例：${evidenceArchive.summary.snapshottedCases}`,
    `- 待快照案例：${evidenceArchive.summary.pendingSnapshotCases}`,
    `- 主要待处理原因：${evidenceArchive.snapshotIssues?.[0]?.label ?? "暂无"} / ${evidenceArchive.snapshotIssues?.[0]?.cases ?? 0} 条案例`,
    "- 归档清单用于追踪原始证据和公开产物的快照目标，避免外链失效后无法复核。",
    "",
    "## 推荐模型档案入口",
    "",
    ...topModels.map((model) => `- ${line(model.name)} / ${line(model.vendor)} / A 类案例 ${model.aCaseCount} / ${absoluteUrl(`/models/${model.slug}`)}`),
    "",
    "## 最近 A 类案例入口",
    "",
    ...recentCases.map((item) => {
      const narrative = buildCaseNarrative(item);
      const evidenceTrust = buildEvidenceTrust(item);
      return `- ${line(narrative.displayTitle)} / ${line(narrative.useCaseLabel)} / ${line(item.modelName)} / 证据可信度 ${evidenceTrust.score}/100 ${line(evidenceTrust.tier)} / ${line(item.collectedAt)} / ${absoluteUrl(`/cases/${item.id}`)}`;
    }),
    "",
    "## 使用边界",
    "",
    "- 暂无数据表示当前资料源未披露或尚未接入，不代表模型一定不支持。",
    "- 暂无 A 类案例不是能力否定，只代表公开证据尚未达到 Model Atlas 精选标准。",
    "- 对比页结论基于当前公开证据、案例覆盖、风险和数据缺口；最终选型仍需进入模型档案和案例证据复核。",
    ""
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
