import { ServiceError } from './error'
import Koa, { Middleware } from 'koa'
import { EAuthApi } from '../enums/api'
import { checkToken } from '../services/user.service'

// white list to pass token check
const whiteList = [EAuthApi.Login, EAuthApi.Register].map(
  (api) => EAuthApi.Prefix + api
)

// use to delegate err to this function, and throw err
export function check(isValidate: boolean, err: ServiceError) {
  // validate --> what need to be correct
  if (!isValidate) {
    throw err
  }
}

// token guard
function setupTokenGuard(): Middleware {
  return async (ctx, next) => {
    if (!whiteList.includes(ctx.path)) {
      await checkToken(ctx.cookies.get('token'))
    }
    await next()
  }
}
export function setupGuard(app: Koa) {
  app.use(setupTokenGuard())
}
