<#
Safe cleanup script for a Node/Vite project.
Run from project root (or this script will cd to its folder).

Usage:
  powershell -ExecutionPolicy Bypass -File .\clean-project.ps1
Or to skip the confirmation prompt:
  powershell -ExecutionPolicy Bypass -File .\clean-project.ps1 -Force
#>

param(
  [switch]$Force
)

# Determine project root (folder containing this script)
$ScriptPath = $MyInvocation.MyCommand.Definition
if (-not $ScriptPath) { $ScriptPath = (Get-Location).Path }
$ProjectRoot = Split-Path -Parent $ScriptPath
Set-Location $ProjectRoot

# Timestamp & backup folder
$ts = (Get-Date).ToString("yyyyMMdd-HHmmss")
$backupDir = Join-Path $ProjectRoot "clean-backups\$ts"
New-Item -Path $backupDir -ItemType Directory -Force | Out-Null

# Files to backup
$toBackup = @("db.json","package.json","package-lock.json","yarn.lock","pnpm-lock.yaml",".env")
foreach ($f in $toBackup) {
  if (Test-Path $f) {
    Copy-Item -LiteralPath $f -Destination $backupDir -Force
    Write-Host ("Backed up {0} -> {1}" -f $f, $backupDir) -ForegroundColor Green
  }
}

# Confirm before destructive actions unless Force specified
if (-not $Force) {
  Write-Host "About to remove node_modules and caches. Press ENTER to continue or Ctrl+C to abort." -ForegroundColor Yellow
  Read-Host
}

# Common directories and files to remove
$dirs = @("node_modules", ".vite", "dist", "build", ".cache", ".parcel-cache", "coverage", "public/build")
$files = @("package-lock.json","yarn.lock","pnpm-lock.yaml")
$patterns = @("*.log","*.tmp","*.bak")

# Remove directories
foreach ($d in $dirs) {
  if (Test-Path $d) {
    try {
      Remove-Item -Recurse -Force -LiteralPath $d -ErrorAction Stop
      Write-Host ("Removed directory: {0}" -f $d) -ForegroundColor Cyan
    } catch {
      Write-Host ("Failed to remove {0}: {1}" -f $d, $_.Exception.Message) -ForegroundColor Red
    }
  }
}

# Remove files
foreach ($f in $files) {
  if (Test-Path $f) {
    try {
      Remove-Item -Force -LiteralPath $f
      Write-Host ("Removed file: {0}" -f $f) -ForegroundColor Cyan
    } catch {
      Write-Host ("Failed to remove {0}: {1}" -f $f, $_.Exception.Message) -ForegroundColor Red
    }
  }
}

# Remove by patterns
foreach ($p in $patterns) {
  Get-ChildItem -Path $ProjectRoot -Include $p -File -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
    try {
      Remove-Item -Force -LiteralPath $_.FullName
      Write-Host ("Removed: {0}" -f $_.FullName) -ForegroundColor DarkCyan
    } catch {
      Write-Host ("Failed to remove {0}: {1}" -f $_.FullName, $_.Exception.Message) -ForegroundColor Red
    }
  }
}

Write-Host ""
Write-Host ("Cleanup finished. Backups saved to: {0}" -f $backupDir) -ForegroundColor Green
Write-Host ""
Write-Host "Recommended next steps:"
Write-Host "  1) Reinstall dependencies: npm install"
Write-Host "  2) Start backend: npx json-server --watch db.json --port 5000"
Write-Host "  3) Start frontend: npm run dev (or npx vite --port 5173)"
Write-Host ""
Write-Host "If you want to perform a full repo wipe (removes all untracked files) run:"
Write-Host "  git clean -fdx"
Write-Host "Be careful: git clean -fdx is destructive and cannot be undone!"