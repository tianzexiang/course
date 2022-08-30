import Router from 'koa-router'
import { Context } from 'koa'
import { JsonResp } from '../libs/response'
import {
  ICreateShare,
  IDeleteShare,
  IGetSharedFileContent,
  IGetShareId,
  IPagination,
} from '../interfaces/request'
import Joi from 'joi'
import validator from '../libs/validate'
import { EShareApi } from '../enums/api'
import {
  createShare,
  deleteShare,
  getShare,
  getSharedFileContent,
  getShareId,
  updateViews,
} from '../services/share.service'

// schema
const schemaDefiners = {
  [EShareApi.Get]: Joi.object<IPagination>({
    limit: Joi.number().integer().min(0).required(),
    skip: Joi.number().integer().min(0).required(),
  }),
  [EShareApi.GetShareId]: Joi.object<IGetShareId>({
    fileId: Joi.string().required(),
  }),
  [EShareApi.Create]: Joi.object<ICreateShare>({
    fileId: Joi.string().required(),
  }),
  [EShareApi.Delete]: Joi.object<IDeleteShare>({
    fileId: Joi.string().required(),
  }),
  [EShareApi.GetContent]: Joi.object<IGetSharedFileContent>({
    shareId: Joi.string().required(),
  }),
}

// user router
export const shareRouter = new Router({
  prefix: EShareApi.Prefix,
})

shareRouter.get(EShareApi.Get, async (ctx: Context) => {
  // validate
  validator(ctx.request.query, schemaDefiners[EShareApi.Get])
  const { skip, limit } = ctx.request.query as unknown as IPagination
  const res = await getShare(ctx.cookies.get('token'), {
    limit: Number(limit),
    skip: Number(skip),
  })
  ctx.body = new JsonResp(undefined, undefined, res)
})

shareRouter.post(EShareApi.Create, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EShareApi.Create])
  const { fileId } = ctx.request.body as ICreateShare
  const res = await createShare(ctx.cookies.get('token'), fileId)
  ctx.body = new JsonResp(undefined, undefined, res)
})

shareRouter.post(EShareApi.Delete, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EShareApi.Delete])
  const { fileId } = ctx.request.body as IDeleteShare
  await deleteShare(ctx.cookies.get('token'), fileId)
  ctx.body = new JsonResp()
})

shareRouter.get(EShareApi.GetContent, async (ctx: Context) => {
  validator(ctx.params, schemaDefiners[EShareApi.GetContent])
  const { shareId } = ctx.params as IGetSharedFileContent
  const res = await getSharedFileContent(shareId)
  if (!ctx.cookies.get('viewed')) {
    // if does not have this flag
    await updateViews(shareId)
    ctx.cookies.set('viewed', 'true', { httpOnly: true, maxAge: 3600 * 1000 })
  }
  ctx.body = new JsonResp(undefined, undefined, res)
})

shareRouter.post(EShareApi.GetShareId, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EShareApi.GetShareId])
  const { fileId } = ctx.request.body as IGetShareId
  const res = await getShareId(ctx.cookies.get('token'), fileId)
  ctx.body = new JsonResp(undefined, undefined, res)
})
