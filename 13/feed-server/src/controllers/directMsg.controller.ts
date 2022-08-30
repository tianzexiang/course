import Joi from 'joi'
import { Context } from 'koa'
import Router from 'koa-router'
import { EDirectMsgApi } from '../enums/api'
import {
  ICreateDirectMsg,
  IDeleteChatItem,
  IDeleteDirectMsg,
  IGetChatItem,
  IGetDirectMsg,
  IGetUnreadCount,
  IGetUnreadDirectMsg,
  ISetMsgToRead
} from '../interfaces/request/directMsg'
import { JsonResp } from '../libs/response'
import { validator } from '../libs/validate'
import {
  createDirectMsg,
  deleteChatItem,
  deleteDirectMsg,
  getChatItem,
  getDirectMsg,
  getHasUnread,
  getNewUnReadMsgWithOneFriend,
  setAllMsgItemtoRead,
  setMsgToRead
} from '../services/directMst.service'

export const directMsgRouter = new Router({
  prefix: EDirectMsgApi.Prefix
})

// 验证规则
const schemaDefiners = {
  [EDirectMsgApi.CreateDirectMsg]: Joi.object<ICreateDirectMsg>({
    friendId: Joi.string().required(),
    msgType: Joi.number().required(),
    content: Joi.string().required()
  }),
  [EDirectMsgApi.DeleteDirectMsg]: Joi.object<IDeleteDirectMsg>({
    MsgId: Joi.string()
  }),
  [EDirectMsgApi.GetChatItem]: Joi.object<IGetChatItem>({
    prev: Joi.string().allow(''),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().min(5).max(20).default(10)
  }),
  [EDirectMsgApi.DeleteChatItem]: Joi.object<IDeleteChatItem>({
    id: Joi.string().required()
  }),
  [EDirectMsgApi.GetDirectMsg]: Joi.object<IGetDirectMsg>({
    id: Joi.string().required(),
    prev: Joi.string().allow(''),
    next: Joi.string().allow(''),
    limit: Joi.number().integer().min(4).max(20).default(10)
  }),
  [EDirectMsgApi.SetMsgToRead]: Joi.object<ISetMsgToRead>({
    id: Joi.string().required()
  }),
  [EDirectMsgApi.getNewUnReadMsgWithOneFriend]: Joi.object<IGetUnreadDirectMsg>({
    id: Joi.string().required()
  }),
  [EDirectMsgApi.GetUnreadCount]: Joi.object<IGetUnreadCount>({
    id: Joi.string().required().allow('').default('')
  })
}

/**
 * @description 新建一条私信
 */
directMsgRouter.post(EDirectMsgApi.CreateDirectMsg, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EDirectMsgApi.CreateDirectMsg])
  const props = ctx.request.body
  const token = ctx.cookies.get('token')
  const id = await createDirectMsg({ token, ...props })
  ctx.body = new JsonResp(id)
})

directMsgRouter.post(EDirectMsgApi.DeleteDirectMsg, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EDirectMsgApi.DeleteDirectMsg])
  const { MsgId } = ctx.request.body
  const token = ctx.cookies.get('token')
  await deleteDirectMsg(token, MsgId)
  ctx.body = new JsonResp()
})

directMsgRouter.get(EDirectMsgApi.GetChatItem, async (ctx: Context) => {
  validator(ctx.request.query, schemaDefiners[EDirectMsgApi.GetChatItem])
  const props = ctx.request.query
  const token = ctx.cookies.get('token')
  const { chatItem, hasNext, hasPrev } = await getChatItem(token, props)
  ctx.body = new JsonResp({ chatItem, hasNext, hasPrev })
})

directMsgRouter.post(EDirectMsgApi.DeleteChatItem, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EDirectMsgApi.DeleteChatItem])
  const props = ctx.request.body
  const token = ctx.cookies.get('token')
  await deleteChatItem(token, props)
  ctx.body = new JsonResp()
})
directMsgRouter.post(EDirectMsgApi.SetMsgToRead, async (ctx:Context) => {
  validator(ctx.request.body, schemaDefiners[EDirectMsgApi.SetMsgToRead])
  const props = ctx.request.body
  const token = ctx.cookies.get('token')
  await setMsgToRead(token, props)
  ctx.body = new JsonResp()
})

directMsgRouter.get(EDirectMsgApi.GetDirectMsg, async (ctx: Context) => {
  validator(ctx.request.query, schemaDefiners[EDirectMsgApi.GetDirectMsg])
  let { id, prev = '', next = '', limit = 10 } = ctx.request.query
  prev = prev.toString()
  next = next.toString()
  const limitToNumber = Number(limit)
  const token = ctx.cookies.get('token')
  const { msgList, hasNext, hasPrev, unReadCount } = await getDirectMsg(
    token,
    id.toString(),
    {
      prev,
      next,
      limit: limitToNumber
    }
  )
  ctx.body = new JsonResp({ msgList, hasNext, hasPrev, unReadCount })
})

directMsgRouter.get(EDirectMsgApi.GetUnreadCount, async (ctx: Context) => {
  validator(ctx.request.query, schemaDefiners[EDirectMsgApi.GetUnreadCount])
  const { id } = ctx.request.query
  const token = ctx.cookies.get('token')
  const unReadCount = await getHasUnread(token, id.toString())
  ctx.body = new JsonResp({ unReadCount })
})

directMsgRouter.post(EDirectMsgApi.SetAllMsgToRead, async (ctx:Context) => {
  const token = ctx.cookies.get('token')
  await setAllMsgItemtoRead(token)
  ctx.body = new JsonResp()
})

directMsgRouter.get(EDirectMsgApi.getNewUnReadMsgWithOneFriend, async (ctx:Context) => {
  validator(ctx.request.query, schemaDefiners[EDirectMsgApi.getNewUnReadMsgWithOneFriend])
  const token = ctx.cookies.get('token')
  const { id } = ctx.request.query
  const { unReadMsg } = await getNewUnReadMsgWithOneFriend(token, id.toString())
  ctx.body = new JsonResp({ unReadMsg })
})
