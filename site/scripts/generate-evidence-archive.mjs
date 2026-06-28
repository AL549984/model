import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(siteRoot, "..");
const outputPath = path.join(siteRoot, "src/data/evidence-archive.json");
const historyPath = path.join(siteRoot, "src/data/evidence-archive-history.json");
const checkOnly = process.argv.includes("--check");
const snapshotIssueMeta = {
  complete: {
    label: "已完成",
    description: "所有当前证据目标都已完成本地快照。",
    action: "无需处理；数据字段变化后会自动重新进入复核队列。"
  },
  pending_queued: {
    label: "未开始抓取",
    description: "当前案例尚未生成本地 manifest，仍在按 host 分批抓取的队列中。",
    action: "按 /updates 的 host 队列运行 npm run evidence:snapshot。"
  },
  partial_targets: {
    label: "部分目标成功",
    description: "已有部分证据目标成功落盘，但仍有原始证据或公开产物未完成。",
    action: "使用 --case 定点重跑，优先检查失败目标的 HTTP 状态和内容类型。"
  },
  evidence_changed: {
    label: "证据字段变化",
    description: "案例字段或证据 URL 与本地 manifest 指纹不一致，历史快照需要重新核对。",
    action: "人工确认字段变化是否合理，再重跑该案例快照。"
  },
  invalid_manifest: {
    label: "manifest 异常",
    description: "本地 manifest 无法解析或结构异常，无法作为有效快照记录使用。",
    action: "检查 archive/evidence/{caseId}/manifest.json，必要时删除后重抓。"
  },
  no_valid_targets: {
    label: "目标未通过",
    description: "存在 manifest，但当前证据目标没有任何一个被标记为 ok。",
    action: "查看目标元数据中的 HTTP 状态、跳转结果和 fallback 信息。"
  }
};

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(siteRoot, relativePath), "utf8"));
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function hashPayload(value) {
  return createHash("sha256").update(stableStringify(value)).digest("hex");
}

