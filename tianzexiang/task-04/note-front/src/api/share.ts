import { EShareApi } from '@/enums/api'
import {
  ICreateShare,
  IDeleteShare,
  IGetSharedFileContent,
  IGetShareId,
  IPagination,
} from '@/interfaces/request'
import {
  ICreateShareResp,
  IGetShareIdResp,
  IGetShareResp,
  IResp,
} from '@/interfaces/response'
import { getURLSearchParams } from '@/utils/getURLSearchParams'
import * as request from '@/utils/http/axios'
import { AxiosRequestHeaders } from 'axios'

export async function getSharedFiles(
  { skip = 0, limit = 10 }: Partial<IPagination>,
  headers?: AxiosRequestHeaders
) {
  const query = getURLSearchParams({ limit: String(limit), skip: String(skip) })
  return request.httpGet<IResp<IGetShareResp>>(
    EShareApi.Prefix + EShareApi.Get + query,
    headers
  )
}

export async function getSharedFileContent(
  params: IGetSharedFileContent,
  headers?: AxiosRequestHeaders
) {
  const { shareId } = params
  return request.httpGet<IResp<IGetShareResp>>(
    EShareApi.Prefix + EShareApi.GetContent + '/' + shareId,
    headers
  )
}

export async function getShareId(
  params: IGetShareId,
  headers?: AxiosRequestHeaders
) {
  return request.httpPost<IResp<IGetShareIdResp>>(
    EShareApi.Prefix + EShareApi.GetShareId,
    params,
    headers
  )
}

export async function createSharedFile(
  body: ICreateShare,
  headers?: AxiosRequestHeaders
) {
  return request.httpPost<IResp<ICreateShareResp>>(
    EShareApi.Prefix + EShareApi.Create,
    body,
    headers
  )
}

export async function deleteSharedFile(
  body: IDeleteShare,
  headers?: AxiosRequestHeaders
) {
  return request.httpPost<IResp>(
    EShareApi.Prefix + EShareApi.Delete,
    body,
    headers
  )
}
