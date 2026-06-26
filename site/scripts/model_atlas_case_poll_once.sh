#!/usr/bin/env bash
set -euo pipefail

# Near-real-time case polling entrypoint. This mirrors the Tencent Research
# watcher shape, but keeps the actual platform crawlers behind a single Hermes
# command so the static site never owns platform sessions.

export HOME="${HOME:-/home/ubuntu}"
export LARK_CLI_HOME="${LARK_CLI_HOME:-/home/ubuntu/.lark-cli}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="${MODEL_ATLAS_SITE_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"
REPO_DIR="${MODEL_ATLAS_REPO_DIR:-$(cd "$SITE_DIR/.." && pwd)}"
PROFILE="${MODEL_ATLAS_PROFILE:-/home/ubuntu/.hermes}"
LOG_DIR="${MODEL_ATLAS_LOG_DIR:-$PROFILE/data/model_atlas_logs}"
LOCK_PATH="${MODEL_ATLAS_POLL_LOCK_PATH:-$PROFILE/data/model_atlas_locks/case_poll.lock}"
PIPELINE_LOCK_PATH="${MODEL_ATLAS_LOCK_PATH:-$PROFILE/data/model_atlas_locks/auto_pipeline.lock}"

load_env_file() {
  local file="$1"
  if [[ -f "$file" ]]; then
    set -a
    # shellcheck disable=SC1090
    source "$file"
    set +a
  fi
}

load_env_file "$PROFILE/.env"
load_env_file "$SITE_DIR/.env"

mkdir -p "$LOG_DIR" "$(dirname "$LOCK_PATH")" "$(dirname "$PIPELINE_LOCK_PATH")"

exec 8>"$LOCK_PATH"
if ! flock -n 8; then
  echo "{\"ok\":true,\"skipped\":\"case poll already running\"}"
  exit 0
fi

exec 9>"$PIPELINE_LOCK_PATH"
lock_wait="${MODEL_ATLAS_LOCK_WAIT_SECONDS:-0}"
if ! flock -w "$lock_wait" 9; then
  echo "{\"ok\":true,\"skipped\":\"auto pipeline lock busy\"}"
  exit 0
fi

ts="$(date '+%Y-%m-%d_%H-%M-%S')"
out="$LOG_DIR/${ts}_case_poll.log"

run_step() {
  local name="$1"
  shift
  echo "[$(date --iso-8601=seconds)] >>> $name"
  "$@"
  echo "[$(date --iso-8601=seconds)] <<< $name"
}

{
  echo "[$(date --iso-8601=seconds)] Model Atlas case poll started"
  cd "$SITE_DIR"

  run_step "export Hermes case tasks" npm run hermes:tasks

  if [[ -n "${MODEL_ATLAS_CASE_CRAWL_CMD:-}" ]]; then
    echo "Running MODEL_ATLAS_CASE_CRAWL_CMD"
    bash -lc "$MODEL_ATLAS_CASE_CRAWL_CMD"
  else
    echo "Skipping case crawl: MODEL_ATLAS_CASE_CRAWL_CMD is not set"
  fi

  run_step "sync Feishu" npm run sync:feishu
  run_step "generate evidence backfill" npm run evidence:backfill
  run_step "build site" npm run build

  if [[ "${MODEL_ATLAS_PUSH_TO_GITHUB:-1}" != "0" ]]; then
    run_step "push generated site data to GitHub" python3 "$SITE_DIR/scripts/push_model_atlas_site_to_github.py" --repo-dir "$REPO_DIR"
  else
    echo "Skipping GitHub push: MODEL_ATLAS_PUSH_TO_GITHUB=0"
  fi

  echo "[$(date --iso-8601=seconds)] Model Atlas case poll finished"
} >"$out" 2>&1 || {
  code=$?
  cat "$out"
  exit "$code"
}

tail -n 120 "$out"
