import * as request from './request'
import { IListRes } from '@/interfaces/todo'

enum Api {
  create = '/api/create',
  list = '/api/list',
  done = '/api/done',
  cancel = '/api/cancel',
  delete = '/api/delete'
}

export function getTodoList () {
  return request.get<IListRes>(Api.list)
}

export function createTodo (content: string) {
  return request.post<IListRes>(Api.create, { content })
}

export function doneTodo (id: string) {
  return request.post<IListRes>(Api.done, { id })
}

export function cancelTodo (id: string) {
  return request.post<IListRes>(Api.cancel, { id })
}

export function deleteTodo (id: string) {
  return request.post<IListRes>(Api.delete, { id })
}
