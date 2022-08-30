import { EHttpStatusCode, DirectMsgErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const directMsgErrorStat = {
  ERR_FRIEND_NOT_FOUND: new ServiceError(
    EHttpStatusCode.NOT_FOUND,
    DirectMsgErrorCode.ERR_FRIEND_NOT_FOUND,
    '该用户不存在'
  ),
  ERR_CAN_NOT_DIRECT_WITH_SELF: new ServiceError(
    EHttpStatusCode.NOT_FOUND,
    DirectMsgErrorCode.ERR_CAN_NOT_DIRECT_WITH_SELF,
    '不能和自己私信'
  )
}
