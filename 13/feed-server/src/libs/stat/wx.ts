import { EHttpStatusCode, EWxErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const wxErrorStat = {
  ERR_WX_LOGIN_ERROR: (err: string) => new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EWxErrorCode.ERR_WX_LOGIN_ERROR,
    err
  )
}
