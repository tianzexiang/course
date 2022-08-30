import { Collection, Db } from 'mongodb'
import { INotify } from '../interfaces/model'

export let NotifyModel: Collection<INotify>

export function createNotifyModel (db:Db) {
  NotifyModel = db.collection<INotify>('notify')
  return NotifyModel
}
