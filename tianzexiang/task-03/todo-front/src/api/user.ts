import { EUserApi } from '../enums/api'
import { IChangePwd, ISetUserInfo } from '../interfaces/request'
import { IGetUserInfoResp, IResp } from '../interfaces/response'
import * as request from '../utils/http/axios'

export async function getUserInfo() {
  return request.httpGet<IResp<IGetUserInfoResp>>(EUserApi.GetInfo)
}

export async function setUserInfo(body: ISetUserInfo) {
  return request.httpPost<IResp>(EUserApi.SetInfo, body)
}

export async function changePwd(body: IChangePwd) {
  return request.httpPost<IResp>(EUserApi.ChangePwd, body)
}
