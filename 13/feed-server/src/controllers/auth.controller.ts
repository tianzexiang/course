import Router from 'koa-router'
import { Context } from 'koa'
import { JsonResp } from '../libs/response'
import Joi from 'joi'
import { validator } from '../libs/validate'
import { EAuthApi } from '../enums/api'
import { IRegister, IWxLogin } from '../interfaces/request/auth'
import {
  getAccessToken,
  getUserInfoByWx,
  getWxAuthUrl
} from '../services/wx.service'
import {
  createUser,
  isRegistered,
  login,
  logout
} from '../services/user.service'
import { STS } from 'ali-oss'
import 'dotenv/config'

// schema
const schemaDefiners = {
  [EAuthApi.WxLogin]: Joi.object<IWxLogin>({
    code: Joi.string(),
    openId: Joi.string()
  }),
  [EAuthApi.Register]: Joi.object<IRegister>({
    userId: Joi.string()
      .pattern(/^@[a-zA-Z0-9_ \u4e00-\u9fa5]*/)
      .min(2)
      .max(16)
      .required(),
    avatar: Joi.string().required(),
    nickname: Joi.string().required(),
    openId: Joi.string().required()
  })
}

// auth router
export const authRouter = new Router({
  prefix: EAuthApi.Prefix
})

authRouter.get(EAuthApi.WxAuth, async (ctx: Context) => {
  const url = getWxAuthUrl()
  ctx.body = new JsonResp({ url })
})

authRouter.post(EAuthApi.WxLogin, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EAuthApi.WxLogin])
  const { code = '', openId = '' } = ctx.request.body as IWxLogin
  const { openid = '', access_token = '' } = code
    ? await getAccessToken(code)
    : {}

  // 使用openid或请求openid
  const _openId = openId || openid
  const res = await isRegistered(_openId)
  if (res) {
    const { sid } = await login(_openId, ctx.ip)
    ctx.cookies.set('token', sid, {
      httpOnly: true,
      maxAge: 1000 * 3600 * 24 * 14
    })
    ctx.body = new JsonResp({ isRegistered: true })
  } else {
    const wxUserInfo = await getUserInfoByWx(_openId, access_token)
    ctx.body = new JsonResp({
      isRegistered: false,
      nickname: wxUserInfo.nickname,
      avatar: wxUserInfo.headimgurl,
      openId: _openId
    })
  }
})

authRouter.post(EAuthApi.Register, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EAuthApi.Register])
  const res = await createUser(ctx.request.body as IRegister)
  ctx.body = new JsonResp(res)
})

authRouter.post(EAuthApi.Logout, async (ctx: Context) => {
  // delete session
  await logout(ctx.cookies.get('token'))
  // set cookie
  ctx.cookies.set('token', null)
  ctx.body = new JsonResp()
})

authRouter.get(EAuthApi.STS, async (ctx) => {
  const sts = new STS({
    accessKeyId: process.env.ALI_OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_OSS_ACCESS_KEY_SECRET
  })
  // roleArn填写角色ARN。
  // policy填写自定义权限策略。
  // expiration用于设置临时访问凭证有效时间单位为秒，最小值为900，最大值以当前角色设定的最大会话时间为准。
  // sessionName用于自定义角色会话名称，用来区分不同的令牌，例如填写为SessionTest。
  await sts
    .assumeRole(
      process.env.ALI_OSS_ROLE_ARN,
      {
        Version: '1',
        Statement: [
          {
            Effect: 'Allow',
            Action: ['oss:PutObject'],
            Resource: ['acs:oss:*:*:feed13/*']
          }
        ]
      },
      3600,
      'username'
    )
    .then((result) => {
      ctx.header['Access-Control-Allow-ORIGIN'] = '*'
      ctx.header['Access-Control-Allow-METHOD'] = 'GET'
      ctx.body = new JsonResp({
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
        Expiration: result.credentials.Expiration
      })
    })
    .catch((err) => {
      console.log('err:', err)
    })
})
