import { ObjectId, Document } from 'mongodb'
import { EPostType, EUserStatus } from '../enums/model'
import { ISearch } from '../interfaces/request/search'
import { IUserInfoResp } from '../interfaces/response/user'
import { PostModel } from '../models/post.model'
import { UserModel } from '../models/user.model'
import { filterDeleted, relatInfo, userInfo } from './post.service'
import { getSession } from './session.service'

// 得到follows and subscribe counts
const countFollowsAndSubscribes = [
  {
    $lookup: {
      from: 'follow',
      let: { userId: '$userId' },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$$userId', '$userId']
            }
          }
        },
        {
          $group: {
            _id: '$userId',
            count: { $sum: 1 }
          }
        }
      ],
      as: 'followCounts'
    }
  },
  {
    $lookup: {
      from: 'follow',
      let: { userId: '$userId' },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$$userId', '$followId']
            }
          }
        },
        {
          $group: {
            _id: '$followId',
            count: { $sum: 1 }
          }
        }
      ],
      as: 'subscribeCounts'
    }
  }
]
/**
 * @description 搜索帖子
 * @param  params: ISearch 搜索参数
 * @return {items:IUserInfoResp[],hasNext: boolean}
 */
export async function searchPosts (params: ISearch) {
  const { keyword, next, limit = 10 } = params
  let res = []
  let hasNext = false
  if (next) {
    res = await PostModel.aggregate([
      ...filterDeleted,
      ...relatInfo,
      ...userInfo,
      {
        $match: {
          content: { $regex: keyword, $options: 'i' },
          _id: { $lt: new ObjectId(next) },
          type: { $ne: EPostType.Delete }
        }
      }, {
        $sort: { _id: -1 }
      }, {
        $limit: limit
      }])
      .toArray()
  } else {
    res = await PostModel.aggregate([
      ...filterDeleted,
      ...relatInfo,
      ...userInfo,
      {
        $match: {
          content: { $regex: keyword, $options: 'i' },
          type: { $ne: EPostType.Delete }
        }
      }, {
        $sort: { _id: -1 }
      }, {
        $limit: limit
      }])
      .toArray()
  }
  hasNext = res.length === limit
  return {
    items: res,
    hasNext
  }
}

/**
 * @description 搜索带图片帖子
 * @param  params: ISearch 搜索参数
 * @return {items:IUserInfoResp[],hasNext: boolean}
 */
export async function searchImgs (params: ISearch) {
  const { keyword, next, limit = 10 } = params
  let res = []
  let hasNext = false
  if (next) {
    res = await PostModel.aggregate([
      ...filterDeleted,
      ...relatInfo,
      ...userInfo,
      {
        $match: {
          content: { $regex: keyword, $options: 'i' },
          _id: { $lt: new ObjectId(next) },
          imgs: { $ne: [] },
          type: { $ne: EPostType.Delete }
        }
      }, {
        $sort: { _id: -1 }
      }, {
        $limit: limit
      }])
      .toArray()
  } else {
    res = await PostModel.aggregate([
      ...filterDeleted,
      ...relatInfo,
      ...userInfo,
      {
        $match: {
          content: { $regex: keyword, $options: 'i' },
          imgs: { $ne: [] },
          type: { $ne: EPostType.Delete }
        }
      }, {
        $sort: { _id: -1 }
      }, {
        $limit: limit
      }])
      .toArray()
  }
  hasNext = res.length === limit
  return {
    items: res,
    hasNext
  }
}

/**
 * @description 搜索用户
 * @param  params: ISearch 搜索参数
 * @param  currLoginUserToken:string
 * @return {items:IUserInfoResp[],hasNext: boolean}
 */
export async function searchUsers (params: ISearch, currLoginUserToken: string) {
  const { keyword, next, limit = 10 } = params
  const currLoginUserId = (await getSession(currLoginUserToken)).userId
  let res: Document[]
  let hasNext = false
  if (next) {
    res = await UserModel.aggregate([
      {
        $match: {
          $or: [
            { userId: { $regex: keyword, $options: 'i' } },
            { nickname: { $regex: keyword, $options: 'i' } }
          ],
          _id: { $lt: new ObjectId(next) },
          status: EUserStatus.Normal
        }
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
          let: { userId: '$userId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$userId', currLoginUserId] },
                    { $eq: ['$followId', '$$userId'] }
                  ]
                }
              }
            }
          ],
          as: 'hasFollowed' // relationId用户是否关注了查找出来的userId用户关注的用户，通常情况都是当前登录用户
        }
      },
      ...countFollowsAndSubscribes
    ]).toArray()
  } else {
    res = await UserModel.aggregate([
      {
        $match: {
          $or: [
            { userId: { $regex: keyword, $options: 'i' } },
            { nickname: { $regex: keyword, $options: 'i' } }
          ],
          status: EUserStatus.Normal
        }
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
          let: { userId: '$userId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$userId', currLoginUserId] },
                    { $eq: ['$followId', '$$userId'] }
                  ]
                }
              }
            }
          ],
          as: 'hasFollowed' // relationId用户是否关注了查找出来的userId用户关注的用户，通常情况都是当前登录用户
        }
      },
      ...countFollowsAndSubscribes
    ]).toArray()
  }
  if (res.length > 0) {
    // 是否还有下一页
    const next = await UserModel.findOne(
      {
        userId: { $regex: keyword, $options: 'i' },
        _id: { $lt: new ObjectId(res[res.length - 1]._id) },
        status: EUserStatus.Normal
      },
      {
        sort: {
          _id: -1
        }
      }
    )
    if (next) hasNext = true
  }
  const _res = res.map((item) => ({
    ...item,
    hasFollowed: item.hasFollowed.length !== 0,
    followCounts: item.followCounts.length ? item.followCounts[0].count : 0,
    subscribeCounts: item.subscribeCounts.length
      ? item.subscribeCounts[0].count
      : 0
  }))

  return {
    items: _res as unknown as IUserInfoResp[],
    hasNext
  }
}
