import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(siteRoot, "..");
const archiveRoot = path.join(repoRoot, "archive/evidence");
const args = new Map();

for (let index = 2; index < process.argv.length; index += 1) {
  const arg = process.argv[index];
  if (!arg.startsWith("--")) continue;
  const [key, inlineValue] = arg.slice(2).split("=");
  const nextValue = process.argv[index + 1]?.startsWith("--") ? undefined : process.argv[index + 1];
  args.set(key, inlineValue ?? nextValue ?? "true");
  if (inlineValue === undefined && nextValue !== undefined) index += 1;
}

const limit = Number(args.get("limit") ?? 5);
const hostFilter = String(args.get("host") ?? "").trim();
const caseFilter = String(args.get("case") ?? "").trim();
const dryRun = args.get("dry-run") === "true";
const timeoutMs = Number(args.get("timeout") ?? 15000);

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(siteRoot, relativePath), "utf8"));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function textFromBuffer(buffer, contentType) {
  if (!/text|json|xml|html|javascript/i.test(contentType || "")) return "";
  return Buffer.from(buffer).toString("utf8", 0, Math.min(buffer.byteLength, 512 * 1024));
}

function pageTitle(text) {
  const match = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return String(match?.[1] ?? "").replace(/\s+/g, " ").trim().slice(0, 240);
}

function githubRepoFromUrl(value) {
  try {
    const url = new URL(value);
    if (url.hostname.replace(/^www\./, "") !== "github.com") return null;
    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

function npmPackageFromUrl(value) {
  try {
    const url = new URL(value);
    if (url.hostname.replace(/^www\./, "") !== "npmjs.com") return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0] !== "package" || !parts[1]) return null;
    if (parts[1].startsWith("@") && parts[2]) return `${parts[1]}/${parts[2]}`;
    return parts[1];
  } catch {
    return null;
  }
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ModelAtlasEvidenceSnapshot/0.1",
      "Accept": "application/vnd.github+json, application/json"
    }
  });
  if (!response.ok) return null;
  return response.json();
}

async function githubMetadata(targetUrl) {
  const repo = githubRepoFromUrl(targetUrl);
  if (!repo) return null;
  const repoPayload = await fetchJson(`https://api.github.com/repos/${repo.owner}/${repo.repo}`);
  if (!repoPayload) return { owner: repo.owner, repo: repo.repo, apiStatus: "unavailable" };
  const defaultBranch = repoPayload.default_branch;
  const commitPayload = defaultBranch
    ? await fetchJson(`https://api.github.com/repos/${repo.owner}/${repo.repo}/commits/${defaultBranch}`)
    : null;
  return {
    owner: repo.owner,
    repo: repo.repo,
    htmlUrl: repoPayload.html_url,
    defaultBranch,
    defaultBranchSha: commitPayload?.sha ?? null,
    pushedAt: repoPayload.pushed_at,
    updatedAt: repoPayload.updated_at,
    archived: repoPayload.archived,
    disabled: repoPayload.disabled,
    visibility: repoPayload.visibility
  };
}

