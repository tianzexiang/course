## 作业思路以及问题
✅ 在编写代码时对koa的洋葱模型理解不够清晰，导致一些执行顺序的错误，去官网以及google上好好看了一下koa的洋葱模型的理解，研究了一下简化版的实现原理，目前算是总体弄明白了koa的洋葱模型，修改了中间件的代码逻辑

✅ 遇到一个奇怪的问题，enum定义在不同的地方导入导出，大部分情况可以成功导出，但有时会碰上导出的对象为undefined的情况，也就是对象未定义，翻墙google后发现原因，以下为原文：

```
The enum error - cannot read property of undefined occurs for 2 main reasons:

1. Using const enums that get removed during compilation.
2. Having circular imports (importing members between the same files).
```
简单说便是这是ts编译的锅，我们写enums时最好不要导出const enum，同时不要循环引用enum，最好将enum放入同一个文件夹，分发引用。所以我将enum全部归类放在同一个文件后果然问题解决

✅ 还碰到一个问题是：为什么导出collection可以，导出db却失败，明明同样是在initDb中赋值？回去想了一会儿，想明白了。因为我用的时机不对。我导出db后初始化model是在顶层函数执行，此时由于db尚未连接，所以定义的变量db肯定是undefined。而导出的model使用时机是在全部初始化完成后，中间件的回调中使用，而此时model肯定是有值的。所以我将model的初始化封装成函数在initDb中调用，传入已生成的db，在导入model果然问题解决

✅ 遇到控制台passive错误，是chrome v51 后的特性导致，但是利用npm包修改后antd组件出现bug，故暂时没有修改

✅ 当使用浏览器自动补全时，浏览器控制台会报错，reading undefined toLowerCase，暂时没搞懂原因是什么，猜测可能是因为移动端和pc端有些不兼容的地方会报错 
