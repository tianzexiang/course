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

// service response fail code of user
export enum EUserErrorCode {
  ERR_ACCOUNT_NOT_FOUND = 20001,
  ERR_ACCOUNT_EXIST,
  ERR_PWD_NOT_CORRECT,
  ERR_OLD_PWD_NOT_CORRECT,
  ERR_USER_NOT_LOGIN,
  ERR_USER_NOT_FOUND,
  ERR_USER_FORBIDDEN,
}

// service response fail code of body params
export enum EBodyErrorCode {
  ERR_BAD_BODY_PARAMS = 10001,
}

// service response fail code of folder
export enum EFolderAndFileErrorCode {
  ERR_FOLDER_NOT_FOUND = 30001,
  ERR_FILE_NOT_FOUND,
  ERR_EDIT_FORBIDDEN,
  ERR_FOLDER_TITLE_EXIST,
  ERR_FILE_TITLE_EXIST,
  ERR_CREATE_NEW_IN_FILE
}

// service response fail code of share
export enum EShareErrorCode {
  ERR_SHARE_NOT_FOUND = 40001,
  ERR_SHARE_EXIST,
  ERR_SHARE_FOLDER_NOT_ALLOWED
}
