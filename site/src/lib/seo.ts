export const SITE_URL = "https://model-seven-blond.vercel.app";
export const SITE_NAME = "Model Atlas 模型图谱";
export const SITE_DESCRIPTION = "自动维护的 AI 模型资料库和公开可核验真实使用案例库。";

export type JsonLdNode = Record<string, unknown>;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function cleanList(values: Array<unknown>) {
  return values
    .map((value) => String(value ?? "").trim())
    .filter((value) => value && !value.includes("暂无数据"));
}

export function httpLinks(values: Array<unknown>) {
  return cleanList(values).filter((value) => /^https?:\/\//i.test(value));
}
