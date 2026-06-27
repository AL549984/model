#!/usr/bin/env bash
set -euo pipefail

# Parallel batch runner for the default Hermes Agent. It speeds up full coverage
# by sharding model tasks across multiple workers while keeping import
# validation centralized and strict.

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

STATE_PATH="${MODEL_ATLAS_CASE_HUNTER_STATE:-$PROFILE/state/model_atlas_case_hunter_state.json}"
LOG_DIR="${MODEL_ATLAS_CASE_HUNTER_LOG_DIR:-$PROFILE/data/model_atlas_logs/case_hunter}"
OUT_DIR="${MODEL_ATLAS_CASE_HUNTER_OUT_DIR:-$PROFILE/data/model_atlas_case_candidates}"
WORKERS="${MODEL_ATLAS_CASE_HUNTER_WORKERS:-4}"
MODELS_PER_WORKER="${MODEL_ATLAS_CASE_HUNTER_MODELS_PER_WORKER:-1}"
TIMEOUT_SECONDS="${MODEL_ATLAS_CASE_HUNTER_TIMEOUT_SECONDS:-1200}"
TASKS_PATH="${MODEL_ATLAS_CASE_TASKS_PATH:-$REPO_DIR/work/hermes-model-case-tasks.json}"
TOTAL_MODELS=$((WORKERS * MODELS_PER_WORKER))

mkdir -p "$(dirname "$STATE_PATH")" "$LOG_DIR" "$OUT_DIR"

STAMP="$(date '+%Y%m%d-%H%M%S')"
SELECTED_BATCH="$OUT_DIR/${STAMP}-parallel-batch.json"
SUMMARY_LOG="$LOG_DIR/${STAMP}-parallel.log"

node - "$TASKS_PATH" "$STATE_PATH" "$SELECTED_BATCH" "$TOTAL_MODELS" <<'NODE'
const fs = require("fs");
const [tasksPath, statePath, batchPath, maxModelsText] = process.argv.slice(2);
const maxModels = Math.max(1, Number(maxModelsText || 4));
const payload = JSON.parse(fs.readFileSync(tasksPath, "utf8"));
let state = { attempts: {} };
if (fs.existsSync(statePath)) state = JSON.parse(fs.readFileSync(statePath, "utf8"));
state.attempts ||= {};

const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };
const statusOrder = {
  below_min_case_coverage: 0,
  needs_a_case: 1,
  identity_first: 2,
  top_up_to_target: 3,
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

fs.writeFileSync(batchPath, JSON.stringify({ generatedAt: now, summary: payload.summary, tasks }, null, 2) + "\n");
fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
console.log(JSON.stringify({ selected: tasks.length, taskIds: tasks.map((task) => task.taskId) }));
NODE

if [[ "$(node -e "console.log(require('$SELECTED_BATCH').tasks.length)")" == "0" ]]; then
  echo '{"ok":true,"skipped":"no case tasks with targetDeficit > 0"}'
  exit 0
fi

SHARDS=()
while IFS= read -r shard_path; do
  SHARDS+=("$shard_path")
done < <(node - "$SELECTED_BATCH" "$OUT_DIR" "$STAMP" "$MODELS_PER_WORKER" <<'NODE'
const fs = require("fs");
const [batchPath, outDir, stamp, modelsPerWorkerText] = process.argv.slice(2);
const modelsPerWorker = Math.max(1, Number(modelsPerWorkerText || 1));
const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));
for (let i = 0; i < batch.tasks.length; i += modelsPerWorker) {
  const shard = {
    generatedAt: batch.generatedAt,
    summary: batch.summary,
    shardIndex: Math.floor(i / modelsPerWorker) + 1,
    tasks: batch.tasks.slice(i, i + modelsPerWorker)
  };
  const path = `${outDir}/${stamp}-worker-${shard.shardIndex}-batch.json`;
  fs.writeFileSync(path, JSON.stringify(shard, null, 2) + "\n");
  console.log(path);
}
NODE
)

write_prompt() {
  local batch_json="$1"
  local out_json="$2"
  local prompt_path="$3"
  cat >"$prompt_path" <<EOF
你是云端 default Agent 的 Model Atlas Case Hunter。全自动执行，不需要人工审核。

输入任务文件：
${batch_json}

输出候选文件：
${out_json}

目标：
- 每个模型至少补到 3 条 A 类真实使用案例，完整目标是 5 条。
- 本轮只处理 batch 文件里的任务。这个分片通常只包含 1 个模型，请专注深挖，不要泛搜。
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
- source_type 固定 real_case；evidence_grade 固定 A；showcase_eligible 和 selected_for_model_card 用 true；review_status 用 auto_approved_candidate。
- 如果只找到弱证据，不要写入 cases。
- 完成后只需要写入 ${out_json}，不要直接写飞书；外层脚本会导入。
EOF
}

