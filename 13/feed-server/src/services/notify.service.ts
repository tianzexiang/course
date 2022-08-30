import { INotify } from '../interfaces/model'
import { NotifyModel } from '../models/notify.model'
import { EMsgStatus } from '../enums/model'
import { IGetNotify, ICreateNotify } from '../interfaces/request/notify'
import { ObjectId } from 'mongodb'
import { check } from '../middlewares/check'
import { notifyErrorStat } from '../libs/stat/notify'
import { getSession } from './session.service'

// 创建的接口只是暴露给post相关接口使用，安全验证应该在他们那里完成？
export async function createNotify (props: ICreateNotify) {
  const { type, senderId, receiverId, relationId, content } = props
  const notify: INotify = {
    type,
    senderId,
    receiverId,
    relationId: new ObjectId(relationId),
    content,
    sendTime: Date.now(),
    status: EMsgStatus.Unread
  }
  const res = await NotifyModel.insertOne(notify)
  return res
}
/**
 * //获取通知列表
 * @param token
 * @param pagination
 * @returns
 */

export async function getNotifyLIst (
  token: string,
  pagination: Partial<IGetNotify>
) {
  const userId = (await getSession(token)).userId
  pagination.limit = Number(pagination.limit || 10)

  let NotifyList = []
  let hasNext = false
  let hasPrev = false

  if (pagination.next) {
    // 查询下一页
    // 连表查询得到发送者头像和昵称
    NotifyList = await NotifyModel.aggregate([
      { $sort: { _id: -1 } },
      {
        $match: {
          receiverId: userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] },
          _id: { $lt: new ObjectId(pagination.next) }
        }
      },

      { $limit: pagination.limit },
      {
        $lookup: {
          from: 'users',
          localField: 'senderId',
          foreignField: 'userId',
          as: 'fromItems'
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT']
          }
        }
      },
      {
        $project: {
          fromItems: 0,
          openId: 0,
          userId: 0,
          banner: 0,
          bio: 0,
          createdAt: 0,
          receiverId: 0
        }
      }
    ]).toArray()
  } else if (pagination.prev) {
    NotifyList = await NotifyModel.aggregate([
      { $sort: { _id: 1 } },
      {
        $match: {
          receiverId: userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] },
          _id: { $gt: new ObjectId(pagination.prev) }
        }
      },

      { $limit: pagination.limit },
      {
        $lookup: {
          from: 'users',
          localField: 'senderId',
          foreignField: 'userId',
          as: 'fromItems'
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT']
          }
        }
      },
      {
        $project: {
          fromItems: 0,
          openId: 0,
          userId: 0,
          banner: 0,
          bio: 0,
          createdAt: 0,
          receiverId: 0
        }
      }
    ]).toArray()
    NotifyList.reverse()
  } else {
    // 返回第一页
    NotifyList = await NotifyModel.aggregate([
      { $sort: { _id: -1 } },
      {
        $match: {
          receiverId: userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] }
        }
      },

      { $limit: pagination.limit },
      {
        $lookup: {
          from: 'users',
          localField: 'senderId',
          foreignField: 'userId',
          as: 'fromItems'
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT']
          }
        }
      },
      {
        $project: {
          fromItems: 0,
          openId: 0,
          userId: 0,
          banner: 0,
          bio: 0,
          createdAt: 0,
          receiverId: 0
        }
      }
    ]).toArray()
  }
  if (NotifyList.length > 0) {
    // 是否还有下一页
    const next = await NotifyModel.aggregate([
      { $sort: { _id: -1 } },
      {
        $match: {
          receiverId: userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] },
          _id: { $lt: NotifyList[NotifyList.length - 1]._id }
        }
      },
      { $limit: 1 }
    ]).toArray()
    if (next.length > 0) hasNext = true

    const prev = await NotifyModel.aggregate([
      // 这里只需要判断前面有没有数据而不需要刚好在前面的数据，所以不需要先逆序
      { $sort: { _id: -1 } },
      {
        $match: {
          receiverId: userId,
          status: { $in: [EMsgStatus.Read, EMsgStatus.Unread] },
          _id: { $gt: NotifyList[0]._id }
        }
      },
      { $limit: 1 }
    ]).toArray()
    if (prev.length > 0) hasPrev = true
  }

  return { NotifyList, hasNext, hasPrev }
}
/**
 * //切换通知已读和未读状态
 * @param Id
 */

export async function updateNotifyStatus (token: string, Id: string) {
  const userId = (await getSession(token)).userId
  const result = await NotifyModel.findOne({
    _id: new ObjectId(Id),
    receiverId: userId
  })
  check(!!result, notifyErrorStat.ERR_NOTIFY_NOT_FOUND)
  let newStatus: number
  if (result.status === EMsgStatus.Read) {
    newStatus = EMsgStatus.Unread
  } else if (result.status === EMsgStatus.Unread) {
    newStatus = EMsgStatus.Read
  } else {
    newStatus = result.status
  }
  NotifyModel.updateOne(
    { _id: new ObjectId(Id) },
    { $set: { status: newStatus } }
  )
}
/**
 * // 逻辑删除一条通知
 * @param token
 * @param Id
 */
export async function deleteNotify (token: string, Id: string) {
  const userId = (await getSession(token)).userId
  const result = NotifyModel.updateOne(
    { _id: new ObjectId(Id), receiverId: userId },
    { $set: { status: EMsgStatus.Deleted } }
  )
  // 这里需不需要检查修改是否成功？
  check(!!result, notifyErrorStat.ERR_NOTIFY_NOT_FOUND)
}

export async function getHasUnread (token: string) {
  const userId = (await getSession(token)).userId
  const unReadCount = await NotifyModel.count({
    receiverId: userId,
    status: EMsgStatus.Unread
  })
  return unReadCount
}

// 将所有消息设为已读
export async function setAllNotifyToRead (token:string) {
  const userId = (await getSession(token)).userId
  NotifyModel.updateMany({ receiverId: userId, status: EMsgStatus.Unread }, { $set: { status: EMsgStatus.Read } })
}

// 清空所有通知
export async function setAllNotifyToDelete (token:string) {
  const userId = (await getSession(token)).userId
  NotifyModel.updateMany({ receiverId: userId }, { $set: { status: EMsgStatus.Deleted } })
}
