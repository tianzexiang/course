import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from './router'
import { setupRouterGuard } from './router/guard'
import { setupStore } from './store'
import { registerElIcons } from '@/assets/icons/elment-icons'
import 'element-plus/es/components/message/style/css' // 导入message样式
import 'element-plus/es/components/message-box/style/css' // 导入messagebox样式
import 'element-plus/es/components/loading/style/css' // 导入loading样式
import 'nprogress/nprogress.css' // nprogress样式
import '@/styles/index.less'

const app = createApp(App)

// 启动项目
function bootStrap () {
  // 注册elementplus icons
  registerElIcons(app)

  // 注册store
  setupStore(app)

  // 注册路由
  setupRouter(app)

  // 挂载路由守卫
  setupRouterGuard(router)

  // 挂载vue
  app.mount('#app')
}

bootStrap()
