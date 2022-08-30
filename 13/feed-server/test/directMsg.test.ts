
import { EMsgType } from './../src/enums/model'
import { EDirectMsgApi, EPostApi } from './../src/enums/api'
import { IResp } from '../src/interfaces/response'
import { EHttpStatusCode, EServiceRespCode } from '../src/enums/status'
import { IResChatItem, IResDirectMsg, IResNewDirectMsg, IResUnreadCount } from '../src/interfaces/response/message'
import { httpGet, httpPost } from './utils'

describe('私信模块', () => {
  const userId = encodeURI('@贺山')
  const cookie = 'token=ed8c5d64-3189-4c5b-acad-2215dcc8d977'
  let msgId = ''
  test('获取私信列表', async () => {
    const res = await httpGet<IResp<IResChatItem>>(
      EDirectMsgApi.Prefix + EDirectMsgApi.GetChatItem + `?limit=${6}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.chatItem.length).toBeGreaterThanOrEqual(0)
  })

  test('创建一条私信', async () => {
    const res = await httpPost<IResp<string>>(
      EDirectMsgApi.Prefix + EDirectMsgApi.CreateDirectMsg,
      { friendId: userId, msgType: EMsgType.Common, content: '你好' }, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    msgId = res.data || ''
  })
  test('获取和某个用户的私信记录', async () => {
    const res = await httpGet<IResp<IResDirectMsg>>(
      EDirectMsgApi.Prefix + EDirectMsgApi.GetDirectMsg + `?id=${userId}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.msgList.length).toBeGreaterThanOrEqual(0)
    expect(res.data?.unReadCount).toBeGreaterThanOrEqual(0)
  })

  test('获取和某个用户的新消息', async () => {
    const res = await httpGet<IResp<IResNewDirectMsg>>(
      EDirectMsgApi.Prefix +
          EDirectMsgApi.getNewUnReadMsgWithOneFriend +
           `?id=${userId}`, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.unReadMsg.length).toBeGreaterThanOrEqual(0)
  })

  test('将和一名用户的私信全部设为已读', async () => {
    const res = await httpPost<IResp>(
      EDirectMsgApi.Prefix + EDirectMsgApi.SetMsgToRead,
      { id: userId }, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('获取未读消息数量', async () => {
    const res = await httpGet<IResp<IResUnreadCount>>(
      EDirectMsgApi.Prefix +
          EDirectMsgApi.GetUnreadCount + '?id=""', { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.unReadCount).toBeGreaterThanOrEqual(0)
  })

  test('将所有未读私信设为已读', async () => {
    const res = await httpPost<IResp>(
      EDirectMsgApi.Prefix + EDirectMsgApi.SetAllMsgToRead, {}, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('删除一条私信', async () => {
    const res = await httpPost<IResp>(
      EDirectMsgApi.Prefix + EDirectMsgApi.DeleteDirectMsg,
      { MsgId: msgId }, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })

  test('删除一个私信列表项', async () => {
    const res = await httpPost<IResp>(
      EDirectMsgApi.Prefix + EDirectMsgApi.DeleteChatItem,
      { id: userId }, { cookie })
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })
})
