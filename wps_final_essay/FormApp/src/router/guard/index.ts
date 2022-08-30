import type { Router } from 'vue-router'
import { isCookieExist } from '@/utils/cookie/cookie'
import { PageNameEnum } from '@/enums/pageEnum'
import NProgress from 'nprogress'

export function setupRouterGuard (router: Router) {
  createGlobGuard(router)
  createLoginGuard(router)
}

// 全局守卫
function createGlobGuard (router: Router) {
  router.beforeEach((_to, _from, next) => {
    NProgress.start()
    next()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}

// 登录守卫
function createLoginGuard (router: Router) {
  router.beforeEach((to, _from, next) => {
    // 更换标题
    if (to.meta.title) {
      document.title = to.meta.title
    }
    // 登录守卫逻辑,判断cookie里面是否有token，没有即未登录跳转到登录页
    if (isCookieExist('login')) {
      next()
    } else {
      if (to.name === PageNameEnum.LOGIN || to.name === PageNameEnum.REGISTER || to.name === PageNameEnum.INPUT_FORM) {
        next()
      } else {
        next({
          name: PageNameEnum.LOGIN
        })
      }
    }
  })
}
