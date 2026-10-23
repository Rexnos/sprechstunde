#!/usr/bin/env bash
# Imports the German Wiktionary dictionary into the Docker stack's database.
# Needs Node.js and `npm install` on this machine (for the converter). Download the file first, see README.
#   ./scripts/docker-dictionary.sh data/kaikki.org-dictionary-German.jsonl
set -euo pipefail
source="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
cd "$(dirname "$0")/.."
container="$(docker compose ps -q mongo)"
[ -n "$container" ] || { echo "The database container isn't running. Start the stack first (scripts/docker-up.sh)." >&2; exit 1; }
mkdir -p data
out="data/dictionary.ndjson"
npm run --silent dict:import -- "$source" --out "$out"
docker cp "$out" "$container":/tmp/dictionary.ndjson
docker compose exec -T mongo mongoimport --db local_language_tutor --collection dictionary --drop --file /tmp/dictionary.ndjson --numInsertionWorkers 4
docker compose exec -T mongo rm -f /tmp/dictionary.ndjson
rm -f "$out"
# The app builds the search indexes on its next start.
docker compose restart app >/dev/null
echo "[ok] Dictionary imported. Open the Dictionary page in the app."
