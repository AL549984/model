import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src/data");

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
}

function splitUrls(value) {
  if (!value) return [];
  return String(value)
    .split(/[\s;]+/)
    .map((url) => url.trim())
    .filter((url) => /^https?:\/\//.test(url));
}

const models = readJson("models.json");
const vendors = readJson("vendors.json");
const cases = readJson("cases.json");

const allowlistedHttpFailures = new Map([
  [
    "https://openai.com/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/khan-academy/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/duolingo/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/be-my-eyes/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/morgan-stanley/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/stripe/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/news/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/research/gpt-4",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/new-models-and-developer-products-announced-at-devday/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/hello-gpt-4o/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/introducing-openai-o1-preview/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/o1-and-new-tools-for-developers/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://openai.com/index/introducing-o3-and-o4-mini/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://www.perplexity.ai/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
  [
    "https://x.ai/",
    {
      statuses: [403],
      reason: "Manual browser review passed; automated checks are blocked by official-site access policy/anti-bot handling.",
    },
  ],
]);

const links = [];

for (const vendor of vendors) {
  for (const url of splitUrls(vendor.officialSite)) {
    links.push({ source: `vendor:${vendor.id}`, url });
  }
}

for (const model of models) {
  for (const url of [...splitUrls(model.officialLink), ...(model.sources ?? []).flatMap(splitUrls)]) {
    links.push({ source: `model:${model.id}`, url });
  }
}

for (const item of cases) {
  for (const url of [...splitUrls(item.originalEvidenceUrl), ...splitUrls(item.artifactUrl)]) {
    links.push({ source: `case:${item.id}`, url });
  }
}

const uniqueLinks = [...links.reduce((acc, item) => {
  const existing = acc.get(item.url);
  if (existing) {
    existing.source = `${existing.source},${item.source}`;
  } else {
    acc.set(item.url, { ...item });
  }
  return acc;
}, new Map()).values()];

function getAllowlistEntry(url, status) {
  const direct = allowlistedHttpFailures.get(url);
  if (direct?.statuses.includes(status)) return direct;

  try {
    const normalized = new URL(url);
    normalized.hash = "";
    normalized.search = "";
    const canonical = normalized.toString();
    const entry = allowlistedHttpFailures.get(canonical);
    if (entry?.statuses.includes(status)) return entry;
  } catch {
    return undefined;
  }

  return undefined;
}

async function checkUrl(item) {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      let response;
      try {
        response = await fetch(item.url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) });
      } catch {
        response = await fetch(item.url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(8000) });
      }
      if (response.status === 405 || response.status === 403) {
        response = await fetch(item.url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(8000) });
      }
      const allowlistEntry = getAllowlistEntry(item.url, response.status);
      return {
        ...item,
        status: response.status,
        ok: response.status < 400 || Boolean(allowlistEntry),
        allowlisted: Boolean(allowlistEntry),
        allowlistReason: allowlistEntry?.reason,
      };
    } catch (error) {
      lastError = error;
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    }
  }

  return { ...item, status: "ERROR", ok: false, error: lastError?.message ?? "Unknown error" };
}

const results = [];
const concurrency = 4;
for (let index = 0; index < uniqueLinks.length; index += concurrency) {
  const batch = uniqueLinks.slice(index, index + concurrency);
  results.push(...await Promise.all(batch.map(checkUrl)));
}

const failed = results.filter((item) => !item.ok);
const allowlisted = results.filter((item) => item.allowlisted);
for (const item of results) {
  const marker = item.allowlisted ? "ALLOWLIST" : item.ok ? "PASS" : "FAIL";
  console.log(
    `${marker}\t${item.status}\t${item.source}\t${item.url}${item.allowlistReason ? `\t${item.allowlistReason}` : ""}${item.error ? `\t${item.error}` : ""}`,
  );
}

if (failed.length) {
  console.error(`\n${failed.length} link(s) need review. Network/transient blocks should be manually verified before editing source data.`);
  process.exitCode = 1;
} else {
  const allowlistSummary = allowlisted.length ? `, including ${allowlisted.length} allowlisted HTTP response(s)` : "";
  console.log(`\nAll ${results.length} checked links passed${allowlistSummary}.`);
  if (allowlisted.length) {
    console.log("Allowlisted responses are manually browser-reviewed and documented; they do not count as current P2 link-health issues.");
  }
}
