import { Toast } from 'antd-mobile'
import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, setUserInfo, changePwd } from '../api/user'
import { EPagePath } from '../enums/pageEnum'
import { IChangePwd } from '../interfaces/request'
import { IGetUserInfoResp } from '../interfaces/response'
import { context } from '../store'
import { check, checkWithData } from '../utils/checkHttpRes'
import { useCurrentPage } from './useCurrentPage'

export function useUserInfo() {
  const navigate = useNavigate()
  const { userValue, setUserValue } = useContext(context)
  const { currPagePath } = useCurrentPage()

  const getUser = useCallback(async () => {
    try {
      const res = await getUserInfo()
      if (checkWithData(res)) {
        // 拿到用户信息说明登录
        setUserValue(res.data as IGetUserInfoResp)
        // 如果当前处于login页面则直接跳转主页
        if (currPagePath === EPagePath.LOGIN) {
          navigate(EPagePath.TODO_TASK)
        }
      } else {
        // 未拿到且code为20005（未登录）则定向到login
        if (res.code === 20005 && currPagePath !== EPagePath.LOGIN) {
          navigate(EPagePath.LOGIN)
        }
      }
    } catch (error) {}
  }, [currPagePath, navigate, setUserValue])

  const setUser = useCallback(
    async (params: Pick<IGetUserInfoResp, 'nickname'>) => {
      try {
        const setRes = await setUserInfo(params)
        if (check(setRes)) {
          Toast.show({
            content: '修改成功',
            icon: 'success',
          })
          const getRes = await getUserInfo()
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
