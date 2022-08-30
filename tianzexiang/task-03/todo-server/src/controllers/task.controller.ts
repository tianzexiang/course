import Router from 'koa-router'
import { Context } from 'koa'
import { JsonResp } from '../libs/response'
import { ICreateTask, IGetPartialTask, ISetTask } from '../interfaces/request'
import Joi from 'joi'
import validator from '../libs/validate'
import { ETaskApi } from '../enums/api'
import {
  updateTaskFinished,
  updateTaskImportant,
  createTask,
  deleteTask,
  getFinishedTasks,
  getUnfinishedTasks,
  getImportantTasks,
} from '../services/task.service'
// schema
const schemaDefiners = {
  [ETaskApi.Create]: Joi.object<ICreateTask>({
    content: Joi.string().min(1).required(),
  }),
  [ETaskApi.UpdateImportant]: Joi.object<ISetTask>({
    taskId: Joi.string().required(),
    status: Joi.number().integer().min(1).max(2).required(),
  }),
  [ETaskApi.UpdateFinished]: Joi.object<ISetTask>({
    taskId: Joi.string().required(),
    status: Joi.number().integer().min(1).max(2).required(),
  }),
  [ETaskApi.Delete]: Joi.object<ISetTask>({
    taskId: Joi.string().required(),
  }),
  [ETaskApi.Get_Finished]: Joi.object<IGetPartialTask>({
    limit: Joi.number().integer().min(0).required(),
    offset: Joi.number().integer().min(0).required(),
  }),
  [ETaskApi.Get_Unfinished]: Joi.object<IGetPartialTask>({
    limit: Joi.number().integer().min(0).required(),
    offset: Joi.number().integer().min(0).required(),
  }),
  [ETaskApi.Get_Important]: Joi.object<IGetPartialTask>({
    limit: Joi.number().integer().min(0).required(),
    offset: Joi.number().integer().min(0).required(),
  }),
}

// task router
export const taskRouter = new Router({
  prefix: ETaskApi.Prefix,
})

taskRouter.get(ETaskApi.Get_Unfinished, async (ctx: Context) => {
  validator(ctx.query, schemaDefiners[ETaskApi.Get_Unfinished])
  const { limit, offset } = ctx.query as unknown as IGetPartialTask
  const res = await getUnfinishedTasks(ctx.cookies.get('token'), {
    limit: Number(limit),
    offset: Number(offset),
  })
  ctx.body = new JsonResp(undefined, undefined, res)
})

taskRouter.get(ETaskApi.Get_Finished, async (ctx: Context) => {
  validator(ctx.query, schemaDefiners[ETaskApi.Get_Finished])
  const { limit, offset } = ctx.query as unknown as IGetPartialTask
  const res = await getFinishedTasks(ctx.cookies.get('token'), {
    limit: Number(limit),
    offset: Number(offset),
  })
  ctx.body = new JsonResp(undefined, undefined, res)
})

taskRouter.get(ETaskApi.Get_Important, async (ctx: Context) => {
  validator(ctx.query, schemaDefiners[ETaskApi.Get_Important])
  const { limit, offset } = ctx.query as unknown as IGetPartialTask
  const res = await getImportantTasks(ctx.cookies.get('token'), {
    limit: Number(limit),
    offset: Number(offset),
  })
  ctx.body = new JsonResp(undefined, undefined, res)
})

taskRouter.post(ETaskApi.Create, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[ETaskApi.Create])
  const { content } = ctx.request.body as ICreateTask
  const taskId = await createTask(content, ctx.cookies.get('token'))
  ctx.body = new JsonResp(undefined, undefined, { taskId })
})

taskRouter.post(ETaskApi.UpdateImportant, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[ETaskApi.UpdateImportant])
  const { taskId, status } = ctx.request.body as ISetTask
  await updateTaskImportant(taskId, status, ctx.cookies.get('token'))
  ctx.body = new JsonResp()
})

taskRouter.post(ETaskApi.UpdateFinished, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[ETaskApi.UpdateFinished])
  const { taskId, status } = ctx.request.body as ISetTask
  await updateTaskFinished(taskId, status, ctx.cookies.get('token'))
  ctx.body = new JsonResp()
})

taskRouter.post(ETaskApi.Delete, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[ETaskApi.Delete])
  const { taskId } = ctx.request.body as ISetTask
  await deleteTask(taskId, ctx.cookies.get('token'))
  ctx.body = new JsonResp()
})
