import { EStatus } from './problem'

// 用户
export interface IUser {
  id: string
  nickname: string
  account: string
  status: EStatus
  pwd: string
  avatar: string
  ctime: number
  utime: number
}
