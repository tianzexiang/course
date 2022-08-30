## 实习心得

### 8月24日

✅ 复习浏览器运行原理，安全防范xss、csrf

✅ 继续学习webpack5配置，复习手写一些常用的js方法，如create、instanceof



### 8月23日

✅ 成功在linux上通过Nginx、PM2部署前端代码

✅ 通过助教发的promise实现简易原理，理解了promise实现，跟着在sandbox中敲了一遍自己的实现，除了调用实现中没有使用微任务之外，异步promise、promise链式调用、值穿透现在已大致理解

✅ 继续深入观看react，包括一些面试题，学习react中自己没有理解到位的知识点

### 8月22日

✅ 老师讲课前将助教之前分享的promise实现看了一会儿，自己跟着边敲代码边学习

✅ 听老师讲部署相关操作

✅ 安装虚拟机、Ubuntu，跟着老师课上的步骤学着部署代码

### 8月19日

✅ 完成feed app全部功能

✅ 协助组员编写样式，与组员一起通过手机局域网进行测试，途中发现一些bug，目前已全部改正

✅ 继续增添了一些loading动画效果以满足网速较慢情况下的加载。小组其他成员也增添了动画，使得app使用起来更加丝滑、舒服

✅ 完成自己负责部分的api文档

✅ 完成项目启动指南

### 8月18日

