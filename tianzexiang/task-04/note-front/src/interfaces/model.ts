// user model
export interface IUser {
  account: string
  nickname: string
  // hmac pwd
  password: string
  salt: string
  status: number
  // when user created
  createdAt: number
}

// session model
export interface ISession {
  // session id
  sid: string
  // user id
  userId: string
  // login ip
  ip: string
  // session create time
  createdAt: Date
}

// folder or file model
export interface IFolderFile {
  // folder or file title
  title: string
  // folder belongs to who
  userId: string
  // parent folder id , if nulls then is in root folder
  pid: string
  // is folder
  folder: boolean
  // content string
  content: string
  // is file shared
  isShared: boolean
  // folder create time
  createdAt: number
  // folder update time
  updatedAt: number
  // is delete
  delete: number
}

// share model
export interface IShare {
  // share id
  shareId: string
  // share belongs to who
  userId: string
  // file id
  fileId: string
  // the counts of how many times the file has been viewed
  views: number
  // folder create time
  createdAt: Date
}
