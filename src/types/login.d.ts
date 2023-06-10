export interface IAccount {
  name: string
  password: string
}

export interface IPhone {
  number: string
  verifycode: string
}

export interface userInfo {
  id?: number
  name?: string
  realname?: string
  cellphone?: number
  enable?: number
  createAt?: string
  updateAt?: string
  role?: Role
  department?: Department
}

export interface Role {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface Department {
  id: number
  name: string
  parentId: any
  createAt: string
  updateAt: string
  leader: string
}
