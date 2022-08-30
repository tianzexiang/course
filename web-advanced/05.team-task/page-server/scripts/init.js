require('dotenv').config()
const { MongoClient } = require('mongodb')

async function start() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db()
  const records = db.collection('records')
  for (let i = 0; i < 100; i++) {
    await records.insertOne({
      content: `记录序号_${i}`,
      createdAt: Date.now()
    })
  }
  await records.createIndex({
    createdAt: 1
  })
  client.close()
}

start()
