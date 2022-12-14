## 作业思路以及问题
1. 主要问题在抽屉的封装，所需属性较多，没什么经验，于是专门去antd官网和github上看了一下抽屉封装的源码和样式，之后便有了思路
2. react hook和props传值，什么时候适合传值，什么时候使用hooks？我目前认为，封装通用组件以属性决定组件如何渲染时需要使用props，其余的增删改查的改变数据状态的操作都可以封装成hooks在函数式组件共用
3. 本次数据采取localStorage存储，我在写`useTaskActions`时将存储`localStorage`操作于每个action中都写了一遍，经老师提醒发现实际上没有必要，因为逻辑一样，都是`taskList`改变后存储`localStorage`，故直接在根组件数据产生的位置使用`useEffect`监听`taskList`改变统一操作更好
4. 本次还有一个疑惑的地方在于`actionDrawer`组件的使用。我将组件放在layout中，目的是只存在一个`actionDrawer`。然调用它的位置，以及决定它如何渲染都在各个子路由中，于是我提取`currTask`和`actionDrawer`存放在全局store中，以供各子路由调用——目前是这样解决的，不知道我的思路是否正确
5. 老师还提到组件不要过于细化的问题，这也是一直困扰我的地方，究竟该怎么正确的划分组件，哪些地方应该划分，哪些地方没有必要去划分，目前为止都是按照普世方法逻辑以及直觉在做，所以并不太清楚一直以来组件划分是否合适
6. 发现老师和我的项目flex布局下，中文自动换行，但是当是一连串英文字符时不会自动换行——这是因为一连串不空格英文字符会被认作一个整体，故不会换行，破坏了整体布局。需要加上`word-break: break-all`属性来解决