import { httpGet, httpPost } from '@/utils/http/axios'
import { ICreateFormParams, IInputParams, IListParams } from '@/interfaces/request'
import { IFormDetailRes, IFormListRes, IFormResultRes, IIdRes, IRes, ISingleFormRes } from '@/interfaces/response'

enum Api {
  List = '/form/list',
  Create = '/form/create',
  Get = '/form/get',
  Delete = '/form/delete',
  Star = '/form/star',
  CancelStar = '/form/cancelStar',
  Input = '/form/input',
  FormResult = '/form/formResult',
  Detail = '/form/detail',
  Start = '/form/start',
  End = '/form/end'
}

// 获取所有表单
export function getFormList (params: IListParams) {
  return httpPost<IFormListRes>(Api.List, params)
}

// 创建表单
export function createForm (params: ICreateFormParams) {
  return httpPost<IIdRes>(Api.Create, params)
}

// 获取单个表单
export function getForm (userId: string) {
  return httpPost<ISingleFormRes>(Api.Get, { id: userId })
}

// 删除表单
export function deleteForm (formId: string) {
  return httpPost<IRes>(Api.Delete, { id: formId })
}

// 表单标星
export function starForm (formId: string) {
  return httpPost<IRes>(Api.Star, { id: formId })
}

// 取消表单标星
export function cancelStarForm (formId: string) {
  return httpPost<IRes>(Api.CancelStar, { id: formId })
}

// 填写表单
export function inputForm (params: IInputParams) {
  return httpPost<IRes>(Api.Input, params)
}

// 获取表单结果
export function getFormResult (formId: string) {
  return httpGet<IFormResultRes>(`${Api.FormResult}/${formId}`)
}

// 获取单个表单结果
export function getDetail (formResultId: string) {
  return httpPost<IFormDetailRes>(`${Api.Detail}/${formResultId}`)
}

// 开始收集表单
export function startForm (formId: string) {
  return httpPost<IRes>(Api.Start, { id: formId })
}

// 取消收集表单
export function endForm (formId: string) {
  return httpPost<IRes>(Api.End, { id: formId })
}
