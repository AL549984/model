# Page Wireframes

> Stage B output  
> Wireframes describe layout and content hierarchy, not final code.

## `/` Homepage

### First Screen

- Global navigation: logo/title, Vendors, Models, Cases, Compare, Coding Agent.
- Hero title: "Frontier Models Atlas".
- One-sentence positioning below title.
- Four StatCards: vendors, models, publishable models, verified A cases.
- Main visual panel: VendorMap with Anthropic, OpenAI, DeepSeek, Qwen / Alibaba and Google.
- Right rail: Evidence status stream showing Claude Fable 5 Publishable, three Limited models and Gemini Hold.

### Below First Screen

- Featured Models: five ModelCards with status badges.
- Evidence Legend: A/B/C/D in compact horizontal panel.
- Capability Matrix preview: columns for coding agent, long context, research, open ecosystem, lifecycle risk.
- A-class case highlights: only Claude Fable 5 approved A cases.
- Three route cards: Compare, Cases, Coding Agent.

## `/vendors`

- Page header: "Vendor Map".
- Filter strip: status, case library status, region/ecosystem if available.
- Vendor grid with VendorCard:
  - display name
  - 30-second judgment
  - flagship models
  - case library status
  - page status
- Side note: canonical vendor map and naming normalization.

## `/vendors/[vendor]`

- VendorHeader with display name, canonical slug, official site and status.
- 30-second judgment.
- Model route section with family table.
- ModelTimeline for key events.
- Key inflection points as numbered strips.
- Representative models with P0/P1 labels.
- Recommended / avoid use-case columns.
- Case library status panel.
- RiskNotice.
- SourceLinkBlock.

## `/models`

- Page header: "Model Index".
- Filters:
  - vendor
  - publishability
  - evidence availability
  - task fit
- Model grid / table hybrid:
  - name
  - vendor
  - publishability
  - A-case count
  - case status
  - primary use advice
- Hold models appear visually dimmed and are not promoted as recommendations.

## `/models/[model]`

- ModelHeader with propagation title, vendor, publishability, source status.
- Prominent warning banner for Limited or Hold.
- 30-second conclusion.
- Basic information table.
- Lineage position panel.
- Key capability judgment.
- Official evaluation interpretation.
- Real cases:
  - Claude Fable 5 shows A cases.
  - Limited/Hold models show "No verified public A cases found."
- Fit / avoid split panel.
- Previous / competitor comparison.
- Risks and limitations.
- Source and evidence block with official links and case links.

## `/cases`

- Page header: "Evidence Library".
- Default filter: A-class and showcase eligible cases.
- CaseFilterBar:
  - model
  - vendor
  - evidence grade
  - source platform
  - selected for model card
- CaseTable / CaseCards:
  - case title
  - user or org
  - original evidence URL
  - artifact URL
  - model contribution
  - evidence grade
  - review status
- Warning panel explaining non-case materials.

## `/compare`

- Page header: "Model Compare".
- ComparisonTable with:
  - vendor
  - publishability
  - context
  - modality
  - price
  - A-case count
  - risk status
  - use recommendation
- Sticky status legend and source caveat.

## `/topics/coding-agent`

- Topic header: "Coding Agent Model Guide".
- Short decision summary.
- Recommended models:
  - Claude Fable 5 as Publishable anchor.
  - GPT-5.5 xHigh / DeepSeek V3.2 / Qwen3 Max Thinking as Limited candidates.
- Verified case section: Claude Fable 5 A cases only.
- Risk checklist:
  - cost
  - data retention
  - tool reliability
  - missing public A cases
- Links to model pages, compare and cases.
