# Builds and starts the tutor in Docker, choosing the best setup for this PC.
#   powershell -ExecutionPolicy Bypass -File scripts/docker-up.ps1                    # detect automatically
#   powershell -ExecutionPolicy Bypass -File scripts/docker-up.ps1 -Mode nvidia       # NVIDIA GPU in Docker
#   powershell -ExecutionPolicy Bypass -File scripts/docker-up.ps1 -Mode host-ollama  # use the Ollama app on this PC
#   powershell -ExecutionPolicy Bypass -File scripts/docker-up.ps1 -Mode cpu          # no GPU
# (AMD GPUs can't be used from Docker on Windows: install the Ollama app, then use -Mode host-ollama.)
param([ValidateSet("auto", "nvidia", "host-ollama", "cpu")][string]$Mode = "auto")
$ErrorActionPreference = "Stop"
$root = Join-Path $PSScriptRoot ".." | Resolve-Path
Push-Location $root

function Test-HostOllama {
    try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 3 "http://localhost:11434/api/tags" | Out-Null; return $true } catch { return $false }
}
function Get-EnvValue([string]$name, [string]$default) {
    if (Test-Path ".env") {
        $line = Select-String -Path ".env" -Pattern "^$name=(.+)$" | Select-Object -First 1
        if ($line) { return $line.Matches[0].Groups[1].Value.Trim() }
    }
    return $default
}

try {
    docker info *> $null
    if ($LASTEXITCODE -ne 0) { throw "Docker is not running. Start Docker Desktop and try again." }

    if ($Mode -eq "auto") {
        Write-Host "Detecting hardware..."
        docker run --rm --gpus all ubuntu:24.04 nvidia-smi -L *> $null
        if ($LASTEXITCODE -eq 0) { $Mode = "nvidia" }
        elseif (Test-HostOllama) { $Mode = "host-ollama" }
        else { $Mode = "cpu" }
    }

    $model = Get-EnvValue "OLLAMA_MODEL" "qwen3.5:4b"
    $files = @("-f", "docker-compose.yml")
    switch ($Mode) {
        "nvidia" {
            Write-Host "[mode] NVIDIA GPU in Docker" -ForegroundColor Green
            $files += @("-f", "docker-compose.nvidia.yml")
        }
        "host-ollama" {
            Write-Host "[mode] Using the Ollama app on this PC (it uses your GPU directly)" -ForegroundColor Green
            if (-not (Test-HostOllama)) { throw "Ollama isn't running on this PC. Install it from https://ollama.com and start it, or use -Mode cpu." }
            if (Get-Command ollama -ErrorAction SilentlyContinue) {
                $installed = ollama list | Select-String -SimpleMatch $model
                if (-not $installed) { Write-Host "Downloading $model into the Ollama app..."; ollama pull $model }
            } else {
                Write-Warning "Make sure the model is installed in the Ollama app: ollama pull $model"
            }
            $files += @("-f", "docker-compose.host-ollama.yml")
        }
        "cpu" {
            Write-Host "[mode] CPU only" -ForegroundColor Yellow
            Write-Warning ("No GPU available to Docker, so the AI runs on the CPU and replies will be slow. " +
                "For an AMD or Intel GPU, install the Ollama app (https://ollama.com) and rerun with -Mode host-ollama. " +
                "On a slow PC, a smaller model helps: set OLLAMA_MODEL=gemma3:1b and WHISPER_MODEL=base in .env.")
        }
    }

    Write-Host "Building and starting containers (the first run downloads several GB)..." -ForegroundColor Cyan
    docker compose @files up -d --build
    if ($LASTEXITCODE -ne 0) { throw "docker compose failed." }

    $port = [int](Get-EnvValue "APP_PORT" "3000")
    Write-Host "Waiting for the app on http://localhost:$port ..."
    $ok = $false
    for ($i = 0; $i -lt 120; $i++) {
        try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 5 "http://localhost:$port/api/health" | Out-Null; $ok = $true; break } catch { Start-Sleep 3 }
    }
    if (-not $ok) { throw "The app didn't come up. Check: docker compose ps   and   docker compose logs app" }

    Write-Host "[ok] Running in '$Mode' mode." -ForegroundColor Green
    if ($Mode -ne "host-ollama") { Write-Host "On first start the AI model may still be downloading: docker compose logs -f ollama-init" }
    Start-Process "http://localhost:$port/status"
}
finally { Pop-Location }
