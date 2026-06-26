# Site Implementation Plan

> Phase 5 deliverable  
> Date: 2026-06-25  
> Scope: implementation plan only. No website code is created in this phase.

## 1. 推荐技术栈

| Layer | Recommendation | Reason |
|---|---|---|
| Framework | Astro or Next.js static export | Markdown-first content, static routes, simple deployment |
| Content | Markdown + typed frontmatter | Matches current outputs and Feishu Wiki migration |
| Data validation | Zod or JSON Schema | Enforce vendor/model/case fields before build |
| Styling | Tailwind CSS + small component library | Fast static prototype, controlled visual system |
| Search | Pagefind or FlexSearch | Static search without backend |
| Charts/timelines | Lightweight SVG/HTML components | Avoid heavy runtime |
| Deployment | Vercel / Cloudflare Pages / static object hosting | Low operational overhead |

Recommended starting choice: Astro, because the product is content-heavy and Markdown-native.

## 2. 数据文件结构

```text
content/
  vendors/
    openai.md
    anthropic.md
    google.md
    ...
  models/
    claude-fable-5.md
    gpt-5-5-xhigh.md
    deepseek-v3-2.md
    qwen3-max-thinking.md
    gemini-3-pro-preview.md
  cases/
    claude-fable-5-cases.md
    gpt-5-5-xhigh-cases.md
    ...
  indexes/
    vendors-index.md
    models-index.md
    cases-index.md
  topics/
    coding-agent.md
data/
  canonical-vendor-map.json
  model-lineage-map.json
  evidence-intake.json
  phase-status.json
schemas/
  vendor.schema.json
  model.schema.json
  case.schema.json
  evidence.schema.json
```

Current `outputs/` files can be copied into `content/` after frontmatter normalization.

## 3. 路由结构

| Route | Source |
|---|---|
| `/` | `content/index.md` or `site-prototype/homepage.md` |
| `/vendors` | `content/indexes/vendors-index.md` |
| `/vendors/[vendor]` | `content/vendors/[slug].md` |
| `/models` | `content/indexes/models-index.md` |
| `/models/[model]` | `content/models/[slug].md` |
| `/cases` | `content/indexes/cases-index.md` |
| `/cases/[model]` | `content/cases/[model]-cases.md` |
| `/compare` | `content/indexes/compare-page.md` |
| `/topics/coding-agent` | `content/topics/coding-agent.md` |

## 4. 组件结构

| Component | Purpose |
|---|---|
| `EvidenceBadge` | A/B/C/D evidence display |
| `PublishabilityBadge` | Publishable / Limited / Hold |
| `VendorHeader` | Vendor title, slug, status, official site |
| `ModelHeader` | Model title, vendor, publishability, source status |
| `Timeline` | Vendor and model chronology |
| `ModelFamilyTable` | Vendor model families |
| `CaseTable` | Structured case rows |
| `SourceList` | Official/source/case links |
| `RiskPanel` | Risks and limitations |
| `CompareMatrix` | Cross-model comparison |
| `WarningBanner` | Limited/Hold warnings |

## 5. JSON Schema

### vendor.schema.json

```json
{
  "type": "object",
  "required": [
    "vendor_id",
    "vendor_name",
    "display_name",
    "canonical_slug",
    "official_site",
    "model_families",
    "flagship_models",
    "timeline",
    "key_inflection_points",
    "strengths",
    "weaknesses",
    "pricing_strategy",
    "ecosystem",
    "case_library_status",
    "recommended_use_cases",
    "avoid_when",
    "source_links",
    "page_status"
  ],
  "properties": {
    "vendor_id": { "type": "string" },
    "canonical_slug": { "type": "string" },
    "official_site": { "type": "string", "format": "uri" },
    "case_library_status": {
      "enum": ["rich", "usable", "thin", "platform_only", "archive_only"]
    },
    "page_status": {
      "enum": ["draft", "review", "publishable", "limited", "archive_only"]
    }
  }
}
```

### model.schema.json

