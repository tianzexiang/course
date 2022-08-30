import Joi from 'joi'
import { check } from '../../middlewares/check'
import { bodyErrorStat } from '../stat/body'

/**
 * 参数合法性校验
 * @param data
 * @param schema
 * @returns
 */
export function validator (data: unknown, schema: Joi.ObjectSchema) {
  const { error } = schema.validate(data, {
    stripUnknown: true
  })
  check(!error, bodyErrorStat.ERR_BAD_BODY_PARAMS)
}
