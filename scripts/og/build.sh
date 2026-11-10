#!/bin/sh
# Renders scripts/og/card.html to public/og.jpg (1200 × 630), the social preview image.
# Re-run after changing the headshot or the card: sh scripts/og/build.sh
set -e
cd "$(dirname "$0")/../.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=3000 \
  --screenshot="$TMP/og.png" "file://$PWD/scripts/og/card.html" >/dev/null 2>&1
sips -s format jpeg -s formatOptions 88 "$TMP/og.png" --out public/og.jpg >/dev/null
rm -rf "$TMP"
sips -g pixelWidth -g pixelHeight public/og.jpg
