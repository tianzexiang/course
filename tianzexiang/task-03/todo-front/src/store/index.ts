import { createContext } from 'react'
import { IGetUserInfoResp } from '../interfaces/response'
import { ITask } from '../interfaces/task'

interface StoreContext {
  tasks: ITask[]
  setTasks: (tasks: ITask[]) => void
  userValue: IGetUserInfoResp
  setUserValue: (userValue: IGetUserInfoResp) => void
}

const context = createContext<StoreContext>({
  tasks: [],
  setTasks: () => {},
  userValue: { nickname: '', createAt: -1, _id: '' },
  setUserValue: () => {},
})
const StoreProvider = context.Provider

export { context, StoreProvider }
