import models from "../data/models.json";
import vendors from "../data/vendors.json";
import cases from "../data/cases.json";
import metrics from "../data/metrics.json";
import { SITE_URL } from "../lib/seo";

const site = SITE_URL;
const staticPaths = [
  "/",
  "/models",
  "/vendors",
  "/cases",
  "/compare",
  "/updates",
  "/topics/coding-agent",
  "/methodology",
  "/llms.txt",
  "/atlas.json",
  "/evidence-archive.json",
  "/evidence-archive-history.json"
];

function url(path: string) {
  return `<url><loc>${site}${path}</loc><lastmod>${metrics.datasetCut}</lastmod></url>`;
}

export function GET() {
  const modelPaths = models.map((model) => `/models/${model.slug}`);
  const vendorPaths = vendors.map((vendor) => `/vendors/${vendor.id}`);
  const casePaths = cases
    .filter((item) => item.evidenceGrade === "A" && item.showcaseEligible)
    .map((item) => `/cases/${item.id}`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPaths, ...modelPaths, ...vendorPaths, ...casePaths].map(url).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
