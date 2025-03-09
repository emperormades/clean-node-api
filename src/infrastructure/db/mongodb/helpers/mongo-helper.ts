import {
  type Collection,
  type Db,
  type ObjectId,
  MongoClient
} from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    const db: Db = this.client.db()
    return db.collection(name)
  },

  map: <T>(document: T & { _id: ObjectId }): Omit<T, '_id'> & { id: string } => {
    const { _id, ...accountWithoutId } = document
    return {
      ...accountWithoutId,
      id: _id.toHexString()
    }
  }
}
