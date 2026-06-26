# Phase 1.5 QA Report

> 检查对象：Anthropic / Claude Fable 5 样板补强与标准冻结  
> 检查日期：2026-06-25  
> 结论：ready for batch expansion, with monitored risks

## 1. 本阶段交付物检查

| 交付物 | 文件 | 状态 | 说明 |
|---|---|---|---|
| 统一证据抓取表 | `evidence-intake-table-schema.md` | PASS | 包含字段名、类型、必填、示例、用途、自动抓取、人工审核 |
| 案例快照归档规则 | `evidence-snapshot-policy.md` | PASS | 覆盖 Reddit、X、GitHub、视频、官方博客、失效 URL、集合页拦截 |
| 厂商字段模板 | `vendor-field-template.md` | PASS | 字段冻结，并给出 Anthropic YAML 示例 |
| 模型谱系 ID 规范 | `model-lineage-id-spec.md` | PASS | 解决版本、变体、slug、URL、案例关联、旧 Wiki 映射、Claude 重复分支、AA ID |
| 最低可发布模型卡标准 | `minimum-publishable-model-card-standard.md` | PASS | 定义 Publishable / Limited / Archive only 和 gate |
| Claude Fable 5 案例库 v2 | `claude-fable-5-case-library-v2.md` | PASS | A/B/C/D 严格分区，A 类从 2 条扩展到 8 条 |
| Phase 1.5 自检 | `phase-1-5-qa-report.md` | PASS | 本文件 |

## 2. Phase 1 caveats 是否解决

| Phase 1 caveat | Phase 1.5 处理 | 状态 |
|---|---|---|
| Claude Fable 5 公开 A 类案例太少 | v2 案例库从 2 条 A 类扩展到 8 条 A 类 | Resolved |
| 企业生产级案例证据不足 | 标准中不把企业生产案例设为 Publishable 必需项；在风险中单独标注 | Partially resolved |
| 缺统一证据抓取表 | 新增 `evidence-intake-table-schema.md` | Resolved |
| 缺案例快照归档 | 新增 `evidence-snapshot-policy.md`，并指定 Claude Fable 5 P0/P1 快照优先级 | Resolved as policy |
| 厂商字段模板未冻结 | 新增 `vendor-field-template.md` | Resolved |
| 模型谱系 ID 规范未冻结 | 新增 `model-lineage-id-spec.md` | Resolved |
| 每个模型最低可发布证据门槛未定义 | 新增 `minimum-publishable-model-card-standard.md` | Resolved |

## 3. Claude Fable 5 A/B/C/D 案例数量

| 等级 | 数量 | 是否进入模型卡精选 | 说明 |
|---|---:|---:|---|
| A | 8 | 4 条建议精选 | 具体项目/PR/demo，均有 original_evidence_url 和 artifact_url |
| B | 5 | 否 | 平台接入、工作流工具、集合型项目 |
| C | 4 | 否 | 官方资料、docs、benchmark、开发者观察 |
| D | 6 | 否 | 集合页、错页、不可核验线索 |

## 4. 弱证据混入检查

| 检查项 | 结果 |
|---|---|
| 集合页是否作为 original_evidence_url | PASS，集合页只进入 B/D 或 discovery_source_url 概念 |
| benchmark 是否作为真实案例 | PASS，Endor Labs 等只标 C |
| 教程/介绍文是否作为案例 | PASS，教程/overview 不进入 A |
| 平台接入是否进入精选 | PASS，GitHub Copilot、Foundry、TrueFoundry 均为 B |
| 错页/重定向是否剔除 | PASS，BlockScape、RedPandaOS、Portfolio、Pebble 等搜索线索标 D |
| A 类是否都有 artifact_url | PASS，8 条 A 类均有 demo/repo/PR/video/product URL |

## 5. 是否仍有不适合全量扩展的风险

| 风险 | 影响 | 控制方式 |
|---|---|---|
| A 类案例仍以开发者 demo 为主 | 不能用来证明企业生产成熟度 | 模型卡只说公开案例表现，不写企业生产结论 |
| 部分 A 类模型贡献来自作者自述 | 存在夸大风险 | 快照 README/帖子，并在 risk_notes 标明 |
| Live demo 可能下线 | 页面证据失效 | P0 快照 demo 截图/录屏 |
| Reddit/X 可访问性不稳定 | 原帖可能删除或重定向 | evidence_snapshot_url 必填 |
| 游戏类案例偏多 | 容易让模型卡能力面单一 | 精选只选 2 个游戏/视觉工程，加入逆向工程和开源 PR |
| 政策/可用性波动 | Fable 5 页面可能过时 | 页面顶部保留 availability note，并定期复查官方 docs |

## 6. Claude Fable 5 样板是否可作为模板

结论：可以。

理由：

1. 标准文件已覆盖证据表、快照、厂商字段、模型 ID、发布门槛。
2. 案例库 v2 不再停留在 2 条 A 类，且明确剔除了搜索摘要里不可核验的线索。
3. A/B/C/D 的写法可复制到其他模型。
4. Publishable / Limited / Archive only 的门槛能防止全量扩展时把弱证据包装成强结论。
5. Claude 重复 Wiki 卡、AA ID 并存、variant 命名等迁移问题已有规范。

## 7. 还需要人工确认的地方

| 项目 | 人工动作 |
|---|---|
| A 类案例快照 | 保存 Reddit、GitHub、demo、视频截图包，并回填 evidence_snapshot_url |
| Demo 可用性 | 人工打开 LAAS、Backrooms、Cube Survivor、World of ClaudeCraft、Claude Citizen、VibePinball |
| GitHub HEAD SHA | 记录每个 repo 采集时 commit SHA |
| Midwinter 合规 | 确认逆向工程/旧游戏 IP 风险表述 |
| ComfyUI PR 状态 | 确认 PR 是否合并、是否进入上游 release |
| Fable 5 availability | 对照 Anthropic docs、GitHub changelog、Microsoft Foundry 更新 |
| 旧 Wiki 映射 | 确认两个 Claude Fable 5 卡哪一个是 primary，另一个标 duplicate |

## 8. 是否可以进入 Phase 2 厂商页扩展

可以，但应按以下 gate 执行：

1. 每个厂商先填 `vendor-field-template.md`。
2. 厂商页 page_status 至少为 review。
3. case_library_status 必须显式标注 rich、usable、thin、platform_only 或 archive_only。
4. 不允许把厂商官方客户评价直接写成 A 类案例。
5. 每个厂商页必须保留 source_links 和 archive links。

## 9. 是否可以进入 Phase 3 P0 模型卡升级

可以，但仅限 P0 模型，并按 `minimum-publishable-model-card-standard.md` 分级：

1. Publishable 模型可以做完整 Model Atlas 2.0 卡。
2. Limited 模型可以建页，但顶部必须提示案例不足。
3. Archive only 模型只做旧资料整理，不进入传播型页面。
4. 每个模型升级前必须先有 model_id 和 evidence intake rows。

## 10. 最终结论

Anthropic / Claude Fable 5 样板已从 “PASS with caveats” 提升为 “ready for batch expansion, with monitored risks”。

不是所有风险都被消灭了，但关键失控点已经被标准化：

1. 案例不够的问题通过重新检索扩展到 8 条 A 类。
2. 企业生产案例不足被转成风险提示和发布门槛，而不是硬凑结论。
3. 证据、快照、厂商字段、模型 ID、发布等级都已冻结。
4. 后续可以进入 Phase 2 / Phase 3，但必须先执行快照回填和人工复核。
