import { EHttpStatusCode, ETaskErrorCode } from '../../enums/status'
import { ServiceError } from '../../middlewares/error'

export const taskErrorStat = {
  ERR_TASK_NOT_FOUND: new ServiceError(
    EHttpStatusCode.BAD_REQUEST,
    ETaskErrorCode.ERR_TASK_NOT_FOUND,
    '任务不存在'
  ),
}
