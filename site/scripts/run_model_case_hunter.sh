#!/usr/bin/env bash
set -euo pipefail

# Batch runner for the default Hermes Agent. The static site exports structured
# tasks; Hermes owns the real crawling and writes candidate case rows to Feishu.

export HOME="${HOME:-$(cd ~ && pwd)}"
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
STATE_PATH="${MODEL_ATLAS_CASE_HUNTER_STATE:-$PROFILE/state/model_atlas_case_hunter_state.json}"
LOG_DIR="${MODEL_ATLAS_CASE_HUNTER_LOG_DIR:-$PROFILE/data/model_atlas_logs/case_hunter}"
OUT_DIR="${MODEL_ATLAS_CASE_HUNTER_OUT_DIR:-$PROFILE/data/model_atlas_case_candidates}"
MAX_MODELS="${MODEL_ATLAS_CASE_HUNTER_MAX_MODELS:-3}"
TIMEOUT_SECONDS="${MODEL_ATLAS_CASE_HUNTER_TIMEOUT_SECONDS:-1800}"
TASKS_PATH="${MODEL_ATLAS_CASE_TASKS_PATH:-$REPO_DIR/work/hermes-model-case-tasks.json}"

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

mkdir -p "$(dirname "$STATE_PATH")" "$LOG_DIR" "$OUT_DIR"

STAMP="$(date '+%Y%m%d-%H%M%S')"
BATCH_JSON="$OUT_DIR/${STAMP}-batch.json"
OUT_JSON="$OUT_DIR/${STAMP}-candidates.json"
PROMPT_PATH="$OUT_DIR/${STAMP}-prompt.md"
LOG_PATH="$LOG_DIR/${STAMP}.log"

node - "$TASKS_PATH" "$STATE_PATH" "$BATCH_JSON" "$MAX_MODELS" <<'NODE'
const fs = require("fs");
const [tasksPath, statePath, batchPath, maxModelsText] = process.argv.slice(2);
const maxModels = Math.max(1, Number(maxModelsText || 3));
const payload = JSON.parse(fs.readFileSync(tasksPath, "utf8"));
let state = { attempts: {} };
if (fs.existsSync(statePath)) state = JSON.parse(fs.readFileSync(statePath, "utf8"));
state.attempts ||= {};

const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };
const statusOrder = {
  below_min_case_coverage: 0,
  top_up_to_target: 1,
  needs_a_case: 2,
  identity_first: 3,
  target_met_snapshot_refresh: 4,
  archive_review: 9
};
const now = new Date().toISOString();
const tasks = payload.tasks
  .filter((task) => Number(task.targetDeficit || 0) > 0)
  .filter((task) => task.status !== "archive_review")
  .sort((a, b) => {
    const aAttempt = state.attempts[a.taskId]?.count || 0;
    const bAttempt = state.attempts[b.taskId]?.count || 0;
    return (statusOrder[a.status] ?? 8) - (statusOrder[b.status] ?? 8)
      || (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9)
      || aAttempt - bAttempt
      || Number(b.targetDeficit || 0) - Number(a.targetDeficit || 0)
      || String(a.vendor).localeCompare(String(b.vendor))
      || String(a.modelName).localeCompare(String(b.modelName));
  })
  .slice(0, maxModels);

for (const task of tasks) {
  const attempt = state.attempts[task.taskId] || { count: 0 };
  state.attempts[task.taskId] = {
    ...attempt,
    count: attempt.count + 1,
    lastStartedAt: now,
    lastStatus: "started"
  };
}

const batch = {
  generatedAt: now,
  summary: payload.summary,
  tasks
};

fs.writeFileSync(batchPath, JSON.stringify(batch, null, 2) + "\n");
fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
console.log(JSON.stringify({ selected: tasks.length, taskIds: tasks.map((task) => task.taskId) }));
NODE

if [[ "$(node -e "console.log(require('$BATCH_JSON').tasks.length)")" == "0" ]]; then
  echo '{"ok":true,"skipped":"no case tasks with targetDeficit > 0"}'
  exit 0
fi

cat >"$PROMPT_PATH" <<EOF
你是云端 default Agent 的 Model Atlas Case Hunter。全自动执行，不需要人工审核。

输入任务文件：
$BATCH_JSON

