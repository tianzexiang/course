# 浏览器技术

## DevTools

Chrome DevTools是一组内建在Chrome浏览器的Web开发者工具，通过它我们可以非常方便得对网页应用进行的分析、调试，是我们在日常开发中最常用的调试工具，是Web开发者的必备技能。在前面的课程中我们已经使用过DevTools中的一些功能，现在我们再来系统地看一看平时比较常用地几个模块。

### Elements/元素

该模块可以让我们查看和修改DOM，在左侧可以看到DOM树，当我们在节点上右键，可以看到弹出的右键功能菜单，当我们选择一些功能进行修改之后，DOM的变化会立刻在页面中生效

- **添加属性**：可以让我们给节点添加自定义的属性
- **编辑属性**：可以对已有的属性进行修改
- **以HTML形式编辑**：可以让整个DOM节点树变为可编辑的状态，适合需要大编辑编辑DOM的场景
- **编辑文本**：双击DOM节点的文本，可以对其内容进行修改
- **删除元素**：按 `Del` 键，可以直接将该节点删除
- **复制/复制outerHTML**：可以复制该节点的HTML内容
- **复制/复制selector**：可以复制该节点的CSS选择器
- **复制/复制样式**：可以复制该节点所应用的CSS样式列表，当你需要编写JS代码对DOM进行测试操作的时候，非常有用
- **强制状态**：这里可以将元素强制伪类状态，比如 `:hover`，方便我们调试处于对应状态时节点的样式
- **以递归方式展开**：DOM节点树默认是折叠的，通过该选项可以将所有的子节点展开
- **捕获节点屏幕截图**：可以将该节点的当前状态截取快照，保存成图片

左上角的 `检查` 按钮，可以让我们在页面上直接选择节点，然后在左侧的DOM树中会自动选中，右侧主要是样式面板，可以让我们查看、修改DOM的CSS样式，它也有几个常用的Tab页

#### 样式

这个模块主要时列出当前节点所应用的CSS样式，它包括两部分，一部分是内联样式，即 `element.style` 部分，另外就是下面的CSS选择器对应的样式，我们都可以对这些样式直接进行增删改，也可以看到这些样式在文件中定义的位置。最下面会显示该节点的盒子模型，它的尺寸、边框、间距等都会用一个盒子的形式展示出来，非常方便我们分析尺寸。

#### 已计算

这个模块可以查看元素实际计算生效的样式的值，比如通过变量 `var`、计算函数 `calc` 等动态计算的结果，或者继承得到的样式，都可以通过这里来查看。

#### 布局

可以查看页面中网格布局的具体信息。

### Console/控制台

控制台的主要功能有两个，一是查看JS代码的打印输出的信息，比如普通的log，或者是报错信息，二是可以直接在这里执行JS代码，对页面进行操作

### Sources/源代码

源代码面板可以让我们对页面所加载的资源进行查看，也可以对JS代码进行断点调试，这里涉及到另外一种技术叫 `source map`，我们有必要先来了解一下。

被浏览器执行的JS或者CSS代码通常会以某种方式从开发人员创建的原始资源种转义而来，例如：

- 源码通常会合并和压缩，以高效的方式从服务端获取
- 页面中运行的JS通常是由机器生成的，就像TypeScript、Babel这类的编译工具一样
- CSS通常也会使用一些预处理工具来生成，比如LESS、SASS

这些场景下，调试原始的代码会比浏览器实际下载、执行的转换之后的代码更加容易，`source map` 是从已转换的代码映射到原始源代码的的文件，使浏览器能够重建原始源并在调试器中显示重建之后的源代码。

为了能够在调试时使用 `source map`，你必须

- 为源代码生成一个 `source map` 文件，这个过程不需要我们手动执行，我们常用的这些编译器都支持自动生成，在我们前面的例子中也可以看到伴随着生成的js文件有一个对应的map文件，这个就是它的 `source map`，我们也不需要关心map文件的具体内容
- 加入一个注释在转换后的文件，它用来指向对应的 `source map`，语法类似

```js
//# sourceMappingURL=main.js.map
```

现在我们刷新页面，通过调试工具的 `Sources` 面板就可以看到原始的代码了，并且可以直接对它进行断点调试。

**source map只是用来方便我们在开发的过程中进行代码调试，当需要发布到生产环境的时候，应该取消 `source map` 的生成，并且对代码进行压缩，这些可以在后面借助于构建工具来完成，对我们的源代码进行一定程度的保护。**

