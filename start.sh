
git pull
npm i
pm2 delete wechat-node
pm2 start processes.json
tailf logs/reqlog/output.log