import { EHttpStatusCode, EFollowErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const followErrorStat = {
  ERR_FOLLOW_EXIST: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EFollowErrorCode.ERR_FOLLOW_EXIST,
    '已在关注列表'
  )
}
