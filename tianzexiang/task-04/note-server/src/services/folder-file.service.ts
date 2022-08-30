import { ObjectId } from 'mongodb'
import { EDeleteStat } from '../enums/model'
import {
  ICreateFolderOrFile,
  IDeleteFolderOrFile,
  IGetFoldAndFile,
  IGetFolderOrFileInfo,
  IPagination,
  ISaveFolderFile,
} from '../interfaces/request'
import { FolderFileModel } from '../models/folder-file.model'
import { getSession } from './session.service'
import { check } from '../middlewares/check'
import { folderFileErrorStat } from '../libs/stat/folder-file'
import { deleteByCascade } from './share.service'

export async function getFolderAndFile(token: string, params: IGetFoldAndFile) {
  const session = await getSession(token)
  const { skip, limit, folderId = null } = params
  // if pid exist then transform it to ObjectId
  const pid = folderId && new ObjectId(folderId)
  const currentFolder = await FolderFileModel.findOne({
    userId: session.userId,
    _id: pid,
    folder: true,
    delete: EDeleteStat.Normal,
  })
  const res = await FolderFileModel.find(
    {
      userId: session.userId,
      pid,
      delete: EDeleteStat.Normal,
    },
    {
      projection: {
        userId: 0,
        pid: 0,
        delete: 0,
        content: 0,
      },
    }
  )
    .sort({ folder: -1, title: 1 })
    .skip(skip)
    .limit(limit)
    .toArray()
  const total = await FolderFileModel.countDocuments({
    userId: session.userId,
    pid,
    delete: EDeleteStat.Normal,
  })
  return {
    files: res,
    total,
    currentFolder: (currentFolder && currentFolder.title) ?? '',
  }
}

export async function getRecentFile(token: string, params: IPagination) {
  const session = await getSession(token)
  const { skip, limit } = params
  const res = await FolderFileModel.find(
    {
      userId: session.userId,
      folder: false,
      delete: EDeleteStat.Normal,
    },
    {
      projection: {
        userId: 0,
        pid: 0,
        delete: 0,
        content: 0,
      },
    }
  )
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray()
  const total = await FolderFileModel.countDocuments({
    userId: session.userId,
    folder: false,
    delete: EDeleteStat.Normal,
  })
  return {
    files: res,
    total,
  }
}

export async function getFileContent(token: string, fileId: string) {
  const _fileId = new ObjectId(fileId)
  const session = await getSession(token)
  const res = await FolderFileModel.find(
    {
      _id: _fileId,
      userId: session.userId,
      folder: false,
      delete: EDeleteStat.Normal,
    },
    {
      projection: {
        pid: 0,
        userId: 0,
        delete: 0,
      },
    }
  ).toArray()
  // if res is not found
  check(!!res, folderFileErrorStat.ERR_FILE_NOT_FOUND)

  return {
    fileContent: res,
  }
}

export async function createFolderOrFile(
  token: string,
  params: ICreateFolderOrFile
) {
  const session = await getSession(token)
  const { title, folderId = null, folder } = params
  const pid = folderId && new ObjectId(folderId)
  const isTitleExist = await FolderFileModel.findOne({
    userId: session.userId,
    title,
    folder,
    delete: EDeleteStat.Normal,
    pid,
  })
  const isInFile = await FolderFileModel.findOne({
    userId: session.userId,
    _id: pid,
  })
  // whether the title is exist
  check(
    !isTitleExist,
    folder
      ? folderFileErrorStat.ERR_FOLDER_TITLE_EXIST
      : folderFileErrorStat.ERR_FILE_TITLE_EXIST
  )
  // whether is creating file in file
  if (pid !== null) {
    // if is not in root
    check(!!isInFile.folder, folderFileErrorStat.ERR_CREATE_NEW_IN_FILE)
  }

  const res = await FolderFileModel.insertOne({
    userId: session.userId,
    title,
    folder: folder,
    pid,
    content: '',
    isShared: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    delete: EDeleteStat.Normal,
  })
  return {
    id: res.insertedId,
  }
}

