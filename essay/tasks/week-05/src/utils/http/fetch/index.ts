import { MethodEnum } from '@/enums/requestEnum'

async function request<T> (method: string, url: string) {
  const res = await fetch(url, {
    method
  })
  const json: T = await res.json()
  return json
}

export function get<T> (url: string) {
  return request<T>(MethodEnum.GET, url)
}
