import type {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosInterceptorManager
} from 'axios'

export interface MyInterceptors<T = AxiosResponse> {
  requestOnFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestOnRejected?: (err: any) => any
  responseOnFulfilled?: (res: T) => T
  responseOnRejected?: (err: any) => any
}

export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyInterceptors<T>
}

export interface CoverAxiosInstance
  extends Omit<AxiosInstance, 'interceptors'> {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
}
