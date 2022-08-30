import type { RouteRecordRaw } from 'vue-router'
import { PageNameEnum, PagePathEnum } from '@/enums/pageEnum'
import BaseLayout from '@/layout/BaseLayout.vue'

export const routes: Array<RouteRecordRaw> = [
  // 重定向到主页
  {
    path: '/',
    redirect: PagePathEnum.LOGIN
  },
  // 重定向到404页面
  {
    path: '/:pathMatch(.*)*',
    redirect: PagePathEnum.ERROR_PAGE
  },
  // 错误页面
  {
    path: PagePathEnum.ERROR_PAGE,
    name: PageNameEnum.ERROR_PAGE,
    component: () => import('@/views/error/Error.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: PagePathEnum.LOGIN,
    name: PageNameEnum.LOGIN,
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: PagePathEnum.REGISTER,
    name: PageNameEnum.REGISTER,
    component: () => import('@/views/register/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  // 基础布局
  {
    path: PagePathEnum.HOME,
    component: BaseLayout,
    children: [
      {
        path: '',
        name: PageNameEnum.HOME,
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '金山表单'
        },
        children: [
          // 在home页面再嵌套一个子路由，因为后端功能没有那么多，所以只有一个路由
          {
            path: '',
            redirect: PagePathEnum.HOME_MYCREATE
          },
          {
            path: PagePathEnum.HOME_MYCREATE,
            name: PageNameEnum.HOME_MYCREATE,
            component: () => import('@/views/home/MyCreate.vue'),
            meta: {
              title: '金山表单'
            }
          }
        ]
      },
      {
        path: PagePathEnum.PROFILE,
        name: PageNameEnum.PROFILE,
        component: () => import('@/views/profile/Profile.vue'),
        meta: {
          title: '个人中心'
        }
      },
      {
        path: PagePathEnum.CREATE_FORM,
        name: PageNameEnum.CREATE_FORM,
        component: () => import('@/views/create-form/CreateForm.vue'),
        meta: {
          title: '新建表单'
        }
      },
      {
        path: PagePathEnum.INPUT_FORM,
        name: PageNameEnum.INPUT_FORM,
        component: () => import('@/views/input-form/InputForm.vue'),
        meta: {
          title: '填写表单'
        }
      },
      {
        path: PagePathEnum.NEW_FORM_RESULT,
        name: PageNameEnum.NEW_FORM_RESULT,
        component: () => import('@/views/new-form-result/NewFormResult.vue'),
        meta: {
          title: '填写详情'
        }
      }
    ]
  }
]
