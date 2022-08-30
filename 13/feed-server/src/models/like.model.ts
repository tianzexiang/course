import { Collection, Db } from 'mongodb'
import { ILikes } from '../interfaces/model'

export let LikeModel: Collection<ILikes>

export function createLikeModel (db: Db) {
  LikeModel = db.collection<ILikes>('like')
  return LikeModel
}
