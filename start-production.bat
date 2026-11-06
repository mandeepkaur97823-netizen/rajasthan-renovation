@echo off
setlocal
title Rajasthan Renovation - Localhost Production Server

echo ======================================================================
echo    Rajasthan Renovation - Localhost Production Server
echo ======================================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

cd /d "%~dp0rajasthan-renovation-and-landscaping-services"

if not exist "node_modules\" (
    echo [INFO] Installing dependencies...
    call npm install
)

if not exist "dist\" (
    echo [INFO] Building production bundle...
    call npm run build
)

echo [INFO] Starting production server on http://localhost:3000...
echo.

start "" http://localhost:3000
call node server.js

pause