了解 `source map` 技术之后，我们就可以来分析页面中的资源了，在左侧边栏会按照域名、路径列举出所加载的各种图片、样式、脚本文件，如果某个资源指定了 `source map` 并且加载成功，查看的时候会自动切换到映射源。

### Application/应用程序

该面板可以让我们查看Web页面存储的数据，目前常用到的主要是 `Storage` 部分

#### Storage

`Web Storage API` 提供了存储机制，通过该机制，浏览器可以安全地存储键值对，作为 `Web Storage API` 的接口，`Storage` 提供了访问特定域名下的会话存储或本地存储的功能，例如，可以添加、修改或删除存储的数据项。存储对象是简单的键值存储，类似于对象，但是他们在页面加载时保持完整，键和值始终是字符串（数字、布尔型、对象都会被自动转换为字符串），`Web Storage` 包含如下两种机制：

**sessionStorage**

`sessionStorage` 为每一个给定的源位置一个独立的存储区域，该存储区域在页面会话期间可用

- 页面会话在浏览器打开期间一直保持，并且重新加载或者恢复页面仍会保持原来的会话
- 打开多个相同URL的Tabs页面，会创建各自的 `sessionStorage`
- 关闭对应的浏览器窗口、tab，会清除对应的 `sessionStorage`

**localStorage**

功能与 `sessionStorage` 相同，但是在浏览器关闭，重新打开之后数据仍然可用，可以用来做缓存数据的持久化

调用其中任何一个会创建 `Storage` 对象，通过 `Storage` 对象，可以设置、获取、移除数据项，不同源之间的数据是相互独立、隔离的

#### `Storage` 属性

**length**

返回一个整数，表示存储在 `Storage` 对象中的数据项的数量，如

#### `Storage` 方法

**Storage.key()**

该方法接受一个数值n作为参数，并返回存储中第n个键名

**Storage.getItem()**

该方法接受一个键名作为参数，返回键名对应的值

**Storage.setItem()**

该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。

**Storage.removeItem()**

该方法接受一个键名作为参数，并把该键名从存储中删除

**Storage.clear()**

该方法将会清空存储中的所有键名

#### Cookie

该面板可以查看当前源下面的Cookie信息，关于Cookie的具体信息我们在后面的HTTP章节再具体介绍

### React Developer Tools

这是一个Chrome插件，它可以将组件结构、状态等信息都展示出来，对于我们调试React程序特别有用。

### Network/网络

Network面板是我们分析网络请求的利器，我们常见的Web页面以及所关联的资源都是通过HTTP请求加载的，通过该功能我们可以分析页面资源的请求过程、响应内容，便于我们和服务端联调。

## HTTP协议

