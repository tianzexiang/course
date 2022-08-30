import { EHttpStatusCode, EPostErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const postErrorStat = {
  ERR_POST_NOT_FOUND: new ServiceError(
    EHttpStatusCode.NOT_FOUND,
    EPostErrorCode.ERR_POST_NOT_FOUND,
    '帖子未找到'
  ),
  ERR_POST_IS_DELETED: new ServiceError(
    EHttpStatusCode.OK,
    EPostErrorCode.ERR_POST_IS_DELETED,
    '帖子已删除'
  ),
  ERR_POST_ALREADY_THUMBS_UP: new ServiceError(
    EHttpStatusCode.OK,
    EPostErrorCode.ERR_POST_ALREADY_THUMBS_UP,
    '已点赞该帖子'
  )
}
