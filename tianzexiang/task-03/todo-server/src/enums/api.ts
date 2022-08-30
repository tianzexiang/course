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

// task
export enum ETaskApi {
  Prefix = '/api/task',
  Get_Unfinished = '/get_unfinished',
  Get_Finished = '/get_finished',
  Get_Important = '/get_important',
  Create = '/create',
  UpdateImportant = '/update_important',
  UpdateFinished = '/update_finished',
  Delete = '/delete'
}