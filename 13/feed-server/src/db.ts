import { Db, MongoClient } from 'mongodb'
import { createUserModel } from './models/user.model'
import { createSessionModel } from './models/sessions.model'
import { createPostModel } from './models/post.model'
import { createLikeModel } from './models/like.model'
import { createFollowModel } from './models/follow.model'
import { createNotifyModel } from './models/notify.model'
import { createDirectMsgModel } from './models/directMsg.model'

// init db
function initModel (db: Db) {
  createUserModel(db)
  createPostModel(db)
  createSessionModel(db)
  createLikeModel(db)
  createFollowModel(db)
  createNotifyModel(db)
  createDirectMsgModel(db)
}

// init mongodb
async function initDb () {
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
