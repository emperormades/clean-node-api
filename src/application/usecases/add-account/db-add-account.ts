import type { AccountModel, AddAccount, AddAccountModel } from '../../../domain/usecases'
import type { AddAccountRepository, Encrypter } from '../../contracts'

interface DbAddAccountParams {
  encrypter: Encrypter
  addAccountRepository: AddAccountRepository
}

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor ({ encrypter, addAccountRepository }: DbAddAccountParams) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword}))
    return new Promise(resolve => { resolve(null) })
  }
}
