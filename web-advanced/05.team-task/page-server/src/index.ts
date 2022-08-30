import 'dotenv/config'
import Koa from 'koa'

import record from './controllers/record'
import logger from './middlewares/logger'
import checkError from './middlewares/checkError'
import * as db from './db'

const app = new Koa()
app.use(logger)
app.use(checkError)
app.use(record)

async function run() {
  // 先等待数据库连接
  await db.init()
  // 监听端口
  app.listen(process.env.PORT)
}

run()
