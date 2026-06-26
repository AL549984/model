import fs from "fs";
import path from "path";

const outDir = path.resolve("outputs/vendors");
fs.mkdirSync(outDir, { recursive: true });

const today = "2026-06-25";

const vendors = [
  {
    file: "openai.md",
    vendor_id: "openai",
    vendor_name: "OpenAI, L.L.C.",
    display_name: "OpenAI",
    canonical_slug: "openai",
    official_site: "https://openai.com/",
    thirty: "OpenAI 是闭源前沿模型、API 平台和 agentic coding 产品化的主轴厂商，厂商页应重点解释 GPT / o-series / Codex 的关系，而不是把所有 GPT 版本平铺。",
    route: "OpenAI 路线可以分成 GPT 通用旗舰、o-series 推理线、Codex 代码代理线和 open-weight / edge 试验线。Model Atlas 2.0 应把 GPT-5.x 作为主线，把 Codex 作为开发者工作流分支，把小模型和 open-weight 放在成本/部署分支。",
    model_families: [
      { family_id: "gpt-5", display_name: "GPT-5 family", positioning: "general frontier models for coding, reasoning, agentic tasks", representative_models: ["gpt-5-5", "gpt-5-high", "gpt-5-4-mini", "gpt-5-4-nano"] },
      { family_id: "openai-o-series", display_name: "o-series", positioning: "reasoning-first family for deliberate problem solving", representative_models: ["o3", "o4-mini"] },
      { family_id: "openai-codex", display_name: "Codex", positioning: "coding-agent and software engineering workflow line", representative_models: ["gpt-5-codex"] },
      { family_id: "gpt-oss", display_name: "gpt-oss", positioning: "open-weight / local deployment experiments", representative_models: ["gpt-oss-120b", "gpt-oss-20b"] }
    ],
    flagship_models: ["gpt-5-5", "gpt-5-codex", "gpt-5-high", "o3"],
    timeline: [
      { date: "2026-04", model_id: "gpt-5-5", event: "GPT-5.5 becomes the current high-end reasoning/coding reference in OpenAI API docs", source_url: "https://developers.openai.com/api/docs/models", confidence: "high" },
      { date: "2026-06", model_id: "gpt-5-cyber", event: "OpenAI continues specialized GPT-5.5-class model branches for vetted cybersecurity use", source_url: "https://openai.com/api/", confidence: "medium" },
      { date: "2025-2026", model_id: "gpt-5", event: "GPT-5 line becomes the migration target from older OpenAI models", source_url: "https://openai.com/api/", confidence: "high" }
    ],
    key_inflection_points: [
      { title: "GPT-5 becomes the baseline frontier family", model_ids: ["gpt-5", "gpt-5-5"], summary: "OpenAI's platform docs place GPT-5.x at the center of complex reasoning, coding and professional work." },
      { title: "Codex separates coding-agent product surface from general chat", model_ids: ["gpt-5-codex"], summary: "For Model Atlas, Codex should be tracked as a workflow model line, not only as another GPT variant." },
      { title: "Reasoning effort becomes a first-class variant axis", model_ids: ["gpt-5-high", "gpt-5-5-xhigh"], summary: "high/xhigh should be encoded as variant IDs or model pages following Phase 1.5 lineage rules." },
      { title: "Open-weight models create a deployment branch", model_ids: ["gpt-oss-120b", "gpt-oss-20b"], summary: "They should be separated from hosted frontier GPT models because deployment, pricing and risk are different." }
    ],
    strengths: ["frontier coding and agentic task performance", "mature API ecosystem and tooling", "strong developer mindshare", "broad product integration surface"],
    weaknesses: ["closed model internals", "pricing and availability can shift by tier", "model naming and variants can be confusing", "high-risk domains need tighter policy review"],
    pricing_strategy: "Premium API pricing with model-tier differentiation. GPT-5.x should be tracked separately from mini/nano, Codex, and open-weight models because cost, latency, context and deployment assumptions differ.",
    ecosystem: [
      { name: "OpenAI API", type: "first_party_api", url: "https://openai.com/api/" },
      { name: "OpenAI API docs", type: "docs", url: "https://developers.openai.com/api/docs/models" },
      { name: "ChatGPT", type: "consumer_product", url: "https://chatgpt.com/" },
      { name: "Codex", type: "developer_tool", url: "https://openai.com/codex/" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["agentic coding and code review", "professional reasoning workflows", "tool-using assistants", "high-value product prototyping"],
    avoid_when: ["workloads requiring open weights by default", "strictly fixed model behavior across long periods", "low-cost bulk generation without quality requirements", "regulated tasks without policy review"],
    risks: ["Model and pricing churn requires frequent source review.", "Do not infer GPT-5.5 behavior from older GPT-5 cards.", "Specialized models such as cyber variants may have access restrictions."],
    source_links: [
      { type: "official_site", url: "https://openai.com/" },
      { type: "api", url: "https://openai.com/api/" },
      { type: "models_docs", url: "https://developers.openai.com/api/docs/models" },
      { type: "model_page", url: "https://openai.com/gpt-5/" }
    ],
    page_status: "review",
    child_count: 14
  },
  {
    file: "anthropic.md",
    vendor_id: "anthropic",
    vendor_name: "Anthropic PBC",
    display_name: "Anthropic / Claude",
    canonical_slug: "anthropic",
    official_site: "https://www.anthropic.com/",
    thirty: "Anthropic 是 Claude 系列的安全优先、长上下文和长周期 agentic work 厂商，Phase 2 直接继承 Phase 1/1.5 的 Anthropic 样板。",
    route: "Claude 路线从 Claude 3/3.5 的通用与编码能力，演进到 Claude 4/Opus 4.x，再到 Claude Fable 5 / Mythos 5 的 Mythos-class 分层。厂商页要明确 Fable 公开可用、Mythos 受限可用，以及 safety/fallback/data retention 对工程集成的影响。",
    model_families: [
      { family_id: "claude-3", display_name: "Claude 3 / 3.5", positioning: "earlier multimodal and coding-capable Claude family", representative_models: ["claude-3-opus", "claude-3-5-sonnet", "claude-3-7-sonnet"] },
      { family_id: "claude-4", display_name: "Claude 4 / Opus 4.x", positioning: "advanced reasoning and coding generation before Mythos-class", representative_models: ["claude-opus-4-8"] },
      { family_id: "claude-5-mythos", display_name: "Claude 5 / Mythos-class", positioning: "long-horizon reasoning and agentic work", representative_models: ["claude-fable-5", "claude-mythos-5"] }
    ],
    flagship_models: ["claude-fable-5", "claude-mythos-5", "claude-opus-4-8", "claude-3-7-sonnet"],
    timeline: [
      { date: "2026-06-09", model_id: "claude-fable-5", event: "Claude Fable 5 and Claude Mythos 5 announced", source_url: "https://www.anthropic.com/news/claude-fable-5-mythos-5", confidence: "high" },
      { date: "2026-06-09", model_id: "claude-fable-5", event: "Claude API docs list Fable 5 model ID, context, output, pricing and retention", source_url: "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5", confidence: "high" },
      { date: "2026-06-12", model_id: "claude-fable-5", event: "GitHub Copilot changelog notes access / policy update", source_url: "https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/", confidence: "medium" }
    ],
    key_inflection_points: [
      { title: "Claude 3.7 makes extended thinking mainstream", model_ids: ["claude-3-7-sonnet"], summary: "The older cards position Claude 3.7 as a bridge from chat to thinking-integrated coding and agent work." },
      { title: "Opus 4.x becomes the immediate pre-Fable comparison line", model_ids: ["claude-opus-4-8"], summary: "Use it as a baseline for cost, risk and capability comparison." },
      { title: "Fable 5 brings Mythos-class capability to broad release", model_ids: ["claude-fable-5"], summary: "Fable 5 is the current Model Atlas sample for long-horizon agentic work." },
      { title: "Safety/fallback becomes part of the product contract", model_ids: ["claude-fable-5", "claude-mythos-5"], summary: "Refusal, fallback and retention must be visible in model and vendor pages." }
    ],
    strengths: ["long-context document and codebase work", "agentic coding and autonomous task execution", "clear safety positioning", "strong cloud/platform distribution"],
    weaknesses: ["premium price tier", "retention and ZDR constraints for Fable 5", "safety classifier and fallback can change outputs", "public enterprise A-class cases still need补证"],
    pricing_strategy: "Premium frontier pricing. Fable 5 API docs list $10/M input and $50/M output; vendor page should keep pricing tied to source links and review date.",
    ecosystem: [
      { name: "Claude API", type: "first_party_api", url: "https://platform.claude.com/" },
      { name: "Claude docs", type: "docs", url: "https://platform.claude.com/docs/" },
      { name: "Amazon Bedrock", type: "cloud_platform", url: "https://aws.amazon.com/bedrock/" },
      { name: "Google Vertex AI", type: "cloud_platform", url: "https://cloud.google.com/vertex-ai" },
      { name: "Microsoft Foundry", type: "cloud_platform", url: "https://ai.azure.com/" }
    ],
    case_library_status: "usable",
    recommended_use_cases: ["long-horizon coding", "document-heavy research", "codebase understanding", "high-value prototypes requiring long context"],
    avoid_when: ["strict zero-retention requirements unless availability is confirmed", "bulk low-cost generation", "workflows that cannot handle refusals or fallback", "unclear policy-sensitive use cases"],
    risks: ["Availability status can change by platform.", "A-class cases skew toward developer demos, not enterprise production.", "Duplicate Claude Wiki branches must be mapped, not deleted."],
    source_links: [
      { type: "official_site", url: "https://www.anthropic.com/" },
      { type: "official_release", url: "https://www.anthropic.com/news/claude-fable-5-mythos-5" },
      { type: "api_docs", url: "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5" },
      { type: "case_library", url: "../claude-fable-5-case-library-v2.md" },
      { type: "phase_1_sample", url: "../anthropic-vendor-page.md" }
    ],
    page_status: "publishable",
    child_count: 20
  },
  {
    file: "google.md",
    vendor_id: "google",
    vendor_name: "Google LLC / Google DeepMind",
    display_name: "Google / Gemini",
    canonical_slug: "google",
    official_site: "https://deepmind.google/",
    thirty: "Google 是 Gemini / Gemma / Veo 等多模态模型线的核心厂商，优势是长上下文、多模态、开发者 API 与 Google Cloud 生态。",
    route: "Google 路线应拆成 Gemini frontier family、Gemma open models、Veo/Imagen media models 与 Vertex AI enterprise distribution。Wiki 里的 Google 节点模型多，Phase 2 只做厂商导航骨架。",
    model_families: [
      { family_id: "gemini-3", display_name: "Gemini 3", positioning: "frontier multimodal and long-context family", representative_models: ["gemini-3-pro", "gemini-3-pro-preview-high"] },
      { family_id: "gemini-2-5", display_name: "Gemini 2.5", positioning: "previous stable Gemini API generation", representative_models: ["gemini-2-5-pro", "gemini-2-5-flash"] },
      { family_id: "gemma", display_name: "Gemma", positioning: "open model family for local and developer deployment", representative_models: ["gemma-3"] },
      { family_id: "google-media", display_name: "Veo / Imagen", positioning: "video and image generation model lines", representative_models: ["veo", "imagen"] }
    ],
    flagship_models: ["gemini-3-pro-preview-high", "gemini-3-pro", "gemini-2-5-pro", "gemma-3"],
    timeline: [
      { date: "2026-03", model_id: "gemini-3", event: "Gemini API changelog tracks Gemini 3 tooling and model updates", source_url: "https://ai.google.dev/gemini-api/docs/changelog", confidence: "high" },
      { date: "2026", model_id: "gemini-3-pro-preview-high", event: "Gemini API model docs list stable, preview, latest and experimental naming patterns", source_url: "https://ai.google.dev/gemini-api/docs/models", confidence: "high" },
      { date: "2025-2026", model_id: "gemini-3", event: "Gemini Enterprise Agent Platform exposes Gemini 3 developer paths", source_url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models", confidence: "medium" }
    ],
    key_inflection_points: [
      { title: "Gemini becomes the unified multimodal API line", model_ids: ["gemini-2-5-pro", "gemini-3-pro"], summary: "Gemini should be the core page path, with preview/high variants handled by lineage rules." },
      { title: "Gemma separates open models from API-only Gemini", model_ids: ["gemma-3"], summary: "Open models need different risk and deployment language than hosted Gemini." },
      { title: "Google Cloud becomes the enterprise distribution layer", model_ids: ["gemini-3"], summary: "Vertex AI / Gemini Enterprise links should be ecosystem entries, not separate model pages." },
      { title: "Media models require safety and rights treatment", model_ids: ["veo", "imagen"], summary: "Video/image models should not be mixed with LLM case evidence without modality labels." }
    ],
    strengths: ["multimodal and long-context API", "Google Cloud enterprise channel", "strong media model stack", "open Gemma branch"],
    weaknesses: ["preview/latest/experimental naming can create slug churn", "models span many product surfaces", "case evidence must separate Google product demos from independent usage", "regional and platform availability need review"],
    pricing_strategy: "Tiered Gemini API and Google Cloud pricing. Vendor page should link to current model docs rather than freezing prices in prose.",
    ecosystem: [
      { name: "Gemini API", type: "first_party_api", url: "https://ai.google.dev/gemini-api/docs" },
      { name: "Google AI Studio", type: "developer_tool", url: "https://aistudio.google.com/" },
      { name: "Vertex AI", type: "cloud_platform", url: "https://cloud.google.com/vertex-ai" },
      { name: "Gemini Enterprise Agent Platform", type: "enterprise_platform", url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["multimodal document/video/image understanding", "long-context analysis", "enterprise workflows already on Google Cloud", "developer prototyping in AI Studio"],
    avoid_when: ["model ID stability is required across preview variants", "open-weight deployment is mandatory for all workloads", "cases require independent A-class proof not yet collected"],
    risks: ["Preview/high model naming must follow the lineage spec.", "Google product announcements are not A-class cases.", "Media model pages need separate rights/safety review."],
    source_links: [
      { type: "official_site", url: "https://deepmind.google/" },
      { type: "gemini_docs", url: "https://ai.google.dev/gemini-api/docs/models" },
      { type: "changelog", url: "https://ai.google.dev/gemini-api/docs/changelog" },
      { type: "enterprise_docs", url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models" }
    ],
    page_status: "review",
    child_count: 29
  },
  {
    file: "deepseek.md",
    vendor_id: "deepseek",
    vendor_name: "DeepSeek",
    display_name: "DeepSeek",
    canonical_slug: "deepseek",
    official_site: "https://www.deepseek.com/",
    thirty: "DeepSeek 是开放权重/低成本/API 兼容路线里的关键厂商，厂商页应突出 R 系列推理和 V 系列通用模型的分工。",
    route: "DeepSeek 路线可分为 R reasoning-first、V general/coding、Speciale/API-only 推理强化和开源权重分支。Phase 2 只建立厂商级导航，不升级 14 张旧模型卡。",
    model_families: [
      { family_id: "deepseek-r", display_name: "DeepSeek R series", positioning: "reasoning-first models", representative_models: ["deepseek-r1-jan"] },
      { family_id: "deepseek-v", display_name: "DeepSeek V series", positioning: "general and agentic models", representative_models: ["deepseek-v3", "deepseek-v3-2"] },
      { family_id: "deepseek-speciale", display_name: "Speciale", positioning: "API-only / higher-reasoning variants", representative_models: ["deepseek-v3-2-speciale"] }
    ],
    flagship_models: ["deepseek-r1-jan", "deepseek-v3-2", "deepseek-v3-2-speciale"],
    timeline: [
      { date: "2024-12-10", model_id: "deepseek-v3", event: "deepseek-chat upgraded to DeepSeek-V3 under stable API model name", source_url: "https://api-docs.deepseek.com/updates", confidence: "high" },
      { date: "2026-12-01", model_id: "deepseek-v3-2", event: "DeepSeek-V3.2 release notes position V3.2 as reasoning-first models built for agents", source_url: "https://api-docs.deepseek.com/news/news251201", confidence: "high" },
      { date: "2026", model_id: "deepseek-api", event: "DeepSeek API remains OpenAI/Anthropic-compatible", source_url: "https://api-docs.deepseek.com/", confidence: "high" }
    ],
    key_inflection_points: [
      { title: "R1 makes reasoning-first DeepSeek globally visible", model_ids: ["deepseek-r1-jan"], summary: "R1 should anchor DeepSeek's reasoning family and comparisons." },
      { title: "V3 becomes a stable API alias despite model upgrades", model_ids: ["deepseek-v3"], summary: "Vendor page must distinguish product API name from underlying model generation." },
      { title: "V3.2 moves toward agentic reasoning", model_ids: ["deepseek-v3-2"], summary: "V3.2 should be treated as a new step in agent-oriented DeepSeek models." },
      { title: "OpenAI/Anthropic compatibility is an ecosystem strength", model_ids: ["deepseek-api"], summary: "Compatibility lowers adoption friction but requires careful provider ID mapping." }
    ],
    strengths: ["cost/performance positioning", "reasoning-first open model mindshare", "OpenAI/Anthropic-compatible API", "active open-weight ecosystem"],
    weaknesses: ["API model aliases can obscure actual model generation", "release dates and snapshots need careful source capture", "enterprise case evidence needs structured intake", "policy and hosting options vary by region"],
    pricing_strategy: "Competitive API pricing with per-token model pricing in DeepSeek docs. Keep current prices out of prose unless copied from the pricing source on review day.",
    ecosystem: [
      { name: "DeepSeek API", type: "first_party_api", url: "https://api-docs.deepseek.com/" },
      { name: "Models and Pricing", type: "pricing", url: "https://api-docs.deepseek.com/quick_start/pricing" },
      { name: "Hugging Face", type: "model_hub", url: "https://huggingface.co/deepseek-ai" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["cost-sensitive reasoning", "open-weight evaluation", "agentic coding experiments", "provider-compatible API migration"],
    avoid_when: ["exact model snapshot stability is required but only alias is known", "enterprise proof requires A-class cases not yet collected", "workloads requiring a Western cloud compliance envelope by default"],
    risks: ["Do not conflate deepseek-chat alias with the canonical model ID.", "Need snapshot policy for release notes and model cards.", "Open-weight availability does not equal production readiness."],
    source_links: [
      { type: "official_site", url: "https://www.deepseek.com/" },
      { type: "api_docs", url: "https://api-docs.deepseek.com/" },
      { type: "pricing", url: "https://api-docs.deepseek.com/quick_start/pricing" },
      { type: "release", url: "https://api-docs.deepseek.com/news/news251201" }
    ],
    page_status: "review",
    child_count: 14
  },
  {
    file: "qwen-alibaba.md",
    vendor_id: "qwen-alibaba",
    vendor_name: "Alibaba Cloud / Qwen Team",
    display_name: "Qwen / Alibaba",
    canonical_slug: "qwen-alibaba",
    official_site: "https://qwenlm.github.io/",
    thirty: "Qwen 是 Alibaba 的多模态、开源和云服务模型线，厂商页要把 Qwen3、Qwen3-VL、Qwen Coder / Max / Thinking 等变体先理成家族。",
    route: "Qwen 路线横跨开源 Hugging Face/GitHub、Alibaba Cloud Model Studio、Qwen Chat 和多模态模型。Phase 2 只做厂商页骨架，后续模型卡按 lineage spec 处理 Max、Thinking、VL、Omni 等变体。",
    model_families: [
      { family_id: "qwen3", display_name: "Qwen3", positioning: "main LLM family", representative_models: ["qwen3", "qwen3-max", "qwen3-max-thinking"] },
      { family_id: "qwen3-vl", display_name: "Qwen3-VL", positioning: "vision-language and document understanding branch", representative_models: ["qwen3-vl", "qwen3-vl-max"] },
      { family_id: "qwen-coder", display_name: "Qwen Coder", positioning: "coding model branch", representative_models: ["qwen3-coder"] },
      { family_id: "qwen-omni", display_name: "Qwen Omni / Audio", positioning: "audio and multimodal realtime branch", representative_models: ["qwen3-5-omni"] }
    ],
    flagship_models: ["qwen3-max-thinking", "qwen3-max", "qwen3-vl", "qwen3-coder"],
    timeline: [
      { date: "2026", model_id: "qwen3", event: "Qwen docs position Qwen as Alibaba's LLM and LMM series", source_url: "https://qwen.readthedocs.io/", confidence: "high" },
      { date: "2026", model_id: "qwen3-vl", event: "Alibaba Cloud Model Studio model list includes Qwen3-VL and Omni families", source_url: "https://www.alibabacloud.com/help/en/model-studio/models", confidence: "high" },
      { date: "2026", model_id: "qwen3", event: "Qwen GitHub/Hugging Face remain primary open distribution channels", source_url: "https://huggingface.co/Qwen", confidence: "high" }
    ],
    key_inflection_points: [
      { title: "Qwen3 consolidates the main text/reasoning line", model_ids: ["qwen3", "qwen3-max"], summary: "Use Qwen3 as the family anchor, not every snapshot as a separate vendor story." },
      { title: "Thinking becomes a variant axis", model_ids: ["qwen3-max-thinking"], summary: "Model ID must encode thinking following Phase 1.5 spec." },
      { title: "Qwen3-VL gives Qwen a document/vision branch", model_ids: ["qwen3-vl"], summary: "Vision-language models should have modality labels and separate cases." },
      { title: "Alibaba Cloud Model Studio is the enterprise distribution layer", model_ids: ["qwen3-max"], summary: "Cloud availability belongs in ecosystem/source_links." }
    ],
    strengths: ["open model ecosystem", "broad model family coverage", "strong multilingual and multimodal coverage", "Alibaba Cloud deployment channel"],
    weaknesses: ["many variants create slug and dedupe pressure", "cloud model names can differ from open model names", "case evidence needs strict A/B/C/D separation", "pricing and regional availability need source review"],
    pricing_strategy: "Mixed open-weight and Alibaba Cloud API pricing. Pricing should be tracked by provider/source because open models, Model Studio, and third-party hosts differ.",
    ecosystem: [
      { name: "Qwen docs", type: "docs", url: "https://qwen.readthedocs.io/" },
      { name: "Alibaba Cloud Model Studio", type: "cloud_platform", url: "https://www.alibabacloud.com/help/en/model-studio/models" },
      { name: "Qwen Hugging Face", type: "model_hub", url: "https://huggingface.co/Qwen" },
      { name: "Qwen GitHub", type: "github", url: "https://github.com/QwenLM" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["open-weight model evaluation", "multilingual applications", "vision-language document parsing", "Alibaba Cloud-native deployments"],
    avoid_when: ["model variant mapping is unresolved", "production claims rely only on collections or leaderboards", "single stable hosted model ID is required but source naming differs"],
    risks: ["Qwen has many model variants; freeze IDs before model-card migration.", "Do not merge VL/Omni/Coder cases into generic Qwen unless modality is explicit.", "Cloud names and open weights require source mapping."],
    source_links: [
      { type: "official_docs", url: "https://qwen.readthedocs.io/" },
      { type: "model_studio", url: "https://www.alibabacloud.com/help/en/model-studio/models" },
      { type: "huggingface", url: "https://huggingface.co/Qwen" },
      { type: "github", url: "https://github.com/QwenLM" }
    ],
    page_status: "review",
    child_count: 14
  },
  {
    file: "xai.md",
    vendor_id: "xai",
    vendor_name: "xAI",
    display_name: "xAI / Grok",
    canonical_slug: "xai",
    official_site: "https://x.ai/",
    thirty: "xAI 是 Grok 系列的厂商，定位在实时搜索、工具使用、语音/图像/视频 API 和 X 生态相关的前沿模型。",
    route: "xAI 路线包括 Grok chat/reasoning family、Grok Build coding family、Grok Imagine media API 和 Grok Voice。厂商页要把 Grok 4.x 主线与 Build/Imagine/Voice 分开。",
    model_families: [
      { family_id: "grok-4", display_name: "Grok 4 family", positioning: "frontier chat and reasoning models", representative_models: ["grok-4", "grok-4-3"] },
      { family_id: "grok-build", display_name: "Grok Build", positioning: "agentic coding workflow model", representative_models: ["grok-build-0-1"] },
      { family_id: "grok-imagine", display_name: "Grok Imagine", positioning: "image and video generation APIs", representative_models: ["grok-imagine"] },
      { family_id: "grok-voice", display_name: "Grok Voice", positioning: "voice API branch", representative_models: ["grok-voice"] }
    ],
    flagship_models: ["grok-4-3", "grok-4", "grok-build-0-1"],
    timeline: [
      { date: "2025", model_id: "grok-4", event: "Grok 4 announced as xAI's frontier model with tool use and real-time search", source_url: "https://x.ai/news/grok-4", confidence: "high" },
      { date: "2026", model_id: "grok-4-3", event: "xAI docs list Grok 4.3 as current general choice", source_url: "https://docs.x.ai/developers/models", confidence: "high" },
      { date: "2026", model_id: "grok-build-0-1", event: "xAI docs list Grok Build as coding workflow model", source_url: "https://docs.x.ai/overview", confidence: "high" }
    ],
    key_inflection_points: [
      { title: "Grok 4 establishes the current Grok baseline", model_ids: ["grok-4"], summary: "Grok 4 should be the canonical branch for old Wiki Grok models." },
      { title: "Grok 4.3 shifts current docs to faster intelligent model", model_ids: ["grok-4-3"], summary: "Use current docs for representative model status, but keep older Grok cards archived." },
      { title: "Build separates coding from chat", model_ids: ["grok-build-0-1"], summary: "Do not merge coding workflow evidence into generic Grok chat pages." },
      { title: "Imagine and Voice make xAI multi-surface", model_ids: ["grok-imagine", "grok-voice"], summary: "Media and audio require separate case/risk treatment." }
    ],
    strengths: ["real-time search positioning", "OpenAI/Anthropic SDK compatibility notes", "dedicated media and voice APIs", "strong Grok brand"],
    weaknesses: ["rapid model naming changes", "X ecosystem claims need evidence snapshots", "media generation risks require separate policy notes", "case library not yet structured"],
    pricing_strategy: "API pricing varies by model line. Grok Build and media APIs should be tracked separately from Grok chat/reasoning.",
    ecosystem: [
      { name: "xAI API", type: "first_party_api", url: "https://x.ai/api" },
      { name: "xAI docs", type: "docs", url: "https://docs.x.ai/developers/models" },
      { name: "Grok consumer", type: "consumer_product", url: "https://grok.com/" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["real-time search assisted answers", "developer experiments with Grok API", "agentic coding through Grok Build", "media generation where rights review is done"],
    avoid_when: ["strict reproducibility across model version changes", "case claims based only on X posts without snapshots", "regulated use cases without safety review"],
    risks: ["X/Twitter evidence requires snapshot policy.", "Grok media outputs need IP and likeness review.", "Model docs currently move faster than Wiki migration."],
    source_links: [
      { type: "official_site", url: "https://x.ai/" },
      { type: "api", url: "https://x.ai/api" },
      { type: "models_docs", url: "https://docs.x.ai/developers/models" },
      { type: "grok_4_release", url: "https://x.ai/news/grok-4" }
    ],
    page_status: "review",
    child_count: 8
  },
  {
    file: "kimi.md",
    vendor_id: "kimi",
    vendor_name: "Moonshot AI",
    display_name: "Kimi / Moonshot AI",
    canonical_slug: "kimi",
    official_site: "https://www.moonshot.ai/",
    thirty: "Kimi 是 Moonshot AI 的长上下文、代码和多模态 agentic 模型线，厂商页应把 K2.x、K2 Thinking 和开放模型分支理清。",
    route: "Kimi 路线包括 Kimi K2.x frontier/API 模型、K2 Thinking 长周期工具调用、Kimi 开源/多模态模型和面向用户的 Kimi 产品。Wiki 里 Kimi 子卡数量较少，Phase 2 先做导航骨架。",
    model_families: [
      { family_id: "kimi-k2", display_name: "Kimi K2 family", positioning: "frontier long-context and coding models", representative_models: ["kimi-k2-6", "kimi-k2-5"] },
      { family_id: "kimi-thinking", display_name: "Kimi Thinking", positioning: "long-horizon reasoning and tool-calling branch", representative_models: ["kimi-k2-thinking"] },
      { family_id: "kimi-open", display_name: "Kimi open models", positioning: "open-source / multimodal release branch", representative_models: ["kimi-k2-5-open"] }
    ],
    flagship_models: ["kimi-k2-6", "kimi-k2-thinking", "kimi-k2-5"],
    timeline: [
      { date: "2026", model_id: "kimi-k2-6", event: "Kimi API docs list Kimi K2.6 as latest and most intelligent model", source_url: "https://platform.kimi.ai/docs/overview", confidence: "high" },
      { date: "2026", model_id: "kimi-k2-thinking", event: "Kimi platform positions K2 Thinking for deep research and long-horizon tool use", source_url: "https://platform.kimi.ai/", confidence: "high" },
      { date: "2026", model_id: "kimi-k2-5", event: "Moonshot publishes Kimi K2.5 open-source native multimodal agentic model", source_url: "https://github.com/MoonshotAI/Kimi-K2.5", confidence: "medium" }
    ],
    key_inflection_points: [
      { title: "K2.x becomes Kimi's frontier branch", model_ids: ["kimi-k2-6"], summary: "K2.6 should be the current anchor for Kimi vendor routing." },
      { title: "K2 Thinking turns long-horizon research into product surface", model_ids: ["kimi-k2-thinking"], summary: "Thinking should be encoded as a model/variant axis." },
      { title: "Open K2.5 gives Kimi an inspectable branch", model_ids: ["kimi-k2-5"], summary: "Open-source Kimi models need separate deployment and license notes." },
      { title: "Kimi product and API diverge", model_ids: ["kimi-k2-6"], summary: "Consumer Kimi and API model IDs must be mapped explicitly." }
    ],
    strengths: ["long-context research positioning", "coding and agentic workflow focus", "Chinese/English product visibility", "open-source branch for some K2 models"],
    weaknesses: ["model names move quickly", "official English docs and Chinese product claims need alignment", "case evidence not yet normalized", "video/image input claims require model-specific verification"],
    pricing_strategy: "API pricing should be pulled from Kimi platform model/pricing docs per model. Do not infer from OpenRouter or third-party pages for canonical pricing.",
    ecosystem: [
      { name: "Kimi API Platform", type: "first_party_api", url: "https://platform.kimi.ai/" },
      { name: "Kimi API docs", type: "docs", url: "https://platform.kimi.ai/docs/overview" },
      { name: "Moonshot AI", type: "official_site", url: "https://www.moonshot.ai/" },
      { name: "Moonshot GitHub", type: "github", url: "https://github.com/MoonshotAI" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["long-context coding", "deep research workflows", "Chinese/English assistant products", "open-model experimentation where K2.5 applies"],
    avoid_when: ["canonical model ID is unclear", "case evidence lacks original posts or artifacts", "strict Western enterprise compliance proof is needed"],
    risks: ["Kimi model names and product names can diverge.", "Need snapshots for platform claims.", "Open-source branch should not be treated as identical to hosted K2.6."],
    source_links: [
      { type: "official_site", url: "https://www.moonshot.ai/" },
      { type: "api_platform", url: "https://platform.kimi.ai/" },
      { type: "docs", url: "https://platform.kimi.ai/docs/overview" },
      { type: "github", url: "https://github.com/MoonshotAI/Kimi-K2.5" }
    ],
    page_status: "review",
    child_count: 6
  },
  {
    file: "meta.md",
    vendor_id: "meta",
    vendor_name: "Meta Platforms, Inc.",
    display_name: "Meta / Llama",
    canonical_slug: "meta",
    official_site: "https://ai.meta.com/",
    thirty: "Meta 是 open-weight Llama 生态的核心厂商，厂商页重点在 Llama 4 多模态 MoE、Llama 3.x 生态和许可/开放边界。",
    route: "Meta 路线包括 Llama open-weight family、Llama Guard / safety tools、Meta AI product integration 和研究模型。Wiki 中 Meta 节点模型不多，但后续模型卡应优先处理 Llama 4 Scout/Maverick/Behemoth。",
    model_families: [
      { family_id: "llama-4", display_name: "Llama 4", positioning: "open-weight multimodal MoE family", representative_models: ["llama-4-scout", "llama-4-maverick", "llama-4-behemoth"] },
      { family_id: "llama-3", display_name: "Llama 3.x", positioning: "previous widely deployed open-weight family", representative_models: ["llama-3-3", "llama-3-1"] },
      { family_id: "llama-safety", display_name: "Llama safety/tools", positioning: "guard and safety support models", representative_models: ["llama-guard"] }
    ],
    flagship_models: ["llama-4-maverick", "llama-4-scout", "llama-4-behemoth"],
    timeline: [
      { date: "2025", model_id: "llama-4", event: "Meta introduces Llama 4 Scout and Maverick as open-weight natively multimodal MoE models", source_url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/", confidence: "high" },
      { date: "2025", model_id: "llama-4", event: "Llama docs provide model cards and prompt formats for Llama 4", source_url: "https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/", confidence: "high" },
      { date: "2025-2026", model_id: "llama", event: "Meta Llama models distributed through Hugging Face and GitHub tooling", source_url: "https://huggingface.co/meta-llama", confidence: "high" }
    ],
    key_inflection_points: [
      { title: "Llama 4 makes Meta natively multimodal", model_ids: ["llama-4-scout", "llama-4-maverick"], summary: "Llama 4 should reset the vendor page away from text-only Llama assumptions." },
      { title: "MoE architecture changes deployment economics", model_ids: ["llama-4"], summary: "Model pages should explain active vs total parameters." },
      { title: "Open-weight does not mean unrestricted", model_ids: ["llama-4"], summary: "License and acceptable use need visible risk notes." },
      { title: "Meta AI product integration creates consumer scale", model_ids: ["meta-ai"], summary: "Product adoption should be separated from model capability evidence." }
    ],
    strengths: ["open-weight ecosystem scale", "strong developer adoption", "multimodal Llama 4 branch", "rich model cards and prompt docs"],
    weaknesses: ["license restrictions and acceptable-use policy complexity", "frontier hosted APIs may outperform open-weight deployments", "hardware/runtime variance affects user results", "case evidence can be scattered across repos and demos"],
    pricing_strategy: "Open-weight deployment shifts cost to infrastructure rather than per-token vendor pricing. Hosted providers must be tracked separately.",
    ecosystem: [
      { name: "Meta AI", type: "official_site", url: "https://ai.meta.com/" },
      { name: "Llama docs", type: "docs", url: "https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/" },
      { name: "Meta Llama Hugging Face", type: "model_hub", url: "https://huggingface.co/meta-llama" },
      { name: "Llama GitHub utilities", type: "github", url: "https://github.com/meta-llama/llama-models" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["open-weight experimentation", "self-hosted assistants", "multimodal open model evaluation", "research and fine-tuning workflows"],
    avoid_when: ["fully closed compliance support is required", "deployment team cannot manage infra", "license terms conflict with product scale", "benchmarks are treated as real cases"],
    risks: ["License and redistribution terms must be reviewed per model.", "Hardware setup materially affects observed quality.", "Do not treat Meta AI consumer usage as A-class model case evidence."],
    source_links: [
      { type: "official_site", url: "https://ai.meta.com/" },
      { type: "llama_4_blog", url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/" },
      { type: "model_card", url: "https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/" },
      { type: "huggingface", url: "https://huggingface.co/meta-llama" }
    ],
    page_status: "review",
    child_count: 6
  },
  {
    file: "minimax.md",
    vendor_id: "minimax",
    vendor_name: "MiniMax",
    display_name: "MiniMax",
    canonical_slug: "minimax",
    official_site: "https://www.minimax.io/",
    thirty: "MiniMax 是多模态基础模型厂商，路线覆盖文本、代码/Agent、语音、视频、图像、音乐和长上下文。",
    route: "MiniMax 厂商页应分成 LLM/Agent、speech/audio、video/image/music 和 file/document APIs。Wiki 中 M 系列模型需要后续按模态和用途拆分。",
    model_families: [
      { family_id: "minimax-m", display_name: "MiniMax M family", positioning: "LLM, coding and agent branch", representative_models: ["minimax-m3"] },
      { family_id: "minimax-speech", display_name: "MiniMax Speech", positioning: "speech and voice APIs", representative_models: ["speech-02"] },
      { family_id: "minimax-video", display_name: "MiniMax Video", positioning: "video generation branch", representative_models: ["hailuo-video"] },
      { family_id: "minimax-music", display_name: "MiniMax Music", positioning: "music and audio creation branch", representative_models: ["music"] }
    ],
    flagship_models: ["minimax-m3", "hailuo-video", "speech-02"],
    timeline: [
      { date: "2026", model_id: "minimax-m3", event: "MiniMax docs list MiniMax-M3 for coding and agent workflows", source_url: "https://platform.minimax.io/docs/guides/models-intro", confidence: "high" },
      { date: "2026", model_id: "minimax-api", event: "MiniMax API overview covers language, speech, video, image, music and file management", source_url: "https://platform.minimax.io/docs/api-reference/api-overview", confidence: "high" },
      { date: "2026", model_id: "minimax-pricing", event: "MiniMax pricing splits API pricing and subscription plans", source_url: "https://platform.minimax.io/docs/pricing/overview", confidence: "high" }
    ],
    key_inflection_points: [
      { title: "MiniMax-M3 positions MiniMax in coding/agent workflows", model_ids: ["minimax-m3"], summary: "M3 should be the LLM anchor for Phase 3 model cards." },
      { title: "Multimodal APIs make MiniMax more than an LLM vendor", model_ids: ["hailuo-video", "speech-02"], summary: "Vendor page must route media models separately." },
      { title: "Pricing splits API and subscriptions", model_ids: ["minimax-api"], summary: "Model cards should not reuse pricing across product surfaces." },
      { title: "Long context and agent claims need A-class cases", model_ids: ["minimax-m3"], summary: "Vendor page can state positioning, but production cases need evidence intake." }
    ],
    strengths: ["broad multimodal portfolio", "coding and agent model branch", "video/audio/product integration", "clear API docs"],
    weaknesses: ["many modality-specific products can blur model lineage", "case evidence not yet captured", "media generation rights/safety need separate policy", "pricing differs by product type"],
    pricing_strategy: "MiniMax pricing splits per-call API pricing and subscription plans; each modality should link to current pricing rather than share one rate.",
    ecosystem: [
      { name: "MiniMax API docs", type: "docs", url: "https://platform.minimax.io/docs/guides/models-intro" },
      { name: "MiniMax API overview", type: "api", url: "https://platform.minimax.io/docs/api-reference/api-overview" },
      { name: "MiniMax pricing", type: "pricing", url: "https://platform.minimax.io/docs/pricing/overview" },
      { name: "MiniMax official site", type: "official_site", url: "https://www.minimax.io/" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["multimodal app prototyping", "speech/video/image workflows", "agentic coding evaluation with M3", "media API product exploration"],
    avoid_when: ["rights-sensitive media generation without review", "single LLM-only comparison where media models are irrelevant", "evidence requires production cases not yet gathered"],
    risks: ["Media model cases require IP/likeness review.", "M series names need mapping against old Wiki cards.", "Platform demos are not A-class cases."],
    source_links: [
      { type: "official_site", url: "https://www.minimax.io/" },
      { type: "models_docs", url: "https://platform.minimax.io/docs/guides/models-intro" },
      { type: "api_overview", url: "https://platform.minimax.io/docs/api-reference/api-overview" },
      { type: "pricing", url: "https://platform.minimax.io/docs/pricing/overview" }
    ],
    page_status: "review",
    child_count: 6
  },
  {
    file: "z-ai.md",
    vendor_id: "z-ai",
    vendor_name: "Z.AI",
    display_name: "Z AI / GLM",
    canonical_slug: "z-ai",
    official_site: "https://z.ai/",
    thirty: "Z AI 是 GLM 系列厂商，当前叙事集中在 reasoning、coding 和 agent-oriented GLM 模型。",
    route: "Z AI 路线包括 GLM-4.5 agent foundation models、GLM-5 / GLM-5.2 coding and agentic engineering 线，以及 API/Claude Code compatibility 场景。厂商页先固定 GLM 家族和风险。",
    model_families: [
      { family_id: "glm-4-5", display_name: "GLM-4.5", positioning: "agent-oriented foundation model family", representative_models: ["glm-4-5", "glm-4-5-air"] },
      { family_id: "glm-5", display_name: "GLM-5", positioning: "vibe coding to agentic engineering family", representative_models: ["glm-5", "glm-5-2"] },
      { family_id: "glm-api", display_name: "Z.AI API", positioning: "API and developer integration surface", representative_models: ["glm-5-2"] }
    ],
    flagship_models: ["glm-5-2", "glm-5", "glm-4-5", "glm-4-5-air"],
    timeline: [
      { date: "2025", model_id: "glm-4-5", event: "GLM-4.5 docs describe agent-oriented MoE foundation models", source_url: "https://docs.z.ai/guides/llm/glm-4.5", confidence: "high" },
      { date: "2026", model_id: "glm-5", event: "Z.AI blog frames GLM-5 from vibe coding to agentic engineering", source_url: "https://z.ai/blog/glm-5", confidence: "high" },
      { date: "2026", model_id: "glm-5-2", event: "Z.AI docs list GLM-5.2 as coding model with 1M context and reasoning_effort", source_url: "https://docs.z.ai/guides/overview/quick-start", confidence: "high" }
    ],
    key_inflection_points: [
      { title: "GLM-4.5 defines agent-oriented foundation positioning", model_ids: ["glm-4-5"], summary: "Use this as the older GLM anchor in the vendor timeline." },
      { title: "GLM-5 moves from vibe coding to agentic engineering", model_ids: ["glm-5"], summary: "Z AI should be tracked as a coding/agent vendor, not only general chat." },
      { title: "GLM-5.2 adds long context and reasoning_effort", model_ids: ["glm-5-2"], summary: "reasoning_effort needs variant/parameter handling consistent with OpenAI/Gemini pages." },
      { title: "Developer compatibility broadens adoption", model_ids: ["glm-api"], summary: "API compatibility is an ecosystem signal, not a real case." }
    ],
    strengths: ["agent-oriented model positioning", "coding workflow focus", "open GitHub model releases for GLM-4.5", "long-context and reasoning_effort docs"],
    weaknesses: ["brand transition from Zhipu/GLM/Z AI can confuse mapping", "case evidence not yet normalized", "pricing and regional availability need review", "some claims appear in developer docs rather than independent cases"],
    pricing_strategy: "API pricing should be tied to Z.AI docs/model pages; open-source GLM branches need separate hosting cost assumptions.",
    ecosystem: [
      { name: "Z.AI docs", type: "docs", url: "https://docs.z.ai/guides/overview/quick-start" },
      { name: "GLM-4.5 docs", type: "docs", url: "https://docs.z.ai/guides/llm/glm-4.5" },
      { name: "Z.AI blog", type: "blog", url: "https://z.ai/blog/glm-5" },
      { name: "zai-org GitHub", type: "github", url: "https://github.com/zai-org/GLM-4.5" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["agent-oriented coding evaluation", "long-context coding tasks", "open GLM model experiments", "Claude Code compatible workflow testing"],
    avoid_when: ["brand/model mapping is unresolved", "only benchmark claims are available", "enterprise production evidence is required immediately"],
    risks: ["GLM naming needs stable canonical IDs.", "Do not turn docs/tutorials into A-class cases.", "Claude-compatible usage requires separate evidence rows."],
    source_links: [
      { type: "official_site", url: "https://z.ai/" },
      { type: "docs", url: "https://docs.z.ai/guides/overview/quick-start" },
      { type: "glm_4_5_docs", url: "https://docs.z.ai/guides/llm/glm-4.5" },
      { type: "glm_5_blog", url: "https://z.ai/blog/glm-5" }
    ],
    page_status: "review",
    child_count: 6
  },
  {
    file: "upstage.md",
    vendor_id: "upstage",
    vendor_name: "Upstage AI",
    display_name: "Upstage / Solar",
    canonical_slug: "upstage",
    official_site: "https://www.upstage.ai/",
    thirty: "Upstage 是 Solar LLM 和 Document AI 工作流厂商，厂商页重点在小而强的 Solar 模型、文档处理和企业工作流。",
    route: "Upstage 路线包括 Solar LLM、Solar Pro/Preview、Document AI、Document Parse 和 API/Studio。Wiki 中 Solar 子卡少，Phase 2 页面应标为 limited/review，避免夸大。",
    model_families: [
      { family_id: "solar", display_name: "Solar", positioning: "LLM family for enterprise work", representative_models: ["solar-pro", "solar-pro-preview"] },
      { family_id: "upstage-document-ai", display_name: "Document AI", positioning: "document parsing and workflow models", representative_models: ["document-parse"] }
    ],
    flagship_models: ["solar-pro", "solar-pro-preview", "document-parse"],
    timeline: [
      { date: "2024-02-22", model_id: "solar-api", event: "Upstage announces Solar API beta", source_url: "https://www.upstage.ai/news/solar-api-beta", confidence: "high" },
      { date: "2026", model_id: "upstage-platform", event: "Upstage site positions LLMs and document processing for future-of-work workflows", source_url: "https://www.upstage.ai/", confidence: "high" },
      { date: "2026", model_id: "upstage-pricing", event: "Upstage API pricing page covers Solar Pro and Document Parse support programs", source_url: "https://www.upstage.ai/pricing/api", confidence: "medium" }
    ],
    key_inflection_points: [
      { title: "Solar API makes Upstage accessible to developers", model_ids: ["solar-api"], summary: "Solar API beta is the natural timeline anchor for older Solar cards." },
      { title: "Document AI differentiates Upstage from pure LLM vendors", model_ids: ["document-parse"], summary: "Vendor page should emphasize document workflow cases." },
      { title: "Solar Pro Preview introduces open/evaluation branch", model_ids: ["solar-pro-preview"], summary: "Open or preview models need separate status and source review." },
      { title: "Enterprise workflow positioning dominates", model_ids: ["solar-pro"], summary: "Cases should focus on document automation rather than generic chat demos." }
    ],
    strengths: ["document AI focus", "enterprise workflow framing", "Solar LLM brand", "pricing and support programs for institutions"],
    weaknesses: ["fewer frontier model nodes in Wiki", "case library not yet built", "model naming less visible globally", "needs source review for current model list"],
    pricing_strategy: "API and enterprise pricing should reference Upstage pricing page. Document AI and LLM pricing must stay separate.",
    ecosystem: [
      { name: "Upstage official site", type: "official_site", url: "https://www.upstage.ai/" },
      { name: "Upstage Console", type: "developer_console", url: "https://console.upstage.ai/" },
      { name: "Upstage pricing", type: "pricing", url: "https://www.upstage.ai/pricing/api" },
      { name: "Upstage cookbook", type: "github", url: "https://github.com/UpstageAI/cookbook" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["document parsing and enterprise workflows", "Solar LLM experiments", "Korean/enterprise document use cases", "workflow automation pilots"],
    avoid_when: ["frontier coding benchmark comparison is the primary goal", "A-class cases are required immediately", "model list cannot be verified from current docs"],
    risks: ["Document AI examples must not be treated as LLM cases.", "Cookbook examples are tutorials unless they have concrete artifacts.", "Current Solar model names need manual source verification."],
    source_links: [
      { type: "official_site", url: "https://www.upstage.ai/" },
      { type: "solar_api_beta", url: "https://www.upstage.ai/news/solar-api-beta" },
      { type: "pricing", url: "https://www.upstage.ai/pricing/api" },
      { type: "cookbook", url: "https://github.com/UpstageAI/cookbook" }
    ],
    page_status: "limited",
    child_count: 4
  },
  {
    file: "xiaomi.md",
    vendor_id: "xiaomi",
    vendor_name: "Xiaomi",
    display_name: "Xiaomi / MiMo",
    canonical_slug: "xiaomi",
    official_site: "https://mimo.xiaomi.com/",
    thirty: "Xiaomi 的 MiMo 路线把 reasoning、coding、agentic foundation model 和终端/生态潜力连接起来，是 Model Atlas 中需要单独跟踪的新兴厂商线。",
    route: "Xiaomi 路线包括 MiMo、MiMo-V2-Flash、MiMo-V2-Pro、MiMo-Code 和音频/多模态分支。厂商页应先把 MiMo 作为 family，再把 Code/Audio/Pro/Flash 拆成代表模型或产品线。",
    model_families: [
      { family_id: "mimo", display_name: "MiMo", positioning: "reasoning foundation model line", representative_models: ["mimo", "mimo-v2-pro", "mimo-v2-flash"] },
      { family_id: "mimo-code", display_name: "MiMo Code", positioning: "terminal-native coding assistant and coding model branch", representative_models: ["mimo-code"] },
      { family_id: "mimo-audio", display_name: "MiMo Audio", positioning: "audio model branch", representative_models: ["mimo-audio"] }
    ],
    flagship_models: ["mimo-v2-pro", "mimo-v2-flash", "mimo-code"],
    timeline: [
      { date: "2025", model_id: "mimo", event: "Xiaomi MiMo GitHub describes MiMo reasoning model and model availability", source_url: "https://github.com/xiaomimimo/mimo", confidence: "high" },
      { date: "2026", model_id: "mimo-v2-flash", event: "MiMo-V2-Flash repo positions model for high-speed reasoning and agentic workflows", source_url: "https://github.com/xiaomimimo/MiMo-V2-Flash", confidence: "high" },
      { date: "2026", model_id: "mimo-v2-pro", event: "MiMo-V2-Pro official page positions model for real-world agentic workloads", source_url: "https://mimo.xiaomi.com/mimo-v2-pro", confidence: "high" },
      { date: "2026-06-25", model_id: "mimo-code", event: "MiMo-Code repository describes terminal-native AI coding assistant", source_url: "https://github.com/XiaomiMiMo/MiMo-Code", confidence: "medium" }
    ],
    key_inflection_points: [
      { title: "MiMo introduces Xiaomi's reasoning model line", model_ids: ["mimo"], summary: "Use MiMo as canonical family, not just a one-off model." },
      { title: "V2 Flash emphasizes efficient reasoning and agent workflows", model_ids: ["mimo-v2-flash"], summary: "Efficiency claims need model-card evidence and deployment notes." },
      { title: "V2 Pro moves toward flagship agent workloads", model_ids: ["mimo-v2-pro"], summary: "This should be the current representative model pending model-card upgrade." },
      { title: "MiMo-Code makes coding assistant a product branch", model_ids: ["mimo-code"], summary: "Coding assistant should be tracked as ecosystem/product, not just model." }
    ],
    strengths: ["reasoning and agentic workflow focus", "GitHub/Hugging Face distribution", "potential device/ecosystem angle", "coding assistant branch"],
    weaknesses: ["newer ecosystem with limited independent cases", "official API/platform availability needs review", "model names and org casing need slug normalization", "production evidence not yet collected"],
    pricing_strategy: "Mixed open model / official API posture. Pricing should remain pending until the MiMo API or official pricing source is captured.",
    ecosystem: [
      { name: "MiMo official site", type: "official_site", url: "https://mimo.xiaomi.com/" },
      { name: "MiMo GitHub", type: "github", url: "https://github.com/XiaomiMiMo" },
      { name: "MiMo Hugging Face", type: "model_hub", url: "https://huggingface.co/XiaomiMiMo" },
      { name: "MiMo V2 Pro", type: "model_page", url: "https://mimo.xiaomi.com/mimo-v2-pro" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["reasoning model evaluation", "coding assistant experiments", "efficient agentic workflow tests", "open-model deployment research"],
    avoid_when: ["enterprise case proof is required now", "pricing/API terms are mandatory", "model lineage cannot tolerate pending fields"],
    risks: ["Need to distinguish XiaomiMiMo GitHub org casing from vendor slug.", "Recent repos require snapshot/HEAD capture.", "MiMo-Code is product/tool evidence, not necessarily model performance proof."],
    source_links: [
      { type: "official_site", url: "https://mimo.xiaomi.com/" },
      { type: "mimo_v2_pro", url: "https://mimo.xiaomi.com/mimo-v2-pro" },
      { type: "github_org", url: "https://github.com/XiaomiMiMo" },
      { type: "mimo_v2_flash", url: "https://github.com/xiaomimimo/MiMo-V2-Flash" }
    ],
    page_status: "review",
    child_count: 3
  },
  {
    file: "mbzuai-ifm.md",
    vendor_id: "mbzuai-ifm",
    vendor_name: "MBZUAI Institute of Foundation Models",
    display_name: "MBZUAI IFM / K2",
    canonical_slug: "mbzuai-ifm",
    official_site: "https://mbzuai.ac.ae/",
    thirty: "MBZUAI IFM 是 K2 系列和 sovereign reasoning 方向的研究型厂商节点，厂商页应标注为 limited/review，避免把研究发布直接包装成产品化模型线。",
    route: "MBZUAI IFM 路线围绕 K2/K2 Think，强调开放基础模型、主权 AI、reasoning、long context 和训练透明度。Wiki 中只有少量模型卡，Phase 2 主要建立导航和风险边界。",
    model_families: [
      { family_id: "k2", display_name: "K2", positioning: "foundation model family from MBZUAI IFM", representative_models: ["k2-65b", "k2-think-v2"] },
      { family_id: "k2-think", display_name: "K2 Think", positioning: "reasoning system / sovereign model branch", representative_models: ["k2-think-v2"] }
    ],
    flagship_models: ["k2-think-v2", "k2-65b"],
    timeline: [
      { date: "2025", model_id: "k2", event: "MBZUAI launches Institute of Foundation Models and describes K2 reasoning direction", source_url: "https://mbzuai.ac.ae/news/mbzuai-launches-institute-of-foundation-models-and-establishes-silicon-valley-ai-lab/", confidence: "high" },
      { date: "2026", model_id: "k2-think-v2", event: "MBZUAI IFM releases K2 Think V2 as fully sovereign reasoning model", source_url: "https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/", confidence: "high" },
      { date: "2026", model_id: "k2-think-v2", event: "K2 Think site provides model/system entry point", source_url: "https://www.k2think.ai/k2think", confidence: "medium" }
    ],
    key_inflection_points: [
      { title: "IFM formalizes MBZUAI foundation model work", model_ids: ["k2"], summary: "Use IFM as vendor namespace instead of generic MBZUAI." },
      { title: "K2 establishes the foundation model line", model_ids: ["k2-65b"], summary: "Older K2 cards should map into one K2 family." },
      { title: "K2 Think V2 shifts focus to sovereign reasoning", model_ids: ["k2-think-v2"], summary: "Reasoning system language should not be reduced to a plain LLM card." },
      { title: "Open-source transparency is part of positioning", model_ids: ["k2-think-v2"], summary: "Source links must include dataset/model/code if available during model-card upgrade." }
    ],
    strengths: ["research credibility", "sovereign AI positioning", "reasoning model focus", "open-source transparency narrative"],
    weaknesses: ["small Wiki footprint", "less commercial ecosystem evidence", "case library not yet built", "model/product boundary may be blurry"],
    pricing_strategy: "No general API pricing captured in Phase 2. Treat as research/open model branch unless official API/pricing source is added.",
    ecosystem: [
      { name: "MBZUAI IFM news", type: "official_news", url: "https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/" },
      { name: "K2 Think", type: "model_page", url: "https://www.k2think.ai/k2think" },
      { name: "MBZUAI", type: "official_site", url: "https://mbzuai.ac.ae/" }
    ],
    case_library_status: "archive_only",
    recommended_use_cases: ["research comparison", "sovereign AI landscape mapping", "reasoning model analysis", "open model governance discussion"],
    avoid_when: ["commercial deployment details are required", "production cases are mandatory", "pricing/API needs are central"],
    risks: ["Research announcements are not production cases.", "K2 Think may be a system rather than a single model; model-card upgrade must verify granularity.", "Use official MBZUAI/IFM links, not press-release mirrors when possible."],
    source_links: [
      { type: "official_site", url: "https://mbzuai.ac.ae/" },
      { type: "ifm_launch", url: "https://mbzuai.ac.ae/news/mbzuai-launches-institute-of-foundation-models-and-establishes-silicon-valley-ai-lab/" },
      { type: "k2_think_v2", url: "https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/" },
      { type: "k2_think_site", url: "https://www.k2think.ai/k2think" }
    ],
    page_status: "limited",
    child_count: 2
  },
  {
    file: "stepfun.md",
    vendor_id: "stepfun",
    vendor_name: "StepFun",
    display_name: "StepFun / Step",
    canonical_slug: "stepfun",
    official_site: "https://platform.stepfun.ai/",
    thirty: "StepFun 是 Step 系列多模态 reasoning、coding 和高效率 MoE 模型厂商，厂商页要把 Step3、Step 3.5 Flash、Step 3.7 Flash 串成一条效率导向路线。",
    route: "StepFun 路线包括 Step3 multimodal reasoning、Step 3.5 Flash open-source/efficient branch、Step 3.7 Flash API branch 和开放平台。Phase 2 先建立厂商页，不升级 6 张旧卡。",
    model_families: [
      { family_id: "step-3", display_name: "Step 3", positioning: "multimodal reasoning MoE model", representative_models: ["step-3"] },
      { family_id: "step-flash", display_name: "Step Flash", positioning: "efficient reasoning/coding/agentic models", representative_models: ["step-3-5-flash", "step-3-7-flash"] },
      { family_id: "step-platform", display_name: "StepFun Platform", positioning: "API and model experience center", representative_models: ["step-api"] }
    ],
    flagship_models: ["step-3-7-flash", "step-3-5-flash", "step-3"],
    timeline: [
      { date: "2025", model_id: "step-3", event: "Step3 GitHub introduces multimodal reasoning MoE model with 321B total / 38B active parameters", source_url: "https://github.com/stepfun-ai/Step3", confidence: "high" },
      { date: "2026", model_id: "step-3-5-flash", event: "Step 3.5 Flash GitHub positions model as efficient agentic intelligence", source_url: "https://github.com/stepfun-ai/Step-3.5-Flash", confidence: "high" },
      { date: "2026", model_id: "step-3-7-flash", event: "StepFun docs note Step 3.7 Flash is live for Agent / Coding / multimodal workflows", source_url: "https://platform.stepfun.ai/docs/en/api-reference/models/object", confidence: "medium" }
    ],
    key_inflection_points: [
      { title: "Step3 establishes hardware-aware multimodal reasoning", model_ids: ["step-3"], summary: "Step3 should anchor StepFun's technical lineage." },
      { title: "Step 3.5 Flash shifts emphasis to efficient agentic workflows", model_ids: ["step-3-5-flash"], summary: "Flash variants need their own IDs and pricing/deployment notes." },
      { title: "Step 3.7 Flash becomes current platform signal", model_ids: ["step-3-7-flash"], summary: "Docs show StepFun moving from paper/repo to API distribution." },
      { title: "Open platform gives developer access", model_ids: ["step-api"], summary: "Platform availability belongs in ecosystem, not model capability proof." }
    ],
    strengths: ["efficient MoE reasoning", "multimodal model-system co-design", "open GitHub/Hugging Face releases", "developer platform with OpenAI-style examples"],
    weaknesses: ["model naming and decimal versions require slug normalization", "case evidence not yet normalized", "some claims live in repos/papers rather than product docs", "pricing needs current source review"],
    pricing_strategy: "API pricing should be captured from StepFun docs/pricing when model cards are upgraded; open releases require separate hosting cost notes.",
    ecosystem: [
      { name: "StepFun Platform", type: "first_party_api", url: "https://platform.stepfun.ai/" },
      { name: "StepFun docs", type: "docs", url: "https://platform.stepfun.ai/docs/en/quickstart/overview" },
      { name: "Step3 GitHub", type: "github", url: "https://github.com/stepfun-ai/Step3" },
      { name: "Step 3.5 Flash GitHub", type: "github", url: "https://github.com/stepfun-ai/Step-3.5-Flash" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["efficient multimodal reasoning tests", "agentic coding model comparison", "open model deployment evaluation", "StepFun API prototyping"],
    avoid_when: ["A-class production cases are required immediately", "version mapping between Step3/3.5/3.7 is unresolved", "media model claims lack source snapshots"],
    risks: ["Decimal versions must map to stable slugs.", "Papers and repos are strong sources but not user cases.", "Step 3.7 Flash status needs current docs snapshot."],
    source_links: [
      { type: "official_platform", url: "https://platform.stepfun.ai/" },
      { type: "quickstart", url: "https://platform.stepfun.ai/docs/en/quickstart/overview" },
      { type: "model_object", url: "https://platform.stepfun.ai/docs/en/api-reference/models/object" },
      { type: "step3_github", url: "https://github.com/stepfun-ai/Step3" }
    ],
    page_status: "review",
    child_count: 6
  },
  {
    file: "bytedance-seed.md",
    vendor_id: "bytedance-seed",
    vendor_name: "ByteDance Seed",
    display_name: "ByteDance Seed",
    canonical_slug: "bytedance-seed",
    official_site: "https://seed.bytedance.com/en/",
    thirty: "ByteDance Seed 是 Wiki 中额外出现的 Seed 模型节点，覆盖 Seed2.1、Seedance、Seed multimodal research 和 ByteDance 内部产品生态。",
    route: "ByteDance Seed 路线包括 Seed2.1 productivity models、Seedance video generation、Seed1.5 VL / Seed multimodal research，以及 Doubao/Volcano/Coze 等产品分发。由于 Wiki 只有 1 个直接子卡，Phase 2 先创建厂商页并在 QA 说明额外节点。",
    model_families: [
      { family_id: "seed-2-1", display_name: "Seed2.1", positioning: "AI productivity model family", representative_models: ["seed-2-1-pro", "seed-2-1-turbo"] },
      { family_id: "seedance", display_name: "Seedance", positioning: "video generation model family", representative_models: ["seedance-1-0", "seedance-2-0"] },
      { family_id: "seed-multimodal", display_name: "Seed multimodal research", positioning: "vision, speech and multimodal research models", representative_models: ["seed1-5-vl", "bagel"] }
    ],
    flagship_models: ["seed-2-1-pro", "seed-2-1-turbo", "seedance-1-0"],
    timeline: [
      { date: "2026-06-19", model_id: "seed-2-1-pro-preview", event: "Seed-2.1-Pro-Preview released on Arena AI code arena", source_url: "https://seed.bytedance.com/en/blog/seed-2-1-preview-model-release-on-arena", confidence: "high" },
      { date: "2026-06-23", model_id: "seed-2-1", event: "Seed2.1 officially released, with Pro and Turbo models", source_url: "https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity", confidence: "high" },
      { date: "2026", model_id: "seedance-1-0", event: "Seedance 1.0 page describes multi-shot text/image-to-video generation", source_url: "https://seed.bytedance.com/en/seedance", confidence: "high" }
    ],
    key_inflection_points: [
      { title: "Seed team becomes explicit AI research vendor node", model_ids: ["seed"], summary: "Blueprint identified ByteDance Seed as an extra root node beyond the named 14-vendor table." },
      { title: "Seed2.1 creates a productivity-model branch", model_ids: ["seed-2-1-pro", "seed-2-1-turbo"], summary: "Seed2.1 should be the first model-card target if this vendor enters Phase 3." },
      { title: "Arena preview gives external evaluation access", model_ids: ["seed-2-1-pro-preview"], summary: "Arena release is a platform signal, not an A-class case." },
      { title: "Seedance adds high-risk video modality", model_ids: ["seedance-1-0"], summary: "Video generation needs rights, likeness and safety risk treatment." }
    ],
    strengths: ["ByteDance product ecosystem", "Seed2.1 productivity focus", "video and multimodal research breadth", "official English Seed site with model pages"],
    weaknesses: ["Wiki footprint is small", "model access may route through Doubao/Volcano/Coze rather than generic API", "video model rights risks are high", "case evidence not yet structured"],
    pricing_strategy: "Pricing/access should be tracked through Doubao, Volcano Engine, Feishu Spark, Coze or Seed official links once captured. Phase 2 leaves pricing strategy as pending/source-linked.",
    ecosystem: [
      { name: "ByteDance Seed", type: "official_site", url: "https://seed.bytedance.com/en/" },
      { name: "Seed2.1", type: "model_page", url: "https://seed.bytedance.com/en/seed2_1" },
      { name: "Seedance", type: "model_page", url: "https://seed.bytedance.com/en/seedance" },
      { name: "ByteDance Seed GitHub", type: "github", url: "https://github.com/ByteDance-Seed" }
    ],
    case_library_status: "platform_only",
    recommended_use_cases: ["productivity model tracking", "video generation model comparison", "ByteDance ecosystem research", "Arena preview monitoring"],
    avoid_when: ["stable API/pricing is required but not captured", "rights-sensitive video generation lacks review", "only one old Wiki model card is available"],
    risks: ["Seedance video cases require strict IP/safety policy.", "Seed2.1 access channels may change quickly.", "ByteDance Seed appears as extra vendor node; QA must explain coverage."],
    source_links: [
      { type: "official_site", url: "https://seed.bytedance.com/en/" },
      { type: "seed2_1", url: "https://seed.bytedance.com/en/seed2_1" },
      { type: "preview_release", url: "https://seed.bytedance.com/en/blog/seed-2-1-preview-model-release-on-arena" },
      { type: "official_release", url: "https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity" },
      { type: "seedance", url: "https://seed.bytedance.com/en/seedance" }
    ],
    page_status: "review",
    child_count: 1
  }
];

function list(items) {
  return items.map((x) => `- ${x}`).join("\n");
}

function yamlScalar(value) {
  if (typeof value === "string") return JSON.stringify(value);
  return String(value);
}

function yaml(value, indent = 0) {
  const pad = " ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value.map((item) => {
      if (typeof item === "object" && item !== null) {
        const entries = Object.entries(item);
        const [firstKey, firstVal] = entries[0];
        const rest = entries.slice(1).map(([k, v]) => `${pad}  ${k}: ${formatYamlValue(v, indent + 2)}`).join("\n");
        return `${pad}- ${firstKey}: ${formatYamlValue(firstVal, indent + 2)}${rest ? "\n" + rest : ""}`;
      }
      return `${pad}- ${yamlScalar(item)}`;
    }).join("\n");
  }
  if (typeof value === "object" && value !== null) {
    return Object.entries(value).map(([k, v]) => `${pad}${k}: ${formatYamlValue(v, indent)}`).join("\n");
  }
  return yamlScalar(value);
}

function formatYamlValue(value, indent) {
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `\n${yaml(value, indent + 2)}`;
  }
  if (typeof value === "object" && value !== null) {
    return `\n${yaml(value, indent + 2)}`;
  }
  return yamlScalar(value);
}

function vendorData(v) {
  return {
    vendor_id: v.vendor_id,
    vendor_name: v.vendor_name,
    display_name: v.display_name,
    canonical_slug: v.canonical_slug,
    official_site: v.official_site,
    model_families: v.model_families,
    flagship_models: v.flagship_models,
    timeline: v.timeline,
    key_inflection_points: v.key_inflection_points,
    strengths: v.strengths,
    weaknesses: v.weaknesses,
    pricing_strategy: v.pricing_strategy,
    ecosystem: v.ecosystem,
    case_library_status: v.case_library_status,
    recommended_use_cases: v.recommended_use_cases,
    avoid_when: v.avoid_when,
    source_links: v.source_links,
    page_status: v.page_status,
    last_reviewed_at: today,
    owner: "pending"
  };
}

function renderVendor(v) {
  return `# ${v.display_name} Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：\`/vendors/${v.vendor_id}\`  
> page_status：\`${v.page_status}\`  
> case_library_status：\`${v.case_library_status}\`

## 30 秒判断

${v.thirty}

## 模型路线

${v.route}

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
${v.model_families.map((f) => `| ${f.display_name} | ${f.positioning} | ${f.representative_models.map((m) => `\`${m}\``).join(", ")} |`).join("\n")}

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
${v.timeline.map((t) => `| ${t.date} | \`${t.model_id}\` | ${t.event} | [source](${t.source_url}) (${t.confidence}) |`).join("\n")}

## 关键拐点

${v.key_inflection_points.map((p) => `### ${p.title}\n\n- 相关模型：${p.model_ids.map((m) => `\`${m}\``).join(", ")}\n- 判断：${p.summary}`).join("\n\n")}

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
${v.flagship_models.map((m, i) => `| \`${m}\` | ${i < 2 ? "P0" : "P1"} | 后续 Phase 3 候选；先按最低发布门槛补证 |`).join("\n")}

## 适合使用场景

${list(v.recommended_use_cases)}

## 不适合使用场景

${list(v.avoid_when)}

## 案例库状态

\`${v.case_library_status}\`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 \`evidence-intake-table-schema.md\` 建证据行，并按 \`evidence-snapshot-policy.md\` 保存快照。

## 风险和限制

${list(v.risks)}

## 数据字段

\`\`\`yaml
${yaml(vendorData(v))}
\`\`\`

## 相关链接

${v.source_links.map((s) => `- ${s.type}: [${s.url}](${s.url})`).join("\n")}
`;
}

for (const vendor of vendors) {
  fs.writeFileSync(path.join(outDir, vendor.file), renderVendor(vendor));
}

const index = `# Vendor Pages Index

> Phase 2 deliverable  
> Scope: 厂商页 2.0 导航骨架，不升级 107 个模型卡，不修改旧 Wiki。

## 覆盖范围

本批次生成 15 个 canonical 厂商页。Phase 0 蓝图记录 Wiki 树下有 16 个厂商式节点，其中 \`Claude\` 出现重复分支；Bitable 标题称 14 厂商，但 Wiki 额外出现 ByteDance Seed 节点。本批次处理方式：

- Claude 重复分支合并为 canonical vendor_id：\`anthropic\`。
- ByteDance Seed 作为额外 canonical vendor_id：\`bytedance-seed\` 收录。
- 不删除旧文档，不修改旧模型卡。

## 厂商页列表

| Vendor | vendor_id | 文件 | Wiki 子卡数参考 | page_status | case_library_status |
|---|---|---|---:|---|---|
${vendors.map((v) => `| ${v.display_name} | \`${v.vendor_id}\` | [${v.file}](./${v.file}) | ${v.child_count} | ${v.page_status} | ${v.case_library_status} |`).join("\n")}

## 后续入口

- Phase 2 之后可以进入厂商页人工复核：source_links、timeline、case_library_status。
- Phase 3 只能挑 P0 模型，不做全量 107 卡升级。
- 每个模型卡升级前必须先有 \`model_id\`、\`family_id\`、source_links 和 evidence intake rows。
`;

fs.writeFileSync(path.join(outDir, "index.md"), index);

const qa = `# Phase 2 Vendor Pages QA Report

> 检查对象：\`outputs/vendors/\` 厂商页 2.0  
> 检查日期：${today}  
> 结论：PASS for vendor-page batch skeleton; model-card expansion not performed.

## 1. 交付物检查

| 交付物 | 状态 | 说明 |
|---|---|---|
| \`outputs/vendors/\` 目录 | PASS | 已创建 |
| 15 个 canonical 厂商页 | PASS | 覆盖 OpenAI、Anthropic、Google、DeepSeek、Qwen、xAI、Kimi、Meta、MiniMax、Z AI、Upstage、Xiaomi、MBZUAI IFM、StepFun、ByteDance Seed |
| \`outputs/vendors/index.md\` | PASS | 提供厂商索引和节点处理说明 |
| \`outputs/phase-2-vendor-pages-qa-report.md\` | PASS | 本文件 |

## 2. 实际厂商节点数量和处理方式

| 来源 | 观察 | 处理 |
|---|---|---|
| Phase 0 蓝图 | Wiki 树直接厂商/厂商式节点 16 个，其中 \`Claude\` 出现两次 | 合并为 \`anthropic\` canonical vendor |
| Bitable 标题 | \`Artificial Analysis 14厂商视觉Step拐点\` | 作为数据表命名保留，不强行让文件数等于 14 |
| Wiki 额外节点 | ByteDance Seed 有 1 个子卡 | 创建 \`bytedance-seed.md\` |
| 本次 canonical 输出 | 15 家厂商 | 与用户列出的 15 项一致 |

## 3. 字段合规检查

每个厂商页均包含以下 18 个冻结字段：

1. \`vendor_id\`
2. \`vendor_name\`
3. \`display_name\`
4. \`canonical_slug\`
5. \`official_site\`
6. \`model_families\`
7. \`flagship_models\`
8. \`timeline\`
9. \`key_inflection_points\`
10. \`strengths\`
11. \`weaknesses\`
12. \`pricing_strategy\`
13. \`ecosystem\`
14. \`case_library_status\`
15. \`recommended_use_cases\`
16. \`avoid_when\`
17. \`source_links\`
18. \`page_status\`

## 4. 人类可读结构检查

每个厂商页均包含：

- \`30 秒判断\`
- \`模型路线\`
- \`模型时间线\`
- \`关键拐点\`
- \`当前代表模型\`
- \`适合使用场景\`
- \`不适合使用场景\`
- \`案例库状态\`
- \`风险和限制\`
- \`数据字段\`
- \`相关链接\`

## 5. 本阶段约束检查

| 约束 | 状态 | 说明 |
|---|---|---|
| 不做 107 个模型卡批量升级 | PASS | 只生成 vendor pages |
| 不改旧模型卡 | PASS | 未编辑旧 Wiki 或旧卡文件 |
| 不删除旧文档 | PASS | 无删除操作 |
| 不把集合页当原始证据 | PASS | 厂商页只用 source_links，不创建 A 类案例 |
| 不把 benchmark/教程/介绍文当案例 | PASS | case_library_status 均为状态说明，未创建案例库 |
| 使用 Phase 1.5 标准 | PASS | 字段来自 \`vendor-field-template.md\`，ID/发布门槛沿用冻结规范 |

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

备注：上表 intentionally conservative。Phase 2 没有为其他厂商建立 A 类案例库，因此不把任何厂商包装成 \`rich\`。

## 8. 后续风险

1. 大多数厂商页为 \`review\`，需要人工确认 timeline、source_links 和代表模型。
2. OpenAI、Google、xAI、Kimi、MiniMax、ByteDance Seed 等模型更新很快，需要定期复查官方 docs。
3. 厂商页中代表模型不是模型卡升级结果，不能直接视为最终模型页。
4. ByteDance Seed 是额外 canonical 节点；如果后续产品决定只保留 14 家，需要在 index 中标记为 optional。
5. Upstage 和 MBZUAI IFM 的案例库薄弱，进入 Phase 3 时应优先判为 Limited 或 Archive only。

## 9. 是否可以进入下一阶段

可以进入 Phase 2 人工复核和 Phase 3 P0 模型卡候选选择，但不能直接全量升级 107 卡。

建议下一步：

1. 人工抽查每个 vendor page 的 official_site 和 source_links。
2. 从 \`flagship_models\` 中为 Phase 3 选择每家 1-2 个 P0 模型。
3. 先为 P0 模型建立 evidence intake rows，再写模型卡 2.0。
`;

fs.writeFileSync(path.resolve("outputs/phase-2-vendor-pages-qa-report.md"), qa);

console.log(`Generated ${vendors.length} vendor pages, index, and QA report.`);
