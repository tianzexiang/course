import { IFolderFile, IShare, IUser } from './model'


export interface IResp<T = unknown> {
  status: number
  code: number
  msg?: string
  data?: T
}

export type TFileResp = Omit<IFolderFile, 'pid' | 'delete' | 'userId'> & {
  _id: string
}
export type TFileRespWithoutContent = Omit<TFileResp, 'content'>

export type TShareResp = Omit<IShare, 'userId' | 'fileId'>

export type TSharedFileResp = TShareResp & {
  shared_file: TFileRespWithoutContent
}

export type TSharedContentResp = TShareResp & {
  shared_file: TFileResp
} & { user: Pick<IUser, 'nickname'> }

export interface IGetUserInfoResp {
  nickname: string
  createAt: number
  _id: string
}

export interface IGetFileResp {
  files: TFileRespWithoutContent[]
  total: number
  currentFolder?: string
}

export interface IGetFileContentResp {
  fileContent: TFileResp[]
}

export interface ICreateFileResp {
  id: string
}

export interface IGetFolderOrFileInfo {
  info: TFileRespWithoutContent[]
}

// share
export interface ICreateShareResp {
  shareId: string
}
export interface IGetShareResp {
  files: TSharedFileResp[]
  total: number
}

export interface IGetSharedFileContentResp {
  fileContent: TSharedContentResp[]
}

export interface IGetShareIdResp {
  shareId: string
}
