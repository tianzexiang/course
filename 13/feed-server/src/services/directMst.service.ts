import { IDirectMsg } from '../interfaces/model'
import { EMsgStatus, EUserStatus, EWhoSendMsg } from '../enums/model'
import { DirectMsgModel } from '../models/directMsg.model'
import { ObjectId } from 'mongodb'
import { getSession } from './session.service'
import {
  ICreate,
  IDeleteChatItem,
  ISetMsgToRead
} from '../interfaces/request/directMsg'
import { IGetNotify } from '../interfaces/request/notify'
import { UserModel } from '../models/user.model'
import { check } from '../middlewares/check'
import { directMsgErrorStat } from '../libs/stat/directMsg'

/**
 * 创建一条私信
 * @param props
 */
export async function createDirectMsg (props: ICreate) {
  const { token, friendId, msgType, content } = props
  const userId = (await getSession(token)).userId
  const MsgForOus: IDirectMsg = {
    userId,
    friendId,
    senderId: userId,
    receiverId: friendId,
    msgType,
    content,
    sendTime: Date.now(),
    status: EMsgStatus.Read // 对自己而已，自己发的肯定是已读
  }
  const MsgForFriend: IDirectMsg = {
    userId: friendId,
    friendId: userId,
    senderId: userId,
    receiverId: friendId,
    msgType,
    content,
    sendTime: Date.now(),
    status: EMsgStatus.Unread // 对朋友而已，现在还是未读
  }
  const res = await DirectMsgModel.insertOne(MsgForOus)
  await DirectMsgModel.insertOne(MsgForFriend)
  return res.insertedId
}
/**
 * //单向删除一条私信
 * @param token
 * @param msgId
 */
export async function deleteDirectMsg (token: string, msgId: string) {
  const userId = (await getSession(token)).userId
  await DirectMsgModel.updateOne(
    { _id: new ObjectId(msgId), userId },
    { $set: { status: EMsgStatus.Deleted } }
  )
}

/**
 * //获取私信列表 需要返回最新消息类型，前端判断如果是图片显示[图片]
 * @param token
 * @param pagination
 * @returns
 */
