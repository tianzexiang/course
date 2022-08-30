import { EHttpStatusCode, EShareErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const shareErrorStat = {
  ERR_SHARE_NOT_FOUND: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EShareErrorCode.ERR_SHARE_NOT_FOUND,
    '分享文件不存在或已删除'
  ),
  ERR_SHARE_EXIST: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EShareErrorCode.ERR_SHARE_EXIST,
    '该文件已分享'
  ),
  ERR_SHARE_FOLDER_NOT_ALLOWED: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EShareErrorCode.ERR_SHARE_FOLDER_NOT_ALLOWED,
    '暂不支持分享文件夹'
  ),
}
