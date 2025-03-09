import type { ObjectId } from 'mongodb'

export interface MapperAccountRepositoryModel {
  _id: ObjectId
  name: string
  email: string
  password: string
}
