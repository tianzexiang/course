import { IGetComments } from './../interfaces/request/post'
import { EPostApi } from '../enums/api'
import { JsonResp } from '../libs/response'
import { validator } from '../libs/validate'
import { Context } from 'koa'
import Router from 'koa-router'
import Joi from 'joi'
import 'dotenv/config'
import {
  cancelThumbsUp,
  createComment,
  createForward,
  createPost,
  delPost,
  getHomePosts,
  getDetail,
  thumbsUp,
  getDetailComments
} from '../services/post.service'
import {
  IPagination,
  IGetDetail,
  ICreate,
  IDelPost,
  IThumbsUp
} from '../interfaces/request/post'
// post router
export const postRouter = new Router({
  prefix: EPostApi.Prefix
})

// 验证规则
const schemaDefiners = {
  [EPostApi.GetFollowPost]: Joi.object<IPagination>({
    prev: Joi.string().hex().length(24).allow(''),
    next: Joi.string().hex().length(24).allow(''),
    limit: Joi.number().integer().min(5).max(20).default(10)
  }),
  [EPostApi.CreatePost]: Joi.object<ICreate>({
    content: Joi.string().max(280).required(),
    imgs: Joi.array().items(Joi.string())
  }),
  [EPostApi.CreateComment]: Joi.object<ICreate>({
    content: Joi.string().required(),
    imgs: Joi.array().items(Joi.string()),
    relationId: Joi.string().required()
  }),
  [EPostApi.GetPostDetail]: Joi.object<IGetDetail>({
    _id: Joi.string().required()
  }),
  [EPostApi.GetComments]: Joi.object<IGetComments>({
    _id: Joi.string().required(),
    prev: Joi.string().hex().length(24).allow(''),
    next: Joi.string().hex().length(24).allow(''),
    limit: Joi.number().integer().min(5).max(20).default(10)
  }),
  [EPostApi.ThumbsUp]: Joi.object<IDelPost>({
    _id: Joi.string().hex().length(24).required()
  }),
  [EPostApi.Delete]: Joi.object<IThumbsUp>({
    _id: Joi.string().hex().length(24).required()
  })
}

/**
 * @description 聚合查询关注的人的帖子，按时间排序
 * @param  prev?: string
 * @param  next?: string
 * @param  limit?: number
 * @returns { items , hasNext , hasPrev }
 */
postRouter.get(EPostApi.GetFollowPost, async (ctx: Context) => {
  validator(ctx.request.query, schemaDefiners[EPostApi.GetFollowPost])
  const options = ctx.request.query as unknown as IPagination
  const { prev, next, limit } = options
  const token = ctx.cookies.get('token')
  const items = await getHomePosts({ prev, next, limit, token })
  ctx.body = new JsonResp(items)
})

/**
 * @description 创建帖子
 */
postRouter.post(EPostApi.CreatePost, async (ctx: Context) => {
  // validate the body
  validator(ctx.request.body, schemaDefiners[EPostApi.CreatePost])
  const { content, imgs } = ctx.request.body
  const token = ctx.cookies.get('token')
  const res = await createPost({ content, imgs, token })
  ctx.body = new JsonResp(res)
})

/**
 * @description 创建评论
 */
postRouter.post(EPostApi.CreateComment, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EPostApi.CreateComment])
  const { content, imgs, relationId } = ctx.request.body
  const token = ctx.cookies.get('token')
  const res = await createComment({ content, imgs, relationId, token })
  ctx.body = new JsonResp(res)
})

/**
 * @description 创建转发
 */
postRouter.post(EPostApi.CreateForward, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EPostApi.CreateComment])
  const { content, imgs, relationId } = ctx.request.body
  const token = ctx.cookies.get('token')
  const res = await createForward({ content, imgs, relationId, token })
  ctx.body = new JsonResp(res)
})

/**
 * @description 获取帖子详情
 */
postRouter.get(EPostApi.GetPostDetail, async (ctx: Context) => {
  validator(ctx.query, schemaDefiners[EPostApi.GetPostDetail])
  const _id = String(ctx.query._id)
  const token = ctx.cookies.get('token')
  const data = await getDetail({ _id, token })
  ctx.body = new JsonResp(data)
})

/**
 * @description 获取帖子评论
 */
postRouter.get(EPostApi.GetComments, async (ctx: Context) => {
  validator(ctx.query, schemaDefiners[EPostApi.GetComments])
  const options = ctx.request.query as unknown as IGetComments
  const { prev, next, limit, _id } = options
  const token = ctx.cookies.get('token')
  const data = await getDetailComments({ _id, token, next, limit, prev })
  ctx.body = new JsonResp(data)
})

/**
 * @description 点赞帖子
 */
postRouter.post(EPostApi.ThumbsUp, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EPostApi.ThumbsUp])
  const { _id } = ctx.request.body
  const token = ctx.cookies.get('token')
  await thumbsUp({ _id, token })
  ctx.body = new JsonResp()
})

/**
 * @description 取消点赞帖子
 */
postRouter.post(EPostApi.CancelThumbsUp, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EPostApi.ThumbsUp])
  const { _id } = ctx.request.body
  const token = ctx.cookies.get('token')
  await cancelThumbsUp({ _id, token })
  ctx.body = new JsonResp()
})

/**
 * @description 删除帖子以及它的评论
 */
postRouter.post(EPostApi.Delete, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EPostApi.Delete])
  const { _id } = ctx.request.body
  await delPost({ _id })
  ctx.body = new JsonResp()
})
