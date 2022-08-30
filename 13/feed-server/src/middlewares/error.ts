import Koa, { Middleware } from 'koa'
import {
  EHttpStatusCode,
  EServiceRespCode,
  EWxErrorCode
} from '../enums/status'
import { IError } from '../interfaces/response'

export class ServiceError implements IError {
  status: number
  code: number
  msg: string
  constructor (status?: number, code?: number, msg?: string) {
    this.status = status || EHttpStatusCode.OK
    this.code = code || EServiceRespCode.FAIL
    this.msg = msg || 'unknown err'
  }
}

/**
 * err handle middleware
 * @param ctx
 * @param next
 */
function catchError (): Middleware {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      // if this err is service err
      if (err instanceof ServiceError) {
        ctx.body = err
      } else {
        // if this err is server err
        console.trace(err)
      }
    }
  }
}

// 处理特殊错误
function handleWxError (err: ServiceError) {
  if (err.code === EWxErrorCode.ERR_WX_LOGIN_ERROR) {
    err.msg = '微信请求出错'
  }
}

const specialErrorHandlers = [handleWxError]

export function execErrorHandler (err: ServiceError) {
  for (const handler of specialErrorHandlers) {
    handler(err)
  }
}

export function setupErrorCatch (app: Koa) {
  app.use(catchError())
}
