# Minimum Publishable Model Card Standard

> Phase 1.5 deliverable  
> Purpose: 定义模型卡最低发布门槛，避免全量扩展时把旧资料摘要包装成新版模型卡。  
> Applies to: 所有 Model Atlas 2.0 模型详情页。

## 发布等级总览

| 等级 | 是否进入网站正式模型页 | 是否可传播 | 页面提示 |
|---|---:|---:|---|
| Publishable | 是 | 是 | 无需顶部警告，但仍显示风险 |
| Limited | 是 | 有限制 | 必须提示公开案例不足或证据限制 |
| Archive only | 否，或只在 Archive 区出现 | 否 | 旧资料，仅供追溯 |

## Publishable

可以进入网站正式模型页。

### 必须满足的条件

| 条件 | 要求 |
|---|---|
| 官方资料 | 至少有官方发布资料、官方 docs、system card 或等价一手资料 |
| 基本信息 | 厂商、模型名、model_id、发布日期或发布日期状态、输入/输出模态、上下文、价格或访问方式完整 |
| 模型谱系 | 有 family_id、前代/同代/变体位置 |
| 能力判断 | 至少 3 个可解释的能力判断，不只堆 benchmark |
| 案例证据 | 至少 1 个可核验 A 类案例；如果无公开 A 类，必须有足够官方资料且页面显著说明 “暂无公开可核验案例” |
| 场景建议 | 有适合场景和不适合场景 |
| 对比 | 有前代或竞品对比 |
| 风险 | 有成本、可用性、安全、数据、幻觉或可靠性风险说明 |
| 来源 | 来源链接完整，至少分官方、案例、评测/背景三类 |
| QA | QA 报告为 PASS 或 PASS with disclosed limitations |

### 不允许的情况

1. 只从旧 Wiki 摘要改写。
2. 只有 benchmark，没有使用案例或明确缺口说明。
3. source_links 只有集合页。
4. 无 model_id 或谱系位置。
5. 关键事实无法追到来源。

## Limited

可以有模型页，但必须提示公开案例不足。

### 适用条件

| 条件 | 要求 |
|---|---|
| 官方资料 | 有官方资料或高可信平台资料 |
| 基本信息 | 大部分完整，少数字段可 pending |
| 案例证据 | 0 个 A 类，但有 B/C 证据；或只有 1 个较弱 A 类 |
| 模型谱系 | 有基本谱系位置 |
| 风险提示 | 页面顶部必须提示证据限制 |
| 传播限制 | 不进入首页强推荐，不做夸张能力标题 |

### 页面必须写明

```text
公开可核验案例不足：本页基于官方资料、平台接入和有限公开线索整理，真实生产表现仍需后续案例补证。
```

## Archive only

只保留旧资料，不进入传播型模型卡。

### 适用条件

| 情况 | 处理 |
|---|---|
| 无官方资料 | Archive only |
| 只有旧 Wiki 摘要 | Archive only |
| 只有集合页/SEO/教程 | Archive only |
| 模型名不稳定或无法确认 | Archive only |
| 已被替代且无独立价值 | Archive only |
| 重复卡 | duplicate -> archive reference |
| 来源已失效且无快照 | Archive only 或 rejected |

Archive only 页面只允许包含：

1. 原始旧 Wiki 回链。
2. 已知事实摘要。
3. 不发布原因。
4. 后续补证要求。

## 发布 gate

| Gate | Publishable | Limited | Archive only |
|---|---:|---:|---:|
| 官方或一手资料 | 必须 | 必须或高可信替代 | 可缺 |
| model_id | 必须 | 必须 | 推荐 |
| family_id | 必须 | 必须 | 可缺 |
| 基本信息完整 | 必须 | 大部分 | 可缺 |
| A 类案例 | 至少 1 个，或显著说明无公开案例但官方资料足够 | 0-1 个 | 0 个 |
| B/C 证据分区 | 必须 | 必须 | 推荐 |
| 风险说明 | 必须 | 必须 | 必须 |
| 来源链接 | 必须 | 必须 | 至少旧 Wiki |
| QA 报告 | 必须 | 必须 | 推荐 |

## Claude Fable 5 判定

| 项目 | 状态 |
|---|---|
| 官方资料 | 通过，Anthropic release + Claude API docs |
| 基本信息 | 通过，发布日期、API ID、上下文、输出、价格、保留策略已记录 |
| 谱系位置 | 通过，Claude 5 / Mythos-class |
| A 类案例 | 通过，v2 案例库中有多个可核验公开项目 |
| 企业生产案例 | 不充分，作为风险提示而不是发布阻塞 |
| 风险说明 | 通过，成本、fallback、数据保留、政策可用性均已记录 |
| 发布等级 | Publishable |

## 批量扩展前的硬性规则

1. 每张新模型卡必须先填 model_id、family_id 和 page_status。
2. 没有 evidence intake row 的模型不能标为 Publishable。
3. 没有 source_links 的模型不能标为 Limited 以上。
4. 案例少不是问题，隐瞒案例少才是问题。
5. 如果只有平台上架公告，应标为 Limited 或 Archive only，不得包装成真实案例。
