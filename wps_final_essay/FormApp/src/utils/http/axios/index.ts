import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum'

const axiosOptions: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let loadingInstance: any

export const defHttp = axios.create(axiosOptions)

defHttp.interceptors.request.use(config => {
  loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return config
}, err => Promise.reject(err))

// 设置回应拦截
defHttp.interceptors.response.use((response) => {
  if (loadingInstance.close) loadingInstance.close()
  return response
}, (err) => {
  if (loadingInstance.close) loadingInstance.close()
  switch (err.response.status) {
    case 408:
      ElMessage.error(ResultEnum.REQUEST_TIMEOUT)
      break
    case 404:
      ElMessage.warning(ResultEnum.NOT_FOUND)
      break
    case 500:
      if (err.response.data.msg) {
        ElMessage.warning(err.response.data.msg)
      } else {
        ElMessage.error(ResultEnum.NET_WORK_ERROR)
      }
      break
    default:
      ElMessage.error(ResultEnum.NET_WORK_ERROR)
      break
  }
  return Promise.reject(err)
})

async function http<T> (url: string, method: string, data?: unknown) {
  const res = await defHttp({ url, method, data })
  const responseData: T = res.data
  return responseData
}

export function httpPost<T> (url: string, data?: unknown) {
  return http<T>(url, RequestEnum.POST, data)
}

export function httpGet<T> (url:string) {
  return http<T>(url, RequestEnum.GET)
}
