# Claude Fable 5 Case Library v2

> Phase 1.5 deliverable  
> Model: Claude Fable 5  
> model_id: `claude-fable-5`  
> vendor_id: `anthropic`  
> Case library path: `/cases/models/claude-fable-5`  
> Collected at: 2026-06-25

## 分级规则

| Grade | 是否可进入模型卡精选 | 定义 |
|---|---:|---|
| A | 是 | 有具体使用者/作者、具体任务、具体产物、原始证据 URL，且 artifact_url 或 artifact_type 可核验 |
| B | 否 | 平台接入、产品支持、工作流工具或集合型项目，有主体但缺少具体终端使用结果 |
| C | 否 | benchmark、评测、教程、介绍、开发者观察 |
| D | 否 | 集合页、错页、失效、无原始证据、只有搜索摘要、不可核验 |

## A 类案例

### A1. LAAS WebGPU Open World

| 字段 | 内容 |
|---|---|
| case_id | cf5-case-laas-webgpu-world |
| case_title | LAAS: 4x4km procedural WebGPU open world |
| user_or_org | Braffolk |
| original_evidence_url | https://github.com/Braffolk/fable5-world-demo |
| artifact_url | https://dc5fzrbo8ssfx.cloudfront.net/laas/ |
| source_platform | GitHub |
| task_category | agentic_coding; webgpu; threejs; procedural_world |
| task_description | 构建浏览器中运行的 4x4km 程序化开放世界，包括地形、植被、光照、云、QA 和性能验证 |
| output_result | 公开 GitHub repo、公开 demo、README 说明项目约 99% 由 Fable 5 构建 |
| model_contribution | README 称模型完成架构、引擎、世界系统、验证工具、调试和工作记录 |
| evidence_grade | A |
| selected_for_model_card | true |
| risk_notes | 模型贡献比例来自作者自述；需要保存 README、HEAD SHA、demo 截图和 STATUS.md 快照 |

### A2. Backrooms Escape

| 字段 | 内容 |
|---|---|
| case_id | cf5-case-backrooms-escape |
| case_title | Backrooms Escape browser horror game |
| user_or_org | StarKnightt |
| original_evidence_url | https://www.reddit.com/r/ClaudeAI/comments/1u29a22/claude_fable_5_built_an_entire_backrooms_escape/ |
| artifact_url | https://backroom-escape.vercel.app/ ; https://github.com/StarKnightt/Backroom-Escape |
| source_platform | Reddit; GitHub; Vercel |
| task_category | agentic_coding; browser_game; nextjs; threejs |
| task_description | 构建可玩的第一人称 Backrooms survival horror 浏览器游戏 |
| output_result | 公开 Reddit 原帖、GitHub repo、Vercel demo；README 描述玩法、程序化资产、声音、移动端和测试 |
| model_contribution | Reddit 标题和 repo 描述均指向 Claude Fable 5；具体贡献比例仍来自作者自述 |
| evidence_grade | A |
| selected_for_model_card | false |
| risk_notes | 需要保存 Reddit 原帖和 demo 运行截图；模型参与程度无第三方独立复核 |

### A3. Cube Survivor

| 字段 | 内容 |
|---|---|
| case_id | cf5-case-cube-survivor |
| case_title | Cube Survivor multiplayer survivor game |
| user_or_org | hiImMate |
| original_evidence_url | https://www.reddit.com/r/ClaudeAI/comments/1u4kjfd/fable_5_built_free_survivor_game/ |
| artifact_url | https://cubesurvivor.vercel.app/ |
| source_platform | Reddit; Vercel |
| task_category | browser_game; multiplayer; agentic_coding |
| task_description | 构建免费 survivor browser game，并带有作者描述的多人联机能力 |
| output_result | Reddit 原帖提供 playable Vercel demo；作者称 “made entirely by Fable 5” |
| model_contribution | 作者称自己没有查看代码，项目完全由 Fable 5 制作 |
| evidence_grade | A |
| selected_for_model_card | false |
| risk_notes | 未找到 repo；artifact 为 live demo，必须保存截图/录屏；多人联机能力需人工复测 |

### A4. World of ClaudeCraft

