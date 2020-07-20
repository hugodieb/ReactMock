#!/bin/bash
#sleep 999999
cd /front

npm run startdb &
API_MOCK=1 PORT=3002 pm2 start scripts/start.js --name "indow_mock"
pm2 logs