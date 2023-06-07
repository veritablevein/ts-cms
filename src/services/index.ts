import { BASE_URL, TIMEOUT } from './config'
import MyRequest from './request'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  // 局部拦截
  interceptors: {
    requestOnFulfilled: config => {
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
