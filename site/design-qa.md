# Design QA

final result: passed

## Scope

真实 Astro 站点已完成第二十三轮 Model Atlas 产品化优化：

- 修正模型卡数据可信性矛盾
- 将首页、模型库、案例库、对比页和模型详情页统一到 `Signal Observatory x Living Archive`
- 增强首页模型库入口，让 CTA 能带筛选状态进入真实 `/models`
- 将首页 Canvas 粒子图谱接入真实模型/案例节点标签，并支持 hover / click
- 为模型库补全 URL 状态同步，筛选、排序、搜索可以分享和刷新保留
- 为案例库新增产品级筛选面板，支持搜索、模型、厂商、来源平台、Coding Agent / A 类精选筛选
- 案例库新增证据档案抽屉，支持 `?case=` 深链接、原始证据/产物链接、风险备注、模型贡献和同模型案例索引
- 案例库新增“证据可信度”评分，按证据等级、原始证据、公开产物、复核状态、任务细节完整度和来源类型计算
- 案例卡、案例抽屉、案例详情页、`/atlas.json` 和 `/llms.txt` 已统一展示同一套可信评分语言
- 案例库筛选面板新增“证据强度”，支持 `confidence=aplus`、代码仓库证据和官方/客户故事筛选
- 新增 680 个 A 类精选案例独立静态详情页，路径为 `/cases/{caseId}`
- 案例详情页保留“打开证据抽屉”入口，同时提供模型档案、厂商路线和复制案例页入口
- 案例详情页新增 `CreativeWork` JSON-LD，让单条可核验案例可被搜索引擎和 AI 工具独立理解
- 案例卡新增“完整案例页”，案例抽屉新增“完整案例页”入口
- 全站检索、对比页证据样本、`/llms.txt`、`/atlas.json` 和 sitemap 已升级为优先指向静态案例详情页
- 原始来源长链接已从单行截断改为容器内折行，避免移动端证据链接产生可点击元素溢出
- 新增 `site/src/lib/caseNarrative.ts`，为所有案例生成中文档案标题、中文导读、中文任务类型、风险边界和标签
- 首页精选案例、数据脉冲最近案例、粒子图谱 CASE 节点、案例卡、案例抽屉、案例详情页和对比页证据样本已统一使用中文案例档案语言
- 案例页保留原始标题为“原始记录”，兼顾中文阅读体验与证据溯源
- `/command-index.json`、`/atlas.json`、`/llms.txt` 已同步使用中文案例标题/摘要，外部工具优先读取产品化后的案例表达
- 新增全站档案检索 / command palette，支持从任意页面检索模型、案例、厂商、专题和方法入口
- 全站检索支持 `/`、`Cmd/Ctrl + K`、桌面侧栏入口和移动端顶部入口
- 全站检索的案例结果直接进入 `/cases?case=` 深链接，并复用证据档案抽屉
- 全站检索索引已从页面 HTML 拆分为 `/command-index.json`，首次打开检索时异步加载
- 全站检索索引生成逻辑集中到 `site/src/lib/commandIndex.ts`，避免 Layout 直接持有大数据索引
- 首页新增“数据脉冲”模块，展示数据截面、最近案例复核、最近模型发布和自动化链路
- 首页新增“数据健康”模块，前置展示证据新鲜度、A 类占比、活跃模型覆盖、自动 Gate 通过量和来源平台结构
- 新增 `/updates` 数据更新日志页，把数据截点、最近 A 类案例入库、最近模型发布、复核批次、来源结构、任务类型分布和自动化链路集中公开
- 首页数据脉冲、自动化流程和最终 CTA 已接入 `/updates`，形成从首页到数据维护证据的转化路径
- 桌面侧栏和移动端顶栏新增“更新”入口，保持全站数据可信层可发现
- 数据健康模块归并大小写不同的来源平台，例如 `github` / `GitHub` 统一展示为 `GitHub`
- 首页真实案例卡已从外部 artifact 直跳改为站内 `/cases?case=` 证据档案深链
- 首页真实案例卡新增“打开证据档案”显性文案，先完成站内核验，再从抽屉访问原始证据和公开产物
- 首页数据脉冲中的“最近案例”已统一改为 `/cases?case=` 证据档案深链
- 首页粒子知识图谱中的 CASE 节点已统一改为 `/cases?case=` 证据档案深链
- 模型详情页的案例时间线已支持点击，并统一进入 `/cases?case=` 证据档案深链
- 模型详情页的案例卡和案例时间线都已纳入自动 QA，验证可打开案例证据抽屉
- 全站侧栏和移动端顶栏新增数据版本状态，展示 `DATA CUT`、活跃模型数、A 类案例数和自动同步状态
- 新增全站复制链接交互，支持 Clipboard API 和 fallback，并统一使用黑白细线框 toast
- 案例库筛选面板新增“复制当前视图”，方便分享当前搜索/筛选状态
- 案例证据抽屉新增“复制证据链接”，直接复制当前 `/cases?case=` 深链
- 修复无 `case` 参数时案例抽屉外壳被 CSS `display:grid` 覆盖而可见的问题，新增 QA 检查关闭态抽屉必须不可见
- 模型详情页新增“复制模型档案”，可分享单个模型档案页
- 对比工作台新增“复制当前对比”，复制带 `models` 和 `scenario` 的当前选型状态
- 对比工作台新增“复制研究包”，可复制包含推荐模型、领先差值、证据依据、模型排名、代表证据、下一步复核和边界说明的中文研究摘要
- 对比页的证据样本链接已从 `/cases?model=` 筛选入口升级为 `/cases?case=` 单条证据深链
- 对比页新增推荐解释层，展示当前场景下的领先模型、与第二名分差、证据理由和下一步复核入口
- 对比模型卡和维度矩阵新增 A+ 案例数与平均证据可信度，帮助用户判断推荐不是单纯分数排序
- 对比推荐解释层新增模型档案和代表案例链接，保持“结论先给、证据可追”的产品路径
- 模型卡从整卡链接改为明确的“模型档案 / 加入对比”双入口，避免嵌套链接，同时把模型库和对比工作台打通
- `/compare?models={modelId}` 现在支持单模型来源入口，会保留来源模型并自动补齐默认候选，进入页面后立即形成有效对比
- 对比页推荐解释层和工作台标签已中文化为“推荐理由 / 证据依据 / 下一步复核 / 决策工作台”
- `/updates` 底部复核入口标签已改为“下一步复核”，减少中文主站里的英文界面残留
- 对比页顶部“选型顺序”提示已从显式 cyan Tailwind 提示块改为黑白红细线档案提示，视觉上继续保持 `Signal Observatory x Living Archive`
- `site/README.md` 已从旧 V2 状态更新为当前 Model Atlas 产品事实，覆盖 118 个模型、116 个活跃模型、680 条 A 类精选案例、682 条总案例、活跃缺口 0、`/updates`、`/llms.txt`、`/atlas.json`、案例详情页和复制研究包能力
- 根目录 `README.md` 的网站页面和 QA 命令已补充 `/cases/[case]`、`/updates`、`/methodology`、`/llms.txt`、`/atlas.json` 和 `npm run qa:visual`
- 新增 `scripts/content-qa.mjs`，用 `metrics.json`、`models.json` 和 `cases.json` 校验 README 中的模型数、案例数、数据截点、核心路由、视觉方向和旧文案残留
- `npm run check` 已接入内容一致性 QA，当前输出为 0 errors、0 warnings、0 hints，并报告 `content qa passed: 118 models / 680 A cases / data cut 2026-06-27`
- `npm run build` 已改为先执行 `npm run check`，让类型检查和内容事实检查成为生产构建前置门禁
- 全站复制 fallback 保留老浏览器兜底能力，同时移除 Astro check 中的 `document.execCommand("copy")` deprecated hint
- 自动视觉 QA 新增数据版本可见性、模型档案复制、证据链接复制和对比链接复制检查
- 自动视觉 QA 新增可见配色守门检查，检测所有截图路由中是否出现高饱和蓝紫色视觉痕迹
- 全站 `BaseLayout` 新增基础 JSON-LD，默认输出 `WebSite` 和 `WebPage`
- 首页新增 `Dataset` JSON-LD，暴露模型数、案例数、数据截点、机器可读分发入口
- 模型库新增 `CollectionPage` JSON-LD，模型详情页新增 `SoftwareApplication` JSON-LD
- 案例库新增 `CollectionPage + ItemList` JSON-LD，对比页新增 `WebApplication` JSON-LD
- 新增 `/llms.txt`，为 AI 工具提供 Model Atlas 的摘要、边界、核心入口、推荐模型档案和最近 A 类案例入口
- 新增 `/atlas.json`，提供机器可读的 metrics、核心路由、精选模型和最近案例摘要
- `/updates` 已同步写入 `/llms.txt`、`/atlas.json`、`/command-index.json` 和 `sitemap.xml`
- `sitemap.xml` 纳入 `/llms.txt`、`/atlas.json` 和 `/updates`，并为 URL 输出 `lastmod`
- `robots.txt` 新增 `AI-Index` 指向 `/llms.txt`
- `npm run qa:visual` 新增 endpoint checks 和 JSON-LD 类型检查
- 模型详情页升级为模型档案页，新增档案摘要、证据完整度、能力边界、案例时间线和同厂相邻模型
- 模型详情页新增 `EvidenceDistribution` 证据分布模块，按任务类型、来源结构和复核批次展示 A 类案例结构
- 证据分布模块保留黑白细线框、红色信号条和档案索引感，不做普通 dashboard 风格
- 证据分布模块的任务类型、来源和复核批次均可点击进入案例库筛选/搜索入口
- `/updates` 页的分布模块同样使用黑白细线框和红色信号条，避免走向 SaaS dashboard 风格
- 对比页升级为可交互模型决策工作台，支持 2-4 个模型并排、场景切换、证据卡片、维度矩阵和 URL 状态分享
- 新增并扩展 `npm run qa:visual` 自动视觉 QA 脚本，覆盖首页、数据脉冲、更新日志、模型库、模型详情、案例库、案例证据抽屉、对比页和 Compare 交互状态
- 自动视觉 QA 新增 `cases-confidence` 路由，验证 A+ 完整链路筛选、案例可信评分、抽屉可信信号、详情页可信评分和关闭态抽屉隐藏状态
- 统一品牌命名、SEO 标题、package 名和 Tailwind 主题 token
- 增加 `archive/README.md`，说明历史目录与当前产品站的边界

