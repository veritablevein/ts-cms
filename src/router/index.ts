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
      component: () => import('../views/main/Main.vue'),
      children: [
        {
          path: '/main/analysis/overview',
          component: () =>
            import('../views/main/analysis/overview/overview.vue')
        },
        {
          path: '/main/analysis/dashboard',
          component: () =>
            import('../views/main/analysis/dashboard/dashboard.vue')
        },
        {
          path: '/main/system/user',
          component: () => import('../views/main/system/user/user.vue')
        },
        {
          path: '/main/system/department',
          component: () =>
            import('../views/main/system/department/department.vue')
        },
        {
          path: '/main/system/menu',
          component: () => import('../views/main/system/menu/menu.vue')
        },
        {
          path: '/main/system/role',
          component: () => import('../views/main/system/role/role.vue')
        },
        {
          path: '/main/product/category',
          component: () => import('../views/main/product/category/category.vue')
        },
        {
          path: '/main/product/goods',
          component: () => import('../views/main/product/goods/goods.vue')
        },
        {
          path: '/main/story/chat',
          component: () => import('../views/main/story/chat/chat.vue')
        },
        {
          path: '/main/story/list',
          component: () => import('../views/main/story/list/list.vue')
        }
      ]
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
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router
