export interface IUser {
  id: number | null
  name: string
  email: string
  phone: string
  roleId: number
  birthDate?: string | null
  address?: string | null
}

export class User implements IUser {
  id: number | null = null
  name = ""
  email = ""
  phone = ""
  roleId = 3
  birthDate: string | null = null
  address: string | null = null

  constructor(init: Partial<IUser>) {
    Object.assign(this, init)
  }
}
