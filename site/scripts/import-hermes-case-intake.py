#!/usr/bin/env python3
"""Import Hermes case candidates into the Model Atlas Feishu Base.

Input JSON shape:
  {"cases": [{"case_id": "...", "case_title": "...", ...}]}

The crawler/agent should write candidate JSON only; this script owns Feishu
credentials, de-duplication, and create/update behavior.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path


SITE_DIR = Path(__file__).resolve().parents[1]
ENV_PATH = SITE_DIR / ".env"
FEISHU_BASE_URL = os.environ.get("FEISHU_BASE_URL", "https://open.feishu.cn")
CASE_FIELDS = [
    "case_id",
    "case_title",
    "model_id",
    "model_name",
    "vendor_id",
    "vendor",
    "user_or_org",
    "original_evidence_url",
    "artifact_url",
    "source_platform",
    "source_type",
    "task_category",
    "task_description",
    "output_result",
    "model_contribution",
    "risk_notes",
    "collected_at",
    "evidence_grade",
    "showcase_eligible",
    "selected_for_model_card",
    "review_status",
]


def load_env() -> None:
    if not ENV_PATH.exists():
        return
    for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key, value.strip().strip("'\""))


def request_json(path: str, *, method: str = "GET", token: str | None = None, body: dict | None = None) -> dict:
    data = None if body is None else json.dumps(body).encode("utf-8")
    request = urllib.request.Request(
        f"{FEISHU_BASE_URL}{path}",
        data=data,
        method=method,
        headers={
            "Content-Type": "application/json; charset=utf-8",
            **({"Authorization": f"Bearer {token}"} if token else {}),
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Feishu HTTP {exc.code}: {detail}") from exc
    if payload.get("code") != 0:
        raise RuntimeError(f"Feishu API error: {payload}")
    return payload


def tenant_token() -> str:
    app_id = os.environ["FEISHU_APP_ID"]
    app_secret = os.environ["FEISHU_APP_SECRET"]
    payload = request_json(
        "/open-apis/auth/v3/tenant_access_token/internal",
        method="POST",
        body={"app_id": app_id, "app_secret": app_secret},
    )
    return payload["tenant_access_token"]


def list_records(token: str, app_token: str, table_id: str) -> list[dict]:
    records: list[dict] = []
    page_token = ""
    while True:
        suffix = f"page_size=500{f'&page_token={page_token}' if page_token else ''}"
        payload = request_json(
            f"/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records?{suffix}",
            token=token,
        )
        records.extend(payload.get("data", {}).get("items", []))
        page_token = payload.get("data", {}).get("page_token") or ""
        if not page_token:
            return records


def normalize_case(raw: dict) -> dict:
    fields: dict[str, str] = {}
    for key in CASE_FIELDS:
        value = raw.get(key)
        if value is None:
            value = raw.get(key.replace("_", ""))
        if isinstance(value, bool):
            value = "true" if value else "false"
        elif isinstance(value, (list, dict)):
            value = json.dumps(value, ensure_ascii=False)
        else:
            value = "" if value is None else str(value).strip()
        fields[key] = value
    if not fields["case_id"]:
        seed = "-".join([fields["model_id"], fields["case_title"], fields["original_evidence_url"]])
        fields["case_id"] = "".join(ch.lower() if ch.isalnum() else "-" for ch in seed).strip("-")[:120]
    return fields


def dedupe_key(fields: dict) -> tuple[str, ...]:
    return tuple(
        value
        for value in (fields.get("case_id"), fields.get("original_evidence_url"), fields.get("artifact_url"))
        if value
    )


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: import-hermes-case-intake.py /path/to/cases.json", file=sys.stderr)
        return 2
    load_env()
    app_token = os.environ["FEISHU_BITABLE_APP_TOKEN"]
    table_id = os.environ["FEISHU_CASES_TABLE_ID"]
    token = tenant_token()
    payload = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    candidates = payload.get("cases", payload if isinstance(payload, list) else [])
    cases = [normalize_case(item) for item in candidates if isinstance(item, dict)]

    existing: dict[str, str] = {}
    for record in list_records(token, app_token, table_id):
        record_id = record.get("record_id")
        fields = record.get("fields", {})
        for key in dedupe_key(fields):
            existing[key] = record_id

    created = 0
    updated = 0
    skipped = 0
    for fields in cases:
        if not fields["model_id"] or not fields["case_title"]:
            skipped += 1
            continue
        record_id = next((existing.get(key) for key in dedupe_key(fields) if existing.get(key)), None)
        body = {"fields": fields}
        if record_id:
            request_json(
                f"/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records/{record_id}",
                method="PUT",
                token=token,
                body=body,
            )
            updated += 1
        else:
            created_payload = request_json(
                f"/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records",
                method="POST",
                token=token,
                body=body,
            )
            created += 1
            new_id = created_payload.get("data", {}).get("record", {}).get("record_id")
            for key in dedupe_key(fields):
                existing[key] = new_id

    print(json.dumps({"ok": True, "created": created, "updated": updated, "skipped": skipped}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
