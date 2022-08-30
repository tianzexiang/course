import { EHttpStatusCode, EFolderAndFileErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const folderFileErrorStat = {
  ERR_FOLDER_NOT_FOUND: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EFolderAndFileErrorCode.ERR_FOLDER_NOT_FOUND,
    '文件夹不存在或已删除'
  ),
  ERR_FILE_NOT_FOUND: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EFolderAndFileErrorCode.ERR_FILE_NOT_FOUND,
    '文件不存在或已删除'
  ),
  ERR_EDIT_FORBIDDEN: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EFolderAndFileErrorCode.ERR_EDIT_FORBIDDEN,
    '无权编辑文件'
  ),
  ERR_FILE_TITLE_EXIST: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EFolderAndFileErrorCode.ERR_FILE_TITLE_EXIST,
    '文件名称已存在'
  ),
  ERR_FOLDER_TITLE_EXIST: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EFolderAndFileErrorCode.ERR_FOLDER_TITLE_EXIST,
    '文件夹名称已存在'
  ),
  ERR_CREATE_NEW_IN_FILE: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    EFolderAndFileErrorCode.ERR_CREATE_NEW_IN_FILE,
    '无法在文件下创建'
  ),
}
