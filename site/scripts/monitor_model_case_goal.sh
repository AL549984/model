#!/usr/bin/env bash
set -euo pipefail

# Goal monitor for the Model Atlas full case backfill.
# It keeps local gather running, uploads candidate JSON files to the cloud
# importer, checks coverage, and sends a Feishu notification when complete.

export HOME="${HOME:-$(cd ~ && pwd)}"
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

resolve_site_dir() {
  if [[ -n "${MODEL_ATLAS_SITE_DIR:-}" ]]; then
    cd "$MODEL_ATLAS_SITE_DIR" && pwd
  elif [[ -f "$PWD/package.json" && -d "$PWD/scripts" ]]; then
    pwd
  elif [[ -f "$SCRIPT_DIR/../package.json" ]]; then
    cd "$SCRIPT_DIR/.." && pwd
  else
    cd "$SCRIPT_DIR/.." && pwd
  fi
}

SITE_DIR="$(resolve_site_dir)"
PROFILE="${MODEL_ATLAS_PROFILE:-$HOME/.hermes}"
LOG_DIR="${MODEL_ATLAS_LOG_DIR:-$PROFILE/data/model_atlas_logs}"
INTERVAL_SECONDS="${MODEL_ATLAS_GOAL_MONITOR_INTERVAL_SECONDS:-300}"
LOCAL_GATHER_SCREEN="${MODEL_ATLAS_LOCAL_GATHER_SCREEN:-model-atlas-local-gather}"
CLOUD_USER="${MODEL_ATLAS_CLOUD_USER:-ubuntu}"
CLOUD_HOST="${MODEL_ATLAS_CLOUD_HOST:-124.221.3.41}"
CLOUD_REPO_DIR="${MODEL_ATLAS_CLOUD_REPO_DIR:-/home/ubuntu/.hermes/data/model_atlas_repo}"
FEISHU_NOTIFY_PROFILE="${FEISHU_NOTIFY_PROFILE:-cli_a9562ffdd5f65cba}"
FEISHU_NOTIFY_USER_ID="${FEISHU_NOTIFY_USER_ID:-}"

mkdir -p "$LOG_DIR"

timestamp() {
  date -Iseconds 2>/dev/null || date '+%Y-%m-%dT%H:%M:%S%z'
}

notify_user_id() {
  if [[ -n "$FEISHU_NOTIFY_USER_ID" ]]; then
    printf '%s\n' "$FEISHU_NOTIFY_USER_ID"
    return 0
  fi
  python3 - <<'PY'
import json
from pathlib import Path
p = Path.home() / ".lark-cli" / "config.json"
data = json.loads(p.read_text())
for app in data.get("apps", []):
    for user in app.get("users", []):
        open_id = user.get("userOpenId")
        if open_id:
            print(open_id)
            raise SystemExit(0)
raise SystemExit(1)
PY
}

cloud_metrics() {
  ssh_base=(ssh -o ServerAliveInterval=20 -o ServerAliveCountMax=3 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null)
  if [[ -n "${SSHPASS:-}" ]] && command -v sshpass >/dev/null 2>&1; then
    ssh_base=(sshpass -e "${ssh_base[@]}")
  fi
  "${ssh_base[@]}" "$CLOUD_USER@$CLOUD_HOST" "set -euo pipefail
export HOME=/home/ubuntu
export PATH=\"\$HOME/.local/bin:\$HOME/.hermes/node/bin:\$HOME/node-v24/bin:\$HOME/node-v22/bin:\$HOME/bin:/usr/local/bin:/usr/bin:/bin:\$PATH\"
cd '$CLOUD_REPO_DIR/site'
node - <<'NODE'
const cases = require('./src/data/cases.json');
const metrics = require('./src/data/metrics.json');
const byModel = new Map();
for (const c of cases) if (c.evidenceGrade === 'A') byModel.set(c.modelId, (byModel.get(c.modelId) || 0) + 1);
const total = metrics.totalModels || 118;
const counts = [...byModel.values()];
console.log(JSON.stringify({
  cases: cases.length,
  minDeficit: metrics.activeCaseDeficitToMin ?? metrics.caseDeficitToMin,
  targetDeficit: metrics.activeCaseDeficitToTarget ?? metrics.caseDeficitToTarget,
  allModelMinDeficit: metrics.caseDeficitToMin,
  allModelTargetDeficit: metrics.caseDeficitToTarget,
  atLeast3: counts.filter((n) => n >= 3).length,
  atLeast5: counts.filter((n) => n >= 5).length,
  below3: total - counts.filter((n) => n >= 3).length,
  below5: total - counts.filter((n) => n >= 5).length,
  zero: total - byModel.size
}));
NODE"
}

