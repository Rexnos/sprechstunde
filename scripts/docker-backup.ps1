# Backs up the tutor's database (progress, vocabulary, sessions, AI content) to backups\.
#   powershell -ExecutionPolicy Bypass -File scripts/docker-backup.ps1
$ErrorActionPreference = "Stop"
$root = Join-Path $PSScriptRoot ".." | Resolve-Path
$dir = Join-Path $root "backups"
New-Item -ItemType Directory -Force $dir | Out-Null
$file = Join-Path $dir ("tutor-" + (Get-Date -Format "yyyy-MM-dd_HHmm") + ".archive.gz")

Push-Location $root
try {
    # Write inside the container, then copy out (avoids PowerShell mangling binary pipes).
    docker compose exec -T mongo mongodump --db local_language_tutor --archive=/tmp/backup.archive.gz --gzip
    if ($LASTEXITCODE -ne 0) { throw "mongodump failed. Is the stack running? (scripts/docker-up.ps1)" }
    $container = (docker compose ps -q mongo).Trim()
    docker cp "${container}:/tmp/backup.archive.gz" $file
    docker compose exec -T mongo rm -f /tmp/backup.archive.gz | Out-Null
    Write-Host "[ok] Backup saved: $file" -ForegroundColor Green
}
finally { Pop-Location }
