# Product Design Brief

> Stage B output  
> Product: Frontier Models Atlas  
> Date: 2026-06-25

## Product Positioning

Frontier Models Atlas is an AI model intelligence station for understanding frontier model vendors, model lineages, publishability status and real-world evidence. It turns the existing Model Atlas 2.0 content into a browsable, evidence-first website.

This is not a blog, brochure site or benchmark leaderboard. It is a structured decision surface for people who need to compare models and trust the provenance behind each claim.

## Target Users

- AI builders choosing models for coding agents, research workflows and product prototypes.
- Technical leads comparing vendors, costs, risks and model maturity.
- Researchers tracking model lineages and evidence quality.
- Content/product teams turning the Wiki into a public-facing knowledge product.

## Core Use Cases

1. Identify which vendors and model families matter now.
2. Compare Publishable, Limited and Hold models without losing evidence context.
3. Open a model card and see the 30-second judgment, fit, risks and sources.
4. Inspect real cases and confirm whether they are A-class evidence.
5. Start from a workflow topic, especially coding agents, and see recommended models.

## Information Hierarchy

1. Evidence and status: Publishable / Limited / Hold, A/B/C/D evidence.
2. Model identity: model name, vendor, lineage position, capability boundary.
3. Use-case fit: suitable / unsuitable scenarios.
4. Source trail: official docs, release notes, case URLs and artifacts.
5. Comparison context: other models, vendors and lifecycle warnings.

## Page Priority

| Priority | Page | Role |
|---|---|---|
| P0 | `/` | Show the atlas as an intelligence command center. |
| P0 | `/models/claude-fable-5` | Full Publishable sample model page. |
| P0 | `/models` | List models with status and filters. |
| P0 | `/cases` | Prove the evidence system is real. |
| P1 | `/vendors` and `/vendors/[vendor]` | Vendor navigation skeleton and roadmap context. |
| P1 | `/compare` | Decision table for model tradeoffs. |
| P1 | `/topics/coding-agent` | Workflow entry point for a high-value audience. |

## Design Keywords

- Dark AI intelligence dashboard
- Frontier model map
- Evidence-first research product
- Glass panels with restraint
- Thin grid lines
- Neon accents used as information highlights
- Capability matrix
- Model lineage and vendor constellation
- Technical, readable, credible

## Do Not Do

- Do not create a generic blog layout.
- Do not create an enterprise SaaS marketing homepage.
- Do not use empty decorative hero art instead of content.
- Do not hide evidence warnings behind small text.
- Do not make the palette so neon that tables become hard to read.
- Do not present Limited or Hold models as equal to Publishable models.
- Do not use B/C/D evidence as featured real cases.

## Product Design Gate Decision

The brief is sufficiently specified by the project goal and current content. Proceed to visual ideation with three concrete UI directions before implementation.
