import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/**.ts',
    {
      eager: true
    }
  )
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()

  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find(item => item.path === submenu.url)
      if (route) {
        if (!routes.find(item => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }

      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) return submenu
    }
  }
}

interface IBreadcrumb {
  name: string
  path: string
}

export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  const breadcrumb: IBreadcrumb[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumb.push({ name: menu.name, path: menu.url })
        breadcrumb.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumb
}
