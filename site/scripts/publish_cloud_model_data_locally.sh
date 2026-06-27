#!/usr/bin/env bash
set -euo pipefail

# Pull generated Model Atlas data from the cloud repo, then commit and push
# from the local machine. This avoids flaky cloud-to-GitHub connectivity.

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
REPO_DIR="${MODEL_ATLAS_REPO_DIR:-$(cd "$SITE_DIR/.." && pwd)}"
CLOUD_USER="${MODEL_ATLAS_CLOUD_USER:-ubuntu}"
CLOUD_HOST="${MODEL_ATLAS_CLOUD_HOST:-124.221.3.41}"
CLOUD_REPO_DIR="${MODEL_ATLAS_CLOUD_REPO_DIR:-/home/ubuntu/.hermes/data/model_atlas_repo}"

ssh_base=(ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o ConnectTimeout=10 -o ServerAliveInterval=10 -o ServerAliveCountMax=2 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null)
if [[ -n "${SSHPASS:-}" ]] && command -v sshpass >/dev/null 2>&1; then
  ssh_base=(sshpass -e "${ssh_base[@]}")
fi

tmp_tar="$(mktemp "${TMPDIR:-/tmp}/model-atlas-cloud-data.XXXXXX.tgz")"
trap 'rm -f "$tmp_tar"' EXIT

"${ssh_base[@]}" "$CLOUD_USER@$CLOUD_HOST" "cd '$CLOUD_REPO_DIR' && tar -czf - site/src/data site/package.json site/package-lock.json work/evidence-backfill-intake.tsv work/hermes-model-case-tasks.json outputs/evidence-backfill-full-plan.md outputs/hermes-feishu-automation.md" >"$tmp_tar"

(
  cd "$REPO_DIR"
  git restore --staged --worktree -- work/hermes-model-case-tasks.json work/evidence-backfill-intake.tsv outputs/evidence-backfill-full-plan.md site/src/data/evidenceBackfill.json >/dev/null 2>&1 || true
  git pull --rebase --autostash origin main
  tar -xzf "$tmp_tar" -C "$REPO_DIR"
  git add site/src/data site/package.json site/package-lock.json work/evidence-backfill-intake.tsv work/hermes-model-case-tasks.json outputs/evidence-backfill-full-plan.md outputs/hermes-feishu-automation.md
  if git diff --cached --quiet; then
    echo '{"ok":true,"changed":false}'
  else
    git commit -m "chore: sync Model Atlas case data"
    git push origin main
    echo '{"ok":true,"changed":true}'
  fi
)
