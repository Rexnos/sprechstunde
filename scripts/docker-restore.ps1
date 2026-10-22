# Restores a backup made by docker-backup.ps1. Replaces the current database contents.
#   powershell -ExecutionPolicy Bypass -File scripts/docker-restore.ps1 backups\tutor-2026-10-22_1200.archive.gz
param([Parameter(Mandatory = $true)][string]$Backup)
$ErrorActionPreference = "Stop"
if (-not (Test-Path $Backup)) { throw "Backup file not found: $Backup" }
$root = Join-Path $PSScriptRoot ".." | Resolve-Path

$answer = Read-Host "This replaces all current progress with the backup. Type YES to continue"
if ($answer -ne "YES") { Write-Host "Cancelled."; exit 1 }

Push-Location $root
try {
    $container = (docker compose ps -q mongo).Trim()
    if (-not $container) { throw "The database container isn't running. Start the stack first (scripts/docker-up.ps1)." }
    docker cp (Resolve-Path $Backup) "${container}:/tmp/restore.archive.gz"
    docker compose exec -T mongo mongorestore --archive=/tmp/restore.archive.gz --gzip --drop --nsInclude "local_language_tutor.*"
    if ($LASTEXITCODE -ne 0) { throw "mongorestore failed." }
    docker compose exec -T mongo rm -f /tmp/restore.archive.gz | Out-Null
    Write-Host "[ok] Restored. Restart the app to be safe: docker compose restart app" -ForegroundColor Green
}
finally { Pop-Location }
