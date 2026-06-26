import models from "../data/models.json";
import vendors from "../data/vendors.json";

const site = "https://model-seven-blond.vercel.app";
const staticPaths = [
  "/",
  "/models",
  "/vendors",
  "/cases",
  "/compare",
  "/topics/coding-agent",
  "/methodology"
];

function url(path: string) {
  return `<url><loc>${site}${path}</loc></url>`;
}

export function GET() {
  const modelPaths = models.map((model) => `/models/${model.slug}`);
  const vendorPaths = vendors.map((vendor) => `/vendors/${vendor.id}`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPaths, ...modelPaths, ...vendorPaths].map(url).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
