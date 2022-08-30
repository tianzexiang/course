import { Collection, Db } from 'mongodb'
import { ISession } from '../interfaces/model'

export let SessionModel: Collection<ISession>

export function createSessionModel(db: Db) {
  SessionModel = db.collection<ISession>('sessions')
  // set ttl
  SessionModel.createIndex(
    { createAt: 1 },
    { expireAfterSeconds: 3600 * 24 * 14 }
  )
  return SessionModel
}
