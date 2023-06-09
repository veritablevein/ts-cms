import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
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

router.beforeEach(to => {
  if (to.path === '/main') {
    const token = localCache.getCache(LOGIN_TOKEN)
    if (!token) return '/login'
  }
})

export default router
