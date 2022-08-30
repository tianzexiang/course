import * as request from '../libs/http/axios'
import { check } from '../middlewares/check'
import { wxErrorStat } from '../libs/stat/wx'

export interface IWxAccessToken {
  access_token: string
  expires_in: number
  refresh_token: string
  openid: string
  scope: string
  errcode?: string
  errmsg?: string
}

export interface IWxUserInfo {
  openid: string
  nickname: string
  sex: number
  province: string
  city: string
  country: string
  headimgurl: string
  privilege: string[]
  unionid: string
  errcode?: string
  errmsg?: string
}

/**
 * @description 得到微信userInfo
 * @param  openId: string 微信用户openId
 * @param accessToken: string 临时访问凭证
 * @return IWxUserInfo
 */
export async function getUserInfoByWx (openId: string, accessToken: string) {
  const res = await request.httpGet<IWxUserInfo>(
    `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}`
  )
  check(!res.errmsg, wxErrorStat.ERR_WX_LOGIN_ERROR(res.errmsg || '微信请求出错'))
  return res
}

/**
 * @description 得到微信accessToken
 * @param  code: string 临时获取accessToken 编码
 * @return IWxAccessToken
 */
export async function getAccessToken (code: string) {
  const res = await request.httpGet<IWxAccessToken>(
    `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APP_ID}&secret=${process.env.APP_SECRET}&code=${code}&grant_type=authorization_code`
  )
  check(!res.errmsg, wxErrorStat.ERR_WX_LOGIN_ERROR(res.errmsg || '微信请求出错'))
  return res
}

/**
 * @description 得到微信授权url
 * @return string
 */
export function getWxAuthUrl () {
  const res = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
    process.env.APP_ID
  }&redirect_uri=${encodeURIComponent(
    process.env.REDIRECT_URI
  )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  return res
}