async function npmRegistryFallback(targetUrl, capturedAt, primaryResponse, primaryBuffer, primaryTitle) {
  const packageName = npmPackageFromUrl(targetUrl);
  if (!packageName || primaryResponse.ok) return null;
  const registryUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName).replace("%2F", "/")}`;
  const response = await fetch(registryUrl, {
    headers: {
      "User-Agent": "ModelAtlasEvidenceSnapshot/0.1",
      "Accept": "application/json"
    }
  });
  if (!response.ok) return null;
  const buffer = Buffer.from(await response.arrayBuffer());
  const payload = JSON.parse(buffer.toString("utf8"));
  return {
    schemaVersion: 1,
    capturedAt,
    kind: "npm-registry-fallback",
    url: targetUrl,
    finalUrl: registryUrl,
    ok: true,
    httpStatus: response.status,
    primaryHttpStatus: primaryResponse.status,
    primaryTitle,
    contentType: response.headers.get("content-type") ?? "",
    contentLength: response.headers.get("content-length"),
    etag: response.headers.get("etag"),
    lastModified: response.headers.get("last-modified"),
    bodyBytes: buffer.byteLength,
    bodySha256: sha256(buffer),
    title: payload.name ?? packageName,
    npm: {
      packageName,
      latest: payload["dist-tags"]?.latest ?? null,
      modified: payload.time?.modified ?? null,
      created: payload.time?.created ?? null,
      versions: payload.versions ? Object.keys(payload.versions).length : null,
      primaryBodySha256: sha256(primaryBuffer)
    }
  };
}

async function fetchTarget(target) {
  const capturedAt = new Date().toISOString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(target.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "ModelAtlasEvidenceSnapshot/0.1",
        "Accept": "text/html,application/json,application/xml;q=0.9,*/*;q=0.8"
      }
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") ?? "";
    const text = textFromBuffer(buffer, contentType);
    const title = pageTitle(text);
    const fallback = await npmRegistryFallback(target.url, capturedAt, response, buffer, title);
    if (fallback) return fallback;
    const github = await githubMetadata(target.url);

    return {
      schemaVersion: 1,
      capturedAt,
      kind: target.kind,
      url: target.url,
      finalUrl: response.url,
      ok: response.ok,
      httpStatus: response.status,
      contentType,
      contentLength: response.headers.get("content-length"),
      etag: response.headers.get("etag"),
      lastModified: response.headers.get("last-modified"),
      bodyBytes: buffer.byteLength,
      bodySha256: sha256(buffer),
      title,
      github
    };
  } catch (error) {
    return {
      schemaVersion: 1,
      capturedAt,
      kind: target.kind,
      url: target.url,
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clearTimeout(timer);
  }
}

function selectCases(evidenceArchive) {
  return evidenceArchive.cases
    .filter((item) => !caseFilter || item.caseId === caseFilter)
    .filter((item) => !hostFilter || item.targets.some((target) => target.host === hostFilter))
    .filter((item) => item.snapshotStatus !== "snapshotted")
    .sort((a, b) => {
      const priority = { high: 0, medium: 1, normal: 2 };
      return (priority[a.priority] ?? 2) - (priority[b.priority] ?? 2) || a.caseId.localeCompare(b.caseId);
    })
    .slice(0, limit);
}

async function snapshotCase(entry) {
  const caseDir = path.join(archiveRoot, entry.caseId);
  await mkdir(caseDir, { recursive: true });
  const targetRecords = [];

  for (const target of entry.targets) {
    const snapshot = await fetchTarget(target);
    const relativePath = target.recommendedSnapshotPath;
    await writeFile(path.join(repoRoot, relativePath), `${JSON.stringify(snapshot, null, 2)}\n`);
    targetRecords.push({
      kind: target.kind,
      url: target.url,
      snapshotPath: relativePath,
      ok: snapshot.ok,
      httpStatus: snapshot.httpStatus ?? null,
      title: snapshot.title ?? "",
      bodySha256: snapshot.bodySha256 ?? "",
      capturedAt: snapshot.capturedAt,
      error: snapshot.error ?? ""
    });
  }

  const manifest = {
    schemaVersion: 1,
    caseId: entry.caseId,
    modelId: entry.modelId,
    modelName: entry.modelName,
    title: entry.title,
    evidenceFingerprint: entry.evidenceFingerprint,
    capturedAt: new Date().toISOString(),
    targets: targetRecords
  };
  await writeFile(path.join(caseDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  const okCount = targetRecords.filter((target) => target.ok).length;
  return { caseId: entry.caseId, okCount, targetCount: targetRecords.length };
}

const evidenceArchive = await readJson("src/data/evidence-archive.json");
const selected = selectCases(evidenceArchive);

if (!selected.length) {
  console.log("no evidence cases selected for snapshot");
  process.exit(0);
}

console.log(`selected ${selected.length} evidence cases for snapshot${hostFilter ? ` (host ${hostFilter})` : ""}`);

if (dryRun) {
  for (const entry of selected) {
    console.log(`dry-run ${entry.caseId}: ${entry.targets.length} targets`);
  }
  process.exit(0);
}

const results = [];
for (const entry of selected) {
  const result = await snapshotCase(entry);
  results.push(result);
  console.log(`snapshotted ${result.caseId}: ${result.okCount}/${result.targetCount} targets ok`);
}

const totalOk = results.reduce((sum, item) => sum + item.okCount, 0);
const totalTargets = results.reduce((sum, item) => sum + item.targetCount, 0);
console.log(`snapshot batch complete: ${results.length} cases / ${totalOk}/${totalTargets} targets ok`);
