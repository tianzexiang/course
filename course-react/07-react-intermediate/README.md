# React 进阶

## 使用create-react-app创建项目

```bash
$ npx create-react-app@latest pro-name --template typescript
# pro-name 是项目名称
# --template 后面跟的是模板名称
```

其中[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)是 npm 提供的一个工具，可以在不安装全局模块的情况下调用 npm 包。

## npm

`npm`（Node package manager）是随 Node.js 发布的包管理工具，最初主要是用来管理 Node.js 依赖包，如今已经扩展到整个 JavaScript 生态。

在没有 `npm` 之前，如果我们想要在自己的 JS 项目中引用第三方的框架或库，比如 `React`、`Bootstrap` 等等，需要把代码一个一个下载回来添加到自己的工程中，随着项目的扩大，依赖会变得越来越多，而第三方库可能也会有自己的依赖，一旦有版本升级，以来的管理很容易失控。

`npm` 的工作方式大致如下：

- 架设一个中心化的代码仓库服务器（registry），用来存放共享的代码，官方的 npm 网站为 [https://www.npmjs.com/](https://www.npmjs.com/)，在国内我们通常会使用阿里的 `npm` 镜像，下载速度会更快，切换方式如下

  ```
  npm config set registry https://registry.npm.taobao.org
  ```

- 开源软件的作者将自己的代码封装成 npm 包（`package`），并且确定一个在 registry 中唯一的名字，如 `react`，然后将代码 publish 到 registry
- 其他开发者想要使用 `react` 这个包，在自己的项目中运行 `npm i react` ，npm 就会自动帮他们下载代码。
- 下载完成的代码会出现在项目根目录的 `node_modules` 目录
- 包也可以依赖 npm 上面其他的包，npm 在安装的时候会自动解析、安装这些依赖

### package.json

[https://docs.npmjs.com/creating-a-package-json-file](https://docs.npmjs.com/creating-a-package-json-file)

`package.json` 是一个包或者工程的描述文件，里面记录了项目的名字、版本、依赖等信息，代表当前目录是一个独立的 npm 工程，一个基本的 `package.json` 内容大致如下：

```json
{
  "name": "react-template",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@types/react": "^17.0.5",
    "@types/react-dom": "^17.0.3"
  }
}
```

一些基本的字段意义如下：

- name:：包名，必填字段，不可以和依赖中的包名重复，如果将来要发布到 npm 仓库，需要保持在 npm 仓库中唯一
- version：版本号，必填字段，遵循 [semantic-versioning](https://docs.npmjs.com/about-semantic-versioning) 规则
- main：包入口代码文件，其他代码来引用此模块的时候，会自动引入此文件
- license：开源协议
- dependencies：生产环境依赖的包列表，通常是运行时依赖的库，会被安装在 `node_modules` 目录
- devDependencies：开发环境依赖的包列表，通常是辅助开发构建用到的一些工具，比如 `webpack`，也会安装到 `node_modules` 目录

#### 创建 package.json

当我们想要初始化一个项目的时候，我们可以通过下面的步骤创建一个 `package.json` 文件来管理整个工程依赖

- 创建一个新的工程目录，如 `react-template`
- 进入该目录，执行命令 `npm init` ，按照提示一步一步填写信息

执行完毕之后，该目录会生成对应内容的 `package.json`，然后我们就可以在这个目录安装依赖了

#### npm scripts

在 `package.json` 里面有一个 `scripts` 属性，它可以添加一些自定义的命令，让我们非常方便地去执行一些构建程序，如

```json
{
  "dev": "webpack --config scripts/webpack.config.js",
  "start": "webpack serve --config scripts/webpack.config.js --open",
  "build": "webpack --config scripts/webpack.prod.js"
}
```

对于其中定义的任务，我们可以直接通过 `npm run <name>` 来执行，如

```
npm run build
```

实际执行的就是

```
webpack --config scripts/webpack.prod.js
```

这里 `webpack` 是作为一个项目依赖安装到 `node_modules` 目录的，因为 `webpack` 提供了命令行的支持，我们在 `npm scripts` 中调用它时就可以正常找到它，而不需要专门安装成一个全局命令。

有一些名字是 `npm` 默认支持的，比如 `start`，我们可以直接使用 `npm start` 来调用。

#### 安装依赖

如果我们要安装一个生产环境依赖，如 `React`, 可以在项目根目录（package.json 所在目录）执行命令

```
npm i react
```

安装完之后，依赖关系会自动记录在 `package.json` 文件的 `dependencies` 中，如果我们要安装一个开发环境依赖，如 `webpack`，可以添加一个 `--save-dev` 参数，如

```
npm i webpack --save-dev
```

安装完之后，依赖关系会自动记录在 `package.json` 文件的 `devDependencies` 中，这两种方式安装的依赖，代码都会被下载到项目根目录的 `node_modules` 目录，除此之外还会生成一个名为 `package-lock.json`，这里面记录了整个已安装的依赖关系和下载地址，可以帮助我们锁定依赖版本。`node_modules` 通常比较庞大，通常来说当我们发布项目或者将项目代码提交到 Git 仓库时，需要将 `node_modules` 目录添加到忽略列表，只提交 `package.json`、`package-lock.json` 即可，其他人拿到代码之后只需要在项目根目录执行命令

```
npm i
```

npm 就会根据 `package.json`、`package-lock.json` 中的记录自动帮你安装所需要的依赖模块

> 需要注意，在执行 npm 安装模块的命令时，一定要保证该目录存在正确的 `package.json` 文件，否则 npm 会一层一层往上递归寻找 `package.json`，直到分区根目录

#### 全局安装

有些 npm 模块提供了命令行调用的支持，我们可以用 `-g` 来将它安装成一个全局命令，比如之前我们安装过的 `typescript`

```
npm i typescript -g
```

通过这种方式安装的模块安装为一个命令，比如 `typescript` 定义的命令为 `tsc`，我们就可以全局使用这个命令来编译 TS 代码了，需要注意的是，通过 `-g` 安装的模块并不会存在于本地项目的 `node_modules` 中，而是由 npm 全局管理，也不能在代码中直接引用。

#### 删除依赖

如果我们想要删除一个已安装的依赖，如 `react`，只需要在 `package.json` 所在的目录执行命令

```
npm remove react
```

如果要删除一个全局安装的模块，需要再加上 `-g` 的参数，如

```
npm remove typescript -g
```

### types

在我们使用 TypeScript 的过程中避免不了需要引用第三方的库，例如 react，有些库自身就使用 TS 开发，发布到 npm 的时候也携带了对应的类型定义文件，对于这种库 TS 可以直接识别它的类型，但是大部分的库还是采用传统的 JS 开发，TS 无法直接识别它的类型，所以 TS 采取了一种机制，可以为传统的 JS 模块编写类型定义文件，来描述他们的接口类型，然后通过 npm 仓库 `@types/<name>` 来发布，比如 react 是标准 JS 开发的，社区为它编写了 TS 类型定义模块，可以让 TS 识别 react 中的接口和数据类型，然后通过 `@types/react` 来发布，对应的地址为 [https://www.npmjs.com/package/@types/react](https://www.npmjs.com/package/@types/react)，我们前面的课程示例中也有用到它，可以用下面的方式来安装

```
npm i @types/react --save-dev
```

在以后的开发中，如果你要在 TS 中使用某一个第三方的 npm 模块，需要先看一下它自身有没有携带类型定义文件，如果没有的话，再去 `@types` 下面看一下有没有社区提供的版本，目前主流的常用库基本都覆盖了。

## 组件的生命周期

[https://react.docschina.org/docs/react-component.html](https://react.docschina.org/docs/react-component.html)

一个 React 组件从初始化到被删除，会经历一个完整的生命周期，我们可以为类组件添加一些特殊方法，在组件生命周期的的一些关键节点，React 会来执行这些方法。

### componentDidMount()

`componentDidMount()` 会在组件挂载之后（插入 DOM 树中）立即调用，依赖于 DOM 节点的初始化操作应该放在这里，通常我们会在这里通过网络获取组件所需的数据、订阅一些事件通知等等

### componentDidUpdate()

`componentDidUpdate()` 会在更新后被立即调用，首次渲染不会执行此方法，可以让我们监控组件传入数据发生的变化。

### componentWillUnmount()

`componentWillUnmount()` 会在组件卸载及销毁之前直接调用，在此方法中执行必要的清理操作，例如：清除定时器，取消网络请求或者之前在 `componentDidMount()` 中创建的事件订阅等。在此方法中不应该调用 `setState()`，因为该组件将永远不会重新渲染，组件实例卸载后，将永远不会再挂载它。

## 路由

[https://reactrouter.com/web/guides/quick-start](https://reactrouter.com/web/guides/quick-start)

目前我们所接触到的 react 例子都是单页面的，只有一个页面组件，在实际项目中通常都会有多个页面存在，可以通过链接来进行切换，达到多页面的效果。要实现这个功能，我们需要借助于 React 的路由模块 `react-router-dom` 来实现，它可以让我们监听浏览器地址的变化，并且解析这个 URL 对象，然后 router 根据 URL 的路径匹配到路由对应页面组件，最后正确地渲染对应地组件，这个就是路由工作的基本原理。

我们平时会使用的主要是两种路由模式：

- HashRouter：这种模式基于浏览器 location 的 hash 片段来实现，实现比较简单，不需要服务器的支持，缺点是 url 样式不够优雅，而且 hash 参数容易丢失，如下：

  ```
  http://example.com/#/home/files
  ```

- BrowserRouter：这种模式基于浏览器的 history API，可以让我们创建一个像 `http://example.com/home/files` 这样真实的 URL，而且切换 url 不会引起页面的刷新，用户体验比较好，是我们比较推荐的路由方式，不过这种模式需要服务器比如 Nginx 的支持，因为路径 `/home/files` 只是一个前端定义的路由，当用户刷新页面的时候浏览器会去向服务器请求这个资源，服务器因为没有对应的这个资源，就会返回 404，导致页面无法显示，所以需要 Nginx 将所有 404 的请求返回入口文件 `/index.html`，大概配置如下

  ```plain
  location / {
    root d:/www;
    try_files $uri $uri/ /index.html;
  }
  ```

### 路由的定义

我们可以把 React 组件分为路由组（页面）件和普通组件，路由组件对应的就是一个路由页面，我们可以用下面的方式来定义一个路由组件 `About`

```ts
import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";

export default class About extends React.Component<RouteComponentProps> {
  render() {
    return <h1>About</h1>;
  }
}
```

这里我们要给组件添加一个 props 的泛型 `RouteComponentProps`，添加之后 TS 就可以识别到传入的和路由控制相关的 props 参数，具体参考示例代码

然后我们需要定义一个根组件 `App`，用来确定路由和组件的映射关系，如下

```ts
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "../Main";
import About from "../About";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
```

在上面的代码中我们定义了两个路由规则，放在了 `Switch` 中，路由规则的定义通过 `Route` 组件来进行，它有两个关键的参数，分别是：

- `path`：要匹配的 URL 路径
- `component`：该路由对应的页面组件

需要注意的是，path 的路径默认会匹配到子路径，例如 `/detail` 也会匹配到 `/detail/123`，如果不像匹配子路径，需要加上 `exact` 属性。

`Switch` 会根据当前的 URL 路径匹配它下面的 `Route`，然后将匹配到的第一个组件渲染到当前位置。

### 带参数的路由

有时候我们的页面会接收一些参数，比如根据传入的关键词去进行搜索，`react-router-dom` 支持路由参数，我们可以用下面的方式来定义

```ts
<Route path="/search/:keyword" component={Search} />
```

然后我们可以在对应的路由组件 `Search` 中来接收这些参数，通过下面的方式来进行

首先我们需要定义合适的 `Props` 类型，`RouteComponentProps` 也支持传入参数泛型，如下

```ts
interface Params {
  keyword: string;
}

type Props = RouteComponentProps<Params>;

export default class Search extends React.Component<Props> {
  render() {
    return <div>{this.props.match.params.keyword}</div>;
  }
}
```

我们首先定义了当前路由组件接收的参数类型 `Params`，跟我们在 `Route` 中定义的参数一致，然后我们可以在组件内通过 `this.props.match.params` 来访问到我们的路由参数对象，它的类型就是 `Params`

### 路由导航

我们可以使用两种方式来在页面中切换路由，`react-router-dom` 提供了一个 `Link` 组件，我们可以用它来替代传统的 a 标签，因为我们使用的 `history` 模式的 `BrowserRouter`，它其实是利用浏览器的 `history.pushState` 来实现的，它可以在浏览器添加历史状态，修改当前的 URL 而不会引起页面的刷新，`Link` 可以帮我们拦截用户的点击，然后完成 `pushState` 相关的操作，这样就可以在切换路由的同时保持页面的状态，而不是刷新页面。它的基本用法如下：

```ts
import { Link } from "react-router-dom";

export default class Main extends React.Component {
  render() {
    return <Link to="/about">About</Link>;
  }
}
```

参数 `to` 就是要导航到的路由，需要注意，Link 标签只用来切换应用内的路由，如果你想要跳转到外部链接，例如 `MDN`，那你应该使用传统的 a 标签，如

```ts
<a href="https://developer.mozilla.org/zh-CN/">MDN</a>
```

还有一种方式是通过 API 来进行导航，对于路由组件，`react-router-dom` 会通过 `props` 传入一些数据和 API，我们可以通过调用下面的 API 来进行路由导航

```ts
this.props.history.push("/about");
```

需要注意的是，`this.props.history` 只在路由组件内部才可以使用，如果你想要在普通组件内部也能访问路由信息，需要使用 `withRouter` 来包裹一下，例如

```ts
import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

class Nav extends React.Component<RouteComponentProps> {
  componentDidMount() {
    console.log(this.props.history);
  }

  render() {
    return (
      <nav className="nav">
        <Link to="/" className="nav-item">
          Main
        </Link>
        <Link to="/about" className="nav-item">
          About
        </Link>
      </nav>
    );
  }
}

export default withRouter(Nav);
```

这样我们就可以访问路由信息了

### NavLink

`react-router-dom` 还提供了一个特殊的 Link 组件叫 `NavLink`，它可以让我们来创建一些导航元素，当前的路由如果和它的链接匹配的话，可以自动帮我们添加选中的状态，例如上面的 `Nav` 组件我们可以用 `NavLink` 来替换一下

```ts
import * as React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";

class Nav extends React.Component<RouteComponentProps> {
  render() {
    return (
      <nav className="nav">
        <NavLink to="/" className="nav-item" exact activeClassName="nav-active">
          Main
        </NavLink>
        <NavLink to="/about" className="nav-item" activeClassName="nav-active">
          About
        </NavLink>
      </nav>
    );
  }
}

export default withRouter(Nav);
```

当路由和 `NavLink` 中的 `to` 匹配时，会自动添加一个 `nav-active` 类名

## 课后任务

本周任务是完成一个简化版的什么值得买多路由页面，设计参考 task 目录下面的效果图，具体说明如下：

该任务一共有三个路由页面，分别为 `Posts`、`News`、`Detail`，所需数据通过远程 API 的形式提供，不在需要本地 JSON 文件，template中已使用`http-proxy-middleware`配置好了代理，全部通过 GET 方式调用，数据结构说明如下，文章内容只会在 `detail` 接口中返回，列表接口不会返回，具体的 API 请求已经在 `services/api.ts` 中封装好，直接调用即可

### 技术要求

- 使用`create-react-app`创建ts应用进行开发
- 使用 rem 布局，不需要支持响应式，只需要支持手机设备的正常缩放
- 效果图是 750px 宽，2 倍屏，需要自行计算 rem 的缩放比例，不需要监控 `onresize`，只需要页面刷新的时候计算
- 三个页面分别编写路由组件，默认显示好文推荐 `Posts`
- 排行榜的导航要固定在顶部，下面的列表部分可以滚动
- 导航项需要跟随路由自动选中，使用 `NavLink`
- 好文推荐的前五条记录左上角需要显示排名图标
- 点击文章列表项可以跳转到文章详情页，携带文章 ID，不能引起页面的重新加载
- 详情页面顶部栏需要固定在上方，下方文章区域可以滚动，注意文章内容部分需要自己编写样式，让文字和图片合理排版。
- 点击详情左上角的返回按钮可以回退到上一页 `this.props.history.goBack()`
- 顶部显示作者的头像和名字
- 修改 `README.md` 记录作业完成的思路和遇到的问题
- 代码在下周四之前推送至 `task` 仓库的 `week-07` 目录

### 提示

- 所需知识点在 demo 工程 中基本都有覆盖，可以直接借鉴参考
- 合理拆分组件，如果在列表项组件中访问路由的 Props，记得使用 `withRouter` 来包裹
- 如果组件有多个 Props，可以用类型组合的写法来传递，如

```ts
interface Params {
  id: string;
}
interface Props {
  post: IArticle;
}
class PostItem extends React.Component<Props & RouteComponentProps<Params>> {}
```

- 排行榜的导航栏需要根据路由自动选中，但是只出现在 `Posts`、`News` 两个组件中，`Detail` 组件中并不包含
- 所需的两个字体图标分别为 `icon-comments`、`icon-likes`，已经定义好，可以通过这样来引用

```ts
<i className="iconfont icon-comments" />
<i className="iconfont icon-likes" />
```

- 热点资讯列表项的配图区域是固定尺寸，而我们的 banner 图都是宽图，这里需要处理一下样式让图片正常显示而不出现拉伸。可以借助于 `background-size`、`background-position`，让图片能够垂直方向铺满，水平方向居中显示，超出的部分则不用显示。
- 文章内容部分是富文本，也就是包含 html 标签，直接通过插值的方式引用的话，React 会将其转义，需要使用 [dangerouslySetInnerHTML](https://zh-hans.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) 来进行渲染，如

```ts
<article dangerouslySetInnerHTML={{ __html: "<h1>Hello</h1>" }} />
```
