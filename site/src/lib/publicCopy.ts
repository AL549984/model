export const publicStatusLabels: Record<string, string> = {
  Publishable: "已有真实案例",
  Limited: "待补公开案例",
  Hold: "暂缓推荐",
  Archive: "历史归档"
};

export function publicStatusLabel(status: string) {
  return publicStatusLabels[status] ?? status;
}

export function publicizeText(value: unknown) {
  return String(value ?? "")
    .replaceAll("有限证据", "待补公开案例")
    .replaceAll("可发布模型", "已有真实案例模型")
    .replaceAll("可发布", "已有真实案例")
    .replaceAll("暂无已验证 A 类案例", "暂无可核验 A 类案例")
    .replaceAll("已验证 A 类案例", "可核验 A 类案例")
    .replaceAll("审核通过的 A 类案例", "可核验 A 类案例")
    .replaceAll("自动 gate 通过的 A 类案例", "可核验 A 类案例")
    .replaceAll("暂无自动 gate 通过的 A 类案例", "暂无可核验 A 类案例")
    .replaceAll("完整 107 行模型表", "公开模型资料库")
    .replaceAll("Bitable 14 厂商主表节点", "核心公开资料节点")
    .replaceAll("Bitable 主表", "公开模型资料库")
    .replaceAll("Feishu Bitable sync + automatic evidence gate", "公开资料同步和案例证据分级")
    .replaceAll("飞书 Bitable 107 行", "公开资料与模型数据库")
    .replaceAll("飞书", "资料库")
    .replaceAll("Bitable", "资料库")
    .replaceAll("飞书同步", "资料同步")
    .replaceAll("Phase 3A", "资料建档")
    .replaceAll("Phase 3B", "案例复核")
    .replaceAll("Atlas Command Center", "公开模型图谱")
    .replaceAll("补证", "补公开证据");
}