## Data Integrity

- `site/src/data/models.json` 已修正有案例模型的 summary 和 risk notes。
- 检查脚本结果：118 个模型，0 个“有 A 类案例但文案说暂无案例”的逐卡矛盾。
- 模型详情页抽查：`/models/gpt-5-5-xhigh` 显示“当前关联 5 条可核验 A 类案例”，无矛盾提示。

## Connected Routes

首页产品型入口已连接真实筛选：

- `/models?quick=with-cases`
- `/models?quick=coding`
- `/models?status=Publishable`
- `/models?status=Archive`
- `/cases`
- `/compare`
- `/updates`
- `/topics/coding-agent`
- `/vendors`

`/models` 已支持从 URL 初始化筛选参数：`quick`、`status`、`vendor`、`cases`、`sort`、`q`。

`/models` 已支持筛选状态回写 URL：

- `q`
- `vendor`
- `status`
- `cases`
- `sort`
- `quick`

`/cases` 已支持从 URL 初始化并回写筛选参数：

- `q`
- `model` / `modelId`
- `vendor`
- `platform`
- `type`
- `case`
- `confidence`

`/compare` 已支持从 URL 初始化并回写对比参数：

- `models`
- `scenario`

`/compare?models={modelId}` 已支持单模型入口：从模型库点击“加入对比”时，页面会保留该模型并补齐默认候选模型，生成 2-4 个模型的有效对比组合。

新增可复制分享入口：

- 模型详情页：复制当前模型档案 URL。
- 案例库：复制当前筛选视图 URL。
- 案例证据抽屉：复制当前 `/cases?case=` 证据深链。
- 对比工作台：复制当前 `models` + `scenario` 对比视图 URL。

全站检索已连接以下对象：

- 7 个核心入口 / 专题 / 方法页面
- 15 个厂商档案
- 118 个模型档案
- 682 条真实案例档案
- `/command-index.json` 共输出 822 条索引项

机器可读入口：

- `/llms.txt`：AI 工具摘要入口，包含数据状态、主要入口、`/updates`、证据分级、证据可信度、推荐模型档案和最近 A 类案例。
- `/atlas.json`：结构化摘要，包含 `metrics`、核心路由、`routes.updates`、精选模型、最近案例和 `evidenceTrust`。
- `/sitemap.xml`：823 个 URL，包含页面、模型档案、厂商档案、680 个案例详情页、`/updates`、`/llms.txt` 和 `/atlas.json`。
- `/robots.txt`：包含 `Sitemap` 和 `AI-Index`。

## Visual QA

- Endpoint checks：`/llms.txt`、`/atlas.json`、`/sitemap.xml`、`/robots.txt` 全部 200 且 passed。
- `/llms.txt`：passed，输出 5,988 chars，包含 Model Atlas、`/atlas.json`、`/updates`、证据可信度和中文 A 类精选案例入口。
- `/atlas.json`：passed，输出 118 models / 680 A cases，最近案例包含 `evidenceTrust.score`。
- `/sitemap.xml`：passed，输出 823 urls，包含 `/updates`、`/llms.txt`、`/atlas.json`、案例详情页和 `<lastmod>`。
- `/robots.txt`：passed，包含 `Sitemap` 和 `AI-Index`。
- Desktop home 1440 x 1024：passed，无横向溢出，无按钮文字溢出。
- 首页 JSON-LD：passed，类型为 `WebSite`、`WebPage`、`Dataset`。
- Mobile home 390 x 844：passed，无横向溢出，无按钮文字溢出。
- Command palette desktop：passed，输入 `coding` 后显示 10 条匹配结果，面板打开状态 `aria-hidden=false`，索引状态 `loaded`。
- Command palette mobile：390 x 844 passed，输入 `coding` 后显示 10 条匹配结果，索引状态 `loaded`，无横向溢出，无按钮文字溢出。
- 全站数据版本状态：所有自动 QA 路由均检测到 `DATA CUT` 可见，桌面侧栏和移动端顶栏展示数据截点。
- Models quick filter：`/models?quick=coding` 自动选中 Coding Agent 候选，显示 69 个模型。
- Models add to compare：`/models?quick=coding` 点击首个可见“加入对比”后进入 `/compare?models=...`，目标 URL 保留来源模型 `gpt-5-5-xhigh`，并自动补齐候选形成有效对比组合。
- 模型库 JSON-LD：passed，类型为 `WebSite`、`WebPage`、`CollectionPage`。
- Updates desktop：`/updates` 1440 x 1024 passed，无横向溢出，无按钮文字溢出，标题、数据截点、最近入库案例和证据分布模块均可见。
- Updates distribution：`/updates` 分布区 passed，入库批次、来源结构和任务类型分布正常渲染。
- Updates mobile：`/updates` 390 x 844 passed，无横向溢出，无按钮文字溢出；“数据更新日志”标题已优化为不孤字换行。
- Updates JSON-LD：passed，类型为 `WebSite`、`WebPage`、`Dataset`。
- Cases type filter：`/cases?type=coding` 自动选中 Coding Agent / agentic coding，显示 627 条案例。
- Cases confidence filter：`/cases?confidence=aplus` 自动选中 A+ 完整链路，显示 653 条案例。
- 案例卡证据可信度：passed，案例卡展示 `100/100 · A+ 完整链路 · 代码仓库证据` 等可信信号。
- 案例库关闭态抽屉：passed，`/cases?type=coding` 和 `/cases?confidence=aplus` 均检测 `closed drawer visible: false`。
- 案例库 JSON-LD：passed，类型为 `WebSite`、`WebPage`、`CollectionPage`。
- Cases evidence drawer desktop：`/cases?case=cf5-case-laas-webgpu-world` passed，抽屉打开，标题和 `aria-hidden=false` 正常。
- Cases evidence drawer trust：passed，抽屉展示“可信信号”，包含代码仓库证据、原始证据、公开产物和复核通过。
- Cases evidence drawer copy：passed，点击“复制证据链接”后 toast 显示“证据链接已复制”，无横向溢出，无按钮文字溢出。
- Cases evidence drawer mobile：390 x 844 passed，无横向溢出，无按钮文字溢出。
- 首页数据脉冲最近案例：passed，案例 meta 已显示中文任务类型，例如“代码审查与测试 / 证据档案”。
- 首页案例到证据抽屉链路：passed，抽屉标题已变为中文档案标题，例如“Claude Fable 5 用于浏览器 3D 世界构建”。
- 案例证据抽屉桌面和移动端：passed，标题、中文导读、原始记录、任务类型、任务/产物/模型作用/风险边界均正常渲染，无横向溢出。
- 案例详情页桌面：`/cases/cf5-case-laas-webgpu-world` passed，JSON-LD 类型为 `WebSite`、`WebPage`、`CreativeWork`，标题为“Claude Fable 5 用于浏览器 3D 世界构建”，证据抽屉入口为 `/cases?case=cf5-case-laas-webgpu-world`。
- 案例详情页证据可信度：passed，详情页右侧展示证据可信度模块，JSON-LD `additionalProperty` 包含证据可信度和证据来源类型。
- 案例详情页复制链接：passed，点击“复制案例页”后 toast 显示“案例页链接已复制”。
- 案例详情页移动端：390 x 844 passed，无横向溢出，无按钮文字溢出；长证据 URL 在细线框内折行。
- Compare page：passed，黑白细线框和红色重点统一，无明显蓝紫 dashboard 残留。
- Compare order note：passed，顶部“选型顺序”提示为黑白红细线样式，不再使用显式 cyan 提示块。
- Compare 证据样本：passed，证据卡片链接继续指向 `/cases/{caseId}`，展示标题已转为中文案例档案标题。
- Compare JSON-LD：passed，类型为 `WebSite`、`WebPage`、`WebApplication`。
- Compare copy view：passed，点击“复制当前对比”后 toast 显示“对比链接已复制”，URL 保留 `models` 和 `scenario`。
- Compare copy brief：passed，点击“复制研究包”后 toast 显示“研究包已复制”，复制内容包含“Model Atlas 研究包 / 推荐模型 / 证据依据 / 代表证据 / 下一步复核”。
- Compare workbench：passed，`/compare` 默认综合选型生成 GPT-5.1 (high) 当前建议，并同步 URL。
- Compare rationale：passed，`#compare-rationale` 展示“推荐理由 / 证据依据 / 下一步复核”，包含分差、A+ 案例数、平均证据可信度、模型档案和代表案例入口。
- Compare coding scenario：passed，点击 Coding Agent 后场景切换生效，URL 写入 `scenario=coding`。
- Compare coding rationale：passed，Coding Agent 场景下推荐解释包含 Coding/agentic coding 案例数量，并保持下一步复核入口。
- Compare board：passed，并排模型卡片、案例证据入口和维度矩阵正常渲染。
- Compare mobile：passed，390 x 844 无横向溢出，无按钮文字溢出。
- Forbidden palette gate：passed，所有自动视觉 QA 路由 `forbidden palette samples: 0`，未检测到高饱和蓝紫视觉痕迹。
- Content QA：passed，`npm run qa:content` 校验 118 个模型、680 条 A 类精选案例、数据截点 2026-06-27、核心路由和 README 旧事实残留。
- Copy fallback cleanup：passed，`npm run check` 已无 `document.execCommand("copy")` deprecated hint；复制模型档案、证据链接、案例页、当前对比和研究包的视觉 QA 仍全部通过。
- 首页粒子图谱：hover 显示节点标签，click 可进入对应模型详情或案例筛选结果。
- 首页数据脉冲：passed，桌面 1440 x 1024 无横向溢出，无按钮文字溢出。
- 首页数据脉冲最近案例：passed，第一条最近案例 href 为 `/cases?case=gemini-1-5-pro-qodo-code-review`，meta 文案包含“证据档案”。
- 首页数据脉冲到证据抽屉链路：passed，从最近案例点击进入 `/cases?case=gemini-1-5-pro-qodo-code-review`，案例证据抽屉打开，`aria-hidden=false`。
- 首页数据健康：passed，桌面 1440 x 1024 无横向溢出，无按钮文字溢出；核心标题“每一次浏览，都带着证据状态。”和覆盖值 `100%` 正常渲染。
- 首页数据健康肉眼 QA：修复 `100%` 大数字在左侧卡片中被截断的问题；来源平台展示已归并 `GitHub`。
- 首页真实案例区：passed，第一张案例卡 href 为 `/cases?case=cf5-case-laas-webgpu-world`，CTA 文案包含“打开证据档案”。
- 首页案例到证据抽屉链路：passed，从首页点击第一张案例卡后进入 `/cases?case=cf5-case-laas-webgpu-world`，案例证据抽屉打开，`aria-hidden=false`。
- 模型详情页桌面：`/models/gpt-5-5-xhigh` passed，档案摘要和证据完整度 100% 正常渲染。
- 模型详情页证据分布：`/models/gpt-5-5-xhigh` passed，新增 `model-detail-evidence-distribution` QA 路由；标题为“案例证据分布”，A CASES 计数为 5，无横向溢出，无按钮文字溢出。
- 模型详情页证据分布肉眼 QA：分布模块展示任务类型、来源结构、复核批次和最新证据，视觉保持黑白细线框、红色信号条和档案索引感。
- 模型详情页 JSON-LD：passed，类型为 `WebSite`、`WebPage`、`SoftwareApplication`。
- 模型详情页复制链接：passed，点击“复制模型档案”后 toast 显示“模型档案链接已复制”，按钮状态同步更新。
- 模型详情页案例时间线：passed，第一条案例时间线 href 为 `/cases?case=gpt-5-5-xhigh-5dmgmt-claude-codex-audit-toolkit`。
- 模型详情页案例卡到证据抽屉链路：passed，从模型详情案例卡进入 `/cases?case=gpt-5-5-xhigh-frahlg-fusion`，案例证据抽屉打开，`aria-hidden=false`。
- 模型详情页案例时间线到证据抽屉链路：passed，从案例时间线进入 `/cases?case=gpt-5-5-xhigh-5dmgmt-claude-codex-audit-toolkit`，案例证据抽屉打开，`aria-hidden=false`。
- 模型详情页移动端：`/models/gpt-5-5-xhigh` passed，无横向溢出，无按钮文字溢出。
- 中文排版：核心桌面和移动端截图未发现标题、CTA 或筛选控件横向溢出；`/updates` 移动端标题已避免“日志”孤字拆行。

