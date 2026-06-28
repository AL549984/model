#!/usr/bin/env python3
"""Commit and push generated Model Atlas files to the GitHub/Vercel repo.

This follows the Tencent Research push pattern, but keeps the target paths
Atlas-specific. It is safe to run in no-op mode: no changes means no commit;
missing token means a clear skipped result.
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import sys
import time
from pathlib import Path


DEFAULT_BRANCH = "main"
DEFAULT_TOKEN_PATH = Path("/home/ubuntu/.hermes/secrets/github_model_atlas_repo_token")
DEFAULT_ADD_PATHS = (
    "site/src/data",
    "site/package.json",
    "site/package-lock.json",
    "work/evidence-backfill-intake.tsv",
    "work/hermes-model-case-tasks.json",
    "outputs/evidence-backfill-full-plan.md",
    "outputs/hermes-feishu-automation.md",
)


def run(cmd: list[str], cwd: Path, timeout: int = 120) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, cwd=cwd, text=True, capture_output=True, timeout=timeout, check=True)


def is_transient_git_error(exc: subprocess.CalledProcessError) -> bool:
    combined = ((exc.stdout or "") + "\n" + (exc.stderr or "")).lower()
    needles = (
        "gnutls recv error",
        "tls connection was non-properly terminated",
        "connection reset",
        "connection timed out",
        "could not resolve host",
        "failed to connect",
        "early eof",
        "the remote end hung up unexpectedly",
        "http/2 stream",
        "curl 56",
        "curl 28",
    )
    return any(needle in combined for needle in needles)


def run_git_with_retry(cmd: list[str], cwd: Path, timeout: int = 120, attempts: int = 4) -> subprocess.CompletedProcess[str]:
    last_exc: Exception | None = None
    for attempt in range(1, attempts + 1):
        try:
            return run(cmd, cwd=cwd, timeout=timeout)
        except subprocess.TimeoutExpired as exc:
            last_exc = exc
            transient = True
        except subprocess.CalledProcessError as exc:
            last_exc = exc
            transient = is_transient_git_error(exc)
        if attempt >= attempts or not transient:
            raise last_exc
        sleep_s = min(60, 5 * attempt * attempt)
        print(f"[git-retry] attempt {attempt}/{attempts} failed; retrying in {sleep_s}s", file=sys.stderr, flush=True)
        time.sleep(sleep_s)
    assert last_exc is not None
    raise last_exc


def load_token(token_path: Path) -> str:
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if not token and token_path.exists():
        token = token_path.read_text(encoding="utf-8").strip()
    return token or ""


def git_status(repo_dir: Path) -> str:
    return run(["git", "status", "--short"], cwd=repo_dir).stdout.strip()


def push(repo_dir: Path, branch: str, token: str) -> None:
    basic = base64.b64encode(f"x-access-token:{token}".encode("utf-8")).decode("ascii")
    header = f"Authorization: Basic {basic}"
    run_git_with_retry(
        ["git", "-c", f"http.https://github.com/.extraheader={header}", "push", "origin", f"HEAD:{branch}"],
        cwd=repo_dir,
        timeout=int(os.environ.get("MODEL_ATLAS_GIT_PUSH_TIMEOUT", "45")),
        attempts=int(os.environ.get("MODEL_ATLAS_GIT_PUSH_ATTEMPTS", "2")),
    )


def sync_with_remote(repo_dir: Path, branch: str) -> None:
    run_git_with_retry(["git", "fetch", "origin", branch], cwd=repo_dir, timeout=120)
    run_git_with_retry(["git", "rebase", "--autostash", f"origin/{branch}"], cwd=repo_dir, timeout=120)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-dir", type=Path, default=Path(os.environ.get("MODEL_ATLAS_REPO_DIR", Path.cwd())))
    parser.add_argument("--branch", default=os.environ.get("GITHUB_BRANCH", DEFAULT_BRANCH))
    parser.add_argument("--token-path", type=Path, default=Path(os.environ.get("MODEL_ATLAS_GITHUB_TOKEN_PATH", DEFAULT_TOKEN_PATH)))
    parser.add_argument("--message", default=os.environ.get("GITHUB_COMMIT_MESSAGE", "chore: update Model Atlas data"))
    parser.add_argument("--add-path", action="append", default=None)
    args = parser.parse_args()

    repo_dir = args.repo_dir.resolve()
    if not (repo_dir / ".git").exists():
        print(json.dumps({"ok": True, "changed": False, "skipped": f"not a git repo: {repo_dir}"}, ensure_ascii=False))
        return 0

    token = load_token(args.token_path)
    if not token:
        print(json.dumps({"ok": True, "changed": False, "skipped": "missing GitHub token"}, ensure_ascii=False))
        return 0

    add_paths = args.add_path or list(DEFAULT_ADD_PATHS)
    existing_paths = [path for path in add_paths if (repo_dir / path).exists()]
    if not existing_paths:
        print(json.dumps({"ok": True, "changed": False, "skipped": "no configured paths exist"}, ensure_ascii=False))
        return 0

    run(["git", "config", "user.name", "Hermes Model Atlas Sync"], cwd=repo_dir)
    run(["git", "config", "user.email", "hermes-model-atlas@users.noreply.github.com"], cwd=repo_dir)
    sync_with_remote(repo_dir, args.branch)
    run(["git", "add", *existing_paths], cwd=repo_dir)

    status = git_status(repo_dir)
    if not status:
        print(json.dumps({"ok": True, "changed": False, "additions": 0}, ensure_ascii=False))
        return 0

    run(["git", "commit", "-m", args.message], cwd=repo_dir, timeout=120)
    push(repo_dir, args.branch, token)

    print(json.dumps({
        "ok": True,
        "changed": True,
        "branch": args.branch,
        "paths": existing_paths,
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except subprocess.CalledProcessError as exc:
        print(json.dumps({
            "ok": False,
            "stage": "command",
            "returncode": exc.returncode,
            "stdout_tail": (exc.stdout or "")[-2000:],
            "stderr_tail": (exc.stderr or "")[-2000:],
        }, ensure_ascii=False, indent=2), file=sys.stderr)
        raise SystemExit(exc.returncode or 1)
    except Exception as exc:
        print(json.dumps({"ok": False, "error": f"{type(exc).__name__}: {exc}"}, ensure_ascii=False), file=sys.stderr)
        raise SystemExit(1)
