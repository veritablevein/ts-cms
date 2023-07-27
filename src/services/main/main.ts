import myRequest from '..'

export function getEntireRoles() {
  return myRequest.post({
    url: '/role/list',
    data: {
      offset: 0,
      size: 100
    }
  })
}

export function getEntireDepartments() {
  return myRequest.post({
    url: '/department/list',
    data: {
      offset: 0,
      size: 100
    }
  })
}

export function getEntireMenus() {
  return myRequest.post({
    url: '/menu/list'
  })
}
