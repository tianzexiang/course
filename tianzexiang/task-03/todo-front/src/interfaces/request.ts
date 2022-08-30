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

export interface ISetTask {
  taskId: string
  status: number
}

export type IDeleteTask = Pick<ISetTask, 'taskId'>