## Build Verification

- `npm run check`: passed
- Astro check: 0 errors, 0 warnings, 0 hints
- `npm run qa:content`: passed
- `npm run build`: passed
- Static output: 822 pages
- Static endpoints: `/command-index.json`、`/atlas.json`、`/llms.txt`、`/robots.txt`、`/sitemap.xml` generated
- `npm run qa:visual`: passed
- 可见配色守门：passed，所有路由 `forbidden palette samples: 0`
- Legacy brand / agency text search: passed

## Performance QA

- 首页 HTML 已不再内联完整命令检索索引。
- `dist/index.html`: 56,975 bytes raw，首页新增更新日志入口后仍保持轻量。
- `dist/command-index.json`: 639,268 bytes raw / 111,244 bytes gzip，因加入中文案例摘要和 `/updates` 索引而增大，但仍为按需加载，不进入首屏 HTML。
- `dist/llms.txt`: 7,946 bytes raw。
- `dist/atlas.json`: 28,954 bytes raw / 4,284 bytes gzip。
- `dist/sitemap.xml`: 107,004 bytes raw。
- 第七轮内联索引版本本地首页约 782KB raw；第八轮将首屏 HTML 降至约 47KB raw。
- `/command-index.json` 在视觉 QA dev server 中按需请求，桌面和移动端均返回并渲染结果；加入中文案例摘要后 gzip 约 111KB。
- `/llms.txt` 和 `/atlas.json` 作为外部/AI 消费入口，不进入首屏交互路径。

## Screenshots

- Optimized desktop home: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/model-atlas-optimized-home-desktop.png`
- Optimized mobile home: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/model-atlas-optimized-home-mobile.png`
- Optimized models coding filter: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/model-atlas-optimized-models-coding.png`
- Optimized model detail mobile: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/model-atlas-optimized-model-detail-mobile.png`
- Optimized cases page: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/model-atlas-optimized-cases.png`
- Optimized compare page: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/model-atlas-optimized-compare-desktop.png`
- Auto QA desktop home: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-home-desktop.png`
- Auto QA home data pulse: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-home-pulse.png`
- Auto QA home pulse to drawer: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-home-pulse-to-drawer.png`
- Auto QA home data health: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-home-health.png`
- Auto QA home cases: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-home-cases.png`
- Auto QA home case to drawer: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-home-case-to-drawer.png`
- Auto QA mobile home: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-home-mobile.png`
- Auto QA command palette desktop: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-command-desktop.png`
- Auto QA command palette mobile: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-command-mobile.png`
- Auto QA models coding filter: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-models-coding.png`
- Auto QA models add to compare: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-models-add-to-compare.png`
- Auto QA updates desktop: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-updates-desktop.png`
- Auto QA updates distribution: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-updates-distribution.png`
- Auto QA updates mobile: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-updates-mobile.png`
- Auto QA model detail desktop: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-model-detail-desktop.png`
- Auto QA model detail evidence distribution: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-model-detail-evidence-distribution.png`
- Auto QA model detail copy link: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-model-detail-copy-link.png`
- Auto QA model detail case to drawer: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-model-detail-case-to-drawer.png`
- Auto QA model detail timeline link: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-model-detail-timeline-link.png`
- Auto QA model detail mobile: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-model-detail-mobile.png`
- Auto QA cases coding filter: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-cases-coding.png`
- Auto QA cases confidence filter: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-cases-confidence.png`
- Auto QA cases evidence drawer: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-cases-drawer.png`
- Auto QA cases copy evidence link: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-cases-copy-evidence-link.png`
- Auto QA cases evidence drawer mobile: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-cases-drawer-mobile.png`
- Auto QA case detail desktop: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-case-detail-desktop.png`
- Auto QA case detail copy link: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-case-detail-copy-link.png`
- Auto QA case detail mobile: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-case-detail-mobile.png`
- Auto QA compare page: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-compare-desktop.png`
- Auto QA compare copy view: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-compare-copy-view.png`
- Auto QA compare copy brief: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-compare-copy-brief.png`
- Auto QA compare coding scenario: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-compare-coding.png`
- Auto QA compare workbench board: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-compare-board.png`
- Auto QA compare recommendation rationale: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-compare-rationale.png`
- Auto QA compare mobile: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-compare-mobile.png`
- Auto QA report: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/site/visual-qa/auto-visual-qa-report.md`
- Product design review home desktop: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/product-design-audits/model-atlas-optimization-review-2026-06-28/01-home-desktop.png`
- Product design review models desktop: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/product-design-audits/model-atlas-optimization-review-2026-06-28/02-models-desktop.png`
- Product design review cases confidence desktop: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/product-design-audits/model-atlas-optimization-review-2026-06-28/03-cases-confidence-desktop.png`
- Product design review compare rationale desktop: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/product-design-audits/model-atlas-optimization-review-2026-06-28/04-compare-rationale-desktop.png`
- Product design review home mobile: `/Users/yueyue/Desktop/markdown-wiki-0-wiki-2-0/product-design-audits/model-atlas-optimization-review-2026-06-28/05-home-mobile.png`

## Notes

这轮优化继续把 Model Atlas 从“可持续维护的模型资料库”推向“可解释推荐的模型资料库”：每条 A 类案例现在都有统一的证据可信度评分，案例库可以按 A+ 完整链路、代码仓库证据、官方/客户故事进行筛选；对比页不只给出胜出模型，也解释为什么、差距在哪里、下一步应该复核哪份模型档案和哪条代表案例。最新补强把模型库卡片接入“加入对比”，单模型来源可以直接进入有效对比组合，避免用户在模型库和对比页之间重新选择；同时新增“复制研究包”，让用户能把当前选型结论、证据依据和复核入口带出网站，放进团队讨论或研究记录里。本轮把 README 里的旧数据状态校正到当前真实产品，并进一步把事实一致性做成 `npm run check` 的门禁；同时视觉 QA 已有可见配色守门，防止黑白红档案语言回退到普通 SaaS dashboard 配色。

## 第二十四轮：数据绑定与计数完整性

- 修复 12 条 A 类精选案例的模型绑定：`glm-4.7` 归一到 `glm-4-7`，`deepseek-v3.1-terminus` 归一到 `deepseek-v3-1-terminus`，`gemini-1.5-flash-may` 归一到 `gemini-1-5-flash-may`。
- 重新按真实 A 类精选案例聚合模型计数：GLM-4.7 从 5 条更新为 13 条，DeepSeek V3.1 Terminus 从 5 条更新为 7 条，Gemini 1.5 Flash (May) 从 5 条更新为 7 条。
- 同步更新相关模型的 `caseStatus`、`summary` 和风险提示，避免模型详情页继续显示旧的“暂无已验证 A 类案例”或错误案例数。
- `content-qa` 新增数据完整性门禁：唯一模型 ID、唯一模型 slug、唯一案例 ID、无孤儿 A 类案例、活跃模型全部达到 5 条 A 类精选案例目标线、模型 `aCaseCount` 与案例聚合一致、所有模型 `aCaseCount` 总和等于 680 条 A 类精选案例。
- 这轮修正后，对比页默认推荐会因为 GLM-4.7 真实案例数提升而变化；视觉 QA 已确认推荐理由、研究包复制、代表案例链接和移动端布局仍然稳定。

## 第二十四轮验证

