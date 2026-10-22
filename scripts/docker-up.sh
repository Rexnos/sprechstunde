#!/usr/bin/env bash
# Builds and starts the tutor in Docker on macOS or Linux, choosing the best setup.
#   ./scripts/docker-up.sh                 # detect automatically
#   ./scripts/docker-up.sh nvidia          # NVIDIA GPU in Docker (Linux + NVIDIA Container Toolkit)
#   ./scripts/docker-up.sh amd             # AMD GPU via ROCm (Linux)
#   ./scripts/docker-up.sh host-ollama     # use the Ollama app on this machine (best on Macs)
#   ./scripts/docker-up.sh cpu             # no GPU
set -euo pipefail
cd "$(dirname "$0")/.."
mode="${1:-auto}"

env_value() { # name default
  if [[ -f .env ]] && grep -q "^$1=" .env; then grep "^$1=" .env | head -1 | cut -d= -f2-; else echo "$2"; fi
}
host_ollama() { curl -fsS -m 3 http://localhost:11434/api/tags >/dev/null 2>&1; }

docker info >/dev/null 2>&1 || { echo "Docker is not running. Start Docker and try again." >&2; exit 1; }

if [[ "$mode" == "auto" ]]; then
  echo "Detecting hardware..."
  if [[ "$(uname -s)" == "Darwin" ]]; then
    # Docker on macOS can't use the Apple GPU; the native Ollama app can (Metal).
    if host_ollama; then mode="host-ollama"; else mode="cpu"; fi
  elif docker run --rm --gpus all ubuntu:24.04 nvidia-smi -L >/dev/null 2>&1; then
    mode="nvidia"
  elif [[ -e /dev/kfd ]]; then
    mode="amd"
  elif host_ollama; then
    mode="host-ollama"
  else
    mode="cpu"
  fi
fi

model="$(env_value OLLAMA_MODEL qwen3.5:4b)"
files=(-f docker-compose.yml)
case "$mode" in
  nvidia) echo "[mode] NVIDIA GPU in Docker"; files+=(-f docker-compose.nvidia.yml) ;;
  amd) echo "[mode] AMD GPU (ROCm) in Docker"; files+=(-f docker-compose.amd.yml) ;;
  host-ollama)
    echo "[mode] Using the Ollama app on this machine"
    host_ollama || { echo "Ollama isn't reachable on localhost:11434. Install it from https://ollama.com and start it." >&2; exit 1; }
    if command -v ollama >/dev/null && ! ollama list | grep -q "^$model"; then echo "Downloading $model..."; ollama pull "$model"; fi
    if [[ "$(uname -s)" == "Linux" ]]; then
      echo "Note: on Linux, start Ollama with OLLAMA_HOST=172.17.0.1:11434 so containers can reach it."
    fi
    files+=(-f docker-compose.host-ollama.yml) ;;
  cpu)
    echo "[mode] CPU only. Replies will be slow."
    if [[ "$(uname -s)" == "Darwin" ]]; then
      echo "  Tip: install the Ollama app (https://ollama.com) to use the Mac's GPU, then rerun this script."
    fi
    echo "  On a slow machine set OLLAMA_MODEL=gemma3:1b and WHISPER_MODEL=base in .env." ;;
  *) echo "Unknown mode: $mode (auto|nvidia|amd|host-ollama|cpu)" >&2; exit 1 ;;
esac

echo "Building and starting containers (the first run downloads several GB)..."
docker compose "${files[@]}" up -d --build

port="$(env_value APP_PORT 3000)"
echo "Waiting for the app on http://localhost:$port ..."
for _ in $(seq 1 120); do
  if curl -fsS -m 5 "http://localhost:$port/api/health" >/dev/null 2>&1; then
    echo "[ok] Running in '$mode' mode: http://localhost:$port"
    [[ "$mode" != "host-ollama" ]] && echo "On first start the AI model may still be downloading: docker compose logs -f ollama-init"
    exit 0
  fi
  sleep 3
done
echo "The app didn't come up. Check: docker compose ps   and   docker compose logs app" >&2
exit 1
