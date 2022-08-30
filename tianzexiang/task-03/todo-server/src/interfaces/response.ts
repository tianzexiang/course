// error interface
export interface IError {
  status: number
  code: number
  msg: string
}

// response of json
export interface IJsonResp<T> extends Omit<IError, 'msg'> {
  data?: T
}
