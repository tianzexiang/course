import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const defHttp = axios.create(config)

async function http<T> (url: string, method: string, data?: unknown) {
  const res = await defHttp({ url, method, data })
  const responseData: T = res.data
  return responseData
}

export function httpPost<T> (url: string, data?: unknown) {
  return http<T>(url, 'POST', data)
}

export function httpGet<T> (url: string) {
  return http<T>(url, 'GET')
}
