# Vendor Pages Index

> Phase 2 deliverable  
> Scope: 厂商页 2.0 导航骨架，不升级 107 个模型卡，不修改旧 Wiki。

## 覆盖范围

本批次生成 15 个 canonical 厂商页。Phase 0 蓝图记录 Wiki 树下有 16 个厂商式节点，其中 `Claude` 出现重复分支；Bitable 标题称 14 厂商，但 Wiki 额外出现 ByteDance Seed 节点。本批次处理方式：

- Claude 重复分支合并为 canonical vendor_id：`anthropic`。
- ByteDance Seed 作为额外 canonical vendor_id：`bytedance-seed` 收录。
- 不删除旧文档，不修改旧模型卡。

## 厂商页列表

| Vendor | vendor_id | 文件 | Wiki 子卡数参考 | page_status | case_library_status |
|---|---|---|---:|---|---|
| OpenAI | `openai` | [openai.md](./openai.md) | 14 | review | platform_only |
| Anthropic / Claude | `anthropic` | [anthropic.md](./anthropic.md) | 20 | publishable | usable |
| Google / Gemini | `google` | [google.md](./google.md) | 29 | review | platform_only |
| DeepSeek | `deepseek` | [deepseek.md](./deepseek.md) | 14 | review | platform_only |
| Qwen / Alibaba | `qwen-alibaba` | [qwen-alibaba.md](./qwen-alibaba.md) | 14 | review | platform_only |
| xAI / Grok | `xai` | [xai.md](./xai.md) | 8 | review | platform_only |
| Kimi / Moonshot AI | `kimi` | [kimi.md](./kimi.md) | 6 | review | platform_only |
| Meta / Llama | `meta` | [meta.md](./meta.md) | 6 | review | platform_only |
| MiniMax | `minimax` | [minimax.md](./minimax.md) | 6 | review | platform_only |
| Z AI / GLM | `z-ai` | [z-ai.md](./z-ai.md) | 6 | review | platform_only |
| Upstage / Solar | `upstage` | [upstage.md](./upstage.md) | 4 | limited | platform_only |
| Xiaomi / MiMo | `xiaomi` | [xiaomi.md](./xiaomi.md) | 3 | review | platform_only |
| MBZUAI IFM / K2 | `mbzuai-ifm` | [mbzuai-ifm.md](./mbzuai-ifm.md) | 2 | limited | archive_only |
| StepFun / Step | `stepfun` | [stepfun.md](./stepfun.md) | 6 | review | platform_only |
| ByteDance Seed | `bytedance-seed` | [bytedance-seed.md](./bytedance-seed.md) | 1 | review | platform_only |

## 后续入口

- Phase 2 之后可以进入厂商页人工复核：source_links、timeline、case_library_status。
- Phase 3 只能挑 P0 模型，不做全量 107 卡升级。
- 每个模型卡升级前必须先有 `model_id`、`family_id`、source_links 和 evidence intake rows。
