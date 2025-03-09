import type {
  AccountRepositoryModel,
  AddAccountRepository,
  AddAccountRepositoryModel
} from '../../../../application/contracts'
import { MongoHelper } from '../helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountRepositoryModel): Promise<AccountRepositoryModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const insertedDocument = await accountCollection.findOne({ _id: result.insertedId })
    const account: AccountRepositoryModel = {
      id: insertedDocument._id.toString(),
      name: insertedDocument.name,
      email: insertedDocument.email,
      password: insertedDocument.password
    }
    return account
  }
}
