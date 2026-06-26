# Evidence Snapshot Policy

> Phase 1.5 deliverable  
> Purpose: 让案例证据在进入批量扩展前可追溯、可复核、可恢复。  
> Applies to: 所有 evidence_grade 为 A 或 B 的证据；C/D 可按风险选择性归档。

## 1. 什么来源必须做快照？

| 来源类型 | 是否必须快照 | 快照内容 |
|---|---:|---|
| Reddit / 社区帖子 | 是 | 帖子正文、作者、时间、链接、评论中关键补充、外链 artifact |
| X / Twitter | 是 | 原帖截图、线程全文、作者主页片段、外链、时间戳 |
| GitHub repo | 是 | README、repo metadata、commit SHA、release、关键文件树、license、demo 链接 |
| GitHub PR / Issue | 是 | PR/Issue 标题、作者、正文、关键评论、commit list、merge 状态 |
| Live demo / product page | 是 | 首屏截图、可运行截图、URL、访问时间、必要时录屏 |
| YouTube / 视频 | 是 | 视频 URL、标题、作者、发布时间、关键时间点、截图、转写摘要 |
| 官方博客 / docs | 是 | 标题、发布日期、正文关键段落、模型 ID、价格、限制、更新注记 |
| benchmark / evaluation | 推荐 | 结果表、方法说明、样本范围、作者、发布日期 |
| 集合页 / awesome list | 可选 | 仅作为 discovery snapshot，不得作为 original evidence |

## 2. X / Twitter 如何处理？

1. X 链接不稳定，所有 X 线索默认 review_status 为 needs_snapshot。
2. 快照必须包含完整线程，不只截第一条。
3. 如果原帖引用了 demo、repo、视频或产品页，必须把外链拆成独立证据行。
4. X 帖可以作为 original_evidence_url，但只有在满足具体主体、任务、产物三个条件时才可能是 A。
5. 只有转述、观点、榜单、营销短句的 X 帖最多为 C。
6. 删除、锁定、不可访问或只剩截图转载的 X 线索，降为 D，除非已有可信快照和可核验 artifact。

## 3. GitHub repo 如何处理？

| 对象 | 快照要求 |
|---|---|
| Repo 首页 | 保存 README、description、stars/forks、默认分支、license、最后 commit SHA |
| 关键文件 | 保存 README、CHANGELOG、CLAUDE.md、AGENTS.md、prompt.md、demo.mp4 或 docs 中与模型贡献有关的文件 |
| Commit | 记录采集时 default branch HEAD SHA |
| Release | 如果 artifact 是 release 包，保存 release URL、tag、assets 列表 |
| Demo | 如果 README 链接 live demo，另建 artifact 快照，不能只保存 repo |
| 模型声明 | README 中的 “Built with Claude Fable 5” 或类似声明需截图或保存文本 |

GitHub repo 可以同时作为 original_evidence_url 和 artifact_url，但只适用于 repo 本身就是产物的情况，例如开源工具、代码库、PR。

## 4. 视频案例如何记录时间点？

视频类证据必须记录：

| 字段 | 规则 |
|---|---|
| video_url | 原始视频 URL |
| source_platform | YouTube、Bilibili、X Video 等 |
| key_timestamps | 至少列出模型声明、任务说明、产物展示三个时间点 |
| artifact_url | 如果视频展示的是外部 demo/repo，必须另填 demo/repo URL |
| transcript_status | manual_summary、auto_transcript、no_transcript |
| screenshot_pack_url | 至少保存 3 张截图：标题页、模型声明、产物展示 |

没有具体时间点的视频不能作为 A 类案例，只能作为 C 类背景或 D 类线索。

## 5. 官方博客如何存档？

官方博客和 docs 主要用于模型事实，不直接作为真实案例。

必须保存：

1. 页面 URL。
2. 发布日期和更新日期。
3. 模型 ID、上下文、输出、价格、可用地区、数据保留、安全限制。
4. 客户评价的原文位置。
5. 如果页面有后续政策更新或暂停访问说明，必须单独记录 update_note。

官方博客中的客户评价只能作为 customer_quote 或 B 类线索，不能直接升级为 A，除非能追到客户自己的案例页、repo、demo 或产品页。

## 6. 如果原始 URL 失效怎么办？

| 情况 | 处理 |
|---|---|
| 原始 URL 失效但有可信快照 | original_evidence_url 保留原链接，evidence_snapshot_url 填快照，url_status 填 dead，review_status 改 needs_review |
| 原始 URL 重定向到无关页面 | 降为 D，除非已有采集时快照证明原内容 |
| 原始 URL 删除，artifact 仍可访问 | 降级为 B 或 D，视 artifact 是否自带模型声明 |
| artifact URL 失效，原帖仍可访问 | A 降为 B，直到补到新 artifact 或快照 |
| 原帖和 artifact 都失效 | 降为 D，不进入页面，只保留审计记录 |

## 7. 快照 URL 放在哪个字段？

| 字段 | 用法 |
|---|---|
| evidence_snapshot_url | 原始证据的归档、截图包或保存副本 |
| artifact_snapshot_url | 产物、demo、repo、视频的归档或截图包 |
| discovery_snapshot_url | 集合页或搜索结果的临时快照，不用于案例证明 |

如果当前系统只有一个字段，统一放在 evidence_snapshot_url，并在 review_notes 中说明包含哪些内容。

## 8. 什么时候不能收录？

以下情况不能作为案例收录：

1. 只有集合页，没有原始 URL。
2. 只有 benchmark，没有具体使用者产物。
3. 只有教程或介绍文，没有具体项目结果。
4. 只有 “built with Fable” 标题，但页面没有任务、产物或作者信息。
5. URL 打开后重定向到无关内容。
6. 内容需要登录且无法保存快照。
7. 涉及明显侵权、恶意、隐私泄露或无法合规展示的产物。
8. 只有模型供应商的宣传语，无法追到客户自己的证据。

## 9. 如何避免只剩集合页而没有原始证据？

1. 集合页只能进入 discovery_source_url。
2. original_evidence_url 必须是作者原帖、repo、PR、issue、产品页、视频页或官方案例页。
3. 每条从集合页发现的线索都要拆成独立 evidence row。
4. 如果集合页声称有案例但外链不可访问，证据等级为 D。
5. QA 报告必须统计 “collection-only rejected count”。

## 10. Claude Fable 5 当前快照优先级

| 优先级 | 证据 | 快照内容 |
|---|---|---|
| P0 | LAAS repo + demo | README、HEAD SHA、demo 截图、STATUS.md 摘要 |
| P0 | Backrooms Reddit + repo + demo | Reddit 原帖、GitHub README、Vercel 截图 |
| P0 | Cube Survivor Reddit + demo | Reddit 原帖、Vercel 截图 |
| P0 | World of ClaudeCraft Reddit + repo + site | Reddit 原帖、repo README、site 截图 |
| P0 | Midwinter remaster Reddit + video + project site | Reddit 原帖、视频时间点、项目站截图 |
| P1 | Claude Citizen repo + site + video | README、release video、site 截图 |
| P1 | VibePinball repo + demo | README、demo 截图 |
| P1 | ComfyUI KJNodes PR | PR 正文、作者评论、commit list、merge/reference 状态 |
