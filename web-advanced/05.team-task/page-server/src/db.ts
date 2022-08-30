import { MongoClient, Collection } from 'mongodb'
import { IRecord } from './models/types'

export let records: Collection<IRecord>

export async function init() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db()
  records = db.collection('records')
}
