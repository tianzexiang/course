import { ITask } from './model'

export interface IResp {
  status: number
  code: number
  msg?: string
  data?: unknown
}

export interface IRespTask extends Omit<ITask, 'isDelete' | 'userId'> {
  _id: string
}

export interface IPartialTask extends IResp {
  data: {
    tasks: IRespTask[]
    total: number
  }
}

export interface IRegister {
  nickname: string
  username: string
  password: string
}

export type ILogin = Omit<IRegister, 'nickname'>

export interface IChangePwd {
  password: string
  old_password: string
}

export interface ISetUserInfo {
  nickname: string
}

export interface ICreateTask {
  content: string
}

export interface IGetPartialTask {
  limit: number
  offset: number
}

export interface ISetTask {
  taskId: string
  status: number
}

export type IDeleteTask = Pick<ISetTask, 'taskId'>
