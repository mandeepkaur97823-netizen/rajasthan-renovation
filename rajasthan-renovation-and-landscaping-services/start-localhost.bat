@echo off
setlocal
title Rajasthan Renovation and Landscaping Services - Localhost

echo ======================================================================
echo    Rajasthan Renovation and Landscaping Services - Localhost Server
echo ======================================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

cd /d "%~dp0"

if not exist "node_modules\" (
    echo [INFO] Installing required dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo [INFO] Starting local development server...
echo [INFO] Opening browser at http://localhost:3000...
echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo ======================================================================
echo.

call npm run dev -- --open

pause
