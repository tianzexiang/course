import { EUserApi } from '../src/enums/api'
import { EHttpStatusCode, EServiceRespCode } from '../src/enums/status'
import { IResp } from '../src/interfaces/response'
import {
  IUserFollowResp,
  IUserSubscribeResp
} from '../src/interfaces/response/user'
import {
  getEncodeURLUserId,
  getURLSearchParams,
  httpGet,
  httpPost
} from './utils'

describe('用户模块测试', () => {
  const userId = '@贺山' // 其他人的用户id
  const cookie = 'token=598b499c-bcff-4799-b2b7-348f19664a4d'

  test('得到登录用户信息', async () => {
    const res = await httpGet<IResp>(EUserApi.Prefix + EUserApi.GetInfo, {
      cookie
    })
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('得到其他用户信息', async () => {
    const res = await httpGet<IResp>(
      EUserApi.Prefix + EUserApi.GetInfo + '/' + getEncodeURLUserId(userId),
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('设置用户信息', async () => {
    const body = {
      nickname: 'test',
      bio: 'test',
      banner: '',
      avatar: ''
    }
    const res = await httpPost<IResp>(
      EUserApi.Prefix + EUserApi.SetInfo,
      body,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('关注用户', async () => {
    const res = await httpPost<IResp>(
      EUserApi.Prefix + EUserApi.Follow,
      {
        id: '@' + userId
      },
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('取关用户', async () => {
    const res = await httpPost<IResp>(
      EUserApi.Prefix + EUserApi.Unfollow,
      {
        id: '@' + userId
      },
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('得到登录用户我的关注', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserFollowResp>>(
      EUserApi.Prefix + EUserApi.GetFollows + '/' + query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })

  test('得到登录用户关注我的', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserSubscribeResp>>(
      EUserApi.Prefix + EUserApi.GetSubscribes + '/' + query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })

  test('得到其他用户我的关注', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserFollowResp>>(
      EUserApi.Prefix +
        EUserApi.GetFollows +
        '/' +
        getEncodeURLUserId(userId) +
        '/' +
        query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })

  test('得到其他用户关注我的', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserSubscribeResp>>(
      EUserApi.Prefix +
        EUserApi.GetSubscribes +
        '/' +
        getEncodeURLUserId(userId) +
        '/' +
        query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })

  test('得到登录用户个人中心我的帖子', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserSubscribeResp>>(
      EUserApi.Prefix + EUserApi.GetPost + '/' + query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })

  test('得到登录用户个人中心我的带图片帖子', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserSubscribeResp>>(
      EUserApi.Prefix + EUserApi.GetImgPost + '/' + query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })

  test('得到登录用户个人中心我的喜欢', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserSubscribeResp>>(
      EUserApi.Prefix + EUserApi.GetLikePost + '/' + query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })

  test('得到其他用户个人中心我的帖子', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserSubscribeResp>>(
      EUserApi.Prefix +
        EUserApi.GetPost +
        '/' +
        getEncodeURLUserId(userId) +
        '/' +
        query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })

  test('得到其他用户个人中心我的带图片帖子', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserSubscribeResp>>(
      EUserApi.Prefix +
        EUserApi.GetImgPost +
        '/' +
        getEncodeURLUserId(userId) +
        '/' +
        query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })

  test('得到其他用户个人中心我的喜欢', async () => {
    const query = getURLSearchParams({
      limit: '5'
    })
    const res = await httpGet<IResp<IUserSubscribeResp>>(
      EUserApi.Prefix +
        EUserApi.GetLikePost +
        '/' +
        getEncodeURLUserId(userId) +
        '/' +
        query,
      { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data.items.length).toBeGreaterThanOrEqual(0)
  })
})
