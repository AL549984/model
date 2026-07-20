#!/usr/bin/env python3
"""Snapshot, diff, and notify for the Model Atlas closed-loop pipeline."""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path
from typing import Any

SITE_DIR = Path(__file__).resolve().parents[1]
REPO_DIR = SITE_DIR.parent
DEFAULT_CHAT_ID = "oc_1bddba789b6529ef681e3e72dcee663b"


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        if key and key not in os.environ:
            os.environ[key] = value.strip().strip("'\"")


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def model_case_counts(cases: list[dict[str, Any]]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for item in cases:
        if item.get("evidenceGrade") == "A" and item.get("showcaseEligible") is True:
            model_id = str(item.get("modelId") or "")
            counts[model_id] = counts.get(model_id, 0) + 1
    return counts


def snapshot() -> dict[str, Any]:
    models = read_json(SITE_DIR / "src/data/models.json")
    cases = read_json(SITE_DIR / "src/data/cases.json")
    metrics = read_json(SITE_DIR / "src/data/metrics.json")
    counts = model_case_counts(cases)
    active = [m for m in models if m.get("publishability") not in {"Archive", "Hold"}]
    hold = [m for m in models if m.get("publishability") == "Hold"]
    missing_a = [m for m in active if counts.get(m.get("id"), 0) == 0]
    below_target = [m for m in active if counts.get(m.get("id"), 0) < int(metrics.get("targetCasesPerModel") or 5)]
    return {
        "models": len(models),
        "cases": len(cases),
        "aCases": sum(counts.values()),
        "modelIds": sorted(str(m.get("id")) for m in models),
        "modelNamesById": {str(m.get("id")): str(m.get("name")) for m in models},
        "holdModels": [{"id": m.get("id"), "name": m.get("name"), "aCaseCount": counts.get(m.get("id"), 0)} for m in hold],
        "missingACaseModels": [{"id": m.get("id"), "name": m.get("name"), "aCaseCount": counts.get(m.get("id"), 0)} for m in missing_a],
        "belowTargetModels": [{"id": m.get("id"), "name": m.get("name"), "aCaseCount": counts.get(m.get("id"), 0)} for m in below_target],
        "metrics": metrics,
    }


def diff(before: dict[str, Any], after: dict[str, Any]) -> dict[str, Any]:
    before_ids = set(before.get("modelIds", []))
    after_ids = set(after.get("modelIds", []))
    new_ids = sorted(after_ids - before_ids)
    names = after.get("modelNamesById", {})
    return {
        "newModels": [{"id": mid, "name": names.get(mid, mid)} for mid in new_ids],
        "newModelCount": len(new_ids),
        "newACaseCount": max(0, int(after.get("aCases", 0)) - int(before.get("aCases", 0))),
        "modelDelta": int(after.get("models", 0)) - int(before.get("models", 0)),
        "caseDelta": int(after.get("cases", 0)) - int(before.get("cases", 0)),
    }


def github_token() -> str:
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        return token
    token_path = Path(os.environ.get("MODEL_ATLAS_GITHUB_TOKEN_PATH", "/home/ubuntu/.hermes/secrets/github_model_atlas_repo_token"))
    return token_path.read_text(encoding="utf-8").strip() if token_path.exists() else ""


def vercel_status(commit: str) -> dict[str, str]:
    if not commit:
        return {"state": "unknown", "description": "no commit", "target_url": ""}
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "Hermes-Model-Atlas"}
    token = github_token()
    if token:
        headers["Authorization"] = "Bearer " + token
    url = f"https://api.github.com/repos/AL549984/model/commits/{commit}/statuses"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=20) as response:
            statuses = json.loads(response.read().decode("utf-8"))
        for item in statuses:
            if str(item.get("context", "")).lower() == "vercel":
                return {
                    "state": str(item.get("state") or "unknown"),
                    "description": str(item.get("description") or ""),
                    "target_url": str(item.get("target_url") or ""),
                }
        return {"state": "missing", "description": "no Vercel commit status", "target_url": ""}
    except Exception as exc:
        return {"state": "unknown", "description": f"{type(exc).__name__}: {exc}", "target_url": ""}


