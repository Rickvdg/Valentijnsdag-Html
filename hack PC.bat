@echo off

color a
title HACKED

timeout 2
tree

timeout 4
ipconfig

echo Countdown to application launch...
timeout 4

"C:\Program Files\Google\Chrome\Application\chrome.exe" --chrome --kiosk --start-fullscreen %~dp0/_bin/index.html --incognito --disable-pinch --no-user-gesture-required --overscroll-history-navigation=0
exit