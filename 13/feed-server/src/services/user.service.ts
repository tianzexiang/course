import { ENotifyType, EUserStatus } from '../enums/model'
import { IRegister } from '../interfaces/request/auth'
import { IPagination } from '../interfaces/request/post'
import {
  ISetUserInfo,
  IFollowUser,
  IUnfollowUser
} from '../interfaces/request/user'
import { getUUId } from '../libs/crypto'
import { userErrorStat } from '../libs/stat/user'
import { check } from '../middlewares/check'
import { UserModel } from '../models/user.model'
import {
  countAllFollows,
  countAllSubscribes,
  follow,
  getFollows,
  getSubscribes,
  hasFollowed,
  unfollow
} from './follow.service'
import { createNotify } from './notify.service'
import { getUserLikes, getUserPhotoPosts, getUserPosts } from './post.service'
import {
  createSession,
  deleteSession,
  getSession,
  getSessionByUid
} from './session.service'

/**
 * @description 创建用户
 * @param  params: IRegister 注册参数
 * @return {id: string}
 */
export async function createUser ({
  userId,
  nickname,
  avatar,
  openId
}: IRegister) {
  const isUserRegister = await UserModel.findOne({
    openId
  })
  check(!isUserRegister, userErrorStat.ERR_USER_EXIST)
  const isUserIdExist = await UserModel.findOne({
    userId
  })
  check(!isUserIdExist, userErrorStat.ERR_ACCOUNT_EXIST)
  const res = await UserModel.insertOne({
    openId,
    userId,
    avatar,
    nickname,
    banner: '',
    bio: '',
    createdAt: Date.now(),
    status: EUserStatus.Normal
  })
  return { id: res.insertedId }
}

/**
 * @description 登录
 * @param  openId: string 微信openId
 * @param  ip: string ip地址
 * @return {sid: string}
 */
export async function login (openId: string, ip: string) {
  const user = await UserModel.findOne({
    openId
  })
  check(!!user, userErrorStat.ERR_ACCOUNT_NOT_FOUND)
  // whether the user is allowed to login
  check(user.status === EUserStatus.Normal, userErrorStat.ERR_USER_FORBIDDEN)
  // whether the session is exist
  const session = await getSessionByUid(user.userId)
  // whether need to add session
  if (!session) {
    const sid = getUUId()
    await createSession({
      userId: user.userId,
      sid,
      createdAt: new Date(),
      ip
    })
    return { sid }
  } else return { sid: session.sid }
}

/**
 * @description 登出
 * @param  token: string sid
 * @return {sid: string}
 */
export async function logout (token: string) {
  const res = await deleteSession(token)
  return res
}

/**
 * @description 得到用户信息
 * @param  currLoginUserToken: string 当前登录用户sid
 * @param  otherUserId?: string 其他用户userId
 * @return WithId<IUser> & {followCounts: number, subscribeCounts: number}
 */
export async function getUserInfo (
  currLoginUserToken: string,
  otherUserId?: string
) {
  const currLoginUserId = (await getSession(currLoginUserToken)).userId
  const userId = otherUserId || currLoginUserId
  const user = await UserModel.findOne({
    userId,
    status: EUserStatus.Normal
  })
  check(!!user, userErrorStat.ERR_ACCOUNT_NOT_FOUND)
  const allFollows = await countAllFollows(userId)
  const allSubscribes = await countAllSubscribes(userId)
  const hasFollowed = otherUserId
    ? await hasFollowedBetweenUsers(currLoginUserId, otherUserId)
    : false
  return {
    ...user,
    hasFollowed,
    followCounts: allFollows,
    subscribeCounts: allSubscribes
  }
}

/**
 * @description 更新用户信息
 * @param  token: string sid
 * @param  params: ISetUserInfo 更新信息
 * @return WithId<IUser> & {followCounts: number, subscribeCounts: number}
 */
export async function setUserInfo (token: string, params: ISetUserInfo) {
  const userId = (await getSession(token)).userId
  const user = await UserModel.findOne({
    userId,
    status: EUserStatus.Normal
  })
  check(!!user, userErrorStat.ERR_ACCOUNT_NOT_FOUND)
  // 若没有传则赋数据库初值
  const {
    nickname = user.nickname,
    avatar = user.avatar,
    bio = user.bio,
    banner = user.banner
  } = params

  const res = await UserModel.findOneAndUpdate(
    {
      userId,
      status: EUserStatus.Normal
    },
    {
      $set: {
        nickname,
        avatar,
        bio,
        banner
      }
    }
  )
  const allFollows = await countAllFollows(userId)
  const allSubscribes = await countAllSubscribes(userId)
  return {
    ...res.value,
    nickname,
    avatar,
    bio,
    banner,
    hasFollowed: false,
    followCounts: allFollows,
    subscribeCounts: allSubscribes
  }
}

/**
 * @description 得到我的关注用户信息
 * @param  currLoginUserToken: string 当前登录用户sid
 * @param  pagination: IPagination
 * @param  otherUserId?: string 其他用户userId
 * @return {items: IFollowUserResp[], hasNext: boolean}
 */
