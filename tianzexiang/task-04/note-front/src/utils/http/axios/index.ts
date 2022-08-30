import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { Toast } from 'antd-mobile'
import { EServiceRespCode } from '@/enums/status'
import { EPagePath } from '@/enums/page'
import { isBrowser } from '@/utils/isBrowser'

const baseURL = isBrowser() ? '' : process.env.API_SERVER

const config: AxiosRequestConfig = {
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

const defHttp = axios.create(config)

defHttp.interceptors.request.use(
  config => {
    isBrowser() &&
      Toast.show({
        content: '',
        icon: 'loading',
      })
    return config
  },
  err => Promise.reject(err)
)

// 设置回应拦截
defHttp.interceptors.response.use(
  response => {
    if (isBrowser()) {
      if (response.data.code !== EServiceRespCode.OK && response.data.msg) {
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
  err => {
    if (isBrowser()) {
      Toast.clear()
      Toast.show({
        content: '请求出错',
        icon: 'fail',
      })
    }
    return Promise.reject(err)
  }
)

async function http<T>(
  url: string,
  method: string,
  data?: unknown,
  headers?: AxiosRequestHeaders
) {
  const res = await defHttp({ url, method, data, headers })
  const responseData: T = res.data
  return responseData
}

export function httpPost<T>(
  url: string,
  data?: unknown,
  headers?: AxiosRequestHeaders
) {
  return http<T>(url, 'POST', data, headers)
}

export function httpGet<T>(url: string, headers?: AxiosRequestHeaders) {
  return http<T>(url, 'GET', undefined, headers)
}
