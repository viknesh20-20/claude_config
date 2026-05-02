# Claude Code Toolkit — bootstrap.ps1
# Detects Node.js >= 18, then exec's install.mjs. Pass-through args.

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Host "Node.js is not installed or not on PATH."
  Write-Host "Install Node 18+ from https://nodejs.org/ and re-run this script."
  exit 1
}

$ver = & node --version
if ($ver -match 'v(\d+)\.') {
  $major = [int]$matches[1]
  if ($major -lt 18) {
    Write-Host "Node $ver is too old. Need Node 18+."
    exit 1
  }
}

& node (Join-Path $here 'install.mjs') @args
exit $LASTEXITCODE
