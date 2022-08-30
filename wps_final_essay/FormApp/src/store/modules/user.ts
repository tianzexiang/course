import { defineStore } from 'pinia'
import { IUser } from '@/interfaces/user'
import { EStatus } from '@/interfaces/problem'
import * as authApi from '@/api/auth'
import { router } from '@/router'
import {
  ElMessage,
  ElMessageBox
} from 'element-plus'
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      user: {
        id: '123456',
        nickname: 'admin',
        account: '',
        status: EStatus.normal,
        pwd: '',
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F5%2Fdef6ed04-6d34-402e-99c8-366266f627dd.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656136447&t=6bdbb16c4b9296dea969f85f8ce0959f',
        ctime: 0,
        utime: 0
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
        paths: ['user']
      }
    ]
  },
  getters: {},
  actions: {
    // 更新用户信息
    setUserInfo (user: IUser) {
      this.user = user
    },
    // 退出登录
    logout () {
      ElMessageBox.confirm(
        '你确定要退出登录吗?',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        try {
          const res = await authApi.logout()
          if (res.stat === 'ok') {
            ElMessage({
              type: 'success',
              message: '成功退出登录'
            })
            // 删除自定义的cookie值
            document.cookie = 'login=;path=/'
            router.push('/login')
          }
        } catch (err) {}
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消退出'
        })
      })
    }
  }
})
