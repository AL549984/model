import evidenceArchiveHistory from "../data/evidence-archive-history.json";

export function GET() {
  return new Response(JSON.stringify(evidenceArchiveHistory, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
