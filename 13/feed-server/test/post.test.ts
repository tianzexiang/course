import { EPostErrorCode } from './../src/enums/status'
import { EPostType } from './../src/enums/model'
import { ICreate } from './../src/interfaces/request/post'
import { EPostApi } from './../src/enums/api'
import { IResp } from '../src/interfaces/response'
import { EHttpStatusCode, EServiceRespCode } from '../src/enums/status'
import { IPostDetailResp, IPostItemResp } from '../src/interfaces/response/post'
import { httpGet, httpPost } from './utils'

describe('文章模块', () => {
  const cookie = 'token=6fec6d47-87e0-4aea-890c-583edd66a1a7'
  let next = ''
  let postId = ''
  let commentId = ''
  let forwardId = ''
  test('关注的文章列表', async () => {
    const res = await httpGet<IResp<IPostItemResp>>(
      EPostApi.Prefix +
          EPostApi.GetFollowPost, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.items.length).toBeGreaterThan(0)
    next = res.data?.items[res.data?.items.length - 1]._id || ''
  })

  test('第二波关注的文章列表', async () => {
    const res = await httpGet<IResp<IPostItemResp>>(
      EPostApi.Prefix +
          EPostApi.GetFollowPost + `?next=${next}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.items.length).toBeGreaterThan(0)
    next = res.data?.items[res.data?.items.length - 1]._id || ''
  })

  test('创建帖子', async () => {
    const data:ICreate = { content: '测试帖子', imgs: [] }
    const res = await httpPost<IResp<string>>(
      EPostApi.Prefix +
          EPostApi.CreatePost, data, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data).toBeTruthy()
    postId = res.data || ''
  })

  test('创建空帖子', async () => {
    const data:ICreate = { content: '', imgs: [] }
    const res = await httpPost<IResp<string>>(
      EPostApi.Prefix +
          EPostApi.CreatePost, data, { cookie }
    )
    expect(res.status).toBe(400)
    expect(res.code).toBe(10001)
    expect(res.msg).toBeTruthy()
  })

  test('创建超出字符限制帖子', async () => {
    const data:ICreate = { content: ''.padEnd(281, '123'), imgs: [] }
    const res = await httpPost<IResp<string>>(
      EPostApi.Prefix +
          EPostApi.CreatePost, data, { cookie }
    )
    expect(res.status).toBe(400)
    expect(res.code).toBe(10001)
    expect(res.msg).toBeTruthy()
  })

  test('创建评论', async () => {
    const data:ICreate = { content: '测试评论', imgs: [], relationId: postId }
    const res = await httpPost<IResp<string>>(
      EPostApi.Prefix +
          EPostApi.CreateComment, data, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data).toBeTruthy()
    commentId = res.data || ''
  })

  test('创建转发', async () => {
    const data:ICreate = { content: '测试转发', imgs: [], relationId: postId }
    const res = await httpPost<IResp<string>>(
      EPostApi.Prefix +
          EPostApi.CreateForward, data, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data).toBeTruthy()
    forwardId = res.data || ''
  })

  test('获取帖子详情', async () => {
    const res = await httpGet<IResp>(
      EPostApi.Prefix +
          EPostApi.GetPostDetail + `/?_id=${postId}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data).toBeTruthy()
  })

  test('获取不存在的帖子详情', async () => {
    const res = await httpGet<IResp>(
      EPostApi.Prefix +
          EPostApi.GetPostDetail + `/?_id=${postId + '2'}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.NOT_FOUND)
    expect(res.code).toBe(EPostErrorCode.ERR_POST_NOT_FOUND)
    expect(res.msg).toBeTruthy()
  })

  test('获取评论详情', async () => {
    const res = await httpGet<IResp>(
      EPostApi.Prefix +
          EPostApi.GetPostDetail + `/?_id=${commentId}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data).toBeTruthy()
  })

  test('获取转发详情', async () => {
    const res = await httpGet<IResp>(
      EPostApi.Prefix +
          EPostApi.GetPostDetail + `/?_id=${forwardId}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data).toBeTruthy()
  })

  test('点赞', async () => {
    const res = await httpPost<IResp>(
      EPostApi.Prefix +
          EPostApi.ThumbsUp, { _id: postId }, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('连续点赞', async () => {
    try {
      const res = await httpPost<IResp>(
        EPostApi.Prefix +
            EPostApi.ThumbsUp, { _id: postId }, { cookie }
      )
      expect(res.status).toBe(EHttpStatusCode.OK)
      expect(res.code).toBe(EPostErrorCode.ERR_POST_ALREADY_THUMBS_UP)
    } catch (err) {
      console.log(err)
    }
  })

  test('取消点赞', async () => {
    const res = await httpPost<IResp>(
      EPostApi.Prefix +
          EPostApi.CancelThumbsUp, { _id: postId }, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('删除帖子', async () => {
    const res = await httpPost<IResp>(
      EPostApi.Prefix +
          EPostApi.Delete, { _id: postId }, { cookie }
    )

    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('删除转发', async () => {
    const res = await httpPost<IResp>(
      EPostApi.Prefix +
          EPostApi.Delete, { _id: forwardId }, { cookie }
    )

    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('获取已删除的帖子详情', async () => {
    const post = await httpGet<IResp<IPostDetailResp>>(
      EPostApi.Prefix +
          EPostApi.GetPostDetail + `/?_id=${postId}`, { cookie }
    )
    expect(post.data?.post.type).toBe(EPostType.Delete)
    expect(post.data?.comments.length).toBe(0)
  })
})