输出候选文件：
$OUT_JSON

目标：
- 每个模型至少补到 3 条 A 类真实使用案例，完整目标是 5 条。
- 本轮只处理 batch 文件里的任务。
- 严格优先找真实使用案例，不要用 benchmark、教程、发布文、集合页、新闻综述冒充案例。

A 类候选必须同时满足：
1. 明确具体模型或明确模型家族且能绑定到 task.modelId。
2. 明确使用者/组织。
3. 明确任务。
4. 有 original_evidence_url。
5. 有 artifact_url，指向公开 repo、demo、PR、产品页、视频、文章或可访问产物。
6. 有 task_description、output_result、model_contribution。

平台优先级：
- GitHub repo/PR/issue、官方 customer story、工程博客、产品页。
- 中文模型优先补 B 站、微信公众号、小红书、抖音线索，但只有存在可核验公开 URL 和产物时才写入。

执行要求：
- 用 terminal/curl/python/file 工具抓取和核验，不要询问用户。
- 先读 batch JSON 的 queries、crawlSources、rejectIf、dedupeKeys。
- 每个任务尽量输出 targetDeficit 对应数量的高质量候选；找不到就少写，不要硬凑。
- 如果 task.status 是 identity_first，先验证这个具体模型是否真实存在且公开可用；如果 10 分钟内无法确认 exact model identity，就不要写入 cases，直接输出空 cases 数组并结束该模型。
- 输出 JSON 形状必须是 {"cases":[...]}。
- 每条 case 字段必须使用 snake_case：
  case_id, case_title, model_id, model_name, vendor_id, vendor, user_or_org,
  original_evidence_url, artifact_url, source_platform, source_type,
  task_category, task_description, output_result, model_contribution,
  risk_notes, collected_at, evidence_grade, showcase_eligible,
  selected_for_model_card, review_status
- 强证据真实案例使用 source_type=real_case、evidence_grade=A、showcase_eligible=true、selected_for_model_card=true、review_status=auto_approved_candidate。
- 如果只找到弱证据，可以写入 B/C/D 候选，但必须如实设置 source_type/evidence_grade，并把 showcase_eligible 和 selected_for_model_card 设为 false；官方介绍、发布博客、benchmark、教程、泛测评不得写成 A。
- 完成后只需要写入 $OUT_JSON，不要直接写飞书；外层脚本会导入。
EOF

echo "[$(timestamp)] running Hermes case hunter batch $(basename "$BATCH_JSON")" | tee "$LOG_PATH"

if timeout "$TIMEOUT_SECONDS" hermes --profile default --yolo --toolsets terminal,file --oneshot "$(cat "$PROMPT_PATH")" >>"$LOG_PATH" 2>&1; then
  echo "[$(timestamp)] Hermes case hunter finished" | tee -a "$LOG_PATH"
else
  code=$?
  echo "[$(timestamp)] Hermes case hunter failed code=$code" | tee -a "$LOG_PATH"
  exit "$code"
fi

if [[ ! -f "$OUT_JSON" ]]; then
  echo "{\"ok\":false,\"error\":\"candidate file not created\",\"path\":\"$OUT_JSON\"}"
  exit 3
fi

python3 "$SITE_DIR/scripts/import-hermes-case-intake.py" "$OUT_JSON" | tee -a "$LOG_PATH"

node - "$STATE_PATH" "$BATCH_JSON" "$OUT_JSON" <<'NODE'
const fs = require("fs");
const [statePath, batchPath, outPath] = process.argv.slice(2);
const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, "utf8")) : { attempts: {} };
state.attempts ||= {};
const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));
const out = JSON.parse(fs.readFileSync(outPath, "utf8"));
const now = new Date().toISOString();
for (const task of batch.tasks) {
  state.attempts[task.taskId] ||= { count: 0 };
  state.attempts[task.taskId].lastFinishedAt = now;
  state.attempts[task.taskId].lastStatus = "finished";
  state.attempts[task.taskId].lastCandidateCount = Array.isArray(out.cases) ? out.cases.filter((item) => item.model_id === task.modelId).length : 0;
}
fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
console.log(JSON.stringify({ ok: true, candidates: Array.isArray(out.cases) ? out.cases.length : 0 }));
NODE
