import FileCard from '@/components/common/FileCard'
import BaseLayout from '@/layout/BaseLayout'
import { EPageName, EPagePath } from '@/enums/page'
import { GetServerSideProps } from 'next'
import { getShareProps } from '@/api/ssr'
import {
  IGetShareResp,
  IResp,
  TFileRespWithoutContent,
  TSharedFileResp,
} from '@/interfaces/response'
import CustomList from '@/components/common/CustomList'
import { useFiles } from '@/hooks/useFiles'
import { useState } from 'react'
import FileActionSheet from '@/components/common/FileActionSheet'
import { useRouter } from 'next/router'
import { getMilliseconds } from '@/utils/dayjs'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const props = await getShareProps(req.headers.cookie)
  return props
}

function Share(props: IResp<IGetShareResp>) {
  const { data } = props
  const router = useRouter()
  const { files, getFiles, loadMore, hasMore } = useFiles(
    EPagePath.SHARE,
    data?.files ?? [],
    data?.total ?? 0
  )
  const [fileActionVisible, setFileActionVisible] = useState(false)
  const [currFile, setCurrFile] = useState<TFileRespWithoutContent>({
    title: '',
    folder: false,
    isShared: false,
    createdAt: -1,
    updatedAt: -1,
    _id: '',
  })
  // 卡片右侧点击
  const handleCardActionClick = (file: TFileRespWithoutContent) => {
    setCurrFile(file)
    setFileActionVisible(true)
  }

  // 卡片点击
  const handleFileCardClick = async (id: string) => {
    router.push(EPagePath.FILE + '/' + id)
  }

  return (
    <BaseLayout title={EPageName.SHARE}>
      <CustomList
        list={files}
        onRefresh={() => getFiles()}
        loadMore={() => loadMore()}
        hasMore={hasMore}
      >
        {(files as TSharedFileResp[]).map(file => (
          <FileCard
            key={file.shareId}
            file={file.shared_file}
            time={getMilliseconds(file.createdAt)}
            onClick={() => handleFileCardClick(file.shared_file._id)}
            onRightClick={() => handleCardActionClick(file.shared_file)}
          />
        ))}
      </CustomList>

      {/* 文件操作面板 */}
      <FileActionSheet
        fileActionSheetVisible={fileActionVisible}
        setFileActionSheetVisible={setFileActionVisible}
        file={currFile}
        getFiles={() => getFiles()}
      />
    </BaseLayout>
  )
}
export default Share
