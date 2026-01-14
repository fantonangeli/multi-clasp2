#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
CLASP_BIN="$ROOT_DIR/node_modules/.bin/clasp"

cd "$ROOT_DIR"

create_script() {
  local title="$1"
  local tmp
  tmp=$(mktemp -d)
  cp -R "$ROOT_DIR/scripts_src/." "$tmp/"
  ( cd "$tmp" && "$CLASP_BIN" create --type standalone --title "$title" --rootDir . >/dev/null )
  local clasp_file="$tmp/.clasp.json"
  local script_id
  script_id=$(jq -r '.scriptId' "$clasp_file")
  rm -rf "$tmp"
  printf '%s\n' "$script_id"
}

SCRIPT_A=$(create_script "multi-clasp smoke A")
SCRIPT_B=$(create_script "multi-clasp smoke B")

jq -n --arg scriptA "$SCRIPT_A" --arg scriptB "$SCRIPT_B" '[
  { scriptId: $scriptA, rootDir: "scripts_src" },
  { scriptId: $scriptB, rootDir: "scripts_src" }
]' > .multi-clasp.json

export PS4=$'----------------------------------------------------------------------------------------------------\n+ '"${BASH_SOURCE}: "
set -x

node ./build/src/index.js push --force
node ./build/src/index.js show-file-status
node ./build/src/index.js version "smoke test"
node ./build/src/index.js versions
# node ./build/src/index.js deploy --versionNumber 1 --description "smoke test"
# node ./build/src/index.js list-deployments
# node ./build/src/index.js undeploy --all 
# node ./build/src/index.js run testSum 5 4 
node ./build/src/index.js open-script 
node ./build/src/index.js open-web-app 
node ./build/src/index.js open-container 
