export interface IPagination {
  prev?: string
  next?: string
  limit: number
}

export interface IGetUserPosts extends IPagination {
  userId: string
}

export interface IGetFollowPosts extends IPagination {
  token:string
}

export interface ICreate{
  content: string,
  imgs: string[]
  relationId?: string
}

export interface ICreatePost extends ICreate {
  token: string,
}

export interface IGetDetail {
  _id: string // post_id
  token: string
}

export interface IDelPost {
  _id: string // post_id
}

export type IThumbsUp = IGetDetail

export interface IGetComments extends IPagination {
  _id: string // post_id
  token: string
}
