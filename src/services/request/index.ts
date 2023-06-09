import axios from 'axios'
import type { MyRequestConfig, CoverAxiosInstance } from './type'

class MyRequest {
  instance: CoverAxiosInstance
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    // 全局拦截
    this.instance.interceptors.request.use(
      config => {
        return config
      },
      err => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      res => {
        return res.data
      },
      err => {
        return err
      }
    )

    // 针对特定实例的局部拦截
    this.instance.interceptors.request.use(
      config.interceptors?.requestOnFulfilled,
      config.interceptors?.requestOnRejected
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseOnFulfilled,
      config.interceptors?.responseOnRejected
    )
  }

  request<T = any>(config: MyRequestConfig<T>) {
    if (config.interceptors?.requestOnFulfilled) {
      config = config.interceptors.requestOnFulfilled(config)
    }
    return new Promise<T>((resovle, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseOnFulfilled) {
            res = config.interceptors.responseOnFulfilled(res)
          }
          resovle(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
