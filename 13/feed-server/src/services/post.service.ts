import { LikeModel } from './../models/like.model'
import { postErrorStat } from '../libs/stat/post'
import { check } from '../middlewares/check'
import { PostModel } from '../models/post.model'
import { ILikes, IPost } from '../interfaces/model'
import { ENotifyType, EPostType } from './../enums/model'
import { getSession } from './session.service'
import { ObjectId } from 'mongodb'
import {
  ICreatePost,
  IDelPost,
  IGetComments,
  IGetDetail,
  IGetFollowPosts,
  IGetUserPosts,
  IThumbsUp
} from '../interfaces/request/post'
import { createNotify } from './notify.service'
export const filterDeleted = [{ $match: { type: { $ne: EPostType.Delete } } }]
export const relatInfo = [
  {
    $lookup: {
      from: 'post',
      localField: 'relationId',
      foreignField: '_id',
      as: 'relate.post'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'relate.post.userId',
      foreignField: 'userId',
      as: 'relate.user'
    }
  },
  {
    $project: {
      'relate.user._id': 0,
      'relate.user.createdAt': 0,
      'relate.user.openId': 0,
      'relate.user.banner': 0,
      'relate.user.bio': 0,
      'relate.user.status': 0
    }
  }
]
export const userInfo = [
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: 'userId',
      as: 'user'
    }
  },
  {
    $unwind: '$user'
  },
  {
    $project: {
      'user._id': 0,
      'user.createdAt': 0,
      'user.openId': 0,
      'user.banner': 0,
      'user.bio': 0,
      'user.status': 0
    }
  }
]

/**
 * @description 个人中心帖子列表
 * @param  next?: string
 * @param  limit?: number
 * @param  token: string
 * @returns { items , hasNext }
 */
export async function getUserPosts (options: IGetUserPosts) {
  const limit = Number(options.limit) || 10
  const { userId } = options
  let items = []
  let hasNext = false
  const option = [
    ...filterDeleted,
    ...userInfo,
    ...relatInfo,
    {
      $lookup: {
        from: 'like',
        localField: '_id',
        foreignField: 'postId',
        as: 'hasLikes'
      }
    },
    {
      $addFields: {
        isLike: {
          $in: [userId, '$hasLikes.userId']
        }
      }
    },
    {
      $project: {
        hasLikes: 0
      }
    },
    { $sort: { _id: -1 } }
  ]
  if (options.next) {
    items = await PostModel.aggregate([
      ...option,
      { $match: { userId, _id: { $lt: new ObjectId(options.next) } } },
      { $limit: limit }
    ]).toArray()
  } else {
    items = await PostModel.aggregate([
      ...option,
      { $match: { userId } },
      { $limit: limit }
    ]).toArray()
  }
  hasNext = items.length === limit
  return { items, hasNext }
}

/**
 * @description 个人中心照片帖子列表
 * @param  next?: string
 * @param  limit?: number
 * @param  token: string
 * @returns { items , hasNext }
 */
export async function getUserPhotoPosts (options: IGetUserPosts) {
  const limit = Number(options.limit) || 10
  const { userId } = options
  let items = []
  let hasNext = false
  const option = [
    ...filterDeleted,
    ...userInfo,
    ...relatInfo,
    {
      $lookup: {
        from: 'like',
        localField: '_id',
        foreignField: 'postId',
        as: 'hasLikes'
      }
    },
    {
      $addFields: {
        isLike: {
          $in: [userId, '$hasLikes.userId']
        }
      }
    },
    {
      $project: {
        hasLikes: 0
      }
    },
    { $sort: { _id: -1 } }
  ]
  if (options.next) {
    items = await PostModel.aggregate([
      ...option,
      {
        $match: {
          userId,
          _id: { $lt: new ObjectId(options.next) },
          imgs: { $ne: [] }
        }
      },
      { $limit: limit }
    ]).toArray()
  } else {
    items = await PostModel.aggregate([
      ...option,
      { $match: { userId, imgs: { $ne: [] } } },
      { $limit: limit }
    ]).toArray()
  }
  hasNext = items.length === limit
  return { items, hasNext }
}

/**
 * @description 个人中心喜欢的帖子列表
 * @param  next?: string
 * @param  limit?: number
 * @param  token: string
 * @returns { items , hasNext }
 */
