import { useCallback, useContext, useMemo, useState } from 'react'
import { context } from '../store'
import {
  getFinishedTasks,
  getUnfinishedTasks,
  getImportantTasks,
} from '../api/task'
import { EPagePath } from '../enums/pageEnum'
import { IGetTasksResp, IResp } from '../interfaces/response'
import { checkWithData } from '../utils/checkHttpRes'

export function useTasks(currPagePath: string) {
  const { tasks, setTasks } = useContext(context)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)

  // 是否还有更多
  const hasMore = useMemo(() => {
    return offset < total
  }, [offset, total])

  // 每次拉取部分tasks
  const getTasks = useCallback(async () => {
    try {
      let resData: IResp<IGetTasksResp> = {
        status: -1,
        code: -1,
        msg: '',
      }
      if (currPagePath === EPagePath.TODO_TASK) {
        // 这里不应该使用limit or offset ,因为这里是获取初始数据的位置，每次拉取的都是固定值
        resData = await getUnfinishedTasks()
      }
      if (currPagePath === EPagePath.TODO_IMPORTANT) {
        resData = await getImportantTasks()
      }
      if (currPagePath === EPagePath.TODO_FINISHED) {
        resData = await getFinishedTasks()
      }
      const { data } = resData

      if (checkWithData(resData)) {
        setTasks(data!.tasks)
        setOffset(data!.tasks.length)
        setTotal(data!.total)
      }
    } catch (error) {}
  }, [currPagePath, setTasks])

  // 获取更多
  const loadMore = useCallback(async () => {
    try {
      let resData: IResp<IGetTasksResp> = {
        status: -1,
        code: -1,
        msg: '',
      }
      if (currPagePath === EPagePath.TODO_TASK) {
        resData = await getUnfinishedTasks(offset)
      }
      if (currPagePath === EPagePath.TODO_IMPORTANT) {
        resData = await getImportantTasks(offset)
      }
      if (currPagePath === EPagePath.TODO_FINISHED) {
        resData = await getFinishedTasks(offset)
      }

      if (checkWithData(resData)) {
        const { data } = resData
        setTasks(tasks.concat(data!.tasks))
        setOffset(offset + data!.tasks.length)
        setTotal(data!.total)
      }
    } catch (error: any) {}
  }, [currPagePath, offset, setTasks, tasks])

  return {
    tasks,
    hasMore,
    getTasks,
    loadMore,
    setTasks,
  }
}