- `npm run qa:content`: passed，校验 118 个模型、680 条 A 类精选案例、数据截点 2026-06-27。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints。
- `npm run build`: passed，生成 822 个静态页面。
- `npm run qa:visual`: passed，首页、模型库、案例库、案例详情、模型详情、对比页、更新页、命令面板和移动端抽样均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第二十五轮：CI 产品质量门禁

- 新增 `.github/workflows/model-atlas-quality.yml`，在 push、pull request 和手动触发时执行 Model Atlas 产品质量门禁。
- 新增 `npm run qa:ci`，作为本地和 GitHub Actions 共用的唯一完整门禁入口：生产构建 + Playwright 视觉 QA。
- CI 使用 Node 22、`npm ci`、Playwright Chromium，并在每次运行后上传 `site/visual-qa` 截图和 `auto-visual-qa-report.md`，方便失败时直接查看视觉证据。
- 根目录 README 和 `site/README.md` 已补充 `qa:ci` 和 CI 工作流说明，明确内容 QA 会校验孤儿 A 类案例和模型 `aCaseCount` 聚合一致性。

## 第二十五轮验证

- `npm run qa:ci`: passed。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints。
- `npm run qa:content`: passed，校验 118 个模型、680 条 A 类精选案例、数据截点 2026-06-27。
- `npm run build`: passed，生成 822 个静态页面。
- `npm run qa:visual`: passed，所有自动视觉 QA 路由无横向溢出、无按钮文字溢出、`forbidden palette samples: 0`。

## 第二十六轮：证据归档清单

- 新增 `site/scripts/generate-evidence-archive.mjs`，从 A 类精选案例生成稳定的证据归档清单。
- 新增 `site/src/data/evidence-archive.json`，覆盖 680 条 A 类精选案例和 1365 个归档目标，包括原始证据 URL、公开产物 URL、来源 host、证据指纹、建议快照路径和当前快照状态。
- 新增 `/evidence-archive.json` 机器可读入口，作为外部证据快照队列和完整性账本。
- `/atlas.json` 已新增 `routes.evidenceArchive` 和 `evidenceArchive.summary`，`/llms.txt` 已新增证据归档状态说明，`sitemap.xml` 已纳入 `/evidence-archive.json`。
- 新增 `npm run evidence:archive` 和 `npm run qa:evidence`；`npm run check` 现在会验证归档清单未过期。
- 内容 QA 现在会检查证据归档清单覆盖全部 680 条 A 类案例，并确保没有缺原始证据、缺公开产物或陈旧案例条目。
- 根目录 README 和 `site/README.md` 已补充 `/evidence-archive.json`、`npm run evidence:archive` 和 `npm run qa:evidence` 的维护说明。

## 第二十六轮验证

- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets。
- `npm run qa:evidence`: passed，680 cases / 1365 targets / 680 pending snapshots。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive QA passed。
- `npm run qa:ci`: passed。
- `npm run build`: passed，生成 822 个静态页面，并生成 `/evidence-archive.json` 静态 endpoint。
- `npm run qa:visual`: passed，endpoint checks 新增 `evidence-archive-json` passed；sitemap 输出 824 urls；所有视觉路由无横向溢出、无按钮文字溢出、`forbidden palette samples: 0`。

## 第二十七轮：首批证据快照落盘

- 新增 `site/scripts/snapshot-evidence.mjs`，支持按 `--host`、`--case` 和 `--limit` 分批抓取证据快照。
- 快照输出目录为 `archive/evidence/{caseId}/`，每个案例包含 `manifest.json` 和每个证据目标的 JSON 元数据文件。
- 快照文件保存 HTTP 状态、最终 URL、内容类型、ETag、Last-Modified、内容哈希、页面标题，以及 GitHub repo / npm registry 等结构化来源元数据；默认不保存外部网页正文。
- `generate-evidence-archive.mjs` 已从“只检查 manifest 是否存在”升级为校验证据指纹、当前 target URL、target kind 和 `ok` 状态；如果案例字段或证据 URL 变化，归档状态会自动退回 `pending_snapshot` / `partial_snapshot` / `snapshot_attention`。
- `npmjs.com/package/*` 页面遇到 403 时，快照脚本会使用官方 `registry.npmjs.org` 元数据作为 fallback，并保留 primary HTTP 状态。
- 首批已处理 8 个 GitHub 高优先级案例，共 16 个证据目标；最终 8 条案例全部为 `snapshotted`。
- 根目录 README、`site/README.md` 和 `archive/README.md` 已补充分批快照命令和归档目录说明。

## 第二十七轮验证

