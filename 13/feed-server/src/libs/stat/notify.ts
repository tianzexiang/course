import { EHttpStatusCode, ENotifyErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const notifyErrorStat = {
  ERR_NOTIFY_NOT_FOUND: new ServiceError(
    EHttpStatusCode.NOT_FOUND,
    ENotifyErrorCode.ERR_NOTIFY_NOT_FOUND,
    '通知未找到'
  )
}
