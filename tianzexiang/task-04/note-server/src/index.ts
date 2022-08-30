import 'dotenv/config'
import Koa from 'koa'
import koaBody from 'koa-body'
import { initDb } from './db'
import { registerRouter } from './router'
import { setupErrorCatch } from './middlewares/error'
import { setupLogger } from './middlewares/logger'
import { setupGuard } from './middlewares/check'

// app created by koa
const app = new Koa()

function useMiddlewares() {
  // logger
  setupLogger(app)

  // setup global err catch
  setupErrorCatch(app)

  // setup token guard
  setupGuard(app)

  // use koa body
  app.use(koaBody())

  // register router
  registerRouter(app)
}

async function run() {
  // connect db
  await initDb()

  // start http server
  app.listen(process.env.PORT, () => {
    console.log(`http server start at ${process.env.PORT} port`)
  })
}

// use middlewares
useMiddlewares()

// run the server
run()