function splitUrls(value) {
  return String(value ?? "")
    .split(/[\n;]/)
    .map((item) => item.trim())
    .filter((item) => /^https?:\/\//i.test(item));
}

function hostFor(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function snapshotPath(caseId, kind, url) {
  const shortHash = createHash("sha256").update(url).digest("hex").slice(0, 12);
  return `archive/evidence/${caseId}/${kind}-${shortHash}.json`;
}

function priorityFor(item) {
  const source = `${item.sourcePlatform ?? ""} ${item.sourceType ?? ""} ${item.originalEvidenceUrl ?? ""}`.toLowerCase();
  if (/github|gitlab|repo|pull request|\bpr\b/.test(source)) return "high";
  if (/official|customer|openai|anthropic|google|stripe|duolingo|morgan stanley|khan academy/.test(source)) return "high";
  if (/youtube|bilibili|reddit|blog/.test(source)) return "medium";
  return "normal";
}

function buildTarget(caseId, kind, url) {
  return {
    kind,
    url,
    host: hostFor(url),
    recommendedSnapshotPath: snapshotPath(caseId, kind, url)
  };
}

function readLocalSnapshotManifest(caseId) {
  const localManifestPath = path.join(repoRoot, "archive/evidence", caseId, "manifest.json");
  if (!existsSync(localManifestPath)) return null;
  try {
    return JSON.parse(readFileSync(localManifestPath, "utf8"));
  } catch {
    return { invalid: true };
  }
}

function snapshotState(caseId, evidenceFingerprint, targets) {
  const manifest = readLocalSnapshotManifest(caseId);
  if (!manifest) return { status: "pending_snapshot", targetCount: 0, okTargetCount: 0, issueCode: "pending_queued" };
  if (manifest.invalid) {
    return { status: "snapshot_attention", targetCount: 0, okTargetCount: 0, issueCode: "invalid_manifest" };
  }
  if (manifest.evidenceFingerprint !== evidenceFingerprint) {
    return { status: "snapshot_attention", targetCount: 0, okTargetCount: 0, issueCode: "evidence_changed" };
  }

  const records = Array.isArray(manifest.targets) ? manifest.targets : [];
  const okTargetCount = targets.filter((target) =>
    records.some((record) => record.kind === target.kind && record.url === target.url && record.ok === true)
  ).length;

  if (okTargetCount === targets.length) {
    return { status: "snapshotted", targetCount: records.length, okTargetCount, issueCode: "complete" };
  }
  if (okTargetCount > 0) {
    return { status: "partial_snapshot", targetCount: records.length, okTargetCount, issueCode: "partial_targets" };
  }
  return { status: "snapshot_attention", targetCount: records.length, okTargetCount, issueCode: "no_valid_targets" };
}

function buildEntry(item) {
  const artifactUrls = splitUrls(item.artifactUrl);
  const originalEvidenceUrl = String(item.originalEvidenceUrl ?? "").trim();
  const targets = [
    originalEvidenceUrl ? buildTarget(item.id, "original-evidence", originalEvidenceUrl) : null,
    ...artifactUrls.map((url, index) => buildTarget(item.id, `artifact-${index + 1}`, url))
  ].filter(Boolean);
  const fingerprintPayload = {
    id: item.id,
    modelId: item.modelId,
    title: item.title,
    userOrOrg: item.userOrOrg,
    originalEvidenceUrl,
    artifactUrls,
    taskDescription: item.taskDescription,
    outputResult: item.outputResult,
    modelContribution: item.modelContribution,
    collectedAt: item.collectedAt
  };
  const evidenceFingerprint = hashPayload(fingerprintPayload);
  const snapshot = snapshotState(item.id, evidenceFingerprint, targets);

  return {
    caseId: item.id,
    modelId: item.modelId,
    modelName: item.modelName,
    title: item.title,
    sourcePlatform: item.sourcePlatform,
    sourceType: item.sourceType,
    collectedAt: item.collectedAt,
    priority: priorityFor(item),
    evidenceFingerprint,
    snapshotStatus: snapshot.status,
    snapshotIssue: {
      code: snapshot.issueCode,
      ...snapshotIssueMeta[snapshot.issueCode]
    },
    snapshotTargetCount: snapshot.targetCount,
    snapshotOkTargetCount: snapshot.okTargetCount,
    localSnapshotManifest: `archive/evidence/${item.id}/manifest.json`,
    targets
  };
}

function buildHistoryRecord(metrics, manifest) {
  return {
    id: `current-${metrics.datasetCut}`,
    date: metrics.datasetCut,
    label: "当前数据截点",
    aCaseCount: manifest.summary.aCaseCount,
    targets: manifest.summary.targets,
    snapshottedCases: manifest.summary.snapshottedCases,
    pendingSnapshotCases: manifest.summary.pendingSnapshotCases,
    partialSnapshotCases: manifest.summary.partialSnapshotCases,
    snapshotAttentionCases: manifest.summary.snapshotAttentionCases,
    source: "site/src/data/evidence-archive.json"
  };
}

function compareHistorySnapshots(a, b) {
  const dateCompare = String(a.date).localeCompare(String(b.date));
  if (dateCompare !== 0) return dateCompare;

  const progressCompare = Number(a.snapshottedCases ?? 0) - Number(b.snapshottedCases ?? 0);
  if (progressCompare !== 0) return progressCompare;

  const aIsCurrent = String(a.id ?? "").startsWith("current-");
  const bIsCurrent = String(b.id ?? "").startsWith("current-");
  if (aIsCurrent !== bIsCurrent) return aIsCurrent ? 1 : -1;

  return String(a.id).localeCompare(String(b.id));
}

async function buildHistory(metrics, manifest) {
  let existing = {
    schemaVersion: 1,
    name: "Model Atlas Evidence Archive History",
    policy: "Stable progress ledger for evidence snapshot coverage. The current dataset-cut record is updated by evidence:archive; batch records are preserved as operating history.",
    snapshots: []
  };

  if (existsSync(historyPath)) {
    existing = JSON.parse(await readFile(historyPath, "utf8"));
  }

  const currentRecord = buildHistoryRecord(metrics, manifest);
  const existingSnapshots = existing.snapshots ?? [];
  const previousCurrent = existingSnapshots.find((item) => item.id === currentRecord.id);
  const shouldPreservePreviousCurrent =
    previousCurrent &&
    Number(previousCurrent.snapshottedCases ?? -1) !== Number(currentRecord.snapshottedCases ?? -1);
  const preservedPreviousCurrent = shouldPreservePreviousCurrent
    ? {
        ...previousCurrent,
        id: `${previousCurrent.date}-snapshot-checkpoint-${previousCurrent.snapshottedCases}`,
        label: `快照进度 ${previousCurrent.snapshottedCases} 条`,
        source: previousCurrent.source ?? "site/src/data/evidence-archive-history.json"
      }
    : null;
  const snapshots = existingSnapshots
    .filter((item) => item.id !== currentRecord.id)
    .filter((item) => item.id !== preservedPreviousCurrent?.id)
    .concat(preservedPreviousCurrent ? [preservedPreviousCurrent, currentRecord] : [currentRecord])
    .sort(compareHistorySnapshots);

  return {
    schemaVersion: 1,
    name: existing.name ?? "Model Atlas Evidence Archive History",
    policy: existing.policy ?? "Stable progress ledger for evidence snapshot coverage.",
    snapshots
  };
}

function assertCurrentHistory(history, manifest) {
  const currentId = `current-${manifest.datasetCut}`;
  const current = (history.snapshots ?? []).find((item) => item.id === currentId);
  if (!current) throw new Error(`evidence archive history missing ${currentId}; run npm run evidence:archive`);

  const mismatches = [
    ["aCaseCount", manifest.summary.aCaseCount],
    ["targets", manifest.summary.targets],
    ["snapshottedCases", manifest.summary.snapshottedCases],
    ["pendingSnapshotCases", manifest.summary.pendingSnapshotCases],
    ["partialSnapshotCases", manifest.summary.partialSnapshotCases],
    ["snapshotAttentionCases", manifest.summary.snapshotAttentionCases]
  ].filter(([key, expected]) => Number(current[key]) !== Number(expected));

  if (mismatches.length) {
    throw new Error(`evidence archive history current record is stale: ${mismatches.map(([key, expected]) => `${key}=${current[key]} expected ${expected}`).join(", ")}`);
  }

  const snapshots = history.snapshots ?? [];
  const sorted = [...snapshots].sort(compareHistorySnapshots);
  const outOfOrder = snapshots.some((item, index) => item.id !== sorted[index]?.id);
  if (outOfOrder) {
    throw new Error("evidence archive history snapshots are out of order; run npm run evidence:archive");
  }
}

function summarizeSnapshotIssues(entries) {
  const groups = new Map();
  for (const entry of entries) {
    const code = entry.snapshotIssue?.code ?? "no_valid_targets";
    if (code === "complete") continue;
    const group = groups.get(code) ?? {
      code,
      label: snapshotIssueMeta[code]?.label ?? code,
      description: snapshotIssueMeta[code]?.description ?? "",
      action: snapshotIssueMeta[code]?.action ?? "",
      cases: 0,
      targets: 0,
      highPriorityCases: 0,
      hosts: new Map()
    };
    group.cases += 1;
    group.targets += entry.targets.length;
    if (entry.priority === "high") group.highPriorityCases += 1;
    for (const target of entry.targets) {
      if (!target.host) continue;
      const host = group.hosts.get(target.host) ?? { host: target.host, cases: new Set(), targets: 0 };
      host.cases.add(entry.caseId);
      host.targets += 1;
      group.hosts.set(target.host, host);
    }
    groups.set(code, group);
  }

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      hosts: Array.from(group.hosts.values())
        .map((host) => ({ host: host.host, cases: host.cases.size, targets: host.targets }))
        .sort((a, b) => b.targets - a.targets || b.cases - a.cases || a.host.localeCompare(b.host))
        .slice(0, 8)
    }))
    .sort((a, b) => b.cases - a.cases || b.targets - a.targets || a.label.localeCompare(b.label, "zh-Hans-CN"));
}