- `npm run evidence:snapshot -- --host github.com --limit 8 --dry-run`: passed，选中 8 个高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 8`: completed，首轮 8 cases / 15 of 16 targets ok；其中 `npmjs.com/package/zerox` primary 页面返回 403。
- `npm run evidence:snapshot -- --case case-claude-3-haiku-zerox-ocr --limit 1`: passed，npm registry fallback 后 2 / 2 targets ok。
- `npm run evidence:archive`: passed。
- `npm run qa:evidence`: passed，680 cases / 1365 targets / 672 pending snapshots。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive QA passed。
- 当前证据快照状态：8 snapshotted cases，0 partial snapshots，0 snapshot attention，672 pending snapshots。

## 第二十八轮：证据快照状态前台可见

- 新增 `site/src/lib/evidenceArchive.ts`，统一输出证据快照状态标签、目标数摘要、状态语气和中文说明。
- 案例卡新增“证据快照 / 归档说明”，让用户在浏览案例列表时能直接区分“已快照、待快照、部分快照、需关注”。
- 案例证据抽屉新增快照状态面板，展示状态标签、已完成目标数、归档说明和本地 `manifest.json` 路径。
- 案例详情页右侧新增“证据快照”面板，并把快照状态写入 `CreativeWork` JSON-LD 的 `additionalProperty`。
- `/updates` 新增 Evidence Archive 概览，展示 `8 / 680` 已完成快照、`1365` 个证据目标、`672` 条待快照和 `0` 条需关注，并链接 `/evidence-archive.json`。
- 自动视觉 QA 新增 `cases-drawer-snapshotted` 和 `case-detail-snapshotted`，分别验证待快照与已快照两类状态在抽屉和详情页均可见。
- `/evidence-archive.json` endpoint check 已升级为校验 `snapshottedCases >= 8` 且 `snapshotAttentionCases === 0`。

## 第二十八轮验证

- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- `npm run qa:visual`: passed，endpoint checks 包含 `/evidence-archive.json`，输出 680 cases / 1365 targets / 8 snapshotted。
- 案例抽屉 QA：`/cases?case=cf5-case-laas-webgpu-world` 显示“待快照 · 0 / 2 个证据目标”；`/cases?case=aws-food-analyzer-haiku` 显示“已快照 · 2 / 2 个证据目标”。
- 案例详情 QA：`/cases/cf5-case-laas-webgpu-world` 和 `/cases/aws-food-analyzer-haiku` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。
- 更新页 QA：桌面与移动端均显示 `8 / 680` 证据快照概览，且布局无横向溢出。

## 第二十九轮：案例库快照状态筛选

- 案例库筛选面板新增“快照状态”，支持 `已快照`、`待快照`、`部分快照` 和 `需关注` 四类状态筛选。
- `/cases` 已支持 `snapshot` URL 参数，并会和搜索、模型、厂商、来源平台、案例类型、证据强度一起回写当前筛选视图。
- 案例列表卡片新增 `data-snapshot-status`，筛选逻辑直接使用 `site/src/data/evidence-archive.json` 的当前状态，不另造一套状态源。
- “复制当前视图”会保留 `snapshot` 参数，便于分享 `/cases?snapshot=snapshotted` 或 `/cases?snapshot=pending_snapshot` 这类证据归档工作视图。
- 自动视觉 QA 新增 `cases-snapshotted` 和 `cases-pending-snapshot`，分别验证 8 条已快照案例和 672 条待快照案例可被筛选出来。
- 根目录 README 和 `site/README.md` 已补充快照状态筛选入口。

## 第二十九轮验证

- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- `npm run qa:visual`: passed，新增 `/cases?snapshot=snapshotted` 和 `/cases?snapshot=pending_snapshot` 路由均无横向溢出、无按钮文字溢出、无 forbidden palette samples。
- `cases-snapshotted` QA：显示 8 条案例，筛选标签为“已快照（8）”。
- `cases-pending-snapshot` QA：显示 672 条案例，筛选标签为“待快照（672）”。

## 第三十轮：对比页证据快照覆盖率

- `/compare` 已接入 `site/src/data/evidence-archive.json`，为每个模型计算已快照案例数、待快照案例数、部分快照、需关注和快照覆盖率。
- 模型对比卡新增“证据快照”指标，例如 `0/13 已快照`。
- 对比维度矩阵新增“证据快照”行，展示已快照、待快照和需关注数量。
- 推荐解释的“下一步复核”新增证据快照说明，并提供 `/cases?model={modelId}&snapshot=pending_snapshot` 入口，让用户直接进入该模型的待快照案例视图。
- “复制研究包”现在包含每个候选模型的证据快照摘要，并把领先模型的快照缺口写入证据依据。
- 自动视觉 QA 对 compare 路由新增 `compareSnapshotSignal` 守门，推荐解释和研究包都必须包含“证据快照”。

## 第三十轮验证

- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Compare QA：桌面、移动端、复制当前对比、复制研究包、Coding Agent 场景、推荐解释和并排工作台均显示 `compare snapshot signal: true`。
- Compare QA：默认推荐解释显示“证据快照覆盖 0/13 已快照，仍有 13 条案例需要落盘快照”，下一步复核入口指向 `/cases?model=glm-4-7&snapshot=pending_snapshot`。

## 第三十一轮：模型档案证据快照覆盖

- `/models/[slug]` 已接入 `site/src/data/evidence-archive.json`，为单个模型计算已快照、待快照、部分快照、需关注和快照覆盖率。
- 模型详情页在证据分布后新增“证据快照覆盖”模块，直接说明该模型的 A 类案例中有多少已经完成本地快照、多少仍在队列中。
- 模块提供“查看已快照案例”和“查看待快照案例”入口，分别进入 `/cases?model={modelId}&snapshot=snapshotted` 与 `/cases?model={modelId}&snapshot=pending_snapshot`。
- `SoftwareApplication` JSON-LD 已新增“证据快照覆盖率”属性，让模型档案的机器可读信息同步反映证据归档状态。
- 自动视觉 QA 新增 `modelSnapshotHealth` 守门，模型详情桌面、证据分布位置和移动端都必须显示“证据快照覆盖”和“待快照”。

## 第三十一轮验证

- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- 模型详情 QA：`/models/gpt-5-5-xhigh` 桌面、证据分布位置、复制链接状态和移动端均显示 `model snapshot health`。
- 模型详情 QA：`GPT-5.5 (xhigh)` 显示“5 条 A 类案例中，已有 0 条完成本地证据快照；5 条仍在快照队列”，且无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第三十二轮：模型档案代表案例排序

- 模型详情页的案例精选从“只按模型卡精选字段展示”升级为可解释排序：模型卡精选优先，其次综合证据可信度、证据快照状态、Coding/repo/agent 技术信号和采集时间。
- 新增 `Representative Evidence / 代表案例排序` 模块，说明当前第一代表案例为何排在最前，并给出“打开第一代表案例”入口。
- 代表案例模块复用 `buildEvidenceTrust()` 和 `evidence-archive.json`，避免单独维护一套评分口径。
- 自动视觉 QA 新增 `modelRepresentativeCases` 守门，模型详情桌面、证据分布位置和移动端都必须出现“代表案例排序”和“证据可信度”。
- 首轮 QA 发现移动端横向溢出，原因是本地 `manifest.json` 路径过长；已在代表案例模块增加 `min-w-0`、`break-words` 和 `break-all` 约束。

## 第三十二轮验证

- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- 模型详情 QA：`/models/gpt-5-5-xhigh` 桌面、证据分布位置、复制链接状态和移动端均显示 `model representative cases`。
- 移动端回归：`model-detail-mobile` 从横向溢出修复为 `horizontal overflow: false`，无按钮文字溢出，无 forbidden palette samples。

## 第三十三轮：第二批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、51 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第二批快照，24 条案例全部成功，51 / 51 个证据目标 ok。
- 已覆盖一批前台高价值案例，包括 `cf5-case-laas-webgpu-world`、`cf5-case-backrooms-escape`、`cf5-case-world-of-claudecraft`、Claude 2.x/2.1 代码与应用案例，以及 Gemini / Mimo 的 GitHub 案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `8` 条已快照提升到 `32` 条已快照，待快照从 `672` 降到 `648`，`snapshotAttentionCases` 仍为 `0`。
- 自动视觉 QA 的快照数量守门从写死 `8 / 680` 升级为读取 `site/src/data/evidence-archive.json` 的当前 `snapshottedCases`、`pendingSnapshotCases` 和 `aCaseCount`，后续批量快照无需再手动改 QA 预期。

## 第三十三轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 51 of 51 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets。
- `npm run qa:evidence`: passed，680 cases / 1365 targets / 648 pending snapshots。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- 更新页 QA：桌面、分布位置和移动端均显示 `32 / 680` 已完成证据快照、`648` 待快照和 `0` 需关注。
- 案例库 QA：`/cases?snapshot=snapshotted` 显示 32 条，筛选标签为“已快照（32）”；`/cases?snapshot=pending_snapshot` 显示 648 条，筛选标签为“待快照（648）”。
- 已落盘案例回归：`cf5-case-laas-webgpu-world` 首页抽屉、案例抽屉、案例详情页和移动端抽屉均显示“已快照 · 2 / 2 个证据目标”。

## 第三十四轮：证据归档 host 队列运营面板

- `/updates` 新增 `Archive Queue / 下一批证据快照队列`，把待快照目标按来源 host 聚合，展示待处理 targets、涉及 cases、高优先级 targets 和已完成案例数。
- 队列默认按待快照目标数量、高优先级目标数量和 host 名排序，当前最高优先级为 `github.com`，建议命令为 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 每个 host 行都链接到 `/cases?snapshot=pending_snapshot&q={host}`，让维护者可以从更新页直接进入对应来源的待快照案例视图。
- 队列组件保留 Model Atlas 的黑白高对比、细线框、红色进度线和等宽 host 标签；长 host 和命令使用 `overflow-wrap: anywhere` 约束，避免移动端横向溢出。
- `Dataset` JSON-LD 新增“下一批证据快照 host”属性，让机器可读信息同步暴露当前归档运营重点。
- 自动视觉 QA 新增 `updatesQueue` 守门，桌面、分布滚动位置和移动端更新页都必须读到“下一批证据快照队列”、`npm run evidence:snapshot` 和 `github.com`。
- 根目录 README 和 `site/README.md` 已补充 `/updates` 的 host 级归档队列说明。

## 第三十四轮验证

- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `32 / 680` 已完成证据快照、`648` 待快照和 host 级归档队列。
- 队列 QA：`updates archive queue` 显示 `github.com 930 targets`、`raw.githubusercontent.com 69 targets`、`huggingface.co 52 targets`，并包含建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第三十五轮：证据快照历史趋势

- 新增 `site/src/data/evidence-archive-history.json`，作为证据快照覆盖率的稳定历史账本，保留批次节点并由 `npm run evidence:archive` 更新当前数据截点记录。
- `generate-evidence-archive.mjs` 已升级为同时维护 `evidence-archive.json` 和 `evidence-archive-history.json`；`--check` 会校验历史 current 记录与当前归档清单的已快照、待快照、部分快照和需关注数量一致。
- 新增 `/evidence-archive-history.json` 公开端点，并接入 `/atlas.json`、`/llms.txt` 和 `/sitemap.xml`，让 AI 工具和外部自动化能读取证据快照趋势。
- `/updates` 新增 `归档趋势 / 证据快照正在变成可追踪资产` 模块，展示当前快照覆盖率、历史节点数、批次增量、待快照压力和每个历史节点的状态。
- 当前历史包含 2 个进度节点：首批 GitHub 快照 `8` 条已快照，以及当前数据截点 `32` 条已快照；覆盖率显示为 `5%`，较上一记录增加 `24` 条。
- 自动视觉 QA 新增 `updatesHistory` 守门，更新页桌面、分布滚动位置和移动端都必须读到历史模块标题、`32 已快照` 和 `2 个进度节点`。
- 根目录 README 和 `site/README.md` 已补充 `/evidence-archive-history.json` 与历史账本维护说明。

## 第三十五轮验证

- `npm run evidence:archive`: passed，生成 `src/data/evidence-archive.json` 和 `src/data/evidence-archive-history.json`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive-history.json` 返回 `2 snapshots / latest 32 snapshotted`，`/sitemap.xml` 更新为 825 个 URL。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `证据快照正在变成可追踪资产`、`5%` 覆盖率、`2 个进度节点`、`32 已快照` 和 `648 待快照`。
- 排版回归：新增趋势模块未造成横向溢出、按钮文字溢出或 forbidden palette samples。

## 第三十六轮：证据快照待处理原因分类

- `evidence-archive.json` 新增每条案例的 `snapshotIssue`，把未完成快照拆成稳定原因：未开始抓取、部分目标成功、证据字段变化、manifest 异常和目标未通过。
- `evidence-archive.json` 顶层新增 `snapshotIssues` 聚合队列，按原因统计 cases、targets、高优先级案例和主要 host 压力；当前主要原因是 `未开始抓取`，覆盖 648 条案例、1298 个证据目标和 587 条高优先级案例。
- `generate-evidence-archive.mjs` 的 `--check` 现在会通过内容 QA 校验：非已快照案例必须有原因元数据，原因聚合 case 数必须等于所有非已快照案例数。
- `/updates` 侧栏新增 `Snapshot Reasons / 待处理原因队列`，解释当前缺口的原因、行动建议和主要 host 压力，避免把“尚未抓取”误解为“抓取失败”。
- `/atlas.json` 和 `/llms.txt` 已暴露 `snapshotIssues` 摘要，外部自动化可以直接读取当前主要待处理原因。
- 自动视觉 QA 新增 `updatesIssues` 守门，桌面、分布滚动位置和移动端更新页都必须显示“待处理原因队列”、`未开始抓取` 和 `648 cases`。

## 第三十六轮验证

- `npm run evidence:archive`: passed，生成带 `snapshotIssue` 和 `snapshotIssues` 的归档清单。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 32 snapshotted / 1 issue types`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `待处理原因队列`、`未开始抓取`、`648 cases / 1298 targets / 587 high`，并显示主要 host：`github.com 930`、`raw.githubusercontent.com 69`、`huggingface.co 52`。
- 排版回归：新增原因队列未造成横向溢出、按钮文字溢出或 forbidden palette samples。

## 第三十七轮：第三批 GitHub 证据快照与历史 checkpoint

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检第三批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第三批快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- `generate-evidence-archive.mjs` 已加固历史账本：当 `current-{datasetCut}` 被新的当前状态覆盖时，会把上一版 current 自动保留为 `snapshot-checkpoint`，避免中间批次被覆盖。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `32` 条已快照提升到 `56` 条已快照，待快照从 `648` 降到 `624`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 3 个节点：首批 GitHub 快照 `8` 条、快照进度 `32` 条、当前数据截点 `56` 条。
- 待处理原因队列同步下降为 `未开始抓取`：624 条案例、1250 个证据目标、563 条高优先级案例。
- 当前 host 压力为 `github.com 890 targets / 500 cases`、`raw.githubusercontent.com 65 targets / 64 cases`、`huggingface.co 52 targets / 29 cases`。

## 第三十七轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 56 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `3 snapshots / latest 56 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `56 / 680` 已完成证据快照、`624` 待快照、`3 个进度节点`，并显示较上一记录增加 `24` 条。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第三十八轮：第四批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检第四批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第四批快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Claude Opus 4.6 / 4.7、Cleans2S V25、DeepSeek Coder V2、DeepSeek LLM 67B 和 DeepSeek R1 系列的代码、研究、图表生成、量化研究与应用案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `56` 条已快照提升到 `80` 条已快照，待快照从 `624` 降到 `600`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 4 个节点：首批 GitHub 快照 `8` 条、快照进度 `32` 条、快照进度 `56` 条、当前数据截点 `80` 条。
- 待处理原因队列同步下降为 `未开始抓取`：600 条案例、1202 个证据目标、539 条高优先级案例。
- 当前 host 压力为 `github.com 845 targets / 476 cases`、`raw.githubusercontent.com 64 targets / 63 cases`、`huggingface.co 52 targets / 29 cases`。

