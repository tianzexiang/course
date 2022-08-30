// 题目类型
export type TProblemType =
  | 'input'
  | 'singleSelect'
  | 'multiSelect'
  | 'pullSelect'
  | 'date'
  | 'time'
  | 'score';

// 基础题目类型
export interface IProblemType {
  title: string
  type: TProblemType
}

// 选项状态
export enum ESelectOptionStatus {
  delete = 1,
  normal,
}

// 选项
export interface ISelectOption {
  id: string
  title: string
  status: ESelectOptionStatus
}

// 单选题结果
export interface ISingleResult {
  value: Omit<ISelectOption, 'status'>
}

// 多选题结果
export interface IMultiResult {
  value: Omit<ISelectOption, 'status'>[]
}

// 填空题结果
export interface IInputResult {
  value: string
}

// 分数题结果
export interface IScoreResult {
  value: number
}

// 题目结果
export type TResult<T extends TProblemType> = T extends 'singleSelect'
  ? ISingleResult
  : T extends 'multiSelect'
  ? IMultiResult
  : T extends 'pullSelect'
  ? ISingleResult
  : T extends 'score'
  ? IScoreResult
  : IInputResult

// 选择设置
export interface ISelectSetting {
  options: ISelectOption[]
  // other: boolean;
}

// 题目设置
export type TSetting<T extends TProblemType> = T extends 'singleSelect'
  ? ISelectSetting
  : T extends 'multiSelect'
  ? ISelectSetting
  : T extends 'pullSelect'
  ? ISelectSetting
  : null;

export enum EStatus {
  delete = 1,
  normal,
}

// 表单题目
export type IProblem<Type extends TProblemType> = {
  id?: string
  type: Type
  title: string
  required: boolean
  setting: TSetting<Type>
  result?: TResult<Type>
}

// 标星问题
export interface IStarProblem<Type extends TProblemType> {
  id: string
  uId: string
  problem: Omit<IProblem<Type>, 'result' | 'id' | 'status'>;
  status: EStatus
}
