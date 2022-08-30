import { Toast } from 'antd-mobile'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, logout, register } from '../api/auth'
import { EPagePath } from '../enums/pageEnum'
import { ILogin, IRegister } from '../interfaces/request'
import { check } from '../utils/checkHttpRes'

export function useAuth() {
  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (params: ILogin) => {
      try {
        const res = await login(params)
        if (check(res)) {
          navigate(EPagePath.TODO_TASK)
          return true
        } else {
          Toast.show({ content: res.msg || '登陆失败' })
          return false
        }
      } catch (error) {
        return false
      }
    },
    [navigate]
  )

  const handleLogout = useCallback(async () => {
    try {
      const res = await logout()
      if (check(res)) {
        Toast.show({
          content: '已退出',
          icon: 'success',
        })
        navigate('/')
        return true
      } else return false
    } catch (error) {
      return false
    }
  }, [navigate])

  const handleRegister = useCallback(async (params: IRegister) => {
    try {
      const res = await register(params)
      if (check(res)) {
        Toast.show({
          content: '注册成功',
          icon: 'success',
        })
        return true
      } else return false
    } catch (error) {
      return false
    }
  }, [])
  return { handleLogin, handleLogout, handleRegister }
}
