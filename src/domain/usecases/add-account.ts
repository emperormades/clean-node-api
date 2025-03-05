export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export type AccountModel = {
  id: string
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
