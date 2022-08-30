import { Collection, Db } from 'mongodb'
import { IDirectMsg } from '../interfaces/model'

export let DirectMsgModel: Collection<IDirectMsg>

export function createDirectMsgModel (db:Db) {
  DirectMsgModel = db.collection<IDirectMsg>('directMsg')
  return DirectMsgModel
}
