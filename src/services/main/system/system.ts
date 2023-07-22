import myRequest from '@/services'

export function postUserListData(queryInfo: any) {
  return myRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return myRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return myRequest.post({
    url: '/users',
    data: userInfo
  })
}
