import Router from 'koa-router'
import Koa from 'koa'
import { authRouter } from '../controllers/auth.controller'
import { userRouter } from '../controllers/user.controller'
import { postRouter } from '../controllers/post.controller'
import { searchRouter } from '../controllers/search.controller'
import { uploadRouter } from '../controllers/upload.controller'
import { directMsgRouter } from '../controllers/directMsg.controller'
import { notifyRouter } from '../controllers/notify.controller'
// main router
export const mainRouter = new Router()

// defined router
const routerDefiners = [
  authRouter,
  userRouter,
  postRouter,
  searchRouter,
  uploadRouter,
  directMsgRouter,
  notifyRouter
]

export function registerRouter (app: Koa) {
  // use defined router
  routerDefiners.forEach((routerDefiner) => {
    mainRouter.use(routerDefiner.routes())
  })

  // use main router
  app.use(mainRouter.routes())
}
