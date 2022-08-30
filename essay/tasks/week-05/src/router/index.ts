import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { PageNameEnum, PagePathEnum } from '../enums/pageEnum'
import type { App } from 'vue'
import HomeLayout from '../layout/index.vue'

// routes
const routes: Array<RouteRecordRaw> = [
  {
    path: PagePathEnum.BASE_HOME,
    name: PageNameEnum.BASE_HOME,
    component: HomeLayout,
    children: [
      {
        path: PagePathEnum.INSPIRATION,
        name: PageNameEnum.INSPIRATION,
        component: () => import('../views/InspirationView.vue')
      }
    ]
  }
]

// init router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// register router
export function setupRouter (app: App) {
  app.use(router)
}
