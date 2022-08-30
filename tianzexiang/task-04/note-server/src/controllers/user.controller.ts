import Router from 'koa-router'
import { Context } from 'koa'
import { changePwd, getUserInfo, setUserInfo } from '../services/user.service'
import { JsonResp } from '../libs/response'
import { IChangePwd, ISetUserInfo } from '../interfaces/request'
import Joi from 'joi'
import validator from '../libs/validate'
import { EUserApi } from '../enums/api'

// schema
const schemaDefiners = {
  [EUserApi.ChangePwd]: Joi.object<IChangePwd>({
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
      .required(),
    old_password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
      .required(),
  }),
  [EUserApi.SetInfo]: Joi.object<ISetUserInfo>({
    nickname: Joi.string().min(3).max(30).required(),
  }),
}

// user router
export const userRouter = new Router({
  prefix: EUserApi.Prefix,
})

userRouter.post(EUserApi.ChangePwd, async (ctx: Context) => {
  // validate the body
  validator(ctx.request.body, schemaDefiners[EUserApi.ChangePwd])
  const { password, old_password } = ctx.request.body as IChangePwd
  await changePwd(ctx.cookies.get('token'), password, old_password)
  ctx.body = new JsonResp()
})

userRouter.get(EUserApi.GetInfo, async (ctx: Context) => {
  const user = await getUserInfo(ctx.cookies.get('token'))
  ctx.body = new JsonResp(undefined, undefined, user)
})

userRouter.post(EUserApi.SetInfo, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EUserApi.SetInfo])
  const { nickname } = ctx.request.body as ISetUserInfo
  await setUserInfo(ctx.cookies.get('token'), nickname)
  ctx.body = new JsonResp()
})
