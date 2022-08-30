export enum EAuthApi {
  Prefix = '/api/auth',
  WxLogin = '/wx_login',
  WxAuth = '/wx_auth',
  Logout = '/logout',
  Register = '/register',
  STS = '/sts'
}

export enum EUserApi {
  Prefix = '/api/user',
  GetInfo = '/get_info',
  GetOthersInfo = '/get_info/:id',
  SetInfo = '/set_info',
  Follow = '/follow',
  Unfollow = '/unfollow',
  GetFollows = '/get_follows',
  GetOthersFollows = '/get_follows/:id',
  GetSubscribes = '/get_subscribes',
  GetOthersSubscribes = '/get_subscribes/:id',
  GetPost = '/get_post',
  GetOthersPost = '/get_post/:id',
  GetImgPost = '/get_img_post',
  GetOthersImgPost = '/get_img_post/:id',
  GetLikePost = '/get_post_like',
  GetOthersLikePost = '/get_post_like/:id'
}

export enum EPostApi {
  Prefix = '/api/post',
  CancelThumbsUp = '/cancel_thumbs_up',
  CreateComment = '/create_comment',
  CreateForward = '/create_forward',
  CreatePost = '/create_post',
  Delete = '/delete',
  GetFollowPost = '/get_follow_post',
  GetPostDetail = '/get_post_detail',
  GetComments = '/get_comments',
  ThumbsUp = '/thumbs_up'
}

export enum ENotifyApi {
  Prefix = '/api/notify',
  Get = '/get',
  UpdateStatus = '/update_status',
  GetHasUnread = '/get_has_unread',
  Delete = '/delete',
  setAllNotifyToRead = '/set_all_notify_read',
  setAllNotifyToDelete = '/set_all_notify_delete'
}

export enum EDirectMsgApi {
  Prefix = '/api/direct_msg',
  GetChatItem = '/get_chat_item',
  GetDirectMsg = '/get_direct_msg',
  GetUnreadCount = '/get_unread_count',
  DeleteChatItem = '/delete_chat_item',
  DeleteDirectMsg = '/delete_direct_msg',
  CreateDirectMsg = '/create_direct_msg',
  SetMsgToRead = '/set_msg_read',
  SetAllMsgToRead = '/set_all_msg_read',
  getNewUnReadMsgWithOneFriend='/get_unread_msg_with_friend'
}

export enum EUploadApi {
  Prefix = '/api/upload',
  Name = '/:name'
}

export enum ESearchApi {
  Prefix = '/api/search',
  Post = '/post',
  User = '/user',
  Img = '/img'
}
