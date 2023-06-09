import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { accountLoginRequest } from '@/services/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      console.log(loginResult)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token

      localCache.setCache(LOGIN_TOKEN, this.token)

      router.push('/main')
    }
  }
})

export default useLoginStore
