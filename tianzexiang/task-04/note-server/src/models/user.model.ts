import { Collection, Db } from 'mongodb'
import { IUser } from '../interfaces/model'

export let UserModel: Collection<IUser>

export function createUserModel(db: Db) {
  UserModel = db.collection<IUser>('users')
  return UserModel
}
