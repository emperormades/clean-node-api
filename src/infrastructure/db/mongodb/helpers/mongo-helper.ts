import {
  type Collection,
  type Db,
  type ObjectId,
  MongoClient
} from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.topology.isConnected()) {
      await this.connect(this.uri)
    }
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
