import { ISession } from '../interfaces/model'
import { SessionModel } from '../models/sessions.model'

/**
 * @description 创建session
 * @param  sessionInfo: ISession
 * @return InsertOneResult<ISession>
 */
export async function createSession (sessionInfo: ISession) {
  const res = await SessionModel.insertOne(sessionInfo)
  return res
}

/**
 * @description 删除session
 * @param  sid: string
 * @return ModifyResult<ISession>
 */
export async function deleteSession (sid: string) {
  const res = await SessionModel.findOneAndDelete({
    sid
  })
  return res
}

/**
 * @description 得到session
 * @param  sid: string
 * @return WithId<ISession>
 */
export async function getSession (sid: string) {
  const res = await SessionModel.findOne({
    sid
  })
  return res
}

/**
 * @description 得到session
 * @param  uid: string userId
 * @return WithId<ISession>
 */
export async function getSessionByUid (userId: string) {
  const res = await SessionModel.findOne({
    userId
  })
  return res
}
