# Vue 进阶

## 目标

- 掌握 npm 基础命令
- 掌握 Vue 组件的基础语法
- 掌握 Vue 组件的生命周期
- 了解组件间通信的方法
- 掌握 Vue Router 概念以及使用

## npm

`npm`（Node package manager）是随 Node.js 发布的包管理工具，最初主要是用来管理 Node.js 依赖包，如今已经扩展到整个 JavaScript 生态。

在没有 `npm` 之前，如果我们想要在自己的 JS 项目中引用第三方的框架或库，比如 `vue`、`axios` 等等，需要把代码一个一个下载回来添加到自己的工程中，随着项目的扩大，依赖会变得越来越多，而第三方库可能也会有自己的依赖，一旦有版本升级，以来的管理很容易失控。

`npm` 的工作方式大致如下：

- 架设一个中心化的代码仓库服务器（registry），用来存放共享的代码，官方的 npm 网站为 [https://www.npmjs.com/](https://www.npmjs.com/)，在国内我们通常会使用阿里的 `npm` 镜像，下载速度会更快，切换方式如下

  ```
  npm config set registry https://registry.npmmirror.com
  ```

- 开源软件的作者将自己的代码封装成 npm 包（`package`），并且确定一个在 registry 中唯一的名字，如 `react`，然后将代码 publish 到 registry
- 其他开发者想要使用 `react` 这个包，在自己的项目中运行 `npm i react` ，npm 就会自动帮他们下载代码。
- 下载完成的代码会出现在项目根目录的 `node_modules` 目录
- 包也可以依赖 npm 上面其他的包，npm 在安装的时候会自动解析、安装这些依赖

## package.json

[https://docs.npmjs.com/creating-a-package-json-file](https://docs.npmjs.com/creating-a-package-json-file)

`package.json` 是一个包或者工程的描述文件，里面记录了项目的名字、版本、依赖等信息，代表当前目录是一个独立的 npm 工程，一个基本的 `package.json` 内容大致如下：

```json
{
  "name": "vue-template",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "core-js": "^3.8.3",
    "vue": "^3.2.13"
  },
  "devDependencies": {
    ...
  }
}
```

一些基本的字段意义如下：

- name: 包名，必填字段，不可以和依赖中的包名重复，如果将来要发布到 npm 仓库，需要保持在 npm 仓库中唯一
- version：版本号，必填字段，遵循 [semantic-versioning](https://docs.npmjs.com/about-semantic-versioning) 规则
- main：包入口代码文件，其他代码来引用此模块的时候，会自动引入此文件
- license：开源协议
- dependencies：生产环境依赖的包列表，通常是运行时依赖的库，会被安装在 `node_modules` 目录
- devDependencies：开发环境依赖的包列表，通常是辅助开发构建用到的一些工具，比如 `eslint`，也会安装到 `node_modules` 目录

### 创建 package.json

当我们想要初始化一个项目的时候，我们可以通过下面的步骤创建一个 `package.json` 文件来管理整个工程依赖

- 创建一个新的工程目录，如 `vue-template`
- 进入该目录，执行命令 `npm init` ，按照提示一步一步填写信息

执行完毕之后，该目录会生成对应内容的 `package.json`，然后我们就可以在这个目录安装依赖了

### npm scripts

在 `package.json` 里面有一个 `scripts` 属性，它可以添加一些自定义的命令，让我们非常方便地去执行一些构建程序，如

```json
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }
```

对于其中定义的任务，我们可以直接通过 `npm run <name>` 来执行，如

```
npm run build
```

实际执行的就是

```
vue-cli-service build
```

这里 `vue-cli-service` 是作为一个项目依赖安装到 `node_modules` 目录的，因为 `vue-cli-service` 提供了命令行的支持，我们在 `npm scripts` 中调用它时就可以正常找到它，而不需要专门安装成一个全局命令。

有一些名字是 `npm` 默认支持的，比如 `start`，我们可以直接使用 `npm start` 来调用。

### 安装依赖

如果我们要安装一个生产环境依赖，如 `vue`, 可以在项目根目录（package.json 所在目录）执行命令

```
npm i vue
```

安装完之后，依赖关系会自动记录在 `package.json` 文件的 `dependencies` 中，如果我们要安装一个开发环境依赖，如 `eslint`，可以添加一个 `--save-dev` 参数，如

```
npm i eslint --save-dev
```

安装完之后，依赖关系会自动记录在 `package.json` 文件的 `devDependencies` 中，这两种方式安装的依赖，代码都会被下载到项目根目录的 `node_modules` 目录，除此之外还会生成一个名为 `package-lock.json`，这里面记录了整个已安装的依赖关系和下载地址，可以帮助我们锁定依赖版本。`node_modules` 通常比较庞大，通常来说当我们发布项目或者将项目代码提交到 Git 仓库时，需要将 `node_modules` 目录添加到忽略列表，只提交 `package.json`、`package-lock.json` 即可，其他人拿到代码之后只需要在项目根目录执行命令

```
npm i
```

npm 就会根据 `package.json`、`package-lock.json` 中的记录自动帮你安装所需要的依赖模块

> 需要注意，在执行 npm 安装模块的命令时，一定要保证该目录存在正确的 `package.json` 文件，否则 npm 会一层一层往上递归寻找 `package.json`，直到分区根目录

### 全局安装

有些 npm 模块提供了命令行调用的支持，我们可以用 `-g` 来将它安装成一个全局命令，比如之前我们安装过的 `typescript`

```
npm i typescript -g
```

通过这种方式安装的模块安装为一个命令，比如 `typescript` 定义的命令为 `tsc`，我们就可以全局使用这个命令来编译 TS 代码了，需要注意的是，通过 `-g` 安装的模块并不会存在于本地项目的 `node_modules` 中，而是由 npm 全局管理，也不能在代码中直接引用。

### 删除依赖

如果我们想要删除一个已安装的依赖，如 `vue`，只需要在 `package.json` 所在的目录执行命令

```
npm remove vue
```

如果要删除一个全局安装的模块，需要再加上 `-g` 的参数，如

```
npm remove typescript -g
```

## types

在我们使用 TypeScript 的过程中避免不了需要引用第三方的库，例如 react，有些库自身就使用 TS 开发，发布到 npm 的时候也携带了对应的类型定义文件，对于这种库 TS 可以直接识别它的类型，但是大部分的库还是采用传统的 JS 开发，TS 无法直接识别它的类型，所以 TS 采取了一种机制，可以为传统的 JS 模块编写类型定义文件，来描述他们的接口类型，然后通过 npm 仓库 `@types/<name>` 来发布，比如 react 是标准 JS 开发的，社区为它编写了 TS 类型定义模块，可以让 TS 识别 react 中的接口和数据类型，然后通过 `@types/react` 来发布，对应的地址为 [https://www.npmjs.com/package/@types/react](https://www.npmjs.com/package/@types/react)，我们前面的课程示例中也有用到它，可以用下面的方式来安装

```
npm i @types/react --save-dev
```

在以后的开发中，如果你要在 TS 中使用某一个第三方的 npm 模块，需要先看一下它自身有没有携带类型定义文件，如果没有的话，再去 `@types` 下面看一下有没有社区提供的版本，目前主流的常用库基本都覆盖了。

## Vue 组件

通过`vue-cli`创建的基础的项目里有一个`components`文件夹，其中包含一个`HelloWorld.vue`，这个`HelloWorld.vue`就是一个组件。它通过 import 的方法被其他组件或者页面所引用。**这是模块系统中局部引用组件的方法**。除了该引用方法，还有[全局引用以及局部引用](https://v3.cn.vuejs.org/guide/component-registration.html#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)的方法。

### 组件的名称

`HelloWorld.vue`的`script`中有一个`name`字段，它代表组件的名称。

在 Vue 中，有两种命名的标准。

- kebab-case：当使用 kebab-case (短横线分隔命名) 定义一个组件时，你在引用这个自定义元素时也必须使用 kebab-case

- PascalCase：当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。

#### 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

另外，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

两种常见的试图变更 prop 的情况：

1. **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。** 在这种情况下，最好定义一个本地的 data property 并将这个 prop 作为其初始值：

```js
props: ['initialCounter'],
data() {
  return {
    counter: this.initialCounter
  }
}
```

2. **这个 prop 以一种原始的值传入且需要进行转换。** 在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
  normalizedSize() {
    return this.size.trim().toLowerCase()
  }
}
```

### 自定义事件

Props 的类型包含了 Function，可以用作父组件向子组件传递回调函数，但在 Vue 中，更倾向使用 Event 而不是 Props 传递。Vue 提供了 `emit` 用于子组件向父组件抛出事件，具体用法如下：

```html
<!-- hello-world组件中 -->
<button @click="handleClick">button</button>
... 
export default { 
  ...
  emits: ["hello"], 
  methods: { handleClick: function() { this.$emit("hello") } }
}
```

```html
<!-- 父组件调用hello-world -->
<hello-world @hello="printName" />
... 
export default { 
  methods: { 
    printName: funtion() { 
      console.log("hello world!") 
    } 
  } 
}
```

以上是最基础的使用方法，还可以使用`this.$emit`传递一些参数，具体的使用方法可以参考[该文档](https://v3.cn.vuejs.org/api/options-data.html#emits)。

### slot

现在可以传递数据以及方法给子组件了，但还存在一种场景，需要把组件或者是其他的 DOM 节点传递给子组件展示出来，这个时候就用到了 slot 插槽。

```html
<!-- hello组件内容 -->
<div>
  <slot></slot>
</div>
```

使用的话：

```html
<hello>hello world!</hello>
```

当渲染时，`<slot></slot>`会被替换成`hello world!`。

以上是`slot`的基础用法，它还有一些限制以及其他的用法，例如多个 slot、传入的 slot 的 props 的限制等等，具体的内容请查看[该文档](https://v3.cn.vuejs.org/guide/component-slots.html)。

## [组件的生命周期](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html)

一个页面或者组件从资源加载到被人眼识别到最后被销毁，存在一个一个的时间节点，这些时间节点就是这个页面或者组件的生命周期。

![](./assets/lifecycle.svg)

1. new vue(): 这是 new 了一个 vue 的实例对象；此时就会进入组件的创建过程。

2. Init Events & Lifecycle: 初始化组件的事件和生命周期函数；当执行完这一步之后，组件的生命周期函数就已经全部初始化好了，等待着依次去调用。

3. beforeCreate: 这是第一个生命周期函数；此时，组件的 data 和 methods 以及页面 DOM 结构，都还没有初始化；所以此阶段，什么都做不了。

4. Init injections & reactivity: 这个阶段中，正在初始化 data 和 methods 中的数据以及方法。

5. created: 这个组件创建阶段第二个生命周期函数，此时，组件的 data 和 methods 已经可以用了；但是页面还没有渲染出来；在这个生命周期函数中，经常会发起 HTTP 请求获取数据。

6. 接下来就是解析模板结构，把 data 上的数据拿到，并且解析执行模板结构汇总的指令；当所有指令被解析完毕，那么模板页面就被渲染到内存中了；当模板编译完成，我们的模板页面，还没有挂载到页面上，只是存在于内存中，用户看不到页面。

7. beforeMount: 当模板在内存中编译完成，会立即执行实例创建阶段的第三个生命周期函数，这个函数就是 beforeMount，此时内存中的模板结构，还没有真正渲染到页面上；此时，页面上看不到真实的数据，用户看到的只是一个模板页面而已。

8. mounted: mounted 是组件创建阶段最后的一个生命周期函数；此时，页面已经真正的渲染好了，用户可以看到真实的页面数据了；当这个生命周期函数执行完，组件就离开了创建阶段，进入到了运行中的阶段；如果大家使用到一些第三方的 UI 插件，而且这个插件还需要被初始化，那么，必须在 mounted 中来初始化插件。

9. beforeUpdate: 在执行 beforeUpdate 运行中的生命周期函数的时候，数据肯定是最新的；但是页面上呈现的数据还是旧的。

10. updated: 页面完成更新，此时，data 数据是最新的，同时，页面上呈现的数据也只最新的。

11. beforeUnmount: 当执行 beforeDestroy 的时候，组件即将被销毁，但是还没有真正开始销毁，此时组件还是正常可用的；data、methods 等数据或方法，依旧可以被正常访问。

12. unmounted: 组件已完成了销毁，组件无法使用，data 和 methods 都不可使用。

## 组件间通信

组件间通信分为：

1. 父子组件通信

该种情况使用 Props 即可。

静态 Props：

```html
<Child msg="productList" />
```

动态 Props：

```html
<Child :name="username" />
```

子组件：

```js
...
props: {
  msg: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
}
...
```

2. 兄弟组件之间通信

兄弟组件之间的通信可以使用`EventBus`实现 **它是一种解决方案 但不推荐 可以考虑Vuex实现**。

3. 多层级组件之间通信

多层级组件通信可以使用[`provide/inject`](https://v3.cn.vuejs.org/guide/component-provide-inject.html)或者使用`vuex`实现。

## setup 与 组合式Api

之前讲解的示例代码以及Vue的基础语法是选项式的写法，在处理逻辑稍微复杂的组件时，选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。

如果能够将同一个逻辑关注点相关代码收集在一起会更好。而这正是组合式 API 使我们能够做到的。

组合式 API 与选项式 API 大部分都是一一对应的，例如声明周期函数、computed、watch等，它用在一个叫做 `setup` 这个选项中。

```vue
<template>
  <input v-model="inputValue" type="text" @keydown.enter="handleEnter" />
  <TodoItem v-for="item in list" :key="item" :content="item" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import TodoItem from "./components/TodoItem.vue";

export default defineComponent({
  name: "App",
  components: {
    TodoItem,
  },
  setup() {
    const list = ref<string[]>([]);
    const inputValue = ref("");
    const handleEnter = () => {
      list.value.push(inputValue.value);
      inputValue.value = "";
    };
    const inputLength = computed(() => inputValue.value.length * 2)
    onMounted(() => {
      console.log("mounted");
    });
    watch(inputValue, (oldValue, newValue) => {
      console.log(oldValue, newValue);
    });
    return {
      inputValue,
      inputLength,
      list,
      handleEnter,
    };
  },
});
</script>
```

在 [setup](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 中，可以定义 data、methods、watch、computed 以及生命周期：

1. data 可以用[`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)来进行定义，并在 setup 返回值中 return 出去即可。

2. 定义的 method 若是 template 中需要引用，也通过 setup 返回值 return 出去即可。

3. 组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 on：即 mounted 看起来会像 onMounted。

4. watch，就像我们在组件中使用 watch 选项并在某个变量上设置侦听器一样，我们也可以使用从 Vue 导入的 watch 函数执行相同的操作。它接受 3 个参数：

- 一个想要侦听的响应式引用或 getter 函数
- 一个回调
- 可选的配置选项

5. computed，与 ref 和 watch 类似，也可以使用从 Vue 导入的 computed 函数在 Vue 组件外部创建计算属性。

### \<script setup>

\<script setup> 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。相比于普通的 \<script> 语法，它具有更多优势：

- 更少的样板内容，更简洁的代码。
- 能够使用纯 Typescript 声明 props 和抛出事件。
- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。

```vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import TodoItem from "./components/TodoItem.vue";

interface Props {
  content: string;
}
const name = ref("");
const props = withDefaults(defineProps<Props>(), {
  content: "",
});

onMounted(() => {
  console.log("mounted");
});
</script>
```

> setup语法中使用ref创建的Ref对象是具有响应性的，具体的响应性说明可查看[该文档](https://v3.cn.vuejs.org/guide/reactivity.html)。ref只是众多响应性Api的一个，更多api可查看[该文档](https://v3.cn.vuejs.org/api/reactivity-api.html)。

## 路由

[https://router.vuejs.org/zh/installation.html](https://router.vuejs.org/zh/installation.html)

目前我们所接触到的 vue 例子都是单页面的，只有一个页面组件，在实际项目中通常都会有多个页面存在，可以通过链接来进行切换，达到多页面的效果。要实现这个功能，我们需要借助于 Vue 的路由模块 `vue-router` 来实现，它可以让我们监听浏览器地址的变化，并且解析这个 URL 对象，然后 router 根据 URL 的路径匹配到路由对应页面组件，最后正确地渲染对应地组件，这个就是路由工作的基本原理。

安装依赖：

1. npm 下载

```
npm i vue-router
```

根据自己的需要下载需要的版本，vue2.x 下载 vue-router3.x 的版本即可。 

2. 若该项目是 vue cli 创建，则直接运行以下命令:

```bash
vue add router
```

运行该命令会覆盖你的 App.vue，因此请确保在项目中运行以下命令之前备份这个文件

3. 在使用 vue cli 创建项目时，在 `Manually select features` 选择时，把 `vue-router` 勾选上


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

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
```

`<router-link>` 组件支持用户在具有路由功能的应用中 (点击) 导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 \<a> 标签。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名
`<router-view>` 组件是一个 functional 组件，渲染路径匹配到的视图组件。

```js
// 定义路由组件.
// 也可以从其他文件导入
const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };

// 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

// 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  mode: "history",
  routes, // `routes: routes` 的缩写
});

// 创建并挂载根实例
createApp(App).use(router).mount('#app')
```

### 路由的传参

有时候我们的页面会接收一些参数，比如根据传入的关键词去进行搜索，`vue-router` 支持路由参数，我们可以用下面的方式来定义

```ts
const routes = [
  // 动态字段以冒号开始
  { path: "/search/:keyword", component: Search },
];
```

路径参数 用冒号 : 表示。当一个路由被匹配时，它的 params 的值将在每个组件中以 this.$route.params 的形式暴露出来。

```ts
const Search = {
  template: "<div>Search {{ $route.params.keyword }}</div>",
};
```

除了 $route.params 之外，$route 对象还公开了其他有用的信息，如[ $route.query（如果 URL 中存在参数）、$route.hash](https://router.vuejs.org/zh/api/#routelocationnormalized) 等。

### 路由导航

我们可以使用两种方式来在页面中切换路由，`vue-router` 提供了一个 [`router-link` ](https://router.vuejs.org/zh/api/#router-link-props)组件，我们可以用它来替代传统的 a 标签，因为我们使用的 `history` 模式，它其实是利用浏览器的 `history.pushState` 来实现的，它可以在浏览器添加历史状态，修改当前的 URL 而不会引起页面的刷新，`router-link` 可以帮我们拦截用户的点击，然后完成 `pushState` 相关的操作，这样就可以在切换路由的同时保持页面的状态，而不是刷新页面。它的基本用法如下：

```ts
<router-link to="/home">Home</router-link>
```

> router-link 提供了 exact-active-class 属性，当链接激活时，应用于渲染的 \<a> 的 class。

参数 `to` 就是要导航到的路由，需要注意，router-link 标签只用来切换应用内的路由，如果你想要跳转到外部链接，例如 `MDN`，那你应该使用传统的 a 标签，如

```ts
<a href="https://developer.mozilla.org/zh-CN/">MDN</a>
```

还有一种方式是通过 API 来进行导航

```ts
this.$router.push("/about");
```

push 通过在历史堆栈中推送一个 entry，以编程方式导航到一个新的 URL。还存在其他的 api 用于不同场景的导航方式，例如[replace、back](https://router.vuejs.org/zh/api/#router-%E6%96%B9%E6%B3%95)等。

### 在setup中获得访问路由和获取当前路由
因为我们在 setup 里面没有访问 this，所以我们不能再直接访问 this.$router 或 this.$route。作为替代，我们使用 useRouter 函数。

```ts
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query,
        },
      })
    }
  },
}
```

> route 是一个响应式对象，所以它的任何修改都可以被监听。我们应该避免监听整个Route。

```ts
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const userData = ref()

    // 当参数更改时获取用户信息
    watch(
      () => route.params,
      async newParams => {
        userData.value = await fetchUser(newParams.id)
      }
    )
  },
}
```

> 请注意，在模板中我们仍然可以访问 $router 和 $route，所以不需要在 setup 中返回 router 或 route。

## 课后任务

本周任务是完成一个简化版的什么值得买多路由页面，设计参考task目录下面的效果图，具体说明如下：

该任务一共有三个路由页面，分别为 `Posts`、`News`、`Detail`，所需数据通过远程API的形式提供，不在需要本地JSON文件，`devServer` 中已经配置好了代理，全部通过GET方式调用，数据结构说明如下，文章内容只会在 `detail` 接口中返回，列表接口不会返回，具体的API请求已经在 `services/api.ts` 中封装好，直接调用即可

### 技术要求

- 使用 ts + setup 的语法进行代码编写
- 使用rem布局，不需要支持响应式，只需要支持手机设备的正常缩放
- 效果图是750px宽，2倍屏，需要自行计算rem的缩放比例，不需要监控 `onresize`，只需要页面刷新的时候计算
- 三个页面分别编写路由组件，默认显示好文推荐 `Posts`
- 排行榜的导航要固定在顶部，下面的列表部分可以滚动
- 导航项需要跟随路由自动选中
- 好文推荐的前五条记录左上角需要显示排名图标
- 点击文章列表项可以跳转到文章详情页，携带文章ID，不能引起页面的重新加载
- 详情页面顶部栏需要固定在上方，下方文章区域可以滚动，注意文章内容部分需要自己编写样式，让文字和图片合理排版。
- 点击详情左上角的返回按钮可以回退到上一页
- 顶部显示作者的头像和名字
- 修改 `README.md` 记录作业完成的思路和遇到的问题
- 代码在下周四之前推送至 `task` 仓库的 `week-07` 目录

### 提示

- 所需知识点在demo工程 `vue-routes` 中基本都有覆盖，可以直接借鉴参考, 合理拆分组件
- 排行榜的导航栏需要根据路由自动选中，但是只出现在 `Posts`、`News` 两个组件中，`Detail` 组件中并不包含
- 所需的两个字体图标分别为 `icon-comments`、`icon-likes`，已经定义好，可以通过这样来引用

```ts
<i class="iconfont icon-comments" />
<i class="iconfont icon-likes" />
```

- 热点资讯列表项的配图区域是固定尺寸，而我们的banner图都是宽图，这里需要处理一下样式让图片正常显示而不出现拉伸。可以借助于 `background-size`、`background-position`，让图片能够垂直方向铺满，水平方向居中显示，超出的部分则不用显示。
- 文章内容部分是富文本，也就是包含html标签，直接通过插值的方式引用的话，Vue会将其转义，需要使用 `v-html` 指令。