export async function getUserLikes (options: IGetUserPosts) {
  const limit = Number(options.limit) || 10
  const { userId } = options
  let items = []
  let hasNext = false
  const limitOption = [
    {
      $limit: limit
    }
  ]
  const option = [
    ...filterDeleted,
    ...relatInfo,
    ...userInfo,
    {
      $lookup: {
        from: 'like',
        localField: '_id',
        foreignField: 'postId',
        as: 'likePosts'
      }
    },
    {
      $lookup: {
        from: 'like',
        localField: '_id',
        foreignField: 'postId',
        as: 'hasLikes'
      }
    },
    {
      $addFields: {
        isLike: {
          $in: [userId, '$hasLikes.userId']
        }
      }
    },
    {
      $project: {
        hasLikes: 0
      }
    },
    { $unwind: '$likePosts' },
    { $match: { 'likePosts.userId': userId } },
    { $sort: { _id: -1 } }
  ]
  // 查询下一页
  if (options.next) {
    items = await PostModel.aggregate([
      ...option,
      {
        $match: {
          _id: {
            $lt: new ObjectId(options.next)
          }
        }
      },
      ...limitOption
    ]).toArray()
  } else {
    // 查询第一页
    items = await PostModel.aggregate([...option, ...limitOption]).toArray()
  }
  hasNext = items.length === limit
  return {
    items,
    hasNext
  }
}

/**
 * @description 聚合查询关注的人,以及自己的帖子，按时间排序
 * @param  next?: string
 * @param  limit?: number
 * @returns { items , hasNext  }
 */
export async function getHomePosts (options: IGetFollowPosts) {
  const limit = Number(options.limit) || 10
  const token = options.token
  const userId = (await getSession(token)).userId
  let items = []
  let hasNext = false
  const limitOption = [
    {
      $limit: limit
    }
  ]
  const option = [
    ...filterDeleted,
    ...userInfo,
    ...relatInfo,
    {
      $lookup: {
        from: 'follow',
        localField: 'userId',
        foreignField: 'followId',
        as: 'follow'
      }
    },
    {
      $lookup: {
        from: 'like',
        localField: '_id',
        foreignField: 'postId',
        as: 'hasLikes'
      }
    },
    {
      $addFields: {
        isLike: {
          $in: [userId, '$hasLikes.userId']
        }
      }
    },
    {
      $project: {
        hasLikes: 0
      }
    },
    {
      $match: {
        $or: [{ userId }, { 'follow.userId': userId }]
      }
    },
    // { $match: { type: { $ne: EPostType.Comment } } },
    {
      $sort: {
        _id: -1
      }
    },
    {
      $project: {
        follow: 0
      }
    }
  ]
  // 查询下一页
  if (options.next) {
    items = await PostModel.aggregate([
      ...option,
      {
        $match: {
          _id: {
            $lt: new ObjectId(options.next)
          }
        }
      },
      ...limitOption
    ]).toArray()
  } else {
    // 查询第一页
    items = await PostModel.aggregate([...option, ...limitOption]).toArray()
  }
  hasNext = items.length === limit
  return {
    items,
    hasNext
  }
}

/**
 * @description 创建帖子
 * @param token
 * @param content
 * @param imgs
 * @returns
 */
export async function createPost (props: ICreatePost) {
  const { token, content, imgs } = props
  const userId = (await getSession(token)).userId
  const post: IPost = {
    userId,
    relationId: null,
    type: EPostType.Post,
    imgs,
    content,
    likes: 0,
    comments: 0,
    forwards: 0,
    createdAt: Date.now()
  }
  const res = await PostModel.insertOne(post)
  return res.insertedId
}

/**
 * @description 创建评论
 * @param token
 * @param relationId
 * @param content
 * @param imgs
 */
export async function createComment (props: ICreatePost) {
  const { token, relationId, content, imgs } = props
  const post = await PostModel.findOneAndUpdate(
    { _id: new ObjectId(relationId) },
    { $inc: { comments: 1 } }
  )
  check(post.value.type !== EPostType.Delete, postErrorStat.ERR_POST_IS_DELETED)
  check(!!post.value, postErrorStat.ERR_POST_NOT_FOUND)
  const userId = (await getSession(token)).userId
  const comment: IPost = {
    userId,
    relationId: new ObjectId(relationId),
    type: EPostType.Comment,
    imgs,
    content,
    likes: 0,
    comments: 0,
    forwards: 0,
    createdAt: Date.now()
  }
  const res = await PostModel.insertOne(comment)
  if (userId !== post.value.userId) {
    await createNotify({
      type: ENotifyType.Comment,
      senderId: userId,
      receiverId: post.value.userId,
      relationId,
      content: ''
    })
  }
  return res.insertedId
}

/**
 * @description 创建转发
 * @param token
 * @param relationId
 * @param content
 * @param imgs
 */
export async function createForward (props: ICreatePost) {
  const { token, relationId, content, imgs } = props
  const post = await PostModel.findOneAndUpdate(
    { _id: new ObjectId(relationId) },
    { $inc: { forwards: 1 } }
  )
  check(post.value.type !== EPostType.Delete, postErrorStat.ERR_POST_IS_DELETED)
  check(!!post.value, postErrorStat.ERR_POST_NOT_FOUND)
  const userId = (await getSession(token)).userId
  const forward: IPost = {
    userId,
    relationId: new ObjectId(relationId),
    type: EPostType.Forward,
    imgs,
    content,
    likes: 0,
    comments: 0,
    forwards: 0,
    createdAt: Date.now()
  }
  const res = await PostModel.insertOne(forward)
  if (userId !== post.value.userId) {
    await createNotify({
      type: ENotifyType.Forward,
      senderId: userId,
      receiverId: post.value.userId,
      relationId: String(res.insertedId),
      content: ''
    })
  }
  return res.insertedId
}

