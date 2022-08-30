import { EHttpStatusCode } from '@/enums/status'
import { IResp } from '@/interfaces/response'
import { checkWithData } from '@/utils/checkHttpRes'
import { getFileContent, getFolderFiles, getRecentFiles } from './file'
import { getSharedFileContent, getSharedFiles } from './share'
import { getUserInfo } from './user'

// 检查登录情况
const checkIsLogin = (res: IResp) => {
  // 未登录情况
  if (res.status === EHttpStatusCode.UNAUTHORIZED && res.code === 20005) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  } else {
    return {
      props: {
        ...res,
      },
    }
  }
}

// 总体错误处理
export const getDataBySSR = async (getData: () => Promise<IResp>) => {
  try {
    const res = await getData()
    if (checkWithData(res)) {
      return {
        props: {
          ...res,
        },
      }
    } else {
      const _res = checkIsLogin(res)
      return {
        ..._res,
      }
    }
  } catch (error) {
    console.trace(error)
    return {
      props: {
        msg: '服务器内部错误',
      },
    }
  }
}

export const getRecentProps = async (cookie?: string) => {
  const props = await getDataBySSR(() =>
    getRecentFiles(
      {},
      {
        cookie: cookie ? cookie : '',
      }
    )
  )
  return props
}

export const getFolderProps = async (cookie?: string, folderId?: string) => {
  const props = await getDataBySSR(() =>
    getFolderFiles(
      { folderId },
      {
        cookie: cookie ? cookie : '',
      }
    )
  )
  return props
}

export const getShareProps = async (cookie?: string) => {
  const props = await getDataBySSR(() =>
    getSharedFiles(
      {},
      {
        cookie: cookie ? cookie : '',
      }
    )
  )
  return props
}

export const getMeProps = async (cookie?: string) => {
  const props = await getDataBySSR(() =>
    getUserInfo({
      cookie: cookie ? cookie : '',
    })
  )
  return props
}

export const getFileProps = async (fileId: string, cookie?: string) => {
  const props = await getDataBySSR(() =>
    getFileContent(
      { fileId },
      {
        cookie: cookie ? cookie : '',
      }
    )
  )
  return props
}

export const getShareContentProps = async (
  shareId: string,
) => {
  const props = await getDataBySSR(() =>
    getSharedFileContent(
      { shareId }
    )
  )
  return props
}
