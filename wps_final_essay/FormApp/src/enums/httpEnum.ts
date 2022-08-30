// 返回结果
export enum ResultEnum {
  SUCCESS = 'ok',
  NET_WORK_ERROR = '网络异常',
  NOT_FOUND = '请求资源未找到',
  REQUEST_TIMEOUT = '请求超时'
}

// 请求方法
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST'
}

// 内容类型
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
