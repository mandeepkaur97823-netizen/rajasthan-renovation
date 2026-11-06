# PowerShell script to run the Rajasthan Renovation localhost server
$ErrorActionPreference = "Stop"

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "   Rajasthan Renovation and Landscaping Services - Localhost Server   " -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node -v
    Write-Host "[INFO] Detected Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please download Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit..."
    exit 1
}

$projectDir = Join-Path $PSScriptRoot "rajasthan-renovation-and-landscaping-services"
Set-Location $projectDir

# Check node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "[INFO] Starting dev server on http://localhost:3000..." -ForegroundColor Green
npm run dev -- --open
