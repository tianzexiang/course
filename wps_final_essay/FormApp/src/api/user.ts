import { IChangePwdParams, ISetInfoParams } from '@/interfaces/request'
import { IRes, IUserRes } from '@/interfaces/response'
import { httpPost, httpGet } from '@/utils/http/axios'

enum Api {
  GetInfo = '/user/getInfo',
  SetInfo = '/user/setInfo',
  ChangePwd = '/user/ChangePwd'
}

// 获取用户信息
export function getUserInfo () {
  return httpGet<IUserRes>(Api.GetInfo)
}

// 设置用户信息
export function setUserInfo (params: ISetInfoParams) {
  return httpPost<IRes>(Api.SetInfo, params)
}

// 修改用户密码
export function changePwd (params: IChangePwdParams) {
  return httpPost<IRes>(Api.ChangePwd, params)
}
