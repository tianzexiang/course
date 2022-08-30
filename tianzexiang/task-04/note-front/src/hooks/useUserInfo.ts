import { Toast } from 'antd-mobile'
import { useCallback, useState } from 'react'
import { getUserInfo, setUserInfo, changePwd } from '../api/user'
import { EPagePath } from '@/enums/page'
import { IChangePwd } from '../interfaces/request'
import { IGetUserInfoResp } from '../interfaces/response'
import { check, checkWithData } from '../utils/checkHttpRes'
import { useRouter } from 'next/router'

export function useUserInfo(initVal: IGetUserInfoResp) {
  const [userValue, setUserValue] = useState<IGetUserInfoResp>(initVal)
  const router = useRouter()

  const getUser = useCallback(async () => {
    try {
      const res = await getUserInfo()
      if (checkWithData(res)) {
        // 拿到用户信息说明登录
        setUserValue(res.data as IGetUserInfoResp)
        // 如果当前处于login页面则直接跳转主页
        if (router.pathname === EPagePath.LOGIN) {
          router.replace(EPagePath.RECENT)
        }
      } else {
        // 未拿到且code为20005（未登录）则定向到login
        if (res.code === 20005 && router.pathname !== EPagePath.LOGIN) {
          router.replace(EPagePath.LOGIN)
        }
      }
    } catch (error) {}
  }, [router, setUserValue])

  const setUser = useCallback(
    async (params: Pick<IGetUserInfoResp, 'nickname'>) => {
      try {
        const setRes = await setUserInfo(params)
        if (check(setRes)) {
          const getRes = await getUserInfo()
          Toast.show({
            content: '修改成功',
            icon: 'success',
          })
          if (checkWithData(getRes)) {
            setUserValue(getRes.data as IGetUserInfoResp)
            return true
          } else return false
        } else return false
      } catch (error) {
        return false
      }
    },
    [setUserValue]
  )

  const changeUserPwd = useCallback(async (params: IChangePwd) => {
    try {
      const res = await changePwd(params)
      if (check(res)) {
        Toast.show({
          content: '修改成功',
          icon: 'success',
        })
        return true
      } else return false
    } catch (error) {
      return false
    }
  }, [])

  return { userValue, setUserValue, getUser, setUser, changeUserPwd }
}
