type EvidenceCase = {
  evidenceGrade?: string;
  originalEvidenceUrl?: string;
  artifactUrl?: string;
  sourcePlatform?: string;
  sourceType?: string;
  taskDescription?: string;
  outputResult?: string;
  modelContribution?: string;
  riskNotes?: string;
  reviewStatus?: string;
};

export type EvidenceTrust = {
  score: number;
  tier: string;
  shortTier: string;
  sourceKind: string;
  sourceKey: "repo" | "official" | "public_build" | "community" | "web_trace";
  signals: string[];
  filterKey: "aplus" | "high" | "review";
};

export function splitEvidenceArtifacts(value: unknown) {
  return String(value ?? "")
    .split(" ; ")
    .map((link) => link.trim())
    .filter(Boolean);
}

function getSourceSignal(item: EvidenceCase) {
  const source = [
    item.sourcePlatform,
    item.sourceType,
    item.originalEvidenceUrl,
    item.artifactUrl
  ].join(" ").toLowerCase();

  if (/github|gitlab|repo|pull request|\bpr\b/.test(source)) {
    return { score: 10, key: "repo" as const, label: "代码仓库证据" };
  }

  if (/official|customer story|newsroom|press release|openai|anthropic|google|duolingo|stripe|morgan stanley|khan academy/.test(source)) {
    return { score: 9, key: "official" as const, label: "官方/客户故事" };
  }

  if (/hugging\s?face|vercel|replicate|fal\.ai|product site|project site|demo|pypi|siliconflow|openrouter/.test(source)) {
    return { score: 8, key: "public_build" as const, label: "公开产物空间" };
  }

  if (/youtube|bilibili|reddit|blog|latent\.space|personal/.test(source)) {
    return { score: 7, key: "community" as const, label: "社区公开记录" };
  }

  return { score: 6, key: "web_trace" as const, label: "网页线索" };
}

export function buildEvidenceTrust(item: EvidenceCase): EvidenceTrust {
  const artifactLinks = splitEvidenceArtifacts(item.artifactUrl);
  const detailSignals = [
    item.taskDescription,
    item.outputResult,
    item.modelContribution,
    item.riskNotes
  ].filter((value) => String(value ?? "").trim()).length;
  const sourceSignal = getSourceSignal(item);
  const reviewApproved = String(item.reviewStatus ?? "").toLowerCase().includes("approved");
  const score = Math.min(100, Math.round(
    (item.evidenceGrade === "A" ? 20 : 10) +
    (item.originalEvidenceUrl ? 20 : 0) +
    (artifactLinks.length ? 15 : 0) +
    (artifactLinks.length > 1 ? 5 : 0) +
    (reviewApproved ? 15 : 6) +
    (detailSignals / 4) * 20 +
    sourceSignal.score
  ));

  const tier = score >= 98
    ? "A+ 完整链路"
    : score >= 92
      ? "A 高可信"
      : score >= 85
        ? "A- 需快照复核"
        : "待复核";

  return {
    score,
    tier,
    shortTier: tier.split(" ")[0] ?? tier,
    sourceKind: sourceSignal.label,
    sourceKey: sourceSignal.key,
    signals: [
      item.originalEvidenceUrl ? "原始证据" : "缺原始证据",
      artifactLinks.length ? `${artifactLinks.length} 个公开产物` : "缺公开产物",
      reviewApproved ? "复核通过" : "待人工复核",
      sourceSignal.label
    ],
    filterKey: score >= 98 ? "aplus" : score >= 92 ? "high" : "review"
  };
}
