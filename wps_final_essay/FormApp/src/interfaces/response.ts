import { IForm, IFormResult } from './form'
import { IProblem, IProblemType, IStarProblem, TProblemType } from './problem'
import { IUser } from './user'

// 没有返回数据的响应类型
export interface IRes {
  stat: string,
  msg?: string
}

// 返回的数据中只有id
export interface IIdRes extends IRes{
  data?: { id: string }
}

// 返回数据为用户信息
export interface IUserRes extends IRes {
  data?: { user: IUser }
}

// 返回表单列表信息和总条数
export interface IFormListRes extends IRes {
  data?: { items: IForm[], total: number }
}

// 返回单个表单信息
export interface ISingleFormRes extends IRes{
  data?: { item: IForm }
}

// 返回表单填写详情
export interface IFormResultRes extends IRes {
  data?: { info: IForm, items: IFormResult[] }
}

// 返回单个表单填写详情
export interface IFormDetailRes extends IRes {
  data?: { item: IFormResult }
}

// 返回基础题目类型
export interface IProblemRes extends IRes {
  data?: { problemTypes: IProblemType[] }
}

// 返回基础题目
export interface IBasicProblemRes extends IRes {
  data?: { basicProblems: Omit<IProblem<TProblemType>, 'result'>[] }
}

// 返回所有收藏的题目
export interface IStarProblemRes extends IRes{
  data?: { items: IStarProblem<TProblemType>[] }
}
