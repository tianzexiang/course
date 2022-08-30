import { Collection, Db } from 'mongodb'
import { IFolderFile } from '../interfaces/model'

export let FolderFileModel: Collection<IFolderFile>

export function createFolderFileModel(db: Db) {
  FolderFileModel = db.collection<IFolderFile>('folder-files')
  return FolderFileModel
}
