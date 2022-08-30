import Joi from 'joi'
import { bodyErrorStat } from '../stat/body'

/**
 * 参数合法性校验
 * @param data
 * @param schema
 * @returns
 */
export default function validate(data: unknown, schema: Joi.ObjectSchema) {
  const { value, error } = schema.validate(data, {
    stripUnknown: true
  })
  if (error) {
    throw bodyErrorStat.ERR_BAD_BODY_PARAMS
  }
  return value
}
