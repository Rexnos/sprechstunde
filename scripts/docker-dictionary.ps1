# Imports the German Wiktionary dictionary into the Docker stack's database.
# Needs Node.js and `npm install` on this PC (for the converter). Download the file first, see README.
#   powershell -ExecutionPolicy Bypass -File scripts/docker-dictionary.ps1 data\kaikki.org-dictionary-German.jsonl
param([Parameter(Mandatory = $true)][string]$Source)
$ErrorActionPreference = "Stop"
if (-not (Test-Path $Source)) { throw "File not found: $Source" }
$root = Join-Path $PSScriptRoot ".." | Resolve-Path
$source = Resolve-Path $Source

Push-Location $root
try {
    $container = (docker compose ps -q mongo).Trim()
    if (-not $container) { throw "The database container isn't running. Start the stack first (scripts/docker-up.ps1)." }
    New-Item -ItemType Directory -Force (Join-Path $root "data") | Out-Null
    $out = Join-Path $root "data\dictionary.ndjson"
    npm run --silent dict:import -- $source --out $out
    if ($LASTEXITCODE -ne 0) { throw "Converting the dictionary failed." }
    docker cp $out "${container}:/tmp/dictionary.ndjson"
    docker compose exec -T mongo mongoimport --db local_language_tutor --collection dictionary --drop --file /tmp/dictionary.ndjson --numInsertionWorkers 4
    if ($LASTEXITCODE -ne 0) { throw "mongoimport failed." }
    docker compose exec -T mongo rm -f /tmp/dictionary.ndjson | Out-Null
    Remove-Item $out
    # The app builds the search indexes on its next start.
    docker compose restart app | Out-Null
    Write-Host "[ok] Dictionary imported. Open the Dictionary page in the app." -ForegroundColor Green
}
finally { Pop-Location }
