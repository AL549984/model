#!/usr/bin/env bash
set -euo pipefail

# Near-real-time case polling entrypoint. This mirrors the Tencent Research
# watcher shape, but keeps the actual platform crawlers behind a single Hermes
# command so the static site never owns platform sessions.

export HOME="${HOME:-$(cd ~ && pwd)}"
export LARK_CLI_HOME="${LARK_CLI_HOME:-$HOME/.lark-cli}"
export PATH="$HOME/.local/bin:$HOME/.hermes/node/bin:$HOME/node-v24/bin:$HOME/node-v22/bin:$HOME/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

resolve_site_dir() {
  if [[ -n "${MODEL_ATLAS_SITE_DIR:-}" ]]; then
    cd "$MODEL_ATLAS_SITE_DIR" && pwd
  elif [[ -f "$PWD/package.json" && -d "$PWD/scripts" ]]; then
    pwd
  elif [[ -f "$SCRIPT_DIR/../package.json" ]]; then
    cd "$SCRIPT_DIR/.." && pwd
  elif [[ -f "$SCRIPT_DIR/../site/package.json" ]]; then
    cd "$SCRIPT_DIR/../site" && pwd
  elif [[ -f "$HOME/.hermes/data/model_atlas_repo/site/package.json" ]]; then
    cd "$HOME/.hermes/data/model_atlas_repo/site" && pwd
  else
    cd "$SCRIPT_DIR/.." && pwd
  fi
}

SITE_DIR="$(resolve_site_dir)"
REPO_DIR="${MODEL_ATLAS_REPO_DIR:-$(cd "$SITE_DIR/.." && pwd)}"
PROFILE="${MODEL_ATLAS_PROFILE:-$HOME/.hermes}"
LOG_DIR="${MODEL_ATLAS_LOG_DIR:-$PROFILE/data/model_atlas_logs}"
LOCK_PATH="${MODEL_ATLAS_POLL_LOCK_PATH:-$PROFILE/data/model_atlas_locks/case_poll.lock}"
PIPELINE_LOCK_PATH="${MODEL_ATLAS_LOCK_PATH:-$PROFILE/data/model_atlas_locks/auto_pipeline.lock}"

load_env_file() {
  local file="$1"
  [[ -f "$file" ]] || return 0
  while IFS='=' read -r key value; do
    [[ -n "$key" ]] || continue
    [[ "$key" == \#* ]] && continue
    [[ "$key" =~ ^[A-Za-z_][A-Za-z0-9_]*$ ]] || continue
    value="${value%$'\r'}"
    value="${value%\"}"
    value="${value#\"}"
    value="${value%\'}"
    value="${value#\'}"
    if [[ -z "${!key+x}" ]]; then
      export "$key=$value"
    fi
  done <"$file"
}

load_env_file "$PROFILE/.env"
load_env_file "$SITE_DIR/.env"

timestamp() {
  date -Iseconds 2>/dev/null || date '+%Y-%m-%dT%H:%M:%S%z'
}

mkdir -p "$LOG_DIR" "$(dirname "$LOCK_PATH")" "$(dirname "$PIPELINE_LOCK_PATH")"

LOCK_DIRS=()

cleanup_locks() {
  local lock_dir
  for lock_dir in "${LOCK_DIRS[@]}"; do
    rm -rf "$lock_dir"
  done
}
trap cleanup_locks EXIT

acquire_lock() {
  local path="$1"
  local skipped="$2"
  local wait_seconds="${3:-0}"
  local lock_dir="${path}.d"
  local started
  started="$(date +%s)"

  while true; do
    if mkdir "$lock_dir" 2>/dev/null; then
      echo "$$" >"$lock_dir/pid"
      LOCK_DIRS+=("$lock_dir")
      return 0
    fi

    local pid=""
    [[ -f "$lock_dir/pid" ]] && pid="$(cat "$lock_dir/pid" 2>/dev/null || true)"
    if [[ -n "$pid" ]] && ! ps -p "$pid" >/dev/null 2>&1; then
      rm -rf "$lock_dir"
      continue
    fi

    if (( wait_seconds <= 0 || $(date +%s) - started >= wait_seconds )); then
      echo "{\"ok\":true,\"skipped\":\"$skipped\"}"
      exit 0
    fi
    sleep 1
  done
}

acquire_lock "$LOCK_PATH" "case poll already running" 0
acquire_lock "$PIPELINE_LOCK_PATH" "auto pipeline lock busy" "${MODEL_ATLAS_LOCK_WAIT_SECONDS:-0}"

ts="$(date '+%Y-%m-%d_%H-%M-%S')"
out="$LOG_DIR/${ts}_case_poll.log"

run_step() {
  local name="$1"
  shift
  echo "[$(timestamp)] >>> $name"
  if "$@"; then
    echo "[$(timestamp)] <<< $name"
  else
    local code=$?
    echo "[$(timestamp)] !!! step failed: $name (exit=$code)"
    return "$code"
  fi
}

sync_repo_before_generation() {
  if [[ "${MODEL_ATLAS_SKIP_REPO_SYNC:-0}" == "1" ]]; then
    echo "Skipping repo sync: MODEL_ATLAS_SKIP_REPO_SYNC=1"
    return 0
  fi
  if [[ ! -d "$REPO_DIR/.git" ]]; then
    echo "Skipping repo sync: $REPO_DIR is not a git repo"
    return 0
  fi
  local branch="${GITHUB_BRANCH:-main}"
  (
    cd "$REPO_DIR"
    git fetch origin "$branch"
    git rebase --autostash "origin/$branch"
  )
}

{
  echo "[$(timestamp)] Model Atlas case poll started"
  cd "$SITE_DIR"

  run_step "sync latest repo code" sync_repo_before_generation || exit $?
  run_step "sync Feishu" npm run sync:feishu || exit $?
  run_step "generate evidence backfill" npm run evidence:backfill || exit $?
  run_step "export Hermes case tasks" npm run hermes:tasks || exit $?

  if [[ -n "${MODEL_ATLAS_CASE_CRAWL_CMD:-}" ]]; then
    echo "Running MODEL_ATLAS_CASE_CRAWL_CMD"
    bash -lc "$MODEL_ATLAS_CASE_CRAWL_CMD"
  else
    echo "Skipping case crawl: MODEL_ATLAS_CASE_CRAWL_CMD is not set"
  fi

  run_step "sync Feishu" npm run sync:feishu || exit $?
  run_step "generate evidence backfill" npm run evidence:backfill || exit $?
  run_step "export Hermes case tasks" npm run hermes:tasks || exit $?
  run_step "generate evidence archive" npm run evidence:archive || exit $?
  run_step "build site" npm run build || exit $?

  if [[ "${MODEL_ATLAS_PUSH_TO_GITHUB:-1}" != "0" ]]; then
    run_step "push generated site data to GitHub" python3 "$SITE_DIR/scripts/push_model_atlas_site_to_github.py" --repo-dir "$REPO_DIR" || exit $?
  else
    echo "Skipping GitHub push: MODEL_ATLAS_PUSH_TO_GITHUB=0"
  fi

  echo "[$(timestamp)] Model Atlas case poll finished"
} >"$out" 2>&1 || {
  code=$?
  cat "$out"
  exit "$code"
}

tail -n 120 "$out"