```json
{
  "type": "object",
  "required": [
    "model_id",
    "model_name",
    "vendor_id",
    "publishability",
    "source_links",
    "risk_notes"
  ],
  "properties": {
    "publishability": {
      "enum": ["Publishable", "Limited", "Hold", "Archive only"]
    },
    "case_status": {
      "enum": ["usable", "needs_case_search", "hold_lifecycle", "archive_only"]
    }
  }
}
```

### case.schema.json

```json
{
  "type": "object",
  "required": [
    "case_id",
    "case_title",
    "vendor",
    "model_name",
    "user_or_org",
    "original_evidence_url",
    "artifact_url",
    "source_platform",
    "source_type",
    "task_category",
    "task_description",
    "output_result",
    "model_contribution",
    "evidence_grade",
    "showcase_eligible",
    "selected_for_model_card",
    "risk_notes",
    "collected_at",
    "review_status"
  ],
  "properties": {
    "evidence_grade": { "enum": ["A", "B", "C", "D"] },
    "showcase_eligible": { "type": "boolean" },
    "selected_for_model_card": { "type": "boolean" }
  }
}
```

## 6. Markdown Frontmatter Schema

### Vendor page

```yaml
---
type: vendor
vendor_id: anthropic
canonical_slug: anthropic
display_name: Anthropic / Claude
page_status: publishable
case_library_status: usable
last_reviewed_at: 2026-06-25
source_links:
  - type: official_site
    url: https://www.anthropic.com/
---
```

### Model page

```yaml
---
type: model
model_id: claude-fable-5
model_name: Claude Fable 5
vendor_id: anthropic
publishability: Publishable
case_status: usable
source_status: official release + API docs + case library
last_reviewed_at: 2026-06-25
---
```

### Case library

```yaml
---
type: case_library
model_id: claude-fable-5
vendor_id: anthropic
case_count_A: 4
case_count_B: 0
case_count_C: 1
case_status: usable
last_reviewed_at: 2026-06-25
---
```

## 7. 构建命令

Example Astro commands:

```bash
npm create astro@latest frontier-models-atlas
cd frontier-models-atlas
npm install
npm run dev
npm run build
npm run preview
```

Content validation should run before `build`.

```bash
npm run validate:content
npm run lint
npm run build
```

## 8. QA 命令

Suggested scripts:

```bash
npm run validate:vendors
npm run validate:models
npm run validate:cases
npm run check:links
npm run check:evidence-grades
npm run build
```

Required QA gates:

1. Every vendor page has the 18 frozen fields.
2. Every model page has publishability.
3. No C/D evidence is selected for model-card showcase.
4. No collection page appears as original_evidence_url.
5. Hold pages show a warning banner.
6. Limited pages show case-insufficiency warning.

## 9. 部署建议

| Option | Use when |
|---|---|
| Vercel | Fast preview URLs and easy Next/Astro hosting |
| Cloudflare Pages | Static hosting with low cost and edge cache |
| GitHub Pages | Public static prototype only |
| Internal object storage | Private review before public release |

Initial deployment should be private or unlisted until:

- source snapshots are stored,
- Limited/Hold banners render correctly,
- Gemini 3 Pro Preview is replaced or clearly archived,
- no weak evidence is promoted.

## 10. 飞书数据同步方式

Recommended approach:

1. Keep old Wiki as Archive / Raw Cards.
2. Maintain Model Atlas 2.0 content in Git-backed Markdown.
3. Export Feishu Bitable data periodically to CSV/JSON.
4. Normalize vendor/model IDs using `canonical-vendor-map.md` and `model-lineage-id-spec.md`.
5. Run a sync script that updates `data/evidence-intake.json` and flags differences.
6. Do not auto-overwrite human-edited model cards; open review diffs instead.

## 11. Implementation Phases

| Phase | Work |
|---|---|
| Site 0 | Move outputs into content structure and add frontmatter |
| Site 1 | Build static routes for vendors, models, cases and indexes |
| Site 2 | Add evidence badges, warning banners and source panels |
| Site 3 | Add search and compare pages |
| Site 4 | Link checker, schema validation and private deployment |
| Site 5 | Public launch after evidence snapshot completion |

## 12. Do Not Implement Yet

Do not create the frontend repository until explicitly requested. This file is the implementation plan only.
