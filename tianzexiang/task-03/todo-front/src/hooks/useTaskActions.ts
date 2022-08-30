import { useCallback, useContext, useState } from 'react'
import {
  EHttpStatusCode,
  EServiceRespCode,
  ETaskFinishStat,
  ETaskImportantStat,
} from '../enums/status'
import {
  createTask,
  deleteTask,
  updateTaskFinished,
  updateTaskImportant,
} from '../api/task'
import { ITask } from '../interfaces/task'
import { context } from '../store'

export function useTaskActions(getTasks?: () => Promise<any>) {
  const [error, setError] = useState('')
  const { tasks, setTasks } = useContext(context)

  const addTask = useCallback(
    async (content: string) => {
      try {
        await createTask({ content })
        getTasks && (await getTasks())
      } catch (error: any) {
        setError(error.message)
      }
    },
    [getTasks]
  )

  const changeFinishTask = useCallback(
    async (task: ITask) => {
      try {
        const status =
          task.finished === ETaskFinishStat.Finished
            ? ETaskFinishStat.Unfinished
            : ETaskFinishStat.Finished
        const res = await updateTaskFinished({ taskId: task._id, status })
        if (
          res.code === EServiceRespCode.OK &&
          res.status === EHttpStatusCode.OK
        ) {
          tasks.forEach((val) => {
            if (val._id === task._id) val.finished = status
          })
          setTasks([...tasks])
          getTasks && (await getTasks())
        }
      } catch (error: any) {
        setError(error.message)
      }
    },
    [getTasks, setTasks, tasks]
  )

  const changeStarTask = useCallback(
    async (task: ITask) => {
      try {
        const status =
          task.important === ETaskImportantStat.Important
            ? ETaskImportantStat.Unimportant
            : ETaskImportantStat.Important
        const res = await updateTaskImportant({ taskId: task._id, status })
        if (
          res.code === EServiceRespCode.OK &&
          res.status === EHttpStatusCode.OK
        ) {
          tasks.forEach((val) => {
            if (val._id === task._id) val.important = status
          })
          setTasks([...tasks])
          getTasks && (await getTasks())
        }
      } catch (error: any) {
        setError(error.message)
      }
    },
    [getTasks, setTasks, tasks]
  )

  const removeTask = useCallback(
    async (task: ITask) => {
      try {
        await deleteTask({ taskId: task._id })
        getTasks && (await getTasks())
      } catch (error: any) {
        setError(error.message)
      }
    },
    [getTasks]
  )

  return {
    error,
    addTask,
    changeFinishTask,
    changeStarTask,
    removeTask,
  }
}
