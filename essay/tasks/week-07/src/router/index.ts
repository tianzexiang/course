import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { PageNameEnum, PagePathEnum } from '../enums/pageEnum'
import type { App } from 'vue'
import HomeLayout from '@/layout/HomeLayout.vue'
import { useCommunityStore, TTabName } from '@/store/index'
// routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomeLayout,
    redirect: PagePathEnum.GOOD_ARTICLE,
    children: [
      {
        path: PagePathEnum.GOOD_ARTICLE,
        name: PageNameEnum.GOOD_ARTICLE,
        component: () => import('@/views/good-article/GoodArticle.vue')
      },
      {
        path: PagePathEnum.HOT_NEWS,
        name: PageNameEnum.HOT_NEWS,
        component: () => import('@/views/hot-news/HotNews.vue')
      }
    ]
  },
  {
    path: PagePathEnum.DETAIL,
    name: PageNameEnum.DETAIL,
    component: () => import('@/views/detail/BaseDetail.vue')
  }
]

// init router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const tabRouteName = [PageNameEnum.GOOD_ARTICLE, PageNameEnum.HOT_NEWS]
  const communityStore = useCommunityStore()
  if (tabRouteName.includes(to.name as PageNameEnum)) communityStore.tabActived = to.name as TTabName
  next()
})
// register router
export function setupRouter (app: App) {
  app.use(router)
}
