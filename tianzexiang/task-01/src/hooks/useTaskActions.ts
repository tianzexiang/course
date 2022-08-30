import { useCallback, useContext } from "react"
import { context } from '../store'
import { nanoid } from 'nanoid'
import { ITask } from "../interfaces/task"

export function useTaskActions() {
  const { taskList, setTaskList } = useContext(context)


  const addTask = useCallback((content: string) => {
    const newTask: ITask = {
      id: nanoid(),
      content,
      ctime: Date.now(),
      finished: false,
      important: false
    }
    const newTaskList = [newTask, ...taskList]
    setTaskList(newTaskList)
  }, [taskList, setTaskList])


  const changeFinishTask = useCallback((id: string) => {
    taskList.forEach(task => {
      if (task.id === id) task.finished = !task.finished
    })
    setTaskList([...taskList])
  }, [taskList, setTaskList])

  const changeStarTask = useCallback((id: string) => {
    taskList.forEach(task => {
      if (task.id === id) task.important = !task.important
    })
    setTaskList([...taskList])
  }, [taskList, setTaskList])

  const removeTask = useCallback((id: string) => {
    const newTaskList = taskList.filter(task => task.id !== id)
    setTaskList([...newTaskList])
  }, [taskList, setTaskList])

  return {
    addTask,
    changeFinishTask,
    changeStarTask,
    removeTask
  }

}