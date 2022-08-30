import { ENotifyType } from '../../enums/model'
import { IPagination } from './post'

export type IGetNotify = IPagination

export interface IUpdateNotifyStatus {
  id: string // objectId
}

export interface IDeleteNotify {
  id: string // objectId
}

export interface ICreateNotify {
  type: ENotifyType
  senderId: string
  receiverId: string
  relationId: string // objectId
  content: string
}

export interface IGetHasUnread {
  id: string // objectId
}
