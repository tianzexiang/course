import dayjs from 'dayjs'
import Koa, { Middleware } from 'koa'
import { ServiceError } from '../middlewares/error'
import { JsonResp } from '../libs/response'
import { printTable, TTableData } from '../libs/table'
import { execErrorHandler } from './error'

export interface ILoggerInfo extends Record<string, string | number> {
  // log time
  time: string
  // req method
  method: string
  // req url
  url: string
  // req ip
  ip: string
  // res status
  status: number
  // res service code
  code: number
  // cost of time
  cost: number
}

function printLog (logInfo: ILoggerInfo) {
  const logInfoData = [logInfo]
  const tableData = logInfoData.map<TTableData<ILoggerInfo>>((log) => {
    // a temp to storage transformed value
    const tableDataTemp: unknown = {}
    // transform value
    const keys = Object.getOwnPropertyNames(log)
    keys.forEach((key) => {
      tableDataTemp[key] = {
        value: String(log[key])
      }
    })
    // return transformed value
    return tableDataTemp as TTableData<ILoggerInfo>
  })

  // print log info
  console.log()
  printTable(tableData, [], {
    titleAlign: 'center',
    titleIndent: 2
  })
  console.log()
}

/**
 * 请求日志中间件
 * @param ctx
 * @param next
 */
function logger (): Middleware {
  return async (ctx, next) => {
    const startTime = Date.now()
    await next()
    const endTime = Date.now()
    const logs = ctx.state.logs || {}
    const info: ILoggerInfo = {
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      method: ctx.method,
      url: ctx.url,
      ip: ctx.request.ip,
      cost: endTime - startTime,
      ...logs
    }
    if (ctx.body instanceof JsonResp) {
      info.status = ctx.body.status
      info.code = ctx.body.code
    }
    if (ctx.body instanceof ServiceError) {
      info.status = ctx.body.status
      info.code = ctx.body.code
      info.msg = ctx.body.msg
      // 处理特殊错误
      execErrorHandler(ctx.body)
    }
    printLog(info)
  }
}

export function setupLogger (app: Koa) {
  app.use(logger())
}
