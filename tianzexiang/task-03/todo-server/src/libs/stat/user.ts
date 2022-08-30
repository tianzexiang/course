import { EHttpStatusCode, EUserErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const userErrorStat = {
  ERR_ACCOUNT_NOT_FOUND: new ServiceError(
    EHttpStatusCode.NOT_FOUND,
    EUserErrorCode.ERR_ACCOUNT_NOT_FOUND,
    '用户未找到'
  ),
  ERR_ACCOUNT_EXIST: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EUserErrorCode.ERR_ACCOUNT_EXIST,
    '用户名已存在'
  ),
  ERR_PWD_NOT_CORRECT: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EUserErrorCode.ERR_PWD_NOT_CORRECT,
    '密码不正确'
  ),
  ERR_OLD_PWD_NOT_CORRECT: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EUserErrorCode.ERR_OLD_PWD_NOT_CORRECT,
    '旧密码不正确'
  ),
  ERR_USER_NOT_LOGIN: new ServiceError(
    EHttpStatusCode.UNAUTHORIZED,
    EUserErrorCode.ERR_USER_NOT_LOGIN,
    '用户未登录'
  ),
  ERR_USER_FORBIDDEN: new ServiceError(
    EHttpStatusCode.FORBIDDEN,
    EUserErrorCode.ERR_USER_FORBIDDEN,
    '用户已被禁止登录'
  ),
  ERR_USER_NOT_FOUND: new ServiceError(
    EHttpStatusCode.NOT_FOUND,
    EUserErrorCode.ERR_USER_NOT_FOUND,
    '用户已注销'
  ),
}
