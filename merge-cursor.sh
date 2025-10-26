#!/bin/bash
set -e

BRANCH_MAIN="main"
BRANCH_CURSOR="cursor-4cfd"
MESSAGE="merge cursor agent updates (UI + Web3 + ENS improvements)"

echo "🐾  merging Cursor branch into main..."

git checkout "$BRANCH_MAIN"
git pull origin "$BRANCH_MAIN"
git merge "$BRANCH_CURSOR" --no-ff -m "$MESSAGE"
git push origin "$BRANCH_MAIN"

echo "🧹  cleaning up local/remote Cursor branch..."
git branch -d "$BRANCH_CURSOR" || true
git push origin --delete "cursor/review-and-improve-microscalers-drop-components-4cfd" || true

echo "🏷️  tagging release..."
git tag -a v0.2.0 -m "Cursor-powered UI+Web3 refactor"
git push origin v0.2.0

echo "✅  Merge complete & pushed! Cloudflare build will trigger if configured."
