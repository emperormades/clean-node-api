import type {
  AccountRepositoryModel,
  AddAccountRepository,
  AddAccountRepositoryModel
} from '../../../../application/contracts'
import { type MapperAccountRepositoryModel, MongoHelper } from '../helpers'


export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountRepositoryModel): Promise<AccountRepositoryModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const insertedDocument = await accountCollection
      .findOne<MapperAccountRepositoryModel>({ _id: result.insertedId })
    return MongoHelper.map(insertedDocument)
  }
}
