import Router from 'koa-router'
import Koa from 'koa'
import { authRouter } from '../controllers/auth.controller'
import { userRouter } from '../controllers/user.controller'
import { taskRouter } from '../controllers/task.controller'

// main router
export const mainRouter = new Router()

// defined router
const routerDefiners = [authRouter, userRouter, taskRouter]

export function registerRouter(app: Koa) {
  // use defined router
  routerDefiners.forEach((routerDefiner) => {
    mainRouter.use(routerDefiner.routes())
  })

  // use main router
  app.use(mainRouter.routes())
}
