// http status
export enum EHttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// service response code, if success then OK 
export enum EServiceRespCode {
  FAIL = -1, // unknown err
  OK = 0,
}

// user 
export enum EUserStat {
  Normal = 1,
  Disabled = 2,
}