import { IArticle } from '@/interfaces/article'
import * as request from '@/utils/http/fetch'

interface BaseRes {
  stat: string
}

interface ListRes extends BaseRes {
  rows: IArticle[]
}

interface DetailRes extends BaseRes {
  data: IArticle
}

enum Api {
  posts = '/api/article/posts',
  news = '/api/article/news',
  detail = '/api/article/detail'
}

// 请求好文精选文章列表
export function getPosts() {
  return request.get<ListRes>(Api.posts)
}

// 请求热门资讯文章列表
export function getNews() {
  return request.get<ListRes>(Api.news)
}

// 请求文章详情
export function getDetail(id: string) {
  return request.get<DetailRes>(Api.detail + `?id=${id}`)
}