export async function getChatItem (
  token: string,
  pagination: Partial<IGetNotify>
) {
  pagination.limit = Number(pagination.limit || 10)
  const userId = (await getSession(token)).userId
  let chatItem = [] // : WithId<IchatItem>[]
  let hasNext = false
  let hasPrev = false

  if (pagination.next) {
    // 查询下一页
    chatItem = await DirectMsgModel.aggregate([
      {
        $match: {
          userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $sort: { sendTime: 1 } },
      {
        $group: {
          _id: '$friendId',
          lastMsg: { $last: '$content' }, // 获取每个会话的最新信息
          lastSendTime: { $last: '$sendTime' }, // 这个能找到每组用户最新一条消息时间
          lastMsgType: { $last: '$msgType' },
          lastMsgId: { $last: '$_id' },
          unReadCount: {
            $sum: {
              $cond: {
                if: { $eq: ['$status', EMsgStatus.Unread] },
                then: 1,
                else: 0
              }
            }
          } // 获取未读消息数量
        }
      },
      // { $sort: { lastSendTime: -1 } }, // 这里不能使用_id 因为分组后_id为friendId与消息发送时间没有关联s
      { $sort: { lastMsgId: -1 } }, // 每条消息_id跟发送时间是有关联的，试试能不能用
      // { $skip: pagination.skip },
      {
        $match: {
          lastMsgId: { $lt: new ObjectId(pagination.next) }
        }
      },
      { $limit: pagination.limit },
      {
        $lookup: {
          from: 'users',
          localField: '_id', // 必须和外键类型相同
          foreignField: 'userId',
          as: 'friendInfo'
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$friendInfo', 0] }, '$$ROOT']
          }
        }
      },
      {
        $project: {
          friendInfo: 0,
          _id: 0,
          openId: 0,
          banner: 0,
          bio: 0,
          createdAt: 0
        }
      }
    ]).toArray()
  } else if (pagination.prev) {
    // 查询上一页
    chatItem = await DirectMsgModel.aggregate([
      {
        $match: {
          userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $sort: { sendTime: 1 } },
      {
        $group: {
          _id: '$friendId',
          lastMsg: { $last: '$content' }, // 获取每个会话的最新信息
          lastSendTime: { $last: '$sendTime' }, // 这个能找到每组用户最新一条消息时间
          lastMsgType: { $last: '$msgType' },
          lastMsgId: { $last: '$_id' },
          unReadCount: {
            $sum: {
              $cond: {
                if: { $eq: ['$status', EMsgStatus.Unread] },
                then: 1,
                else: 0
              }
            }
          } // 获取未读消息数量
        }
      },
      // { $sort: { lastSendTime: -1 } }, // 这里不能使用_id 因为分组后_id为friendId与消息发送时间没有关联s
      { $sort: { lastMsgId: 1 } }, // 每条消息_id跟发送时间是有关联的，试试能不能用
      // { $skip: pagination.skip },
      {
        $match: {
          lastMsgId: { $gt: new ObjectId(pagination.prev) }
        }
      },
      { $limit: pagination.limit },
      {
        $lookup: {
          from: 'users',
          localField: '_id', // 必须和外键类型相同
          foreignField: 'userId',
          as: 'friendInfo'
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$friendInfo', 0] }, '$$ROOT']
          }
        }
      },
      {
        $project: {
          friendInfo: 0,
          _id: 0,
          openId: 0,
          banner: 0,
          bio: 0,
          createdAt: 0
        }
      }
    ]).toArray()
    chatItem.reverse()
  } else {
    // 查询第一页
    chatItem = await DirectMsgModel.aggregate([
      {
        $match: {
          userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $sort: { sendTime: 1 } },
      {
        $group: {
          _id: '$friendId',
          lastMsg: { $last: '$content' }, // 获取每个会话的最新信息
          lastSendTime: { $last: '$sendTime' }, // 这个能找到每组用户最新一条消息时间
          lastMsgType: { $last: '$msgType' },
          lastMsgId: { $last: '$_id' },
          unReadCount: {
            $sum: {
              $cond: {
                if: { $eq: ['$status', EMsgStatus.Unread] },
                then: 1,
                else: 0
              }
            }
          } // 获取未读消息数量
        }
      },
      // { $sort: { lastSendTime: -1 } }, // 这里不能使用_id 因为分组后_id为friendId与消息发送时间没有关联s
      { $sort: { lastMsgId: -1 } }, // 每条消息_id跟发送时间是有关联的，试试能不能用
      { $limit: pagination.limit },
      {
        $lookup: {
          from: 'users',
          localField: '_id', // 必须和外键类型相同
          foreignField: 'userId',
          as: 'friendInfo'
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$friendInfo', 0] }, '$$ROOT']
          }
        }
      },
      {
        $project: {
          friendInfo: 0,
          _id: 0,
          openId: 0,
          banner: 0,
          bio: 0,
          createdAt: 0
        }
      }
    ]).toArray()
  }
  if (chatItem.length > 0) {
    // 是否还有下一页
    const next = await DirectMsgModel.aggregate([
      {
        $match: {
          userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $sort: { sendTime: 1 } },
      {
        $group: {
          _id: '$friendId',
          lastMsg: { $last: '$content' }, // 获取每个会话的最新信息
          lastSendTime: { $last: '$sendTime' }, // 这个能找到每组用户最新一条消息时间
          lastMsgType: { $last: '$msgType' },
          lastMsgId: { $last: '$_id' },
          count: {
            $sum: {
              $cond: {
                if: { $eq: ['$status', EMsgStatus.Unread] },
                then: 1,
                else: 0
              }
            }
          } // 获取未读消息数量
        }
      },
      { $sort: { lastMsgId: -1 } }, // 每条消息_id跟发送时间是有关联的，试试能不能用
      {
        $match: {
          lastMsgId: { $lt: chatItem[chatItem.length - 1].lastMsgId }
        }
      },
      { $limit: 1 }
    ]).toArray()
    if (next.length > 0) hasNext = true
    // 是否还有上一页
    const prev = await DirectMsgModel.aggregate([
      {
        $match: {
          userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $sort: { sendTime: 1 } },
      {
        $group: {
          _id: '$friendId',
          lastMsg: { $last: '$content' }, // 获取每个会话的最新信息
          lastSendTime: { $last: '$sendTime' }, // 这个能找到每组用户最新一条消息时间
          lastMsgType: { $last: '$msgType' },
          lastMsgId: { $last: '$_id' },
          count: {
            $sum: {
              $cond: {
                if: { $eq: ['$status', EMsgStatus.Unread] },
                then: 1,
                else: 0
              }
            }
          } // 获取未读消息数量
        }
      },
      // { $sort: { lastSendTime: -1 } }, // 这里不能使用_id 因为分组后_id为friendId与消息发送时间没有关联s
      { $sort: { lastMsgId: 1 } }, // 每条消息_id跟发送时间是有关联的，试试能不能用
      // { $skip: pagination.skip },
      {
        $match: {
          lastMsgId: { $gt: chatItem[0].lastMsgId }
        }
      },
      { $limit: 1 }
    ]).toArray()
    if (prev.length > 0) hasPrev = true
  }

  return { chatItem, hasNext, hasPrev }
}
/**
 * //删除和一名用户的私信列表
 * @param token
 */
export async function deleteChatItem (token: string, props: IDeleteChatItem) {
  const userId = (await getSession(token)).userId
  await DirectMsgModel.updateMany(
    { userId, friendId: props.id },
    { $set: { status: EMsgStatus.Deleted } }
  )
}

export async function getNewUnReadMsgWithOneFriend (token:string, friendId:string) {
  const userId = (await getSession(token)).userId
  const unReadMsg = await DirectMsgModel.aggregate([
    { $sort: { _id: -1 } },
    {
      $match: {
        userId,
        friendId,
        status: EMsgStatus.Unread
      }
    },
    {
      $addFields: {
        whoSendMsg: {
          $cond: { if: { $eq: ['$userId', '$senderId'] }, then: 1, else: 0 }
        } // 用于判断消息是不是自己发送
      }
    },
    {
      $project: {
        friendId: 0,
        friendInfo: 0,
        userId: 0,
        senderId: 0,
        receiverId: 0
      }
    }
  ]).toArray()
  await DirectMsgModel.updateMany({ userId, friendId, status: EMsgStatus.Unread }, { $set: { status: EMsgStatus.Read } })
  return { unReadMsg }
}
/**
 * 获取和某个用户的聊天信息，前端通过判断userId和真实发送者是否相等确实消息是谁发的
 * @param token
 * @param friendId
 * @returns
 */
export async function getDirectMsg (
  token: string,
  friendId: string,
  pagination: Partial<IGetNotify>
) {
  pagination.limit = pagination.limit || 10
  const userId = (await getSession(token)).userId
  let msgList = []
  let hasNext = false
  let hasPrev = false
  const friendInfo = await UserModel.findOne({ userId: friendId, status: EUserStatus.Normal })
  check(!!friendInfo, directMsgErrorStat.ERR_FRIEND_NOT_FOUND)
  check(friendId !== userId, directMsgErrorStat.ERR_CAN_NOT_DIRECT_WITH_SELF)
  const unReadCount = await DirectMsgModel.count({
    userId,
    friendId,
    status: EMsgStatus.Unread
  })
  if (pagination.next) {
    msgList = await DirectMsgModel.aggregate([
      { $sort: { _id: -1 } },
      {
        $match: {
          _id: { $lt: new ObjectId(pagination.next) },
          userId,
          friendId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $limit: pagination.limit },
      // { $sort: { sendTime: -1 } },
      {
        $addFields: {
          whoSendMsg: {
            $cond: {
              if: { $eq: ['$userId', '$senderId'] },
              then: EWhoSendMsg.Me,
              else: EWhoSendMsg.Frined
            }
          } // 用于判断消息是不是自己发送
        }
      },
      {
        $project: {
          friendId: 0,
          friendInfo: 0,
          userId: 0,
          senderId: 0,
          receiverId: 0
        }
      }
    ]).toArray()
  } else if (pagination.prev) {
    msgList = await DirectMsgModel.aggregate([
      { $sort: { _id: 1 } },
      {
        $match: {
          _id: { $gt: new ObjectId(pagination.prev) },
          userId,
          friendId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $limit: pagination.limit },
      // { $sort: { sendTime: -1 } },
      {
        $addFields: {
          whoSendMsg: {
            $cond: { if: { $eq: ['$userId', '$senderId'] }, then: 1, else: 0 }
          } // 用于判断消息是不是自己发送
        }
      },
      {
        $project: {
          friendId: 0,
          friendInfo: 0,
          userId: 0,
          senderId: 0,
          receiverId: 0
        }
      }
    ]).toArray()
    msgList.reverse()
  } else {
    msgList = await DirectMsgModel.aggregate([
      { $sort: { _id: -1 } },
      {
        $match: {
          userId,
          friendId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $limit: pagination.limit },
      // { $sort: { sendTime: -1 } },
      {
        $addFields: {
          whoSendMsg: {
            $cond: { if: { $eq: ['$userId', '$senderId'] }, then: 1, else: 0 }
          } // 用于判断消息是不是自己发送
        }
      },
      {
        $project: {
          friendId: 0,
          friendInfo: 0,
          userId: 0,
          senderId: 0,
          receiverId: 0
        }
      }
    ]).toArray()
  }
  if (msgList.length > 0) {
    const next = await DirectMsgModel.aggregate([
      { $sort: { _id: -1 } },
      {
        $match: {
          _id: { $lt: msgList[msgList.length - 1]._id },
          userId,
          friendId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $limit: 1 }
    ]).toArray()
    if (next.length > 0) hasNext = true

    const prev = await DirectMsgModel.aggregate([
      { $sort: { _id: 1 } },
      {
        $match: {
          _id: { $gt: msgList[0]._id },
          userId,
          friendId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },
      { $limit: 1 }
    ]).toArray()
    if (prev.length > 0) hasPrev = true
  }

  await DirectMsgModel.updateMany(
    { userId, friendId, status: EMsgStatus.Unread },
    { $set: { status: EMsgStatus.Read } }
  )

  return { msgList, hasNext, hasPrev, unReadCount }
}

// 获取未读消息总数
export async function getHasUnread (token: string, friendId: string) {
  const userId = (await getSession(token)).userId
  const unReadCount = await DirectMsgModel.count({ userId, friendId: { $ne: friendId }, status: EMsgStatus.Unread })
  return unReadCount
}

export async function setAllMsgItemtoRead (token: string) {
  const userId = (await getSession(token)).userId
  await DirectMsgModel.updateMany({ userId, status: EMsgStatus.Unread }, { $set: { status: EMsgStatus.Read } })
}

export async function setMsgToRead (token:string, params:ISetMsgToRead) {
  const userId = (await getSession(token)).userId
  await DirectMsgModel.updateMany(
    { userId, friendId: params.id, status: EMsgStatus.Unread },
    { $set: { status: EMsgStatus.Read } }
  )
}
