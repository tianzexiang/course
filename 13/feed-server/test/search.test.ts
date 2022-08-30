import { ESearchApi } from './../src/enums/api'
import { IResp } from '../src/interfaces/response'
import { EHttpStatusCode, EServiceRespCode } from '../src/enums/status'
import { getEncodeURL, httpGet } from './utils'
import { ISearchUserResp } from '../src/interfaces/response/search'
import { IPostItemResp } from '../src/interfaces/response/post'

describe('搜索模块', () => {
  const cookie = 'token=6fec6d47-87e0-4aea-890c-583edd66a1a7'
  const keyword = '测试'
  let next = ''
  test('搜索文章', async () => {
    const res = await httpGet<IResp<IPostItemResp>>(
      ESearchApi.Prefix +
      ESearchApi.Post + `?keyword=${getEncodeURL(keyword)}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.items.length).toBeGreaterThan(0)
    next = res.data?.items[res.data?.items.length - 2]._id || ''
  })

  test('搜索第二批文章', async () => {
    const res = await httpGet<IResp<IPostItemResp>>(
      ESearchApi.Prefix +
      ESearchApi.Post + `?keyword=${getEncodeURL(keyword)}&next=${next}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.items.length).toBeGreaterThan(0)
  })

  test('搜索图片帖子', async () => {
    const res = await httpGet<IResp<IPostItemResp>>(
      ESearchApi.Prefix +
      ESearchApi.Img + `?keyword=${getEncodeURL(keyword)}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('搜索用户', async () => {
    const res = await httpGet<IResp<ISearchUserResp>>(
      ESearchApi.Prefix +
      ESearchApi.User + `?keyword=${getEncodeURL(keyword)}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.items.length).toBeGreaterThan(0)
  })
})
