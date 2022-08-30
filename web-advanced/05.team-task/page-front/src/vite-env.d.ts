/// <reference types="vite/client" />

declare interface IRecord {
  _id: string
  content: string
  createdAt: number
}

declare interface IListResp {
  items: IRecord[]
  hasNext: boolean
  hasPrev: boolean
}

declare interface ApiResp<T> {
  code: number
  data: T
}
