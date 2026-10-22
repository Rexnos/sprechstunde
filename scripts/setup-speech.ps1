# One-time setup for the local speech service (faster-whisper + Piper).
# Needs internet once; afterwards everything works offline.
#   powershell -ExecutionPolicy Bypass -File scripts/setup-speech.ps1
param(
    [string]$Python = "3.12",
    [string]$WhisperModel = "small",
    [string]$Voice = "de_DE-thorsten-medium"
)
$ErrorActionPreference = "Stop"
$dir = Join-Path $PSScriptRoot "..\python\speech-service" | Resolve-Path
Push-Location $dir
try {
    if (-not (Test-Path ".venv")) {
        Write-Host "Creating Python $Python virtual environment..."
        py -$Python -m venv .venv
    }
    $py = ".\.venv\Scripts\python.exe"
    & $py -m pip install --upgrade pip
    & $py -m pip install -r requirements.txt

    Write-Host "Downloading Piper voice $Voice..."
    & $py -m piper.download_voices $Voice --data-dir voices

    Write-Host "Downloading Whisper model '$WhisperModel'..."
    & $py -c "from faster_whisper import WhisperModel; WhisperModel('$WhisperModel', device='cpu', compute_type='int8', download_root='models')"

    Write-Host "Speech service ready. Start it with scripts/start-speech.ps1" -ForegroundColor Green
}
finally { Pop-Location }
