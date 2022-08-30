import { EHttpStatusCode, EServiceRespCode } from '../../enums/status'
import { IJsonResp } from '../../interfaces/response'

export class JsonResp<T> implements IJsonResp<T> {
  status: number
  code: number
  data?: T
  constructor (data?: T) {
    this.status = EHttpStatusCode.OK
    this.code = EServiceRespCode.OK
    this.data = data
  }

  // return res according to data
  toJSON = (): IJsonResp<T> => {
    return this.data
      ? {
          status: this.status,
          code: this.code,
          data: this.data
        }
      : {
          status: this.status,
          code: this.code
        }
  }
}
