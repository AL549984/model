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
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


SITE_DIR = Path(__file__).resolve().parents[1]
ENV_PATH = SITE_DIR / ".env"
FEISHU_BASE_URL = os.environ.get("FEISHU_BASE_URL", "https://open.feishu.cn")
LARK_CLI_USER_TOKEN = "__lark_cli_user__"
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
OFFICIAL_VENDOR_DOMAINS = {
    "anthropic": ["anthropic.com"],
    "openai": ["openai.com"],
    "google": ["google.com", "deepmind.google"],
    "qwen-alibaba": ["qwen.ai", "qwenlm.github.io", "alibabacloud.com"],
    "deepseek": ["deepseek.com"],
    "xai": ["x.ai"],
    "kimi": ["moonshot.cn", "kimi.com"],
    "meta": ["meta.com", "ai.meta.com"],
    "minimax": ["minimax.io"],
    "z-ai": ["z.ai", "zhipuai.cn"],
    "bytedance-seed": ["seed.bytedance.com"],
}
URL_PROBE_TIMEOUT_SECONDS = float(os.environ.get("MODEL_ATLAS_URL_PROBE_TIMEOUT_SECONDS", "5"))


def load_env() -> None:
    if not ENV_PATH.exists():
        return
    for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key, value.strip().strip("'\""))


def lark_cli_request_json(path: str, *, method: str = "GET", body: dict | None = None) -> dict:
    profile = os.environ.get("FEISHU_LARK_CLI_PROFILE", "model-card-legacy")
    command = ["lark-cli", "--profile", profile, "api", method]
    api_path = path
    if "?" in path:
        api_path, query = path.split("?", 1)
        params = {key: values[-1] for key, values in urllib.parse.parse_qs(query).items()}
        command.extend([api_path, "--as", "user", "--format", "json", "--params", json.dumps(params, ensure_ascii=False)])
    else:
        command.extend([api_path, "--as", "user", "--format", "json"])
    if body is not None:
        command.extend(["--data", json.dumps(body, ensure_ascii=False)])
    result = subprocess.run(command, text=True, capture_output=True, check=False)
    if result.returncode != 0:
        detail = result.stderr.strip() or result.stdout.strip()
        raise RuntimeError(f"lark-cli user API failed ({result.returncode}): {detail}")
    return json.loads(result.stdout)


def request_json(path: str, *, method: str = "GET", token: str | None = None, body: dict | None = None) -> dict:
    if token == LARK_CLI_USER_TOKEN:
        payload = lark_cli_request_json(path, method=method, body=body)
        if payload.get("code") != 0:
            raise RuntimeError(f"Feishu user API error: {payload}")
        return payload

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


def auth_token() -> str:
    if os.environ.get("FEISHU_IMPORT_AUTH_MODE") == "lark-cli-user":
        return LARK_CLI_USER_TOKEN
    return tenant_token()


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


def is_http_url(value: str) -> bool:
    return value.startswith("https://") or value.startswith("http://")


def url_host(value: str) -> str:
    try:
        return urllib.parse.urlparse(value).netloc.lower()
    except Exception:
        return ""


def is_official_vendor_host(vendor_id: str, value: str) -> bool:
    host = url_host(value)
    return any(host == domain or host.endswith("." + domain) for domain in OFFICIAL_VENDOR_DOMAINS.get(vendor_id, []))


def probe_url(value: str) -> tuple[bool, str]:
    if not is_http_url(value):
        return False, "not_http_url"
    headers = {
        "User-Agent": "Mozilla/5.0 ModelAtlasEvidenceBot/1.0",
        "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
    }
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
            last = type(exc).__name__
    return False, last


def validate_case(fields: dict) -> tuple[bool, str]:
    required = [
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
        "task_description",
        "output_result",
        "model_contribution",
    ]
    missing = [key for key in required if not fields.get(key)]
    if missing:
        return False, "missing_" + ",".join(missing)
    if fields.get("source_type") != "real_case":
        return False, "not_real_case"

    original_url = fields["original_evidence_url"]
    artifact_url = fields["artifact_url"]
    original_ok, original_reason = probe_url(original_url)
    if not original_ok:
        return False, f"bad_original_url:{original_reason}"
    artifact_ok, artifact_reason = probe_url(artifact_url)
    if not artifact_ok:
        return False, f"bad_artifact_url:{artifact_reason}"

    vendor_id = fields.get("vendor_id", "")
    user_text = fields.get("user_or_org", "").lower()
    vendor_text = fields.get("vendor", "").lower().replace(" / ", " ")
    official_original = is_official_vendor_host(vendor_id, original_url)
    official_artifact = is_official_vendor_host(vendor_id, artifact_url)
    same_url = original_url.rstrip("/") == artifact_url.rstrip("/")
    platform = fields.get("source_platform", "").lower()

    if same_url and official_original and "github" not in platform:
        return False, "same_official_url_for_evidence_and_artifact"
    if official_original and official_artifact and ("internal" in user_text or user_text in vendor_text or vendor_text in user_text):
        return False, "vendor_internal_or_self_case"
    if "internal team" in user_text or "内部" in user_text:
        return False, "internal_team_not_public_user"
    return True, "ok"


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
    token = auth_token()
    payload = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    candidates = payload.get("cases", payload if isinstance(payload, list) else [])
    raw_cases = [normalize_case(item) for item in candidates if isinstance(item, dict)]
    cases: list[dict] = []
    rejected: list[dict] = []
    for fields in raw_cases:
        ok, reason = validate_case(fields)
        if ok:
            cases.append(fields)
        else:
            rejected.append({"case_id": fields.get("case_id"), "reason": reason})

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
    if rejected:
        print(json.dumps({"rejected": rejected}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
