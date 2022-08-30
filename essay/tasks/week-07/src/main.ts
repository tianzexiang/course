import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import '@/styles/public.css'

const app = createApp(App)

function bootStrap () {
  // 注册store
  setupStore(app)

  // 注册router
  setupRouter(app)

  // 挂载实例
  app.mount('#app')
}

bootStrap()
