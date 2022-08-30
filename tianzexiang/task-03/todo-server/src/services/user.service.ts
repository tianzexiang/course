import { UserModel } from '../models/user.model'
import {
  createSession,
  deleteSession,
  getSession,
  getSessionByUid,
} from './session.service'
import { userErrorStat } from '../libs/stat/user'
import { check } from '../middlewares/check'
import { getHmacPWD, getSalt, getUUId } from '../libs/crypto'
import { ILogin, IRegister } from '../interfaces/request'
import { EUserStat } from '../enums/model'

export async function createUser(userInfo: IRegister) {
  // find whether account is exist
  const isUserAccountExist = await UserModel.findOne({
    account: userInfo.username,
  })
  check(!isUserAccountExist, userErrorStat.ERR_ACCOUNT_EXIST)
  const salt = getSalt(12)
  const passwordSecret = getHmacPWD(userInfo.password, salt)
  const user = await UserModel.insertOne({
    account: userInfo.username,
    nickname: userInfo.nickname,
    password: passwordSecret,
    salt: salt,
    status: EUserStat.Normal,
    createdAt: Date.now(),
  })
  return user.insertedId
}

export async function login(loginInfo: ILogin, ip: string) {
  // find whether account is exist
  const user = await UserModel.findOne({
    account: loginInfo.username,
  })
  // whether the account is not found
  check(!!user, userErrorStat.ERR_ACCOUNT_NOT_FOUND)
  // whether the user is not allowed to login
  check(user.status === EUserStat.Normal, userErrorStat.ERR_USER_FORBIDDEN)
  // get login password secret
  const passwordSecret = getHmacPWD(loginInfo.password, user.salt)
  // whether the password is correct
  check(user.password === passwordSecret, userErrorStat.ERR_PWD_NOT_CORRECT)
  // whether the session is exist
  const session = await getSessionByUid(user._id)
  // whether need to add session
  if (!session) {
    const sid = getUUId()
    await createSession({
      userId: user._id,
      sid,
      createdAt: new Date(),
      ip,
    })
    return sid
  } else return session.sid
}

export async function logout(token: string) {
  const res = await deleteSession(token)
  return res
}

export async function getUserInfo(token: string) {
  const session = await getSession(token)
  const user = await UserModel.findOne(
    {
      _id: session.userId,
      status: {
        $ne: EUserStat.Disabled,
      },
    },
    {
      projection: {
        nickname: 1,
        createdAt: 1,
      },
    }
  )
  check(!!user, userErrorStat.ERR_USER_NOT_FOUND)
  return user
}

export async function changePwd(token: string, pwd: string, oldPwd: string) {
  const session = await getSession(token)
  const user = await UserModel.findOne({
    _id: session.userId,
    status: {
      $ne: EUserStat.Disabled,
    },
  })
  // whether the user is exist
  check(!!user, userErrorStat.ERR_USER_NOT_FOUND)
  const oldPwdSecret = getHmacPWD(oldPwd, user.salt)
  // whether the two password is equal
  check(oldPwdSecret === user.password, userErrorStat.ERR_OLD_PWD_NOT_CORRECT)
  const pwdSecret = getHmacPWD(pwd, user.salt)
  const res = await UserModel.updateOne(
    { password: user.password },
    { $set: { password: pwdSecret } }
  )
  return res
}

export async function setUserInfo(token: string, nickname: string) {
  const session = await getSession(token)
  const user = await UserModel.findOne({
    _id: session.userId,
    status: {
      $ne: EUserStat.Disabled,
    },
  })
  check(!!user, userErrorStat.ERR_USER_NOT_FOUND)
  await UserModel.updateOne(
    { nickname: user.nickname },
    { $set: { nickname: nickname } }
  )
}

export async function checkToken(token: string) {
  const isLogin = await getSession(token)
  // whether the session is exist
  check(!!isLogin, userErrorStat.ERR_USER_NOT_LOGIN)
}
