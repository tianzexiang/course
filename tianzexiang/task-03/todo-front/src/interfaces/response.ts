import { ITask } from "./task"

export interface IResp<T = unknown> {
  status: number
  code: number
  msg?: string
  data?: T
}

export interface IGetTasksResp {
  tasks: ITask[]
  total: number
}

export interface IGetUserInfoResp {
  nickname: string
  createAt: number
  _id: string
}