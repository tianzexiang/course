import { ServiceError } from './error'
import Koa, { Middleware } from 'koa'
import { EAuthApi } from '../enums/api'
import { checkToken } from '../services/user.service'

// white list to pass token check
const authWhiteList = [EAuthApi.WxLogin, EAuthApi.Register, EAuthApi.WxAuth].map(
  (api) => EAuthApi.Prefix + api
)

const whiteList = [...authWhiteList]

// use to delegate err to this function, and throw err
export function check (isValidate: boolean, err: ServiceError) {
  // validate --> what need to be correct
  if (!isValidate) {
    throw err
  }
}

// token guard
function setupTokenGuard (): Middleware {
  return async (ctx, next) => {
    const isInWhiteList = (whiteList: string[]) => {
      // if have one in ctx.path ,then true,else false
      return whiteList.some((path) => ctx.path.indexOf(path) !== -1)
    }

    if (!isInWhiteList(whiteList)) {
      await checkToken(ctx.cookies.get('token'))
    }
    await next()
  }
}
export function setupGuard (app: Koa) {
  app.use(setupTokenGuard())
}
