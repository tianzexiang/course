import { Db, MongoClient } from 'mongodb'
import { createFolderFileModel } from './models/folder-file.model'
import { createUserModel } from './models/user.model'
import { createSessionModel } from './models/sessions.model'
import { createShareModel } from './models/share.model'

// init db
function initModel(db: Db) {
  createFolderFileModel(db)
  createUserModel(db)
  createSessionModel(db)
  createShareModel(db)
}

// init mongodb
async function initDb() {
  try {
    // create mongo connection
    const client = new MongoClient(process.env.MONGODB_CONNECT_URL)
    await client.connect()
    // create db
    const db = client.db()
    initModel(db)
    console.log('connect db successfully')
  } catch (error) {
    console.trace(error)
  }
}

export { initDb }
