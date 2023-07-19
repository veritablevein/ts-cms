export interface IAccount {
  name: string
  password: string
}

export interface IPhone {
  number: string
  verifycode: string
}

export interface IUserInfo {
  id?: number
  name?: string
  realname?: string
  cellphone?: number
  enable?: number
  role?: IRole
  roleId?: number
  department?: IDepartment
  departmentId?: number
  createAt?: string
  updateAt?: string
}

export interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface IDepartment {
  id: number
  name: string
  parentId: any
  createAt: string
  updateAt: string
  leader: string
}

export type IUserMenus = IUserMenusItem[]

export interface IUserMenusItem {
  id: string
  name: string
  icon: string
  url: string
  children?: IUserMenus
}

export interface ISystemState {
  usersList: IUserInfo[]
  usersTotalCount: number
}
