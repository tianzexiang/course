# React 高级

## Sass

[https://sass-lang.com/](https://sass-lang.com/)

Sass 是一种 CSS 的预处理语言，它在 CSS 的基础上增加了一些编程语言的特性，可以提升我们编写 CSS 的效率，减少很多重复性的代码，最终编译成纯净的 CSS 代码执行。Sass 是 CSS 的超集，就像我们使用的 TS 和 JS 的关系，我们也可以把 Sass 完全当作 CSS 来使用。Sass 的文件后缀名是`.scss`，意思是`sassy css`。

> Sass 的文件后缀也可以是`.sass`，但该类文件的语法和 CSS 的语法不太一样，它以严格的缩进式语法规则来书写，不带大括号和分号，而 `.scss` 的语法书写和我们的 CSS 语法书写方式非常类似。

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

```sass
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none
```

> 后续我们主要使用`scss`来开发

同样流行的 CSS 预处理器还有 Less、Stylus，大家的基础功能都比较类似，`create-react-app`更加支持 Sass 语法，所以我们先来学习它。

### 安装

我们可以通过 `npm` 来将 `sass` 编译器安装为一个命令

```
npm i sass -g
```

然后我们可以通过 `sass` 命令来编译 `scss` 文件了

```
sass test.sass
```

上面的命令会直接打印编译之后的结果，如果要输出到文件，可以加上输出文件名

```
sass test.sass test.css
```

### 变量（Variables）

```sass
$width: 10px;
$height: $width + 10px;
$color: #f00;

.header {
  width: $width;
  height: $height;
  color: $color;
}
```

> 现在 CSS 支持原生变量了，而且是动态的，有些时候使用原生变量会是一种更好的选择，如果需要考虑兼容性，可以使用 Sass 的变量

### 混合（Mixins）

`Mixin` 是一种将一组属性从一个规则集混入到另一个规则集的方法。假设我们定义了一个类如下

```scss
@mixin bordered() {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

如果我们想要在其他类中混入这些属性，只需要像函数一样调用他们即可：

```scss
.menu a {
  color: #111;
  @include bordered();
}

.post a {
  color: red;
  @include bordered();
}
```

`bordered` 所包含的属性就同时出现在 `.menu a` 和 `.post a` 中了

### 嵌套（Nesting）

Sass 提供了嵌套代替层叠或者与层叠结合使用的能力，假如我们有下面的 CSS 代码

```scss
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

如果使用 Sass

```scss
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

还可以和伪类或者子元素选择器，如

```less
#header {
  color: black;

  &:hover {
    color: red;
  }

  & > span {
    font-weight: bold;
  }
}
```

> 过深的嵌套只会让代码难以维护，建议嵌套不要超过三层，如果出现要嵌套超过三层的情况，应该考虑如何优化选择器的设计。

### 模块（Modules）

我们可以将Scss文件拆分成模块单一的文件，需要用到某个模块时，可以从那个 Scss 文件导入进来，例如我们可以把变量样式都定义在一个单独的 Scss 模块中，其他文件都来引用它，通常我们用这种方式来控制主题样式，当我们需要修改主题的时候，只需要修改变量文件中的值，然后重新编译即可。

`vars.scss`

```scss
$primaryColor: #f00;
$textColor: #666;
```

`theme.scss`

```less
@use "vars";

#header {
  background-color: vars.$primaryColor;
  color: vars.$textColor;
}
```

## CSS Modules

借助于 webpack，我们可以把 CSS 也当成模块来拆分引用了，但是模块化的一个核心是作用域隔离，CSS 并没有真正的模块化机制，这意味着我们写在不同文件中的 CSS 代码中的类会对整个 HTML 页面起作用，随着我们应用中组件的增多，很容易会出现类名冲突引发样式混乱。通常我们解决这种问题需要靠命名的约定，每个模块用自己的前缀然后加上嵌套等方式，如：

```scss
.button {
}
.button-default {
}
```

```scss
.modal {
}
.modal-header {
}
```

但是这样也不安全，需要大家都自觉遵守。

现在 `css-loader` 提供了一种叫做 `CSS Modules` 的方案，可以帮我们自动生成唯一的类名，不会和其他模块的命名出现冲突

我们在代码中导入的 scss 文件返回的就是一个键值对了，其中键名是原始的类名或 ID 名，键值就是转换输出之后的名字，如：

```js
{
  btns: "btns-bdd41",
  body: "body-dab49"
}
```

> Creat-React-App 创建的项目默认支持该种语法，无需多余的配置。

所以我们就不能在 JSX 中填写固定的类名了，需要使用变量的方式，如下

```ts
import * as React from "react";
// create-react-app 生成的项目会将*.module.(scss|css)文件使用Css Module
import style from "./style.module.scss";

export default class Main extends React.Component {
  render() {
    return (
      <div className={style.body}>
        <div className={style.btns}></div>
      </div>
    );
  }
}
```

CSS Modules 会转换所有的类名和 ID 名，如果有些名字我们不想让它转换，可以使用 `:global()`，如：

```scss
:global(#app) {
  background-color: #f4f4f4;
}
```

## MobX

目前位置我们所接触到的 React 中的状态都只在组件内部或者父子组件之间传递，但是有些特殊的状态我们需要在很多不同的组件中都能访问它，而且当这些状态发生变化的时候可以引起界面的刷新，比如我们可以把当前登录的用户信息放到全局状态中，其他组件可以直接引用。

如果想要实现全局状态的管理，我们可以借助于 React 提供的 `Context` 或者社区的 `Redux` ，`MobX` 也是一个非常流行的状态管理库，它使用非常简单，上手容易，我们来学习一下它的基本使用。

### 创建全局状态

我们首先要创建一个状态类，来管理我们的全局状态，如

```ts
import { makeAutoObservable } from "mobx";

class Store {
  username: string = "name";

  setUsername(name: string) {
    this.username = name;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default new Store();
```

最后我们导出一个状态类的实例

### 绑定状态

如果想在某一个组件中绑定 store 中的状态，需要给类组件添加一个装饰器，然后就可以当成一个普通的状态来引用了

```ts
import * as React from "react";
import { observer } from "mobx-react";

import store from "../../store";

@observer
export default class Test extends React.Component {
  render() {
    return <div>Test: {store.username}</div>;
  }
}
```

通过 `import` 将全局状态导入，然后在代码中引用即可

### 修改状态

任何时候都应该避免直接修改 store 中的值，我们在 store 中定义一些方法，通过这些方法来对原始状态修改。这样做的好处是我们可以在方法中控制对状态修改的逻辑，避免引起混乱。

```ts
<button onClick={() => store.setUsername("Test")}>change</button>
```

## Ant Design

[https://ant.design/index-cn](https://ant.design/index-cn)

`Ant Design` 是阿里推出的一套设计体系，`antd` 是基于这套设计体系的 React UI 组件库，主要用于开发企业级的中后台产品，它的组件质量非常高，而且使用 TypeScript 开发，提供完整的类型定义文件，是 React 社区最为知名的组件库。

想要使用 `antd`，我们只需要通过 npm 安装即可

```
npm i antd
```

假如我们想要引用某一个组件如 `Button`，只需要

```ts
import * as React from "react";
import { Button } from "antd";

export default class Main extends React.Component {
  render() {
    return <Button>Btn</Button>;
  }
}
```

更多详细的用法参考官方文档和示例代码
