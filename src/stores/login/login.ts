import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'
import router from '@/router'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/services/login/login'
import type { IAccount, IUserInfo, IUserMenus } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'

interface ILoginState {
  token: string
  userInfo: IUserInfo
  userMenus: IUserMenus
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(USER_INFO) ?? {},
    userMenus: localCache.getCache(USER_MENUS) ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token

      localCache.setCache(LOGIN_TOKEN, this.token)

      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role!.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      const routes = mapMenusToRoutes(userMenus)
      routes.forEach(route => router.addRoute('main', route))

      router.push('/main')
    }
  }
})

export default useLoginStore
