// 该文件包含所有的请求参数
import { IProblem, TProblemType } from './problem'
// 登录参数
export interface ILoginParams {
  account: string
  pwd: string
}

// 注册参数
export interface IRegisterParams {
  account: string,
  pwd: string
  confirmPwd: string
}

// 设置用户信息参数
export interface ISetInfoParams {
  nickname: string,
  avatar: string
}

// 修改密码参数
export interface IChangePwdParams {
  oldPwd: string,
  pwd: string,
  confirmPwd: string
}

// 获取表单列表参数
export interface IListParams {
  offset: number // 当前页
  limit?: number // 每页条数
  isStar?: boolean
}

// 创建表单参数
export interface ICreateFormParams {
  title: string;
  subTitle: string;
  problems: (IProblem<TProblemType> & { isNew: boolean })[];
}

// 填写表单参数
export interface IInputParams {
  formId: string
  problems: Required<IProblem<TProblemType>>[]
}

// 收藏题目
export interface IStarParams {
  problem: Omit<IProblem<TProblemType>, 'result' | 'id' | 'status'>;
}