| 字段 | 内容 |
|---|---|
| case_id | cf5-case-world-of-claudecraft |
| case_title | World of ClaudeCraft browser MMORPG |
| user_or_org | next-choken / levy-street |
| original_evidence_url | https://www.reddit.com/r/ClaudeAI/comments/1u3m6a8/i_vibe_coded_the_first_mmorpg_with_fable_5/ |
| artifact_url | https://worldofclaudecraft.com/ ; https://github.com/levy-street/world-of-claudecraft |
| source_platform | Reddit; GitHub; product_site |
| task_category | browser_game; mmorpg; multiplayer; procedural_generation |
| task_description | 用 Fable 5 构建可玩的 browser MMORPG，包括任务、职业、战斗、多人、服务器和开源代码 |
| output_result | Reddit 原帖、公开网站、公开 GitHub repo；README 说明 playable browser MMO、self-host 和 AI agent training |
| model_contribution | Reddit 原帖明确 “Used Fable to build a full blown MMORPG” |
| evidence_grade | A |
| selected_for_model_card | true |
| risk_notes | 项目规模较大，需快照 repo HEAD、README 和网站首屏；资产来源需在正式展示前复核 |

### A5. Midwinter DOS Game Reverse Engineering

| 字段 | 内容 |
|---|---|
| case_id | cf5-case-midwinter-dos-remaster |
| case_title | Midwinter 1989 DOS executable decoding and remaster workflow |
| user_or_org | PlayfulInterview984 |
| original_evidence_url | https://www.reddit.com/r/ClaudeAI/comments/1u34370/fable_5_decoded_an_entire_1989_dos_game/ |
| artifact_url | https://midwinter-remaster.titanium-helix.com ; https://youtu.be/PonvG2whtkc |
| source_platform | Reddit; project_site; YouTube |
| task_category | reverse_engineering; game_remaster; long_horizon_research |
| task_description | 对 1989 年 DOS 游戏可执行文件进行解包、反汇编、函数映射、算法复现和验证 |
| output_result | Reddit 原帖提供视频和 playable tech demo；作者称 Fable 5 overnight 解码 602 个函数并复现 terrain generator |
| model_contribution | 作者描述 Fable 5 通过 parallel agents、evidence ledger 和 bit-for-bit 验证完成关键解码 |
| evidence_grade | A |
| selected_for_model_card | true |
| risk_notes | 涉及旧游戏 IP 和逆向工程，展示时必须保留合法性/授权风险备注；视频需记录关键时间点 |

### A6. Claude Citizen

| 字段 | 内容 |
|---|---|
| case_id | cf5-case-claude-citizen |
| case_title | Claude Citizen browser space MMO prototype |
| user_or_org | huiung |
| original_evidence_url | https://github.com/huiung/claude-citizen |
| artifact_url | https://claudecitizen.com ; https://github.com/huiung/claude-citizen/releases/download/v0.7-cinematic/claude-citizen-showcase-1080p.mp4 |
| source_platform | GitHub; product_site; video |
| task_category | browser_game; space_sim; multiplayer; procedural_generation |
| task_description | 构建浏览器中的空间模拟 / MMO 原型，包含飞行、采矿、交易、战斗、聊天和多人 |
| output_result | 公开 repo、play now 网站、showcase video；README 声称 Built with Claude Fable 5 |
| model_contribution | repo 描述和 README 表明项目由 Claude Fable 5 构建 |
| evidence_grade | A |
| selected_for_model_card | false |
| risk_notes | 使用 “Star Citizen” 作比较对象，需注意商标/IP 风险；模型贡献仍为作者/README 自述 |

### A7. VibePinball

| 字段 | 内容 |
|---|---|
| case_id | cf5-case-vibepinball |
| case_title | VibePinball web-native pinball game |
| user_or_org | Randroids-Dojo |
| original_evidence_url | https://github.com/Randroids-Dojo/VibePinball |
| artifact_url | https://vibe-pinball.vercel.app/ |
| source_platform | GitHub; Vercel |
| task_category | browser_game; livestream_build; agentic_coding |
| task_description | 构建 web-native pinball game |
| output_result | 公开 GitHub repo、公开 Vercel demo；README 声称 Built with Claude Fable 5 while on stream |
| model_contribution | repo description 和 README 直接声明 Fable 5 参与构建 |
| evidence_grade | A |
| selected_for_model_card | false |
| risk_notes | repo star/activity 很低，需保存 demo 截图并尽量补直播原始链接 |

### A8. ComfyUI KJNodes Ideogram 4 Prompt Builder PR