local_gather_running() {
  pgrep -f "bash scripts/run_model_case_local_gather.sh" >/dev/null 2>&1
}

start_local_gather() {
  if local_gather_running; then
    return 0
  fi
  screen -dmS "$LOCAL_GATHER_SCREEN" bash -lc "cd '$SITE_DIR' && env MODEL_ATLAS_SITE_DIR='$SITE_DIR' MODEL_ATLAS_REPO_DIR='$(cd "$SITE_DIR/.." && pwd)' MODEL_ATLAS_PROFILE='$PROFILE' LARK_CLI_HOME='$HOME/.lark-cli' MODEL_ATLAS_CASE_HUNTER_WORKERS='${MODEL_ATLAS_CASE_HUNTER_WORKERS:-10}' MODEL_ATLAS_CASE_HUNTER_MODELS_PER_WORKER='${MODEL_ATLAS_CASE_HUNTER_MODELS_PER_WORKER:-1}' MODEL_ATLAS_CASE_HUNTER_TIMEOUT_SECONDS='${MODEL_ATLAS_CASE_HUNTER_TIMEOUT_SECONDS:-900}' MODEL_ATLAS_LOCAL_GATHER_ROUNDS='${MODEL_ATLAS_LOCAL_GATHER_ROUNDS:-80}' bash scripts/run_model_case_local_gather.sh"
}

send_feishu_notification() {
  local metrics_json="$1"
  local user_id
  user_id="$(notify_user_id)"
  local text
  text="$(python3 - "$metrics_json" <<'PY'
import json, sys
m = json.loads(sys.argv[1])
print(
    "Model Atlas 全量案例补齐完成\n"
    f"A 类案例总数：{m['cases']}\n"
    f"达到 3 条的模型：{m['atLeast3']}\n"
    f"达到 5 条的模型：{m['atLeast5']}\n"
    f"剩余 targetDeficit：{m['targetDeficit']}\n"
    "网站会继续由云端增量更新。"
)
PY
)"
  lark-cli --profile "$FEISHU_NOTIFY_PROFILE" im +messages-send --as bot --user-id "$user_id" --text "$text" --idempotency-key "model-atlas-complete-$(date '+%Y%m%d%H%M')" >/dev/null
}

echo "[$(timestamp)] Model Atlas goal monitor started"

while true; do
  echo "[$(timestamp)] monitor tick"

  if ! local_gather_running; then
    echo "[$(timestamp)] local gather not running; restarting"
    start_local_gather
  fi

  if bash "$SITE_DIR/scripts/upload_local_case_candidates_to_cloud.sh"; then
    echo "[$(timestamp)] upload/import step complete"
    if [[ "${MODEL_ATLAS_LOCAL_PUBLISH_AFTER_UPLOAD:-0}" == "1" ]]; then
      if bash "$SITE_DIR/scripts/publish_cloud_model_data_locally.sh"; then
        echo "[$(timestamp)] local publish step complete"
      else
        echo "[$(timestamp)] local publish step failed; will retry"
      fi
    fi
  else
    echo "[$(timestamp)] upload/import step failed; will retry"
  fi

  metrics="$(cloud_metrics || true)"
  if [[ -n "$metrics" ]]; then
    echo "[$(timestamp)] metrics $metrics"
    target_deficit="$(python3 - "$metrics" <<'PY'
import json, sys
print(json.loads(sys.argv[1]).get("targetDeficit", 999999))
PY
)"
    if [[ "$target_deficit" == "0" ]]; then
      echo "[$(timestamp)] target coverage complete; sending Feishu notification"
      send_feishu_notification "$metrics" || echo "[$(timestamp)] Feishu notification failed"
      screen -S "$LOCAL_GATHER_SCREEN" -X quit >/dev/null 2>&1 || true
      echo "[$(timestamp)] Model Atlas goal monitor finished"
      exit 0
    fi
  else
    echo "[$(timestamp)] metrics unavailable; will retry"
  fi

  sleep "$INTERVAL_SECONDS"
done
