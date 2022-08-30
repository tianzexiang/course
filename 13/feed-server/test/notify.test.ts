
import { IResp } from '../src/interfaces/response'
import { EHttpStatusCode, EServiceRespCode } from '../src/enums/status'
import { httpGet, httpPost } from './utils'
import { ENotifyApi } from '../src/enums/api'
import { IResINotifyItem, IUnReadNotify } from '../src/interfaces/response/notify'

describe('通知模块', () => {
  let next = ''
  let notifyId = ''
  // 测试的cookie是否需要放在配置文件里
  const cookie = 'token=43684730-d1ca-4740-af98-62a5868de033'
  test('获取通知列表', async () => {
    const res = await httpGet<IResp<IResINotifyItem>>(
      ENotifyApi.Prefix + ENotifyApi.Get, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.NotifyList.length).toBeGreaterThanOrEqual(0)
    if (res.data?.hasNext) {
      next = res.data?.NotifyList[res.data.NotifyList.length - 1]._id || ''
    }
    notifyId = res.data?.NotifyList[0]._id || ''
  })

  test('第二波通知列表', async () => {
    if (next) {
      const res = await httpGet<IResp<IResINotifyItem>>(
        ENotifyApi.Prefix + ENotifyApi.Get + `?next=${next}&limit=${6}`, { cookie }
      )
      expect(res.status).toBe(EHttpStatusCode.OK)
      expect(res.code).toBe(EServiceRespCode.OK)
      expect(res.data?.NotifyList.length).toBeGreaterThanOrEqual(0)
    }
  })

  test('切换通知已读/未读状态', async () => {
    const res = await httpPost<IResp>(
      ENotifyApi.Prefix + ENotifyApi.UpdateStatus,
      { id: notifyId }, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })
  test('逻辑删除一条通知', async () => {
    const res = await httpPost<IResp>(
      ENotifyApi.Prefix + ENotifyApi.Delete,
      { id: notifyId }, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })
  test('获取未读通知条数', async () => {
    const res = await httpGet<IResp<IUnReadNotify>>(
      ENotifyApi.Prefix + ENotifyApi.GetHasUnread, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
    expect(res.data?.unReadCount).toBeGreaterThanOrEqual(0)
  })
  test('将该用户的所有通知全部置为已读', async () => {
    const res = await httpPost<IResp>(
      ENotifyApi.Prefix + ENotifyApi.setAllNotifyToRead, {}, { cookie }
    )
    expect(res.status).toBe(EHttpStatusCode.OK)
    expect(res.code).toBe(EServiceRespCode.OK)
  })
})
