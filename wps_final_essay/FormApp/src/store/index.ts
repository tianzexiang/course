import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist' // 持久化存储pinia

const store = createPinia()
store.use(piniaPluginPersist)

export function setupStore (app: App<Element>) {
  app.use(store)
}

export { store }