run_worker() {
  local shard_json="$1"
  local worker_name
  worker_name="$(basename "$shard_json" -batch.json)"
  local out_json="$OUT_DIR/${worker_name}-candidates.json"
  local prompt_path="$OUT_DIR/${worker_name}-prompt.md"
  local log_path="$LOG_DIR/${worker_name}.log"

  write_prompt "$shard_json" "$out_json" "$prompt_path"
  echo "[$(timestamp)] running Hermes worker $worker_name" | tee "$log_path"
  timeout_cmd=()
  if command -v timeout >/dev/null 2>&1; then
    timeout_cmd=(timeout "$TIMEOUT_SECONDS")
  elif command -v gtimeout >/dev/null 2>&1; then
    timeout_cmd=(gtimeout "$TIMEOUT_SECONDS")
  fi
  if [[ ${#timeout_cmd[@]} -gt 0 ]]; then
    worker_cmd=("${timeout_cmd[@]}" hermes --profile default --yolo --toolsets terminal,file --oneshot "$(cat "$prompt_path")")
  else
    worker_cmd=(hermes --profile default --yolo --toolsets terminal,file --oneshot "$(cat "$prompt_path")")
  fi
  if "${worker_cmd[@]}" >>"$log_path" 2>&1; then
    echo "[$(timestamp)] Hermes worker $worker_name finished" | tee -a "$log_path"
  else
    local code=$?
    echo "[$(timestamp)] Hermes worker $worker_name failed code=$code" | tee -a "$log_path"
    return 0
  fi
}

echo "[$(timestamp)] selected ${#SHARDS[@]} parallel shard(s)" | tee "$SUMMARY_LOG"

pids=()
for shard in "${SHARDS[@]}"; do
  run_worker "$shard" &
  pids+=("$!")
done

for pid in "${pids[@]}"; do
  wait "$pid" || true
done

imported=0
missing=0
for shard in "${SHARDS[@]}"; do
  worker_name="$(basename "$shard" -batch.json)"
  out_json="$OUT_DIR/${worker_name}-candidates.json"
  if [[ -f "$out_json" ]]; then
    if [[ "${MODEL_ATLAS_CASE_HUNTER_IMPORT:-1}" == "0" ]]; then
      echo "{\"ok\":true,\"worker\":\"$worker_name\",\"skipped\":\"import disabled\",\"candidateFile\":\"$out_json\"}" | tee -a "$SUMMARY_LOG"
    else
      python3 "$SITE_DIR/scripts/import-hermes-case-intake.py" "$out_json" | tee -a "$SUMMARY_LOG"
      imported=$((imported + 1))
    fi
  else
    echo "{\"ok\":false,\"worker\":\"$worker_name\",\"error\":\"candidate file not created\"}" | tee -a "$SUMMARY_LOG"
    missing=$((missing + 1))
  fi
done

node - "$STATE_PATH" "${SHARDS[@]}" <<'NODE'
const fs = require("fs");
const [statePath, ...shardPaths] = process.argv.slice(2);
const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, "utf8")) : { attempts: {} };
state.attempts ||= {};
const now = new Date().toISOString();
for (const shardPath of shardPaths) {
  const batch = JSON.parse(fs.readFileSync(shardPath, "utf8"));
  const outPath = shardPath.replace(/-batch\.json$/, "-candidates.json");
  let out = { cases: [] };
  if (fs.existsSync(outPath)) out = JSON.parse(fs.readFileSync(outPath, "utf8"));
  for (const task of batch.tasks) {
    state.attempts[task.taskId] ||= { count: 0 };
    state.attempts[task.taskId].lastFinishedAt = now;
    state.attempts[task.taskId].lastStatus = fs.existsSync(outPath) ? "finished" : "missing_candidates";
    state.attempts[task.taskId].lastCandidateCount = Array.isArray(out.cases) ? out.cases.filter((item) => item.model_id === task.modelId).length : 0;
  }
}
fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
NODE

echo "{\"ok\":true,\"shards\":${#SHARDS[@]},\"importedOutputs\":$imported}" | tee -a "$SUMMARY_LOG"
if (( missing > 0 )); then
  exit 1
fi
