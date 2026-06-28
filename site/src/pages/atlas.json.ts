import models from "../data/models.json";
import cases from "../data/cases.json";
import vendors from "../data/vendors.json";
import metrics from "../data/metrics.json";
import evidenceArchive from "../data/evidence-archive.json";
import evidenceArchiveHistory from "../data/evidence-archive-history.json";
import { buildCaseNarrative } from "../lib/caseNarrative";
import { buildEvidenceTrust } from "../lib/evidenceTrust";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "../lib/seo";

const activeModels = models.filter((model) => !["Archive", "Hold"].includes(model.publishability));
const aCases = cases.filter((item) => item.evidenceGrade === "A" && item.showcaseEligible);
const featuredModels = [...activeModels]
  .sort((a, b) => Number(b.aCaseCount ?? 0) - Number(a.aCaseCount ?? 0) || Number(b.score ?? 0) - Number(a.score ?? 0))
  .slice(0, 20)
  .map((model) => ({
    id: model.id,
    name: model.name,
    vendor: model.vendor,
    url: absoluteUrl(`/models/${model.slug}`),
    aCaseCount: model.aCaseCount,
    score: model.score,
    publishability: model.publishability
  }));
const recentCases = [...aCases]
  .sort((a, b) => String(b.collectedAt ?? "").localeCompare(String(a.collectedAt ?? "")))
  .slice(0, 20)
  .map((item) => {
    const narrative = buildCaseNarrative(item);
    const evidenceTrust = buildEvidenceTrust(item);
    return {
      id: item.id,
      title: narrative.displayTitle,
      originalTitle: narrative.originalTitle,
      summary: narrative.summary,
      useCase: narrative.useCaseLabel,
      modelName: item.modelName,
      vendor: item.vendor,
      sourcePlatform: item.sourcePlatform,
      collectedAt: item.collectedAt,
      evidenceTrust: {
        score: evidenceTrust.score,
        tier: evidenceTrust.tier,
        sourceKind: evidenceTrust.sourceKind
      },
      url: absoluteUrl(`/cases/${item.id}`),
      evidenceDrawerUrl: absoluteUrl(`/cases?case=${item.id}`)
    };
  });

export function GET() {
  return new Response(JSON.stringify({
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    datasetCut: metrics.datasetCut,
    methodology: metrics.methodology,
    metrics,
    routes: {
      home: absoluteUrl("/"),
      models: absoluteUrl("/models"),
      cases: absoluteUrl("/cases"),
      compare: absoluteUrl("/compare"),
      updates: absoluteUrl("/updates"),
      codingAgent: absoluteUrl("/topics/coding-agent"),
      methodology: absoluteUrl("/methodology"),
      commandIndex: absoluteUrl("/command-index.json"),
      evidenceArchive: absoluteUrl("/evidence-archive.json"),
      evidenceArchiveHistory: absoluteUrl("/evidence-archive-history.json"),
      llms: absoluteUrl("/llms.txt"),
      sitemap: absoluteUrl("/sitemap.xml")
    },
    counts: {
      vendors: vendors.length,
      models: models.length,
      activeModels: activeModels.length,
      aCases: aCases.length
    },
    evidenceArchive: {
      url: absoluteUrl("/evidence-archive.json"),
      historyUrl: absoluteUrl("/evidence-archive-history.json"),
      summary: evidenceArchive.summary,
      snapshotIssues: evidenceArchive.snapshotIssues ?? [],
      latestHistory: evidenceArchiveHistory.snapshots.at(-1) ?? null
    },
    featuredModels,
    recentCases
  }, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
