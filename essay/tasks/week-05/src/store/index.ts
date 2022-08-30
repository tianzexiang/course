import { defineStore, createPinia } from 'pinia'
import type { App } from 'vue'

const pinia = createPinia()

// configure dialog
export const useDialogStore = defineStore('dialog', {
  state: () => {
    return {
      isShow: false
    }
  }
})

// register store
export function setupStore (app: App) {
  app.use(pinia)
}
