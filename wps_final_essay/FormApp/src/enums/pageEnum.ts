export enum PagePathEnum {
  // 登录页面路径
  LOGIN = '/login',
  // 主页路径
  HOME = '/home',
  // 主页子路由
  HOME_MYCREATE = '/mycreate',
  // 个人中心路径
  PROFILE = '/profile/:id',
  // 注册页面路径
  REGISTER = '/register',
  // 新建表单界面
  CREATE_FORM = '/create',
  // 填写详情页面
  NEW_FORM_RESULT = '/new-form-result',
  // 表单填写页面
  INPUT_FORM = '/input-form/:formId',
  // 错误页面路径
  ERROR_PAGE = '/404',
}

export enum PageNameEnum {
  // 登录页面名字
  LOGIN = 'login',
  // 主页名字
  HOME = 'home',
  // 主页子路由
  HOME_MYCREATE = 'mycreate',
  // 个人中心
  PROFILE = 'profile',
  // 注册页面
  REGISTER = 'register',
  // 新建表单界面
  CREATE_FORM = 'create-form',
  // 填写详情页面
  NEW_FORM_RESULT = 'new-form-result',
  // 表单填写页面
  INPUT_FORM = 'input-form',
  // 错误页面名字
  ERROR_PAGE = 'error',
}
