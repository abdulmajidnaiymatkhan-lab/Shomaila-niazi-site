#!/bin/bash
# Fetches an Instagram reel's real cover image without login or an API key.
#
# How it works: Instagram still server-renders an <meta property="og:image">
# tag on a reel's public page (for link-preview crawlers), even though the
# old public oEmbed/__a=1 JSON endpoints are gone. This script fetches that
# page with a mobile user agent, pulls the og:image URL out, and downloads
# it. The downloaded file is a normal static JPEG with no expiry — but the
# CDN URL in og:image itself is signed and expires, so don't store or
# hotlink that URL directly; always download the file.
#
# Usage:
#   scripts/fetch-ig-thumbnail.sh <shortcode> <output-path.jpg>
#
# Example:
#   scripts/fetch-ig-thumbnail.sh Ddl-4Kzt-i9 public/images/connect/reel-connect-1.jpg
#
# The shortcode is the id in instagram.com/reel/<shortcode>/.

set -euo pipefail

SHORTCODE="${1:?Usage: fetch-ig-thumbnail.sh <shortcode> <output-path.jpg>}"
OUT="${2:?Usage: fetch-ig-thumbnail.sh <shortcode> <output-path.jpg>}"

UA="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"

TMP_HTML="$(mktemp)"
trap 'rm -f "$TMP_HTML"' EXIT

curl -sS -A "$UA" "https://www.instagram.com/reel/${SHORTCODE}/" -o "$TMP_HTML"

RAW=$(grep -o 'og:image" content="[^"]*"' "$TMP_HTML" | head -1 | sed -E 's/og:image" content="//; s/"$//')
if [ -z "$RAW" ]; then
  echo "No og:image found for reel ${SHORTCODE} — Instagram may have changed its page markup, or the reel is private/removed." >&2
  exit 1
fi

IMG_URL=$(python3 -c "import html,sys; print(html.unescape(sys.argv[1]))" "$RAW")

mkdir -p "$(dirname "$OUT")"
curl -sS -A "$UA" "$IMG_URL" -o "$OUT"

echo "Saved ${SHORTCODE} -> ${OUT}"
