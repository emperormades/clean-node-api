import type { ObjectId } from 'mongodb'
import type {
  AccountRepositoryModel,
  AddAccountRepository,
  AddAccountRepositoryModel
} from '../../../../application/contracts'
import { MongoHelper } from '../helpers'


export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountRepositoryModel): Promise<AccountRepositoryModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const insertedDocument = await accountCollection
      .findOne<MapperAccountRepositoryModel>({ _id: result.insertedId })
    return MongoHelper.map(insertedDocument)
  }
}

export interface MapperAccountRepositoryModel {
  _id: ObjectId
  name: string
  email: string
  password: string
}
