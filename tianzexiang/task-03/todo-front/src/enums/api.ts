// auth
export enum EAuthApi {
  Register = '/auth/register',
  Login = '/auth/login',
  Logout = '/auth/logout',
}

// user
export enum EUserApi {
  ChangePwd = '/user/change_pwd',
  SetInfo = '/user/set_info',
  GetInfo = '/user/get_info',
}

// task
export enum ETaskApi {
  Get_Unfinished = '/task/get_unfinished',
  Get_Finished = '/task/get_finished',
  Get_Important = '/task/get_important',
  Create = '/task/create',
  UpdateImportant = '/task/update_important',
  UpdateFinished = '/task/update_finished',
  Delete = '/task/delete',
}
