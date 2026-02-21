#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# ── Rules → .cursor/rules/ ──────────────────────────────────────────
RULES_SRC="$PROJECT_ROOT/Rules"
CURSOR_RULES="$PROJECT_ROOT/.cursor/rules"

mkdir -p "$CURSOR_RULES"

if [ -d "$RULES_SRC" ]; then
  # Remove stale symlinks
  find "$CURSOR_RULES" -maxdepth 1 -type l | while read -r link; do
    target="$(readlink "$link" 2>/dev/null || true)"
    if [ ! -e "$target" ]; then
      echo "  removing stale link: $(basename "$link")"
      rm "$link"
    fi
  done

  # Create missing symlinks
  for src_file in "$RULES_SRC"/*.mdc; do
    [ -e "$src_file" ] || continue
    name="$(basename "$src_file")"
    dest="$CURSOR_RULES/$name"
    if [ ! -e "$dest" ]; then
      ln -s "$src_file" "$dest"
      echo "  linked: Rules/$name → .cursor/rules/$name"
    fi
  done
fi

echo "Sync complete."
