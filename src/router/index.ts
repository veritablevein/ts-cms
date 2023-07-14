import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createDiscreteApi } from 'naive-ui'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

const { loadingBar } = createDiscreteApi(['loadingBar'], {
  loadingBarProviderProps: {
    themeOverrides: {
      colorLoading: '#63E2B7FF'
    }
  }
})
router.beforeEach(to => {
  loadingBar.start()
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

router.afterEach(to => {
  loadingBar.finish()
})

export default router
