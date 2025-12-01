param(
  [Parameter(Mandatory=$true)]
  [string]$BackupFolder
)

# Resolve and validate paths
$backupRoot = (Resolve-Path -Path $BackupFolder -ErrorAction Stop).Path
$projectRoot = (Get-Location).Path
$ts = Get-Date -Format "yyyyMMdd-HHmmss"

Write-Host "Backup folder:" $backupRoot
Write-Host "Project root:" $projectRoot
Write-Host ""

# 1) Inspect backup contents (top-level and key files)
Write-Host "Files found in backup (top-level):" -ForegroundColor Cyan
Get-ChildItem -Path $backupRoot -Force | Select-Object Name, FullName, Length | Format-Table -AutoSize

Write-Host "`nPreview key files (if present):" -ForegroundColor Cyan
$preview = @(
  "src\pages\Home.jsx",
  "src\pages\Home.css",
  "src\components\Header.jsx",
  "src\components\Header.css",
  "src\components\ProductList.jsx",
  "src\index.css"
)
foreach ($p in $preview) {
  $src = Join-Path $backupRoot $p
  if (Test-Path $src) {
    Write-Host "`n---- $p ----" -ForegroundColor Yellow
    Get-Content -LiteralPath $src -TotalCount 40 -ErrorAction SilentlyContinue
  }
}

Write-Host "`nPREPARING PRE-RESTORE BACKUP..." -ForegroundColor Cyan
$preBak = Join-Path $projectRoot "pre-restore-backup_$ts"
New-Item -ItemType Directory -Path $preBak | Out-Null

# Backup current src/public/package files if they exist
if (Test-Path ".\src") {
  Write-Host "Backing up ./src -> $preBak\src.bak"
  Copy-Item -LiteralPath .\src -Destination (Join-Path $preBak "src.bak") -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path ".\public") {
  Write-Host "Backing up ./public -> $preBak\public.bak"
  Copy-Item -LiteralPath .\public -Destination (Join-Path $preBak "public.bak") -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path ".\package.json") {
  Copy-Item -LiteralPath .\package.json -Destination (Join-Path $preBak "package.json.bak") -Force -ErrorAction SilentlyContinue
}
if (Test-Path ".\yarn.lock") {
  Copy-Item -LiteralPath .\yarn.lock -Destination (Join-Path $preBak "yarn.lock.bak") -Force -ErrorAction SilentlyContinue
}
if (Test-Path ".\package-lock.json") {
  Copy-Item -LiteralPath .\package-lock.json -Destination (Join-Path $preBak "package-lock.json.bak") -Force -ErrorAction SilentlyContinue
}

Write-Host "`nPre-restore backup created at: $preBak" -ForegroundColor Yellow

# 2) Define the minimal set of files/folders to restore (edit this list if you want different files)
$filesToRestore = @(
  "src/pages/Home.jsx",
  "src/pages/Home.css",
  "src/components/Header.jsx",
  "src/components/Header.css",
  "src/components/ProductList.jsx",
  "src/index.css",
  "src/assets/category-icons"
)

Write-Host "`nWill attempt to restore these paths (relative to project root):" -ForegroundColor Cyan
$filesToRestore | ForEach-Object { Write-Host " - $_" }

$restored = @()

# 3) Perform the restore for each path
foreach ($rel in $filesToRestore) {
  $srcPath = Join-Path $backupRoot $rel
  $dstPath = Join-Path $projectRoot $rel

  if (-not (Test-Path $srcPath)) {
    Write-Host "SKIP (not in backup): $rel" -ForegroundColor DarkYellow
    continue
  }

  # Ensure destination directory exists
  $dstDir = Split-Path -Path $dstPath -Parent
  if (-not (Test-Path $dstDir)) {
    New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
  }

  # If destination exists, back it up individually
  if (Test-Path $dstPath) {
    $individualBakDir = Join-Path $preBak "individual-file-backups"
    if (-not (Test-Path $individualBakDir)) { New-Item -ItemType Directory -Path $individualBakDir | Out-Null }
    $safeName = $rel -replace '[\\/:]', '_'
    $bakDst = Join-Path $individualBakDir "$safeName.bak"
    Write-Host "Backing up existing $rel -> $bakDst"
    Copy-Item -LiteralPath $dstPath -Destination $bakDst -Recurse -Force -ErrorAction SilentlyContinue
  }

  Write-Host "Copying $rel from backup -> project"
  Copy-Item -LiteralPath $srcPath -Destination $dstPath -Recurse -Force
  $restored += $rel
}

Write-Host "`nRESTORE SUMMARY" -ForegroundColor Green
if ($restored.Count -gt 0) {
  $restored | ForEach-Object { Write-Host " - Restored: $_" }
} else {
  Write-Host "No files were restored."
}

Write-Host "`nPre-restore backup location: $preBak" -ForegroundColor Yellow
Write-Host "Temporary backup folder (source): $backupRoot" -ForegroundColor Yellow

Write-Host "`nDONE. Next steps:"
Write-Host " 1) Close any running dev server (if open)."
Write-Host " 2) In a separate terminal run: npm run dev"
Write-Host " 3) If package.json was overwritten, run: npm install"