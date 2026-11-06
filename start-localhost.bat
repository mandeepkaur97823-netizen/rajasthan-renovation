@echo off
setlocal
title Rajasthan Renovation and Landscaping Services - Localhost

echo ======================================================================
echo    Rajasthan Renovation and Landscaping Services - Localhost Setup
echo ======================================================================
echo.

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    echo After installing Node.js, run this file again.
    echo.
    pause
    exit /b 1
)

:: 2. Navigate to project directory
cd /d "%~dp0rajasthan-renovation-and-landscaping-services"

:: 3. Check if dependencies are installed
if not exist "node_modules\" (
    echo [INFO] First-time setup detected: Installing required dependencies...
    echo This may take a couple of minutes...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Failed to install dependencies. Please check your internet connection.
        pause
        exit /b 1
    )
    echo [INFO] Dependencies installed successfully!
    echo.
)

:: 4. Launch localhost server
echo [INFO] Starting local development server...
echo [INFO] Opening browser at http://localhost:3000...
echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo ======================================================================
echo.

call npm run dev -- --open

pause
