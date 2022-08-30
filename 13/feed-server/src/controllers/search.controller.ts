import Joi from 'joi'
import Router from 'koa-router'
import { ESearchApi } from '../enums/api'
import { Context } from 'koa'
import { validator } from '../libs/validate'
import { ISearch } from '../interfaces/request/search'
import { JsonResp } from '../libs/response'
import {
  searchImgs,
  searchPosts,
  searchUsers
} from '../services/search.service'

// search router
export const searchRouter = new Router({
  prefix: ESearchApi.Prefix
})

// 验证规则
const schemaDefiners = {
  [ESearchApi.Post]: Joi.object<ISearch>({
    keyword: Joi.string().required(),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().min(1).max(20).default(10)
  }),
  [ESearchApi.Img]: Joi.object<ISearch>({
    keyword: Joi.string().required(),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().min(1).max(20).default(10)
  }),
  [ESearchApi.User]: Joi.object<ISearch>({
    keyword: Joi.string().required(),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().min(1).max(20).default(10)
  })
}

/**
 * @description 搜索
 */
searchRouter.get(ESearchApi.Post, async (ctx: Context) => {
  validator(ctx.request.query, schemaDefiners[ESearchApi.Post])
  const { keyword, limit = 10, next = '' } = ctx.request.query as unknown as ISearch
  const params = {
    keyword: String(keyword),
    next,
    limit: Number(limit)
  }
  const res = await searchPosts(params)
  ctx.body = new JsonResp(res)
})

/**
 * @description 搜索图片
 */
searchRouter.get(ESearchApi.Img, async (ctx: Context) => {
  validator(ctx.request.query, schemaDefiners[ESearchApi.Img])
  const { keyword, limit = 10, next = '' } = ctx.request.query as unknown as ISearch
  const params = {
    keyword: String(keyword),
    next,
    limit: Number(limit)
  }
  const res = await searchImgs(params)
  ctx.body = new JsonResp(res)
})

/**
 * @description 搜索用户
 */
searchRouter.get(ESearchApi.User, async (ctx: Context) => {
  validator(ctx.request.query, schemaDefiners[ESearchApi.User])
  const { keyword, limit = 10, next = '' } = ctx.request.query as unknown as ISearch
  const params = {
    keyword: String(keyword),
    next,
    limit: Number(limit)
  }
  const res = await searchUsers(params, ctx.cookies.get('token'))
  ctx.body = new JsonResp(res)
})