def fmt_models(items: list[dict[str, Any]], limit: int = 12) -> str:
    if not items:
        return "无"
    shown = [f"{item.get('name') or item.get('id')} ({item.get('id')})" for item in items[:limit]]
    if len(items) > limit:
        shown.append(f"...另 {len(items) - limit} 个")
    return "、".join(shown)


def send_feishu(text: str) -> dict[str, Any]:
    if os.environ.get("MODEL_ATLAS_NOTIFY", "1") == "0":
        return {"ok": True, "skipped": "MODEL_ATLAS_NOTIFY=0"}
    chat_id = os.environ.get("MODEL_ATLAS_NOTIFY_CHAT_ID") or DEFAULT_CHAT_ID
    user_id = os.environ.get("MODEL_ATLAS_NOTIFY_USER_ID", "").strip()
    profile = os.environ.get("FEISHU_NOTIFY_PROFILE") or os.environ.get("FEISHU_LARK_CLI_PROFILE") or "model-card-legacy"
    recipient = ["--user-id", user_id] if user_id else ["--chat-id", chat_id]
    cmd = [
        "lark-cli", "--profile", profile, "im", "+messages-send", "--as", "bot",
        *recipient, "--text", text,
        "--idempotency-key", f"model-atlas-closed-loop-{os.environ.get('MODEL_ATLAS_RUN_ID', '')}"[:120],
        "--format", "json",
    ]
    result = subprocess.run(cmd, text=True, capture_output=True, check=False)
    if result.returncode != 0:
        return {"ok": False, "error": result.stderr.strip() or result.stdout.strip()}
    try:
        return json.loads(result.stdout)
    except Exception:
        return {"ok": True, "stdout": result.stdout.strip()}


def notify(before_path: Path, after_path: Path, commit: str, push_result: str, log_path: str) -> dict[str, Any]:
    before = read_json(before_path)
    after = read_json(after_path)
    delta = diff(before, after)
    vercel = vercel_status(commit)
    text = (
        "Model Atlas 自动化闭环完成\n"
        f"新增模型数量：{delta['newModelCount']}\n"
        f"新增模型：{fmt_models(delta['newModels'])}\n"
        f"新增 A 类案例数量：{delta['newACaseCount']}\n"
        f"Hold 模型列表：{fmt_models(after.get('holdModels', []))}\n"
        f"缺 A 类案例的模型：{fmt_models(after.get('missingACaseModels', []))}\n"
        f"GitHub commit：{commit[:7] if commit else '无'}（{push_result}）\n"
        f"Vercel 部署状态：{vercel['state']} - {vercel['description']}\n"
        f"日志：{log_path}"
    )
    send_result = send_feishu(text)
    return {"ok": bool(send_result.get("ok", True)), "delta": delta, "vercel": vercel, "notification": send_result, "text": text}


def main() -> int:
    load_env_file(Path.home() / ".hermes/.env")
    load_env_file(SITE_DIR / ".env")
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="cmd", required=True)
    snap = sub.add_parser("snapshot")
    snap.add_argument("--output")
    diff_cmd = sub.add_parser("diff")
    diff_cmd.add_argument("--before", required=True)
    diff_cmd.add_argument("--after", required=True)
    diff_cmd.add_argument("--field")
    note = sub.add_parser("notify")
    note.add_argument("--before", required=True)
    note.add_argument("--after", required=True)
    note.add_argument("--commit", default="")
    note.add_argument("--push-result", default="unknown")
    note.add_argument("--log-path", default="")
    args = parser.parse_args()

    if args.cmd == "snapshot":
        payload = snapshot()
        text = json.dumps(payload, ensure_ascii=False, indent=2)
        if args.output:
            Path(args.output).write_text(text + "\n", encoding="utf-8")
        else:
            print(text)
        return 0
    if args.cmd == "diff":
        payload = diff(read_json(Path(args.before)), read_json(Path(args.after)))
        if args.field:
            print(payload.get(args.field, ""))
        else:
            print(json.dumps(payload, ensure_ascii=False, indent=2))
        return 0
    if args.cmd == "notify":
        payload = notify(Path(args.before), Path(args.after), args.commit, args.push_result, args.log_path)
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return 0
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