## 第三十八轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 80 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `4 snapshots / latest 80 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `80 / 680` 已完成证据快照、`600` 待快照、`4 个进度节点`、`12%` 覆盖率，并显示较上一记录增加 `24` 条。
- 队列 QA：`updates archive queue` 显示 `github.com 845 targets`、`raw.githubusercontent.com 64 targets`、`huggingface.co 52 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第三十九轮：第五批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检第五批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第五批快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 DeepSeek R1 Jan、DeepSeek V2、DeepSeek V2.5、DeepSeek V3 0324 和 DeepSeek V3.1 系列的部署、量化交易、代码补全、推理服务、RAG、IDE agent 与应用案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `80` 条已快照提升到 `104` 条已快照，待快照从 `600` 降到 `576`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 5 个节点：首批 GitHub 快照 `8` 条、快照进度 `32` 条、快照进度 `56` 条、快照进度 `80` 条、当前数据截点 `104` 条。
- 待处理原因队列同步下降为 `未开始抓取`：576 条案例、1154 个证据目标、515 条高优先级案例。
- 当前 host 压力为 `github.com 800 targets / 452 cases`、`raw.githubusercontent.com 63 targets / 62 cases`、`huggingface.co 52 targets / 29 cases`。

## 第三十九轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 104 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `5 snapshots / latest 104 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `104 / 680` 已完成证据快照、`576` 待快照、`5 个进度节点`、`15%` 覆盖率，并显示较上一记录增加 `24` 条。
- 队列 QA：`updates archive queue` 显示 `github.com 800 targets`、`raw.githubusercontent.com 63 targets`、`huggingface.co 52 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十轮：raw.githubusercontent.com 原始文件证据快照

- 使用 `npm run evidence:snapshot -- --host raw.githubusercontent.com --limit 24 --dry-run` 预检第一批 raw 源高优先级案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host raw.githubusercontent.com --limit 24` 完成 raw 源快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Gemini、GLM 4.5 / 5、GPT-5.1 / 5.4 / 5.5 和 Grok 4.3 high 的原始代码、配置、评审和应用案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `104` 条已快照提升到 `128` 条已快照，待快照从 `576` 降到 `552`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 6 个节点：`8`、`32`、`56`、`80`、`104` 和当前数据截点 `128` 条。
- 修复 `generate-evidence-archive.mjs` 的历史排序规则：同一数据截点下按 `snapshottedCases` 递增排序，避免新 checkpoint 以字符串 id 排序插入到早期批次前面。
- `generate-evidence-archive.mjs --check` 新增历史顺序守门；如果历史节点顺序错误，会提示重新运行 `npm run evidence:archive`。
- 待处理原因队列同步下降为 `未开始抓取`：552 条案例、1106 个证据目标、491 条高优先级案例。
- 当前 host 压力为 `github.com 776 targets / 428 cases`、`huggingface.co 52 targets / 29 cases`、`raw.githubusercontent.com 39 targets / 38 cases`。

## 第四十轮验证

- `npm run evidence:snapshot -- --host raw.githubusercontent.com --limit 24 --dry-run`: passed，选中 24 条 raw 源高优先级案例。
- `npm run evidence:snapshot -- --host raw.githubusercontent.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点按 `8 -> 32 -> 56 -> 80 -> 104 -> 128` 排序。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 128 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `6 snapshots / latest 128 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `128 / 680` 已完成证据快照、`552` 待快照、`6 个进度节点`、`19%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 776 targets`、`huggingface.co 52 targets`、`raw.githubusercontent.com 39 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十一轮：清空 raw.githubusercontent.com 原始文件证据队列

- 使用 `npm run evidence:snapshot -- --host raw.githubusercontent.com --limit 40 --dry-run` 预检剩余 raw 源队列，共 38 条案例、76 个证据目标。
- 使用 `npm run evidence:snapshot -- --host raw.githubusercontent.com --limit 40` 完成剩余 raw 源快照，38 条案例全部成功，76 / 76 个证据目标 ok。
- 本批覆盖 Grok、Llama 2 Chat、O1、Qwen、Seed、Solar 和 Step 系列的原始 README、配置、代码入口与应用案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `128` 条已快照提升到 `166` 条已快照，待快照从 `552` 降到 `514`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 7 个节点：`8`、`32`、`56`、`80`、`104`、`128` 和当前数据截点 `166` 条。
- 待处理原因队列同步下降为 `未开始抓取`：514 条案例、1030 个证据目标、453 条高优先级案例。
- 当前 host 压力为 `github.com 741 targets / 393 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`；`raw.githubusercontent.com` 已从待处理 host 队列中清空。

## 第四十一轮验证

- `npm run evidence:snapshot -- --host raw.githubusercontent.com --limit 40 --dry-run`: passed，选中剩余 38 条 raw 源案例。
- `npm run evidence:snapshot -- --host raw.githubusercontent.com --limit 40`: passed，38 cases / 76 of 76 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 166 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `7 snapshots / latest 166 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `166 / 680` 已完成证据快照、`514` 待快照、`7 个进度节点`、`24%` 覆盖率，并显示较上一记录增加 `38` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 741 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并确认 `raw.githubusercontent.com` 已不再出现在待处理 host 队列中。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十二轮：第六批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第六批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 DeepSeek V3.1 Terminus、DeepSeek V3.2、DeepSeek V3 Dec、DeepSeek V4 Pro Max、DS V3/V4 以及 Gemini 3 Pro high 的公开仓库和技术应用案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `166` 条已快照提升到 `190` 条已快照，待快照从 `514` 降到 `490`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 8 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166` 和当前数据截点 `190` 条。
- 待处理原因队列同步下降为 `未开始抓取`：490 条案例、982 个证据目标、429 条高优先级案例。
- 当前 host 压力为 `github.com 696 targets / 369 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`。

## 第四十二轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 190 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `8 snapshots / latest 190 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `190 / 680` 已完成证据快照、`490` 待快照、`8 个进度节点`、`28%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 696 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十三轮：第七批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第七批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Gemini Code Assist、Gemini 1.5 Flash、Gemini 1.5 Pro 和 Gemini 2.0 Flash Experimental 的公开仓库、代码工具、视频分析、文档生成和多模态应用案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `190` 条已快照提升到 `214` 条已快照，待快照从 `490` 降到 `466`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 9 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190` 和当前数据截点 `214` 条。
- 待处理原因队列同步下降为 `未开始抓取`：466 条案例、934 个证据目标、405 条高优先级案例。
- 当前 host 压力为 `github.com 650 targets / 345 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`。

## 第四十三轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 214 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `9 snapshots / latest 214 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `214 / 680` 已完成证据快照、`466` 待快照、`9 个进度节点`、`31%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 650 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十四轮：第八批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第八批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Gemini 2.0 Flash Experimental、Gemini 2.0 Flash Thinking、Gemini 2.5 Pro、Gemini 3.1 Pro Preview 和 GLM-4.6 的公开仓库、RAG、搜索、代码代理、视频分析和安全分析案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `214` 条已快照提升到 `238` 条已快照，待快照从 `466` 降到 `442`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 10 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214` 和当前数据截点 `238` 条。
- 待处理原因队列同步下降为 `未开始抓取`：442 条案例、886 个证据目标、381 条高优先级案例。
- 当前 host 压力为 `github.com 606 targets / 321 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`。

## 第四十四轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 238 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `10 snapshots / latest 238 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `238 / 680` 已完成证据快照、`442` 待快照、`10 个进度节点`、`35%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 606 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十五轮：第九批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第九批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 GLM-4.6、GLM-4.7、GLM-5.1 和 GPT-3.5 Turbo 的公开仓库、MCP server、文档自动化、本地部署、Coding Agent、金融分析和 ChatGPT Web 应用案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `238` 条已快照提升到 `262` 条已快照，待快照从 `442` 降到 `418`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 11 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238` 和当前数据截点 `262` 条。
- 待处理原因队列同步下降为 `未开始抓取`：418 条案例、838 个证据目标、357 条高优先级案例。
- 当前 host 压力为 `github.com 559 targets / 297 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`。

## 第四十五轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 262 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `11 snapshots / latest 262 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `262 / 680` 已完成证据快照、`418` 待快照、`11 个进度节点`、`39%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 559 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十六轮：第十批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 GPT-3.5 Turbo、GPT-4 Turbo、GPT-4o、GPT-5.1 High 和 GPT-5.2 XHigh 的公开仓库、AI developer sandbox、自然语言 CLI、科研代理、GitHub issue agent、PDF 转 Markdown 和 Coding Agent 管理案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `262` 条已快照提升到 `286` 条已快照，待快照从 `418` 降到 `394`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 12 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262` 和当前数据截点 `286` 条。
- 待处理原因队列同步下降为 `未开始抓取`：394 条案例、790 个证据目标、333 条高优先级案例。
- 当前 host 压力为 `github.com 513 targets / 273 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`。

## 第四十六轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 286 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `12 snapshots / latest 286 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `286 / 680` 已完成证据快照、`394` 待快照、`12 个进度节点`、`42%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 513 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十七轮：第十一批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十一批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 GPT-5.2 XHigh、GPT-5.3 Codex XHigh、GPT-5.4 XHigh、GPT-5 High、GPT-5 Codex High、Grok-1 和 Grok-2 的公开仓库、Codex workflow、代码代理、课程设计、推理加速和 deep research 案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `286` 条已快照提升到 `310` 条已快照，待快照从 `394` 降到 `370`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 13 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286` 和当前数据截点 `310` 条。
- 待处理原因队列同步下降为 `未开始抓取`：370 条案例、742 个证据目标、309 条高优先级案例。
- 当前 host 压力为 `github.com 468 targets / 249 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`。

