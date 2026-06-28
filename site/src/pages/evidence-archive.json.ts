import evidenceArchive from "../data/evidence-archive.json";

export function GET() {
  return new Response(JSON.stringify(evidenceArchive, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
