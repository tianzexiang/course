import { createContext } from 'react'
import {ITask} from '../interfaces/task'

interface StoreContext {
  taskList: ITask[]
  setTaskList: (tasks: ITask[]) => void,
  currTask: ITask | undefined,
  setCurrTask: (task: ITask) => void
  taskActionDrawerVisible: boolean,
  setTaskActionDrawerVisible: (visible: boolean) => void
}

const context = createContext<StoreContext>({
  taskList: [],
  setTaskList: () => {},
  currTask: undefined,
  setCurrTask: () => {},
  taskActionDrawerVisible: false,
  setTaskActionDrawerVisible: () => {}
})
const StoreProvider = context.Provider

export { context, StoreProvider }