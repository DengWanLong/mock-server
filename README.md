# mock-server
thinkjs 2.2.x + vue ^2.2.6 + vue-router ^2.4.0 + vuex ^2.3.0

## 安装依赖包

```
npm install
```

## 启动服务

```
sudo(Mac下必加否则启动失败) npm run dev
sudo npm run build
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## semantic-ui

```
1.切到 front\libs\semantic-ui 目录 执行gulp build
2.semantic-ui\dist 目录下 css 文件中https://fonts.googleapis.com 替换成
```


## 查找端口并结束进程

```
1.lsof -i tcp:8360 根据端口查找PID
2.kill -9 PID 结束进程
```
