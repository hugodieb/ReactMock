#!/bin/bash
cd /app/frontend
pm2 start process-config.json
#pm2 start node_modules/react-scripts/scripts/start.js --name "server-mock"
# pm2 start node_modules/nuxt/bin/nuxt-start -i 2 --name=nuxt -l /tmp/nuxt.log
