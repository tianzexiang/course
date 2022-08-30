# 团队任务

本次任务是一个综合性更强的项目，需要小组分工配合来完成，目标是通过三周的时间来完成一个信息流社交应用，代号 `FeedApp`，具体的产品原型参考：

[https://www.figma.com/file/pyWhKPQfb80YRHjQupNMvK/Feed-App?node-id=0%3A1](https://www.figma.com/file/pyWhKPQfb80YRHjQupNMvK/Feed-App?node-id=0%3A1)

## 外部依赖

复杂的项目通常都会依赖一些外部服务，需要掌握对接的能力。

### 身份认证

`FeedApp` 采用微信公众号授权登录，不再使用之前任务中自己实现的基于账号、密码的登录方式，开发模式下只需要通过微信公众测试号对接即可

> 准备步骤

- **申请微信公众平台测试账号**

  访问 [https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)，使用微信登录即可获得测试账号，需要注意，`appsecret` 不能泄露，只能放在服务端来保存

- **网页授权**

  阅读微信开发者文档 [https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)，了解微信登录相关的概念，并且配置 `授权回调页面域名` 为服务端地址，如 `127.0.0.1:3010`

- **安装微信开发者工具**

  因为微信授权这一步只能在微信或者微信开发者工具中进行，为了调试方便，需要事先安装开发者工具 [https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

- **关注测试号**

  进行测试之前需要先微信扫码关注自己的测试号

> 对接流程

- 服务端准备一个接口用来接收微信的跳转回调，如 `/api/user/wxlogin`

- 用户在访问页面时，前端向服务端检查登录状态，如果没有登录，服务端需要返回微信授权的重定向地址，该地址是由公众号的 `appID` 拼接而成，其中的 `redirect_uri` 就是前面自己接收回调的完整接口地址，假设前面配了回调地址为 `127.0.0.1:3010`，那么这里的 `redirect_uri` 就应该是 `http://127.0.0.1:3010/api/user/wxlogin`，最好使用 `encodeURIComponent` 进行一下编码。前端拿到这个地址之后直接进行跳转，注意这一步需要在开发者工具中进行。[https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#0](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#0)

- 用户在微信/开发者工具中完成授权之后，微信会重定向到前面设定的地址，并且携带一个 `code` 参数，如 `http://127.0.0.1:3010/api/user/wxlogin?code=xxx`，服务端使用这个 `code` 参数去向微信服务器请求换取 `access_token`，[https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#1](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#1)，返回值中有两个字段最关键

  - access_token：微信接口调用的凭据
  - openid：用户的唯一标识，同一个微信用户在不同的appId下，openid是不同的，通常服务端需要把openid记录下来，用于和本地帐号的关联，如果后续需要做一些微信相关的调用，也需要用到它

- 拿到上面的凭据之后就可以去拉取用户的身份信息了，[https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#3](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#3)，其中会用到的就是昵称和头像了

- 上面的流程在服务端执行成功之后就可以拿到当前登录的微信用户了，此时需要检查一下本地数据库中是否存在该 `openid` 对应的用户，如果不存在，需要先用这些信息创建一个本地帐号

- 账号检查通过之后，需要创建本地的session会话了，这个和之前作业中的方式是一样的，最后通过 `set-cookie` 传递给浏览器，后续的请求都是通过自己实现的session来认证，此时的浏览器地址还处于前面的回调地址，记得 `302` 重定向跳转回前端页面，后面就可以将Cookie从开发者工具中拷贝到浏览器中使用，方便开发调试

> 可以看到，微信登录只是用来做用户登录的认证，并不用来做会话控制，登录成功之后还是走自己的会话管理

### 图片上传

`FeedApp` 有很多地方都需要用到图片上传服务，比如帖子、修改头像、背景图，一般我们都会将这些业务产生的静态数据上传到对象存储服务，这样更利于服务的可扩展性，这里大家可以对接阿里云的 `OSS` 服务（会产生轻微的费用），它的文档、SDK都比较详细，对接非常方便，**需要避免密钥的泄露**。

[https://help.aliyun.com/product/31815.html](https://help.aliyun.com/product/31815.html)

对象存储还具有非常强大的图片处理功能，比如用户上传的图片可能非常大，但是在列表中展示的时候我们可以让 `OSS` 返回压缩过的缩略图，查看大图时则返回清晰度更高的压缩图，这样可以节省流量，提升加载速度。

## 核心功能

### 帖子

用户可以发布独立的帖子，也可以评论、转发或者点喜欢别人的帖子，帖子是纯文本，可以选择附带图片，每个帖子最多不能超过 `280` 个字符，不能超过 `4` 张图片，用户可以删除自己发布的帖子，带有图片的帖子可以进入大图相册预览的模式，支持左右滑动

### 关注

用户可以互相关注，被关注用户的帖子、转发会出现在自己的信息流中

### 通知

用户被关注、评论或者转发了帖子，会收到通知

### 私信

用户之间可以互发私信，支持单方面删除，暂时不需要支持实时通信

## 技术要求

### 服务端

- Koa + MongoDB + TypeScript
- 在协同仓库创建 `feed-server` 作为服务端仓库
- 梳理清楚服务端关键数据模型的数据结构，特别要注意查询时的效率，必要时可以设计一些冗余字段来做缓存

### 前端

- 使用 `create-react-app` 脚手架创建工程，使用前后端分离的开发模式，可以使用 `antd-mobile` 组件库
-  在协同仓库创建 `feed-front` 作为前端仓库

## 协作方式

- 每个小组内部推举选出一个组长，组长最重要的工作是**制定规范、分解任务、协调分工、把控进度和质量**
- 组长搭建好工程结构推送到 `master` 分支，小组成员创建以自己名字拼音命名的开发分支，完成一部分功能后发起 `pull request` 由组长来合并代码，自己的开发分支也要及时和主干分支保持同步，不同成员之间应该避免同时修改同一个文件

## 准备任务

- 小组讨论出数据结构的设计方案
- 提交一个大致的小组工作计划，主要包括
  
  - 核心难题清单
  - 人员分工
  - 阶段目标
  - 协作方式

- 以上内容提交至协作仓库的 `wiki` 文档中
