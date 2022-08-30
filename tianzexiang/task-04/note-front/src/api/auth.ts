import { EAuthApi } from '@/enums/api'
import { ILogin, IRegister } from '@/interfaces/request'
import { IResp } from '@/interfaces/response'
import * as request from '@/utils/http/axios'
import { AxiosRequestHeaders } from 'axios'

export async function login(body: ILogin, headers?: AxiosRequestHeaders) {
  return request.httpPost<IResp>(
    EAuthApi.Prefix + EAuthApi.Login,
    body,
    headers
  )
}

export async function logout(headers?: AxiosRequestHeaders) {
  return request.httpPost<IResp>(EAuthApi.Prefix + EAuthApi.Logout, headers)
}

export async function register(body: IRegister, headers?: AxiosRequestHeaders) {
  return request.httpPost<IResp>(
    EAuthApi.Prefix + EAuthApi.Register,
    body,
    headers
  )
}
