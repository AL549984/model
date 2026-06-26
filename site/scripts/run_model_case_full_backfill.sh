#!/usr/bin/env bash
set -euo pipefail

# Continuous full-coverage runner. Each round refreshes Feishu-backed data,
# regenerates deficits, runs the parallel case hunter, and repeats.

export HOME="${HOME:-/home/ubuntu}"
export LARK_CLI_HOME="${LARK_CLI_HOME:-/home/ubuntu/.lark-cli}"
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
PROFILE="${MODEL_ATLAS_PROFILE:-/home/ubuntu/.hermes}"
LOG_DIR="${MODEL_ATLAS_LOG_DIR:-$PROFILE/data/model_atlas_logs}"
LOCK_PATH="${MODEL_ATLAS_FULL_BACKFILL_LOCK_PATH:-$PROFILE/data/model_atlas_locks/full_case_backfill.lock}"
PIPELINE_LOCK_PATH="${MODEL_ATLAS_LOCK_PATH:-$PROFILE/data/model_atlas_locks/auto_pipeline.lock}"
POLL_LOCK_PATH="${MODEL_ATLAS_POLL_LOCK_PATH:-$PROFILE/data/model_atlas_locks/case_poll.lock}"
ROUNDS="${MODEL_ATLAS_FULL_BACKFILL_ROUNDS:-30}"

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

mkdir -p "$LOG_DIR" "$(dirname "$LOCK_PATH")" "$(dirname "$PIPELINE_LOCK_PATH")" "$(dirname "$POLL_LOCK_PATH")"

exec 7>"$LOCK_PATH"
if ! flock -n 7; then
  echo "{\"ok\":true,\"skipped\":\"full case backfill already running\"}"
  exit 0
fi

exec 8>"$POLL_LOCK_PATH"
if ! flock -n 8; then
  echo "{\"ok\":true,\"skipped\":\"case poll already running\"}"
  exit 0
fi

exec 9>"$PIPELINE_LOCK_PATH"
if ! flock -n 9; then
  echo "{\"ok\":true,\"skipped\":\"auto pipeline already running\"}"
  exit 0
fi

ts="$(date '+%Y-%m-%d_%H-%M-%S')"
out="$LOG_DIR/${ts}_full_case_backfill.log"

run_step() {
  local name="$1"
  shift
  echo "[$(date --iso-8601=seconds)] >>> $name"
  "$@"
  echo "[$(date --iso-8601=seconds)] <<< $name"
}

remaining_target_deficit() {
  node - <<'NODE'
const tasks = require("../work/hermes-model-case-tasks.json");
console.log(Number(tasks.summary?.targetDeficit || 0));
NODE
}

{
  echo "[$(date --iso-8601=seconds)] Model Atlas full case backfill started"
  echo "SITE_DIR=$SITE_DIR"
  echo "REPO_DIR=$REPO_DIR"
  echo "ROUNDS=$ROUNDS"
  echo "WORKERS=${MODEL_ATLAS_CASE_HUNTER_WORKERS:-4}"
  echo "MODELS_PER_WORKER=${MODEL_ATLAS_CASE_HUNTER_MODELS_PER_WORKER:-1}"
  cd "$SITE_DIR"

  for round in $(seq 1 "$ROUNDS"); do
    echo "[$(date --iso-8601=seconds)] === full backfill round $round/$ROUNDS ==="
    run_step "sync Feishu" npm run sync:feishu
    run_step "generate evidence backfill" npm run evidence:backfill
    run_step "export Hermes case tasks" npm run hermes:tasks

    target_deficit="$(remaining_target_deficit)"
    echo "[$(date --iso-8601=seconds)] targetDeficit=$target_deficit"
    if [[ "$target_deficit" == "0" ]]; then
      echo "[$(date --iso-8601=seconds)] target coverage complete"
      break
    fi

    run_step "parallel Hermes case hunter" bash scripts/run_model_case_hunter_parallel.sh

    run_step "post-round sync Feishu" npm run sync:feishu
    run_step "post-round evidence backfill" npm run evidence:backfill
    run_step "post-round export Hermes case tasks" npm run hermes:tasks
    run_step "post-round build site" npm run build

    if [[ "${MODEL_ATLAS_PUSH_TO_GITHUB:-0}" != "0" ]]; then
      run_step "post-round push generated site data to GitHub" python3 "$SITE_DIR/scripts/push_model_atlas_site_to_github.py" --repo-dir "$REPO_DIR"
    else
      echo "Skipping post-round GitHub push: MODEL_ATLAS_PUSH_TO_GITHUB=${MODEL_ATLAS_PUSH_TO_GITHUB:-0}"
    fi
  done

  run_step "final sync Feishu" npm run sync:feishu
  run_step "final evidence backfill" npm run evidence:backfill
  run_step "final export Hermes case tasks" npm run hermes:tasks
  run_step "build site" npm run build

  if [[ "${MODEL_ATLAS_PUSH_TO_GITHUB:-0}" != "0" ]]; then
    run_step "push generated site data to GitHub" python3 "$SITE_DIR/scripts/push_model_atlas_site_to_github.py" --repo-dir "$REPO_DIR"
  else
    echo "Skipping GitHub push: MODEL_ATLAS_PUSH_TO_GITHUB=${MODEL_ATLAS_PUSH_TO_GITHUB:-0}"
  fi

  echo "[$(date --iso-8601=seconds)] Model Atlas full case backfill finished"
} >"$out" 2>&1 || {
  code=$?
  cat "$out"
  exit "$code"
}

tail -n 160 "$out"
