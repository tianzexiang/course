import Router from 'koa-router'
import Koa from 'koa'
import { authRouter } from '../controllers/auth.controller'
import { userRouter } from '../controllers/user.controller'
import { folderFileRouter } from '../controllers/folder-file.controller'
import { shareRouter } from '../controllers/share.controller'

// main router
export const mainRouter = new Router()

// defined router
const routerDefiners = [authRouter, userRouter, folderFileRouter, shareRouter]

export function registerRouter(app: Koa) {
  // use defined router
  routerDefiners.forEach((routerDefiner) => {
    mainRouter.use(routerDefiner.routes())
  })

  // use main router
  app.use(mainRouter.routes())
}
