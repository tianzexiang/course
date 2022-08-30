import Joi from 'joi'
import { Context } from 'koa'
import Router from 'koa-router'
import { ENotifyApi } from '../enums/api'
import { IDeleteNotify, IGetNotify, IUpdateNotifyStatus } from '../interfaces/request/notify'
import { JsonResp } from '../libs/response'
import { validator } from '../libs/validate'
import { deleteNotify, getHasUnread, getNotifyLIst, setAllNotifyToDelete, setAllNotifyToRead, updateNotifyStatus } from '../services/notify.service'

export const notifyRouter = new Router({
  prefix: ENotifyApi.Prefix
})

// 验证规则
const schemaDefiners = {
  [ENotifyApi.Get]: Joi.object<IGetNotify>({
    prev: Joi.string().allow(''),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().min(5).max(20).default(10)
  }),
  [ENotifyApi.UpdateStatus]: Joi.object<IUpdateNotifyStatus>({
    id: Joi.string().required()
  }),
  [ENotifyApi.Delete]: Joi.object<IDeleteNotify>({
    id: Joi.string().required()
  })
}
/**
 * @description 获取通知列表
 */
notifyRouter.get(ENotifyApi.Get, async (ctx:Context) => {
  validator(ctx.request.query, schemaDefiners[ENotifyApi.Get])
  const props = ctx.request.query
  const token = ctx.cookies.get('token')
  const { NotifyList, hasNext, hasPrev } = await getNotifyLIst(token, props)
  ctx.body = new JsonResp({ NotifyList, hasNext, hasPrev })
})
/**
 * @description 切换通知已读和未读状态
 */
notifyRouter.post(ENotifyApi.UpdateStatus, async (ctx:Context) => {
  validator(ctx.request.body, schemaDefiners[ENotifyApi.UpdateStatus])
  const { id } = ctx.request.body
  const token = ctx.cookies.get('token')
  await updateNotifyStatus(token, id)
  ctx.body = new JsonResp()
})

/**
 * @description 逻辑删除一条通知
 */
notifyRouter.post(ENotifyApi.Delete, async (ctx:Context) => {
  validator(ctx.request.body, schemaDefiners[ENotifyApi.Delete])
  const { id } = ctx.request.body
  const token = ctx.cookies.get('token')
  await deleteNotify(token, id)
  ctx.body = new JsonResp()
})

/**
 * @description 获取未读通知条数
 */
notifyRouter.get(ENotifyApi.GetHasUnread, async (ctx:Context) => {
  const token = ctx.cookies.get('token')
  const unReadCount = await getHasUnread(token)
  ctx.body = new JsonResp({ unReadCount })
})

/**
 * @description 将跟本用户有关的通知状态全部设为已读
 */
notifyRouter.post(ENotifyApi.setAllNotifyToRead, async (ctx:Context) => {
  const token = ctx.cookies.get('token')
  await setAllNotifyToRead(token)
  ctx.body = new JsonResp()
})

notifyRouter.post(ENotifyApi.setAllNotifyToDelete, async (ctx: Context) => {
  const token = ctx.cookies.get('token')
  await setAllNotifyToDelete(token)
  ctx.body = new JsonResp()
})
