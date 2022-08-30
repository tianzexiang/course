import { httpPost } from '@/utils/http/axios'
import type { ILoginParams, IRegisterParams } from '@/interfaces/request'
import { IRes, IIdRes } from '@/interfaces/response'

enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  Register = '/auth/register'
}

// 登录
export function login (params: ILoginParams) {
  return httpPost<IRes>(Api.Login, params)
}

// 登出
export function logout () {
  return httpPost<IRes>(Api.Logout)
}

// 注册
export function register (params: IRegisterParams) {
  return httpPost<IIdRes>(Api.Register, params)
}
