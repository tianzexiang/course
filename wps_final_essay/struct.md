1. types: 存放ts模块声明文件
   1. `vue-router.d.ts` ：用来声明路由meta中应存放的信息
2. src
   1. api：用来写http请求，内有大致模板
   2. assets：存放fonts和images静态资源
   3. components：存放全局组件
   4. enums：存放全局enums
   5. interfaces：存放全局接口
   6. router：路由
      1. guard：存放路由守卫逻辑
   7. store：状态管理
      1. index入口文件
      2. modules：每个模块各自的状态管理
   8. styles: 存放less文件
      1. index入口
      2. public全局公共样式
      3. var：存放全局less变量
   9. utils：工具
      1.  封装axios网络请求工具（包括请求拦截，响应拦截，如有需要请在函数中添加）
      2.  存放lodash工具函数，如防抖、节流、判断对象操作等
      3.  时间格式化工具等
   10. views：存放页面（以下为大致模板）
       1.  login：登录页面
           1. index入口文件
           2. components页面局部组件
3. 已配置好elementplus组件自动引用（vue文件中直接使用，按需自动引入），elIcons已全部注册引入
4. 提交项目以及开始写代买前：
   1.  0 warning和error
   2.  先把master分支代码pull一下并合并到自己的分支再开始码代码
5. 目前项目中内容均为模板，可修改。
