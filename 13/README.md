## 📖项目简介

本项目是一个信息流社交应用，代号 `FeedApp`。使用 `create-react-app` 脚手架创建工程，使用前后端分离的开发模式。它的前端基于`React`和`TypeScript`实现，服务端基于`Koa` + `MongoDB` + `TypeScript`编写。

### 前端
主要技术栈：
* React 18+
* react-router-dom v6
* Typescript
* Scss

主要工具库：
* axios
* classnames
* customize-cra
* react-app-rewired
* dayjs
* lodash-es
* query-string
* react-easy-crop
* react-intersection-observer
* ahooks

第三方对接：
* ali-oss

UI库：
* antd-mobile

### 服务端

主要技术栈：
* Koa
* Typescript
* MongoDB
* Jest

主要工具库：
* koa-body
* koa-router
* joi
* chalk
* dotenv
* dayjs
* axios

第三方对接：
* ali-oss

## 📱项目原型

[Feed App](https://www.figma.com/file/pyWhKPQfb80YRHjQupNMvK/Feed-App?node-id=6%3A59 )



## 🛠️核心功能

### 帖子

用户可以发布独立的帖子，删除自己的帖子，也可以评论、转发、喜欢别人的帖子。

### 个人中心

用户可以修改自己的个人信息，可以查看自己的帖子以及喜欢的帖子

### 关注

用户可以互相关注，被关注用户的帖子、转发、回复内容会出现在自己的信息流中

### 通知

用户被关注、评论或者转发了帖子，会收到通知，使用轮询方式

### 私信

用户之间可以互发私信，支持单方面删除，使用轮询的方式支持同步通信
## ✅前序准备

- 本地安装`node`，`mongodb`。

- 已开通OSS服务，详情请参见[开通OSS服务](http://www.aliyun.com/product/oss)。

- 已创建RAM用户的AccessKey ID和AccessKey Secret。详情请参见[访问控制](https://help.aliyun.com/product/28625.html?spm=a2c4g.11186623.0.0.1abf68994Z7024)

## ⚙️配置项目

服务端配置说明

```
# 服务端端口
PORT = 3010

# 服务端数据库地址
MONGODB_CONNECT_URL = mongodb://localhost:27017/feedapp

# 阿里云oss配置
ALI_OSS_ACCESS_KEY_ID = xxx
ALI_OSS_ACCESS_KEY_SECRET = xxx

# 阿里云oss role arn
ALI_OSS_ROLE_ARN = xxx

# 阿里云oss bucket 名称
ALI_OSS_BUCKET = xxx

# 微信appid
APP_ID = xxx

# 微信app secret
APP_SECRET = xxx

# 微信授权成功重定向到前端路由地址
REDIRECT_URI = http://[无线局域网ipv4域名 | 127.0.0.1]:[前端项目端口]/login (注意因为微信第三方限制，不能填localhost)
```

## 🚀如何运行

```git
# 克隆项目
git clone https://git.kscampus.io:10443/web-pre-2022-team-tasks/13.git

# 进入前端项目目录并安装依赖
cd .\feed-front\
npm i 

# 进入后端项目目录并安装依赖
cd .\feed-server\
npm i 

# 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务端
cd .\feed-server\
npm run build
npm run serve

# 启动前端
cd .\feed-front\
npm start
```
**微信第三方登录：**
1. 上述步骤完成前或者完成后，需要到[微信公众号沙盒]( https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)登录
2. 在后端`.env`中更改为自己的`APP_ID、APP_SECRET`
3. 接着到JS接口安全域名处修改域名与端口号，该处域名与端口对应服务端的启动域名与端口号，两者需要一致*
4. 接着扫码关注公众号
5. 最后到网页服务的第一项**网页授权获取用户基本信息**处填写微信授权回调地址的域名与端口，注意该处与.env文件中的`REDIRECT_URI`的域名与端口一致（前端域名以及端口，与后端无关）

**PC网页端运行：**

1. 微信客户端授权: 可以再前端项目以及后端服务启动后，使用微信开发者工具打开公众号网页，地址栏输入`http://localhost:3000`进行授权登录。
2. 登录后可以继续在开发者工具运行，也可以打开浏览器输入`http://localhost:3000`，将cookie复制到浏览器后重复第一步继续运行

**手机端运行：**
1. 确保电脑与手机处于同一局域网下。
2. 将后端.env中`REDIRECT_URI`设置为无线局域网ipv4域名地址。
3. 然后打开**微信公众号沙盒**同步该信息至**网页授权获取用户基本信息**处
4. 最后打开微信，使用搜索栏搜索项目地址后选择打开网页即可，格式如`http://局域网地址:前端服务器端口`


