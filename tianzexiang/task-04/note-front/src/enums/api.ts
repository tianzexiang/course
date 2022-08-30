// auth
export enum EAuthApi {
  Prefix = '/api/auth',
  Register = '/register',
  Login = '/login',
  Logout = '/logout',
}

// user
export enum EUserApi {
  Prefix = '/api/user',
  ChangePwd = '/change_pwd',
  SetInfo = '/set_info',
  GetInfo = '/get_info',
}

// folder and file
export enum EFolderFileApi {
  Prefix = '/api/folder-file',
  Get = '/get',

  // get recent file
  GetRecent = '/get_recent',
  // get file content
  GetContent = '/get_content',
  // get file or folder info
  GetInfo = '/get_info/:id',
  // create folder or file
  Create = '/create',
  // save content
  Save = '/save',
  // delete folder or file
  Delete = '/delete',
}

// share
export enum EShareApi {
  Prefix = '/api/share',
  // get all shared file
  Get = '/get',
  // get share id
  GetShareId = '/get_share_id',
  // create a share file
  Create = '/create',
  // delete share
  Delete = '/delete',
  // get shared file content
  GetContent = '/get_content',
}
