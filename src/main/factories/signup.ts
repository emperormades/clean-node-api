import { DbAddAccount } from '../../application/usecases/add-account'
import { BcryptAdapter } from '../../infrastructure/criptography'
import { AccountMongoRepository } from '../../infrastructure/db/mongodb/account-repository'
import type { Controller } from '../../presentation/contracts'
import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const dbAddAccount = new DbAddAccount({
    encrypter: bcryptAdapter,
    addAccountRepository: accountMongoRepository
  })
  return new SignUpController({
    emailValidator: emailValidatorAdapter,
    addAccount: dbAddAccount
  })
}
