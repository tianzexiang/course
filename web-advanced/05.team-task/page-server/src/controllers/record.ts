import Joi from 'joi'
import Router from 'koa-router'

import validate from '../libs/validate'
import { JsonResp } from '../libs/stats'
import * as recordService from '../services/record'

const router = new Router({
  prefix: '/api/v1/record'
})

router.get('/list', async ctx => {
  const { prev, next, limit } = validate(
    ctx.query,
    Joi.object({
      prev: Joi.string().hex().length(24),
      next: Joi.string().hex().length(24),
      limit: Joi.number().integer().min(5).max(20).default(10)
    })
  )
  const result = await recordService.list({
    next,
    prev,
    limit
  })
  ctx.body = new JsonResp(result)
})

export default router.routes()
