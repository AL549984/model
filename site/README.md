# Model Atlas 模型图谱网站

这是 Model Atlas 模型图谱的 Astro 静态网站实现。

Model Atlas 是一个自动维护的 AI 模型资料库和真实使用案例库。当前站点采用 `Signal Observatory x Living Archive` 视觉方向：黑白高对比、细线框、粒子知识图谱、档案索引感和少量红色活点。站点主语言为中文；模型名、厂商名、`Coding Agent`、`Hermes`、`Astro`、`Vercel`、`API` 等技术名词按语义保留英文。

## 当前数据状态

- 厂商页面：17 个
- 总模型：128 个
- 活跃模型：116 个
- 已归档模型：2 个
- 暂缓推荐模型：10 个
- A 类精选案例：680 条
- 总案例记录：682 条
- 达到 5 条 A 类精选案例目标线的活跃模型：116 个
- 活跃模型剩余目标缺口：0
- 数据截点：2026-07-21

缺失或弱证据字段会明确显示为 `官方未披露`、`暂无数据`、`暂未接入` 或类似边界说明。站点不会编造价格、上下文长度、发布日期、能力结论或案例证据。

## 核心页面

- `/`：首页，包含指标概览、粒子知识图谱、模型索引、真实案例库、自动化流程和证据分级入口。
- `/models`：模型索引，支持搜索、厂商、状态、案例覆盖、Coding Agent 候选和排序。
- `/models/[slug]`：模型档案，包含档案摘要、证据完整度、证据快照覆盖、代表案例排序、案例时间线、证据分布和复制模型档案入口。
- `/cases`：真实案例库，支持搜索、模型、厂商、来源平台、任务类型、A+ 完整链路和证据快照状态筛选。
- `/cases/[id]`：单条案例详情页，展示可核验证据、模型作用、风险边界和复制案例页入口。
- `/compare`：模型对比工作台，支持 2-4 个模型、场景切换、推荐解释、证据快照覆盖率、复制当前对比和复制研究包。
- `/topics/coding-agent`：Coding Agent 专题入口。
- `/vendors` 和 `/vendors/[slug]`：厂商索引和厂商路线。
- `/updates`：数据更新日志，展示数据截点、最近入库、复核批次、来源结构、证据快照总览和按 host 聚合的下一批归档队列。
- `/methodology`：公开方法论和证据分级说明。
- `/llms.txt`：面向 AI 工具的文本索引。
- `/atlas.json`：机器可读产品和数据摘要。
- `/evidence-archive.json`：A 类案例证据归档清单，列出原始证据、公开产物、快照目标、来源 host 和归档缺口。
- `/evidence-archive-history.json`：证据快照进度历史，记录批次节点和当前数据截点快照覆盖率。
- `/sitemap.xml`：静态站点地图。

## 自动化链路

```text
Hermes -> 飞书结构化主表 -> sync-feishu.mjs -> site/src/data/*.json -> Astro -> Vercel
```

维护原则：

- Hermes 负责补充公开可核验案例候选，也可以生成 Wiki/云文档模型卡草稿。
- 飞书结构化主表保留人工可检查的数据主表；只有主表记录会被 `sync-feishu.mjs` 常规发布。
- 如果官方来源已确认但主表尚未补写，可以在模型数据中标记 `sourceKind: "official_patch"` 与 `preserveOnFeishuSync: true`，作为临时发布补丁；等主表写入同 ID 后会自然接管。
- 本地 JSON 是 Astro 构建输入。
- A 类案例必须有真实使用者、明确任务、原始证据 URL、公开产物 URL 和模型贡献说明。
- B/C/D 案例不会进入对外精选展示。

## 技术栈

- Astro
- TypeScript
- Tailwind CSS
- `@lucide/astro`
- Playwright visual QA
- JSON content source
- Static generation

## 常用命令

```bash
npm install
npm run check
npm run qa:content
npm run qa:evidence
npm run build
npm run qa:visual
npm run qa:ci
```

`npm run check` 会执行 Astro 类型检查、内容一致性 QA 和证据归档清单 QA；内容 QA 会用 `site/src/data/metrics.json`、`models.json`、`cases.json` 和 `evidence-archive.json` 校验 README 中的模型数、案例数、数据截点、路由、旧文案残留、孤儿 A 类案例、模型 `aCaseCount` 聚合一致性，以及 680 条 A 类案例是否全部进入证据归档清单。`npm run qa:ci` 是本地和 GitHub Actions 共用的完整产品质量门禁：生产构建 + Playwright 视觉 QA。

CI 工作流位于 `.github/workflows/model-atlas-quality.yml`，会在 push、pull request 和手动触发时运行 `npm run qa:ci`，并上传 `site/visual-qa` 的截图和报告。

数据维护命令：

```bash
npm run sync:feishu
npm run evidence:backfill
npm run hermes:tasks
npm run evidence:archive
npm run evidence:snapshot -- --host github.com --limit 8
npm run atlas:auto
npm run atlas:pipeline
```

