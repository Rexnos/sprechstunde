# Stops the tutor's containers. Your data (database, AI model) is kept in Docker volumes.
#   powershell -ExecutionPolicy Bypass -File scripts/docker-down.ps1
$root = Join-Path $PSScriptRoot ".." | Resolve-Path
Push-Location $root
try { docker compose down }
finally { Pop-Location }
