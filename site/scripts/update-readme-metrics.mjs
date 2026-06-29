import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoDir = path.resolve(siteDir, "..");
const metrics = JSON.parse(fs.readFileSync(path.join(siteDir, "src/data/metrics.json"), "utf8"));
const cases = JSON.parse(fs.readFileSync(path.join(siteDir, "src/data/cases.json"), "utf8"));

function replaceLine(text, prefix, next) {
  const pattern = new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}.*$`, "m");
  if (pattern.test(text)) return text.replace(pattern, `${prefix}${next}`);
  return text;
}

function updateFile(file, replacements) {
  let text = fs.readFileSync(file, "utf8");
  for (const [prefix, value] of replacements) text = replaceLine(text, prefix, value);
  fs.writeFileSync(file, text);
}

updateFile(path.join(siteDir, "README.md"), [
  ["- 厂商页面：", `${metrics.vendors} 个`],
  ["- 总模型：", `${metrics.models} 个`],
  ["- 活跃模型：", `${metrics.activeModels} 个`],
  ["- 已归档模型：", `${metrics.archiveModels} 个`],
  ["- 暂缓推荐模型：", `${metrics.holdModels} 个`],
  ["- A 类精选案例：", `${metrics.verifiedACases} 条`],
  ["- 总案例记录：", `${cases.length} 条`],
  ["- 达到 5 条 A 类精选案例目标线的活跃模型：", `${metrics.activeModelsMeetingTargetCaseCoverage} 个`],
  ["- 活跃模型剩余目标缺口：", `${metrics.activeCaseDeficitToTarget}`],
  ["- 数据截点：", `${metrics.datasetCut}`]
]);

updateFile(path.join(repoDir, "README.md"), [
  ["- 活跃模型：", `${metrics.activeModels} 个`],
  ["- 达到 5 条 A 类精选案例目标线的活跃模型：", `${metrics.activeModelsMeetingTargetCaseCoverage} 个`],
  ["- A 类精选案例：", `${metrics.verifiedACases} 条`],
  ["- 总案例记录：", `${cases.length} 条`],
  ["- 活跃模型剩余目标缺口：", `${metrics.activeCaseDeficitToTarget}`]
]);

console.log(`README metrics updated: ${metrics.models} models / ${metrics.verifiedACases} A cases / ${metrics.datasetCut}`);
