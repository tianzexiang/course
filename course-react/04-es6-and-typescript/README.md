# ES6/TypeScript

## ES6的发展过程

[https://es6.ruanyifeng.com/](https://es6.ruanyifeng.com/)

ECMAScript 6.0（ES6）是JavaScript语言的新一代标准，它于2015年6月正式发布，它的目标是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现，日常场合，这两个词是可以互换的。

在ES6之前，JavaScript语言是非常落后的，很多现代化的特性都不具备，难以支撑大型应用的开发，ES6的发布，使得JavaScript彻底改变。

目前ES的版本升级成为了一个不断滚动的流程，标准委员会最终决定，标准在每年的6月份正式发布一次，作为当年的正式版本。接下来的时间，就在这个版本的基础上做改动，知道下一年的6月份，草案就变成了新一年的版本，这样一来，就不需要以前的版本号了，只需要用年份来标记。

ES6于2015年发布，也称为ES2015，之后每年发布的版本变化都非常小，因此，ES6既是一个历史名词，也是一个泛指，涵盖了ES6之后的所有标准，所以我们简单认为ES6就是指的“新一代的JavaScript”语言，在发布之初ES6面临着许多兼容性的问题，主流的JavaScript引擎支持程度还不够高，通常需要使用 `Babel` 之类的工具来进行转义，现在我们可以借助最新的JS引擎来直接执行原生ES6代码了。

ES6包含的内容非常多，本课程内容不会对JavaScript基础语法做过多的讲解，这部分内容需要自行学习，这里主要介绍一些常见API的使用，如果想要熟练使用JavaScript，首先需要熟练掌握常用的API。

> `jQuery` 已经完成了它的历史使命，它的很多API如今已经成为标准，得到了原生的支持，在我们后面的课程中不会涉及 `jQuery`，也不允许在作业中使用。本章内容假定同学们已经完成了前面要求的JS相关基础知识的自学。

## 基础语法

### let

ES6新增了 `let` 命令用来声明变量，它的用法类似于 `var`，区别在于它只在 `let` 声明的代码块内有效，并且 `let` 在同一作用域内不能重复声明，我们建议在平时的开发中使用 `let` 替代 `var`。

```js
function varTest() {
  var x = 1

  if (x === 1) {
    var x = 2 // 两个x是同一个变量
    console.log(x)
    // 输出：2
  }

  console.log(x)
  // 输出：2
}
```

```js
function letTest() {
  let x = 1

  if (x === 1) {
    let x = 2 // 两个x是不同的变量
    console.log(x)
    // 输出：2
  }

  console.log(x)
  // 输出：1
}
```

另外，在程序和方法的最顶端，`var` 声明的变量会给全局对象增加属性，但是 `let` 不会，例如：

```js
var x = 'hello'
let y = 'hello'

console.log(this.x) // "hello"
console.log(this.y) // undefined
```

上面的 `this` 取决于执行环境，如在浏览器中执行，指向的是 `window` 对象，如在Node.js中执行，指向的则是 `global` 对象。

另外需要注意的是，`let` 在同一块作用域中不允许重复声明，例如：

```js
if (flag) {
  let test = 1
  let test = 2  // SyntaxError
}
```

使用大括号 `{}` 可以用来定义一个块级作用域。

### const

`const` 常量也是块级范围的，这一点与 `let` 相似，但 `const` 声明的值是无法被改变的，也不能被重新声明，全局常量也不会变为 `window` 对象的属性，所以，常量必须在声明的时候就指定它的值。

```js
const number = 123

number = 456  // Uncaught TypeError: Assignment to constant variable
```

一般我们建议在声明常量的时候全部采用大写字母，例如：

```js
const MY_NUMBER = 123
```

需要注意的是，如果 `const` 用来定义数组或对象，那么对于他们子项或者属性的修改是允许的，但是不能够对自身重新赋值，例如：

```js
const MY_ARRAY = [1, 2, 3]
MY_ARRAY.push(4)  // 允许
MY_ARRAY = [] // 不允许

const MY_OBJECT = { key: 123 }
MY_OBJECT.key = 456 // 允许
MY_OBJECT = { key: 456 }  // 不允许
```

如果想要冻结对象属性的修改，可以使用 `Object.freeze()` 来时对象不可变，例如

```js
const MY_OBJECT = { key: 123 }
Object.freeze(MY_OBJECT)
MY_OBJECT.key = 456 // 常规模式下该语句不会起作用，但是也不会报错，严格模式下会报错
```

### 解构赋值

解构赋值语法是一种JavaScript表达式，通过解构赋值，可以将属性、值从对象、数组中取出，赋值给其他变量，以前如果我们想要给变量赋值，只能直接指定变量的值，例如：

```js
let a = 1
let b = 2
let c = 3
```

如果我们想要从数组中取出值，需要这么来写：

```js
let array = [1, 2, 3]
let a = array[0]
let b = array[1]
let c = array[2]
```

如果我们想要从对象中取出属性和值，需要这么来写：

```js
let object = { a: 1, b: 2, c: 3 }
let a = object.a
let b = object.b
let c = object.c
```

通过上面的例子我们可以看到，书写起来非常的繁琐，不够简洁，现在通过ES6的解构赋值语法，我们就可以轻松实现。

#### 解构数组

基本语法如下，左侧的变量名和右侧数组中的元素一一对应

```js
let [a, b, c] = [1, 2, 3]
console.log(a)  // 1
console.log(b)  // 2
console.log(c)  // 3
```

可以给左边数组中的变量设置默认值，例如

```js
let [a = 1, b = 2] = [5]
console.log(a)  // 5
console.log(b)  // 2
```

可以通过解构直接交换两个变量，在没有解构的时候，我们需要一个中间临时变量

```js
let a = 1
let b = 2

// 不使用解构来交换
let c = a
a = b
b = c

// 使用解构来交换
[a, b] = [b, a]
console.log(a)  // 2
console.log(b)  // 1
```

解构数组一个常用的场景是解析函数返回值，例如

```js
function foo() {
  return [1, 2]
}

let [a, b] = foo()
console.log(a)  // 1
console.log(b)  // 2
```

可以忽略掉某些值。例如

```js
let [a,,,b] = [1, 2, 3, 4]
console.log(a)  // 1
console.log(b)  // 4
```

剩余模式，将剩余部分的数组赋值给一个变量

```js
let [a, ...b] = [1, 2, 3]
console.log(a)  // 1
console.log(b)  // [2, 3]
```

#### 解构对象

基本语法如下：

```js
let object = { a: 1, b: 2, c: 3 }
let { a, b } = object

console.log(a)  // 1
console.log(b)  // 2
```

可以从一个对象中提取变量并赋值给和属性名不同的新变量名

```js
let object = { a: 1, b: 2, c: 3 }
let { a: aa, b: bb } = object

console.log(aa) // 1
console.log(bb) // 2
```

解构对象也可以指定默认值，例如：

```js
let object = { a: 5 }
let { a = 1, b = 2 } = object

console.log(a)  // 5
console.log(b)  // 2
```

解构对象也支持剩余模式，例如

```js
let { a, ...b } = { a: 1, b: 2, c: 3 }
console.log(a)  // 1
console.log(b)  // { b: 2, c: 3 }
```

解构对象的一个典型应用场景是从函数参数对象中提取数据，例如下面的代码，函数接收的参数是一个对象，如果不使用解构，需要专门去读取参数对象中的属性值

```js
function test(user) {
  console.log(user.id, user.name)
}

let user = {
  id: 1,
  name: 'test'
}

test(user)
```

如果我们使用解构对象，接可以直接将属性取出来

```js
function test({id, name}) {
  console.log(id, name)
}

let user = {
  id: 1,
  name: 'test'
}

test(user)
```

### 模板字符串

模板字符串是增强版的字符串，用反引号 (\`)来标识，它可当作普通字符串来使用，也可以用来定义多行文本，或者通过 `${}` 在字符串中嵌入变量或表达式。

```js
let a = `template string` // 普通字符串

let name = 'Frank'
let b = `Hello ${name}!`
console.log(b)  // Hello Frank!
```

模板字符串的另外一大作用就是多行文本定义变得更加方便，对比例子：

```js
let name = 'Frank'

let a = `<div>
  <p>Hello ${name}!</p>
</div>`

let b = '<div>\n  <p>Hello ' + name + '!</p>\n</div>'

console.log(a === b)  // true
```

## 字符串操作

字符串处理是我们在编程的时候非常常用的功能，这里介绍一些基本的字符串处理方法，有的是ES6之前就存在的。

### substring

该方法返回一个字符串在开始索引到结束索引之间的一个子集，或者从开始索引到字符串末尾的一个子集。

**语法**

**参数**

- `indexStart`：需要截取的第一个字符的索引，该索引位置的字符作为返回的字符串的首字母。
- `indexEnd`：可选参数，一个0到字符串长度之间的整数，以该数字为索引的字符串不包括在截取的字符串内。

**返回值**

  包括给定字符串的指定部分的新字符串

下面查看一些示例：

```js
let str = '0123456789'
console.log(str.substring(0, 3))  // '012'
console.log(str.substring(3, 6))  // '345'
console.log(str.substring(0, -3)) // 相当于 str.substring(0, 0)，输出为空字符串
```

### slice

`slice` 的作用和 `substring` 非常类似，不同的是，`slice` 的参数可以为负数，表示倒数第几个字符

```js
let str = '0123456789'
console.log(str.slice(0, 3))  // '012'
console.log(str.slice(3, 6))  // '345'
console.log(str.slice(0, -3)) // '0123456'，表示从第0各字符提取到倒数第三个字符
console.log(str.slice(-3, -1))  // '78'
```

### includes

方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 `true` 或 `false`。

**参数**

- `searchString`：要搜索的字符串
- `position`：开始搜索的索引位置，默认为0，可选

示例：

```js
let str = '0123456789'
console.log(str.includes('123'))  // true
console.log(str.includes('123', 4)) // false
```

### startsWith

`startsWith` 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 `true` 或 `false`。

**参数**

- `searchString`：要搜索的字符串
- `position`：开始搜索的索引位置，默认为0，可选

示例：

```js
let str = '0123456789'
console.log(str.startsWith('0123')) // true
console.log(str.startsWith('1234'))  // false
console.log(str.startsWith('1234', 1))  // true
```

### endsWith

`endsWith` 与 `startsWith` 作用类似，用来判断当前字符串是否以另外一个给定的子字符串结尾，`endsWith` 的第二个参数是可选的 `str` 长度，示例如下：

```js
let str = '0123456789'
console.log(str.endsWith('789'))  // true
console.log(str.endsWith('456', 7)) // true，相当于判断 '0123456'.endsWith('456)
```

### repeat

该方法返回一个新字符串，表示将原字符串重复 `n` 次，示例如下：

```js
'abc'.repeat(2) // 'abcabc'
```

### padStart、padEnd

这两个方法提供了字符串补全长度的功能，如果某个字符串不够指定的长度，会在头部或者尾部补全，`padStart` 用于头部补全，`padEnd` 用于尾部补全，这个在格式化字符串的时候非常有用，示例如下：

```js
'5'.padStart(5, '0')  // '00005'
'123'.padEnd(5) // '123  '，默认使用空格补全
'12345'.padStart(4) // '12345'，超出长度，不会变化
```

### trim、trimStart、trimEnd

这三个方法的作用类似，`trim` 用来消除字符串首尾的空格，`trimStart` 用来消除字符串头部的空格，`trimEnd` 用来消除字符串尾部的空格，他们返回的都是新字符串，不会改变原值，示例如下：

```js
let str = '  abc  '
str.trim()  // 'abc'
str.trimStart() // 'abc  '
str.trimEnd() // '  abc'
```

### replaceAll

以前js的字符串替换方法 `replace()` 只会替换第一个匹配，如果想要替换所有的匹配，需要写正则表达式，例如：

```js
'aabbcc'.replace('b', '_')  // 'aa_bcc'
'aabbcc'.replace(/b/g, '_') // 'aa__cc'
```

写正则增加了复杂度，现在新增的 `replaceAll()` 方法，可以一次性替换所有匹配

```js
'aabbcc'.replaceAll('b', '_') // 'aa__cc'
```

### split

该方法使用指定的分割字符将一个字符串分割成子字符串数组，以一个指定的分割字符串来决定每个拆分的位置

```js
console.log('Hello JavaScript'.split(' '))  // [ 'Hello', 'JavaScript' ]
console.log('Hello'.split(''))  // [ 'H', 'e', 'l', 'l', 'o' ]
```

## 数学计算

`Math` 是一个内置对象，它拥有一些数学常数和数学函数方法，这里我们介绍几个常用的API。

### PI

```js
console.log(Math.PI)  // 3.141592653589793
```

圆周率常数，可以直接引用

### floor

返回小于一个数的最大整数

```js
console.log(Math.floor(3.1))  // 3
console.log(Math.floor(3))  // 3
```

### ceil

返回大于一个数的最小整数

```js
console.log(Math.ceil(3)) // 3
console.log(Math.ceil(3.1)) // 4
```

### round

返回四舍五入后的整数，需要注意，js的round有点不同，它并不总是舍入到远离0的方向，特别是负数的小数部分恰好等于0.5的情况下。

```js
Math.round(3.49)  // 3
Math.round(3.5) // 4
Math.round(-3.5)  // -3
Math.round(-3.51) // -4
```

### trunc

返回一个数的整数部分，直接去除小数点之后的部分，传入的参数会被隐式转换为数字类型

```js
Math.trunc(3.1) // 3
Math.trunc(0.5) // 0
Math.trunc('-1.2')  // -1
```

### random

该函数返回一个浮点数，伪随机数的范围从0到1，也就是说**大于等于0，小于1**，我们可以以此为种子，扩展到自己想要生成的随机数的范围，比如下面的例子，可以让我们生成指定范围的随机整数。

```js
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
```

## 数组操作

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

数组是js中非常重要的数据结构，需要熟练掌握基本的数组操作方法。

### 遍历数组

JS里面有很多种遍历数组的方法，这里我们介绍几种常用的，有一些方法只是对数组进行读取，还有一些会直接改变原数组，这个需要注意区分。

```js
let arr = [1, 2, 3, 4, 5]

for (let item of arr) {
  console.log(item) // item为正在处理的当前元素
}

arr.forEach((item, index) => {
  console.log(item, index)  // item为正在处理的当前元素，index为索引值
})
```

需要注意的是，`forEach` 与 `for..of` 不同，除了抛出异常之外，没有办法中止或者跳出 `forEach` 循环。

### filter

该方法创建一个新数组，将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。

```js
let words = ['spray', 'limit', 'elite', 'exuberant', 'destruction']
let result = words.filter(word => word.length > 6)
console.log(result) // [ 'exuberant', 'destruction' ]
```

### map

返回一个由回调函数的返回值组成的新数组。

```js
let arr = [1, 2, 3]
let tpl = arr.map(item => `<span>${item}</span>`)
console.log(tpl)  // [ '<span>1</span>', '<span>2</span>', '<span>3</span>' ]
```

### reduce

从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次的回调函数，并返回最后一次回调函数的返回值。

```js
let arr = [1, 2, 3]
let sum = arr.reduce((previous, current, index) => {
  console.log(previous, current, index)
  return previous + current
})
console.log(sum)  // 6
```

上面的代码中的回调函数会执行两次，让我们看一下 `reduce` 是如何运行的

callback | previous | current | index | return
---------|----------|---------|-------|--------
第1次 | 1 | 2 | 1 | 3
第2次 | 3 | 3 | 2 | 6

`previous` 是上一次回调函数的返回值，`current` 是当前要处理的数值，我们可以利用 `reduce` 来改写上一个 `map` 中的例子，将返回的html数组拼接起来合并成一个字符串

```js
let arr = [1, 2, 3]
let tpl = arr.reduce((prev, curr) => prev + `<span>${curr}</span>`, '')
console.log(tpl)  // '<span>1</span><span>2</span><span>3</span>'
```

注意，上面的代码我们给 `reduce` 添加了第二个可选参数，是一个空字符串，作为第一次迭代的初始数值

### find

找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 `undefined`。

```js
let arr = [1, 2, 3, 4, 5]
let found = arr.find(item => item > 3)
console.log(found)  // 4
```

### findIndex

找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 `-1`。

```js
let arr = [1, 2, 3, 4, 5]
let index = arr.findIndex(item => item > 3)
console.log(index)  // 3
```

### includes

判断当前数组是否包含某指定的值，如果是返回 `true`，否则返回 `false`。

```js
let arr = [1, 2, 3, 4, 5]
console.log(arr.includes(3))  // true
console.log(arr.includes('2'))  // false
```

### indexOf

返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 `-1`。

```js
let arr = [1, 2, 3, 4, 5]
let index = arr.indexOf(4)
console.log(index)  // 3
```

### join

连接所有数组元素组成一个字符串。

```js
let arr = [1, 2, 3, 4, 5]
console.log(arr.join('')) // '12345'
console.log(arr.join('-'))  // '1-2-3-4-5'
```

### concat

用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5]
let arr3 = arr1.concat(arr2)
console.log(arr3) // [ 1, 2, 3, 4, 5 ]
```

### slice

抽取当前数组中的一段元素组合成一个新数组，这是一个原数组的浅拷贝，原始数组不会被改变。

```js
let arr = [1, 2, 3, 4, 5]
console.log(arr.slice(2)) // [ 3, 4, 5 ]
console.log(arr.slice(1, 3))  // [ 2, 3 ]
```

### splice

在任意的位置给数组添加或删除任意个元素。这个很容易和 `slice` 搞混，此方法会改变原数组。

插入元素：

```js
let arr = [1, 2, 3, 4, 5]
arr.splice(2, 0, 6)
console.log(arr)  // [ 1, 2, 6, 3, 4, 5 ]
```

删除元素：

```js
let arr = [1, 2, 3, 4, 5]
let item = arr.splice(1, 2)
console.log(item) // [ 2, 3 ]
console.log(arr)  // [ 1, 4, 5 ]
```

删除元素的同时插入两个元素：

```js
let arr = [1, 2, 3, 4, 5]
let item = arr.splice(1, 2, 6, 7)
console.log(item) // [ 2, 3 ]
console.log(arr)  // [ 1, 6, 7, 4, 5 ]
```

### reverse

颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个，该方法会改变原数组。

```js
let arr = [1, 2, 3, 4, 5]
arr.reverse()
console.log(arr)  // [ 5, 4, 3, 2, 1 ]，原数组被改变
```

### push

在数组的末尾增加一个或多个元素，并返回数组的新长度。

```js
let arr = [1, 2, 3, 4, 5]
console.log(arr.push(6))  // 6
console.log(arr.push(7, 8)) // 8
console.log(arr)  // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

### pop

删除数组的最后一个元素，并返回这个元素。

```js
let arr = [1, 2, 3, 4, 5]
let item = arr.pop()
console.log(item) // 5
console.log(arr)  // [ 1, 2, 3, 4 ]
```

### unshift

在数组的开头增加一个或多个元素，并返回数组的新长度，与 `push` 对应

```js
let arr = [1, 2, 3, 4, 5]
console.log(arr.unshift(6))  // 6
console.log(arr.unshift(7, 8)) // 8
console.log(arr)  // [ 7, 8, 6, 1, 2, 3, 4, 5 ]
```

### shift

删除数组的第一个元素，并返回这个元素，与 `pop` 对应

```js
let arr = [1, 2, 3, 4, 5]
console.log(arr.shift())  // 1
console.log(arr)  // [ 2, 3, 4, 5 ]
```

`push`、`pop`、`unshift`、`shift` 这几个方法组合起来，可以用来实现栈、队列的功能

### sort

方法用用于对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的 `UTF-16` 代码单元值序列时构建的

```js
let arr = ['b', 'd', 'a', 'c']
arr.sort()
console.log(arr)
```

我们可以通过传入比较函数，来自定义排序逻辑，比较函数会每次传入两个要比较的值 `a` 和 `b`，如果函数返回小于0，那么 `a` 会排列到 `b` 的前面，称为升序排列，如果大于0，则会排到后面，称为降序排列，如果等于0，则相对位置不变（并非标准行为）

```js
let arr = [3, 5, 1, 4, 2]
arr.sort((a, b) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
})
console.log(arr)  // [ 1, 2, 3, 4, 5 ]，升序

arr.sort((a, b) => {
  if (a < b) return 1
  if (a > b) return -1
  return 0
})
console.log(arr)  // [ 5, 4, 3, 2, 1 ]，降序
```

## 对象操作

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 遍历对象

遍历对象我们常用的是 `for...in` 语句，例如：

```js
let obj = { a: 1, b: 2, c: 3 }
for (let key in obj) {
  console.log(key, obj[key])
}
```

上面的代码会依次输出：

```
a 1
b 2
c 3
```

### keys

返回一个包含所有给定对象自身可枚举属性名称的数组。

```js
let obj = { a: 1, b: 2, c: 3 }
console.log(Object.keys(obj)) // [ 'a', 'b', 'c' ]
```

### values

返回给定对象自身可枚举值的数组。

```js
let obj = { a: 1, b: 2, c: 3 }
console.log(Object.values(obj)) // [ 1, 2, 3 ]
```

## 箭头函数

ES6允许使用箭头 `=>` 来定义函数，例如：

```js
let func = num => num + 1
```

相当于

```js
let func = function(num) {
  return num + 1
}
```

可以看到，代码简洁了很多，如果箭头函数不需要参数或者需要多个参数，就使用一个圆括号代表参数部分

```js
let a = () => 5
// 相当于
let b = function() { return 5 }

let c = (num1, num2) => num1 + num2
// 相当于
let d = function(num1, num2) {
  return num1 + num2
}
```

如果箭头函数有多条语句，需要用大括号括起来，并且使用 `return` 语句返回

```js
let sum = (num1, num2) => {
  let num = num1 + num2
  return num
}
```

箭头函数也可以直接返回一个对象，但是因为大括号会被当成代码块来执行，所以外面要加上小括号

```js
let func = name => ({ name })
console.log(func('Frank'))  // { name: 'Frank' }
```

箭头函数最常用的应用场景是简化回调函数，例如

```js
let arr = [1, 2, 3, 4, 5]
let result = arr.map(item => item * 2)
```

等同于

```js
let arr = [1, 2, 3, 4, 5]
let result = arr.map(function(item) {
  return item * 2
})
```

箭头函数有几个特性是和普通函数不同的，需要额外注意

- 箭头函数没有自己的 `this`，而是引用外层的 `this`

```js
class Test {
  constructor() {
    this.num = 10
  }

  calcOne(arr) {
    // 这里的this指向的是calcOne所在的对象
    return arr.map(item => item * this.num)
  }

  calcTwo(arr) {
    let _this = this
    return arr.map(function(item) {
      // function的this发生变化，不能直接引用到外部的this
      return item * _this.num
    })
  }
}
let test = new Test()
let arr = [1, 2, 3]
console.log(test.calcOne(arr))
console.log(test.calcTwo(arr))
```

- 箭头函数不能当作构造函数，不可以使用 `new` 命令
- 箭头函数没有 `arguments`

## Set

ES6提供了新的数据结构，它类似于数组，但是成员的值都是唯一的，没有重复的值。`Set` 本身是一个构造函数，用来生成 `Set` 数据结构。

```js
let set = new Set()
set.add(1)  // Set(1) { 1 }
set.add(5)  // Set(2) { 1, 5 }
set.add(5)  // Set(2) { 1, 5 }
set = new Set([1, 2, 2, 3])  // 可以直接从一个数组初始化，重复元素会被去除
console.log(set)  // Set(3) { 1, 2, 3 }
let arr = [...set]  // 可以将Set展开为一个数组
console.log(arr)  // [ 1, 2, 3 ]
// 迭代Set
for (let item of set) {
  console.log(item)
}
set.delete(2) // 元素存在，返回 true
set.has(1)  // 1在set中存在，返回 true
```

`Set` 特别适合用于存放唯一值的场景，例如我们需要记录当前已经登录的所有用户名，就可以直接使用 `Set` 来存放。

## Map

ES6提供了 `Map` 数据结构，它类似于的对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值都可以当作键，也就是说，`Object` 提供了“字符串-值”的对应，`Map` 提供了“值-值”的对应，是一种更完善的Hash结构。

```js
let obj = { a: 1 }
let map = new Map()
map.set('name', 'Frank')
map.set(111, 123)
map.set(obj, { b: 2 })
console.log(map.keys()) // 
console.log(map.has(obj))  // true
console.log(map.delete(obj)) // true
console.log(map.size)  // 2

```

`Map` 的遍历会复杂一些，它提供了几个迭代器可供我们使用

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回所有成员的遍历器
- `forEach()`：遍历所有成员

```js
let map = new Map()
map.set('age', 21)
map.set('name', 'Frank')
// 使用keys()遍历
for (let key of map.keys()) {
  console.log(key, map.get(key))
}
// 'age' 21
// 'name' 'Frank'

// 使用values()遍历
for (let value of map.values()) {
  console.log(value)
}
// 21
// 'Frank'

// 使用entries()遍历
for (let item of map.entries()) {
  // entries()返回的item是一个数组，结构为：[key, value]
  console.log(item[0], items[1])
}
// 'age' 21
// 'name' 'Frank'

// 使用forEach()遍历
map.forEach((value, key) => {
  console.log(key, value)
})
// 'age' 21
// 'name' 'Frank'
```

我们还可以使用扩展运算符 `...` 来将 `Map` 展开为数组结构

```js
let map = new Map()
map.set('age', 21)
map.set('name', 'Frank')

console.log([...map.keys()])  // [ 'age', 'name' ]
console.log([...map.values()])  // [ 21, 'Frank' ]
console.log([...map.entries()]) // [ ['age', 21], ['name', 'Frank'] ]
```

## 变量传递

JS中的数据类型我们可以分为两种，弄清楚两者的区别非常重要：

- 值类型（基本类型）：String、Number、Boolean、null、undefined
- 引用类型：Array、Object、Set、Map等由多个值构成的复杂类型

基本类型的变量保存的是变量值，引用类型变量保存的是内存地址，基本类型在赋值的时候拷贝值，引用类型在赋值的时候只拷贝内存地址，不拷贝值，多个引用指向同一块内存数据，下面我们通过一些例子来体验一下：

```js
let num1 = 1
let num2 = num1 // num1的值会被拷贝给num2，两者互相独立
num2 = 2  // 改变num2不会影响num1
console.log(num1, num2) // 1 2

function add(num) {
  num += 1  // 这里的num也是按值传递的
  return num
}

let num3 = 3
let num4 = add(num3)  // 这里传递的是num3的值
console.log(num3, num4) // 3 4

let arr1 = [1, 2]
let arr2 = arr1 // arr1的地址会被拷贝给arr2，两者指向的是同一块内存数据
arr1.push(3)  // 改变arr1，arr2也会一块改变
console.log(arr2) // [ 1, 2, 3 ]
arr2 = [] // arr2被指向了一个新的内存地址，对arr1不产生影响
console.log(arr2) // [ ]
console.log(arr1) // [ 1, 2, 3 ]

function update(user) {
  user.age += 1 // user是一个对象，传进来的是地址，对user修改会影响原数据
}
let user1 = { age: 18 }
update(user1) // 传入的是user1的地址
console.log(user1)  // { age: 19 }

let arr3 = [{ age: 18 }, { age: 24 }]
let arr4 = arr3.slice(1)
arr4[0].age += 1
console.log(arr3) // [{ age: 18 }, { age: 25 }]，slice虽然返回的是一个新数组，但是里面的子元素对象指向的仍然是原始的数据地址
```

## 异步编程

异步编程模型是JavaScript的精髓，分我们来简单了解一下它的基本原理。

### 事件循环

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

JavaScript有一个基于**事件循环**的并发模型，事件循环负责执行代码、收集和处理事件以及执行队列中的子任务，这个模型与其他一些常见语言中的模型截然不同，比如C或者Java。

一个JavaScript运行时包含了一个待处理消息的消息队列，每一个消息都关联着一个用以处理这个消息的回调函数。从事件循环期间的某个时刻，运行时会从最先进入队列的消息开始处理队列中的消息，被处理的消息会被移除队列，并作为输入参数来调用之前关联的回调函数。函数的处理会一直进行到栈再次为空为止，然后事件循环将会处理队列中的下一个消息。

之所以被称为**事件循环**，是因为它经常按照类似如下的方式来实现：

```js
while (queue.waitForMessage()) {
  queue.processNextMessage()
}
```

`queue.waitForMessage()` 会同步地等待消息到达（如果当前没有任何消息等待被处理）

每一个消息完整地执行后，其他消息才会被执行，这为程序的分析提供了一些优秀的特性，例如当一个函数被执行时，它不会被抢占，只有在运行完毕之后才会去运行其他代码，才能修改这个函数操作的数据。这个模型的另一个缺点在于当一个消息需要太长时间处理完毕时，js就无法处理其他任务比如浏览器用户的交互，此时浏览器一般会弹出“脚本运行时间过长”的对话框，一个良好的编程习惯是缩短单个消息的处理时间。

从上面的描述我们可以得知，JavaScript中的调用会被推入消息队列等待事件循环来处理，`setTimeout` 可以让我们实现延迟的效果，它接受两个参数，待加入队列的消息和一个时间值，这个时间代表了消息被实际加入到队列的最小延迟时间。如果队列中没有其他消息并且栈为空，在这段延迟事件过去之后，消息会被马上处理，但是，如果有其他消息，`setTimeout` 消息必须等待其他消息处理完，因此第二个参数仅仅表示最小的延迟时间，而并非准确的等待时间，看下面的例子：

```js
let start = Date.now()
console.log('start')

setTimeout(() => {
  console.log(Date.now() - start)
}, 500)

while(true) {
  if (Date.now() - start >= 2000) {
    console.log('looped for 2 seconds')
    break
  }
}
```

通过下面的例子来体验 `setTimeout` 的执行机制

```js
console.log('1.这是开始')

setTimeout(() => {
  console.log('2.这是来自第一个回调的消息');
})

console.log('3.这是一条消息')

setTimeout(() => {
  console.log('4.这是来自第二个回调的消息')
}, 0)

console.log('5.这是结束')
```

JavaScript的事件循环模型与许多其他语言不同的一个非常有趣的特性是，它永不阻塞。处理 I/O 通常通过事件和回调来执行，所以当一个应用正等待一个数据库查询返回或者一个网络请求返回时，它仍然可以处理其它事情，比如用户输入。这种特点也带来一些麻烦，那就是正常的代码执行顺序被打乱，如果后续的代码需要依赖异步请求的结果，那只能将逻辑放到回调函数中，如果有多层依赖，那么就会出现回调嵌套，造成回调地狱，类似下面的代码，我们伪造一个用来异步计算面积的方法：

```js
console.log(1)
asyncArea(data_1, result_1 => {
  console.log(2)
  asyncArea(result_1, result_2 => {
    console.log(3)
    asyncArea(result_2, result_3 => {
      console.log(4)
      console.log(result_3)
    })
  })
})
console.log(5)
```

### Promise

`Promise` 就是用来解决异步回调问题而出现的解决方案。它代表了一个异步操作的最终完成或者失败，本质上 `Promise` 是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。它让你能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者。

一个 `Promise` 必然处于以下几种状态之一：

- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）: 意味着操作成功完成。
- 已拒绝（rejected）: 意味着操作失败。

下面我们用 `Promise` 和 `setTimeout` 来封装之前演示用的异步请求面积的方法

```js
function asyncArea(length) {
  return new Promise((resolve, reject) => {
    // 模拟异步请求
    setTimeout(() => {
      if (length > 0) resolve(length * length)
      else reject(new Error(`invalid length: ${length}`))
    }, 500)
  })
}
```

上面这个方法接受一个数字类型的参数 `length`，通过 `setTimeout` 来模拟异步请求，500ms后，如果 `length`大于等于0，则 `resolve` 返回 `length` 的平方，否则 `reject` 返回错误信息，通过下面的例子我们来看一下具体的调用方法。

```js
// 正常调用
asyncArea(1).then(result => {
  console.log(result)
}).catch(error => {
  console.trace(error)
})
// 触发异常
asyncArea(-1).then(result => {
  console.log(result)
}).catch(error => {
  console.trace(error)
})
// 链式调用
let start = Date.now()
asyncArea(1)
  // 返回了一个新的Promise，可以在下一个then中获取，result === 1
  .then(result => asyncArea(result + 1))
  // result === 4
  .then(result => asyncArea(result + 1))
  .then(result => {
    // 前一个then返回的新Promise，result === 25
    console.log(result)
    // 耗时是三个请求的累加
    console.log(`cost ${Date.now() - start}ms`)
  })
```

通过上面的例子我们可以看到，前面回调嵌套的问题，通过 `Promise` 的链式调用写法得到很大的缓解。
上面的链式调用适用于需要串行计算的场景，下一步的请求需要依赖上一步的结果，总的耗时是每个请求的累加。有时候我们的多个异步请求是没有相互依赖的，此时如果串行计算的话会增加无谓的耗时，`Promise` 有一个 `all` 方法，可以批量并行执行异步请求，等所有的请求都结束后再统一返回，可以简单认为总的耗时时间是所有请求中耗时最大的那一个。

```js
let start = Date.now()
Promise.all([
  asyncArea(1),
  asyncArea(2),
  asyncArea(3),
  asyncArea(4),
  asyncArea(5)
]).then(result => {
  console.log(result)
  console.log(`cost ${Date.now() - start}ms`)
})
```

### async/await

`Promise` 通过 `then` 来进行异步请求虽然改善了回调的问题，但还是不够优雅，好在现在我们可以通过 `async/await` 语法，使用串行的语法进行异步调用，下面我们来改写一下上面的例子：

```js
async function test_1() {
  let start = Date.now()
  let result_1 = await asyncArea(1)
  let result_2 = await asyncArea(result_1 + 1)
  let result_3 = await asyncArea(result_2 + 1)
  console.log('test_1', result_3)
  console.log(`cost ${Date.now() - start}ms`)
}

test_1()

async function test_2() {
  let start = Date.now()
  let result = await Promise.all([
    asyncArea(1),
    asyncArea(2),
    asyncArea(3),
    asyncArea(4),
    asyncArea(5)
  ])
  console.log('test_2', result)
  console.log(`cost ${Date.now() - start}ms`)
}

test_2()
```

使用 `async/await` 改写之后，我们的异步请求更加优雅，变得更接近符合我们习惯的串行代码，它有以下特点需要注意。

- `await` 只能出现在 `async` 修饰的函数中，普通函数中无效
- `async` 函数隐式返回一个 `Promise` 对象，最后 `return` 的返回值，相当于 `Promise` 中 `resolve` 的值，所以可以认为 `async` 函数是 `Promise` 的语法糖
- `await` 后面的函数请求需要返回 `Promise`，因为 `async` 返回的也是 `Promise`，所有也可以 `await` 一个 `async` 函数
- `await` 需要等待后面的 `Promise` 返回结果（`resolve`）之后，才会继续执行后面的代码
- `async` 会将一个普通函数变成异步函数，类似 `setTimeout` 的效果，下面我们来对比一下差异

```js
async function test() {
  let result = await Promise.all([
    asyncArea(1),
    asyncArea(2),
    asyncArea(3),
    asyncArea(4),
    asyncArea(5)
  ])
  return result
}

async function run() {
  console.log(1)
  // async函数返回的是一个Promise，可以直接用then来获取结果
  test().then(result => console.log(2, result))
  console.log(3)
  // await后面可以跟一个async函数
  let result = await test()
  console.log(4)
}

run()
```

### async异常捕获

我们推荐在异步请求中尽可能都使用 `async/await`，`await` 等待的 `Promise` 如果 `reject` 了一个错误的话，可以被 `try/catch` 捕获到，看下面的例子：

```js
async function run() {
  try {
    // await异步请求抛出错误，会被catch住
    let result = await asyncArea(-1)
    console.log(result)
  } catch (error) {
    console.log(error.message)
  }
  try {
    // 没有await的异步请求，异常无法被catch
    asyncArea(-1)
  } catch (error) {
    console.log(error.message)
  }
  try {
    // 没有await的异步请求，通过Promise的catch也可以捕获异常，不会继续抛出
    asyncArea(-1).catch(error => {
      console.log(1, error.message)
    })
  } catch (error) {
    console.log(2, error.message)
  }
}

run()
```

## Modules

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)

ES6之前JavaScript并没有官方的模块化方案，随着网页应用的规模不断扩大，我们需要把js代码拆分到不同的文件，进行多人协作开发，但这样带来很多的问题，比如不同js文件之间很容易出现命名冲突，为了解决这类问题，通常需要借助于匿名函数来创建私有作用域，现在ES6提供了官方的模块化机制。

模块机制有以下特点，与面向对象的概念类似：

- 每个模块都有自己的作用域，外部模块不能直接访问
- 模块可以导出变量或方法给外部模块访问，导出的方法可以访问自身模块的内部成员
- 模块可以导入其他模块导出的方法或变量

下面我们来定义几个简单模块体验一下

`scripts/user.js`

```js
// 该模块只导出一个默认成员
export default class User {
  constructor() {
    this.name = ''
  }

  setName(name) {
    if (name.length >= 2) this.name = name
  }
}
```

`scripts/store.js`

```js
// 导入user模块的默认导出成员
import User from './user.js'

// _users是模块内部私有成员，不会和其他模块出现命名冲突
let _users = []

// 导出addUser方法
export function addUser(name) {
  let user = new User()
  user.setName(name)
  _users.push(user)
}

// 导出getUserCount方法
export function getUserCount() {
  return _users.length
}
```

`scripts/main.js`

```js
// 通过相对路径导入其他模块，有多个导出方法，可以使用*导出到一个命名空间store
import * as store from './store.js'
// 或者使用下面解构的写法
// import { addUser, getUserCount } from './store.js'

// _name和_users都是模块内部私有成员
let _name = 'Tom'
let _users = 0

// 调用store模块导出的方法addUser
store.addUser(_name)
// 调用store模块导出的方法getUserCount
_users = store.getUserCount()
console.log(_users)
```

然后我们在html中通过 `script` 标签引入入口模块 `scripts/main.js`

```html
<script src="scripts/main.js" type="module"></script>
```

注意，这里需要添加 `type="module"` 来声明该文件是一个模块化JS脚本，通过上面的例子我们可以看到，我么只需要加载一个入口模块 `scripts/main.js`，其他的依赖会形成树状的依赖关系依次加载。

**模块化是JavaScript规模化的基础。**

现代浏览器已经能够很好的支持原生模块了，但是为了兼容性和加载效率，我们在实际项目中通常还是会借助于打包工具如 `webpack`，将多个模块打包成一个文件，在后面的课程中我们会用到。

## DOM操作

DOM（Document Object Model — 文档对象模型）是用来呈现以及与任意 HTML 或 XML文档交互的API。DOM 是载入到浏览器中的文档模型，以节点树的形式来表现文档，每个节点代表文档的构成部分（例如:页面元素、字符串或注释等等）。我们可以通过js调用浏览器提供的API，进行DOM的创建、查询、删除、替换等操作，还可以监听DOM的操作（如鼠标点击、键盘输入）事件，让我们对用户的操作做出响应，如今借助于React之类的框架，我们在实际开发中已经很少需要直接操作DOM了，但是仍然有必要了解一下DOM的基本设计和常用操作。

### 查询

查询DOM有很多种方式，最常用的是通过 `id` 或者CSS选择器，自己运行示例代码体验一下

```html
<ul id="list">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
</ul>
```

```js
let list = document.getElementById('list')  // 命中ul，参数为ID名，注意不带#，不是CSS选择器
console.log(list)
let first = document.querySelector('.item')  // 命中第一个 .item
console.log(first)
let second = document.querySelector('.item:nth-child(2)') // 可以使用复杂的CSS选择器，命中第二个 .item，
console.log(second)
let items = document.querySelectorAll('.item')  // 得到的是一个包含所有 .item 的 NodeList 集合
for (let el of items) {
  console.log(el)
}
```

### 创建

我们可以通过 `document.createElement` 来创建一个DOM元素，然后还可以给它添加子元素

```js
let list = document.createElement('ul')
list.id = 'list'
for (let i = 0; i < 3; i++) {
  let item = document.createElement('li')
  item.className = 'item'
  item.innerText = `${i + 1}`
  list.appendChild(item)  // 将创建好的元素添加到父节点
}
document.body.appendChild(list) // 将list添加到body
```

需要注意的是，`createElement` 创建好的DOM元素还只是存放在内存中，如果想要显示在页面上，需要插入到页面的指定位置，如上面的代码，最后我们将创建好的 `list` 节点追加到 `body` 里面。

### 删除

我们可以先通过查询得到目标元素的DOM对象，然后调用它的父元素的 `removeChild` 方法来删除它

```js
let item = document.querySelector('.item')
item.parentNode.removeChild(item)
let list = document.getElementById('list')
list.innerHTML = '' // 可以清空list下面的所有子节点
document.body.removeChild(list)
```

### 替换

```js
let second = document.querySelector('.item:nth-child(2)')
let list = document.getElementById('list')
let newItem = document.createElement('li')
newItem.className = 'new-item'
newItem.innerText = 'new-item'
list.replaceChild(newItem, second)
```

### 事件监听

网页中最常见的就是鼠标事件和键盘事件，我们可以通过 `addEventListener` 来监听

`鼠标事件`

```html
<button id="btn">Click</button>
```

```js
let btn = document.getElementById('btn')
// 监听鼠标点击事件
btn.addEventListener('click', event => {
  console.log('button clicked!')
})
```

`键盘事件`

```html
<input type="text" id="input" />
```

```js
let input = document.getElementById('input')
input.addEventListener('keypress', event => {
  // event中包含每一次按键的信息
  console.log(event)
})
input.addEventListener('change', event => {
  // change事件会在输入框失去焦点之后触发
  console.log(event.target.value)
})
```

## TypeScript

JavaScript是一种动态类型语言，可以随意改变变量的类型，这种特性一方面增加了灵活性，另一方面也使得JavaScript代码变得很容易失控，出现各种类型的错误。TypeScript是微软开源的脚本语言，它在JavaScript的基础上增加了强大类型系统，最终编译成纯净的js执行，TypeScript的类型系统可以让我们在开发阶段避免非常多的类型错误，而且IDE可以提供非常强大的API提示，使得它非常适合构建各种类型和规模的JavaScript应用。现在TypeScript已经成为构建大型Web项目的首选语言，知名项目如 `VS Code`、`Angular`、`Vue@3` 等，都是采用TypeScript开发，我们后面的项目都会采用TypeScript作为示例教学。

**TypeScript所包含的内容比较多，这里我们只讲解一些基本的用法，更详细内容需要同学们自行学习，详情请参考课后任务部分**

### 环境搭建

首先更改npm源，只需要执行一次，不用每次都执行

```
npm config set registry https://registry.npm.taobao.org
```

`npm` 全局安装 `TypeScript`

```
npm i typescript -g
```

检测是否安装成功

```
tsc -v
```

如果提示了TypeScript版本号，则表示安装成功

### 创建TS项目

一般我们会为每一个TS项目创建一个新目录，每个项目根目录需要包含一个 `tsconfig.json` 文件，这个文件是TS编译选项的配置文件，主要作用就是告诉TS编译器应该如何编译我们的工程，具体介绍可以参考下面的链接

[https://www.tslang.cn/docs/handbook/tsconfig-json.html](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

在我们的示例代码中，也包含了 `tsconfig.json` 的简单配置，针对不同类型的TS项目，配置选项会有所不同，当我们配置好之后，只需要在该目录执行命令 `tsc` 即可编译该工程下面的TS代码文件到JS，我们还可以通过添加 `-w` 参数，即 `tsc -w` ，让TS编译器处于监控状态，一旦该工程有新的TS文件改变，会自动进行编译，不需要再每次手动执行编译。

### 基础类型

TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用，我们可以给变量手动加上类型声明，也可以让TS根据变量的类型自动推导，类型一旦声明，不允许直接修改。

**需要注意，不管是基础类型还是高级类型，TS中的类型标记只存在于开发阶段，目的是给编译器检查类型使用是否正确，辅助开发人员发现不必要的错误，提升开发效率和质量，在运行时阶段，这些类型就不存在了。**

```typescript
// 手动添加类型声明
let isDone: boolean = false
// 根据true的值自动推导isTrue为boolean类型
let isTrue = true
// number数字类型
let num: number = 6
// string数字类型
let str: string = 'hello'
// 数组，使用类型+[]的方式声明
let arr_1: number[] = [1, 2, 3]
// 可以根据后面的值自动推导arr_2的类型为 string[]
let arr_2 = ['a', 'b', 'c']
// arr_3无法推导类型，因为后面是一个空数组
let arr_3 = []
```

`enum 枚举`

`enum` 类型是对JavaScript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字，通常用于定义一组有限的状态，比如我们可以定义一个颜色的枚举类型：

```typescript
enum Color { Red, Green, Blue }
let c = Color.Red
```

`any`

有一些特殊情况我们无法确定变量将要存储的数据类型，这个时候我们可以使用 `any`，这样编译器就不会去对它进行类型检查了，例如下面的例子

```typescript
let notSure: any = 4
notSure = 'abc'
```

**注意，应该尽可能避免使用 `any`，会给程度带来类型黑洞**

### interface 接口

接口可以用来描述结构化的数据，下面我们来体验一下，我们习惯于使用大写字母I开头来命名Interface

```typescript
interface IUser {
  name: string
  age?: number  // 用?来声明一个可选属性
}

function addUser(user: IUser) {
  // do something
}
// 类型匹配IUser
addUser({ name: 'Frank' })
// 类型匹配IUser
addUser({ name: 'Frank', age: 21 })
// 类型不匹配IUser，可选属性age为number类型
addUser({ name: 'Frank', age: 'abc' })
```

### 函数

我们需要为函数的参数添加类型声明

```typescript
function addUser(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
}
```

如果有参数是可选的，可以通过 `?` 来声明，但是只能放到参数列表的最后面

```typescript
// lastName 是一个可选参数
function addUser(firstName: string, lastName?: string): string {
  return `${firstName} ${lastName || ''}`
}

addUser('Jack')
addUser('Jack', 'Lee')
```

如果返回值是可推导的，可以省略返回值的类型声明

```typescript
function addUser(firstName: string, lastName: string) {
  // 从return值可以推导出，返回值是一个string类型
  return `${firstName} ${lastName}`
}
```

### 泛型

在软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性，组件不仅能够支持当前的数据类型，同时也能够支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。有时候我们需要创建一些功能相同只是数据类型不同的组件，如果为所有需要支持的类型都创建一份代码，显然是非常不合理的。

在 `C#` 之类的语言中，可以使用 `泛型` 来创建可重用的组件，一个组件可以支持多种数据类型，这样用户就可以以自己的数据类型来使用组件，相当于类型也作为一种变量来传递。

参考下面的例子，假如我们要创建一个函数，根据我们传入的数据，返回一个包含5个元素的数组

```typescript
function fill<T>(el: T): T[] {
  return new Array(5).fill(el)
}

// arr_1 此时是number[]类型
let arr_1 = fill(10)
// arr_2 此时是string[]类型
let arr_2= fill('abc')
```

泛型在前端的一个典型使用场景是对于网络请求返回结果的类型声明上面，如下面的例子，我们定义一个通用的网络请求方法，用户可以使用泛型来告诉TS这次网络请求返回的数据结构

```typescript
interface IUser {
  name: string
  age: number
}

// T是类型变量，用来标注返回值的类型
async function request<T>(url: string) {
  let res = await fetch(url)
  let json: T = await res.json()  // res.json()返回的数据是any类型，这里我们把它主动标记为用户传入的类型T
  return json
}

async function run() {
  // users是IUser[]类型
  let users = await request<IUser[]>('/api/user/list')
  console.log(users)
  // user是IUser类型
  let user = await request<IUser>('/api/user/find?id=1')
  console.log(user)
}

run()
```

下面我们通过 `ts-page`、`ts-todo` 两个示例来感受相对完整的代码，并且体验TS带来的重构的便利性。

> 示例工程只提交了TS源代码，需要先在各自目录下面执行 `tsc` 命令进行编译，再通过http访问

## 代码规范

推荐 `standard.js`，[https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)

## 课后任务

### 说明

本次作业为仿写简化版的QQ音乐新碟页面，与之前不同的是，本次作业主要练习 `TypeScript` 以及 `DOM` API的使用（实际项目开发并不会手动来创建DOM结构），要求使用动态创建 `DOM` 的方式来实现页面，所需要的知识点基本都在两个示例工程 `ts-page`、`ts-todo` 中使用到了，相关json数据位于 `template/data`

### 技术要求

- 使用 `TypeScript` 开发，不得使用 `any` 类型，最终代码不得出现TS的类型报错，可以正常编译
- 不得使用任何第三方框架或库，如 `jQuery`、`React`、`Vue`
- 移动优先，页面需要支持响应式
- 使用 `Modules` 进行合理的代码模块化拆分
- 静态部分可以直接编写 `html`，动态部分使用 `createElement` 创建 `DOM` 结构，不得使用字符串模板替换、拼接的方式
- 使用泛型方法请求 `json` 数据
- 异步请求使用 `async/await`
- 不需要 `localStorage` 本地数据持久化
- 点击标签项动态切换下方列表内容
- 鼠标悬停列表项会出现删除按钮，点击删除按钮可以将该条目删除
- 示意图只给出了两种状态，列表项的列数，应该从1到5逐级过渡，内容部分宽度最大不超过 `1200px`
- 代码风格遵循 `standard.js` 规范
- 修改 `README.md` 记录作业完成的思路和遇到的问题
- 作业在下一周的周五之前提交到 `task` 仓库的 `week-04` 目录

### 数据结构

**areas.json**

- `id`：唯一编号
- `name`：名称

**albums.json**

- `area`：所属 `area`，与上面的 `id` 关联
- `name`：专辑名
- `singer`：歌手名
- `release_time`：发行时间
- `cover`：封面图链接

### 参考思路

- 在 `task` 仓库下面创建 `week-04` 目录
- `template` 目录是已经创建好的一个工程模板，将下面所有的文件拷贝到 `week-04`，以此为基础进行开发
- 先编写静态 `html` 结构，实现页面效果
- 编写 `area`、`album` 对应的Interface，`IArea`、`IAlbum`，用来描述后端数据结构
- 因为需要将 `area`、`album` 数据和DOM节点关联，所以创建两个类 `Area`、`Album`，各自 `implements` 于 `IArea`、`IAlbum`，关联各自DOM对象，参考 `ts-todo`
- 将网络请求方法拆分到独立模块，参考 `ts-page`
- 遍历 `areas` 生成标签的 `DOM` 结构，关联 `area` 对象和对应的 `DOM` 对象，并且绑定 `click` 事件，用于处理点击时切换列表内容的逻辑
- 根据当前选中的标签（默认选中第一项）过滤 `albums` 中对应该分类的专辑数据，遍历生成下面的列表结构，关联 `album` 对象和对应的 `DOM` 对象，同时给每一项的删除按钮绑定 `click` 事件，用于处理点击时删除该列表项
  - 删除列表项需要删除DOM节点：`removeChild`
  - 删除列表项需要删除数组中的数据：`splice`
- 动态创建 `DOM` 的逻辑实现之后，删除之前html页面中需要被动态填充的部分
- 用户点击标签项时，需要判断当前点击的标签 `id`，调用上面渲染列表项 `DOM` 的函数，然后过滤 `albums` 中的数据生成新的列表结构，先清空现有的列表项，然后将新的列表项插入
- 通过 `tsc -w` 监控编译TS代码，通过 `nginx` 启动的http服务来访问页面，如果使用直接双击打开html的方式，会导致JS模块无法加载

## 额外任务

### TS学习

自行学习下面几个核心章节的内容，该任务不需要提交具体的作业

- [基础类型](https://www.tslang.cn/docs/handbook/basic-types.html)
- [变量声明](https://www.tslang.cn/docs/handbook/variable-declarations.html)
- [接口](https://www.tslang.cn/docs/handbook/interfaces.html)
- [类](https://www.tslang.cn/docs/handbook/classes.html)
- [函数](https://www.tslang.cn/docs/handbook/functions.html)
- [泛型](https://www.tslang.cn/docs/handbook/generics.html)
- [枚举](https://www.tslang.cn/docs/handbook/enums.html)
- [类型推导](https://www.tslang.cn/docs/handbook/type-inference.html)
- [模块](https://www.tslang.cn/docs/handbook/modules.html)

### API练习

将该文档中所涉及到的API自己编写、运行、调试一遍，弄清楚每一个的基本用法，学有余力的同学可以考虑用TS来编写，该任务不需要提交具体的作业