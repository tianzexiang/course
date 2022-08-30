import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import type { App } from 'vue'

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export function setupRouter (app: App) {
  app.use(router)
}
