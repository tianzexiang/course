import { IStarParams } from '@/interfaces/request'
import { IBasicProblemRes, IIdRes, IProblemRes, IRes, IStarProblemRes } from '@/interfaces/response'
import { httpGet, httpPost } from '@/utils/http/axios'

enum Api {
  ListType = '/problem/listType',
  ListBasic = '/problem/listBasic',
  ListStar = '/problem/listStar',
  Star = '/problem/star',
  CancelStar ='/problem/cancelStar'
}

// 获取所有问题类型
export function getProblemTypeList () {
  return httpGet<IProblemRes>(Api.ListType)
}

// 获取所有基础问题
export function getBasicProblemList () {
  return httpGet<IBasicProblemRes>(Api.ListBasic)
}

// 获取所有标星问题
export function getStarProblemList () {
  return httpPost<IStarProblemRes>(Api.ListStar)
}

// 问题标星
export function starProblem (params: IStarParams) {
  return httpPost<IIdRes>(Api.Star, params)
}

// 取消问题标星
export function cancelStarProblem (id: string) {
  return httpPost<IRes>(Api.CancelStar, { id: id })
}
