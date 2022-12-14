import * as request from './request'
import { IArticle } from '@/interfaces/types'

interface BaseRes {
  stat: string
}

interface ListRes extends BaseRes {
  rows: IArticle[]
}

interface DetailRes extends BaseRes {
  data: IArticle
}

// 请求好文精选文章列表
export function posts () {
  return request.get<ListRes>('/api/article/posts')
}

// 请求热门资讯文章列表
export function news () {
  return request.get<ListRes>('/api/article/news')
}

// 请求文章详情
export function detail (id: string) {
  return request.get<DetailRes>('/api/article/detail?id=' + id)
}
