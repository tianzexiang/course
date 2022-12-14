# React Hooks

- 脚手架
- hook

## create-react-app

[https://create-react-app.dev/](https://create-react-app.dev/)

之前我们学习了多种组织 `React` 工程的方式，比如通过原生 `ES Modules` 加载以及自己配置 `webpack` 构建流程，目的是让大家更好了解 `React` 的基本原理，在实际开发中我们可以借助于脚手架工具来快速创建一个配置好的 `React` 工程。

`create-react-app` 是 `React` 团队官方推出的脚手架工具，它提供了很多开箱即用的配置，让我们可以把精力集中在具体的业务开发上面。要使用脚手架非常简单，通过下面的命令来即可创建一个使用 `TypeScript` 的 `React` 工程。

```
npx create-react-app react-app --template typescript
```

`npx` 是一个 `npm` 自带的命令，它可以临时安装一个全局模块而避免全局污染，而且每次都是基于最新的模块版本。通过上面的命令我们可以直接在创建好的 `react-app` 项目中使用 `TypeScript`、`CSS Modules` 等我们熟悉的技术来编写代码了，整个的构建流程都已经帮我们封装好。`create-react-app` 默认没有支持 `less`，我们可以使用 `CSS` + `Modules` 的方式来编写样式，或者使用 `SCSS`。

`src` 就是我们存放源代码的目录，除了 `react-app-env.d.ts`（定义自定义模块的类型如图片、样式），其他的基本都可以替换成我们自己的内容。

### CSS Modules

`create-react-app` 会把 `.module.css` 或者 `.module.scss` 结尾的文件当成 `CSS Modules` 来处理，所以如果我们想要使用该功能，只需要将组件的css文件命名为 `style.module.css` 这种结构，然后在组件中这样来引用

```ts
import styles from './style.module.css'
```

后面的用法和之前就完全一样了，对于不是以 `.module.css` 结尾的css文件，会被当做普通css处理，不会做类名转换。

### 添加代理

`create-react-app` 默认支持的代理功能比较简单，只需要在 `package.json` 中添加一个属性

```json
"proxy": "http://localhost:4000"
```

这样本地开发环境无法被响应的请求就会被代理到proxy的地址，用于访问我们后端的API接口。

### 启动调试

```
yarn start
```

### 构建

```
yarn build
```

### axios

[https://github.com/axios/axios](https://github.com/axios/axios)

`axios` 是一个知名的http请求库，同时支持浏览器端和Node.js端，`axios` 提供了很多功能强大的API，比如拦截器、取消请求、传输进度等，非常方便我们对网络请求进行控制，后面的项目中我们都会使用这个库来请求API。

## Vite

[https://vitejs.dev/](https://vitejs.dev/)

`Vite` 是近两年流行起来的新一代前端脚手架，它使用了原生的 `ES Module` 模块技术，非常轻量、快速，但是对于浏览器会有一定的要求，一些库可能会存在兼容性问题，喜欢尝鲜的同学可以自行学习，示例工程 `hooks-demo` 就是使用 `Vite` 创建的，后面的工程还是会以 `cra` 为主。

## 函数式组件

我们前面学习的 `React` 组件都是基于类的，类相对来说比较复杂，而且内部的逻辑通常难以复用，对于一些简单场景，我们可以创建函数式组件，组件的定义就是一个函数，如下面的例子：

```ts
interface IComment {
  author: string
  text: string
  date: string
}

function Comment(props: IComment) {

  const onClick = () => {
    console.log(props)
  }

  return (
    <div className="comment" onClick={onClick}>
      <div className="comment-author">
        {props.author}
      </div>
      <div className="comment-text">
        {props.text}
      </div>
      <div className="comment-date">
        {props.date}
      </div>
    </div>
  )
}
```

从上面的例子我们可以看到，整个组件的代码非常简洁，相对于类组件来说简单清晰了很多，但是普通的函数式组件也有一些不同，比如没有 `this`、没有内部状态 `state`、没有生命周期，只能通过 `props` 从外部传入数据，每次组件的更新其实都是函数的重新执行。

## Hook

Hook是React 16.8的新增属性，它可以让我们在不编写class的情况下使用state以及其他的React特性，Hook就相当于添加了内部状态的函数式组件，Hook已经目前前端的主流开发方式，Vue3中也引入了类似的特性，在后面的项目中我们会全面使用Hook。

### useState

```ts
import { useState } from 'react'

export default function Example1() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

上面的例子中 `useState` 就是一个 `Hook`，通过在函数式组件里面调用它来添加一些内部状态 `state`，前面我们讲到，函数式组件在刷新时会重复执行函数，意味着每一次我们在页面上看到的组件都是函数最新执行返回的结果，函数内部的变量都是当前作用域的，可以把每次函数式组件的更新当成一帧。而通过 `useState`，React在重复渲染时会保留这个 `state`。`useState` 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数或其他一些地方调用这个函数。它类似于类组件的 `this.setState`，不过不同的是

> `useState` 更新状态不会把新的state和旧的state合并，而是会直接覆盖整个状态，如果state中保存的是一个对象，在更新的时候需要注意使用解构赋值来确保修改state的完整性，另外通过 `useState` 来修改状态的时候如果状态值是对象或数组，React会进行浅比较，如果浅比较没有发生变化则不会引发组件的刷新

`useState` 唯一的参数就是初始 `state`，我们可以在state中存放对象、数组，也可以多次使用 `useState` 来创建多个 `state`

`Hook` 就是可以让你在函数式组件内部“钩入” `React state` 以及生命周期等特性的函数，`Hook` 不能在类组件中使用。

### useEffect

我们已经写过很多在React组件中进行数据获取、订阅事件甚至修改DOM之类的操作，这些行为在React中统一被称为“副作用”，`useEffect` 就是React内置的一个 `Effect Hook`，给函数增加了操作副作用的能力，它跟类组件中的 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 具有相同的用途，可以实现生命周期的效果，不过被合并成了一个API。

```tsx
import { useState, useEffect } from 'react'

export default function Example2() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

现在对前面的 `Counter` 做一些修改，我们加入了 `useEffect` 来执行副作用，当组件每一次刷新的时候会同时改变页面的标题。当你调用 `useEffect` 时就是在告诉React在完成DOM的更改后运行你的副作用函数，由于副作用是在组件内声明的，所以它可以访问到组件的props和state，默认情况下，React会在每次渲染后调用副作用函数，包括第一次渲染的时候。

`useEffect` 还可以通过第二个参数传入依赖，只有当依赖的状态发生变化时才会执行副作用，如

```tsx
import { useState, useEffect } from 'react'

export default function Example3() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)

  useEffect(() => {
    console.log(count)
    document.title = `You clicked ${count} times`
  }, [count])

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>Value {value}</p>
      <button onClick={() => setValue(value + 1)}>
        Increase
      </button>
    </div>
  )
}
```

上面的例子我们定义了两个状态，`count` 和 `value`，并且传入了 `[count]` 作为副作用函数的依赖，也就是当 `count` 发生变化时才会执行这个副作用函数，当修改 `value` 时不会执行，如果我们去掉 `[count]`，那么不管修改哪个状态都会引起副作用函数的执行，显然不符合我们的期望。

如果第二个参数传入一个空数组 `[]`，那么这个副作用函数只会在组件挂载的时候执行一次，相当于类组件的 `componentDidMount`，`useEffect` 可以返回一个函数用来执行清除副作用的操作，React会在卸载组件的时候执行清理操作，相当于类组件的 `componentWillUnmount`，通常用于清除事件监听器之类的操作，如

```tsx
React.useEffect(() => {
  console.log('mount')
  return () => {
    console.log('unount')
  }
}, [])
```

添加副作用依赖的时候需要非常小心，如果在副作用函数里面修改了自己依赖的状态，那么很可能会导致死循环执行。

### useRef

`useRef` 返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的参数。返回的 `ref` 对象在组件的整个生命周期内保持不变。

一个常见的用例便是命令式地访问子组件：

```tsx
import { useRef } from 'react'

export default function Example4() {
  const input = useRef<HTMLInputElement>(null)

  const focus = () => {
    input.current?.focus()
  }

  return (
    <div>
      <button onClick={focus}>Focus</button>
      <input type="text" ref={input} />
    </div>
  )
}
```

请记住，当 `ref` 对象内容发生变化时，`useRef` 并不会通知你。变更 `.current` 属性不会引发组件重新渲染，通常我们会使用它来记录组件生命周期内需要依赖的一些变量，它不会随着组件的刷新而改变，它的改变也不会引发组件的自动刷新，现在来尝试一下如何通过 `useRef` 来实现 `title` 的修改和还原

### useMemo

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算缓存的值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行不应该在渲染期间内执行的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### useCallback

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的缓存版本，该回调函数尽在某个依赖项改变时才会更新，当你把回调函数传递给经过优化的并使用引用相等性去避免非必要的渲染的子组件时，它将非常有用

```tsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b)
  },
  [a, b],
)
```

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

### 理解Hook

理解 `Hook` 的工作机制至关重要，前面我们讲到，函数组件每次刷新都会引起函数的重新执行，也就意味着每一次函数内部的变量都是重新初始化的，而 `Hook` 可以让函数组件在刷新的时候保留一些状态，当我们修改状态之后，组件函数会被重新执行，在重新执行的函数上下文拿到新的状态，下面我们通过几个例子来理解一下。

```tsx
import { useState } from 'react'

export default function Example6() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setTimeout(() => {
      setCount(count + 1)
    }, 2000)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}
```

这个例子里面我们添加了一个状态 `count`，当点击按钮时我们通过 `setTimeout` 延时2秒钟来修改 `count` 的值，如果点击一下按钮，过2秒钟会看到 `count` 变成了1，如果我们快速连续点击3次，按照直觉，`count` 应该变成 `3`，但是你会发现过了两秒钟之后 `count` 依然是 `1`。

如果把函数的每次执行理解为一帧，虽然我们连续点击了3次，但是这三次的 `setTimeout` 是在同一帧内执行的，它们的 `count` 都是初始值 `0`，所以最后看到的结果还是 `1`，如果想要得到期望的结果 `3`，可以给 `setCount` 传递一个函数，它可以接收上一次的状态，如：

```tsx
import { useState } from 'react'

export default function Example7() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setTimeout(() => {
      setCount(count => count + 1)
    }, 2000)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}
```

再来看一个更复杂些的例子，假如我们想要在 `Hook` 中编写一个计数器的功能，在组件挂载之后就开始计数，每隔1秒钟增加1，代码写起来可能会是这样

```tsx
import { useState, useEffect } from 'react'

export default function Example8() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count, Date.now())
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <p>Count {count}</p>
    </div>
  )
}
```

代码并没有按照我们期望的结果工作，虽然控制台一直在打印数据，但是`count` 始终显示为 `1`，这个是因为我们 `useEffect` 传入的依赖为 `[]`，也就是说副作用函数只会在组件挂载的时候执行一次，`setInterval` 取到的 `count` 一直都是第一帧的初始值 `0`，和前面的例子类似，要解决这个问题也有多种方法，比如也是给 `setCount` 传入一个函数，或者下面的方式：

```tsx
import { useState, useEffect } from 'react'

export default function Example9() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('new effect')
    const timer = setInterval(() => {
      console.log(count, Date.now())
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [count])

  return (
    <div>
      <p>Count {count}</p>
    </div>
  )
}
```

在这个例子里面我们把 `count` 添加进了副作用函数的依赖，这样每次 `count` 更新之后就会重新执行副作用，清除前一次的定时器，发起一次新的定时器，`count` 取到的也是最新的状态，实现一个正常的计数效果。

### 自定义hook

Hook带来的另外一大特性就是可以将逻辑、状态与组件解耦，并且可以在不同的组件之间复用。在以前写类组件的时候经常会遇到这种情况，随着业务越来越复杂，类组件里面包含了非常多的状态和逻辑，这其中又有一部份可能是其他一些组件也会用到的，然而在类里面定义的这些东西很难拆分出来给其他组件共享，也难以测试，Hook就是为了解决这个问题而诞生的，它可以让我们将状态、逻辑拆分到一个独立的Hook中，这样不同的组件都可以来引用它，从而避免重复性的工作，使得代码的可复用性大大增强。

通过示例工程可以看出，我们的页面组件和逻辑实现了解耦，组件仅保留了它最核心的任务：页面渲染、交互处理，状态和逻辑抽离到了自定义Hook中，实现了不同组件之间逻辑的复用。

### Context

到目前为止，不管是类组件还是Hook，我们所使用状态都是组件内部的，它只能在当前组件或者向下传递，但有时候会有一些特殊的状态需要在不同层级的组件之间共享，针对这种需求，React提供了自带的解决方案，那就是 `Context`，通过它我们可以定义一个状态，不同层级的组件都可以共享它。

`Context` 和自定义Hook很容易弄混它们的用途，表面上看起来自定义Hook也实现了状态的共享，但其实它只共享了逻辑，不同的组件中调用自定义Hook创建的都是独立的状态，一个组件修改了自己引用的自定义Hook中的状态，通常不会对其他组件产生影响，但是 `Context` 不一样，所有的组件引用的都是同一个状态，一个组件修改了这个状态也会影响其他的组件。所以总结下来就是：自定义Hook在不同的组件之间共享逻辑，`Context` 在不同的组件之间共享状态。

## 课后任务

参考 `todo-hooks`，自行创建工程，编码实现相同的功能和效果，基本要求如下

- 使用 `create-react-app` 创建工程，名为 `task-01`，使用 `typescript`、`scss`、`css modules`
- 数据通过 `localStorage` 持久化，使用 `Context` 全局共享任务记录
- 使用自定义Hook对状态的操作逻辑进行封装，如任务的添加、修改、删除
- 不允许引入外部组件库，自行封装所有用到的组件
- 通过 `iconfont` 搜索需要的 `svg` 图标，并且使用 `ReactComponent` 的方式来引入
- 尽可能还原 `todo-hooks`，**尤其是细节的处理**
- ESLint不允许出现警告或报错，不允许使用ESLint注释来跳过检查
- 可以参考 `hooks-example` 中的代码
- 周日之前推送至个人作业仓库的 `task-01` 目录
- 任务目录的 `README.md` 记录作业完成遇到的问题和总结

核心点

- 代码的复用性，相同作用的代码尽可能实现复用，避免重复实现多次
- 组件拆分、封装是否合理
- 代码的严谨性
- 逻辑、渲染解耦，自定义Hook、全局状态的实现
- 产品细节处理是否到位，各种边界条件、动画效果
- 各种Hook是否能合理使用，如 `useMemo` 缓存不同条件的列表数据，`useEffect` 对数据变化作出处理
