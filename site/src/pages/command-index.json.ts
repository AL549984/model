import { buildCommandIndex } from "../lib/commandIndex";

export function GET() {
  return new Response(JSON.stringify({
    generatedAt: new Date().toISOString(),
    items: buildCommandIndex()
  }), {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
