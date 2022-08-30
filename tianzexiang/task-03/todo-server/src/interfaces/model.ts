import { ObjectId } from 'mongodb'
import {
  ETaskDeleteStat,
  ETaskFinishStat,
  ETaskImportantStat,
  EUserStat,
} from '../enums/model'

// task model
export interface ITask {
  // task content
  content: string
  // did task finished
  finished: ETaskFinishStat
  // is task important
  important: ETaskImportantStat
  // belongs to which user
  userId: ObjectId
  // when task created
  createAt: number
  // is delete
  isDelete: ETaskDeleteStat
}

// user model
export interface IUser {
  account: string
  nickname: string
  // hmac pwd
  password: string
  salt: string
  status: EUserStat
  // when user created
  createdAt: number
}

// session model
export interface ISession {
  // session id
  sid: string
  // user id
  userId: ObjectId
  // login ip
  ip: string
  // session create time
  createdAt: Date
}
