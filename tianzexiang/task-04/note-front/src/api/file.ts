import { EFolderFileApi } from '@/enums/api'
import {
  ICreateFolderOrFile,
  IDeleteFolderOrFile,
  IGetContent,
  IGetFoldAndFile,
  IGetFolderOrFileInfo,
  IPagination,
  ISaveFolderFile,
} from '@/interfaces/request'
import {
  ICreateFileResp,
  IGetFileContentResp,
  IGetFileResp,
  IResp,
} from '@/interfaces/response'
import * as request from '../utils/http/axios'
import { getURLSearchParams } from '@/utils/getURLSearchParams'
import { AxiosRequestHeaders } from 'axios'

export async function getRecentFiles(
  { skip = 0, limit = 10 }: Partial<IPagination>,
  headers?: AxiosRequestHeaders
) {
  const query = getURLSearchParams({ limit: String(limit), skip: String(skip) })
  return request.httpGet<IResp<IGetFileResp>>(
    EFolderFileApi.Prefix + EFolderFileApi.GetRecent + query,
    headers
  )
}

export async function getFolderFiles(
  { folderId = '', skip = 0, limit = 10 }: Partial<IGetFoldAndFile>,
  headers?: AxiosRequestHeaders
) {
  const query = getURLSearchParams({ limit: String(limit), skip: String(skip) })
  return request.httpGet<IResp<IGetFileResp>>(
    EFolderFileApi.Prefix + EFolderFileApi.Get + '/' + folderId + query,
    headers
  )
}

export async function getFileContent(
  params: IGetContent,
  headers?: AxiosRequestHeaders
) {
  const { fileId } = params
  return request.httpGet<IResp<IGetFileContentResp>>(
    EFolderFileApi.Prefix + EFolderFileApi.GetContent + '/' + fileId,
    headers
  )
}

export async function getFolderOrFileInfo(
  params: IGetFolderOrFileInfo,
  headers?: AxiosRequestHeaders
) {
  return request.httpPost<IResp<IGetFileContentResp>>(
    EFolderFileApi.Prefix + EFolderFileApi.GetInfo,
    params,
    headers
  )
}

export async function createFolderOrFile(
  body: ICreateFolderOrFile,
  headers?: AxiosRequestHeaders
) {
  return request.httpPost<IResp<ICreateFileResp>>(
    EFolderFileApi.Prefix + EFolderFileApi.Create,
    body,
    headers
  )
}

export async function saveFile(body: ISaveFolderFile, headers?: AxiosRequestHeaders) {
  return request.httpPost<IResp>(
    EFolderFileApi.Prefix + EFolderFileApi.Save,
    body,
    headers
  )
}

export async function deleteFolderOrFile(
  body: IDeleteFolderOrFile,
  headers?: AxiosRequestHeaders
) {
  return request.httpPost<IResp>(
    EFolderFileApi.Prefix + EFolderFileApi.Delete,
    body,
    headers
  )
}
