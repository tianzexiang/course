import { IFollow } from '../interfaces/model'
import { Collection, Db } from 'mongodb'

export let FollowModel: Collection<IFollow>

export function createFollowModel (db: Db) {
  FollowModel = db.collection<IFollow>('follow')
  return FollowModel
}
