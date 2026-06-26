# Claude Fable 5 Cases

> Phase 3B case library  
> vendor: Anthropic / Claude  
> model_name: Claude Fable 5  
> collected_at: 2026-06-25

## Status

Claude Fable 5 已有 Phase 1.5 v2 案例库，本文件为 Phase 3B 模型案例库入口，保留 A/B/C/D 分级。


## Evidence Table

| case_id | case_title | vendor | model_name | user_or_org | original_evidence_url | artifact_url | source_platform | source_type | task_category | task_description | output_result | model_contribution | evidence_grade | showcase_eligible | selected_for_model_card | risk_notes | collected_at | review_status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| cf5-case-laas-webgpu-world | LAAS WebGPU Open World | Anthropic / Claude | Claude Fable 5 | Braffolk | https://github.com/Braffolk/fable5-world-demo | https://dc5fzrbo8ssfx.cloudfront.net/laas/ | GitHub | real_case | agentic_coding; webgpu; threejs | 构建浏览器中运行的 4x4km 程序化 WebGPU 开放世界。 | 公开 repo、公开 demo、README 声明 Fable 5 参与。 | README 称项目约 99% 由 Claude Fable 5 构建。 | A | true | true | 模型贡献比例来自作者自述；需要保存 repo HEAD、README 和 demo 截图。 | 2026-06-25 | approved |
| cf5-case-world-of-claudecraft | World of ClaudeCraft | Anthropic / Claude | Claude Fable 5 | next-choken / levy-street | https://www.reddit.com/r/ClaudeAI/comments/1u3m6a8/i_vibe_coded_the_first_mmorpg_with_fable_5/ | https://worldofclaudecraft.com/ ; https://github.com/levy-street/world-of-claudecraft | Reddit; GitHub; product_site | real_case | browser_game; mmorpg; multiplayer | 构建可玩的 browser MMORPG。 | Reddit 原帖、公开网站、公开 repo。 | 原帖明确使用 Fable 构建 MMORPG。 | A | true | true | 需快照 Reddit、repo、网站；资产/IP 风险需复核。 | 2026-06-25 | approved |
| cf5-case-midwinter-dos-remaster | Midwinter DOS Game Reverse Engineering | Anthropic / Claude | Claude Fable 5 | PlayfulInterview984 | https://www.reddit.com/r/ClaudeAI/comments/1u34370/fable_5_decoded_an_entire_1989_dos_game/ | https://midwinter-remaster.titanium-helix.com ; https://youtu.be/PonvG2whtkc | Reddit; project_site; YouTube | real_case | reverse_engineering; game_remaster | 对 1989 DOS 游戏可执行文件进行解包、反汇编、函数映射和验证。 | 项目站、视频和 playable tech demo。 | 作者描述 Fable 5 overnight 解码函数并复现 terrain generator。 | A | true | true | 涉及旧游戏 IP 和逆向工程；视频需记录时间点。 | 2026-06-25 | approved |
| cf5-case-comfyui-ideogram-pr | ComfyUI KJNodes Ideogram 4 Prompt Builder PR | Anthropic / Claude | Claude Fable 5 | Pluventi / kijai | https://github.com/kijai/ComfyUI-KJNodes/pull/668 | https://github.com/kijai/ComfyUI-KJNodes/pull/668 | GitHub PR | real_case | open_source_pr; comfyui; image_tooling | 为 ComfyUI KJNodes 添加 Ideogram 4 Prompt Builder V2。 | 公开 PR、commit list、作者评论和后续引用。 | 作者评论称 AI 写了 100% 代码，后续说明 Built with Claude Fable 5。 | A | true | true | PR 质量仍需维护者清理，不可包装成质量保证案例。 | 2026-06-25 | approved |
| cf5-bg-api-docs | Claude API docs for Fable 5 | Anthropic / Claude | Claude Fable 5 | Anthropic | https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 | https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 | Official Docs | docs | official_docs | API ID、context、output、pricing、refusal、fallback、retention。 | 官方 docs。 | 用于基本信息和风险限制。 | C | false | false | docs 不是真实案例。 | 2026-06-25 | approved |

## Review Notes

- A 类必须有原始 URL 和 artifact URL；本文件中只有标为 A 的行可进入模型卡精选。
- C 类资料只用于背景、事实核验或风险说明。
- 后续新增案例必须先回填 evidence_snapshot_url 到证据表，不要直接改模型卡精选。
