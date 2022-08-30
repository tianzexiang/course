import { EUserApi } from '@/enums/api'
import { IChangePwd, ISetUserInfo } from '@/interfaces/request'
import { IGetUserInfoResp, IResp } from '@/interfaces/response'
import { AxiosRequestHeaders } from 'axios'
import * as request from '../utils/http/axios'

export async function getUserInfo(headers?: AxiosRequestHeaders) {
  return request.httpGet<IResp<IGetUserInfoResp>>(
    EUserApi.Prefix + EUserApi.GetInfo,
    headers
  )
}

export async function setUserInfo(
  body: ISetUserInfo,
  headers?: AxiosRequestHeaders
) {
  return request.httpPost<IResp>(
    EUserApi.Prefix + EUserApi.SetInfo,
    body,
    headers
  )
}

export async function changePwd(
  body: IChangePwd,
  headers?: AxiosRequestHeaders
) {
  return request.httpPost<IResp>(
    EUserApi.Prefix + EUserApi.ChangePwd,
    body,
    headers
  )
}
