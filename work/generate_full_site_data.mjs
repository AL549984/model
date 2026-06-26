import fs from "node:fs";
import path from "node:path";

const root = path.resolve(".");
const siteDataDir = path.join(root, "site/src/data");
const sourcePath = path.join(root, "work/source-data/artificial-analysis-14-vendors-export.tsv");
const casesPath = path.join(root, "outputs/claude-fable-5-case-library-v2.md");

const supplementalACases = [
  {
    id: "gpt4-case-khanmigo",
    title: "Khanmigo AI tutor and teaching assistant",
    vendor: "OpenAI",
    vendorId: "openai",
    modelId: "gpt-4",
    modelName: "GPT-4",
    userOrOrg: "Khan Academy",
    originalEvidenceUrl: "https://openai.com/index/khan-academy/",
    artifactUrl: "https://www.khanmigo.ai/",
    sourcePlatform: "OpenAI story; Khan Academy product",
    sourceType: "real_case",
    taskCategory: "education / tutoring / teacher_assistant",
    taskDescription: "Khan Academy used GPT-4 to power Khanmigo, an AI tutor for students and assistant for teachers.",
    outputResult: "Public OpenAI story and live Khanmigo product page describe the deployed learning assistant.",
    modelContribution: "OpenAI states Khanmigo uses GPT-4; Khan Academy product page describes the tutor and teacher assistant workflow.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Education outcomes and safety claims still need independent outcome studies; model version may have evolved after launch.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "gpt4-case-duolingo-max",
    title: "Duolingo Max Roleplay and Explain My Answer",
    vendor: "OpenAI",
    vendorId: "openai",
    modelId: "gpt-4",
    modelName: "GPT-4",
    userOrOrg: "Duolingo",
    originalEvidenceUrl: "https://openai.com/index/duolingo/",
    artifactUrl: "https://blog.duolingo.com/duolingo-max/",
    sourcePlatform: "OpenAI story; Duolingo blog",
    sourceType: "real_case",
    taskCategory: "education / language_learning / conversational_ai",
    taskDescription: "Duolingo used GPT-4 in Duolingo Max for Roleplay and Explain My Answer learning features.",
    outputResult: "Public OpenAI story and Duolingo launch post describe the product tier and user-facing AI features.",
    modelContribution: "OpenAI and Duolingo both identify GPT-4 as the model powering the two Max features.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Subscription packaging and model routing can change; keep current product availability separate from original GPT-4 launch evidence.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "gpt4-case-be-my-ai",
    title: "Be My AI visual accessibility assistant",
    vendor: "OpenAI",
    vendorId: "openai",
    modelId: "gpt-4",
    modelName: "GPT-4",
    userOrOrg: "Be My Eyes",
    originalEvidenceUrl: "https://openai.com/index/be-my-eyes/",
    artifactUrl: "https://www.bemyeyes.com/news/introducing-be-my-ai-formerly-virtual-volunteer-for-people-who-are-blind-or-have-low-vision-powered-by-openais-gpt-4/",
    sourcePlatform: "OpenAI story; Be My Eyes news",
    sourceType: "real_case",
    taskCategory: "accessibility / vision / mobile_assistant",
    taskDescription: "Be My Eyes built Be My AI / Virtual Volunteer to answer image questions for blind and low-vision users.",
    outputResult: "Public OpenAI story and Be My Eyes announcement describe the GPT-4-powered app feature.",
    modelContribution: "Both sources identify GPT-4 visual capability as the model layer behind the assistant.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Accessibility-critical outputs require careful accuracy and safety review; product model routing may change over time.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "gpt4-case-morgan-stanley-wealth",
    title: "Morgan Stanley Wealth Management knowledge assistant",
    vendor: "OpenAI",
    vendorId: "openai",
    modelId: "gpt-4",
    modelName: "GPT-4",
    userOrOrg: "Morgan Stanley",
    originalEvidenceUrl: "https://openai.com/index/morgan-stanley/",
    artifactUrl: "https://www.morganstanley.com/press-releases/key-milestone-in-innovation-journey-with-openai",
    sourcePlatform: "OpenAI story; Morgan Stanley press release",
    sourceType: "real_case",
    taskCategory: "financial_services / knowledge_management / advisor_assistant",
    taskDescription: "Morgan Stanley used GPT-4 to help financial advisors retrieve and summarize internal knowledge.",
    outputResult: "OpenAI story and Morgan Stanley release describe the advisor-facing internal knowledge system.",
    modelContribution: "Morgan Stanley states its wealth management solution uses GPT-4 on internal Morgan Stanley content.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Internal enterprise artifact is not publicly usable; evidence relies on official company description rather than an inspectable demo.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "gpt4-case-stripe-platform",
    title: "Stripe GPT-4 developer support and fraud workflows",
    vendor: "OpenAI",
    vendorId: "openai",
    modelId: "gpt-4",
    modelName: "GPT-4",
    userOrOrg: "Stripe",
    originalEvidenceUrl: "https://openai.com/index/stripe/",
    artifactUrl: "https://stripe.com/newsroom/news/stripe-and-openai",
    sourcePlatform: "OpenAI story; Stripe newsroom",
    sourceType: "real_case",
    taskCategory: "fintech / developer_support / fraud_detection",
    taskDescription: "Stripe used GPT-4 to improve developer support, business understanding and fraud detection workflows.",
    outputResult: "OpenAI story and Stripe newsroom post describe GPT-4-powered prototypes and platform workflows.",
    modelContribution: "OpenAI and Stripe identify GPT-4 as the model used in the Stripe product and operations exploration.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: false,
    riskNotes: "Some workflows are internal or prototype-stage; keep separated from user-visible product claims.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "gpt4o-case-be-my-eyes-live-accessibility",
    title: "Be My Eyes live accessibility demo with GPT-4o",
    vendor: "OpenAI",
    vendorId: "openai",
    modelId: "gpt-4o-may",
    modelName: "GPT-4o (May)",
    userOrOrg: "Be My Eyes",
    originalEvidenceUrl: "https://openai.com/index/hello-gpt-4o/",
    artifactUrl: "https://www.youtube.com/watch?v=KwNUJ69RbwY ; https://www.bemyeyes.com/",
    sourcePlatform: "OpenAI launch; YouTube; product site",
    sourceType: "real_case",
    taskCategory: "accessibility / multimodal_assistant / live_video",
    taskDescription: "Be My Eyes demonstrated GPT-4o assisting a blind user with real-time visual understanding in a live accessibility workflow.",
    outputResult: "OpenAI launch page and Be My Eyes demo video provide the concrete model, user scenario and visible artifact.",
    modelContribution: "OpenAI presented the Be My Eyes accessibility workflow as a GPT-4o multimodal capability demo.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "This is a launch/demo artifact rather than a full production case study; verify current product routing before claiming ongoing GPT-4o use.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "claude35-case-replit-agent",
    title: "Replit Agent software creation platform",
    vendor: "Anthropic / Claude",
    vendorId: "anthropic",
    modelId: "claude-3-5-sonnet",
    modelName: "Claude 3.5 Sonnet",
    userOrOrg: "Replit",
    originalEvidenceUrl: "https://cloud.google.com/customers/replit",
    artifactUrl: "https://replit.com/ai",
    sourcePlatform: "Google Cloud customer story; Replit product",
    sourceType: "real_case",
    taskCategory: "agentic_coding / software_creation / deployment",
    taskDescription: "Replit used the updated Claude 3.5 Sonnet on Vertex AI to power Replit Agent for natural-language app building.",
    outputResult: "Google Cloud customer story links the product, model choice and production coding-agent workflow.",
    modelContribution: "The case states Replit chose Claude 3.5 Sonnet for code generation, editing and multi-step refactoring.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Replit model routing changes as new Claude versions launch; use this as dated 3.5 Sonnet evidence.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "gemini25pro-case-somin-ai",
    title: "SOMIN campaign planning and creative analysis",
    vendor: "Google / Gemini",
    vendorId: "google",
    modelId: "gemini-2-5-pro",
    modelName: "Gemini 2.5 Pro",
    userOrOrg: "SOMIN.ai",
    originalEvidenceUrl: "https://cloud.google.com/customers/somin-ai",
    artifactUrl: "https://somin.ai/",
    sourcePlatform: "Google Cloud customer story; product site",
    sourceType: "real_case",
    taskCategory: "marketing / research_analysis / campaign_planning",
    taskDescription: "SOMIN.ai used Gemini 2.5 Pro to analyze public marketing data and audience research for campaign planning.",
    outputResult: "Google Cloud customer story gives model, user, workflow and quantified product outcome.",
    modelContribution: "The case states Gemini 2.5 Pro completes analysis and idea generation for SOMIN workflows.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Business impact claims come from vendor/customer story; keep as official case evidence, not independent benchmark.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "llama31-405b-case-sofya-synthetic-data",
    title: "Sofya synthetic training data generation",
    vendor: "Meta / Llama",
    vendorId: "meta",
    modelId: "llama-3-1-405b",
    modelName: "Llama 3.1 405B",
    userOrOrg: "Sofya",
    originalEvidenceUrl: "https://www.llama.com/resources/case-studies/sofya/",
    artifactUrl: "https://www.llama.com/resources/case-studies/sofya/",
    sourcePlatform: "Llama case study",
    sourceType: "real_case",
    taskCategory: "synthetic_data / education / model_distillation",
    taskDescription: "Sofya used Llama 3.1 405B to generate high-quality synthetic training data for its solution.",
    outputResult: "Llama case study provides model, organization, task and implementation narrative.",
    modelContribution: "The case identifies Llama 3.1 405B as part of the synthetic data generation and distillation workflow.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "The public artifact is a case-study page rather than a runnable demo; treat as official customer-case evidence.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "claude35-case-perplexity-search",
    title: "Perplexity answer engine Claude model routing",
    vendor: "Anthropic / Claude",
    vendorId: "anthropic",
    modelId: "claude-3-5-sonnet",
    modelName: "Claude 3.5 Sonnet",
    userOrOrg: "Perplexity",
    originalEvidenceUrl: "https://www.anthropic.com/customers/perplexity",
    artifactUrl: "https://www.perplexity.ai/",
    sourcePlatform: "Anthropic customer story; product site",
    sourceType: "real_case",
    taskCategory: "search / answer_engine / model_routing",
    taskDescription: "Perplexity used Claude 3.5 Sonnet for complex, context-sensitive paid-user answer workflows.",
    outputResult: "Anthropic customer story describes the Claude-powered search product and model-role split.",
    modelContribution: "Anthropic states Perplexity uses Claude 3.5 Sonnet in its paid offering for advanced reasoning and top performance.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Perplexity offers multiple models; this case proves availability/use, not exclusive model routing.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "claude37-case-triple-whale-moby",
    title: "Triple Whale Moby ecommerce intelligence agent",
    vendor: "Anthropic / Claude",
    vendorId: "anthropic",
    modelId: "claude-3-7-sonnet",
    modelName: "Claude 3.7 Sonnet",
    userOrOrg: "Triple Whale",
    originalEvidenceUrl: "https://www.anthropic.com/customers/triple-whale",
    artifactUrl: "https://www.triplewhale.com/",
    sourcePlatform: "Anthropic customer story; product site",
    sourceType: "real_case",
    taskCategory: "ecommerce / analytics_agent / numerical_reasoning",
    taskDescription: "Triple Whale selected Claude 3.7 Sonnet as the default agent model for complex ecommerce data analysis.",
    outputResult: "Anthropic customer story and Triple Whale product page provide model, user, task and product evidence.",
    modelContribution: "Anthropic states Claude 3.7 Sonnet was selected for context retention and accuracy on complex numerical datasets.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Business impact claims come from vendor/customer story; retain as official case evidence, not independent benchmark.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "claude37-case-grafana-assistant",
    title: "Grafana Assistant observability workflows",
    vendor: "Anthropic / Claude",
    vendorId: "anthropic",
    modelId: "claude-3-7-sonnet",
    modelName: "Claude 3.7 Sonnet",
    userOrOrg: "Grafana Labs",
    originalEvidenceUrl: "https://www.anthropic.com/customers/grafana",
    artifactUrl: "https://grafana.com/products/cloud/",
    sourcePlatform: "Anthropic customer story; Grafana product",
    sourceType: "real_case",
    taskCategory: "observability / assistant / technical_analysis",
    taskDescription: "Grafana used Claude Sonnet 3.7 in Grafana Assistant for technically complex observability tasks.",
    outputResult: "Anthropic customer story describes the assistant, model family and division of tasks.",
    modelContribution: "The case quotes Grafana using Claude Sonnet 3.7 for technically complex tasks while Haiku handles simpler summaries.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Grafana notes a transition toward Sonnet 4; keep this as 3.7-era model evidence.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "claude37-case-semgrep-assistant",
    title: "Semgrep code security analysis",
    vendor: "Anthropic / Claude",
    vendorId: "anthropic",
    modelId: "claude-3-7-sonnet",
    modelName: "Claude 3.7 Sonnet",
    userOrOrg: "Semgrep",
    originalEvidenceUrl: "https://www.anthropic.com/customers/semgrep",
    artifactUrl: "https://semgrep.dev/",
    sourcePlatform: "Anthropic customer story; Semgrep product",
    sourceType: "real_case",
    taskCategory: "security / code_analysis / developer_tooling",
    taskDescription: "Semgrep used Claude 3.7 Sonnet for deeper contextual understanding in code vulnerability analysis.",
    outputResult: "Anthropic customer story and Semgrep product page identify the security assistant workflow.",
    modelContribution: "The case says Claude 3.7 Sonnet recognized a vulnerability in generated code and improved key evals.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: false,
    riskNotes: "Security claims need periodic review against current product model routing and evaluation methodology.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "claude37-case-vanta-remediation",
    title: "Vanta engineering remediation with Cursor",
    vendor: "Anthropic / Claude",
    vendorId: "anthropic",
    modelId: "claude-3-7-sonnet",
    modelName: "Claude 3.7 Sonnet",
    userOrOrg: "Vanta",
    originalEvidenceUrl: "https://www.anthropic.com/customers/vanta",
    artifactUrl: "https://www.vanta.com/",
    sourcePlatform: "Anthropic customer story; product site",
    sourceType: "real_case",
    taskCategory: "software_engineering / compliance / remediation",
    taskDescription: "Vanta used Claude 3.7 Sonnet through Cursor for code generation and remediation workflows.",
    outputResult: "Anthropic customer story provides model, tool chain, organization and engineering task evidence.",
    modelContribution: "The case quotes Vanta on Claude 3.7 Sonnet code quality building trust among engineers.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: false,
    riskNotes: "Artifact is an enterprise workflow, not a public repo; evidence is official customer-story level.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "claude3opus-case-steno-deposition",
    title: "Steno deposition preparation assistant",
    vendor: "Anthropic / Claude",
    vendorId: "anthropic",
    modelId: "claude-3-opus",
    modelName: "Claude 3 Opus",
    userOrOrg: "Steno",
    originalEvidenceUrl: "https://www.anthropic.com/customers/steno",
    artifactUrl: "https://www.steno.com/",
    sourcePlatform: "Anthropic customer story; product site",
    sourceType: "real_case",
    taskCategory: "legal / transcript_analysis / deposition_preparation",
    taskDescription: "Steno used Claude 3 Opus to help attorneys find relevant information across deposition transcripts.",
    outputResult: "Anthropic customer story identifies Claude 3 Opus, the legal workflow and the Steno product context.",
    modelContribution: "The case states Claude helps lawyers quickly find relevant information across vast transcripts.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Legal workflows require accuracy review and human oversight; product internals are not publicly inspectable.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "claude3opus-case-sourcegraph-cody",
    title: "Sourcegraph Cody large-codebase context",
    vendor: "Anthropic / Claude",
    vendorId: "anthropic",
    modelId: "claude-3-opus",
    modelName: "Claude 3 Opus",
    userOrOrg: "Sourcegraph",
    originalEvidenceUrl: "https://www.anthropic.com/customers/sourcegraph",
    artifactUrl: "https://sourcegraph.com/cody",
    sourcePlatform: "Anthropic customer story; Sourcegraph product",
    sourceType: "real_case",
    taskCategory: "developer_tooling / code_search / coding_assistant",
    taskDescription: "Sourcegraph used Claude 3 Opus to improve Cody's understanding of large code contexts.",
    outputResult: "Anthropic customer story and Sourcegraph Cody product page identify the coding assistant artifact.",
    modelContribution: "The case attributes improved large-context code understanding and recall to Claude 3 Opus.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Cody supports multiple model providers; this case should be read as one Claude-backed configuration.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  },
  {
    id: "claude35haiku-case-clay-sales",
    title: "Clay sales enrichment and messaging",
    vendor: "Anthropic / Claude",
    vendorId: "anthropic",
    modelId: "claude-3-haiku",
    modelName: "Claude 3 Haiku",
    userOrOrg: "Clay",
    originalEvidenceUrl: "https://www.anthropic.com/customers/clay",
    artifactUrl: "https://www.clay.com/",
    sourcePlatform: "Anthropic customer story; product site",
    sourceType: "real_case",
    taskCategory: "sales / data_enrichment / personalized_messaging",
    taskDescription: "Clay used Claude 3 Haiku for lead identification, enrichment and personalized sales messaging.",
    outputResult: "Anthropic customer story connects the Claude Haiku family to live Clay growth workflows.",
    modelContribution: "The story identifies Claude 3 Haiku as a top choice model for cost-effective outreach tasks.",
    evidenceGrade: "A",
    showcaseEligible: true,
    selectedForModelCard: true,
    riskNotes: "Clay may route across models as Anthropic updates the Claude family; keep this as dated Claude 3 Haiku evidence.",
    collectedAt: "2026-06-26",
    reviewStatus: "已审核"
  }
];

function supplementalCaseCountFor(slug) {
  return supplementalACases.filter((item) => item.modelId === slug).length;
}

const rawVendorMap = {
  Alibaba: { id: "qwen-alibaba", displayName: "Qwen / Alibaba", officialSite: "https://qwenlm.github.io/" },
  Anthropic: { id: "anthropic", displayName: "Anthropic / Claude", officialSite: "https://www.anthropic.com/" },
  DeepSeek: { id: "deepseek", displayName: "DeepSeek", officialSite: "https://www.deepseek.com/" },
  Google: { id: "google", displayName: "Google / Gemini", officialSite: "https://deepmind.google/" },
  Kimi: { id: "kimi", displayName: "Kimi / Moonshot AI", officialSite: "https://www.moonshot.ai/" },
  "MBZUAI Institute of Foundation Models": { id: "mbzuai-ifm", displayName: "MBZUAI IFM / K2", officialSite: "https://mbzuai.ac.ae/" },
  Meta: { id: "meta", displayName: "Meta / Llama", officialSite: "https://ai.meta.com/" },
  MiniMax: { id: "minimax", displayName: "MiniMax", officialSite: "https://www.minimax.io/" },
  OpenAI: { id: "openai", displayName: "OpenAI", officialSite: "https://openai.com/" },
  Upstage: { id: "upstage", displayName: "Upstage / Solar", officialSite: "https://www.upstage.ai/" },
  Xiaomi: { id: "xiaomi", displayName: "Xiaomi / MiMo", officialSite: "https://mimo.xiaomi.com/" },
  "Z AI": { id: "z-ai", displayName: "Z AI / GLM", officialSite: "https://z.ai/" },
  xAI: { id: "xai", displayName: "xAI / Grok", officialSite: "https://x.ai/" },
  StepFun: { id: "stepfun", displayName: "StepFun / Step", officialSite: "https://platform.stepfun.ai/" },
  "ByteDance Seed": { id: "bytedance-seed", displayName: "ByteDance Seed", officialSite: "https://seed.bytedance.com/en/" }
};

const vendorEvidenceSources = {
  "qwen-alibaba": [
    "https://qwenlm.github.io/",
    "https://qwen.readthedocs.io/en/latest/",
    "https://huggingface.co/Qwen"
  ],
  "anthropic": [
    "https://docs.anthropic.com/en/docs/about-claude/models/overview",
    "https://www.anthropic.com/news"
  ],
  "deepseek": [
    "https://api-docs.deepseek.com/",
    "https://github.com/deepseek-ai"
  ],
  "google": [
    "https://ai.google.dev/gemini-api/docs/models",
    "https://deepmind.google/models/"
  ],
  "kimi": [
    "https://www.moonshot.ai/",
    "https://github.com/MoonshotAI"
  ],
  "mbzuai-ifm": [
    "https://www.llm360.ai/",
    "https://huggingface.co/LLM360"
  ],
  "meta": [
    "https://www.llama.com/",
    "https://ai.meta.com/llama/"
  ],
  "minimax": [
    "https://www.minimax.io/",
    "https://www.minimax.io/news"
  ],
  "openai": [
    "https://platform.openai.com/docs/models",
    "https://openai.com/news/"
  ],
  "upstage": [
    "https://www.upstage.ai/",
    "https://www.upstage.ai/"
  ],
  "xiaomi": [
    "https://mimo.xiaomi.com/",
    "https://github.com/XiaomiMiMo"
  ],
  "z-ai": [
    "https://docs.z.ai/",
    "https://z.ai/"
  ],
  "xai": [
    "https://docs.x.ai/docs/models",
    "https://x.ai/"
  ],
  "stepfun": [
    "https://platform.stepfun.ai/",
    "https://static.stepfun.com/blog/step-3.7-flash/"
  ],
  "bytedance-seed": [
    "https://seed.bytedance.com/en/",
    "https://github.com/ByteDance-Seed"
  ]
};

const modelEvidenceSources = {
  "qwen-chat-14b": ["https://huggingface.co/Qwen/Qwen-14B-Chat"],
  "qwen-chat-72b": ["https://huggingface.co/Qwen/Qwen-72B-Chat"],
  "qwen1-5-chat-110b": ["https://qwenlm.github.io/blog/qwen1.5/", "https://huggingface.co/Qwen/Qwen1.5-110B-Chat"],
  "qwen2-72b": ["https://qwenlm.github.io/blog/qwen2/", "https://huggingface.co/Qwen/Qwen2-72B-Instruct"],
  "qwen2-5-72b": ["https://qwenlm.github.io/blog/qwen2.5/", "https://huggingface.co/Qwen/Qwen2.5-72B-Instruct"],
  "qwen2-5-max": ["https://qwenlm.github.io/blog/qwen2.5-max/"],
  "qwq-32b": ["https://qwenlm.github.io/blog/qwq-32b/", "https://huggingface.co/Qwen/QwQ-32B"],
  "qwen3-235b": ["https://qwenlm.github.io/blog/qwen3/", "https://huggingface.co/Qwen/Qwen3-235B-A22B"],
  "qwen3-235b-2507": ["https://qwenlm.github.io/blog/qwen3/", "https://huggingface.co/Qwen/Qwen3-235B-A22B"],
  "qwen3-235b-a22b-2507": ["https://qwenlm.github.io/blog/qwen3/", "https://huggingface.co/Qwen/Qwen3-235B-A22B"],
  "qwen3-max": ["https://qwenlm.github.io/blog/qwen3/"],
  "qwen3-max-thinking-preview": ["https://qwenlm.github.io/blog/qwen3/"],
  "qwen3-max-thinking": ["https://qwenlm.github.io/blog/qwen3/"],
  "qwen3-5-397b-a17b": ["https://qwenlm.github.io/blog/qwen3/"],
  "qwen3-6-plus": ["https://qwenlm.github.io/blog/qwen3/"],
  "qwen3-6-max-preview": ["https://qwenlm.github.io/blog/qwen3/"],
  "qwen3-7-max": ["https://qwenlm.github.io/blog/qwen3/"],
  "claude-instant": ["https://docs.anthropic.com/en/docs/about-claude/models/overview"],
  "claude-2-0": ["https://www.anthropic.com/news/claude-2"],
  "claude-2-1": ["https://www.anthropic.com/news/claude-2-1"],
  "claude-3-opus": ["https://www.anthropic.com/news/claude-3-family"],
  "claude-3-5-haiku": ["https://www.anthropic.com/news/3-5-models-and-computer-use"],
  "claude-3-7-sonnet": ["https://www.anthropic.com/news/claude-3-7-sonnet"],
  "claude-4-opus": ["https://www.anthropic.com/news/claude-4"],
  "claude-4-1-opus": ["https://docs.anthropic.com/en/docs/about-claude/models/overview"],
  "claude-4-5-sonnet": ["https://docs.anthropic.com/en/docs/about-claude/models/overview"],
  "claude-opus-4-5": ["https://docs.anthropic.com/en/docs/about-claude/models/overview"],
  "claude-opus-4-6-max": ["https://docs.anthropic.com/en/docs/about-claude/models/overview"],
  "claude-opus-4-7-max": ["https://docs.anthropic.com/en/docs/about-claude/models/overview"],
  "deepseek-llm-67b-v1": ["https://github.com/deepseek-ai/DeepSeek-LLM"],
  "deepseek-v2": ["https://github.com/deepseek-ai/DeepSeek-V2"],
  "deepseek-coder-v2": ["https://github.com/deepseek-ai/DeepSeek-Coder-V2"],
  "deepseek-v2-5": ["https://api-docs.deepseek.com/news/news0905"],
  "deepseek-v2-5-dec": ["https://api-docs.deepseek.com/news/news1226"],
  "deepseek-v3-dec": ["https://github.com/deepseek-ai/DeepSeek-V3"],
  "deepseek-r1-jan": ["https://github.com/deepseek-ai/DeepSeek-R1"],
  "deepseek-v3-0324": ["https://api-docs.deepseek.com/news/news250325"],
  "deepseek-r1-0528": ["https://api-docs.deepseek.com/news/news250528"],
  "deepseek-v3-1": ["https://api-docs.deepseek.com/news/news250821"],
  "deepseek-v3-1-terminus": ["https://api-docs.deepseek.com/news/news250922"],
  "deepseek-v3-2": ["https://api-docs.deepseek.com/news/news251201"],
  "deepseek-v4-pro-max": ["https://api-docs.deepseek.com/"],
  "palm-2": ["https://ai.google/discover/palm2/"],
  "gemini-1-0-ultra": ["https://blog.google/technology/ai/google-gemini-ai/"],
  "gemini-1-5-flash-may": ["https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/"],
  "gemini-1-5-pro-may": ["https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/"],
  "gemini-1-5-pro-sep": ["https://ai.google.dev/gemini-api/docs/models"],
  "gemini-2-0-flash-exp": ["https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/"],
  "gemini-2-0-flash-thinking-exp-jan": ["https://ai.google.dev/gemini-api/docs/models"],
  "gemini-2-5-pro-mar": ["https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/"],
  "gemini-2-5-pro": ["https://ai.google.dev/gemini-api/docs/models"],
  "gemini-3-pro-preview-high": ["https://ai.google.dev/gemini-api/docs/models"],
  "gemini-3-1-pro-preview": ["https://ai.google.dev/gemini-api/docs/models"],
  "kimi-k2": ["https://github.com/MoonshotAI/Kimi-K2"],
  "kimi-k2-0905": ["https://github.com/MoonshotAI/Kimi-K2"],
  "kimi-k2-thinking": ["https://github.com/MoonshotAI/Kimi-K2"],
  "kimi-k2-5": ["https://github.com/MoonshotAI/Kimi-K2"],
  "kimi-k2-6": ["https://github.com/MoonshotAI/Kimi-K2"],
  "k2-v2-high": ["https://www.llm360.ai/"],
  "k2-think-v2": ["https://www.llm360.ai/"],
  "llama-65b": ["https://ai.meta.com/blog/large-language-model-llama-meta-ai/"],
  "llama-2-chat-7b": ["https://ai.meta.com/llama/"],
  "llama-3-1-405b": ["https://ai.meta.com/blog/meta-llama-3-1/"],
  "llama-4-maverick": ["https://www.llama.com/"],
  "muse-spark": ["https://ai.meta.com/"],
  "minimax-m1-80k": ["https://www.minimax.io/news"],
  "minimax-m2": ["https://www.minimax.io/news"],
  "minimax-m2-1": ["https://www.minimax.io/news"],
  "minimax-m2-5": ["https://www.minimax.io/news"],
  "minimax-m2-7": ["https://www.minimax.io/news"],
  "gpt-3-5-turbo": ["https://platform.openai.com/docs/models"],
  "gpt-4": ["https://openai.com/research/gpt-4", "https://platform.openai.com/docs/models"],
  "gpt-4-turbo": ["https://openai.com/index/new-models-and-developer-products-announced-at-devday/", "https://platform.openai.com/docs/models"],
  "gpt-4o-may": ["https://openai.com/index/hello-gpt-4o/", "https://platform.openai.com/docs/models"],
  "gpt-4o-aug": ["https://platform.openai.com/docs/models"],
  "o1-preview": ["https://openai.com/index/introducing-openai-o1-preview/", "https://platform.openai.com/docs/models"],
  "o1": ["https://openai.com/index/o1-and-new-tools-for-developers/", "https://platform.openai.com/docs/models"],
  "o3": ["https://openai.com/index/introducing-o3-and-o4-mini/", "https://platform.openai.com/docs/models"],
  "o3-pro": ["https://platform.openai.com/docs/models"],
  "gpt-5-high": ["https://platform.openai.com/docs/models"],
  "gpt-5-codex-high": ["https://platform.openai.com/docs/models"],
  "gpt-5-1-high": ["https://platform.openai.com/docs/models"],
  "gpt-5-2-xhigh": ["https://platform.openai.com/docs/models"],
  "gpt-5-3-codex-xhigh": ["https://platform.openai.com/docs/models"],
  "gpt-5-4-xhigh": ["https://platform.openai.com/docs/models"],
  "gpt-5-5-xhigh": ["https://platform.openai.com/docs/models"],
  "solar-mini": ["https://www.upstage.ai/"],
  "solar-pro-2": ["https://www.upstage.ai/"],
  "solar-open-100b": ["https://www.upstage.ai/"],
  "solar-pro-3": ["https://www.upstage.ai/"],
  "mimo-v2-flash-feb-2026": ["https://mimo.xiaomi.com/"],
  "mimo-v2-pro": ["https://mimo.xiaomi.com/"],
  "mimo-v2-5-pro": ["https://mimo.xiaomi.com/"],
  "glm-4-5": ["https://docs.z.ai/"],
  "glm-4-6": ["https://docs.z.ai/"],
  "glm-4-7": ["https://docs.z.ai/"],
  "glm-5": ["https://docs.z.ai/"],
  "glm-5-1": ["https://docs.z.ai/"],
  "grok-1": ["https://github.com/xai-org/grok-1"],
  "grok-beta": ["https://docs.x.ai/docs/models"],
  "grok-2": ["https://docs.x.ai/docs/models"],
  "grok-3-mini-reasoning-high": ["https://docs.x.ai/docs/models"],
  "grok-4": ["https://docs.x.ai/docs/models"],
  "grok-4-20-0309": ["https://docs.x.ai/docs/models"],
  "grok-4-20-0309-v2": ["https://docs.x.ai/docs/models"],
  "grok-4-3-high": ["https://docs.x.ai/docs/models"]
};

function uniqueUrls(urls) {
  return [...new Set(urls.filter(Boolean))];
}

const vendorMetadata = {
  "anthropic": {
    sourceFile: "../../outputs/vendors/anthropic.md",
    status: "publishable",
    caseLibraryStatus: "usable",
    positioning: "Claude 系列厂商，长上下文、代码任务和长周期 agentic work 是当前主线。",
    families: ["Claude 3 / 3.5", "Claude 4 / Opus 4.x", "Claude 5 / Mythos-class"],
    strengths: ["长上下文和代码库处理", "agentic coding", "安全定位清晰"],
    risks: ["价格偏高", "数据保留和 fallback 约束", "Fable/Mythos 以外案例仍需补证"]
  },
  "openai": {
    sourceFile: "../../outputs/vendors/openai.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "闭源前沿模型、API 平台和 Codex coding-agent 工作流的主轴厂商。",
    families: ["GPT-5 family", "o-series", "Codex", "open-weight / edge"],
    strengths: ["API 生态广", "推理和专业工作流覆盖强", "Coding Agent 产品化成熟"],
    risks: ["模型和价格变化快", "案例库缺少 A 类公开证据", "effort/variant 容易被误建成独立模型"]
  },
  "google": {
    sourceFile: "../../outputs/vendors/google.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "Gemini / Gemma / Veo 等多模态模型线的核心厂商，平台覆盖强。",
    families: ["Gemini 3", "Gemini 2.5", "Gemma", "Veo / Imagen"],
    strengths: ["Google 生态", "长上下文和多模态", "企业分发渠道"],
    risks: ["Preview 生命周期需要显式提示", "模型命名和迁移节奏变化快", "公开 A 类案例未冻结"]
  },
  "deepseek": {
    sourceFile: "../../outputs/vendors/deepseek.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "开放权重、低成本和 OpenAI-compatible API 路线中的关键厂商。",
    families: ["DeepSeek R series", "DeepSeek V series", "Speciale / API-only", "open-weight branches"],
    strengths: ["开放 reasoning 路线", "开发者关注度高", "成本/性能讨论活跃"],
    risks: ["A 类案例不足", "API alias 和模型版本需要逐条核验", "部署来源差异较大"]
  },
  "qwen-alibaba": {
    sourceFile: "../../outputs/vendors/qwen-alibaba.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "Alibaba 的 Qwen 多模态、开源和云服务模型线，覆盖文本、thinking、VL、Coder 和 Omni。",
    families: ["Qwen3", "Qwen3-VL", "Qwen Coder", "Qwen Omni / Audio"],
    strengths: ["模型线覆盖广", "开放生态信号强", "thinking 变体路线清晰"],
    risks: ["变体很多，需要冻结 canonical ID", "VL/Omni/Coder 案例不能混入通用 Qwen", "A 类案例待补证"]
  },
  "xai": {
    sourceFile: "../../outputs/vendors/xai.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "Grok 系列厂商，定位在实时搜索、工具使用、coding workflow 和 X 生态。",
    families: ["Grok 4 family", "Grok Build", "Grok Imagine", "Grok Voice"],
    strengths: ["强 Grok 品牌", "实时搜索和工具使用叙事", "媒体/API 分支丰富"],
    risks: ["X 来源需要快照", "媒体输出涉及 IP/肖像风险", "Build/Imagine/Voice 不能混成通用聊天模型"]
  },
  "kimi": {
    sourceFile: "../../outputs/vendors/kimi.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "Moonshot AI 的 Kimi 长上下文、代码、多模态和 K2 Thinking 模型线。",
    families: ["Kimi K2 family", "Kimi Thinking", "Kimi open models"],
    strengths: ["长上下文", "K2 Thinking 工具调用", "部分开放模型分支"],
    risks: ["产品名和 API 模型名可能不一致", "开源分支和托管模型不能混用", "案例库待补证"]
  },
  "meta": {
    sourceFile: "../../outputs/vendors/meta.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "open-weight Llama 生态核心厂商，重点是 Llama 4 多模态 MoE 和许可证/部署边界。",
    families: ["Llama 4", "Llama 3.x", "Llama safety/tools"],
    strengths: ["开放权重生态", "Hugging Face/GitHub 分发", "可本地部署"],
    risks: ["许可和部署差异需要展示", "hosted provider 价格不能混入 Meta 原生页", "A 类案例未冻结"]
  },
  "minimax": {
    sourceFile: "../../outputs/vendors/minimax.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "MiniMax 覆盖 LLM/agent、speech、video、music 等多模态 API 路线。",
    families: ["MiniMax M", "MiniMax speech", "MiniMax video", "MiniMax music"],
    strengths: ["多模态 API 覆盖", "M 系列 reasoning/agent 路线", "产品入口丰富"],
    risks: ["媒体案例不能混入 LLM 案例", "M2/M3 版本关系需核验", "公开 A 类案例不足"]
  },
  "z-ai": {
    sourceFile: "../../outputs/vendors/z-ai.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "GLM 系列厂商，当前叙事集中在 reasoning、coding 和 agent-oriented engineering。",
    families: ["GLM-4.5", "GLM-5", "GLM coding/API"],
    strengths: ["agent-oriented foundation model", "Claude Code compatible workflow 信号", "开放分支可检查"],
    risks: ["Z AI / Zhipu / GLM 命名需冻结", "Claude-compatible 使用需单独证据行", "A 类案例待补证"]
  },
  "upstage": {
    sourceFile: "../../outputs/vendors/upstage.md",
    status: "limited",
    caseLibraryStatus: "platform_only",
    positioning: "Solar LLM 和 Document AI 工作流厂商，模型线相对小而偏企业文档场景。",
    families: ["Solar", "Document AI"],
    strengths: ["Solar LLM brand", "Document Parse / Document AI", "企业工作流"],
    risks: ["当前 Solar 模型名需要人工核验", "资料偏薄", "案例库待补证"]
  },
  "xiaomi": {
    sourceFile: "../../outputs/vendors/xiaomi.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "MiMo reasoning、coding 和 agentic foundation model 线，连接 Xiaomi 终端/生态潜力。",
    families: ["MiMo", "MiMo Code", "MiMo Audio"],
    strengths: ["MiMo reasoning line", "terminal-native coding assistant 信号", "GitHub/Hugging Face 入口"],
    risks: ["GitHub org 大小写和 slug 需区分", "MiMo-Code 是工具证据，不等同模型性能", "价格/API 未冻结"]
  },
  "mbzuai-ifm": {
    sourceFile: "../../outputs/vendors/mbzuai-ifm.md",
    status: "limited",
    caseLibraryStatus: "archive_only",
    positioning: "K2 / K2 Think 主权 reasoning 方向的研究型厂商节点。",
    families: ["K2", "K2 Think"],
    strengths: ["sovereign reasoning", "研究透明度", "long context 叙事"],
    risks: ["K2 Think 可能是系统而非单模型", "产品化边界不清", "案例库仅适合归档 / 背景资料"]
  },
  "stepfun": {
    sourceFile: "../../outputs/vendors/stepfun.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "Step 系列多模态 reasoning、coding 和高效率 MoE 模型厂商。",
    families: ["Step 3", "Step Flash", "StepFun Platform"],
    strengths: ["hardware-aware multimodal reasoning", "efficient agentic workflow", "API 分发信号"],
    risks: ["Step3/3.5/3.7 版本关系需继续核验", "价格和模型可用性需定期更新", "案例库待补证"]
  },
  "bytedance-seed": {
    sourceFile: "../../outputs/vendors/bytedance-seed.md",
    status: "review",
    caseLibraryStatus: "platform_only",
    positioning: "ByteDance Seed 是 Wiki 中额外出现的 Seed 模型节点，覆盖 productivity、video 和 multimodal research。",
    families: ["Seed2.1", "Seedance", "Seed multimodal research"],
    strengths: ["Seed2.1 productivity focus", "Seedance 视频模型", "官方英文 Seed 站点"],
    risks: ["访问渠道和价格需核验", "视频案例涉及 IP/safety 风险", "不是 Bitable 14 厂商主表节点"]
  }
};

const vendorPageOnlyModels = [
  { name: "Claude 3 Haiku", vendorId: "anthropic", releaseDate: "2024-03-13", officialLink: "https://www.anthropic.com/news/claude-3-haiku", isReasoning: false, note: "来自 Anthropic 官方发布和客户案例补证；不在 Artificial Analysis 107 行复制结果中。" },
  { name: "Claude 3.5 Sonnet", vendorId: "anthropic", releaseDate: "2024-06-20", officialLink: "https://www.anthropic.com/news/claude-3-5-sonnet", isReasoning: false, note: "来自 Anthropic 官方发布和客户案例补证；不在 Artificial Analysis 107 行复制结果中。" },
  { name: "Claude Fable 5", vendorId: "anthropic", releaseDate: "2026-06-09", officialLink: "https://www.anthropic.com/news/claude-fable-5-mythos-5", isReasoning: true, note: "来自 Phase 1/1.5 模型卡和案例库；不在 Artificial Analysis 107 行复制结果中。" },
  { name: "Claude Mythos 5", vendorId: "anthropic", releaseDate: "2026-06-09", officialLink: "https://www.anthropic.com/news/claude-fable-5-mythos-5", isReasoning: true, note: "来自 Anthropic 厂商页和官方发布；可用性受限，暂无站内案例。" },
  { name: "Seed-2.1-Pro-Preview", vendorId: "bytedance-seed", releaseDate: "2026-06-19", officialLink: "https://seed.bytedance.com/en/blog/seed-2-1-preview-model-release-on-arena", isReasoning: true, note: "来自 ByteDance Seed 厂商页时间线，暂无 AA 评分。" },
  { name: "Seed2.1 Pro", vendorId: "bytedance-seed", releaseDate: "2026-06-23", officialLink: "https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity", isReasoning: true, note: "来自 ByteDance Seed 厂商页，暂无 AA 评分。" },
  { name: "Seed2.1 Turbo", vendorId: "bytedance-seed", releaseDate: "2026-06-23", officialLink: "https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity", isReasoning: false, note: "来自 ByteDance Seed 厂商页，暂无 AA 评分。" },
  { name: "Seedance 1.0", vendorId: "bytedance-seed", releaseDate: "2026", officialLink: "https://seed.bytedance.com/en/seedance", isReasoning: false, note: "来自 ByteDance Seed 厂商页；视频模型，案例需单独安全审核。" },
  { name: "Seedance 2.0", vendorId: "bytedance-seed", releaseDate: "暂无数据", officialLink: "https://seed.bytedance.com/en/seedance", isReasoning: false, note: "来自 ByteDance Seed 厂商页模型家族，暂无独立来源字段。" },
  { name: "Seed1.5 VL", vendorId: "bytedance-seed", releaseDate: "暂无数据", officialLink: "https://seed.bytedance.com/en/", isReasoning: false, note: "来自 ByteDance Seed 厂商页模型家族，暂无独立来源字段。" },
  { name: "BAGEL", vendorId: "bytedance-seed", releaseDate: "暂无数据", officialLink: "https://github.com/ByteDance-Seed", isReasoning: false, note: "来自 ByteDance Seed 厂商页模型家族/GitHub 入口，暂无 AA 评分。" }
];

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function publishabilityFor(name, vendorId, slug) {
  if (name === "Claude Fable 5") return "Publishable";
  if (vendorId === "mbzuai-ifm") return "Archive";
  if (supplementalCaseCountFor(slug) > 0) return "Publishable";
  return "Limited";
}

function caseStatusFor(name, aCaseCount) {
  return aCaseCount > 0 ? `已有 ${aCaseCount} 条可核验 A 类案例` : "暂无已验证 A 类案例";
}

function sourceStatusFor(row) {
  const supplementalCount = (row.sources ?? []).filter((source) => !source.includes("artificialanalysis.ai")).length;
  if (row.sourceKind === "bitable") {
    return supplementalCount > 0
      ? `来自飞书 Bitable 107 行 + Artificial Analysis + ${supplementalCount} 个厂商/官方/模型家族证据入口；AA 不是唯一事实来源。`
      : "来自飞书 Bitable 107 行 + Artificial Analysis 链接；非唯一事实来源。";
  }
  return supplementalCount > 0
    ? `来自厂商页/模型卡骨架 + ${supplementalCount} 个厂商/官方/模型家族证据入口；暂无 Artificial Analysis 行。`
    : "来自厂商页/模型卡骨架；暂无 Artificial Analysis 行。";
}

function modelSummary(model) {
  if (model.publishability === "Publishable") {
    return "完整样板模型：已有官方来源、风险说明和可核验 A 类案例。";
  }
  if (model.publishability === "Archive") {
    return "归档 / 暂停研究节点：保留详情入口，但不作为主动推荐。";
  }
  if (model.sourceKind === "bitable") {
    return model.aCaseCount > 0
      ? "已有 A 类案例和补充来源；评分字段仍只作参考。"
      : "来自完整 107 行模型表，并已补厂商/官方/模型家族证据；当前站内暂无已验证 A 类案例。";
  }
  return "来自厂商页骨架的补充模型；缺失字段以“暂无数据 / 官方未披露”展示。";
}

function modelCapabilities(model) {
  return {
    codingAgent: model.isReasoning ? "推理/agent 候选" : "通用/待核验",
    longContext: "暂无数据",
    research: model.isReasoning ? "推理候选" : "待核验",
    openEcosystem: model.vendorId === "meta" || model.vendorId === "deepseek" || model.vendorId === "qwen-alibaba" ? "开放/混合信号" : "平台/待核验",
    lifecycleRisk: model.releaseDate === "暂无数据" || model.publishability === "Archive" ? "高" : "中"
  };
}

function normalizeMissingText(value) {
  if (!value || value === "Not disclosed on AA") return "Artificial Analysis 未披露";
  return value;
}

function buildModel(base) {
  const vendorMeta = Object.values(rawVendorMap).find((v) => v.id === base.vendorId) ?? { displayName: vendorMetadata[base.vendorId]?.displayName ?? base.vendorId, officialSite: "" };
  const publishability = publishabilityFor(base.name, base.vendorId, base.slug);
  const aCaseCount = base.name === "Claude Fable 5" ? 8 : supplementalCaseCountFor(base.slug);
  const supplementalSources = uniqueUrls([
    ...(modelEvidenceSources[base.slug] ?? []),
    ...(vendorEvidenceSources[base.vendorId] ?? []),
    base.officialLink || vendorMeta.officialSite
  ]);
  const nonAASupplementalSourceCount = supplementalSources.filter((source) => !source.includes("artificialanalysis.ai")).length;
  const sourceCoverage = nonAASupplementalSourceCount > 0 ? "supplemented" : "aa_only";
  const model = {
    id: base.slug,
    name: base.name,
    slug: base.slug,
    vendorId: base.vendorId,
    vendor: vendorMeta.displayName,
    publishability,
    caseStatus: caseStatusFor(base.name, aCaseCount),
    sourceStatus: "",
    headline: base.sourceKind === "bitable" ? `${base.name} 的完整模型表记录。` : `${base.name} 的厂商页补充记录。`,
    summary: "",
    releaseDate: base.releaseDate || "暂无数据",
    modelId: base.slug,
    context: "暂无数据",
    output: "暂无数据",
    modality: base.vendorId === "bytedance-seed" && /seedance/i.test(base.name) ? "视频 / 多模态，细节待核验" : "文本 / 多模态待核验",
    reasoning: base.isReasoning ? "是 / 推理模型或 thinking 模式" : "否或官方未披露",
    price: "官方未披露 / 暂无数据",
    platforms: [vendorMeta.displayName],
    officialLink: base.officialLink || vendorMeta.officialSite,
    score: base.score,
    scoreDelta: base.scoreDelta,
    vendorOrder: base.vendorOrder ?? null,
    artificialAnalysisId: base.artificialAnalysisId ?? null,
    baseModelReleaseDate: normalizeMissingText(base.baseModelReleaseDate),
    notes: base.notes || "",
    sourceKind: base.sourceKind,
    capabilities: {},
    fit: ["作为完整模型索引和厂商路线追踪入口", base.isReasoning ? "推理/agentic workflow 候选" : "通用模型对比"],
    avoid: ["缺少真实案例时不要包装成推荐", "缺字段时不要脑补价格、性能或上下文"],
    aCaseCount,
    sourceCoverage,
    supplementalSourceCount: nonAASupplementalSourceCount,
    riskNotes: [
      aCaseCount > 0 ? "已有可核验 A 类案例；仍需保存原始证据、产物页截图和页面快照。" : "暂无已验证 A 类案例；已补厂商/官方/模型家族证据，但尚未找到符合 A 类标准的公开使用案例。",
      base.score == null ? "暂无 Artificial Analysis 评分或未在 Bitable 主表中出现。" : "Artificial Analysis 评分仅作参考，不能作为唯一事实来源。",
      "缺失字段在页面中以“暂无数据 / 官方未披露”显示。"
    ],
    sources: supplementalSources,
    sourceFile: base.sourceKind === "bitable" ? "../../work/source-data/artificial-analysis-14-vendors-export.tsv" : vendorMetadata[base.vendorId]?.sourceFile
  };
  model.sourceStatus = sourceStatusFor(model);
  model.summary = modelSummary(model);
  model.capabilities = modelCapabilities(model);
  return model;
}

const rows = fs.readFileSync(sourcePath, "utf8").trim().split(/\r?\n/).map((line) => line.split("\t"));
const usedSlugs = new Set();

function uniqueSlug(name) {
  const base = slugify(name);
  let slug = base;
  let idx = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${idx++}`;
  usedSlugs.add(slug);
  return slug;
}

const models = rows.map((cols) => {
  const [name, rawVendor, vendorOrder, releaseDate, score, scoreDelta, isReasoning, officialLink, artificialAnalysisId, baseModelReleaseDate, notes] = cols;
  const vendor = rawVendorMap[rawVendor];
  if (!vendor) throw new Error(`Unknown vendor: ${rawVendor}`);
  return buildModel({
    name,
    slug: uniqueSlug(name),
    vendorId: vendor.id,
    vendorOrder: Number(vendorOrder),
    releaseDate: releaseDate || "暂无数据",
    score: score === "" ? null : Number(score),
    scoreDelta: scoreDelta === "" ? null : Number(scoreDelta),
    isReasoning: isReasoning === "True",
    officialLink,
    artificialAnalysisId,
    baseModelReleaseDate,
    notes,
    sourceKind: "bitable"
  });
});

for (const extra of vendorPageOnlyModels) {
  const slug = uniqueSlug(extra.name);
  models.push(buildModel({
    ...extra,
    slug,
    score: null,
    scoreDelta: null,
    sourceKind: "vendor_page"
  }));
}

function parseAClassCases(markdown) {
  const aSection = markdown.split("## B 类证据")[0];
  const blocks = aSection.split(/\n### A\d+\./).slice(1);
  return blocks.map((block) => {
    const rows = [...block.matchAll(/^\| ([^|]+) \| ([\s\S]*?) \|$/gm)];
    const data = {};
    for (const [, key, value] of rows) {
      if (key.trim() !== "---" && key.trim() !== "字段") data[key.trim()] = value.trim();
    }
    return {
      id: data.case_id,
      title: data.case_title,
      vendor: "Anthropic / Claude",
      vendorId: "anthropic",
      modelId: "claude-fable-5",
      modelName: "Claude Fable 5",
      userOrOrg: data.user_or_org,
      originalEvidenceUrl: data.original_evidence_url,
      artifactUrl: data.artifact_url,
      sourcePlatform: data.source_platform,
      sourceType: "real_case",
      taskCategory: data.task_category?.replaceAll(";", " /") ?? "真实案例",
      taskDescription: data.task_description,
      outputResult: data.output_result,
      modelContribution: data.model_contribution,
      evidenceGrade: "A",
      showcaseEligible: true,
      selectedForModelCard: data.selected_for_model_card === "true",
      riskNotes: data.risk_notes,
      collectedAt: "2026-06-25",
      reviewStatus: "已审核"
    };
  });
}

const cases = [
  ...parseAClassCases(fs.readFileSync(casesPath, "utf8")),
  ...supplementalACases
];

const vendorIds = new Set(models.map((model) => model.vendorId));
vendorIds.add("bytedance-seed");

const vendors = Object.entries(vendorMetadata).map(([id, meta]) => {
  const vendorModels = models.filter((model) => model.vendorId === id);
  const flagshipModels = vendorModels
    .slice()
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1))
    .slice(0, 4)
    .map((model) => model.name);
  return {
    id,
    displayName: rawVendorMap[Object.keys(rawVendorMap).find((key) => rawVendorMap[key].id === id)]?.displayName ?? meta.positioning.split(" ")[0],
    slug: id,
    officialSite: rawVendorMap[Object.keys(rawVendorMap).find((key) => rawVendorMap[key].id === id)]?.officialSite ?? (id === "bytedance-seed" ? "https://seed.bytedance.com/en/" : ""),
    status: meta.status,
    caseLibraryStatus: id === "anthropic" ? "usable" : meta.caseLibraryStatus,
    positioning: meta.positioning,
    families: meta.families,
    flagshipModels,
    strengths: meta.strengths,
    risks: meta.risks,
    modelCount: vendorModels.length,
    sourceFile: meta.sourceFile
  };
}).filter((vendor) => vendorIds.has(vendor.id));

const metrics = {
  vendors: vendors.length,
  models: models.length,
  bitableModels: rows.length,
  vendorPageOnlyModels: vendorPageOnlyModels.length,
  publishableModels: models.filter((model) => model.publishability === "Publishable").length,
  limitedModels: models.filter((model) => model.publishability === "Limited").length,
  archiveModels: models.filter((model) => model.publishability === "Archive").length,
  verifiedACases: cases.length,
  modelsWithCases: models.filter((model) => model.aCaseCount > 0).length,
  modelsWithoutCases: models.filter((model) => model.aCaseCount === 0).length,
  modelsWithSupplementalSources: models.filter((model) => model.sourceCoverage === "supplemented").length,
  modelsAAOnly: models.filter((model) => model.sourceCoverage !== "supplemented").length,
  datasetCut: "2026-06-26",
  methodology: "Model Atlas 2.0 证据策略",
  visualDirection: "Atlas Command Center",
  sourceNote: "107 行来自飞书 Bitable 复制导出；补充模型来自厂商页/模型卡骨架，缺字段不脑补。"
};

fs.writeFileSync(path.join(siteDataDir, "models.json"), `${JSON.stringify(models, null, 2)}\n`);
fs.writeFileSync(path.join(siteDataDir, "vendors.json"), `${JSON.stringify(vendors, null, 2)}\n`);
fs.writeFileSync(path.join(siteDataDir, "cases.json"), `${JSON.stringify(cases, null, 2)}\n`);
fs.writeFileSync(path.join(siteDataDir, "metrics.json"), `${JSON.stringify(metrics, null, 2)}\n`);

console.log(JSON.stringify(metrics, null, 2));
