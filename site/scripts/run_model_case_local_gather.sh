#!/usr/bin/env bash
set -euo pipefail

# Local full-coverage gather runner. It spends local Hermes cycles to produce
# candidate JSON files, then leaves Feishu import/publish to the cloud pipeline.

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
  else
    cd "$SCRIPT_DIR/.." && pwd
  fi
}

SITE_DIR="$(resolve_site_dir)"
REPO_DIR="${MODEL_ATLAS_REPO_DIR:-$(cd "$SITE_DIR/.." && pwd)}"
PROFILE="${MODEL_ATLAS_PROFILE:-$HOME/.hermes}"
LOG_DIR="${MODEL_ATLAS_LOG_DIR:-$PROFILE/data/model_atlas_logs}"
ROUNDS="${MODEL_ATLAS_LOCAL_GATHER_ROUNDS:-80}"

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

mkdir -p "$LOG_DIR"
ts="$(date '+%Y-%m-%d_%H-%M-%S')"
out="$LOG_DIR/${ts}_local_case_gather.log"

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

{
  echo "[$(timestamp)] Model Atlas local gather started"
  echo "SITE_DIR=$SITE_DIR"
  echo "REPO_DIR=$REPO_DIR"
  echo "ROUNDS=$ROUNDS"
  echo "WORKERS=${MODEL_ATLAS_CASE_HUNTER_WORKERS:-4}"
  echo "MODELS_PER_WORKER=${MODEL_ATLAS_CASE_HUNTER_MODELS_PER_WORKER:-1}"
  cd "$SITE_DIR"

  for round in $(seq 1 "$ROUNDS"); do
    echo "[$(timestamp)] === local gather round $round/$ROUNDS ==="
    run_step "generate evidence backfill" npm run evidence:backfill || exit $?
    run_step "export Hermes case tasks" npm run hermes:tasks || exit $?
    run_step "parallel Hermes case hunter without import" env MODEL_ATLAS_CASE_HUNTER_IMPORT=0 bash scripts/run_model_case_hunter_parallel.sh || exit $?
  done

  echo "[$(timestamp)] Model Atlas local gather finished"
} >"$out" 2>&1 || {
  code=$?
  cat "$out"
  exit "$code"
}

tail -n 160 "$out"
