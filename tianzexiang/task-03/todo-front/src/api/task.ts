import { ETaskApi } from '../enums/api'
import {
  ICreateTask,
  IDeleteTask,
  ISetTask,
} from '../interfaces/request'
import { IGetTasksResp, IResp } from '../interfaces/response'

import * as request from '../utils/http/axios'

export async function getUnfinishedTasks(offset = 0, limit = 10) {
  const query = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  })
  return request.httpGet<IResp<IGetTasksResp>>(
    ETaskApi.Get_Unfinished + '?' + query.toString()
  )
}

export async function getFinishedTasks(offset = 0, limit = 10) {
  const query = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  })
  return request.httpGet<IResp<IGetTasksResp>>(
    ETaskApi.Get_Finished + '?' + query.toString()
  )
}

export async function getImportantTasks(offset = 0, limit = 10) {
  const query = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  })
  return request.httpGet<IResp<IGetTasksResp>>(
    ETaskApi.Get_Important + '?' + query.toString()
  )
}

export async function createTask(body: ICreateTask) {
  return request.httpPost<IResp>(ETaskApi.Create, body)
}

export async function updateTaskImportant(body: ISetTask) {
  return request.httpPost<IResp>(ETaskApi.UpdateImportant, body)
}

export async function updateTaskFinished(body: ISetTask) {
  return request.httpPost<IResp>(ETaskApi.UpdateFinished, body)
}

export async function deleteTask(body: IDeleteTask) {
  return request.httpPost<IResp>(ETaskApi.Delete, body)
}
