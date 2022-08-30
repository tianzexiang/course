import { ObjectId } from 'mongodb'
import {
  ETaskDeleteStat,
  ETaskFinishStat,
  ETaskImportantStat,
} from '../enums/model'
import { IGetPartialTask } from '../interfaces/request'
import { taskErrorStat } from '../libs/stat/task'
import { check } from '../middlewares/check'
import { TaskModel } from '../models/task.model'
import { getSession } from './session.service'

export async function getUnfinishedTasks(
  sid: string,
  pagination: IGetPartialTask
) {
  const session = await getSession(sid)
  const res = await TaskModel.find(
    {
      userId: session.userId,
      finished: ETaskFinishStat.Unfinished,
      isDelete: {
        $ne: ETaskDeleteStat.Delete,
      },
    },
    {
      projection: {
        isDelete: 0,
        userId: 0,
      },
    }
  )
    .limit(pagination.limit)
    .skip(pagination.offset)
    .sort({createAt: -1})
    .toArray()
  const total = await TaskModel.countDocuments({
    userId: session.userId,
    finished: ETaskFinishStat.Unfinished,
    isDelete: {
      $ne: ETaskDeleteStat.Delete,
    },
  })
  return { tasks: res, total }
}

export async function getFinishedTasks(
  sid: string,
  pagination: IGetPartialTask
) {
  const session = await getSession(sid)
  const res = await TaskModel.find(
    {
      userId: session.userId,
      finished: ETaskFinishStat.Finished,
      isDelete: {
        $ne: ETaskDeleteStat.Delete,
      },
    },
    {
      projection: {
        isDelete: 0,
        userId: 0,
      },
    }
  )
    .limit(pagination.limit)
    .skip(pagination.offset)
    .sort({createAt: -1})
    .toArray()
  const total = await TaskModel.countDocuments({
    userId: session.userId,
    finished: ETaskFinishStat.Finished,
    isDelete: {
      $ne: ETaskDeleteStat.Delete,
    },
  })
  return { tasks: res, total }
}

export async function getImportantTasks(
  sid: string,
  pagination: IGetPartialTask
) {
  const session = await getSession(sid)
  const res = await TaskModel.find(
    {
      userId: session.userId,
      important: ETaskImportantStat.Important,
      isDelete: {
        $ne: ETaskDeleteStat.Delete,
      },
    },
    {
      projection: {
        isDelete: 0,
        userId: 0,
      },
    }
  )
    .limit(pagination.limit)
    .skip(pagination.offset)
    .sort({createAt: -1})
    .toArray()
  const total = await TaskModel.countDocuments({
    userId: session.userId,
    important: ETaskImportantStat.Important,
    isDelete: {
      $ne: ETaskDeleteStat.Delete,
    },
  })
  return { tasks: res, total }
}

export async function createTask(content: string, sid: string) {
  const session = await getSession(sid)
  const res = await TaskModel.insertOne({
    content,
    userId: session.userId,
    isDelete: ETaskDeleteStat.Normal,
    finished: ETaskFinishStat.Unfinished,
    important: ETaskImportantStat.Unimportant,
    createAt: Date.now(),
  })
  return res.insertedId
}

export async function updateTaskImportant(
  taskId: string,
  status: number,
  sid: string
) {
  const session = await getSession(sid)
  const _taskId = new ObjectId(taskId)
  const res = await TaskModel.updateOne(
    {
      _id: _taskId,
      userId: session.userId,
      isDelete: {
        $ne: ETaskDeleteStat.Delete,
      },
    },
    { $set: { important: status } }
  )
  // whether the task is exist
  check(!!res, taskErrorStat.ERR_TASK_NOT_FOUND)
  return res
}

export async function updateTaskFinished(
  taskId: string,
  status: number,
  sid: string
) {
  const session = await getSession(sid)
  const _taskId = new ObjectId(taskId)
  const res = await TaskModel.updateOne(
    {
      _id: _taskId,
      userId: session.userId,
      isDelete: {
        $ne: ETaskDeleteStat.Delete,
      },
    },
    { $set: { finished: status } }
  )
  // whether the task is exist
  check(!!res, taskErrorStat.ERR_TASK_NOT_FOUND)
  return res
}

export async function deleteTask(taskId: string, sid: string) {
  const _taskId = new ObjectId(taskId)
  const session = await getSession(sid)
  const res = await TaskModel.updateOne(
    {
      _id: _taskId,
      userId: session.userId,
    },
    { $set: { isDelete: ETaskDeleteStat.Delete } }
  )
  // whether the task is exist
  check(!!res, taskErrorStat.ERR_TASK_NOT_FOUND)
  return res
}