`npm run atlas:auto` 只适合本地验证数据生成顺序，不负责加锁或推送。云端生产入口使用 `npm run atlas:pipeline`，它会获取 pipeline 锁、先同步最新仓库代码，再执行数据同步、backfill、Hermes task 导出、证据归档、构建和可选 GitHub push。

`npm run evidence:snapshot` 会把证据快照写入 `archive/evidence/{caseId}/`。推荐按 host 和 limit 分批执行，例如先处理 `github.com` 的高优先级案例，再运行 `npm run evidence:archive` 刷新 `site/src/data/evidence-archive.json` 和 `site/src/data/evidence-archive-history.json`。`/updates` 会展示按 host 聚合的下一批证据快照队列，并给出可直接执行的建议命令。快照记录包含 HTTP 状态、最终 URL、内容类型、ETag、Last-Modified、内容哈希、页面标题，以及 GitHub repo / npm registry 这类来源的结构化元数据；默认不保存外部网页正文。

链接检查：

```bash
npm run check:links
```

`npm run check:links` 是维护检查，不是构建门禁。部分官网可能因访问策略或反爬返回 403，必须人工复核后才能加入 allowlist。

## 本地预览

```bash
cd site
npm run dev -- --host 127.0.0.1 --port 4321
```

生产构建预览：

```bash
cd site
npm run build
npx astro preview --host 127.0.0.1 --port 4321
```

如果 4321 被占用，使用终端输出的实际端口。

## 证据规则

案例进入对外精选展示，必须满足：

- 能绑定到具体模型。
- 有明确使用者、团队、组织、产品或仓库。
- 有明确任务。
- 有公开的原始证据 URL。
- 有公开的产物 URL。
- 能说明模型在任务中的贡献。
- 能区分真实使用案例，而不是 benchmark、发布文章、教程或模型列表。

证据等级：

- `A`：公开可核验的真实使用案例，可进入精选展示。
- `B`：有价值但绑定较弱或证据不足的候选，不进入精选展示。
- `C`：背景材料。
- `D`：证据不足或不采用。

## 对比工作台

`/compare` 应作为选型工具使用，而不是普通表格：

1. 先看证据强度、A 类案例数和 A+ 完整链路。
2. 再看证据快照覆盖率，确认代表案例是否已经完成本地快照。
3. 再看任务适配，尤其是 Coding Agent 信号。
4. 继续复核风险备注、数据缺口、价格、上下文和平台生态。
5. 使用“复制当前对比”分享 URL 状态。
6. 使用“复制研究包”把推荐理由、证据依据、模型排名、代表证据和下一步复核链接带出网站。

## 机器可读入口

- `/llms.txt`：为 AI 工具提供站点摘要、可信边界、核心路由、证据规则和推荐入口。
- `/atlas.json`：提供 counts、routes、featuredModels、recentCases 和 evidenceTrust 摘要。
- `/evidence-archive.json`：提供 A 类案例归档清单、证据 URL、公开产物 URL、证据指纹、快照目标、来源 host、当前归档缺口和 `snapshotIssues` 原因分类。
- `/evidence-archive-history.json`：提供证据快照历史节点、当前数据截点快照覆盖率和待快照压力。
- `/command-index.json`：全站检索索引，按需加载，不进入首页首屏 HTML。

当前证据快照状态：

- 归档清单覆盖：680 / 680 条 A 类精选案例。
- 证据目标：1365 个。
- 已完成快照：601 条案例。
- 待快照：79 条案例。
- 需关注快照：0 条案例。
- 当前主要待处理原因：未开始抓取，79 条案例 / 160 个证据目标 / 42 条高优先级案例。

案例库可用 `snapshot` 参数筛选快照状态：

- `/cases?snapshot=snapshotted`：查看已完成本地证据快照的案例。
- `/cases?snapshot=pending_snapshot`：查看仍在快照队列中的案例。
- `/cases?snapshot=partial_snapshot`：查看只完成部分目标的案例。
- `/cases?snapshot=snapshot_attention`：查看需要人工复核快照状态的案例。

## QA 状态

最新设计 QA 记录：

```text
site/design-qa.md
site/visual-qa/auto-visual-qa-report.md
```

当前门禁：

- `npm run check`: passed
- `npm run qa:content`: passed
- `npm run qa:evidence`: passed
- `npm run build`: passed
- `npm run qa:visual`: passed
- 当前阻塞 P0/P1/P2：无

## 维护提醒

- 不要把 `Archive` / `Hold` 模型计入活跃模型补齐目标。
- 不要把 Artificial Analysis 当作唯一事实来源。
- 不要为了页面好看而隐藏数据缺口。
- 不要把未核验案例提升为 A 类精选。
- 每次新增或修改 A 类案例后都要运行 `npm run evidence:archive`，再运行 `npm run qa:evidence` 确认归档清单未过期。
- 每次完成一批证据快照后都要重新运行 `npm run evidence:archive`，让 `/evidence-archive.json` 反映最新 `snapshottedCases`、`pendingSnapshotCases` 和 `snapshotAttentionCases`。
- 每次数据刷新后都要检查 `site/src/data/metrics.json`，确认活跃模型缺口为 `0`，再运行构建和视觉 QA。
