import * as request from './request'
import { IListRes } from '../types'

export function list() {
  return request.post<IListRes>('/api/list')
}
