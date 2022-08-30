import { Middleware } from 'koa'
import { EHttpStatusCode, EServiceRespCode } from '../enums/status'
import { IError } from '../interfaces/response'
import Koa from 'koa'

export class ServiceError implements IError {
  status: number
  code: number
  msg: string
  constructor(status?: number, code?: number, msg?: string) {
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
function catchError(): Middleware {
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

export function setupErrorCatch(app: Koa) {
  app.use(catchError())
}
