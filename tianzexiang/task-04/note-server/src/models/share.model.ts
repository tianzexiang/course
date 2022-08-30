import { Collection, Db } from 'mongodb'
import { IShare } from '../interfaces/model'

export let ShareModel: Collection<IShare>

export function createShareModel(db: Db) {
  ShareModel = db.collection<IShare>('shares')
  return ShareModel
}