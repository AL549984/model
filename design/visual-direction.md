# Visual Direction

> Stage B output  
> Product Design direction before site implementation.

## North Star

The site should feel like opening a live model intelligence console: a dense but calm command center where the user can scan vendors, model states, evidence grades and cases without reading long prose first.

## Visual Option 1: Atlas Command Center

Dense, operational and authoritative. The homepage opens with a split dashboard: left navigation rail, central frontier model map, right evidence/status stream. Vendor nodes orbit capability clusters. Model cards look like instrument panels with Publishable / Limited / Hold badges.

Best for: credibility, information density, immediate "intelligence station" feeling.

## Visual Option 2: Frontier Graph Lab

More exploratory and research-oriented. The first screen is a model lineage graph with connected vendor families, a capability radar/matrix below, and an inspector pane that updates conceptually around selected models.

Best for: communicating model relationships, lineage, and discovery.

## Visual Option 3: Evidence Ops Console

Most evidence-first. The first screen emphasizes verified cases, source risk, publishability gates and QA status. The hero feels like an evidence review dashboard rather than a model catalog.

Best for: trust, QA culture, and avoiding weak-evidence overclaiming.

## Recommended Palette

| Token | Value | Use |
|---|---|---|
| Background | `#050816` | Page base |
| Background raised | `#070B18` | Header, side rail |
| Surface | `rgba(15, 23, 42, 0.72)` | Glass panels |
| Surface strong | `rgba(17, 24, 39, 0.92)` | Tables and dense cards |
| Border | `rgba(148, 163, 184, 0.18)` | Panel and grid boundaries |
| Text primary | `#E5F0FF` | Main text |
| Text secondary | `#94A3B8` | Supporting metadata |
| Primary | `#22D3EE` | Active links, model nodes |
| Electric blue | `#38BDF8` | Hover and graph edges |
| Violet | `#8B5CF6` | Frontier emphasis |
| Magenta | `#E879F9` | Special highlights |
| Emerald | `#34D399` | Publishable / A evidence |
| Amber | `#FBBF24` | Limited / warning |
| Rose | `#FB7185` | Hold / risk |

## Typography

- Interface font: Inter, Geist Sans or system sans.
- Data labels: JetBrains Mono, Geist Mono or ui-monospace.
- Large title: 44-56px desktop, 32-38px mobile.
- Body text: 15-17px with generous line height.
- Avoid ultra-small captions below 12px; evidence labels must remain readable.

## Background Texture

- Dark radial gradient from top center and right side.
- Subtle 1px grid using low-alpha cyan/slate lines.
- Thin circuit-like connector lines around maps and matrices.
- No large decorative blobs as standalone ornaments. Ambient light must be tied to data panels or map nodes.

## Card Style

- Radius: 8px for cards and panels.
- Border: 1px translucent slate/cyan.
- Background: layered glass on dark solid surface.
- Shadow: soft, low-spread blue/cyan glow only on active or featured elements.
- Avoid card-inside-card nesting; use tables, strips or panel sections inside detail pages.

## Badge Style

| Badge | Style |
|---|---|
| Publishable | Emerald outline, soft green wash, uppercase mono label |
| Limited | Amber outline, warm warning tint, visible warning icon in implementation |
| Hold | Rose outline, dark red wash, "Lifecycle / Hold" copy |
| Evidence A | Emerald filled chip |
| Evidence B | Blue outline chip |
| Evidence C | Slate outline chip |
| Evidence D | Rose outline chip |

## Data Visualization Style

- CapabilityMatrix: compact grid with glowing selected cells and muted unavailable cells.
- VendorMap: constellation graph with vendor nodes and model-family clusters.
- ModelTimeline: horizontal rail with event dots and source confidence.
- CompareTable: sticky first column, status badges, A-case counts, risk notes.
- Case list: source platform, artifact URL and evidence grade visible at row level.

## Motion

- Hover: border brightens, subtle `translateY(-2px)`, no bouncy easing.
- Node graph: slow ambient pulse on active nodes only.
- Filter controls: instant state changes with 120-180ms opacity/position transitions.
- Respect reduced-motion.

## Implementation Preference

Use Option 1 as the default implementation target if no additional preference is given, because it best satisfies "AI intelligence station" and supports all required pages without becoming decorative.
