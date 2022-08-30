import { defineStore } from 'pinia'
import { IForm, IFormResult } from '@/interfaces/form'
import { ESelectOptionStatus, IInputResult, IMultiResult, IProblem, IScoreResult, ISelectSetting, ISingleResult, TProblemType, TResult } from '@/interfaces/problem'
import { ElMessage, FormItemRule } from 'element-plus'
import { fill, remove, cloneDeep } from 'lodash-es'
import { inputForm, getFormResult, getForm, createForm, startForm } from '@/api/form'
import { ResultEnum } from '@/enums/httpEnum'
import { IIdRes, IRes } from '@/interfaces/response'
import { ICreateFormParams } from '@/interfaces/request'
import { nanoid } from 'nanoid'

// value接口
export type TPropItemValue = string | string[] | number
export interface IPropItem extends IProblem<TProblemType> {
  id: string
  value: TPropItemValue,
  rules: FormItemRule | FormItemRule[]
}

// formProp接口
export interface IFormProp {
  problems: IPropItem[]
}

// 更新问题接口
export interface IUpdateProblem extends IProblem<TProblemType> {
  isNew: boolean
}

// formState 接口
export interface IFormState {
  form: IForm
  formResult: IFormResult[],
  formInputProp: IFormProp,
  newFormSettings: ICreateFormParams,
  problemCardStatusList: {isSelected: boolean}[], // 问题卡片状态
  newAddProblemIndex: number // 最新增加的问题序号
}

export class Problem implements IUpdateProblem {
  id?: string | undefined
  type: TProblemType
  title: string
  required: boolean
  setting: ISelectSetting | null
  result?: IInputResult | ISingleResult | IMultiResult | IScoreResult | undefined = undefined
  isNew: boolean
  constructor (id: string | undefined, type: TProblemType, title: string, required: boolean, setting: ISelectSetting | null, isNew: boolean) {
    this.id = id
    this.type = type
    this.title = title
    this.required = required
    this.setting = setting
    this.isNew = isNew
  }
}

// 打分题校验方法
function scorePropValidate (_rule: unknown, value: number, callback: (err?: Error) => unknown) {
  if (value === 0) {
    callback(new Error('该项不能为空'))
  } else callback()
}

