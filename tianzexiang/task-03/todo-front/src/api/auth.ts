import { EAuthApi } from '../enums/api'
import { ILogin, IRegister } from '../interfaces/request'
import { IResp } from '../interfaces/response'
import * as request from '../utils/http/axios'

export async function login(body: ILogin) {
  return request.httpPost<IResp>(EAuthApi.Login, body)
}

export async function logout() {
  return request.httpPost<IResp>(EAuthApi.Logout)
}

export async function register(body: IRegister) {
  return request.httpPost<IResp>(EAuthApi.Register, body)
}
