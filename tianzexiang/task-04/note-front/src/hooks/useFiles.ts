import { getFolderFiles, getRecentFiles } from '@/api/file'
import { getSharedFiles } from '@/api/share'
import { EPagePath } from '@/enums/page'
import {
  IGetFileResp,
  IGetShareResp,
  IResp,
  TFileRespWithoutContent,
  TSharedFileResp,
} from '@/interfaces/response'

import { useCallback, useMemo, useState } from 'react'
import { checkWithData } from '../utils/checkHttpRes'

export function useFiles(
  currPagePath: string,
  initFiles: (TFileRespWithoutContent | TSharedFileResp)[],
  initTotal: number
) {
  const [files, setFiles] = useState<(TFileRespWithoutContent | TSharedFileResp)[]>(initFiles)
  const [skip, setSkip] = useState(initFiles.length)
  const [total, setTotal] = useState(initTotal)
  // 是否还有更多
  const hasMore = useMemo(() => {
    return skip < total
  }, [skip, total])

  // 每次拉取部分files
  const getFiles = useCallback(async (folderId?: string) => {
    try {
      let resData: IResp<IGetFileResp | IGetShareResp> = {
        status: -1,
        code: -1,
        msg: '',
      }
      if (currPagePath === EPagePath.RECENT) {
        // 这里不应该使用limit or offset ,因为这里是获取初始数据的位置，每次拉取的都是固定值
        resData = await getRecentFiles({})
      }
      if (currPagePath === EPagePath.FOLDER) {
        resData = await getFolderFiles({ folderId })
      }
      if (currPagePath === EPagePath.SHARE) {
        resData = await getSharedFiles({})
      }
      if (checkWithData(resData)) {
        const { data } = resData
        setFiles(data!.files)
        setSkip(data!.files.length)
        setTotal(data!.total)
      }
    } catch (error) {}
  }, [])

  // 获取更多
  const loadMore = useCallback(
    async (folderId?: string) => {
      try {
        let resData: IResp<IGetFileResp | IGetShareResp> = {
          status: -1,
          code: -1,
          msg: '',
        }
        if (currPagePath === EPagePath.RECENT) {
          resData = await getRecentFiles({ skip })
        }
        if (currPagePath === EPagePath.FOLDER) {
          resData = await getFolderFiles({ skip, folderId })
        }
        if (currPagePath === EPagePath.SHARE) {
          resData = await getSharedFiles({ skip })
        }

        if (checkWithData(resData)) {
          const { data } = resData
          setFiles(files.concat(data!.files))
          setSkip(skip + data!.files.length)
          setTotal(data!.total)
        }
      } catch (error: any) {}
    },
    [skip, files]
  )

  return {
    files,
    hasMore,
    getFiles,
    loadMore,
    setFiles,
  }
}
