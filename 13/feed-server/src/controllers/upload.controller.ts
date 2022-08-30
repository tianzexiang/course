import { EUploadApi } from '../enums/api'
import Router from 'koa-router'
import OSS from 'ali-oss'
import { JsonResp } from '../libs/response'

// upload router
export const uploadRouter = new Router({
  prefix: EUploadApi.Prefix
})

uploadRouter.get(EUploadApi.Name, async (ctx) => {
  const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: process.env.ALI_OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_OSS_ACCESS_KEY_SECRET,
    bucket: process.env.ALI_OSS_BUCKET
  })
  const { name } = ctx.params
  const ext = name.split('.').pop()
  const filename = 'FeedApp' + Date.now() + '.' + ext
  const url = client.signatureUrl(filename, {
    'Content-Type': 'blob',
    expires: 3600,
    method: 'PUT'
  })
  ctx.body = new JsonResp({ url })
})