export async function saveFile(token: string, params: ISaveFolderFile) {
  const session = await getSession(token)
  const { id, content = '', title = '' } = params
  const _id = new ObjectId(id)
  const isExist = await FolderFileModel.findOne({
    userId: session.userId,
    _id,
    delete: EDeleteStat.Normal,
  })
  // check if the file or folder is allowed to be edited
  check(!!isExist, folderFileErrorStat.ERR_EDIT_FORBIDDEN)

  // if saving title,then check and set title
  if (title) {
    const isTitleExist = await FolderFileModel.findOne({
      userId: session.userId,
      title,
      folder: isExist.folder,
      delete: EDeleteStat.Normal,
      pid: isExist.pid,
    })

    check(
      !isTitleExist,
      isExist.folder
        ? folderFileErrorStat.ERR_FOLDER_TITLE_EXIST
        : folderFileErrorStat.ERR_FILE_TITLE_EXIST
    )
    await FolderFileModel.updateOne(
      {
        _id,
      },
      {
        $set: { title, updatedAt: Date.now() },
      }
    )
  } else {
    await FolderFileModel.updateOne(
      {
        _id,
      },
      {
        $set: { content, updatedAt: Date.now() },
      }
    )
  }
}

export async function deleteFolderOrFile(
  token: string,
  params: IDeleteFolderOrFile
) {
  const session = await getSession(token)
  const { id, folder } = params
  const _id = new ObjectId(id)
  const isExist = await FolderFileModel.findOne({
    userId: session.userId,
    folder,
    _id,
    delete: EDeleteStat.Normal,
  })
  // check if the file or folder is exist
  check(
    !!isExist,
    folder
      ? folderFileErrorStat.ERR_FOLDER_NOT_FOUND
      : folderFileErrorStat.ERR_FILE_NOT_FOUND
  )
  // find all children id
  const allChildrenId = await FolderFileModel.aggregate([
    {
      $match: {
        _id,
      },
    },
    {
      $graphLookup: {
        from: 'folder-files',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'pid',
        as: 'sub',
      },
    },
    {
      $project: {
        'sub._id': 1,
      },
    },
  ]).toArray()
  const { _id: targetId, sub } = allChildrenId[0]
  // get all id need to be delete
  const allIdNeedToBeDeleted = sub.map((val) => val._id).concat(targetId)
  // soft delete file or folder
  await FolderFileModel.updateMany(
    {
      _id: { $in: allIdNeedToBeDeleted },
    },
    {
      $set: {
        delete: EDeleteStat.Delete,
      },
    }
  )
  // hard delete share
  await deleteByCascade(allIdNeedToBeDeleted)
}

// update file stat cascade
export async function updateFileShareStat(
  fileIds: ObjectId[],
  isShared: boolean
) {
  await FolderFileModel.updateMany(
    { _id: { $in: fileIds }, folder: false },
    { $set: { isShared } }
  )
}

export async function isFolder(id: string) {
  const _id = new ObjectId(id)
  const res = await FolderFileModel.findOne({
    _id,
  })
  return res.folder
}

export async function getFolderOrFileInfo(
  token: string,
  { id, folder }: IGetFolderOrFileInfo
) {
  const _id = new ObjectId(id)
  const session = await getSession(token)
  const res = await FolderFileModel.find(
    {
      _id,
      userId: session.userId,
      delete: EDeleteStat.Normal,
    },
    {
      projection: {
        pid: 0,
        userId: 0,
        delete: 0,
        content: 0,
      },
    }
  ).toArray()
  // if res is not found
  check(
    !!res,
    folder
      ? folderFileErrorStat.ERR_FOLDER_NOT_FOUND
      : folderFileErrorStat.ERR_FILE_NOT_FOUND
  )

  return {
    info: res,
  }
}
