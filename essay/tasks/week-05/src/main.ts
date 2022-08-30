import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'

const app = createApp(App)

function bootStrap () {
  // configure store
  setupStore(app)

  // configure router
  setupRouter(app)

  // mount app
  app.mount('#app')
}

bootStrap()
