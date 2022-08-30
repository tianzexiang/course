export interface IRegister {
  nickname: string
  username: string
  password: string
}

export type ILogin = Omit<IRegister, 'nickname'>

export interface IChangePwd {
  password: string
  old_password: string
}

export interface ISetUserInfo {
  nickname: string
}

export interface IPagination {
  skip: number
  limit: number
}

export interface IGetFoldAndFile extends IPagination {
  folderId?: string
}

export interface IGetContent {
  fileId: string
}

export interface IGetFolderOrFileInfo {
  id: string
  folder: boolean
}

export interface ICreateFolderOrFile {
  title: string
  folder: boolean
  folderId?: string
}

export interface ISaveFolderFile {
  id: string
  title?: string
  content?: string
}

export interface IDeleteFolderOrFile {
  // folder or file id
  id: string
  folder: boolean
}

export interface ICreateShare {
  // file id
  fileId: string
}

export interface IGetShareId {
  // file id
  fileId: string
}

export interface IGetSharedFileContent {
  // share id
  shareId: string
}

export interface IDeleteShare {
  // file id
  fileId: string
}
