@echo off
chcp 65001 >nul
title 资产账本 PRO · 本地测试服务器

echo ════════════════════════════════════════
echo   资产账本 PRO - 本地测试服务器
echo ════════════════════════════════════════
echo.
echo 使用方式:
echo   1. 双击 my_assets_v4_local.html（直接浏览器打开）
echo      或输入: start my_assets_v4_local.html
echo.
echo   2. 如需 HTTP 服务器（推荐，部分功能更稳定）:
echo      确保安装了 Python，然后:
echo      python -m http.server 8080
echo      访问 http://localhost:8080/my_assets_v4_local.html
echo.
echo ════════════════════════════════════════
echo.
echo 按任意键用浏览器打开本地文件...
pause >nul

start "" "my_assets_v4_local.html"
