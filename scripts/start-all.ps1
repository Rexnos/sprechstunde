# Checks dependencies and starts the services in order:
#   MongoDB -> Ollama -> speech service -> Next.js
#   powershell -ExecutionPolicy Bypass -File scripts/start-all.ps1
# Everything binds to 127.0.0.1; nothing is exposed to the network.
$ErrorActionPreference = "Continue"
$root = Join-Path $PSScriptRoot ".." | Resolve-Path

function Test-Port([int]$Port) {
    try { $c = New-Object Net.Sockets.TcpClient; $c.Connect("127.0.0.1", $Port); $c.Close(); return $true } catch { return $false }
}
function Wait-Port([int]$Port, [int]$Seconds = 30) {
    for ($i = 0; $i -lt $Seconds; $i++) { if (Test-Port $Port) { return $true }; Start-Sleep 1 }
    return $false
}

# 1. MongoDB
if (Test-Port 27017) { Write-Host "[ok] MongoDB is running" -ForegroundColor Green }
else {
    $svc = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
    if ($svc) {
        Write-Host "Starting MongoDB service (may need an admin shell)..."
        try { Start-Service MongoDB } catch { Write-Warning "Could not start MongoDB: $_" }
    } else { Write-Warning "MongoDB service not found. Install MongoDB Community Server (see README)." }
}

# 2. Ollama
if (Test-Port 11434) { Write-Host "[ok] Ollama is running" -ForegroundColor Green }
elseif (Get-Command ollama -ErrorAction SilentlyContinue) {
    Write-Host "Starting Ollama..."
    $env:OLLAMA_HOST = "127.0.0.1:11434"
    Start-Process ollama -ArgumentList "serve" -WindowStyle Hidden
    if (-not (Wait-Port 11434)) { Write-Warning "Ollama did not start." }
} else { Write-Warning "Ollama is not installed. Install it from https://ollama.com (see README)." }

# 3. Speech service
if (Test-Port 8001) { Write-Host "[ok] Speech service is running" -ForegroundColor Green }
elseif (Test-Path (Join-Path $root "python\speech-service\.venv")) {
    Write-Host "Starting speech service in a new window..."
    Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", (Join-Path $root "scripts\start-speech.ps1")
    if (-not (Wait-Port 8001 60)) { Write-Warning "Speech service did not start; check its window." }
} else { Write-Warning "Speech service not set up. Run scripts/setup-speech.ps1." }

# 4. Next.js
Write-Host "Starting the app on http://127.0.0.1:3000 ..." -ForegroundColor Cyan
Push-Location $root
try { npm run dev }
finally { Pop-Location }
