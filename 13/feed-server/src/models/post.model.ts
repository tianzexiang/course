import { Collection, Db } from 'mongodb'
import { IPost } from '../interfaces/model'

export let PostModel: Collection<IPost>

export function createPostModel (db: Db) {
  PostModel = db.collection<IPost>('post')
  return PostModel
}
