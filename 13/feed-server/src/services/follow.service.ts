import { ObjectId, Document } from 'mongodb'
import { IPagination } from '../interfaces/request/post'
import { IUserFollowResp } from '../interfaces/response/user'
import { followErrorStat } from '../libs/stat/follow'
import { check } from '../middlewares/check'
import { FollowModel } from '../models/follow.model'

/**
 * @description 得到所有我的关注
 * @param  userId: string 用户id
 * @param  pagination: IPagination 分页
 * @param  relationId: string relationId用户是否关注了查找出来的userId用户关注的用户，通常情况都是当前登录用户
 * @return { items , hasNext }
 */
export async function getFollows (
  userId: string,
  pagination: IPagination,
  relationId: string
) {
  const { limit = 10, next = '' } = pagination
  let res: Document[] = []
  let hasNext = false
  if (next) {
    res = await FollowModel.aggregate([
      {
        $match: { userId, _id: { $lt: new ObjectId(next) } }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: 'follow',
          let: { userId: '$userId', followId: '$followId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followId', '$$followId'] },
                    { $eq: ['$userId', relationId] }
                  ]
                }
              }
            }
          ],
          as: 'hasFollowed' // relationId用户是否关注了查找出来的userId用户关注的用户，通常情况都是当前登录用户
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followId',
          foreignField: 'userId',
          as: 'user' // 同时返回关注userId的用户的信息
        }
      },
      {
        $unwind: '$user'
      }
    ]).toArray()
  } else {
    // 查询第一页
    res = await FollowModel.aggregate([
      {
        $match: { userId }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: 'follow',
          let: { userId: '$userId', followId: '$followId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followId', '$$followId'] },
                    { $eq: ['$userId', relationId] }
                  ]
                }
              }
            }
          ],
          as: 'hasFollowed' // relationId用户是否关注了查找出来的userId用户关注的用户，通常情况都是当前登录用户
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followId',
          foreignField: 'userId',
          as: 'user' // 同时返回关注userId的用户的信息
        }
      },
      {
        $unwind: '$user'
      }
    ]).toArray()
  }
  if (res.length > 0) {
    // 是否还有下一页
    const next = await FollowModel.findOne(
      {
        userId,
        _id: {
          $lt: new ObjectId(res[res.length - 1]._id)
        }
      },
      {
        sort: {
          _id: -1
        }
      }
    )
    if (next) hasNext = true
  }
  const _res = res.map((val) => ({
    ...val,
    hasFollowed: val.hasFollowed.length !== 0
  })) as unknown as IUserFollowResp[]
  return { items: _res, hasNext }
}

/**
 * @description 得到所有关注我的列表
 * @param  userId: string 用户id
 * @param  pagination: IPagination 分页
 * @param  relationId: string relationId用户是否关注了查找出来的订阅userId的用户
 * @return { items , hasNext }
 */
export async function getSubscribes (
  userId: string,
  pagination: IPagination,
  relationId: string
) {
  const { limit = 10, next = '' } = pagination
  let res: Document[] = []
  let hasNext = false
  if (next) {
    res = await FollowModel.aggregate([
      {
        $match: { followId: userId, _id: { $lt: new ObjectId(next) } }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: 'follow',
          let: { userId: '$userId', followId: '$followId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followId', '$$userId'] },
                    { $eq: ['$userId', relationId] }
                  ]
                }
              }
            }
          ],
          as: 'hasFollowed' // relationId用户 是否关注了查找出来的订阅userId的用户，通常情况都是当前登录用户
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'userId',
          as: 'user' // 同时返回关注userId的用户的信息
        }
      },
      {
        $unwind: '$user'
      }
    ]).toArray()
  } else {
    // 查询第一页
    res = await FollowModel.aggregate([
      {
        $match: { followId: userId }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: 'follow',
          let: { userId: '$userId', followId: '$followId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followId', '$$userId'] },
                    { $eq: ['$userId', relationId] }
                  ]
                }
              }
            }
          ],
          as: 'hasFollowed' // relationId用户 是否关注了查找出来的订阅userId的用户，通常情况都是当前登录用户
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'userId',
          as: 'user' // 同时返回关注userId的用户的信息
        }
      },
      {
        $unwind: '$user'
      }
    ]).toArray()
  }
  if (res.length > 0) {
    // 是否还有下一页
    const next = await FollowModel.findOne(
      {
        followId: userId,
        _id: {
          $lt: new ObjectId(res[res.length - 1]._id)
        }
      },
      {
        sort: {
          _id: -1
        }
      }
    )
    if (next) hasNext = true
  }
  const _res = res.map((val) => ({
    ...val,
    hasFollowed: val.hasFollowed.length !== 0
  })) as unknown as IUserFollowResp[]
  return { items: _res, hasNext }
}

/**
 * @description 关注用户
 * @param  userId: string 用户id
 * @param  followId: string 被关注用户id
 * @return
 */
export async function follow (userId: string, followId: string) {
  const isExist = await FollowModel.findOne({
    userId,
    followId
  })
  check(!isExist, followErrorStat.ERR_FOLLOW_EXIST)
  const res = await FollowModel.insertOne({
    userId,
    followId,
    createdAt: Date.now()
  })
  return {
    id: res.insertedId
  }
}

/**
 * @description 取关用户
 * @param  userId: string 用户id
 * @param  followId: string 被关注用户id
 * @return
 */
export async function unfollow (userId: string, followId: string) {
  await FollowModel.deleteOne({
    userId,
    followId
  })
}

/**
 * @description 得到所有我的关注数量
 * @param  userId: string 用户id
 * @return number
 */
export async function countAllFollows (userId: string) {
  const counts = await FollowModel.countDocuments({
    userId
  })
  return counts
}

/**
 * @description 得到所有关注我的数量
 * @param  userId: string 用户id
 * @return number
 */
export async function countAllSubscribes (userId: string) {
  const counts = await FollowModel.countDocuments({
    followId: userId
  })
  return counts
}

/**
 * @description 用户是否关注目标用户
 * @param  sourceUserId: string 用户id
 * @param  targetUserId: string 目标用户id
 * @return boolean
 */
export async function hasFollowed (sourceUserId: string, targetUserId: string) {
  const res = await FollowModel.findOne({
    userId: sourceUserId,
    followId: targetUserId
  })
  return !!res
}
