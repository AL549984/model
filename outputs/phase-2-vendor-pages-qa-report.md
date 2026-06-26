# Phase 2 Vendor Pages QA Report

> 检查对象：`outputs/vendors/` 厂商页 2.0  
> 检查日期：2026-06-25  
> 结论：PASS for vendor-page batch skeleton; model-card expansion not performed.

## 1. 交付物检查

| 交付物 | 状态 | 说明 |
|---|---|---|
| `outputs/vendors/` 目录 | PASS | 已创建 |
| 15 个 canonical 厂商页 | PASS | 覆盖 OpenAI、Anthropic、Google、DeepSeek、Qwen、xAI、Kimi、Meta、MiniMax、Z AI、Upstage、Xiaomi、MBZUAI IFM、StepFun、ByteDance Seed |
| `outputs/vendors/index.md` | PASS | 提供厂商索引和节点处理说明 |
| `outputs/phase-2-vendor-pages-qa-report.md` | PASS | 本文件 |

## 2. 实际厂商节点数量和处理方式

| 来源 | 观察 | 处理 |
|---|---|---|
| Phase 0 蓝图 | Wiki 树直接厂商/厂商式节点 16 个，其中 `Claude` 出现两次 | 合并为 `anthropic` canonical vendor |
| Bitable 标题 | `Artificial Analysis 14厂商视觉Step拐点` | 作为数据表命名保留，不强行让文件数等于 14 |
| Wiki 额外节点 | ByteDance Seed 有 1 个子卡 | 创建 `bytedance-seed.md` |
| 本次 canonical 输出 | 15 家厂商 | 与用户列出的 15 项一致 |

## 3. 字段合规检查

每个厂商页均包含以下 18 个冻结字段：

1. `vendor_id`
2. `vendor_name`
3. `display_name`
4. `canonical_slug`
5. `official_site`
6. `model_families`
7. `flagship_models`
8. `timeline`
9. `key_inflection_points`
10. `strengths`
11. `weaknesses`
12. `pricing_strategy`
13. `ecosystem`
14. `case_library_status`
15. `recommended_use_cases`
16. `avoid_when`
17. `source_links`
18. `page_status`

## 4. 人类可读结构检查

每个厂商页均包含：

- `30 秒判断`
- `模型路线`
- `模型时间线`
- `关键拐点`
- `当前代表模型`
- `适合使用场景`
- `不适合使用场景`
- `案例库状态`
- `风险和限制`
- `数据字段`
- `相关链接`

## 5. 本阶段约束检查

| 约束 | 状态 | 说明 |
|---|---|---|
| 不做 107 个模型卡批量升级 | PASS | 只生成 vendor pages |
| 不改旧模型卡 | PASS | 未编辑旧 Wiki 或旧卡文件 |
| 不删除旧文档 | PASS | 无删除操作 |
| 不把集合页当原始证据 | PASS | 厂商页只用 source_links，不创建 A 类案例 |
| 不把 benchmark/教程/介绍文当案例 | PASS | case_library_status 均为状态说明，未创建案例库 |
| 使用 Phase 1.5 标准 | PASS | 字段来自 `vendor-field-template.md`，ID/发布门槛沿用冻结规范 |

## 6. 厂商页状态分布

| page_status | 数量 | 厂商 |
|---|---:|---|
| publishable | 1 | Anthropic / Claude |
| review | 12 | OpenAI, Google, DeepSeek, Qwen, xAI, Kimi, Meta, MiniMax, Z AI, Xiaomi, StepFun, ByteDance Seed |
| limited | 2 | Upstage, MBZUAI IFM |

## 7. 案例库状态分布

| case_library_status | 数量 | 厂商 |
|---|---:|---|
| usable | 1 | Anthropic / Claude |
| platform_only | 13 | OpenAI, Google, DeepSeek, Qwen, xAI, Kimi, Meta, MiniMax, Z AI, Upstage, Xiaomi, StepFun, ByteDance Seed |
| archive_only | 1 | MBZUAI IFM |

备注：上表 intentionally conservative。Phase 2 没有为其他厂商建立 A 类案例库，因此不把任何厂商包装成 `rich`。

## 8. 后续风险

1. 大多数厂商页为 `review`，需要人工确认 timeline、source_links 和代表模型。
2. OpenAI、Google、xAI、Kimi、MiniMax、ByteDance Seed 等模型更新很快，需要定期复查官方 docs。
3. 厂商页中代表模型不是模型卡升级结果，不能直接视为最终模型页。
4. ByteDance Seed 是额外 canonical 节点；如果后续产品决定只保留 14 家，需要在 index 中标记为 optional。
5. Upstage 和 MBZUAI IFM 的案例库薄弱，进入 Phase 3 时应优先判为 Limited 或 Archive only。

## 9. 是否可以进入下一阶段

可以进入 Phase 2 人工复核和 Phase 3 P0 模型卡候选选择，但不能直接全量升级 107 卡。

建议下一步：

1. 人工抽查每个 vendor page 的 official_site 和 source_links。
2. 从 `flagship_models` 中为 Phase 3 选择每家 1-2 个 P0 模型。
3. 先为 P0 模型建立 evidence intake rows，再写模型卡 2.0。
