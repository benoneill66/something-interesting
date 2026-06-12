#!/usr/bin/env bash
# Register a freshly-written article in the manifest and push it live in one step.
#
# Prereq: you've already written the article page to docs/<slug>.html
#
# Usage:
#   tools/publish.sh \
#     --title "The Antikythera Mechanism" \
#     --category "History" \
#     --teaser "A 2,000-year-old hand-cranked computer pulled from a shipwreck." \
#     --file "docs/antikythera-mechanism.html"
#
# It updates docs/manifest.json (dedupes by --file), commits, and pushes.
# GitHub Pages redeploys automatically in ~1-2 min.

set -euo pipefail
cd "$(dirname "$0")/.."

# pull --file and --title out of the args just for a nice commit message
file=""; title=""
args=("$@")
for ((i=0; i<${#args[@]}; i++)); do
  case "${args[$i]}" in
    --file)  file="${args[$((i+1))]}" ;;
    --title) title="${args[$((i+1))]}" ;;
  esac
done

if [[ -z "$file" ]]; then echo "Error: --file is required" >&2; exit 1; fi
if [[ ! -f "$file" ]]; then echo "Error: $file does not exist — write the article page first" >&2; exit 1; fi

node tools/add-article.mjs "$@"

git add -A
git commit -q -m "Add article: ${title:-$file}" || { echo "Nothing to commit."; exit 0; }
git push -q origin main
echo "Published \"${title:-$file}\" → https://benoneill66.github.io/something-interesting/"