[https://developer.mozilla.org/zh-CN/docs/Web/HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)

超文本传输协议（HTTP）是一个用于传输超媒体文档（例如HTML）的应用层协议，它是为Web浏览器与Web服务器之间的通信而设计的，但也可以用于其它目的。HTTP遵循经典的客户端-服务端模型，客户端打开一个连接以发出请求，然后等待直到收到服务端响应。HTTP是无状态协议，这意味着服务器不会在两个请求之间保留任何数据（状态），HTTP通常基于TCP协议进行传输，但是它可以在任何可靠的传输层上使用。

HTTP协议存在多个版本，目前最新的是HTTP/2，这一节课我们主要讲解经典的HTTP/1.1，也是我们本次课的重点内容。

所谓**协议**就是大家公开约定的一种标准，基于这个标准封装的数据可以进行正常的通信和数据交换。

### 概述

HTTP是一种能够获取如HTML这样的网络资源的通讯协议，它是在Web上进行数据交换的基础，是一种Client-Server协议，也就是说，请求通常是由像浏览器这样的接受方发起的。一个完整的Web文档通常是由不同的资源拼接而成的，像是文本、样式、图片、视频、脚本等等。

![fetching_a_page.jpg](imgs/fetching_a_page.jpg)

客户端和服务端通过交换各自的消息进行交互，由像浏览器这样的客户端发出的消息叫做 `requests`，被服务端响应的的消息叫做 `responses`

![http_layers.jpg](imgs/http_layers.jpg)

### HTTP组件系统

每一个被发送到服务器的请求，都会被服务器处理并返回一个消息，也就是 `response`，在这个请求与相应之间，还有许许多多被称为 `proxy` 的实体，他们的作用与表现各不相同，比如有些是网关，有些是缓存

![client-server-chain.png](imgs/client-server-chain.png)

#### 客户端：user-agent

客户端就是能够为用户发起请求的工具，我们最常见的就是浏览器，其他的一些工具如Node.js等，也可以作为客户端。这些客户端在发送请求的时候通常都会在请求头里面加上 `user-agent` 字段，用来标明自己的身份。

要展现一个网页，浏览器首先发出一个请求来获取页面的HTML文档，在解析文档中的资源信息发送其他请求，获取可执行脚本或CSS样式表来进行页面布局渲染，以及一些其他页面资源，比如图片、视频。然后，浏览器将这些资源整合到一起，展现出一个完整的文档，也就是网页。浏览器执行的脚本可以在之后的阶段获取更多的资源，并响应地更新网页。

一个网页就是一个超文本文档，浏览器来负责发送HTTP请求，并进一步解析HTTP返回的消息，以向用户提供明确的响应。

#### Web服务端

在上诉通信过程的另一端，是由Web Server来服务并提供客户端所请求的资源内容，Server只是一个虚拟意义上的概念，它并非代表一个具体的机器。

### HTTP的基本性质

#### 简单性

HTTP/1.1被设计得简单易读，HTTP报文能够被人读懂，还允许简单测试，使用非常方便。

#### 可扩展性

HTTP Headers让协议扩展变得非常容易，只要服务端和客户端就新的headers达成语义一致，新功能就可以被轻松添加进来，现在有很多的自定义协议都是基于HTTP的。

#### 无状态，有会话

HTTP是无状态的：在同一个连接中，两个执行成功的请求之间是没有关系的，这就带来了一个问题，用户没有办法在同一个网站中进行连续的交互，比如在一个社交网站中，用户登录了账号A，然后进入到个人主页，这两次的请求之间没有关联，浏览器无法知道现在是哪个用户在请求个人主页。而使用HTTP的头部扩展，Cookies就可以解决这个问题，把Cookies添加到头部中，创建一个会话让每次请求都能共享相同的上下文信息，达成相同的状态。

注意：HTTP本质上是无状态的，使用Cookies可以让我们将不同的请求关联起来，变成有状态的会话。

### HTTP能控制什么

因为HTTP良好的扩展性使得越来越多的Web功能归其控制，最开始HTTP只是用来传输数据，如今还可可以用来控制缓存、认证、安全性限制等等，这些都是通过和浏览器约定新的 `headers` 来实现的，详细内容我们在后面分专门的章节来进行讲解。

**需要注意的是，我们这里讨论的主要是浏览器环境下面的HTTP控制机制，这是因为浏览器遵循这些约定的规则，如果我们使用其他的一些编程工具如Node.js来发起HTTP请求，它默认并不受这些规则的约束。**

### HTTP流

当客户端想要和服务端进行信息交互时，过程表现为下面几步：

- 打开一个TCP连接，TCP连接被用来发送一条或多条请求，以及接受响应消息。客户端可能打开一条新的连接，或重用一个已经存在的连接，或者也可能开几个新的TCP连接连向服务端。
- 发送一个HTTP报文，HTTP/1.1的报文是语义可读的，所谓报文就是我们按照HTTP协议约定格式封装的数据，例如下面的数据

```
GET /about.html HTTP/1.1
Host: localhost:3270
Connection: keep-alive
```

- 解析服务端返回的报文信息

```
HTTP/1.1 200 OK
Server: TestServer
Date: Thu, 20 May 2021 09:12:52 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 291
Connection: keep-alive

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTTP Response</title>
</head>
<body>
  <h1>HTTP Response</h1>
</body>
</html>
```

- 关闭连接或者为后续请求重用连接

### HTTP报文

有两种HTTP报文的类型，请求与响应，每种都有其特定的格式，以我们上面的报文为例

HTTP请求的例子：

![http_request.png](imgs/http_request.png)

请求由以下元素组成：

- 一个HTTP的method，经常由一个动词像是 `GET`、`POST`或者一个名词像 `OPTIONS`、`HEAD` 来定义客户端的行为，通常客户端的操作都是获取资源（GET方法），或者发送数据（POST方法）。
- 要获取的资源的路径，通常是上下文中就很明显的元素资源的URL，它没有协议、域名、端口号
- HTTP协议的版本号
- 为服务端表达其他信息的可选头部headers
- 对于一些像POST之类的方法，报文的body就是包含了发送的数据，这与body类似

HTTP响应的例子：

![http_response.png](imgs/http_response.png)

响应报文包含下面的元素：

- HTTP协议版本号
- 一个状态码（status code），来告知对应请求执行成功或失败，以及失败的原因
- 一个状态信息（status message），这个信息是非权威的状态码描述信息，可以由服务端自行设定
- HTTP headers，与请求头部类似
- Response body，可选项，比起请求报文，响应报文中更常见地包含获取的资源body

> 通过上面的介绍我们可以看到，客户端的工作就是将要请求的数据封装成请求报文，通过TCP连接发送到服务端，服务端收到请求报文之后，解析其中的数据比如要请求的资源路径，然后将需要返回的数据封装成响应报文，通过TCP连接返回给客户端，完成一次HTTP请求。

### 报文的封装

HTTP/1.1报文的起始行、每一条header之间使用 `\r\n` 来进行连接，headers与body之间通过 `\r\n\r\n` 来进行连接，我们可以按照这个规则来自行构造HTTP的请求报文和响应报文，通过我们demo中的例子可以直观地体验。

### 请求方法

HTTP定义了一组请求方法，以标明要给定资源执行的操作，每一个请求方法都实现了不同的语义，需要注意的是，这只是HTTP协议推荐的一种语义化动作，就跟HTML5中定义的语义化标签的作用类似，并非是一个强制化的标准，服务端因为各种因素，通常会有自己的一套规则，比如只支持 `GET` 或者 `POST` 来交换数据，如果条件允许的话，我们建议遵循语义化的方法，这样可读性会更好，我们会用到的方法有以下几种

- **GET**：GET方法请求一个指定的资源，使用GET的请求应该只被用于获取数据
- **HEAD**：HEAD方法请求的资源应该只返回头部，不返回响应体
- **POST**：POST方法用于将实体提交到指定的资源地址，通常导致服务器上的状态变化或产生副作用
- **PUT**：PUT方法通常用于将新的数据替换目标资源地址
- **DELETE**：DELETE方法删除指定的资源
- **OPTIONS**：OPTIONS方法用于描述目标资源的通信选项，这个在跨域检测的时候会用到

### Headers

HTTP消息头允许客户端和服务端通过 `request` 和 `response` 来传递附加信息，一个header由名称（不区分大小写）后跟一个冒号 `:`，冒号后面跟具体的值（不带换行符）组成，该值前面的空白会被忽略。

**常见的Header**

- **Content-Type**：用于声明响应体的数据的[MIME](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)类型，浏览器通常使用MIME类型来识别当前请求返回的资源类型，而不是文件扩展名，因此在Web服务器中添加正确的MIME类型非常重要，如果配置不正确，浏览器将无法正常渲染资源，常见的类型有：
  - **HTML**：text/html
  - **CSS**：text/css
  - **JavaScript**：application/javascript
  - **png**：image/png
  - **jpg**：image/jpeg
  - **json**：application/json

  一般对于文本类型的数据，我们还会加上编码声明，如 `text/html; charset=utf-8`，有时候我们需要使用POST向服务端发送一些结构化的数据，比如JSON，也推荐在请求头里面加上 `Content-Type`，用来声明请求体的数据格式，如：`Content-Type: application/json`，通知服务端把请求体的数据当作JSON来解析。

- **Content-Length**：用来指明请求体或者响应体数据的字节大小
- **Cookie**：请求头中的Cookie包含存储在客户端的cookies
- **Set-Cookie**：如果响应头中被添加了Set-Cookie，浏览器会按照指示在本地记录对应的cookie信息
- **Referer**：当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 `Referer` 请求头识别访问来源，可能会以此进行统计分析、日志记录、防盗链以及缓存优化等。`referer` 实际上是 `referrer` 误拼写，这是一个历史遗留问题

### 状态码

HTTP响应状态码指示待定的HTTP请求是否已成功完成，响应分为五类：

- 信息响应（100-199）
- 成功响应（200-299）
- 重定向（300-399）
- 客户端错误（400-499）
- 服务器错误（500-599）

常见的几种状态码及含义有：

- **200 OK**：请求成功
- **301 Moved Permanently**：永久重定向，和 `Location` 响应头配合使用，用来指定重定向之后的地址，通过会被浏览器缓存
- **302 Found**：临时重定向，浏览器不会默认缓存
- **304 Not Modified**：如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码，304 响应禁止包含消息体。
- **400 Bad Request**：当前请求有误，通常是请求参数有误
- **403 Forbidden**：服务器拒绝执行，通常是因为权限不足
- **404 Not Found**：所请求的资源未在服务器上发现
- **405 Method Not Allowed**：所请求的方法不被允许，有的请求可能只允许使用POST，如果使用GET来请求，则可能返回这个错误
- **413 Payload Too Large**：请求实体过大，通常是由于超过了服务器限制的请求体数据大小
- **500 Internal Server Error**：服务器内部错误，通常是服务端内部逻辑出现了异常
- **502 Bad Gateway**：此错误表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应，通常是由于后端服务宕机，导致前端的代理服务器无法得到处理结果

### Cookies

[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

Cookie是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下一次向同意服务器再次发起请求的时候携带并发送到服务器上，它通常用于告知服务端两个请求是否来自同一客户端，如保持用户的登录状态，Cookie使基于无状态的HTTP协议记录稳定的状态信息成为了可能。

Cookie主要用于以下三个方面：

- 会话状态管理，如登录状态
- 个性化设置，如用户的自定义设置、主题、语言等
- 浏览器行为跟踪，主要用于分析用户行为、广告推荐等等

#### 创建cookie

前面我们讲到，服务端可以在相应头里面添加一个 `Set-Cookie` 的选项，浏览器收到响应后通常会保存下cookie，之后对该服务器的每一次请求中都通过 `Cookie` 请求头将Cookie信息发送给服务端。另外，Cookie的过期时间、有效域名、路径、有效期、适用站点等都可以根据需求来指定。

一个简单的Cookie可能像这样：

```
Set-Cookie: <cookie名>=<cookie值>
```

例如：

```
Set-Cookie: token=f4b367d160527d61
```

上面的例子，我们在响应头里面通过 `Set-Cookie` 选项通知浏览器记录一个名叫 `token` 的cookie，它的值是 `f4b367d160527d61`，现在，对该服务器发起的每一次新的请求，浏览器都会将之前保存的Cookie信息通过 `Cookie` 请求头再次发送给服务器

```
Cookie: token=f4b367d160527d61
```

**path**

`Path` 标识指定了当前域下哪些路径可以接受Cookie，子路径也会被匹配，如：

```
Cookie: token=f4b367d160527d61; path=/
```

上面的path指定为 `/` ，这样所有的请求地址都会携带 `token` 这个cookie，如果设置为 `/api`

```
Cookie: token=f4b367d160527d61; path=/api
```

那么只有以 `/api` 开头的请求地址才会携带这个cookie

**生命周期**

Cookie的生命周期可以通过两种方式来定义：

- **会话Cookie**：这种是最简单的Cookie，浏览器关闭之后会被自动删除，也就是说仅在会话期内有效。会话Cookie不需要指定过期时间 `Expires` 或者有效期 `Max-Age`。
- **持久Cookie**：这种Cookie取决于过期时间 `Expires` 或者有效期 `Max-Age` 指定的一段时间

例如：

```
Set-Cookie: token=9ce0f093b0e9f857; path=/; expires=Fri, 20 May 2022 11:32:28 GMT
```

> 提示：这个过期时间只影响浏览器，而不是服务端，如果浏览器删除了这个cookie，它在服务端可能仍然是有效的，取决于服务端如何来管理。

**限制访问Cookie**

由于Cookie记录了我们在互联网上的身份信息，而在浏览器端我们可以通过 `document.cookie` 来访问cookie，这就带来了很大的安全隐患，如果我们的网页被注入了非法的脚本代码，那么很容易会被盗取Cookie，这样黑客不需要知道你的账号密码，也可以伪造你的身份做一些操作，为了限制JS对Cookie的访问，服务端在Set-Cookie的时候可以添加一个 `httpOnly` 的声明，这样的Cookie无法被JS访问，只会在浏览器请求的时候自动携带，一定程度上可以缓解这个问题。

```
Set-Cookie: token=9ce0f093b0e9f857; path=/; httpOnly
```

#### Cookie安全性

信息被存储在Cookie中，需要明白Cookie的值可以被访问，并且可以被用户所修改，所以如果要通过Cookie来标记用户的身份一定要确保数据的安全，不可以直接将用户的ID等明文信息写到Cookie中作为用户的身份标识，通常的做法是每次用户登录成功需要Set-Cookie的时候，生成一个随机的、无法被预测或枚举得到的ID，用来关联真实的用户身份，将关联关系记录到缓存中，后续根据请求头中的Cookie，去缓存中查找关联的用户，这也是Session会话实现的原理。

### Cache

[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)

通过复用以前获取的资源，可以显著提高网站和应用程序的加载性能，减少了等待时间和网络流量。

缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。当 web 缓存发现请求的资源已经被存储，它会拦截请求，返回该资源的拷贝，而不会去源服务器重新下载。这样带来的好处有：缓解服务器端压力，提升性能(获取资源的耗时更短了)。对于网站来说，缓存是达到高性能的重要组成部分。缓存需要合理配置，因为并不是所有资源都是永久不变的：重要的是对一个资源的缓存应截止到其下一次发生改变（即不能缓存过期的资源）。

虽然HTTP缓存不是必须的，但重用缓存的资源通常是必要的，然而常见的HTTP缓存只会存储GET类型的请求，缓存的关键目标包括 `request method` 和 `URI`，对于浏览器环境来说，普遍的缓存案例有：

- 一个检索请求成功的GET响应，状态码为200，例如HTML文档、图片、CSS样式、JS脚本等
- 永久重定向：状态码301

我们在前面的作业中也都遇到了这个问题，刷新页面发现修改的CSS或者JS没有生效，下面我们来看一下如何通过HTTP缓存控制来解决

#### 缓存控制

如果我们没有指定缓存控制的响应头，浏览器通常会按照该上面的规则来缓存资源，我们可以通过 `Cache-Control` 选项来定义浏览器的缓存策略

Nginx支持HTTP缓存机制，可以使用 `add_header` 指令来添加自定义响应头，例如

```plain
server {
  listen 8200;

  location / {
    root d:/www;
    add_header Cache-Control no-cache;
    autoindex on;
  }
}
```

**没有缓存**

```
Cache-Control: no-store
```

缓存中不得存储任何关于客户端请求和服务端响应的内容，每次客户端发起的请求都会下载完整的响应内容。

**缓存但重新验证**

```
Cache-Control: no-cache
```

这种模式下，每次有请求发出时，缓存会将此请求发到服务器，同时带有缓存验证的相关字段，服务器会验证请求中所描述的缓存是否过期，若未过期则返回304，同时不返回数据内容，客户端使用本地的缓存副本；若已过期，则返回200，同时返回最新的资源内容。

**过期**

Cache-Control: max-age=3600

过期机制中，最重要的指令是 `max-age=<seconds>`，表示资源能够被缓存（保持新鲜）的最大时间。max-age是距离请求发起的时间的秒数。针对应用中那些不会改变的文件，通常可以手动设置一定的时长以保证缓存有效，例如图片、css、js等静态资源。上面的例子中，资源会被缓存3600秒。

#### 缓存验证

用户重新加载页面时会开始缓存验证，当缓存的文档过期之后，需要重新验证或者重新获取资源，只有在服务器返回强校验器或者若校验器时才会进行验证。

**ETags**

作为缓存的一种强校验器，`ETag` 响应头是一个对用户不透明的值。对于像浏览器这样的客户端，不知道ETag代表什么，不能预测它的值是多少，它是服务端对当前资源生成的一个特定版本的标识符，类似于指纹，可以通过hash算法来生成。如果资源请求的响应头里含有 `ETag`, 客户端可以在后续的请求的头中带上 `If-None-Match` 头来验证缓存。

`Last-Modified` 响应头可以作为一种弱校验器。说它弱是因为它只能精确到一秒。如果响应头里含有这个信息，客户端可以在后续的请求中带上 `If-Modified-Since` 来验证缓存。

当向服务端发起缓存校验的请求时，服务端会返回 `200 ok` 表示返回正常的结果或者 `304 Not Modified` (不返回body)表示浏览器可以使用本地缓存文件。304的响应头也可以同时更新缓存文档的过期时间。

### CORS

跨源资源共享 (`CORS`) 是一种基于HTTP头的机制，该机制通过允许服务器标示除了它自己以外的其它origin（域，协议和端口），这样浏览器可以访问加载这些资源。跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的"预检"请求。在预检中，浏览器发送的头中标示有HTTP方法和真实请求中会用到的头。

跨源HTTP请求的一个例子：运行在 http://domain-a.com 的JavaScript代码使用 `fetch` 来发起一个到 https://domain-b.com/data.json 的请求。

出于安全性，浏览器限制脚本内发起的跨源HTTP请求。例如， `fetch` 遵循同源策略，这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，除非响应报文包含了正确CORS响应头。

#### 功能概述

跨源资源共享标准新增了一组 `HTTP` 头部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 `OPTIONS` 方法发起一个预检请求，从而获知服务端是否允许该跨源请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

CORS请求失败会产生错误，但是为了安全，在JavaScript代码层面是无法获知到底具体是哪里出了问题。你只能查看浏览器的控制台以得知具体是哪里出现了错误。

接下来的内容将讨论相关场景，并剖析该机制所涉及的 HTTP 头部字段。

#### 简单请求

某些请求不会触发 `CORS` 预检请求。本文称这样的请求为**简单请求**，请注意，若请求满足所有下述条件，则该请求可视为“简单请求”：

- 使用下列方法之一
  - GET
  - HEAD
  - POST

- 除了被用户代理自动设置的首部字段（例如 `Connection` ，`User-Agent`）和在 `Fetch` 规范中定义为禁用首部名称的其他首部，允许人为设置的字段为 `Fetch` 规范定义的 对 `CORS` 安全的首部字段集合。该集合为：
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type （需要注意额外的限制）
  - DPR
  - Downlink
  - Save-Data
  - Viewport-Width
  - Width

- Content-Type 的值仅限于下列三者之一：
  - text/plain
  - multipart/form-data
  - application/x-www-form-urlencoded

- 请求中的任意 `XMLHttpRequestUpload` 对象均没有注册任何事件监听器；`XMLHttpRequestUpload` 对象可以使用 `XMLHttpRequest.upload` 属性访问。
- 请求中没有使用 ReadableStream 对象。

如果一个跨域请求不满足简单请求的规则，那么浏览器会先发出一个类型为 `OPTIONS` 的预检请求，请求服务器返回相关的控制头信息，我们常用的头有

**Access-Control-Allow-Origin**

语法如下：

```
Access-Control-Allow-Origin: <origin> | *
```

其中，`origin` 参数的值指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。

例如，下面的字段值将允许来自 http://a.example.com 的请求：

```
Access-Control-Allow-Origin: http://a.example.com
```

如果服务端指定了通配符 `*`，那么表示允许所有域的请求

**Access-Control-Allow-Headers**

该字段用于预检请求的响应，其指明了实际请求中允许携带的首部字段，例如

```
Access-Control-Allow-Headers: Content-Type
```

> 练习：通过Network面板分析网络请求

### 发送请求

[https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

在浏览器端我们主要有两种方法来发送异步网络请求，早期的 `XMLHttpRequest` 以及现代化的 `Fetch API`，其他的一些网络请求库如 `axios` 也都是对于这类API的封装，`Fetch API` 提供的是 `Promise` 风格接口，使用起来更加的方便，下面我们来看一下简单的使用。

通过上面对于HTTP的学习，我们可以知道想要发送一个HTTP请求我们就需要构造一个HTTP请求报文，我们只需要提供下面的变量信息，fetch会帮我们完成剩余的工作

- 请求地址
- 请求方法
- 请求头
- 请求体

对于简单的GET请求，我们只需要提供一个请求地址即可，如

```js
fetch('data/task.json')
```

我们还可以添加请求头

```js
fetch('data/task.json', {
  headers: {
    'My-Header': 'example'
  }
})
```

对于POST类型的请求，我们可以添加请求体，下面的例子我们来给服务端发送一个JSON字符串

```js
fetch('/api/create', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Tom'
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
```

fetch还可以使用POST方法进行文件上传，具体用法参考demo中的例子，如果服务端要通知浏览器将返回的内容作为附件保存，也就是弹出下载文件的选择窗口，可以添加一个响应头

```
Content-Disposition: attachment; filename=test.jpg
```

其中 `filename` 后面的字符串就是提示浏览器要保存的文件名

`fetch` 返回的是一个 [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象，如果我们想要解析它返回的JSON数据，可以用下面的方式来实现

```js
let res = await fetch('data/task.json')
let json = await res.json()
console.log(json)
```

## 浏览器对象

浏览器有很多的内置对象，对于我们控制页面非常有帮助

### location

`location` 接口表示其链接到的对象的位置（URL），所做的修改反映在与之相关的对象上，我们可以通过它来读取、控制当前页面的地址，比如重定向或者重新加载页面

#### 属性

学习location之前我们有必要先来了解一下URL的组成结构，一个常见的URL可能是下面的样子

```
https://demo.example.com:8080/api/update?name=Tom#hash
```

它可以拆分成下面的部分

- **href**：对应整个URL
- **protocol**：https:
- **hostname**：demo.example.com
- **port**：8080
- **host**：demo.example.com:8080
- **origin**：https://demo.example.com:8080
- **pathname**：/api/update
- **search**：?name=Tom
- **hash**：#hash

**location**对象包含上面这些属性，如果我们要修改当前页面的地址，也就是重定向到一个新的页面，可以直接修改 `location.href`，如：

```js
location.href = '/index.html'
```

这会引起页面的刷新，切换到 `/index.html` 地址

也可以直接修改链接的hash，hash片段仅对于浏览器起作用，不会被浏览器提交到服务端，对于hash的修改也不会引起页面的刷新，通常用于浏览器记录一些状态比如链接锚点、前端路由等等，如

```js
location.hash = '#test'
```

#### 方法

平时会用到的方法主要是 `reload()`，它会让我们重新加载当前页面

```js
location.reload()
```

### navigator

该对象表示用户代理的状态和标识，它允许脚本查询它和注册自己进行一些活动，我们可以在浏览器的控制台输入 `navigator` 来查看它的属性和方法，常用的有

- **userAgent**：客户端代理字符串
- **language**：当前环境的语言

### history

该对象允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录，我们通常使用它来控制浏览记录的前进、后退，例如：

```js
history.back()  // 页面后退
history.forward() // 页面前进
history.go(-1)  // 后退一页
```

## 文件访问

浏览器提供了一组访问本地文件的API，可以让我们在浏览器里面对文件内容做一些操作，但是不允许修改本地文件。

如果要访问本地文件，我们需要使用文件选择器表单控件

```html
<input type="file" id="file" />
```

如果用户通过它选择了文件，将会触发change事件，我们可以对这个事件进行监听，然后得到File对象

```js
let btn = document.getElementById('file')
btn.addEventListener('change', () => {
  console.log(btn.files)
})
```

在我们的demo中有关于文件读取的例子，里面涉及到另外一个知识点 [Data URLs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)，可以让我们在页面中以Base64编码来表示一些小的二进制资源，比如图标、字体

## 课后任务

### 改写Todo

改写之前的Todo，使用`TypeScript + React`进行开发，将其改成能够和服务端交互的前后端分离项目。


#### Proxy

在进行开发时，我们访问的页面是本地页面，但是服务端是已经部署在服务器上的或者是在其他端口的本地服务，这是如若是直接写上全部路径进行访问时，会出现跨域问题，而且一般服务端部署的域名一般都和前端部署的域名一致且多变，所以一般在进行服务端请求时，无需加上域名。例如当前端页面请求的是`/api/xxx`时，那么请求的地址为`http://localhost:3000/api/xxx`，此时访问肯定是404。

为解决以上情况，我们需要配置代理，将`/api`相关的请求代理至服务端的地址，`create-react-app`有两种方法进行[代理](https://create-react-app.dev/docs/proxying-api-requests-in-development): 

1. 直接配置在package.json的`proxy`字段

2. 使用`http-proxy-middleware`进行配置

#### 总体要求

- 拷贝 `template` 中的代码为模板进行开发
- 不允许使用DOM操作API
- 不需要支持响应式
- 服务端是demo中的`todo-server`，其中的运行方式以及api文档参考其中的`README.md`
- 合理拆分组件，并设计组件的Props。
- 修改 `README.md` 记录作业完成的思路和遇到的问题
- 代码在下周四之前提交至 `task` 仓库的 `week-06/todo` 目录

### 组件练习

本周的任务是封装两个`TypeScript + React`组件分别为 `Button` 按钮组件和 `Modal` 模态弹窗组件，效果图参考图例，具体要求如下

#### Button

按钮需要支持传入的Props

- type：按钮类型，默认值为 `default`，可选值有 `default`、`primary`，分别对应不同的按钮状态，可选参数
- onClick：按钮点击时的回调函数，可选参数

按钮还需要支持的特性

- 基于原生的button标签来封装，并且清除button的默认样式
- 鼠标hover时会有样式的改变需要添加过渡效果

#### Modal

模态弹窗组件需要支持传入的Props

- visible：布尔类型，用来控制窗口是显示还是关闭，true则显示，false则关闭
- title：字符串，窗口的标题
- footer：JSX元素，可以传入一组按钮显示在窗口底部
- onClose：用户点击右上角的关闭按钮或者背景遮罩时触发的回调函数

模态窗口中间的内容部分，通过 `props.children` 来传入，具体引用示例参考模板代码

弹窗还需要支持的特性：

- 窗体需要在页面中水平、垂直居中
- 打开和关闭时需要有过渡动画，遮罩有一个透明度的过渡，窗体有一个缩放和透明度的过渡，可以配合CSS的 `visibility` 属性来实现
- 弹窗后面需要添加半透明遮罩，点击遮罩可以关闭窗口，点击窗体部分不会关闭，遮罩需要遮住页面中的其他元素

#### 总体要求

- 拷贝 `template` 中的代码为模板进行开发
- 不允许使用DOM操作API
- 不需要支持响应式
- CSS样式统一写到style.css，添加注释进行区分
- 修改 `components` 目录下的 `Button.tsx`、`Modal.tsx`，按照给定的接口来实现要求的功能
- 修改 `main.tsx`中的代码，补全打开、关闭弹窗的相关代码，在弹窗内容部分添加一些自定义的内容
- 修改 `README.md` 记录作业完成的思路和遇到的问题
- 代码在下周四之前提交至 `task` 仓库的 `week-06/components-practice` 目录
