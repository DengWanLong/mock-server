# mock-server
thinkjs 2.2.x + vue ^2.2.6 + vue-router ^2.4.0 + vuex ^2.3.0

## 安装依赖包

```
npm install
```

## 启动服务

开发环境
```
sudo(Mac下必加否则启动失败) npm run dev
```
http://127.0.0.1/#/

编译代码
```
sudo npm run build
```

启动thinkjs服务
```
npm start
```
http://127.0.0.1:8360/#/

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

## 项目目录解释

```
app             thinkjs编译文件
front           前端目录
src             thinkjs开发文件
view            thinkjs前端页面
www             静态资源目录
```


## 查找端口并结束进程

```
1.sudo lsof -i tcp:8360 根据端口查找PID
2.sudo kill -9 PID 结束进程
```
