import { EHttpStatusCode, EBodyErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const bodyErrorStat = {
  ERR_BAD_BODY_PARAMS: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EBodyErrorCode.ERR_BAD_BODY_PARAMS,
    '参数缺失或错误'
  ),
}
