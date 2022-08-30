import { ObjectId, WithId } from 'mongodb'

import { IRecord } from '../models/types'
import * as db from '../db'

export async function list(
  options: {
    prev?: string
    next?: string
    limit?: number
  } = {}
) {
  const limit = options.limit || 10
  let items: WithId<IRecord>[] = []
  let hasNext = false
  let hasPrev = false
  if (options.next) {
    // 查询下一页
    items = await db.records
      .find({
        _id: {
          $lt: new ObjectId(options.next)
        }
      })
      .sort({ _id: -1 })
      .limit(limit)
      .toArray()
  } else if (options.prev) {
    // 查询上一页
    items = await db.records
      .find({
        _id: {
          $gt: new ObjectId(options.prev)
        }
      })
      .sort({ _id: 1 })
      .limit(limit)
      .toArray()
    items.reverse()
  } else {
    // 查询第一页
    items = await db.records.find().sort({ _id: -1 }).limit(limit).toArray()
  }
  if (items.length > 0) {
    // 是否还有下一页
    const next = await db.records.findOne(
      {
        _id: {
          $lt: new ObjectId(items[items.length - 1]._id)
        }
      },
      {
        sort: {
          _id: -1
        }
      }
    )
    if (next) hasNext = true
    // 是否还有上一页
    const prev = await db.records.findOne(
      {
        _id: {
          $gt: new ObjectId(items[0]._id)
        }
      },
      {
        sort: {
          _id: -1
        }
      }
    )
    if (prev) hasPrev = true
  }
  return {
    items,
    hasNext,
    hasPrev
  }
}
