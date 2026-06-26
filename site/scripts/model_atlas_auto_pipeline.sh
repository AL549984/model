#!/usr/bin/env bash
set -euo pipefail

# Production-style Model Atlas pipeline, copied from the Tencent Research
# pattern: one locked shell entrypoint owns sync, export, build and publish.

export HOME="${HOME:-/home/ubuntu}"
export LARK_CLI_HOME="${LARK_CLI_HOME:-/home/ubuntu/.lark-cli}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="${MODEL_ATLAS_SITE_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"
REPO_DIR="${MODEL_ATLAS_REPO_DIR:-$(cd "$SITE_DIR/.." && pwd)}"
PROFILE="${MODEL_ATLAS_PROFILE:-/home/ubuntu/.hermes}"
LOG_DIR="${MODEL_ATLAS_LOG_DIR:-$PROFILE/data/model_atlas_logs}"
LOCK_PATH="${MODEL_ATLAS_LOCK_PATH:-$PROFILE/data/model_atlas_locks/auto_pipeline.lock}"

mkdir -p "$LOG_DIR" "$(dirname "$LOCK_PATH")"

exec 9>"$LOCK_PATH"
lock_wait="${MODEL_ATLAS_LOCK_WAIT_SECONDS:-1200}"
if ! flock -w "$lock_wait" 9; then
  echo "{\"ok\":false,\"stage\":\"lock\",\"error\":\"model atlas pipeline lock busy after ${lock_wait}s\"}"
  exit 75
fi

ts="$(date '+%Y-%m-%d_%H-%M-%S')"
out="$LOG_DIR/${ts}_auto_pipeline.log"

run_step() {
  local name="$1"
  shift
  echo "[$(date --iso-8601=seconds)] >>> $name"
  "$@"
  echo "[$(date --iso-8601=seconds)] <<< $name"
}

{
  echo "[$(date --iso-8601=seconds)] Model Atlas auto pipeline started"
  echo "SITE_DIR=$SITE_DIR"
  echo "REPO_DIR=$REPO_DIR"

  if [[ -n "${MODEL_ATLAS_VENDOR_CRAWL_CMD:-}" ]]; then
    echo "Running MODEL_ATLAS_VENDOR_CRAWL_CMD"
    bash -lc "$MODEL_ATLAS_VENDOR_CRAWL_CMD"
  else
    echo "Skipping vendor crawl: MODEL_ATLAS_VENDOR_CRAWL_CMD is not set"
  fi

  cd "$SITE_DIR"
  run_step "sync Feishu" npm run sync:feishu
  run_step "generate evidence backfill" npm run evidence:backfill
  run_step "export Hermes tasks" npm run hermes:tasks
  run_step "build site" npm run build

  if [[ "${MODEL_ATLAS_PUSH_TO_GITHUB:-1}" != "0" ]]; then
    run_step "push generated site data to GitHub" python3 "$SITE_DIR/scripts/push_model_atlas_site_to_github.py" --repo-dir "$REPO_DIR"
  else
    echo "Skipping GitHub push: MODEL_ATLAS_PUSH_TO_GITHUB=0"
  fi

  echo "[$(date --iso-8601=seconds)] Model Atlas auto pipeline finished"
} >"$out" 2>&1 || {
  code=$?
  cat "$out"
  exit "$code"
}

tail -n 120 "$out"
