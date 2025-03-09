export type AddAccountRepositoryModel = {
  name: string
  email: string
  password: string
}

export type AccountRepositoryModel = {
  id: string
  name: string
  email: string
  password: string
}

export interface AddAccountRepository {
  add: (account: AddAccountRepositoryModel) => Promise<AccountRepositoryModel>
}