const [metrics, cases] = await Promise.all([
  readJson("src/data/metrics.json"),
  readJson("src/data/cases.json")
]);

const aCases = cases
  .filter((item) => item.evidenceGrade === "A" && item.showcaseEligible)
  .sort((a, b) => String(a.id).localeCompare(String(b.id)));
const entries = aCases.map(buildEntry);
const missingOriginalEvidence = entries.filter((item) => !item.targets.some((target) => target.kind === "original-evidence"));
const missingArtifact = entries.filter((item) => !item.targets.some((target) => target.kind.startsWith("artifact-")));
const snapshotted = entries.filter((item) => item.snapshotStatus === "snapshotted");
const partial = entries.filter((item) => item.snapshotStatus === "partial_snapshot");
const attention = entries.filter((item) => item.snapshotStatus === "snapshot_attention");
const pending = entries.filter((item) => item.snapshotStatus === "pending_snapshot");
const uniqueHosts = [...new Set(entries.flatMap((item) => item.targets.map((target) => target.host)).filter(Boolean))].sort();
const snapshotIssues = summarizeSnapshotIssues(entries);

const manifest = {
  schemaVersion: 1,
  name: "Model Atlas Evidence Archive Manifest",
  datasetCut: metrics.datasetCut,
  policy: "Every public A showcase case must have a stable archive target for original evidence and public artifact URLs. This manifest is the queue and integrity ledger for external evidence snapshots.",
  summary: {
    aCaseCount: aCases.length,
    manifestedCases: entries.length,
    missingOriginalEvidence: missingOriginalEvidence.length,
    missingArtifact: missingArtifact.length,
    snapshottedCases: snapshotted.length,
    partialSnapshotCases: partial.length,
    snapshotAttentionCases: attention.length,
    pendingSnapshotCases: pending.length,
    snapshotIssueTypes: snapshotIssues.length,
    uniqueHosts: uniqueHosts.length,
    targets: entries.reduce((sum, item) => sum + item.targets.length, 0)
  },
  hosts: uniqueHosts,
  snapshotIssues,
  cases: entries
};

const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
const history = await buildHistory(metrics, manifest);
const historySerialized = `${JSON.stringify(history, null, 2)}\n`;

if (checkOnly) {
  const current = await readFile(outputPath, "utf8");
  if (current !== serialized) {
    throw new Error("evidence archive manifest is stale; run npm run evidence:archive");
  }
  const currentHistory = JSON.parse(await readFile(historyPath, "utf8"));
  assertCurrentHistory(currentHistory, manifest);
  console.log(`evidence archive qa passed: ${entries.length} cases / ${manifest.summary.targets} targets / ${pending.length} pending snapshots`);
} else {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, serialized);
  await writeFile(historyPath, historySerialized);
  console.log(`wrote ${path.relative(siteRoot, outputPath)} and ${path.relative(siteRoot, historyPath)}: ${entries.length} cases / ${manifest.summary.targets} targets`);
}
