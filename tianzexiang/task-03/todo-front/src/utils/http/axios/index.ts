import axios, { AxiosRequestConfig } from 'axios'
import { Toast } from 'antd-mobile'
import { EServiceRespCode } from '../../../enums/status'
import { EPagePath } from '../../../enums/pageEnum'

const config: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
}

const defHttp = axios.create(config)

defHttp.interceptors.request.use(
  (config) => {
    Toast.show({
      content: '',
      icon: 'loading',
    })
    return config
  },
  (err) => Promise.reject(err)
)

// 设置回应拦截
defHttp.interceptors.response.use(
  (response) => {
    Toast.clear()
    if (response.data.code !== EServiceRespCode.OK) {
      if (response.data.msg) {
        if (
          !(
            response.data.code === 20005 &&
            window.location.href.includes(EPagePath.LOGIN)
          )
        ) {
          Toast.show({
            content: response.data.msg,
            icon: 'fail',
          })
        }
      }
    }
    return response
  },
  (err) => {
    Toast.clear()
    Toast.show({
      content: '请求出错',
      icon: 'fail',
    })
    return Promise.reject(err)
  }
)

async function http<T>(url: string, method: string, data?: unknown) {
  const res = await defHttp({ url, method, data })
  const responseData: T = res.data
  return responseData
}

export function httpPost<T>(url: string, data?: unknown) {
  return http<T>(url, 'POST', data)
}

export function httpGet<T>(url: string) {
  return http<T>(url, 'GET')
}
