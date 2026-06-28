import { SITE_URL } from "../lib/seo";

const site = SITE_URL;

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
AI-Index: ${site}/llms.txt
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