export async function getFollowUserInfo (
  currLoginUserToken: string,
  pagination: IPagination,
  otherUserId?: string
) {
  const user = await getUserInfo(currLoginUserToken, otherUserId)
  const currLoginUser = await getUserInfo(currLoginUserToken)
  const follows = await getFollows(
    user.userId,
    pagination,
    currLoginUser.userId
  )
  return follows
}

/**
 * @description 得到关注我的用户信息
 * @param  token: string sid
 * @param  pagination: IPagination
 * @param  currLoginUserToken: string 当前登录用户sid
 * @return {items: IFollowUserResp[], hasNext: boolean}
 */
export async function getSubscribeUserInfo (
  currLoginUserToken: string,
  pagination: IPagination,
  otherUserId?: string
) {
  const user = await getUserInfo(currLoginUserToken, otherUserId)
  const currLoginUser = await getUserInfo(currLoginUserToken)
  const subscribes = await getSubscribes(
    user.userId,
    pagination,
    currLoginUser.userId
  )
  return subscribes
}

/**
 * @description 得到用户中心自己创建的帖子
 * @param  currLoginUserToken: string 当前登录用户sid
 * @param  pagination: IPagination
 * @param  otherUserId?: string 其他用户userId
 * @return {items: ?[], hasNext: boolean}
 */
export async function getUserHomePosts (
  currLoginUserToken: string,
  pagination: IPagination,
  otherUserId?: string
) {
  const user = await getUserInfo(currLoginUserToken, otherUserId)
  const res = await getUserPosts({ userId: user.userId, ...pagination })
  return res
}

/**
 * @description 得到用户中心自己创建的帖子
 * @param  currLoginUserToken: string 当前登录用户sid
 * @param  pagination: IPagination
 * @param  otherUserId?: string 其他用户userId
 * @return {items: ?[], hasNext: boolean}
 */
export async function getUserHomePhotoPosts (
  currLoginUserToken: string,
  pagination: IPagination,
  otherUserId?: string
) {
  const user = await getUserInfo(currLoginUserToken, otherUserId)
  const res = await getUserPhotoPosts({ userId: user.userId, ...pagination })
  return res
}

/**
 * @description 得到用户中心自己创建的帖子
 * @param  currLoginUserToken: string 当前登录用户sid
 * @param  pagination: IPagination
 * @param  otherUserId?: string 其他用户userId
 * @return {items: ?[], hasNext: boolean}
 */
export async function getUserHomeLikes (
  currLoginUserToken: string,
  pagination: IPagination,
  otherUserId?: string
) {
  const user = await getUserInfo(currLoginUserToken, otherUserId)
  const res = await getUserLikes({ userId: user.userId, ...pagination })
  return res
}

/**
 * @description 关注某用户
 * @param  token: string sid
 * @param  { id: followId }: IFollowUser 关注用户id
 * @return {id: ObjectId}
 */
export async function followUser (token: string, { id: followId }: IFollowUser) {
  const userId = (await getSession(token)).userId
  const user = await UserModel.findOne({
    userId,
    status: EUserStatus.Normal
  })
  check(!!user, userErrorStat.ERR_ACCOUNT_NOT_FOUND)
  const res = await follow(userId, followId)
  if (res.id) {
    await createNotify({
      type: ENotifyType.Follow,
      senderId: userId,
      receiverId: followId,
      relationId: null,
      content: ''
    })
  }
  return res
}

/**
 * @description 取关某用户
 * @param  token: string sid
 * @param  { id: followId }: IFollowUser 关注用户id
 * @return {id: ObjectId}
 */
export async function unfollowUser (
  token: string,
  { id: followId }: IUnfollowUser
) {
  const userId = (await getSession(token)).userId
  const user = await UserModel.findOne({
    userId,
    status: EUserStatus.Normal
  })
  check(!!user, userErrorStat.ERR_ACCOUNT_NOT_FOUND)
  await unfollow(userId, followId)
}

/**
 * @description 查看我与另一个用户之间是否关注
 * @param  currLoginUserId string 登录用户id
 * @param  userId  目标用户id
 * @return { hasFollowed: boolean }
 */
export async function hasFollowedBetweenUsers (
  currLoginUserId: string,
  userId: string
) {
  const res = await hasFollowed(currLoginUserId, userId)
  return res
}

/**
 * @description 是否登录
 * @param  token: string sid
 * @return
 */
export async function checkToken (token: string) {
  const isLogin = await getSession(token)
  // whether the session is exist
  check(!!isLogin, userErrorStat.ERR_USER_NOT_LOGIN)
}

/**
 * @description 是否已注册
 * @param  openId: string 微信openId
 * @return boolean
 */
export async function isRegistered (openId: string) {
  const hasUser = await UserModel.findOne({
    openId,
    status: EUserStatus.Normal
  })
  return !!hasUser
}
