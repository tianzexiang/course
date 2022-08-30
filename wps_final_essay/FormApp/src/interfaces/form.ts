import { TProblemType, EStatus, IProblem } from './problem'

//  表单模块
export interface IFormModule {
  id: string
  formId: string
  ctime: string
  status: EStatus
  problems: IProblem<TProblemType>[]
}

// 表单结果
export interface IFormResult {
  id: string
  formAuthor: string
  formId: string
  result: IProblem<TProblemType>[]
}

// 表单状态
export enum EFormStatus {
  delete = 1,
  normal,
  ing,
  end,
}

// 表单
export interface IForm {
  id: string
  title: string
  subTitle: string
  status: EFormStatus
  ctime: number
  utime: number
  author: string
  isStar: boolean
  // setting: ISetting;
  problems: IProblem<TProblemType>[]
}
