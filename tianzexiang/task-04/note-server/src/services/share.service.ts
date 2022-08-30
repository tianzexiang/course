import { ObjectId } from 'mongodb'
import { EDeleteStat } from '../enums/model'
import { IPagination } from '../interfaces/request'
import { getUUId } from '../libs/crypto'
import { shareErrorStat } from '../libs/stat/share'
import { check } from '../middlewares/check'
import { ShareModel } from '../models/share.model'
import { isFolder, updateFileShareStat } from './folder-file.service'
import { getSession } from './session.service'

export async function getShareId(token: string, fileId: string) {
  const session = await getSession(token)
  const _fileId = new ObjectId(fileId)
  const res = await ShareModel.findOne({
    userId: session.userId,
    fileId: _fileId,
  })
  return {
    shareId: res.shareId,
  }
}

export async function getShare(token: string, pagination: IPagination) {
  const session = await getSession(token)
  const { limit, skip } = pagination
  const res = await ShareModel.aggregate([
    {
      $match: {
        userId: session.userId,
      },
    },
    {
      $lookup: {
        from: 'folder-files',
        localField: 'fileId',
        foreignField: '_id',
        as: 'shared_file',
      },
    },
    {
      $unwind: '$shared_file',
    },
    {
      $match: { 'shared_file.delete': { $ne: EDeleteStat.Delete } },
    },
    {
      $project: {
        'shared_file.userId': 0,
        'shared_file.pid': 0,
        'shared_file.content': 0,
        'shared_file.delete': 0,
        userId: 0,
        fileId: 0,
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]).toArray()
  const total = await ShareModel.countDocuments({
    userId: session.userId,
  })

  return {
    files: res,
    total,
  }
}

export async function createShare(token: string, fileId: string) {
  const session = await getSession(token)
  const _fileId = new ObjectId(fileId)
  const shareId = getUUId()
  // whether is shared
  const isShared = await ShareModel.findOne({
    fileId: _fileId,
  })
  // whether is folder
  const folder = await isFolder(fileId)
  check(!isShared, shareErrorStat.ERR_SHARE_EXIST)
  check(!folder, shareErrorStat.ERR_SHARE_FOLDER_NOT_ALLOWED)
  await ShareModel.insertOne({
    shareId,
    userId: session.userId,
    fileId: _fileId,
    views: 0,
    createdAt: new Date(),
  })
  // update share status
  await updateFileShareStat([_fileId], true)
  return { shareId }
}

export async function deleteShare(token: string, fileId: string) {
  const session = await getSession(token)
  const _fileId = new ObjectId(fileId)
  const isExist = await ShareModel.findOne({
    userId: session.userId,
    fileId: _fileId,
  })
  check(!!isExist, shareErrorStat.ERR_SHARE_NOT_FOUND)
  await ShareModel.deleteOne({
    userId: session.userId,
    fileId: _fileId,
  })
  // update share status
  await updateFileShareStat([_fileId], false)
}

export async function getSharedFileContent(shareId: string) {
  const isExist = await ShareModel.findOne({
    shareId,
  })
  check(!!isExist, shareErrorStat.ERR_SHARE_NOT_FOUND)
  const res = await ShareModel.aggregate([
    {
      $match: { shareId },
    },
    {
      $lookup: {
        from: 'folder-files',
        localField: 'fileId',
        foreignField: '_id',
        as: 'shared_file',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$shared_file' },
    { $unwind: '$user' },
    {
      $project: {
        'shared_file.title': 1,
        'shared_file.content': 1,
        'shared_file.folder': 1,
        'shared_file.createdAt': 1,
        'shared_file.updatedAt': 1,
        'user.nickname': 1,
        views: 1,
        shareId: 1,
        createdAt: 1,
      },
    },
  ]).toArray()
  return {
    fileContent: res,
  }
}

export async function updateViews(shareId: string) {
  const res = await ShareModel.updateOne(
    { shareId },
    {
      $inc: { views: 1 },
    }
  )
  check(!!res.acknowledged, shareErrorStat.ERR_SHARE_NOT_FOUND)
}

// cascade delete by file
export async function deleteByCascade(id: ObjectId[]) {
  await ShareModel.deleteMany({
    fileId: {
      $in: id,
    },
  })
  // update share status
  await updateFileShareStat(id, false)
}
