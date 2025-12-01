# Run from project root (C:\Users\ASUS\Desktop\RRnagar-work\frontend)
# Removes UTF-8 BOM (if present), validates JSON and pretty-prints it.
Set-Location "C:\Users\ASUS\Desktop\RRnagar-work\frontend"

$db = ".\db.json"
if (-not (Test-Path $db)) {
  Write-Host "Error: $db not found" -ForegroundColor Red
  exit 1
}

$bak = "$db.bak"
Copy-Item $db $bak -Force
Write-Host "Backed up $db -> $bak"

# Remove UTF-8 BOM bytes if present
try {
  $bytes = [System.IO.File]::ReadAllBytes($db)
  if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    $new = $bytes[3..($bytes.Length - 1)]
    [System.IO.File]::WriteAllBytes($db, $new)
    Write-Host "Removed UTF-8 BOM from $db"
  } else {
    Write-Host "No UTF-8 BOM found"
  }
} catch {
  Write-Host "Failed to inspect/remove BOM: $($_.Exception.Message)" -ForegroundColor Red
  exit 2
}

# Try parsing and pretty-printing the JSON
try {
  $raw = Get-Content $db -Raw -ErrorAction Stop
  $obj  = $raw | ConvertFrom-Json -ErrorAction Stop
  $obj | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $db -Encoding UTF8 -Force
  Write-Host "db.json parsed successfully and was re-written in pretty JSON format."
  exit 0
} catch {
  Write-Host "db.json is still invalid JSON:" -ForegroundColor Red
  Write-Host $($_.Exception.Message)
  Write-Host "`n--- First 400 characters of db.json (for inspection) ---`n"
  try {
    $first = Get-Content $db -Raw
    if ($first.Length -gt 400) { $first = $first.Substring(0,400) + "`n... (truncated)" }
    Write-Host $first
  } catch {
    Write-Host "Could not read file for preview."
  }
  Write-Host "`nA backup was saved to $bak. Open the backup in an editor to inspect stray characters or syntax errors."
  exit 3
}