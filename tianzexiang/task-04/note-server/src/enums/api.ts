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
  // get root file and folder
  GetRoot = '/get',
  Get = '/get/:folderId',
  // get recent file
  GetRecent = '/get_recent',
  // get file content
  GetContent = '/get_content/:fileId',
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
  // get shared file
  Get = '/get',
  // get share id
  GetShareId = '/get_share_id',
  // create a share file
  Create = '/create',
  // delete share
  Delete = '/delete',
  // get shared file content
  GetContent = '/get_content/:shareId'
}
