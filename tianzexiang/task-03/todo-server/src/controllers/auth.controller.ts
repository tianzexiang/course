import Router from 'koa-router'
import { Context } from 'koa'
import { createUser, login, logout } from '../services/user.service'
import { JsonResp } from '../libs/response'
import { IRegister, ILogin } from '../interfaces/request'
import Joi from 'joi'
import validator from '../libs/validate'
import { EAuthApi } from '../enums/api'

// schema
const schemaDefiners = {
  [EAuthApi.Register]: Joi.object<IRegister>({
    username: Joi.string().alphanum().min(6).max(20).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
      .required(),
    nickname: Joi.string().min(3).max(20).required(),
  }),
  [EAuthApi.Login]: Joi.object<ILogin>({
    username: Joi.string().alphanum().min(6).max(20).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
      .required(),
  }),
}

// auth router
export const authRouter = new Router({
  prefix: EAuthApi.Prefix,
})

authRouter.post(EAuthApi.Register, async (ctx: Context) => {
  // validate the body
  validator(ctx.request.body, schemaDefiners[EAuthApi.Register])
  const user = ctx.request.body as IRegister
  const userId = await createUser(user)
  ctx.body = new JsonResp(undefined, undefined, { userId })
})

authRouter.post(EAuthApi.Login, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EAuthApi.Login])
  const loginInfo = ctx.request.body as ILogin
  // login and set session
  const token = await login(loginInfo, ctx.ip)
  // set cookie
  ctx.cookies.set('token', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 * 14 })
  ctx.body = new JsonResp()
})

authRouter.post(EAuthApi.Logout, async (ctx: Context) => {
  // delete session
  await logout(ctx.cookies.get('token')) 
  // set cookie
  ctx.cookies.set('token', null)
  ctx.body = new JsonResp()
})