## 第四十七轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 310 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `13 snapshots / latest 310 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `310 / 680` 已完成证据快照、`370` 待快照、`13 个进度节点`、`46%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 468 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十八轮：第十二批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十二批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Grok-2、Grok-3 Mini Reasoning High、Grok-4 和 Grok Beta 的公开仓库、单细胞注释、n8n QA、PDF 翻译、Text-to-SQL、CLI agent、多代理模拟和 xAI provider 案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `310` 条已快照提升到 `334` 条已快照，待快照从 `370` 降到 `346`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 14 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310` 和当前数据截点 `334` 条。
- 待处理原因队列同步下降为 `未开始抓取`：346 条案例、694 个证据目标、285 条高优先级案例。
- 当前 host 压力为 `github.com 421 targets / 225 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`。

## 第四十八轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 334 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `14 snapshots / latest 334 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `334 / 680` 已完成证据快照、`346` 待快照、`14 个进度节点`、`49%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 421 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第四十九轮：第十三批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十三批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Grok Beta、Grok4、Claude 3 Haiku、Kimi K2 0905、Kimi K2.5 和 Kimi K2.6 的公开仓库、自动化 agent、健康问答、库存分析、PR 描述生成、deep research、OpenClaw agent 和游戏生成案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `334` 条已快照提升到 `358` 条已快照，待快照从 `346` 降到 `322`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 15 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310`、`334` 和当前数据截点 `358` 条。
- 待处理原因队列同步下降为 `未开始抓取`：322 条案例、646 个证据目标、261 条高优先级案例。
- 当前 host 压力为 `github.com 375 targets / 201 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`。

## 第四十九轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 358 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `15 snapshots / latest 358 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `358 / 680` 已完成证据快照、`322` 待快照、`15 个进度节点`、`53%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 375 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第五十轮：第十四批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十四批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Kimi K2.6、Kimi K2、Kimi K2 Thinking、KTransformers、Llama 3.1 405B 和 Llama 4 Maverick 的公开仓库、教育科技、金融分析、Claude Code red team、本地推理、内容检测、代码生成、PDF-to-podcast 和数据分析 agent 案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `358` 条已快照提升到 `382` 条已快照，待快照从 `322` 降到 `298`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 16 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310`、`334`、`358` 和当前数据截点 `382` 条。
- 待处理原因队列同步下降为 `未开始抓取`：298 条案例、598 个证据目标、237 条高优先级案例。
- 当前 host 压力为 `github.com 331 targets / 177 cases`、`huggingface.co 51 targets / 28 cases`、`anthropic.com 20 targets / 18 cases`。

## 第五十轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 382 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `16 snapshots / latest 382 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `382 / 680` 已完成证据快照、`298` 待快照、`16 个进度节点`、`56%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 331 targets`、`huggingface.co 51 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第五十一轮：第十五批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十五批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Llama 4 Maverick、Llama 65B、M27、Mem1、MiMo V2.5 Pro、MiMo V2 Flash 和 MiMo V2 Pro 的公开仓库、UI doctor、computer-use agent、分布式 prompt tuning、4bit generation、飞书多代理、代码记忆 bot、生产网关、工作流 harness 和 AI coding agent 案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `382` 条已快照提升到 `406` 条已快照，待快照从 `298` 降到 `274`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 17 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310`、`334`、`358`、`382` 和当前数据截点 `406` 条。
- 待处理原因队列同步下降为 `未开始抓取`：274 条案例、550 个证据目标、213 条高优先级案例。
- 当前 host 压力为 `github.com 289 targets / 153 cases`、`huggingface.co 49 targets / 26 cases`、`anthropic.com 20 targets / 18 cases`。

## 第五十一轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 406 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `17 snapshots / latest 406 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `406 / 680` 已完成证据快照、`274` 待快照、`17 个进度节点`、`60%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 289 targets`、`huggingface.co 49 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第五十二轮：第十六批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十六批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 MiMo V2 Pro、MiniMax M1 80K、MiniMax M2.1、MiniMax M2.5、MiniMax M2 和 Muse Spark 的公开仓库、terminal assistant、OpenClaw dispatcher、本地优先客户端、移动助手、agentic research、deep research agent、Claude Agent SDK、RAG Web UI、Hermes agent 和 LLM proxy 案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `406` 条已快照提升到 `430` 条已快照，待快照从 `274` 降到 `250`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 18 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310`、`334`、`358`、`382`、`406` 和当前数据截点 `430` 条。
- 待处理原因队列同步下降为 `未开始抓取`：250 条案例、502 个证据目标、189 条高优先级案例。
- 当前 host 压力为 `github.com 245 targets / 129 cases`、`huggingface.co 49 targets / 26 cases`、`anthropic.com 20 targets / 18 cases`。

## 第五十二轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 430 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `18 snapshots / latest 430 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `430 / 680` 已完成证据快照、`250` 待快照、`18 个进度节点`、`63%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 245 targets`、`huggingface.co 49 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第五十三轮：第十七批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十七批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Muse Spark、o1、o1-preview、o3、o3-pro、PaLM 2 和 Qwen Chat 14B 的公开仓库、hallucination testing、PhD tracker、pair programming CLI、SEC 10-K 风险分析、code interpreter 报告、agent laboratory、OpenAI o3 MCP、deep researcher、法律试点、交易系统、健康聊天机器人、电影推荐、PDF chat 和 Text2SQL 案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `430` 条已快照提升到 `454` 条已快照，待快照从 `250` 降到 `226`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 19 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310`、`334`、`358`、`382`、`406`、`430` 和当前数据截点 `454` 条。
- 待处理原因队列同步下降为 `未开始抓取`：226 条案例、454 个证据目标、165 条高优先级案例。
- 当前 host 压力为 `github.com 198 targets / 105 cases`、`huggingface.co 49 targets / 26 cases`、`anthropic.com 20 targets / 18 cases`。

## 第五十三轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430 -> 454`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 454 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `19 snapshots / latest 454 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `454 / 680` 已完成证据快照、`226` 待快照、`19 个进度节点`、`67%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430 -> 454`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 198 targets`、`huggingface.co 49 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第五十四轮：第十八批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十八批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Qwen Chat 14B、Qwen Chat 72B、Qwen1.5 Chat 110B、Qwen2.5 72B、Qwen2.5 Max 和 Qwen3 235B A22B 2507 的公开仓库、local data app、KG2Instruction、AI SRE、AutoSAT、金融分析、local agent、DB-GPT 集成、LLaMA Factory SFT、vLLM 吞吐、邮件分诊、工具调用助手、RAG assistant、Gradio demo 和竞技编程评测案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `454` 条已快照提升到 `478` 条已快照，待快照从 `226` 降到 `202`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 20 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310`、`334`、`358`、`382`、`406`、`430`、`454` 和当前数据截点 `478` 条。
- 待处理原因队列同步下降为 `未开始抓取`：202 条案例、406 个证据目标、141 条高优先级案例。
- 当前 host 压力为 `github.com 153 targets / 81 cases`、`huggingface.co 48 targets / 25 cases`、`anthropic.com 20 targets / 18 cases`。

## 第五十四轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430 -> 454 -> 478`。
- `npm run check`: passed，Astro check 0 errors、0 warnings、0 hints；content QA passed；evidence archive/history/issue QA passed。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 passed。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 478 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `20 snapshots / latest 478 snapshotted`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `478 / 680` 已完成证据快照、`202` 待快照、`20 个进度节点`、`70%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：`updates archive history progress` 返回 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430 -> 454 -> 478`，确认前台时间线与 `evidence-archive-history.json` 顺序一致。
- 队列 QA：`updates archive queue` 显示 `github.com 153 targets`、`huggingface.co 48 targets`、`anthropic.com 20 targets`，并继续给出下一批建议命令 `npm run evidence:snapshot -- --host github.com --limit 24`。
- 排版回归：`auto-updates-desktop.png`、`auto-updates-distribution.png` 和 `auto-updates-mobile.png` 均无横向溢出、无按钮文字溢出、无 forbidden palette samples。

## 第五十五轮：第十九批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第十九批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Qwen3 235B A22B 2507、Qwen3.5 397B A17B、Qwen3.6 Max Preview、Qwen3.6 Plus、Qwen3.7 Max 和 Qwen3 Max 的公开仓库、restaurant landing、Spark LLM advisor、Capz Prow dashboard、video-to-text、novel-to-video、DeepDrone、阅读助手、cell annotation、macOS Telegram agent、auto grading、3D sound journey、procurement agent、OKX Alpha Arena、长文技术写作和 RAG TA agent 案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `478` 条已快照提升到 `502` 条已快照，待快照从 `202` 降到 `178`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 21 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310`、`334`、`358`、`382`、`406`、`430`、`454`、`478` 和当前数据截点 `502` 条。
- 待处理原因队列同步下降为 `未开始抓取`：178 条案例、358 个证据目标、117 条高优先级案例。
- 当前 host 压力为 `github.com 110 targets / 57 cases`、`huggingface.co 48 targets / 25 cases`、`anthropic.com 20 targets / 18 cases`。

## 第五十五轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430 -> 454 -> 478 -> 502`。
- `npm run check`: passed，Astro check 完成 68 个文件，0 errors / 0 warnings / 0 hints；content QA 通过，`118 models / 680 A cases / data cut 2026-06-27`；证据归档 QA 通过，`680 cases / 1365 targets / 178 pending snapshots`。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 `passed`。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 502 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `21 snapshots / latest 502 snapshotted`；`/atlas.json` 返回 `118 models / 680 A cases`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `502 / 680` 已完成证据快照、`178` 待快照、`21 个进度节点`、`74%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：归档趋势顺序为 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430 -> 454 -> 478 -> 502`，移动端同样无溢出。
- 队列 QA：下一批建议命令仍为 `npm run evidence:snapshot -- --host github.com --limit 24`；当前 host 压力为 `github.com 110 targets / 57 cases`、`huggingface.co 48 targets / 25 cases`、`anthropic.com 20 targets / 18 cases`。
- 排版回归：首页、模型库、案例库、案例详情、模型对比和更新日志在桌面与 390px 移动端均无 horizontal overflow、无 overflowing actions、无 forbidden palette samples。

