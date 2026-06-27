#!/usr/bin/env python3
"""Attach local URL probe results to Hermes case candidate files."""

from __future__ import annotations

import argparse
import json
import os
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path


URL_PROBE_TIMEOUT_SECONDS = float(os.environ.get("MODEL_ATLAS_LOCAL_URL_PROBE_TIMEOUT_SECONDS", "10"))
URL_PROBE_WORKERS = int(os.environ.get("MODEL_ATLAS_LOCAL_URL_PROBE_WORKERS", "16"))


def is_http_url(value: str) -> bool:
    return value.startswith("https://") or value.startswith("http://")


def probe_url(value: str) -> tuple[bool, str]:
    if not is_http_url(value):
        return False, "not_http_url"
    headers = {
        "User-Agent": "Mozilla/5.0 ModelAtlasEvidenceBot/1.0",
        "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
    }
    last = "probe_failed"
    for method in ("HEAD", "GET"):
        request = urllib.request.Request(value, method=method, headers=headers)
        try:
            with urllib.request.urlopen(request, timeout=URL_PROBE_TIMEOUT_SECONDS) as response:
                status = response.getcode()
                if status == 404:
                    return False, "url_404"
                if 200 <= status < 500:
                    return True, f"http_{status}"
                return False, f"http_{status}"
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                return False, "url_404"
            if 400 <= exc.code < 500:
                return True, f"http_{exc.code}"
            last = f"http_{exc.code}"
        except Exception as exc:
            detail = str(exc).replace("\n", " ").strip()
            last = type(exc).__name__ if not detail else f"{type(exc).__name__}:{detail[:120]}"
    return False, last


def verify_file(path: Path, out_dir: Path) -> dict:
    payload = json.loads(path.read_text(encoding="utf-8"))
    candidates = payload.get("cases", payload if isinstance(payload, list) else [])
    checked_at = datetime.now(timezone.utc).isoformat()
    ok_pairs = 0
    total = 0
    jobs = []
    for item in candidates:
        if not isinstance(item, dict):
            continue
        total += 1
        probe_payload = item.get("local_url_probe")
        if not isinstance(probe_payload, dict):
            probe_payload = {}
        for key in ("original_evidence_url", "artifact_url"):
            url = str(item.get(key) or "").strip()
            jobs.append((item, probe_payload, key, url))
        item["local_url_probe"] = probe_payload

    workers = max(1, URL_PROBE_WORKERS)
    with ThreadPoolExecutor(max_workers=workers) as executor:
        future_map = {
            executor.submit(probe_url, url): (probe_payload, key)
            for _, probe_payload, key, url in jobs
        }
        for future in as_completed(future_map):
            probe_payload, key = future_map[future]
            ok, reason = future.result()
            probe_payload[key] = {"ok": ok, "reason": reason, "checked_at": checked_at}

    for item in candidates:
        if not isinstance(item, dict):
            continue
        probe_payload = item.get("local_url_probe") if isinstance(item.get("local_url_probe"), dict) else {}
        original_probe = probe_payload.get("original_evidence_url") if isinstance(probe_payload.get("original_evidence_url"), dict) else {}
        artifact_probe = probe_payload.get("artifact_url") if isinstance(probe_payload.get("artifact_url"), dict) else {}
        if original_probe.get("ok") and artifact_probe.get("ok"):
            ok_pairs += 1

    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / path.name
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return {"file": path.name, "cases": total, "locallyVerified": ok_pairs, "out": str(out_path)}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out-dir", required=True)
    parser.add_argument("files", nargs="+")
    args = parser.parse_args()
    out_dir = Path(args.out_dir)
    results = [verify_file(Path(file), out_dir) for file in args.files]
    print(json.dumps({"ok": True, "verifiedFiles": results}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
