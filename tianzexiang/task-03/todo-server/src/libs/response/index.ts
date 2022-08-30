import { EHttpStatusCode, EServiceRespCode } from '../../enums/status'
import { IJsonResp } from '../../interfaces/response'

export class JsonResp<T> implements IJsonResp<T> {
  status: number
  code: number
  data?: T
  constructor(status?: number, code?: number, data?: T) {
    this.status = status || EHttpStatusCode.OK
    this.code = code || EServiceRespCode.OK
    this.data = data
  }
  // return res according to data
  toJSON = (): IJsonResp<T> => {
    return this.data
      ? {
          status: this.status,
          code: this.code,
          data: this.data,
        }
      : {
          status: this.status,
          code: this.code,
        }
  }
}