| 字段 | 内容 |
|---|---|
| case_id | cf5-case-comfyui-ideogram-pr |
| case_title | Ideogram 4 Prompt Builder KJ V2 PR for ComfyUI-KJNodes |
| user_or_org | Pluventi / kijai/ComfyUI-KJNodes |
| original_evidence_url | https://github.com/kijai/ComfyUI-KJNodes/pull/668 |
| artifact_url | https://github.com/kijai/ComfyUI-KJNodes/pull/668 |
| source_platform | GitHub PR |
| task_category | open_source_pr; comfyui; image_tooling; gui |
| task_description | 为 ComfyUI KJNodes 添加 Ideogram 4 Prompt Builder V2，包括 freehand drawing、canvas tools、layer 管理和节点文件 |
| output_result | 公开 PR、commit list、作者评论和后续引用；评论中写明 Built with Claude Fable 5 |
| model_contribution | 作者评论称自己不会写代码、AI 写了 100% 代码，后续评论说明 Built with Claude Fable 5 |
| evidence_grade | A |
| selected_for_model_card | true |
| risk_notes | PR 质量作者自己也提示需开发者清理；进入精选时适合展示 “AI coding with human testing”，不是质量保证案例 |

## B 类证据

| case_id | case_title | user_or_org | original_evidence_url | artifact_url | source_platform | task_category | task_description | output_result | model_contribution | evidence_grade | selected_for_model_card | risk_notes |
|---|---|---|---|---|---|---|---|---|---|---|---:|---|
| cf5-signal-github-copilot | GitHub Copilot supports Claude Fable 5 | GitHub | https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/ | https://github.com/features/copilot | GitHub Blog | platform_integration | 在 Copilot 多入口开放 Fable 5 选择 | 官方 changelog，含访问和数据保留说明 | GitHub 称内部 benchmark 显示 autonomous coding workflows 更少工具调用和 tokens | B | false | 平台接入，不是终端用户案例；有暂停访问说明 |
| cf5-signal-microsoft-foundry | Microsoft Foundry offers Claude Fable 5 | Microsoft | https://azure.microsoft.com/en-us/blog/claude-fable-5-is-now-available-in-microsoft-foundry-powering-the-next-era-of-autonomous-agents/ | https://ai.azure.com/ | Azure Blog | platform_integration | 将 Fable 5 纳入 Foundry、Agent Service、Copilot 入口 | 官方 Azure Blog | 说明企业 agentic workflow 适用方向 | B | false | 平台可用性，不是客户生产结果 |
| cf5-signal-truefoundry-gateway | TrueFoundry AI Gateway supports Claude Fable 5 | TrueFoundry | https://www.truefoundry.com/blog/claude-fable-5-is-now-live-on-truefoundry-ai-gateway | https://www.truefoundry.com/ai-gateway | Company Blog | platform_integration | 通过 AI Gateway 暴露 Fable 5 调用、治理和成本控制 | 官方产品文章和调用路径 | 展示如何把 Fable 5 接入企业网关 | B | false | 不是终端客户案例 |
| cf5-signal-claude-directory | Claude Directory AI-generated UI gallery | pulkitxm | https://github.com/pulkitxm/claude-directory | https://pulkitxm.com/claude-directory | GitHub | collection_artifact; ui_generation | 开源 UI experiments gallery，包含 prompts 和 demo videos | GitHub repo 与 live directory | README 声称所有项目由 Claude Fable 5 生成 | B | false | 本质是 gallery/collection，不可作为单条 A 类案例；可拆分单个子项目后重新审核 |
| cf5-signal-architect-loop | architect-loop cross-vendor agent workflow | Dan McInerney | https://github.com/DanMcInerney/architect-loop | https://github.com/DanMcInerney/architect-loop | GitHub | workflow_tool; agent_architecture | 用 Fable 5 做 architect，GPT-5.5 Codex 做 builder 的 repo-as-memory loop | 公开 repo | README 描述 Fable 5 作为 planning/review 角色 | B | false | 是工作流工具，不是 Fable 5 直接产出的具体终端产物 |

## C 类资料

| case_id | case_title | user_or_org | original_evidence_url | artifact_url | source_platform | task_category | task_description | output_result | model_contribution | evidence_grade | selected_for_model_card | risk_notes |
|---|---|---|---|---|---|---|---|---|---|---|---:|---|
| cf5-bg-endor-security | Endor Labs Agent Security League evaluation | Endor Labs | https://www.endorlabs.com/learn/claude-fable-5-mythos-grade-hype | https://www.endorlabs.com/learn/claude-fable-5-mythos-grade-hype | Company Blog | evaluation; security | 在 200 个 vulnerability-fixing tasks 上评估 Fable 5 | 评测报告 | 反映安全修复能力和 cheating/timeout 风险 | C | false | benchmark 不是案例 |
| cf5-bg-simon-willison | Simon Willison initial impressions | Simon Willison | https://simonwillison.net/2026/Jun/9/claude-fable-5/ | https://simonwillison.net/2026/Jun/9/claude-fable-5/ | Personal Blog | overview; developer_observation | 解读 Fable 5 的价格、guardrails、fallback 和上下文 | 开发者观察文章 | 用于风险和集成背景 | C | false | 不是产物案例 |
| cf5-bg-anthropic-release | Anthropic Fable 5 / Mythos 5 release | Anthropic | https://www.anthropic.com/news/claude-fable-5-mythos-5 | https://www.anthropic.com/news/claude-fable-5-mythos-5 | Official Blog | official_release | 官方发布资料和客户评价 | 发布文 | 用于模型事实和 B 类线索发现 | C | false | 官方发布页不是真实案例 |
| cf5-bg-api-docs | Claude API docs for Fable 5 | Anthropic | https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 | https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 | Official Docs | docs | API ID、context、output、pricing、refusal、fallback、retention | 官方 docs | 用于基本信息和风险限制 | C | false | docs 不是案例 |

