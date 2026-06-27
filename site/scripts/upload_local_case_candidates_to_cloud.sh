#!/usr/bin/env bash
set -euo pipefail

# Upload locally gathered candidate JSON files to the cloud importer.
# This does not run Hermes on the cloud; it only imports candidates, syncs,
# builds, and optionally pushes the generated site data.

export HOME="${HOME:-$(cd ~ && pwd)}"
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

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
LOCAL_OUT_DIR="${MODEL_ATLAS_CASE_HUNTER_OUT_DIR:-$PROFILE/data/model_atlas_case_candidates}"
STATE_DIR="${MODEL_ATLAS_STATE_DIR:-$PROFILE/state}"
UPLOADED_STATE="${MODEL_ATLAS_LOCAL_UPLOAD_STATE:-$STATE_DIR/model_atlas_uploaded_candidates.txt}"
CLOUD_USER="${MODEL_ATLAS_CLOUD_USER:-ubuntu}"
CLOUD_HOST="${MODEL_ATLAS_CLOUD_HOST:-124.221.3.41}"
CLOUD_REPO_DIR="${MODEL_ATLAS_CLOUD_REPO_DIR:-/home/ubuntu/.hermes/data/model_atlas_repo}"
CLOUD_IMPORT_DIR="${MODEL_ATLAS_CLOUD_IMPORT_DIR:-/home/ubuntu/.hermes/data/model_atlas_case_candidates/local-upload}"

mkdir -p "$STATE_DIR"
touch "$UPLOADED_STATE"

map_candidates() {
  find "$LOCAL_OUT_DIR" -maxdepth 1 -type f -name '*-candidates.json' -size +2c -print | sort
}

new_files=()
while IFS= read -r file; do
  [[ -n "$file" ]] || continue
  name="$(basename "$file")"
  if ! grep -Fxq "$name" "$UPLOADED_STATE"; then
    new_files+=("$file")
  fi
done < <(map_candidates)

if [[ "${#new_files[@]}" == "0" ]]; then
  echo '{"ok":true,"uploaded":0,"skipped":"no new local candidate files"}'
  exit 0
fi

ssh_base=(ssh -o ServerAliveInterval=20 -o ServerAliveCountMax=3 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null)
scp_base=(scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null)
if [[ -n "${SSHPASS:-}" ]] && command -v sshpass >/dev/null 2>&1; then
  ssh_base=(sshpass -e "${ssh_base[@]}")
  scp_base=(sshpass -e "${scp_base[@]}")
fi

"${ssh_base[@]}" "$CLOUD_USER@$CLOUD_HOST" "mkdir -p '$CLOUD_IMPORT_DIR'"
"${scp_base[@]}" "${new_files[@]}" "$CLOUD_USER@$CLOUD_HOST:$CLOUD_IMPORT_DIR/"

remote_files=()
for file in "${new_files[@]}"; do
  name="$(basename "$file")"
  remote_files+=("$CLOUD_IMPORT_DIR/$name")
done

remote_list=""
for file in "${remote_files[@]}"; do
  remote_list+="'$file' "
done

"${ssh_base[@]}" "$CLOUD_USER@$CLOUD_HOST" "set -euo pipefail
export HOME=/home/ubuntu
export LARK_CLI_HOME=/home/ubuntu/.lark-cli
export PATH=\"\$HOME/.local/bin:\$HOME/.hermes/node/bin:\$HOME/node-v24/bin:\$HOME/node-v22/bin:\$HOME/bin:/usr/local/bin:/usr/bin:/bin:\$PATH\"
cd '$CLOUD_REPO_DIR/site'
import_failed=0
for file in $remote_list; do
  if command -v timeout >/dev/null 2>&1; then
    timeout \"\${MODEL_ATLAS_IMPORT_FILE_TIMEOUT_SECONDS:-240}\" python3 scripts/import-hermes-case-intake.py \"\$file\" || import_failed=1
  else
    python3 scripts/import-hermes-case-intake.py \"\$file\" || import_failed=1
  fi
done
npm run sync:feishu
npm run evidence:backfill
npm run hermes:tasks
npm run build
if [[ \"\${MODEL_ATLAS_PUSH_TO_GITHUB:-1}\" != \"0\" ]]; then
  python3 scripts/push_model_atlas_site_to_github.py --repo-dir '$CLOUD_REPO_DIR'
fi
exit \"\$import_failed\""

for file in "${new_files[@]}"; do
  basename "$file" >>"$UPLOADED_STATE"
done

printf '{"ok":true,"uploaded":%s}\\n' "${#new_files[@]}"
