import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3010',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
}

const defHttp = axios.create(config)

async function http<T> (
  url: string,
  method: string,
  data?: unknown,
  headers?: AxiosRequestHeaders
) {
  const res = await defHttp({ url, method, data, headers })
  const responseData: T = res.data
  return responseData
}

export function httpPost<T> (
  url: string,
  data?: unknown,
  headers?: AxiosRequestHeaders
) {
  return http<T>(url, 'POST', data, headers)
}

export function httpGet<T> (url: string, headers?: AxiosRequestHeaders) {
  return http<T>(url, 'GET', undefined, headers)
}

export function getURLSearchParams (params: Record<string, string>) {
  const query = new URLSearchParams(params)
  return '?' + query.toString()
}

export function getEncodeURLUserId (userId: string) {
  return '@' + encodeURIComponent(userId.replace('@', ''))
}

export function getEncodeURL (url: string) {
  return encodeURIComponent(url)
}
