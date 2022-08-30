import { EAuthApi } from '../src/enums/api'
import { EHttpStatusCode, EServiceRespCode } from '../src/enums/status'
import { IResp } from '../src/interfaces/response'
import {
  httpGet,
  httpPost
} from './utils'

describe('权限模块测试', () => {
  const openId = 'ogeuN54_V7b53239svqAYRgE4Yvo'
  test('获取微信授权地址', async () => {
    const res = await httpGet<IResp>(EAuthApi.Prefix + EAuthApi.WxAuth)
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('使用微信openId登录', async () => {
    const res = await httpPost<IResp>(EAuthApi.Prefix + EAuthApi.WxLogin, { openId })
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('注册', async () => {
    const res = await httpPost<IResp>(EAuthApi.Prefix + EAuthApi.WxLogin, { openId })
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })
})
