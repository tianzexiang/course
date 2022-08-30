import { useContext, useMemo } from "react"
import { context } from '../store'

export function useTaskList() {
  const { taskList, setTaskList } = useContext(context)

  const unfinishedTaskList = useMemo(() => taskList.filter(task => !task.finished), [taskList])
  const finishedTaskList = useMemo(() => taskList.filter(task => task.finished), [taskList])
  const starTaskList = useMemo(() => taskList.filter(task => task.important), [taskList])

  return {
    taskList,
    finishedTaskList,
    starTaskList,
    unfinishedTaskList,
    setTaskList
  }
}