## 第五十六轮：第二十批 GitHub 证据快照落盘

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 预检下一批高优先级 GitHub 案例，共 24 条案例、48 个证据目标。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24` 完成第二十批 GitHub 快照，24 条案例全部成功，48 / 48 个证据目标 ok。
- 本批覆盖 Qwen3 Max、Qwen3 Max Thinking、QwQ-32B、Raycast G4F v25、Seed 2.1 Pro Preview 和 Seed1.5 VL 的公开仓库、多智能体扩展、酒店定价、创业顾问、摘要流水线、DeepResearchAgent、argument audit、UI agent reasoning support、ComfyUI style selector、LibreChat streaming fallback、chat selector、ChatBI、实时语音 agent、open coding agent、exam question generation、startup RAG、YouTube search chat、Claude Code model router、Volcengine provider、Dify plugin、AI diary 和 Midscene UI automation docs 案例。
- 重新运行 `npm run evidence:archive` 后，`evidence-archive.json` 从 `502` 条已快照提升到 `526` 条已快照，待快照从 `178` 降到 `154`，`snapshotAttentionCases` 仍为 `0`。
- `evidence-archive-history.json` 现在保留 22 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310`、`334`、`358`、`382`、`406`、`430`、`454`、`478`、`502` 和当前数据截点 `526` 条。
- 待处理原因队列同步下降为 `未开始抓取`：154 条案例、310 个证据目标、93 条高优先级案例。
- 当前 host 压力为 `github.com 63 targets / 33 cases`、`huggingface.co 48 targets / 25 cases`、`anthropic.com 20 targets / 18 cases`。

## 第五十六轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，选中 24 条 GitHub 高优先级案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430 -> 454 -> 478 -> 502 -> 526`。
- `npm run check`: passed，Astro check 完成 68 个文件，0 errors / 0 warnings / 0 hints；content QA 通过，`118 models / 680 A cases / data cut 2026-06-27`；证据归档 QA 通过，`680 cases / 1365 targets / 154 pending snapshots`。
- `npm run qa:ci`: passed，生产构建生成 822 个静态页面，视觉 QA 最终结果 `passed`。
- Endpoint QA：`/evidence-archive.json` 返回 `680 cases / 1365 targets / 526 snapshotted / 1 issue types`；`/evidence-archive-history.json` 返回 `22 snapshots / latest 526 snapshotted`；`/atlas.json` 返回 `118 models / 680 A cases`。
- 更新页 QA：桌面、分布滚动位置和移动端均显示 `526 / 680` 已完成证据快照、`154` 待快照、`22 个进度节点`、`77%` 覆盖率，并显示较上一记录增加 `24` 条。
- 历史顺序 QA：归档趋势顺序为 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430 -> 454 -> 478 -> 502 -> 526`，移动端同样无溢出。
- 队列 QA：下一批建议命令仍为 `npm run evidence:snapshot -- --host github.com --limit 24`；当前 host 压力为 `github.com 63 targets / 33 cases`、`huggingface.co 48 targets / 25 cases`、`anthropic.com 20 targets / 18 cases`。
- 排版回归：首页、模型库、案例库、案例详情、模型对比和更新日志在桌面与 390px 移动端均无 horizontal overflow、无 overflowing actions、无 forbidden palette samples。

## 第五十七轮：GitHub / Hugging Face / Anthropic 主队列清理

- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 和实际快照完成 GitHub 剩余主批次，24 条案例全部成功，48 / 48 个证据目标 ok。
- 重新运行 `npm run evidence:archive` 后，GitHub 队列从 `33 cases / 63 targets` 降到 `9 cases / 16 targets`，`evidence-archive.json` 从 `526` 条已快照提升到 `550` 条已快照。
- 使用 `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run` 和实际快照完成 GitHub 尾批次，9 条案例全部成功，18 / 18 个证据目标 ok；再次归档后 GitHub 从待处理 host 队列中消失，已快照推进到 `559` 条。
- 使用 `npm run evidence:snapshot -- --host huggingface.co --limit 24 --dry-run` 和实际快照完成 Hugging Face 主批次，24 条案例全部成功，48 / 48 个证据目标 ok；再次归档后 Hugging Face 从待处理 host 队列中消失，已快照推进到 `583` 条。
- 使用 `npm run evidence:snapshot -- --host anthropic.com --limit 24 --dry-run` 和实际快照完成 Anthropic 批次，18 条案例中 17 条完整成功，批次总计 35 / 36 个证据目标 ok；归档后已快照推进到 `600` 条，并暴露 1 条 `partial_targets`。
- 定位 `claude35-case-perplexity-search` 的失败目标为 `https://www.perplexity.ai/` 返回 Cloudflare `403 cf-mitigated: challenge`。将该案例的公开产物入口改为可抓取的 Google Play 产品页 `https://play.google.com/store/apps/details?id=ai.perplexity.app.android`，并在 `riskNotes` 记录替换原因。
- 使用 `npm run evidence:snapshot -- --case claude35-case-perplexity-search --dry-run` 和定点实际快照补齐 Perplexity 案例，2 / 2 个证据目标 ok；最终归档后 `partialSnapshotCases` 回到 `0`，`snapshotAttentionCases` 仍为 `0`。
- 当前 `evidence-archive.json` 为 `601` 条已快照、`79` 条待快照、`0` 条部分快照、`0` 条需关注，待处理原因队列为 `未开始抓取`：79 条案例、160 个证据目标、42 条高优先级案例。
- `evidence-archive-history.json` 现在保留 27 个节点：`8`、`32`、`56`、`80`、`104`、`128`、`166`、`190`、`214`、`238`、`262`、`286`、`310`、`334`、`358`、`382`、`406`、`430`、`454`、`478`、`502`、`526`、`550`、`559`、`583`、`600` 和当前数据截点 `601` 条。
- 当前 host 压力为 `bilibili.com 12 targets / 6 cases`、`openai.com 8 targets / 8 cases`、`seed.bytedance.com 8 targets / 8 cases`、`openrouter.ai 8 targets / 4 cases`、`fal.ai 6 targets / 3 cases`、`youtube.com 5 targets / 3 cases`。

## 第五十七轮验证

- `npm run evidence:snapshot -- --host github.com --limit 24 --dry-run`: passed，先后选中 24 条和 9 条 GitHub 案例。
- `npm run evidence:snapshot -- --host github.com --limit 24`: passed，33 cases / 66 of 66 targets ok。
- `npm run evidence:snapshot -- --host huggingface.co --limit 24 --dry-run`: passed，选中 24 条 Hugging Face 案例。
- `npm run evidence:snapshot -- --host huggingface.co --limit 24`: passed，24 cases / 48 of 48 targets ok。
- `npm run evidence:snapshot -- --host anthropic.com --limit 24 --dry-run`: passed，选中 18 条 Anthropic 案例。
- `npm run evidence:snapshot -- --host anthropic.com --limit 24`: passed，18 cases / 35 of 36 targets ok，并暴露 Perplexity 产物页 403 防护。
- `npm run evidence:snapshot -- --case claude35-case-perplexity-search --dry-run`: passed，选中 1 条定点修复案例。
- `npm run evidence:snapshot -- --case claude35-case-perplexity-search`: passed，1 case / 2 of 2 targets ok。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并把历史节点推进到 `8 -> 32 -> 56 -> 80 -> 104 -> 128 -> 166 -> 190 -> 214 -> 238 -> 262 -> 286 -> 310 -> 334 -> 358 -> 382 -> 406 -> 430 -> 454 -> 478 -> 502 -> 526 -> 550 -> 559 -> 583 -> 600 -> 601`。
- `npm run check`: 待完成。
- `npm run qa:ci`: 待完成。
- Endpoint QA：待完成。
- 更新页 QA：待完成。
- 历史顺序 QA：待完成。
- 队列 QA：待完成。
- 排版回归：待完成。

## 第五十八轮：Seed2.0 Pro 同步断点修复

- 定位本次断点：Hermes 云端已创建 `Seed2.0 Pro` 飞书 Wiki/云文档模型卡，但站点同步脚本只读取飞书结构化主表；只读查询显示 Bitable 模型表为 118 行且 `Seed2.0 Pro` 命中数为 0。
- 本地 `lark-cli` user profile 读取 Bitable 时返回 `Permission denied [99991679]`，需要重新授权或改用应用凭证；应用凭证只读查询成功，确认主表缺少 `Seed2.0 Pro`。
- 将 `Seed2.0 Pro` 作为官方来源热修复加入模型库，状态设为 `Hold`：可进入模型库和厂商页，但不计入活跃模型目标线，不破坏 `116` 个活跃模型与 `0` 活跃缺口口径。
- `sync-feishu.mjs` 新增官方补丁保留逻辑：如果模型带有 `sourceKind: "official_patch"` 或 `preserveOnFeishuSync: true`，且尚未出现在 Bitable 主表里，下次同步不会把它删除；等主表写入同 ID 后由结构化数据自然接管。
- 首页、更新页、README 和站点 README 已把自动化链路改为“飞书结构化主表”，并明确飞书 Wiki/云文档是模型卡草稿和溯源档案，不是常规发布源。
- 重新生成证据归档历史，数据截点推进到 `2026-06-28`；`/models/seed2-0-pro/` 已在静态构建中生成。

## 第五十八轮验证

- 飞书 Bitable 只读探测：应用凭证读取模型表成功，`118 records / 0 Seed2.0 Pro matches`。
- `npm run evidence:archive`: passed，生成 680 cases / 1365 targets，并新增当前数据截点历史节点 `current-2026-06-28`。
- `npm run check`: passed，Astro check 68 files 0 errors / 0 warnings / 0 hints；content QA 通过，`119 models / 680 A cases / data cut 2026-06-28`；证据归档 QA 通过，`680 cases / 1365 targets / 79 pending snapshots`。
- `npm run build`: passed，生成 823 个静态页面，包含 `/models/seed2-0-pro/`。
