import FileCard from '@/components/common/FileCard'
import BaseLayout from '@/layout/BaseLayout'
import { EPageName, EPagePath } from '@/enums/page'
import { GetServerSideProps } from 'next'
import { getRecentProps } from '@/api/ssr'
import {
  IGetFileResp,
  IResp,
  TFileRespWithoutContent,
} from '@/interfaces/response'
import CustomList from '@/components/common/CustomList'
import { useFiles } from '@/hooks/useFiles'
import { useState } from 'react'
import FileActionSheet from '@/components/common/FileActionSheet'
import { useRouter } from 'next/router'
import FloatingBubbleSheet from '@/components/common/FloatingBubbleSheet'
import TitleForm from '@/components/common/TitleInputForm'
import { Action } from 'antd-mobile/es/components/action-sheet'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const props = await getRecentProps(req.headers.cookie)
  return props
}

function Recent(props: IResp<IGetFileResp>) {
  const { data } = props
  const router = useRouter()
  const { files, getFiles, loadMore, hasMore } = useFiles(
    EPagePath.RECENT,
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

  // 操作面板数据
  const addActions: Action[] = [
    { text: '新建文件夹', key: 'folder' },
    { text: '新建笔记', key: 'file' },
  ]
  const [addActionVisible, setAddActionVisible] = useState(false)
  const [titleInputVisible, setTitleInputVisible] = useState(false)
  const [isCreateFolder, setIsCreateFolder] = useState(false)

  // 操作面板逻辑
  const handleOnAction = async (action: Action) => {
    setAddActionVisible(false)
    setTitleInputVisible(true)
    if (action.key === 'folder') {
      setIsCreateFolder(true)
    }
    if (action.key === 'file') {
      setIsCreateFolder(false)
    }
  }

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
    <BaseLayout title={EPageName.RECENT}>
      <CustomList
        list={files}
        onRefresh={() => getFiles()}
        loadMore={() => loadMore()}
        hasMore={hasMore}
      >
        {(files as TFileRespWithoutContent[]).map(file => (
          <FileCard
            key={file._id}
            file={file}
            onClick={() => handleFileCardClick(file._id)}
            onRightClick={() => handleCardActionClick(file)}
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
      {/* 浮动按钮操作面板 */}
      <FloatingBubbleSheet
        visible={addActionVisible}
        setVisible={setAddActionVisible}
        actions={addActions}
        onAction={(action: Action) => handleOnAction(action)}
        onClose={() => setAddActionVisible(false)}
      />
      {/* 填写文件或文件夹名称 */}
      <TitleForm
        isCreate={true}
        isFolder={isCreateFolder}
        setFormVisible={setTitleInputVisible}
        formVisible={titleInputVisible}
        getFiles={() => getFiles()}
      />
    </BaseLayout>
  )
}
export default Recent
