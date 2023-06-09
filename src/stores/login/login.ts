import { accountLoginRequest } from '@/services/login/login'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      console.log(loginResult)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token
    }
  }
})

export default useLoginStore