## D 类剔除线索

| case_id | case_title | user_or_org | original_evidence_url | artifact_url | source_platform | task_category | task_description | output_result | model_contribution | evidence_grade | selected_for_model_card | risk_notes |
|---|---|---|---|---|---|---|---|---|---|---|---:|---|
| cf5-reject-awesome-pages | Awesome / collection pages for Claude Fable 5 | various | various collection URLs | n/a | GitHub; web search | collection | 集合页汇总多个外链 | 只能作为发现线索 | 无法证明单个具体任务和产物 | D | false | 集合页不能作为 original_evidence_url |
| cf5-reject-blockscape-reddit | BlockScape / RuneScape-WoW Reddit search result | unknown | https://www.reddit.com/r/ClaudeAI/comments/1u4omq0/i_asked_claude_fable_5_to_code_me_a_runescapewow/ | n/a | Reddit | browser_game | 搜索摘要显示可能是 Fable 5 游戏案例 | 打开后重定向到无关 NSFW 页面 | 无可核验模型贡献 | D | false | 原始证据不可用，不能收录 |
| cf5-reject-redpanda-reddit | RedPandaOS Reddit search result | unknown | https://www.reddit.com/r/ClaudeAI/comments/1u4ra05/claude_fable_5_built_a_hobby_os_vibecoded/ | n/a | Reddit | hobby_os | 搜索摘要显示可能是 Fable 5 OS 案例 | 打开后重定向到无关或已移除页面 | 无可核验模型贡献 | D | false | 原始证据不可用，不能收录 |
| cf5-reject-public-portfolio-reddit | Public Portfolio Challenge search result | unknown | https://www.reddit.com/r/ClaudeAI/comments/1u6uypc/public_portfolio_challenge_model_report_claude/ | n/a | Reddit | finance; portfolio | 搜索摘要显示可能是投资组合案例 | 打开后重定向到无关页面 | 无可核验模型贡献 | D | false | 金融高风险场景，且原始证据不可用 |
| cf5-reject-pebble-reddit | Pebble clone Reddit search result | unknown | https://www.reddit.com/r/ClaudeAI/comments/1u3wz5c/fable_5_created_a_pebble_clone_for_mac_in_20/ | n/a | Reddit | desktop_game | 搜索摘要显示可能是 Mac game 案例 | 打开后重定向到无关页面 | 无可核验模型贡献 | D | false | 原始证据不可用，不能收录 |
| cf5-reject-youtube-overview | YouTube overview / tutorial pages | various | various | n/a | YouTube | tutorial; overview | 视频介绍、教程或总评 | 没有 repo/demo/关键时间点 | 不能证明具体产物由 Fable 5 完成 | D | false | 只有补齐原始项目页和时间点后才能重审 |

## 数量统计

| 等级 | 数量 | 说明 |
|---|---:|---|
| A | 8 | 具体项目/PR/demo，均有 original_evidence_url 和 artifact_url |
| B | 5 | 平台接入、工作流工具、集合型项目 |
| C | 4 | benchmark、docs、release、开发者观察 |
| D | 6 | 集合页、失效/错页、不可核验线索 |

## 模型卡精选建议

建议模型卡精选 4 条，覆盖不同能力面：

1. LAAS: 长周期 WebGPU 工程。
2. World of ClaudeCraft: 多人浏览器游戏/系统复杂度。
3. Midwinter remaster: 逆向工程、证据 ledger、长周期研究。
4. ComfyUI KJNodes PR: 开源代码贡献与人类测试协作。

Backrooms 和 Cube Survivor 可作为二级案例；Claude Citizen、VibePinball 进入案例库但暂不放模型卡精选，避免游戏 demo 过多导致样板失衡。
