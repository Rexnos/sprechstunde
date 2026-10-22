#!/usr/bin/env bash
# Stops the tutor's containers. Your data (database, AI model) is kept in Docker volumes.
set -euo pipefail
cd "$(dirname "$0")/.."
docker compose down
