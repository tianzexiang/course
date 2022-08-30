import Router from 'koa-router'
import { Context } from 'koa'
import { JsonResp } from '../libs/response'
import {
  ICreateFolderOrFile,
  IDeleteFolderOrFile,
  IGetContent,
  IGetFoldAndFile,
  IGetFolderOrFileInfo,
  IPagination,
  ISaveFolderFile,
} from '../interfaces/request'
import Joi from 'joi'
import validator from '../libs/validate'
import { EFolderFileApi } from '../enums/api'
import {
  createFolderOrFile,
  deleteFolderOrFile,
  getFileContent,
  getFolderAndFile,
  getFolderOrFileInfo,
  getRecentFile,
  saveFile,
} from '../services/folder-file.service'

// schema
const schemaDefiners = {
  [EFolderFileApi.Get]: Joi.object<IGetFoldAndFile>({
    folderId: Joi.string(),
    limit: Joi.number().integer().min(0).required(),
    skip: Joi.number().integer().min(0).required(),
  }),
  [EFolderFileApi.GetRecent]: Joi.object<IPagination>({
    limit: Joi.number().integer().min(0).required(),
    skip: Joi.number().integer().min(0).required(),
  }),
  [EFolderFileApi.GetContent]: Joi.object<IGetContent>({
    fileId: Joi.string().required(),
  }),
  [EFolderFileApi.GetInfo]: Joi.object<IGetFolderOrFileInfo>({
    id: Joi.string().required(),
    folder: Joi.boolean().required(),
  }),
  [EFolderFileApi.Create]: Joi.object<ICreateFolderOrFile>({
    title: Joi.string().min(1).max(30).required(),
    folder: Joi.boolean().required(),
    folderId: Joi.string(),
  }),
  [EFolderFileApi.Save]: Joi.object<ISaveFolderFile>({
    id: Joi.string().required(),
    title: Joi.string(),
    content: Joi.string().allow(''),
  }),
  [EFolderFileApi.Delete]: Joi.object<IDeleteFolderOrFile>({
    id: Joi.string().required(),
    folder: Joi.boolean().required(),
  }),
}

// user router
export const folderFileRouter = new Router({
  prefix: EFolderFileApi.Prefix,
})

folderFileRouter.get(
  [EFolderFileApi.Get, EFolderFileApi.GetRoot],
  async (ctx: Context) => {
    const { folderId } = ctx.params
    const { limit, skip } = ctx.request.query as unknown as IGetFoldAndFile
    // validate
    validator({ folderId, limit, skip }, schemaDefiners[EFolderFileApi.Get])
    const res = await getFolderAndFile(ctx.cookies.get('token'), {
      folderId,
      limit: Number(limit),
      skip: Number(skip),
    })
    ctx.body = new JsonResp(undefined, undefined, res)
  }
)

folderFileRouter.get(EFolderFileApi.GetRecent, async (ctx: Context) => {
  validator(ctx.request.query, schemaDefiners[EFolderFileApi.GetRecent])
  const { limit, skip } = ctx.request.query as unknown as IPagination
  const res = await getRecentFile(ctx.cookies.get('token'), {
    limit: Number(limit),
    skip: Number(skip),
  })
  ctx.body = new JsonResp(undefined, undefined, res)
})

folderFileRouter.get(EFolderFileApi.GetContent, async (ctx: Context) => {
  validator(ctx.params, schemaDefiners[EFolderFileApi.GetContent])
  const { fileId } = ctx.params as IGetContent
  const res = await getFileContent(ctx.cookies.get('token'), fileId)
  ctx.body = new JsonResp(undefined, undefined, res)
})

folderFileRouter.post(EFolderFileApi.GetInfo, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EFolderFileApi.GetInfo])
  const res = await getFolderOrFileInfo(
    ctx.cookies.get('token'),
    ctx.request.body
  )
  ctx.body = new JsonResp(undefined, undefined, res)
})

folderFileRouter.post(EFolderFileApi.Create, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EFolderFileApi.Create])
  const res = await createFolderOrFile(
    ctx.cookies.get('token'),
    ctx.request.body
  )
  ctx.body = new JsonResp(undefined, undefined, res)
})

folderFileRouter.post(EFolderFileApi.Save, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EFolderFileApi.Save])
  await saveFile(ctx.cookies.get('token'), ctx.request.body)
  ctx.body = new JsonResp()
})

folderFileRouter.post(EFolderFileApi.Delete, async (ctx: Context) => {
  validator(ctx.request.body, schemaDefiners[EFolderFileApi.Delete])
  await deleteFolderOrFile(ctx.cookies.get('token'), ctx.request.body)
  ctx.body = new JsonResp()
})