✅ 仔细思考了聊天页面布局问题，去看了下infiniteScroll源码，感觉思路相似，但是很明显那边处理的情况更多更详细，想要依次复现改动有些困难，所以另求办法。下拉加载更多最先思路是判断scrollTop，监听scroll滚动。但这样有两个问题，一是scrollTop抖动，二是监听scroll滚动性能很差。仔细思索下，想起之前看阮一峰大佬用过一个web api`intersectionObserver`正好可以用来处理当前情况，具体文章信息可以参考[intersectionObserver](https://ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)，其实在react Hook FAQ中也有提到[我该如何测量 DOM 节点？](https://react.docschina.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)，里面大概讲了`callback ref`，以及`ResizeObserver`。这里问题解决方法基本是找到了，但在react中使用仍有问题。react中的state无法在observer中更新，所以可能需要进一步封装该api使得能够在react中使用。鉴于时间原因，我想是不是会有相关库，于是去npm上利用关键词搜索了一下，果然发现相关库`react-intersection-observer`，在react中尝试使用后，比较完美的实现了下拉加载更多的功能。

✅ 协助组员利用`react-intersection-observer`解决删除的popover在滑动出视口后仍然存在的问题

✅ 修改了在手机页面上一些样式的不兼容 & 修改了部分按钮功能行为 & 优化toast体验

✅ 完成部分user & auth错误模块测试

### 8月17日

✅ 协助小组成员通过轮询拉取用户聊天信息时遇到的context使用问题

✅ 已经基本完成auth、user api成功测试部分，还缺少抛出错误测试

✅ 轮询操作后发现聊天页面布局仍有bug，目前正在寻找更好的解决方案

### 8月16日

✅ 继续协助小组成员解决聊天室下拉加载更多的bug，目前已大概没有问题

✅ 编写user、auth的service测试代码，暂时还未写完

✅ 通过手机局域网访问项目，测试项目前端样式、功能有无问题，目前发现有些css样式兼容性很差，已替换部分
### 8月15日
✅ 学习前端图片裁剪，封装基本图片裁剪组件`CropImage`，可以按照比例裁剪图片同时可以放大缩小图片，暂时还不支持旋转功能

✅ 完善个人首页的加载体验。一是解决加载按钮闪现问题，二是增加用户信息骨架屏，在loading结束前展示骨架，三是改善样式，使得布局更加合理，tabBar变更为sticky布局，并增加动画效果

✅ 重新整理了前端代码，利用状态模式组织hooks，将scss文件统一命名，同时将后端代码注释完善

✅ 协助小组成员解决布局问题，同时也协助小组成员解决聊天页面下拉加载更多的功能

### 8月12日
✅ 继续协助组员完成search后端的编写，前端的api封装

✅ 调整follow页面样式，修改进入他人follow页面时的展现，原来是禁用关注按钮，现在是展示他人的关注列表与登录用户的关系。

✅ 修改个人资料界面图片上传逻辑，之前以为不能随便上传图片，以免浪费oss空间。但今天听老师说逻辑就应该是切换图片直接上传，后端只看是否保存该生成的图片url

✅ 修改全局公共组件一些样式bug
### 8月11日
✅ 今天基本完成小组里分配的任务，完成后检查下又修改了好几处bug

✅ 在编写follow页面时遇到以下几个问题。
1. 出现父组件数据更新，依据该数据创建的子组件却没有重新渲染的问题。上官网以及google搜索后发现问题所在。我将prop的数据传递到子组件后，通过useState又在内部维护了自己的copy数据，而依据react官方说法，我们不应该将props传进来的数据再次通过useState去保存，因为state是独属于该函数组件内部的状态，不会应外部初始赋值的改变而改变，值没有改变自然不会进行组件的重新渲染。所以我将操作全部提到父组件进行，在父组件对两套数据进行维护
2. 关于点击关注按钮、回关按钮时状态的实时更新以及两个tab两套数据之间的关联上逻辑较复杂，一开始没有想清楚，解决完1的问题后才逐渐摸清思路，目前已基本没有太大问题。

✅ 因为做了全局错误提示处理，有时候错误一多，会导致存在toast无法销毁的现象。我仔细排查一下后发现是`Toast.clear`方法执行时机和错误触发时机先后不固定的原因。于是我将关闭toast的方法从`Toast.clear`改为定义一个外部变量`let toast`接受`Toast.show()`的实例，再在axios回调中调用`toast.close`销毁实例。这样处理过后果然问题得以解决


### 8月10日
✅ 基本完成follow关注页面与后端的联调，其中遇到该如何判断关注我的用户我是否关注了对方的问题。解决该问题我想到两个思路。
1. 因为拉下来的是一个limit限制的列表，如果不在后端处理，在前端处理则需要将user所有关注的id拉下来在将其与后端请求而来的follow用户的id进行循环比对，看follow的用户id是否包含其中，以此来决定关注按钮的状态。但这样明显有问题，假如关注的人很多很多，拉下来的id将会是一个非常庞大的数据，这样直接传输过去不合理。而且关注与否是一个可能经常变动的数据最好是随查随用。
2. 因为上述原因，目前的解决方法是在后端处理。在后端拉取limit限制的follow条数同时，连接自身表进行一次userId与followId倒过来的反查，依据得到的数组是否为空，添加布尔字段`hasFollowed`来实时判断是否互关。

✅ 虽然post在首页出现，也在personal_home出现，但请求的数据实际一样，只是状态不同，于是修改`usePosts`hook，使得依据状态决定调用哪个service

✅ 上传图片时，会出现宽高比与html展式相容性很差的情况，目前老师说可以使用oss的服务进行规定的图片裁剪，目前解决方法也是如此。如果写完有时间打算研究一下图片裁剪。

✅ 基本完成个人首页的后端联调，现在需要等待组员完成组件的其他内容。


### 8月9日
✅ 修改昨天样式一些不太合理的地方，修复了follow页面因为word-break而引起的bug

✅ 对uploadImage的api封装进行了小幅度改动。调整了singleImageUploader组件并完成了个人信息页面修改与后端接口的联动。

✅ 完成user service中其他的所有内容，完成follow service中所有内容

✅ 完善了全局toast loading的效果，使得持续时间和表现更加合理

### 8月8日
✅ 完成关注、个人首页、个人信息静态页面

✅ 依照规范修改合并后不太规范的代码


### 8月5日
✅ 今天将登陆注册以及权限验证全部完成

✅ 完成首页个人信息sidebar弹窗

✅ 将之前项目中自己封装好的customList、customEmpty组件迁移到该项目继续使用

✅ 依老师建议，将重定向地址等信息全部存放在后端，前端向后端发送请求，后端返回重定向地址，前端进行跳转

✅ 新增微信service，封装微信请求以供controller使用。还将微信service错误在logger中间件中进行特殊处理，方便后端定位微信service错误的同时，不会将应用信息泄露给前端。

✅ 找到一个较好的方法处理中英文混合字符长度的计算，写好正则规则找出所有中文后统一替换成`a.repeat(2)`的形式后在进行计算。目前已封装成方法，具备扩展性，之后加入新语言只需写好正则以及重复的次数即可

### 8月4日
✅ 完成登录注册后端，大体完成登录注册前端页面

✅ 今天碰到使用useCallback无限触发的问题，以此为契机，得知自己对于useEffect、useState理解其实还是不够清晰深刻，于是再次回顾老师所讲，加上去网上搜索相关文章，通过研读这些文章，这次总算对它们有了清晰的认知。
文章：[关于useState的一切](https://zhuanlan.zhihu.com/p/200855720?utm_id=0)
1. useState并不是真的异步，而是在react的流程控制下他必须得是异步执行，因为useState牵扯到重新渲染，diff对比，所以肯定是无法做到及时更新
2. useState实现原理简陋一点来说是闭包的运用，当有异步更新操作时，原来保存的值仍然是函数组件执行时的初始值，所以即使调用更新，每次的state也是没有更新过的baseState。而传入函数实际上是判断了是否调用reducer，每次将更新过后的state传入函数作为参数更新自然能够按照代码逻辑更新
3. useEffect的更新底层调用的是Object.is函数，即是为了性能考虑，只对数据进行浅比较，所以当监听数组和对象时需要尤为注意。赋值新的对象和数组时，因为内存地址改变，所以useEffect会执行，每一次执行又会改变内存地址，这便会造成无限循环。解决办法有三种，一是监听对象内部属性，二是使用ref记住引用地址，三是使用函数赋值state，此时函数参数并不会被收集为依赖，所以也不会触发无限循环

### 8月3日
✅ 与小组成员一起完善了框架，进一步确立项目规范

✅ 解决项目别名引入报错问题，问题在于babel执行和引入时机的问题，babel会先将资源打包，所以需要添加插件module-resolver以模块化引入后解决

✅ 完成layout布局和tabBar，完成login布局


### 8月2日
✅ 分析了整体项目需求，同小组成员一起完成了初期数据结构设计并制定了项目计划。修改了不合理的数据结构，完成了api和数据接口。

✅ 学习了微信第三方登录流程以及阿里oss对接方法。

✅ 完成了前端和后端的框架搭建，项目编码规范。

### 8月1日
✅ 听老师讲大作业细节，看大作业README，把握项目整体内容

✅ 与小组成员一起商讨项目细节，包括数据结构、第三方对接、api设计以及大致项目分工，目前数据结构、项目分工都基本确定，第三方对接也研读了官方文档，但感觉还不够清晰，需要进一步探讨。

✅ 我负责用户这一块，所以需要了解微信和阿里云方面的对接，今天也主要关注了这两个方面，看了官方文档，理清了大致思路，但不敢保证思路一定正确，还是需要和小组成员继续探讨一下。

### 7月29日
✅ 完成绝大部分前端任务，目前还差编辑文件以及分享查看的部分，周六一起全部完成

✅ 遇到nextjs动态路由不刷新数据的问题，具体问题以及解决方法可查看nextjs关于路由篇章`Resetting state after navigation`
When navigating to the same page in Next.js, the page's state will not be reset by default as react does not unmount unless the parent component has changed.
1. Manually ensure each state is updated using useEffect. 
2. Use a React key to tell React to remount the component. 

✅ 对task-03的前端项目部分组件和逻辑进行复用，这时才更明确体会到hooks写法以及封装好组件后的好处，很多代码直接挪用过来时，修改地方很少就能继续使用，甚至有的只需要修改初始赋值以及引用路即可，真正提高了开发效率。

✅ ssr进行权限验证时，免登录以及权限验证失败的跳转，有的可以写在客户端，有的需要写在服务端，正式项目使用时不知道会采取什么方案

✅ 数据库share和file关联性极强，mongodb用的不是很熟练，没找到关于级联操作的说明，所以好多逻辑都是自己去重新写了一下，感觉如果不用级联操作，某些更新和删除确实会有些绕，之后有时间可以继续学习一下这方面的东西。

✅ 简单用正则做了一下html的过滤，然后发现好像quill都已经把一些工作给做好了，比如`<`这种符号全部转换成了`&lt`字符这样，可能还有在标签里面插入url链接请求的，这种暂时没时间研究了，等之后好好看一下，这样直接写入html确实十分危险


### 7月28日
✅ 明白了如何通过nextjs和axios结合给服务端发送cooike

✅ 通过老师点播弄明白了svg引入的bug

✅ 解决了加载刷新时的一些bug

✅ 改善后端响应接口，修改了一处api的bug

### 7月27日
✅ 增加service响应接口，修改了一些接口响应的内容

✅ 学习了nextjs请求代理相关知识，了解了老师所用代理方式原来是相当于自定义了nextjs的服务器，然后利用http-proxy插件进行请求代理

✅ 配置了nextjs babel，使得可以直接引入svg作为React Component使用

✅ 完成登录页面及其功能

### 7月26日
✅ 继续学习了服务端渲染，引入antd-mobile库，编写后端note-server接口

✅ 在删除folder时会需要查找所有后代节点并一并删除的需求，因为本次数据结构比较特殊，是树形结构的数据，故一般建表会采用三种方式。
1. 邻接表：即是目前我使用的表结构，每个表记录一个parent_id用来连接各部分
2. 路径数组：即是记录所有祖先路径，类似a/b/c这样
3. 闭包表：即是将关系单独抽成一张表，记录祖先、后代、以及两者的距离，类似于图
总的来说最常用的还是一，查找后代虽然需要递归，但总体扩展灵活性都很好，2、3也可以用，但增改操作会比较麻烦

✅ 记录share浏览次数，不应该访问一次接口就立马增加一次，这里面有频率的问题，所以我的想法是记录一个访问过后的cookie设置一小时到期，每次增加前判断是否有cookie即可。


### 7月25日
✅ 今天主要是听老师讲课，然后仔细学习老师给的demo，整体把握住了项目结构以及ssr概念

✅ 搭建好front和server开发框架，设计好数据结构

✅ 写好部分service，目前卡在了删除上，需要重新构思一下表结构

### 7月22日
✅ 基本完成前端页面

✅ 本次学到了很多知识，nodejs、koa，服务端开发流程，cookie、session登录，分页加载，前后端错误的集中管理，后端日志打印，mongodb数据库的使用

✅ 前端问题主要在于如何进行组件划分，免登录以及登录校验，task任务如何利用hook封装等，目前都以自己的视角出发，找到了解决方案

### 7月21日
✅ 完成login、register页面，开始编写task页面

✅ 组件划分、结构上有些疑问，其次是三个task的分页，在hook中实现请求数据并分页展示上有些问题，最后是再写task接口时重复冗余的写了三个不同请求任务的接口，但感觉这样解决比较方便，暂时没想到更好的解决办法

### 7月20日
✅ 为什么要特意在随机一个sessionId，而不是直接用ObjectId？因为ObjectId生成也是有规律，保存前端cookie及其不安全，所以仍需要一个无规则随机生成的字符串来作为sessionId

✅ 后端错误管理，日志打印，中间件检查token，user服务，task服务已全部完成

✅ 通过postman测试接口，发现几处bug修改后目前暂时没有问题

✅ 重新搭建前端开发框架

### 7月19日
✅ 主要完成了node的全局错误管理，全局token检查以及logger打印

✅ 在编写代码时对koa的洋葱模型理解不够清晰，导致一些执行顺序的错误，去官网以及google上好好看了一下koa的洋葱模型的理解，研究了一下简化版的实现原理，目前算是总体弄明白了koa的洋葱模型，修改了中间件的代码逻辑

✅ 遇到一个奇怪的问题，enum定义在不同的地方导入导出，大部分情况可以成功导出，但有时会碰上导出的对象为undefined的情况，也就是对象未定义，翻墙google后发现原因，以下为原文：

```
The enum error - cannot read property of undefined occurs for 2 main reasons:

1. Using const enums that get removed during compilation.
2. Having circular imports (importing members between the same files).
```
简单说便是这是ts编译的锅，我们写enums时最好不要导出const enum，同时不要循环引用enum，最好将enum放入同一个文件夹，分发引用。所以我将enum全部归类放在同一个文件后果然问题解决

✅ 还碰到一个问题是：为什么导出collection可以，导出db却失败，明明同样是在initDb中赋值？回去想了一会儿，想明白了。因为我用的时机不对。我导出db后初始化model是在顶层函数执行，此时由于db尚未连接，所以定义的变量db肯定是undefined。而导出的model使用时机是在全部初始化完成后，中间件的回调中使用，而此时model肯定是有值的。所以我将model的初始化封装成函数在initDb中调用，传入已生成的db，在导入model果然问题解决




### 7月18日
✅ 今天主要是听老师讲课，然后仔细看了一下老师的koa-demo，整体把握住了项目结构

✅ 去学习了一下nodejs crypto的一些内容，了解几种加密方式，hMac使用，以及如何创建salt额外的加密随机字符

✅ 之前预习过mongodb的使用，今天复习了一下CRUD语句的用法，着重关注了一下joi校验数据库的使用

✅ 根据老师项目要求，搭建好开发环境，成功连接上数据库，目前在写错误处理的代码逻辑


### 7月15日
✅ 任务已基本全部完成，包括三个指令，错误管理以及总help函数。途中思考了错误的集中管理，关于命令行参数检测没必要每个文件单独重复去写，直接在入口去检测就好，包括help函数的触发，这些直接把逻辑集中丢给入口处处理，其余每个指令特别的一些类似路径检查的代码再每个文件单独写。但目前感觉错误处理的函数写的还不够好，可能是我的错误数据结构设计的有些小问题。

✅ 对代码一些细节部分的缺失进行了处理，比如一些用户输入时可能没有输入文件名之类的。删除了一些无用代码，对部分代码逻辑进行了一些精简

✅ 修改和补充了一些代码注释
### 7月14日
✅ 关于正则匹配遇到一个非常奇怪的问题，有三个正则`(.|\s) [^] [\w\W]`，三个正则都利用`String.prototype.match`匹配压缩过后的单行极长文件，第一个正则会卡死，而第二第三个正则则表现正常，因为`()`该正则会记住字符串，所以当结果过多时会导致卡死

✅ 注释在一些极端刁钻的情况有可能会重复匹配，还有例如html文件中包含html、style、script等情况，后者目前有解决思路——利用正则限制在不同标签内去匹配——前者暂时还没想到

✅ 已解决html中注释的问题，解决办法是之前一些想法的结合和改进。主要是将处理comment的接口改了，然后导出处理comment的fileString以及一些共同的处理方法，关键在于判断是否是函数，具体定义如下：

```ts
function execHtmlCommentRule(fileString: string): string[] {
  // html中注释正则
  const htmlCommentRegex: ICommentRule = {
    single: /[]/,
    multiple: /<!--[^]*?-->/g,
  }
  ...
  // 分别取出style和 script 处理然后和html处理结果合并
}

const ClocHtmlRule: IClocLanRule = {
  lan: 'HTML',
  test: /\.(html|htm)$/,
  use: {
    comment: execHtmlCommentRule,
  },
}

// 两个个处理函数
export function handleClocCommentRule(
  fileString: string,
  commentRule: ICommentRule
): string[] {
  ...
}

export function execCommentRule(
  fileString: string,
  rule: IClocLanRule
): string[] {
   // 总注释组
  let totalComment: string[] = []
  if (typeof comment === 'function') {
    totalComment = comment(fileString)
  } else {
    totalComment = handleClocCommentRule(fileString, comment)
  }
  return totalComment
}
```


### 7月13日
✅ 重新封装了printTable函数，重新写了代码逻辑，删掉很多无用代码，增加了新的option，目前支持的option如下

```ts
export interface IPrintTableOptions {
  titleIndent?: number
  titleAlign?: 'left' | 'center' | 'right'
  titleStyle?: IStyle // 设置custom title,
  showTopBottomDivider?: boolean // 是否显示上下边框 默认false
  tableDividerSeparator?: string // divider分隔符 默认 '-'
  titleIndentSeparator?: string // indent 分隔符 默认 ' '
  footer?: boolean // 是否开启footer ，默认数据组最后一个为footer
}
```

✅ 好好学习了一下正则表达式，特别是关于修饰符和贪婪非贪婪匹配模式这一块，将cloc处理文件部分的逻辑完全抽离了出来并规定了以下接口用于增加新的处理规则，只需定义好规则，然后加入`ClocLanRuleList`即可

```ts
export interface IClocLanRule {
  lan: string
  test: RegExp
  use: {
    comment: {
      single: RegExp
      multiple: RegExp
    }
  }
}

const ClocJavaScriptRule: IClocLanRule = {
  lan: 'JavaScript',
  test: /\.js$/,
  use: {
    comment: {
      single: /^\/\/.*/gm,
      multiple: /\/\*(.|\s)*?\*\//g,
    },
  },
}

export const ClocLanRuleList: IClocLanRule[] = [ClocJavaScriptRule]
```

✅ 基本写完了全部命令，但目前还有两个问题，一是正则匹配极端情况的注释仍待解决，二是代码健壮性不够，需要专门抽出一个错误处理和提示的部分

### 7月12日
✅ 找出了一种协调printTable和chalk之间的方法，目前使用起来比较简单也很好理解

✅ 根据老师发的mdn文档，学习了`localeCompare`api，结合`sort`函数可以很好的对数字以及字母进行排序，目前使用没有问题，待项目  完成后会再去研究一下该api的一些选项

✅ 查看了Http手册，了解`content-disposition`的基本内容

✅ 完成了ls和wget的封装，在封装wget时主要难点是下载速度的实时计算。不能只依靠data事件监听触发实时，一是速度改变过快不具备普适性，二是有时因为一些赋值原因可能导致计算出错，所以需要定义一个时间条件去限制计算频率。

✅ 完成部分cloc，现在问题在于文件分析的正则，正则部分内容不够熟悉，目前准备花时间研究一下



### 7月11日
✅ 听课 & 对照作业以及官方文档看懂demo代码 & 开始编写task-02

✅ 完成sort的封装 & 完成大部分printTable的封装 & 完成部分格式化时间以及文件操作的封装 & 基本完成ls命令

✅ 封装过程中遇到解构赋初值失败的问题，查看MDN文档和TypeScript文档发现是自己搞混了`params?:xxx`和`params: xxx = {}`的用法，解构赋初值采用后者，否则undefined无法解构出属性，同时记住只有严格等于undefined才能成功赋初值

✅ 当前仍存在的问题是如何将颜色选项封装进printTable中


### 7月8日
✅ 完成了task-01，对不太合理的地方进行了修改

✅ 对props父子传参，hooks分离UI和数据状态操作有了进一步的理解——react hook和props传值，什么时候适合传值，什么时候使用hooks？我目前认为，封装通用组件以属性决定组件如何渲染时需要使用props，其余的增删改查的改变数据状态的操作都可以封装成hooks在函数式组件共用——这种hook的使用方法在之前写vue时几乎没怎么考虑过，现在看来用处的确非常大

✅ react中封装通用组件让我进一步理解实际运用到了react中的动态样式改变的几种方法，加深了这方面的实操能力

✅ 对react中数据如何对比更新有了进一步认识，切记复杂数据更新要改变引用地址

✅ 发现老师和我的项目flex布局下，中文自动换行，但是当是一连串英文字符时不会自动换行——这是因为一连串不空格英文字符会被认作一个整体，故不会换行，破坏了整体布局。需要加上`word-break: break-all`属性来解决



### 7月7日
✅ 昨天得知~~懒加载不需要每层路由都包一层`suspense`，而是直接在需要用到路由视图的外层包一层`suspense`即可~~，这样是不行的，因为用使用useRoutes函数生成路由时的element参数需要ReactNode，所以必须自己包一层suspense，不能只在最外层包裹

✅ 当父元素也有属性改变时，例如`visibility opacity`的改变，需要给父元素也加上transition过渡属性，否则子元素无法出现动画效果

✅ 除了可以配置webpack引入sass全局变量外，也可以使用@use指令来模块化引入sass变量

✅ 今天主要封装了drawer组件，写完了基本布局，还差task的逻辑互动。途中困难点主要还是在组件封装和传值，主要思考hook和组件传值的区别和究竟该使用哪一个

✅ 切记react是否更新视图，对比的是数据的引用地址是否改变，所以当更新复杂类型时，保留原数据同时需要改变引用地址！

### 7月6日
✅ css modules 中使用类似`.classname1 .classname2{}`这样的后代选择器只需要按照`<ul class="styles.classname1"><li class="styles.classname2"></li></ul>`即可，css modules会自动解析classname并加上hash值

✅ svg图标加上`fill="currentColor"`可以用`color`改变svg颜色

✅ 开始编写task-01，遇到import加载运行时找不到模块的问题，import需要在文件顶层运用，这样才能正确解析路径，并且懒加载不需要每层路由都包一层`suspense`，而是直接在需要用到路由视图的外层包一层`suspense`即可


### 7月5日
✅ 因为最终考核需要使用mongodb数据库，而sequelize不支持mongodb数据库，故改学mongoose,目前环境已改为如下：

```json
"dependencies": {
  "koa": "^2.13.4",
  "koa-body": "^5.0.0",
  "koa-router": "^10.1.1",
  "log4js": "^6.5.2",
  "mongodb": "^4.7.0",
  "mongoose": "^6.4.2"
},
"devDependencies": {
  "@types/koa": "^2.13.4",
  "@types/koa-router": "^7.4.4",
  "@types/node": "^18.0.0",
  "@typescript-eslint/eslint-plugin": "^5.30.0",
  "@typescript-eslint/parser": "^5.30.0",
  "eslint": "^8.18.0",
  "typescript": "^4.7.4"
}
```

✅ 大致过了一遍mongoose，感觉很多理念与sequelize相似，区别在于关系型与非关系型数据库构建方式的不同，以及一些api的调用。个人感到比较难的地方在于populate，涉及到非关系型数据库使用外表fields，逻辑和api调用有些繁琐。

✅ 考虑每个文档有最大数据限制（16M）以及load数据的时间，非关系型数据库mongoose文档设计一般遵顼以下原则：
1. 一对很少：这种情况可以直接将“很少”的内容嵌入“一”，称为内嵌
2. 一对较多：这种情况可以在“一”中嵌入“较多”的每个id，形成引用关系，称为子引用
3. 一对很多：这种情况可以在“很多”中的每个内容中嵌入“一”的id，称为父引用

✅ node事件监听模块
1. 添加监听器`addListener & on & once & prependListener & prependOnceListener` (不设置情况下最大监听器数量为10)
2. 触发器`emit` 
3. 移除监听器`removeListener & off & removeAllListeners`

✅ 重新搭建项目模板如下，连接服务器并用postman测试成功：

```ts 
// index.ts
import * as koa from 'koa'
import { connectDatabase } from './db'
import { registerRouter } from './router'


const app = new koa()
const PORT = 3000

async function start() {

  // 连接数据库
  await connectDatabase()

  // 注册路由
  registerRouter(app)

  // 开启服务器
  app.listen(PORT, () => {
    console.log(`服务于${PORT}端口启动`)
  })
}

start()


// router.ts
import * as Router from 'koa-router'
import UserRouter from '../controllers/user.controller'
import * as Koa from 'koa'

// 总路由
const router = new Router()

// 完成定义的路由
const routerDefiners = [UserRouter]

export function registerRouter(app: Koa) {
  // 挂载定义好的路由至总路由
  routerDefiners.forEach(routerDefiner => {
    router.use(routerDefiner.routes())
  })

  // 注册路由
  app.use(router.routes())
}


// db.ts
import { connect, connection } from 'mongoose'

async function connectDatabase() {
  try {
    await connect('mongodb://localhost:27017/my_mongodb')
    console.log('数据库连接成功！')
    listeningDatabaseConn()
  } catch (error) {
    console.log('数据库连接失败！')
  }
}

function listeningDatabaseConn() {
  connection.on('error', () => {
    console.log('----数据库连接出错 尝试重连。。。')
  })
  connection.on('disconnected ', () => {
    console.log('数据库断开连接，尝试重连数据库。。。')
    connectDatabase()
  })
}

export {
  connectDatabase
}
```


### 7月4日
- [x] 学习react文档教程(已完成)
    - nodejs下和浏览器下的setInterval是不同的实现，所以当使用node环境下要用浏览器的setInterval最好使用`window.setInterval`
    - useRef钩住react下的原生组件，useForwardRef钩住react下自定义组件
- [x] 学习ORM工具`sequelize`(配合koa写demo练习)
    - 看完了`model basic & model query & validate & db association`
    - 了解如何在typescript中使用`sequelize`
    - 封装db
  
```ts
import { Sequelize, ModelDefined } from 'sequelize'
import { applyExtraSetup } from './db.config'
import User , {IUserModel, TUserCreationModel} from './models/user.model'

enum DatabaseConnEnum {
  dialect = 'mysql',
  host = 'localhost',
  database_name = 'study_demo',
  username = 'root',
  password = 'tzx1234'
}

// modelDefiner容器
const modelDefiners = [
  User
]

// config容器
const configs = [
  applyExtraSetup
]

class Database {
  public controller: Sequelize
  private modelDefiners: ModelDefined<IUserModel, TUserCreationModel>[] = []
  private configs?: any[] = []
  constructor(modelDefiners: any[], config?: any[]) {
    this.init(modelDefiners, config)
    this.applyModelDefiners()
    this.applyConfig()
  }

  // 初始化
  private init = (modelDefiners: ModelDefined<IUserModel, TUserCreationModel>[], config?: any[]) => {
    this.controller = new Sequelize(DatabaseConnEnum.database_name, DatabaseConnEnum.username, DatabaseConnEnum.password, {
      dialect: DatabaseConnEnum.dialect,
      host: DatabaseConnEnum.host
    })
    this.modelDefiners = modelDefiners
    this.configs = config
  }

  // 提供model
  private applyModelDefiners = () => {
    modelDefiners.forEach(modelDefiner => modelDefiner(this.controller))
  }

  // 提供配置
  private applyConfig = () => {
    this.configs.forEach(config => config(this.controller))
  }

  // 连接数据库
  public connect = async () => {
    try {
      await this.controller.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.log('Unable to connect to the database:', error)
    }
  }
}

export default new Database(modelDefiners, configs)
```

### 7月1日
- [ ] 学习ORM工具`sequelize`
    - 目前只过了一遍Modal操作，`sequelize`相当于中间层。既负责连接数据库，又能将js定义的对象映射和操作作用于数据库
    - 目前对如何将sequelize较好的组织进项目感到疑惑
- [ ] 学习react文档教程
    - setState是异步执行
    - 当设置新值会用`Object.is`对比
        1. 简单类型时不会render
        2. 复杂类型时引用相同不会render

### 6月30日
- [x] 尝试custom loader编写

```js
// 清除console.log
module.exports = function (content){
  return content.replace(/console\.log\(.*\);?/g, '')
}


// 自定义追加内容
// schema.json
{
  "type": "object",
  "properties": {
    "otherString": {
      "type": "string"
    }
  },
  "additionalProperties": false // 是否有额外属性，false时传递无定义属性会报错
}

// customLoader.js
const schema = require('./schema.json')
module.exports = function (content){
  const options = this.getOptions(schema)
  const otherString = `
  /* 
    * 追加内容：${options.otherString} 
    */
  `
  return otherString + content
}


// 自定义file-loader
// customFileLoader.js
const loaderUtils = require('loader-utils')
module.exports = function (content){
  const filename = loaderUtils.interpolateName(this, '[hash].[ext][query]', {content})
  this.emitFile(filename, content)
  return `module.exports = ${filename}`
}
module.exports.raw = true // buffer传输


// 自定义babel-loader
// schema.json
{
  "type": "object",
  "properties": {
    "presets": {
      "type": "array"
    }
  },
  "additionalProperties": true // 是否有额外属性，false时传递无定义属性会报错
}

// customBabelLoader.js
const babel = require('@babel/core')
const schema = require('./schema.json')
module.exports = function (content){
  const callback = this.async()
  const options = this.getOptions(schema)
  babel.transform(content, options, function (err, res){
    if(err) return callback(err)
    else return callback(null, res.code)
  })
}
```

- [x] 开始学习node后端编程，初步了解如需搭建后端工程可用工具库`sequelize log4js koa koa-body koa-router`
    - 搭建开发学习环境

```js
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs", // 最终编译为nodejs能够识别的commonjs模块
    "target": "esnext", // 语法转换兼容版本
    "skipLibCheck": true, 
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}


// package.json 暂时需要安装的包
{
  "dependencies": {
    "koa": "^2.13.4",
    "koa-body": "^5.0.0",
    "koa-router": "^10.1.1",
    "log4js": "^6.5.2",
    "mysql2": "^2.3.3",
    "sequelize": "^6.21.2"
  },
  "devDependencies": {
    "@types/koa": "^2.13.4",
    "@types/koa-router": "^7.4.4",
    "@types/node": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.30.0",
    "@typescript-eslint/parser": "^5.30.0",
    "eslint": "^8.18.0",
    "typescript": "^4.7.4"
  }
}

// .eslint.js
module.exports = {
  root: true, // 指定该配置项作用于backend项目
  env: {
    node: true, // 添加node环境变量
    commonjs: true, //添加commonjs环境变量 
    es6: true, // 添加es6新增语法
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: '*.test.js',
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single']
  }
}
```

### 6月29日
- [x] 导出项目，类型声明

``` json
// 源码为ts
"main": "dist/index.js",
"types": "src/index.ts"

// 源码为js
"main": "dist/index.js",
"types": "src/index.d.ts"
```
- [x] 重点看了一下mobx，并在codesandbox中封装使用了一下mobx

```ts
// todoStore.tsx
import { makeAutoObservable } from 'mobx'

interface ITodoStore {
  count: number
}

export class TodoStore implements ITodoStore {
  count: number = 0
  constructor() {
    makeAutoObservable(this)
  }
  addCount = () => {
    this.count++
  }
}

// index.ts
import { createContext, useContext } from 'react'
import { TodoStore } from './modules/todoStore'

class Store {
  todoStore: TodoStore
  constructor() {
    this.todoStore = new TodoStore()
  }
}

const storeContext = createContext(new Store())

export function useStore() {
  return useContext(storeContext)
}s

```
- [x] 解决昨天配置webpack配置react项目问题

```js
// 配置router可用而不是刷新无法在source下找不到路由，即找不到时直接返回到index.html文件即可
// 查看官方devServer文档，可找打historyApiFallback选项，设置选项为true即可
module.exports = {
  // ...
  devServer: {
    // ...
    historyApiFallback: true
  }
}

// 无法热更新加载文件模块，使用@pmmmwh/react-refresh-webpack-plugin react-refresh
module.exports = {
  // ...
  devServer: {
    // ...
    hot: true
  },
  module: {
    rules: [
     {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: ['react-refresh/babel'],
          },
        },
      ],
     }
    ]
  },
  plugins: [ new ReactRefreshWebpackPlugin()]

  // babel相关配置也无需一一下载配置，安装babel-loader，@babel/core后下载babel-preset-react-app即可
  // babel.config.js
  module.exports = {
    presets: ['react-app']
  }
}

```
- [ ] webpack loader学习
      1. 4种loader执行顺序
         1. pre
         2. normal
         3. inline
         4. post
         <br />执行顺序为 pre > normal > inline > post
      2. 可通过`enforce: 'pre | normal | inline | post'`强制改变执行顺序

```js
// 自定义loader
/* 
1. 同步loader
err: 是否有错误 没有传递null
content: 处理文件的内容
map: 与sourceMap有关
meta: 包含其他loader传递的参数
*/
module.exports = function customLoader(content, map, meta) {
  // ...
 return content
}

module.exports = function customLoader(content, map, meta) {
  // ...
  // 一般使用该写法，传递错误以及其他loader参数
  this.callback(err, content, map, meta)
}

/* 
2. 异步loader
err: 是否有错误 没有传递null
content: 处理文件的内容
map: 与sourceMap有关
meta: 包含其他loader传递的参数
*/
module.exports = function customLoader(content, map, meta) {
  // ...
  const callback = this.async()
  // 模拟异步
  setTimeout(() => {
    // ...
    callback(err, content, map, meta)
  }, 1000)
}

/* 
3. raw loader
err: 是否有错误 没有传递null
content: 处理文件的内容
map: 与sourceMap有关
meta: 包含其他loader传递的参数
*/
module.exports = function customLoader(content, map, meta) {
  // ...
  this.callback(err, content, map, meta)
}
// 接受buffer数据流
module.exports.raw = true

/* 
4. pitch loader
err: 是否有错误 没有传递null
content: 处理文件的内容
map: 与sourceMap有关
meta: 包含其他loader传递的参数
*/
module.exports = function customLoader(content, map, meta) {
  // ...
  this.callback(err, content, map, meta)
}

// 优先执行pitch 注意多个loader pitch执行顺序与loader相反
module.exports.pitch = function pitch() {
  // ...
  // return 后会中断执行，返回上一个pitch的loader继续执行，即之后的pitch和loader都不执行
}


```

      
### 6月28日
- [x] 从零开始搭建一个简易react的开发环境，理解工程配置项，目前不涉及压缩文件、抽取css以及解析预处理器
    - 分析需要解析的文件
      1. `.ts|.tsx|.js|.jsx`文件
      2. 所有图片文件引入
      3. 所有css文件引入
    - 需要用到的库，目前可成功运行，但有两点问题
      1. 刷新路由丢失
      2. 懒加载路由找不到对应模块

```json
// 所需依赖
"dependencies": {
   "@types/react": "^18.0.14", 
   "@types/react-dom": "^18.0.5",
   "@types/react-router-dom": "^5.3.3",
   "react": "^18.2.0",
   "react-dom": "^18.2.0",
   "react-router-dom": "^6.3.0"
 },
 "devDependencies": {
   "babel-cli": "^6.26.0",
   "babel-core": "^6.26.3",
   "babel-loader": "^8.2.5",
   "babel-preset-env": "^1.7.0",
   "babel-preset-react": "^6.24.1",
   "css-loader": "^6.7.1",
   "html-webpack-plugin": "^5.5.0",
   "style-loader": "^3.3.1",
   "ts-loader": "^9.3.1",
   "typescript": "^4.7.4",
   "webpack": "^5.73.0",
   "webpack-cli": "^4.10.0",
   "webpack-dev-server": "^4.9.2"
 }
```
  
```js
// 具体webpack配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
entry: './example/src/index.tsx', // 入口文件
output: {
  path: path.resolve(__dirname,'dist'),
  filename: 'js/main.js',
  clean: true
},
mode: 'development',
devtool: 'source-map',
devServer: {
  open: true,
  port: 8080,
  host: 'localhost'
},
module: {
  rules: [
    // 处理css
    {
      test: /\.css/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    // 处理图片
    {
      test: /\.(png|jpe?g|svg|gif|webp)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024
        }
      },
      generator: {
        filename: 'static/images/[hash:10][ext][query]'
      }
    },
    // 处理js jsx
    {
      test: /\.(js|jsx)$/ ,
      exclude: /node_modules/,
      use: [
        {
          loader:'babel-loader'
        }
      ]
    },
    // 处理ts tsx
    {
      test: /\.(ts|tsx)$/ ,
      exclude: /node_modules/,
      use: [
        {
          loader:'ts-loader'
        }
      ]
    }
  ]
},
resolve: {
  extensions: ['.tsx', '.ts', '.jsx', '.js']
},
plugins: [
  new HtmlWebpackPlugin({
    title: 'react-router-naive-guard demo',
    template: path.resolve(__dirname, './example/src/index.html')
  })
]
}
```
- [x] 重构并发布`react-router-naive-guard`路由守卫组件至npm，npm库地址[react-router-naive-guard](https://www.npmjs.com/package/router-naive-guard)

### 6月27日
- [x] 尝试以`react-router-dom v6`完成编写一个简单的全局路由守卫
    - 创建接口编写路由，之后对路由进行处理后以`useRoutes`函数创建`router-view`
    - 目前主要在两个点上碰到过问题
      1. 递归查找路由表 
      2. 深拷贝路由表进行处理
      在处理过程中，主要是自己实现了递归查找和深拷贝，记录以下深拷贝中遇到的问题

```ts
export function cloneDeep(target: any) {
  // 递归普通深拷贝存在以下问题：
  // 不能处理循环引用。 --> 使用 WeakMap 作为一个Hash表来进行查询
  // 只考虑了Object对象，
  // 而Array对象、Date对象、RegExp对象、Map对象、Set对象都变成了Object对象，
  // 且值也不正确。 --> 当参数为 Date、RegExp 、Function、Map、Set，则直接生成一个新的实例返回
  // 丢失了属性名为Symbol类型的属性。
  // 丢失了不可枚举的属性。
  // 原型上的属性也被添加到拷贝的对象中了

  const map = new WeakMap();

  function isObject(data: any): any {
    // 注意 null 也为object
    return (typeof data === "object" && data) || typeof data === "function";
  }

  function clone(data: any) {
    // 基础类型直接返回值
    if (!isObject(data)) return data;

    // 日期或是正则构造一个新的返回
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }

    // 处理函数
    if (typeof data === "function") {
      return new Function(`return ${data.toString()}`)();
    }

    // 对象存在直接返回，避免循环引用
    const exist = map.get(data);
    if (exist) return exist;

    // 是Map
    if (data instanceof Map) {
      const res = new Map();
      map.set(data, res);
      data.forEach((val, key) => {
        if (!isObject(val)) {
          res.set(key, val);
        } else {
          res.set(key, clone(val));
        }
      });
      return res;
    }

    // 是set
    if (data instanceof Set) {
      const res = new Set();
      map.set(data, res);
      res.forEach((val) => {
        if (!isObject(val)) {
          res.add(val);
        } else {
          res.add(clone(val));
        }
      });
      return res;
    }

    // 是普通对象
    // 收集键名，考虑不可枚举和Symbol的情况
    const keys = Reflect.ownKeys(data);
    // 获取所有属性描述
    const allDesc = Object.getOwnPropertyDescriptors(data);
    // 浅拷贝一个对象
    const res = Object.create(Object.getPrototypeOf(data), allDesc);

    // 加入weakmap
    map.set(data, res);

    // 深拷贝对象
    keys.forEach((key) => {
      const val = data[key];
      if (!isObject(val)) {
        res[key] = val;
      } else {
        res[key] = clone(val);
      }
    });
    return res;
  }
  return clone(target);
}

```


### 6月24日
- [x] 编写暑期task03， 完成进度100/100
- [x] 总结了一下react处理路由传递参数的几种方法：

| 方法                  | 表现行为                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------- |
| params                | URL保留，只可传字符串，刷新不丢失，使用`useParams`即可获得                                    |
| query（SearchParams） | URL保留，可传递对象，刷新不丢失，可使用`useLocation & qs`获取，v6版本可用`useSearhParams`获取 |
| state                 | URL不保留，刷新丢失，直接使用`useLocation`即可获取state对象                                   |

- [x] `useMemo`实际上有点像Vue中的`computed`，会缓存上一次的存储结果与现在相比，若没有变化则不会重新执行render，这样节省性能开销。`useCallback`则是它的语法糖，因为有时候会想要监听函数，这时候返回一个函数写法看上去有些别扭，于是可用`useCallback`来使得代码可读性更好。
- [x] `useTransition`是react18新特新，可以用来处理UI更新的优先级，可以很好解决一些较大UI更新阻塞较小UI更新的问题。具体可以查看[useTransition](https://juejin.cn/post/7020621789172613157)这篇文章，讲得很详细，可以在sandbox中尝试。关键在于isPending时可以用一些小的提示代替繁重的UI更新，待UI更新处理完毕再进行替代，体验更好。
- [x] 学习了react常用库antd，重点看了表单相关内容 


### 6月23日
- [x] 对比函数式组件的useEffect和类组件的生命周期：
      useEffect可以看成`componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合`，也就是说一旦有这三个行为，useEffect中传入的callback都将会执行。
      在写组件功能时遇到这个问题，需要初次渲染时不执行，随后值改变时再执行。**这个需求需要用到useEffect和useRef两个Hook函数**
      具体定义如下：

  ```ts
  const useDidMountEffect = (callback:() => any, deps: any[]) => {
    // useRef的作用是创建实例字段，用来判断初次渲染是否执行
    const didMount = useRef(false)
    useEffect(() => {
    if(didMount.current) callback()
    didMount.current = true
    }, deps)
  }
  ```
- [x] 编写暑期task02，完成进度100/100
- [ ] 编写暑期task03，完成进度80/100
    - 利用`customize-cra react-app-rewired`进行配置重写，给项目添加路径别名。
      1. 为了让webpack打包识别路径，重写alias
      2. 为了让ts识别路径并给出提示，再tsconfig中配置baseUrl和paths
      3. 重写`package.json`，利用`react-app-rewired`重新编译项目
    - 监听路由改变用`useEffect useLocation`
    - `react-router-dom v6` 路由重定向使用navigate
    
### 6月22日
- [x] 昨天遇到安装问题，无法完整安装出create-react-app框架，导致出现各种引入提示报错。
      因为没有自动生成react-app-env.d.ts声明文件，所以需要自己主动加上全局声明。今天
      重新安装框架，没有再出现问题。
- [x] 今天主要困惑在于react的样式编写，目前所知有三种：
      1. 直接写style
      2. css modules
      3. styled-components
      目前尝试三种下来，styled-components给我的感觉最好，这种`css in js`的写法个人认为非常贴合jsx语法，既保留了jsx原有属性、解决了命名冲突问题，也可以直接在props中传递变量，极大增加了css的可操控性，同时还能使用css选择器，之后查找修改也十分方便。并且该写法强制性的让人划分组件，是一种强烈的以组件为核心的写法，能够很好强化组件意识。
- [x] 改写create-react-app项目配置有两个主流方法：
      1. eject暴露
      2. 使用craco **但似乎目前carco只支持react-script v4，但最新已经是v5**
- [ ] 编写暑期task02，完成进度80/100
      
### 6月21日
- [x] 接着复习React拓展库，react-router-dom & mobx
- [x] 编写暑期task01，完成进度100/100
- [ ] 编写暑期task02，完成进度50/100
    - 遇到安装问题，无法完整安装出create-react-app框架，目前已知是因为有一个安装命令执行失败，该情况下需要手动
      npm `npm install @testing-library/jest-dom@^5.14.1 @testing-library/react@^13.0.0 @testing-library/user-event@^13.2.1 @types/jest@^27.0.1 @types/node@^16.7.13 @types/react@^18.0.0 @types/react-dom@^18.0.0 typescript@^4.4.2 web-vitals@^2.1.0`
    - 在react18 **StrictMode** 下因为本身会拟执行一遍项目以达到编译前提醒代码误操作行为，所以当项目启动时useEffect会执行两次，但在生产模式下一切正常，所以无需担心。
    - 为了达到组件className传递的效果，可使用库`classnames`，该库封装好了一些处理函数，方便合并class
    - 为了TS能识别`import * from '*.module.css'`需要添加`*.d.ts`声明文件，同时为了能够得到vscode编辑器的css模块化后的智能提示，需要安装`typescript-plugin-css-modules`插件，并做相应配置

### 6月20日
- [x] 简单复习了一下暑期开营前提前学习的React相关知识，包括类组件和函数式组件，数据传递等。
- [x] 了解Typescript中关于jsx编译相关知识
    - Typescript中是内嵌jsx相关模块，相当于React和Typescript两家达成合作，Vue3之前TS难写也是因为当时没有类型系统，是典型的**intuition based design**，具体可以参考尤大的这一篇回答[Typescript不适合在Vue业务中开发？](https://www.zhihu.com/answer/591869966)
    - TS下使用jsx需要两点
      1. 后缀名`*.tsx`
      2. 启用`jsx`选项
    - TS五种jsx模式：
      `react-jsx`为react17新特性具体可参考[介绍全新的 JSX 转换](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

| 模式         | 编译后                                  |
| ------------ | --------------------------------------- |
| preserve     | 代码保留，后缀名jsx                     |
| react        | 代码转换成React.createElement，后缀名js |
| react-native | 代码保留，后缀名js                      |
| react-jsx    | 代码转换成_jsx()，后缀名js              |
| react-jsxdev | 代码转换成_jsxDEV()，后缀名js           |

- [ ] 编写暑期task01，完成进度 80/100