export const useFormStore = defineStore({
  id: 'form',
  state: (): IFormState => {
    return {
      form: { // 表单
        id: '',
        title: '',
        subTitle: '',
        status: -1,
        ctime: -1,
        utime: -1,
        author: '',
        isStar: false,
        problems: []
      },
      formResult: [], // 表单所有结果
      formInputProp: { // 填写表单属性
        problems: []
      },
      newFormSettings: { // 新建表单设定
        title: '',
        subTitle: '',
        problems: []
      },
      problemCardStatusList: [],
      newAddProblemIndex: 0
    }
  },
  persist: {
    enabled: true,
    // 自定义持久化参数
    strategies: [
      {
        // 自定义key
        key: 'form_store',
        // 自定义存储方式，默认sessionStorage
        storage: sessionStorage,
        // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
        paths: ['formInputProp', 'form', 'problemCardStatusList']
      }
    ]
  },
  getters: {},

  actions: {
    // 数据转换 问题到表单
    problemToFormProp (problems: IProblem<TProblemType>[]): IFormProp {
      const _problems = problems.map(val => ({
        ...val,
        id: val.id ? val.id : nanoid(),
        value: val.result ? (val.result.value) as TPropItemValue : '',
        rules: {
          required: val.required,
          message: '该项不能为空',
          trigger: 'change'
        }
      })).map(problem => {
        if (problem.type === 'singleSelect' || problem.type === 'pullSelect') {
          return {
            ...problem,
            value: problem.result ? (problem.result as TResult<'singleSelect'>).value.id : ''
          }
        } else if (problem.type === 'multiSelect') {
          return {
            ...problem,
            value: problem.result ? (problem.result as TResult<'multiSelect'>).value.map(val => val.id) : []
          }
        } else if (problem.type === 'score') {
          return {
            ...problem,
            value: problem.result ? (problem.result as TResult<'score'>).value : 0,
            rules: {
              validator: scorePropValidate,
              required: problem.required,
              trigger: 'change'
            }
          }
        } else return problem
      })
      return {
        problems: _problems
      }
    },
    // 数据转换 表单到问题
    formPropToProblem (formProp: IFormProp): Required<IProblem<TProblemType>>[] {
      const problems = formProp.problems.map(val => {
        const { value, rules, ...rest } = val
        return {
          rest, rules, value
        }
      }).map(problem => {
        if (problem.rest.type === 'singleSelect' || problem.rest.type === 'pullSelect') {
          return {
            ...problem.rest,
            result: {
              value: {
                id: problem.value as string,
                title: problem.rest.setting?.options.filter(val => val.id === problem.value as string)[0].title || ''
              }
            }
          }
        } else if (problem.rest.type === 'multiSelect') {
          return {
            ...problem.rest,
            result: {
              value: problem.rest.setting?.options.filter(val => (problem.value as string[]).includes(val.id)).map(option => ({
                id: option.id,
                title: option.title
              })) || []
            }
          }
        } else if (problem.rest.type === 'score') {
          return {
            ...problem.rest,
            result: {
              value: problem.value as number
            }
          }
        } else {
          return {
            ...problem.rest,
            result: {
              value: problem.value as string
            }
          }
        }
      })
      return problems
    },
    // 初始化表单
    initFormProp (formProp: IFormProp): void {
      formProp.problems.forEach(problem => {
        if (problem.type === 'multiSelect') {
          (problem.value as string[]).splice(0, (problem.value as string).length)
        } else if (problem.type === 'score') {
          problem.value = 0
        } else {
          problem.value = ''
        }
      })
    },
    // 得到表单prop
    getFormProp (problems: IProblem<TProblemType>[], init: boolean) {
      if (init) {
        const formProp = this.problemToFormProp(problems)
        this.initFormProp(formProp)
        return formProp
      } else return this.problemToFormProp(problems)
    },
    // 提交表单
    submitForm (formProp: IFormProp) {
      const problems = this.formPropToProblem(formProp)
      return new Promise<IRes>((resolve, reject) => {
        inputForm({
          formId: this.form.id,
          problems
        }).then(res => resolve(res)).catch(err => reject(err))
      })
    },
    // 得到表单结果列表
    async getFormResultList (formId: string) {
      try {
        const res = await getFormResult(formId)
        if (res.stat === ResultEnum.SUCCESS && res.data !== undefined) {
          this.formResult = res.data.items
        }
      } catch (err) { }
    },
    // 根据formId得到单个表单
    async getFormById (formId: string) {
      try {
        const res = await getForm(formId)
        if (res.stat === ResultEnum.SUCCESS && res.data !== undefined) {
          this.form = res.data.item
        }
      } catch (err) { }
    },
    // 创建表单问题
    createProblem (type: TProblemType): IUpdateProblem | null {
      let createdProblem: IUpdateProblem
      if (type === 'input') {
        createdProblem = new Problem(nanoid(), 'input', '', false, null, true)
        return createdProblem
      } else if (type === 'date') {
        createdProblem = new Problem(nanoid(), 'date', '', false, null, true)
        return createdProblem
      } else if (type === 'time') {
        createdProblem = new Problem(nanoid(), 'time', '', false, null, true)
        return createdProblem
      } else if (type === 'score') {
        createdProblem = new Problem(nanoid(), 'score', '', false, null, true)
        return createdProblem
      } else if (type === 'singleSelect') {
        const setting: ISelectSetting = {
          options: [
            {
              id: nanoid(),
              title: '',
              status: ESelectOptionStatus.normal
            },
            {
              id: nanoid(),
              title: '',
              status: ESelectOptionStatus.normal
            }
          ]
        }
        createdProblem = new Problem(nanoid(), 'singleSelect', '', false, setting, true)
        return createdProblem
      } else if (type === 'pullSelect') {
        const setting: ISelectSetting = {
          options: [
            {
              id: nanoid(),
              title: '',
              status: ESelectOptionStatus.normal
            },
            {
              id: nanoid(),
              title: '',
              status: ESelectOptionStatus.normal
            }
          ]
        }
        createdProblem = new Problem(nanoid(), 'pullSelect', '', false, setting, true)
        return createdProblem
      } else if (type === 'multiSelect') {
        const setting: ISelectSetting = {
          options: [
            {
              id: nanoid(),
              title: '',
              status: ESelectOptionStatus.normal
            },
            {
              id: nanoid(),
              title: '',
              status: ESelectOptionStatus.normal
            }
          ]
        }
        createdProblem = new Problem(nanoid(), 'multiSelect', '', false, setting, true)
        return createdProblem
      } else return null
    },
    // 添加表单问题
    addFormProblem (type: TProblemType, start?: number): boolean {
      const createdProblem = this.createProblem(type)
      return this.addFormProblemCreated(createdProblem, start)
    },
    // 更新表单问题
    updateFormProblem (type: TProblemType, start: number, end: number): boolean {
      const createdProblem = this.createProblem(type)
      if (createdProblem !== null) {
        fill(this.newFormSettings.problems, createdProblem, start, end)
        return true
      } else return false
    },
    // 删除表单问题
    deleteFormProblem (problemIndex: number) {
      remove(this.newFormSettings.problems, (_, idx) => idx === problemIndex)
    },
    // 复制表单问题
    copyFormProblem (targetProblem: IUpdateProblem, start: number) {
      this.newFormSettings.problems.splice(start, 0, cloneDeep(targetProblem))
    },
    // 添加已有题目到表单
    addFormProblemCreated (createdProblem:IUpdateProblem | null, start?: number): boolean {
      if (!start) {
        if (createdProblem !== null) {
          this.newFormSettings.problems.push(createdProblem)
          return true
        } else return false
      } else {
        if (createdProblem !== null) {
          this.newFormSettings.problems.splice(start, 0, createdProblem)
          return true
        } else return false
      }
    },
    // 检验表单是否正确创建
    formValidate (): boolean {
      if (this.newFormSettings.title === '') {
        ElMessage.warning('表单标题不能为空')
        return false
      } else if (this.newFormSettings.subTitle === '') {
        ElMessage.warning('表单副标题不能为空')
        return false
      } else if (!this.newFormSettings.problems.length) {
        ElMessage.info('至少要有一个填写项')
        return false
      } else {
        let isValid = true
        for (let i = 0; i < this.newFormSettings.problems.length; i++) {
          isValid = this.problemValidate(this.newFormSettings.problems[i])
          if (!isValid) break
        }
        return isValid
      }
    },
    // 检验表单问题是否正确创建
    problemValidate (problem: IUpdateProblem): boolean {
      if (problem.title === '') {
        ElMessage.warning('问题标题不能为空')
        return false
      } else if (problem.type === 'singleSelect' || problem.type === 'pullSelect' || problem.type === 'multiSelect') {
        const index = problem.setting?.options.findIndex(val => (val.title === '' && val.status === ESelectOptionStatus.normal)) as number
        if (index !== -1) {
          ElMessage.warning('问题选项内容不能为空')
          return false
        } else return true
      } else return true
    },
    // 保存表单
    saveFormCreate () {
      return new Promise<IIdRes>((resolve, reject) => {
        createForm(this.newFormSettings).then(res => resolve(res)).catch(err => reject(err))
      })
    },
    // 发布表单
    publishForm (formId: string) {
      return new Promise<IRes>((resolve, reject) => {
        startForm(formId).then(res => resolve(res)).catch(err => reject(err))
      })
    },
    // 初始化表单
    initNewFormSettings () {
      this.newFormSettings.title = this.form.title
      this.newFormSettings.subTitle = this.form.subTitle
      this.newFormSettings.problems = this.form.problems.map(val => ({ ...val, isNew: false }))
      this.newAddProblemIndex = 0
    },
    // 重置创建表单设定
    resetNewFormSettings () {
      this.newFormSettings.title = ''
      this.newFormSettings.subTitle = ''
      this.newFormSettings.problems.splice(0, this.newFormSettings.problems.length)
      this.newAddProblemIndex = 0
    }
  }
})
