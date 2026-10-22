# Starts the local speech service on 127.0.0.1:8001 (never exposed to the LAN).
#   powershell -ExecutionPolicy Bypass -File scripts/start-speech.ps1
param(
    [int]$Port = 8001,
    [string]$WhisperModel = "small",
    [ValidateSet("cpu", "cuda", "auto")][string]$Device = "auto"
)
$ErrorActionPreference = "Stop"
$dir = Join-Path $PSScriptRoot "..\python\speech-service" | Resolve-Path
$py = Join-Path $dir ".venv\Scripts\python.exe"
if (-not (Test-Path $py)) { throw "Python environment missing. Run scripts/setup-speech.ps1 first." }

$inUse = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($inUse) {
    $proc = Get-Process -Id $inUse[0].OwningProcess -ErrorAction SilentlyContinue
    try { $health = Invoke-RestMethod -TimeoutSec 3 "http://127.0.0.1:$Port/health" } catch { $health = $null }
    if ($health) {
        Write-Host "The speech service is already running on 127.0.0.1:$Port (process $($proc.Id)). Nothing to do." -ForegroundColor Green
    } else {
        Write-Warning "Port $Port is used by another program: $($proc.ProcessName) (PID $($proc.Id)). Stop it or use -Port <other> and update SPEECH_SERVICE_URL in .env.local."
    }
    exit 0
}

$env:WHISPER_MODEL = $WhisperModel
$env:WHISPER_DEVICE = $Device
# "auto" tries the GPU (CUDA) first and falls back to the CPU; see /health for the result.
$env:WHISPER_COMPUTE_TYPE = ""

Push-Location $dir
try { & $py -m uvicorn app:app --host 127.0.0.1 --port $Port }
finally { Pop-Location }
