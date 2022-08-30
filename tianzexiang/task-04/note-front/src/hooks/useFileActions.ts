import { useCallback, useState } from 'react'
import { createFolderOrFile, deleteFolderOrFile, saveFile } from '@/api/file'
import {
  ICreateFolderOrFile,
  ICreateShare,
  IDeleteFolderOrFile,
  IDeleteShare,
  IGetShareId,
  ISaveFolderFile,
} from '@/interfaces/request'
import { createSharedFile, deleteSharedFile, getShareId } from '@/api/share'
import { check, checkWithData } from '@/utils/checkHttpRes'
import { Toast } from 'antd-mobile'

interface IUseFileActions {
  getFiles?: () => Promise<any>
}

export function useFileActions({ getFiles }: IUseFileActions) {
  const [error, setError] = useState('')

  const addFolderOrFile = useCallback(
    async ({ title, folder, folderId }: ICreateFolderOrFile) => {
      try {
        const res = await createFolderOrFile({ title, folder, folderId })
        if (checkWithData(res)) {
          getFiles && (await getFiles())
          Toast.show({
            icon: 'success',
            content: '创建成功',
          })
          return true
        } else return false
      } catch (error: any) {
        setError(error.message)
        return false
      }
    },
    [error]
  )

  const handleSaveFolderOrFile = useCallback(
    async (file: ISaveFolderFile) => {
      try {
        const res = await saveFile(file)
        if (check(res)) {
          Toast.show({
            icon: 'success',
            content: '保存成功',
          })
          return true
        } else return false
      } catch (error: any) {
        setError(error.message)
        return false
      }
    },
    [error]
  )

  const handleDeleteFolderOrFile = useCallback(
    async (file: IDeleteFolderOrFile) => {
      try {
        const res = await deleteFolderOrFile(file)
        if (check(res)) {
          getFiles && (await getFiles())
          Toast.show({
            icon: 'success',
            content: '删除成功',
          })
          return true
        } else return false
      } catch (error: any) {
        setError(error.message)
        return false
      }
    },
    [error]
  )

  const handleCreateSharedFile = useCallback(
    async (share: ICreateShare) => {
      try {
        const res = await createSharedFile(share)
        if (check(res)) {
          getFiles && (await getFiles())
          Toast.show({
            icon: 'success',
            content: '分享成功',
          })
          return res.data?.shareId
        }
      } catch (error: any) {
        setError(error.message)
      }
    },
    [error]
  )

  const handleDeleteSharedFile = useCallback(
    async (share: IDeleteShare) => {
      try {
        const res = await deleteSharedFile(share)
        if (check(res)) {
          getFiles && (await getFiles())
          Toast.show({
            icon: 'success',
            content: '取消成功',
          })
          return true
        } else return false
      } catch (error: any) {
        setError(error.message)
        return false
      }
    },
    [error]
  )

  const handleGetShareId = useCallback(async (share: IGetShareId) => {
    try {
      const res = await getShareId(share)
      if (checkWithData(res)) {
        return res.data?.shareId
      }
    } catch (error: any) {
      setError(error.message)
    }
  }, [])

  return {
    error,
    addFolderOrFile,
    handleSaveFolderOrFile,
    handleDeleteFolderOrFile,
    handleCreateSharedFile,
    handleDeleteSharedFile,
    handleGetShareId,
  }
}
