#!/usr/bin/env python3
"""Validate and upsert one Model Atlas model row into Feishu Bitable."""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import urllib.parse
from pathlib import Path
from typing import Any

SITE_DIR = Path(__file__).resolve().parents[1]
DEFAULT_BASE_TOKEN = "VsGMbIuWSaj2mJsRqlNcGoi1nBe"
DEFAULT_MODEL_TABLE_ID = "tblRHnlpt5QMBY82"
TABLE_FIELDS = {
    "id", "name", "slug", "model_id", "vendor_id", "vendor", "publishability",
    "headline", "summary", "release_date", "modality", "reasoning", "context",
    "output", "price", "platforms", "official_link", "sources", "fit", "avoid",
    "risk_notes", "notes", "score",
}
REQUIRED_INPUT = ["id", "slug", "name", "vendor", "vendor_id", "sources"]
REQUIRED_TABLE = ["id", "name", "slug", "model_id", "vendor_id", "vendor", "publishability", "sources"]


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        if key and key not in os.environ:
            os.environ[key] = value.strip().strip("'\"")


def normalize_scalar(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    return str(value).strip()


def normalize_list(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        parts = [part.strip() for part in value.replace("，", ";").replace("\n", ";").split(";")]
    elif isinstance(value, list):
        parts = [normalize_scalar(item) for item in value]
    else:
        parts = [normalize_scalar(value)]
    return "; ".join(dict.fromkeys(part for part in parts if part))


def load_payload(path: str) -> dict[str, Any]:
    text = sys.stdin.read() if path == "-" else Path(path).read_text(encoding="utf-8")
    payload = json.loads(text)
    if not isinstance(payload, dict):
        raise SystemExit("model payload must be a JSON object")
    return payload


def normalize_payload(raw: dict[str, Any]) -> dict[str, str]:
    aliases = {
        "modelId": "model_id", "modelID": "model_id", "api_model_id": "model_id",
        "vendorId": "vendor_id", "releaseDate": "release_date", "officialLink": "official_link",
        "status": "publishability", "source_links": "sources", "sourceLinks": "sources",
    }
    merged: dict[str, Any] = {}
    for key, value in raw.items():
        merged[aliases.get(key, key)] = value
    if not merged.get("slug") and merged.get("id"):
        merged["slug"] = merged["id"]
    if not merged.get("model_id") and merged.get("id"):
        merged["model_id"] = merged["id"]
    if not merged.get("publishability"):
        merged["publishability"] = "Hold"
    if str(merged.get("publishability", "")).lower() in {"status", "new", "draft"}:
        merged["publishability"] = "Hold"
    if not merged.get("official_link"):
        sources = merged.get("sources") or []
        if isinstance(sources, str):
            first = next((part.strip() for part in sources.replace("，", ";").split(";") if part.strip()), "")
        elif isinstance(sources, list):
            first = next((normalize_scalar(item) for item in sources if normalize_scalar(item)), "")
        else:
            first = ""
        merged["official_link"] = first
    if not merged.get("headline") and merged.get("name"):
        merged["headline"] = f"{merged['name']} 的 Model Atlas 模型卡。"
    if not merged.get("summary") and merged.get("name"):
        merged["summary"] = f"{merged['name']} 已由 Hermes 同步到飞书模型主表；官方未披露字段保持待核验。"
    if not merged.get("notes"):
        merged["notes"] = "Hermes 自动 upsert；Wiki 模型卡与官方来源见 sources。"

    list_fields = {"sources", "platforms", "fit", "avoid", "risk_notes"}
    normalized: dict[str, str] = {}
    for field in TABLE_FIELDS:
        if field in list_fields:
            normalized[field] = normalize_list(merged.get(field))
        else:
            normalized[field] = normalize_scalar(merged.get(field))
    missing_input = [field for field in REQUIRED_INPUT if not normalize_scalar(merged.get(field))]
    missing_table = [field for field in REQUIRED_TABLE if not normalized.get(field)]
    if missing_input or missing_table:
        raise SystemExit(json.dumps({"ok": False, "error": "missing_required_fields", "missing_input": missing_input, "missing_table": missing_table}, ensure_ascii=False))
    return {key: value for key, value in normalized.items() if value != ""}


def lark_cli_request(path: str, *, method: str = "GET", body: dict[str, Any] | None = None) -> dict[str, Any]:
    profile = os.environ.get("FEISHU_LARK_CLI_PROFILE", "model-card-legacy")
    api_path, _, query = path.partition("?")
    cmd = ["lark-cli", "--profile", profile, "api", method, api_path, "--as", "user", "--format", "json"]
    if query:
        params = {key: values[-1] for key, values in urllib.parse.parse_qs(query).items()}
        cmd.extend(["--params", json.dumps(params, ensure_ascii=False)])
    if body is not None:
        cmd.extend(["--data", json.dumps(body, ensure_ascii=False)])
    result = subprocess.run(cmd, text=True, capture_output=True, check=False)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    payload = json.loads(result.stdout)
    if payload.get("code") not in (0, None) or payload.get("ok") is False:
        raise RuntimeError(json.dumps(payload, ensure_ascii=False))
    return payload


def list_records(app_token: str, table_id: str) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    page_token = ""
    while True:
        params = urllib.parse.urlencode({"page_size": "500", **({"page_token": page_token} if page_token else {})})
        payload = lark_cli_request(f"/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records?{params}")
        data = payload.get("data", {})
        records.extend(data.get("items", []))
        page_token = data.get("page_token") or ""
        if not page_token:
            return records


def norm(value: Any) -> str:
    if isinstance(value, list):
        return "; ".join(norm(item) for item in value if norm(item))
    if isinstance(value, dict):
        for key in ("text", "name", "value", "link", "url"):
            if key in value:
                return norm(value[key])
    return normalize_scalar(value).lower()


def find_existing(records: list[dict[str, Any]], fields: dict[str, str]) -> str:
    needles = {norm(fields.get(key)) for key in ("id", "slug", "model_id") if fields.get(key)}
    for record in records:
        record_fields = record.get("fields", {})
        values = {norm(record_fields.get(key)) for key in ("id", "slug", "model_id") if record_fields.get(key) is not None}
        if needles & values:
            return record.get("record_id", "")
    return ""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("json_path", help="model row JSON path, or - for stdin")
    parser.add_argument("--base-token", default=os.environ.get("FEISHU_BITABLE_APP_TOKEN", DEFAULT_BASE_TOKEN))
    parser.add_argument("--table-id", default=os.environ.get("FEISHU_MODELS_TABLE_ID", DEFAULT_MODEL_TABLE_ID))
    args = parser.parse_args()

    load_env_file(Path.home() / ".hermes/.env")
    load_env_file(SITE_DIR / ".env")
    fields = normalize_payload(load_payload(args.json_path))
    records = list_records(args.base_token, args.table_id)
    record_id = find_existing(records, fields)
    body = {"fields": fields}
    if record_id:
        lark_cli_request(f"/open-apis/bitable/v1/apps/{args.base_token}/tables/{args.table_id}/records/{record_id}", method="PUT", body=body)
        action = "updated"
    else:
        payload = lark_cli_request(f"/open-apis/bitable/v1/apps/{args.base_token}/tables/{args.table_id}/records", method="POST", body=body)
        record_id = payload.get("data", {}).get("record", {}).get("record_id", "")
        action = "created"
    print(json.dumps({"ok": True, "action": action, "record_id": record_id, "id": fields.get("id"), "slug": fields.get("slug"), "publishability": fields.get("publishability")}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