/**
 * @description 获取详情
 * @param _id 帖子id
 * @returns post
 */
export async function getDetail ({ _id: id, token }: IGetDetail) {
  check(
    /^[A-Fa-f0-9]{1,24}$/.test(id) && id.length === 24,
    postErrorStat.ERR_POST_NOT_FOUND
  )
  const _id = new ObjectId(id)
  const userId = (await getSession(token)).userId
  const likeInfo = [
    {
      $lookup: {
        from: 'like',
        localField: '_id',
        foreignField: 'postId',
        as: 'hasLikes'
      }
    },
    {
      $addFields: {
        isLike: {
          $in: [userId, '$hasLikes.userId']
        }
      }
    },
    {
      $project: {
        hasLikes: 0
      }
    }
  ]
  const post = (
    await PostModel.aggregate([
      { $match: { _id } },
      ...relatInfo,
      ...userInfo,
      ...likeInfo
    ]).toArray()
  )[0]
  check(!!post, postErrorStat.ERR_POST_NOT_FOUND)
  if (post.type === EPostType.Delete) {
    post.content = '帖子已删除'
    post.imgs = []
  }
  return post
}
/**
 * @description 获取帖子底下的评论
 * @param _id 帖子id
 * @returns post
 */
export async function getDetailComments (options: IGetComments) {
  const limit = Number(options.limit) || 10
  const { _id: id, token } = options
  const userId = (await getSession(token)).userId
  const _id = new ObjectId(id)
  let items = []
  let hasNext = false
  const likeInfo = [
    {
      $lookup: {
        from: 'like',
        localField: '_id',
        foreignField: 'postId',
        as: 'hasLikes'
      }
    },
    {
      $addFields: {
        isLike: {
          $in: [userId, '$hasLikes.userId']
        }
      }
    },
    {
      $project: {
        hasLikes: 0
      }
    }
  ]
  const option = [
    ...filterDeleted,
    ...relatInfo,
    ...userInfo,
    ...likeInfo,
    { $sort: { _id: -1 } }
  ]
  if (options.next) {
    items = await PostModel.aggregate([
      ...option,
      {
        $match: {
          relationId: _id,
          _id: { $lt: new ObjectId(options.next) },
          type: EPostType.Comment
        }
      },
      { $match: { userId } },
      { $limit: limit }
    ]).toArray()
  } else {
    items = await PostModel.aggregate([
      ...option,
      {
        $match: {
          relationId: _id,
          type: EPostType.Comment
        }
      },
      { $limit: limit }
    ]).toArray()
  }
  hasNext = items.length === limit
  return { items, hasNext }
}
/**
 * @description 删除帖子以及它的评论
 * @param _id 帖子id
 */
export async function delPost ({ _id: id }: IDelPost) {
  const _id = new ObjectId(id)
  const post = await PostModel.findOne({ _id })
  check(!!post, postErrorStat.ERR_POST_NOT_FOUND)
  await PostModel.updateOne({ _id }, { $set: { type: EPostType.Delete } })
  const comments = await PostModel.find({
    relationId: _id,
    type: EPostType.Comment
  }).toArray()
  comments.forEach(async (comment) => {
    delPost({ _id: String(comment._id) })
  })
}

/**
 * @description 点赞帖子
 * @param _id 帖子id
 */
export async function thumbsUp ({ _id: id, token }: IThumbsUp) {
  const _id = new ObjectId(id)
  const userId = (await getSession(token)).userId
  const exist = await LikeModel.findOne({ postId: _id, userId })
  check(!exist, postErrorStat.ERR_POST_ALREADY_THUMBS_UP)
  const like = {
    postId: _id,
    userId,
    createdAt: Date.now()
  } as ILikes
  await LikeModel.insertOne(like)
  const post = await PostModel.findOneAndUpdate({ _id }, { $inc: { likes: 1 } })
  check(!!post.value, postErrorStat.ERR_POST_NOT_FOUND)
}

/**
 * @description 取消点赞帖子
 * @param _id 帖子id
 */
export async function cancelThumbsUp ({ _id: id, token }: IThumbsUp) {
  const _id = new ObjectId(id)
  const userId = (await getSession(token)).userId
  const like = await LikeModel.findOneAndDelete({ userId, postId: _id })
  check(!!like.value, postErrorStat.ERR_POST_NOT_FOUND)
  const post = await PostModel.findOneAndUpdate(
    { _id },
    { $inc: { likes: -1 } }
  )
  check(!!post.value, postErrorStat.ERR_POST_NOT_FOUND)
}
