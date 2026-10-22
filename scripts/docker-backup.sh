#!/usr/bin/env bash
# Backs up the tutor's database to backups/.  Restore:
#   docker cp backups/<file> "$(docker compose ps -q mongo)":/tmp/r.gz && \
#   docker compose exec -T mongo mongorestore --archive=/tmp/r.gz --gzip --drop --nsInclude "local_language_tutor.*"
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p backups
file="backups/tutor-$(date +%Y-%m-%d_%H%M).archive.gz"
docker compose exec -T mongo mongodump --db local_language_tutor --archive=/tmp/backup.archive.gz --gzip
docker cp "$(docker compose ps -q mongo)":/tmp/backup.archive.gz "$file"
docker compose exec -T mongo rm -f /tmp/backup.archive.gz
echo "[ok] Backup saved: $file"
