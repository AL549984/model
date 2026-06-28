type EvidenceArchiveTarget = {
  kind: string;
  url: string;
  host: string;
  recommendedSnapshotPath: string;
};

export type EvidenceArchiveEntry = {
  caseId: string;
  snapshotStatus: string;
  snapshotTargetCount?: number;
  snapshotOkTargetCount?: number;
  localSnapshotManifest: string;
  targets: EvidenceArchiveTarget[];
};

export function archiveStatusLabel(status: unknown) {
  switch (status) {
    case "snapshotted":
      return "已快照";
    case "partial_snapshot":
      return "部分快照";
    case "snapshot_attention":
      return "需关注";
    default:
      return "待快照";
  }
}

export function archiveStatusTone(status: unknown) {
  switch (status) {
    case "snapshotted":
      return "complete";
    case "partial_snapshot":
      return "partial";
    case "snapshot_attention":
      return "attention";
    default:
      return "pending";
  }
}

export function archiveTargetSummary(entry?: EvidenceArchiveEntry) {
  if (!entry) return "0 / 0 个证据目标";
  const ok = Number(entry.snapshotOkTargetCount ?? 0);
  const total = entry.targets.length;
  return `${ok} / ${total} 个证据目标`;
}

export function archiveStatusCopy(entry?: EvidenceArchiveEntry) {
  if (!entry) return "尚未进入证据归档清单。";
  const targetSummary = archiveTargetSummary(entry);
  switch (entry.snapshotStatus) {
    case "snapshotted":
      return `已完成快照：${targetSummary}，可用本地 manifest 复核证据指纹。`;
    case "partial_snapshot":
      return `已完成部分快照：${targetSummary}，仍有证据目标需要补抓或人工复核。`;
    case "snapshot_attention":
      return "当前快照需要关注，请检查证据指纹、URL 或 HTTP 状态。";
    default:
      return `已列入归档队列，等待抓取 ${entry.targets.length} 个证据目标。`;
  }
}
