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
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: IUserInfo
  userMenus: IUserMenus
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
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

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      const routes = mapMenusToRoutes(userMenus)
      routes.forEach(route => router.addRoute('main', route))

      router.push('/main')
    },

    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        const routes = mapMenusToRoutes(userMenus)
        routes.forEach(route => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
