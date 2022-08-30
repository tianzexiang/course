import { ObjectId } from 'mongodb'
import { ISession } from '../interfaces/model'
import { SessionModel } from '../models/sessions.model'

export async function createSession(sessionInfo: ISession) {
  const res = await SessionModel.insertOne(sessionInfo)
  return res
}

export async function deleteSession(sid: string) {
  const res = await SessionModel.findOneAndDelete({
    sid,
  })
  return res
}

export async function getSession(sid: string) {
  const res = await SessionModel.findOne({
    sid,
  })
  return res
}

export async function getSessionByUid(userId: ObjectId) {
  const res = await SessionModel.findOne({
    userId
  })
  return res
}
