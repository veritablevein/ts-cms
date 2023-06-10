import { localCache } from '@/utils/cache'
import { BASE_URL, TIMEOUT } from './config'
import MyRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  // 局部拦截
  interceptors: {
    requestOnFulfilled: config => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = token
      }
      return config
    },
    requestOnRejected: err => {
      return err
    },
    responseOnFulfilled: res => {
      return res
    },
    responseOnRejected: err => {
      return err
    }
  }
})

export default myRequest
