import Router from 'koa-router'
import { Context } from 'koa'
import { JsonResp } from '../libs/response'
import Joi from 'joi'
import { validator } from '../libs/validate'
import { EUserApi } from '../enums/api'
import {
  followUser,
  getFollowUserInfo,
  getSubscribeUserInfo,
  getUserHomeLikes,
  getUserHomePhotoPosts,
  getUserHomePosts,
  getUserInfo,
  setUserInfo,
  unfollowUser
} from '../services/user.service'
import {
  IGetFollows,
  IGetImgPost,
  IGetLikePost,
  IGetPost,
  IGetSubscribes,
  IGetUserInfo,
  ISetUserInfo,
  IFollowUser,
  IUnfollowUser
} from '../interfaces/request/user'

// schema
const schemaDefiners = {
  [EUserApi.GetInfo]: Joi.object<IGetUserInfo>({
    id: Joi.string().allow('')
  }),
  [EUserApi.SetInfo]: Joi.object<ISetUserInfo>({
    nickname: Joi.string()
      .pattern(/[a-zA-Z0-9_ \u4e00-\u9fa5]*/)
      .min(2)
      .max(16),
    avatar: Joi.string().allow(''),
    bio: Joi.string().max(100).allow(''),
    banner: Joi.string().allow('')
  }),
  [EUserApi.Follow]: Joi.object<IFollowUser>({
    id: Joi.string().required()
  }),
  [EUserApi.Unfollow]: Joi.object<IUnfollowUser>({
    id: Joi.string().required()
  }),
  [EUserApi.GetFollows]: Joi.object<IGetFollows>({
    id: Joi.string().allow(''),
    prev: Joi.string().allow(''),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().required()
  }),
  [EUserApi.GetSubscribes]: Joi.object<IGetSubscribes>({
    id: Joi.string().allow(''),
    prev: Joi.string().allow(''),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().required()
  }),
  [EUserApi.GetPost]: Joi.object<IGetPost>({
    id: Joi.string().allow(''),
    prev: Joi.string().allow(''),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().required()
  }),
  [EUserApi.GetImgPost]: Joi.object<IGetImgPost>({
    id: Joi.string().allow(''),
    prev: Joi.string().allow(''),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().required()
  }),
  [EUserApi.GetLikePost]: Joi.object<IGetLikePost>({
    id: Joi.string().allow(''),
    prev: Joi.string().allow(''),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().required()
  })
}

// user router
export const userRouter = new Router({
  prefix: EUserApi.Prefix
})

userRouter.get(
  [EUserApi.GetInfo, EUserApi.GetOthersInfo],
  async (ctx: Context) => {
    const { id = undefined } = ctx.params as IGetUserInfo
    validator({ id }, schemaDefiners[EUserApi.GetInfo])
    const res = await getUserInfo(ctx.cookies.get('token'), id)
    ctx.body = new JsonResp(res)
  }
)

userRouter.post(EUserApi.SetInfo, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EUserApi.SetInfo])
  const res = await setUserInfo(ctx.cookies.get('token'), ctx.request.body)
  ctx.body = new JsonResp(res)
})

userRouter.post(EUserApi.Follow, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EUserApi.Follow])
  await followUser(ctx.cookies.get('token'), ctx.request.body)
  ctx.body = new JsonResp()
})

userRouter.post(EUserApi.Unfollow, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EUserApi.Unfollow])
  await unfollowUser(ctx.cookies.get('token'), ctx.request.body)
  ctx.body = new JsonResp()
})

userRouter.get(
  [EUserApi.GetFollows, EUserApi.GetOthersFollows],
  async (ctx: Context) => {
    validator(
      { ...ctx.params, ...ctx.query },
      schemaDefiners[EUserApi.GetFollows]
    )
    const { id = undefined } = ctx.params
    const pagination = ctx.query as unknown as IGetFollows
    const res = await getFollowUserInfo(
      ctx.cookies.get('token'),
      {
        ...pagination,
        limit: Number(pagination.limit)
      },
      id
    )
    ctx.body = new JsonResp(res)
  }
)

userRouter.get(
  [EUserApi.GetSubscribes, EUserApi.GetOthersSubscribes],
  async (ctx: Context) => {
    validator(
      { ...ctx.params, ...ctx.query },
      schemaDefiners[EUserApi.GetFollows]
    )
    const { id = undefined } = ctx.params
    const pagination = ctx.query as unknown as IGetSubscribes
    const res = await getSubscribeUserInfo(
      ctx.cookies.get('token'),
      {
        ...pagination,
        limit: Number(pagination.limit)
      },
      id
    )
    ctx.body = new JsonResp(res)
  }
)

userRouter.get(
  [EUserApi.GetPost, EUserApi.GetOthersPost],
  async (ctx: Context) => {
    validator(
      { ...ctx.params, ...ctx.query },
      schemaDefiners[EUserApi.GetFollows]
    )
    const { id = undefined } = ctx.params
    const pagination = ctx.query as unknown as IGetPost
    const res = await getUserHomePosts(
      ctx.cookies.get('token'),
      {
        ...pagination,
        limit: Number(pagination.limit)
      },
      id
    )
    ctx.body = new JsonResp(res)
  }
)

userRouter.get(
  [EUserApi.GetImgPost, EUserApi.GetOthersImgPost],
  async (ctx: Context) => {
    validator(
      { ...ctx.params, ...ctx.query },
      schemaDefiners[EUserApi.GetFollows]
    )
    const { id = undefined } = ctx.params
    const pagination = ctx.query as unknown as IGetImgPost
    const res = await getUserHomePhotoPosts(
      ctx.cookies.get('token'),
      {
        ...pagination,
        limit: Number(pagination.limit)
      },
      id
    )
    ctx.body = new JsonResp(res)
  }
)

userRouter.get(
  [EUserApi.GetLikePost, EUserApi.GetOthersLikePost],
  async (ctx: Context) => {
    validator(
      { ...ctx.params, ...ctx.query },
      schemaDefiners[EUserApi.GetFollows]
    )
    const { id = undefined } = ctx.params
    const pagination = ctx.query as unknown as IGetLikePost
    const res = await getUserHomeLikes(
      ctx.cookies.get('token'),
      {
        ...pagination,
        limit: Number(pagination.limit)
      },
      id
    )
    ctx.body = new JsonResp(res)
  }
)
