import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData
} from '@/services/main/system/system'
import type { ISystemState } from '@/types'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUserListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      this.postUsersListAction({ size: 10, offset: 0 })
    },
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      console.log(newResult)
      this.postUsersListAction({ size: 10, offset: 0 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
      this.postUsersListAction({ size: 10, offset: 0 })
    },

    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { size: 10, offset: 0 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { size: 10, offset: 0 })
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { size: 10, offset: 0 })
    }
  }
})

export default useSystemStore
