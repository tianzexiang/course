import FileCard from '@/components/common/FileCard'
import BaseLayout from '@/layout/BaseLayout'
import { EPageName, EPagePath } from '@/enums/page'
import { GetServerSideProps } from 'next'
import { getFolderProps } from '@/api/ssr'
import {
  IGetFileResp,
  IResp,
  TFileRespWithoutContent,
} from '@/interfaces/response'
import CustomList from '@/components/common/CustomList'
import { useFiles } from '@/hooks/useFiles'
import { useState } from 'react'
import { LeftOutline } from 'antd-mobile-icons'
import styles from './folder.module.scss'
import type { Action } from 'antd-mobile/es/components/action-sheet'
import TitleForm from '@/components/common/TitleInputForm'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import FileActionSheet from '@/components/common/FileActionSheet'
import FloatingBubbleSheet from '@/components/common/FloatingBubbleSheet'

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = [] } = query
  const props = await getFolderProps(req.headers.cookie, id[0])
  return props
}

function Folder(props: IResp<IGetFileResp>) {
  const { data } = props
  const router = useRouter()
  const { id = [] } = router.query

  const { files, getFiles, loadMore, hasMore } = useFiles(
    EPagePath.FOLDER,
    data?.files ?? [],
    data?.total ?? 0
  )

  const addActions: Action[] = [
    { text: '新建文件夹', key: 'folder' },
    { text: '新建笔记', key: 'file' },
  ]
  const [fileActionVisible, setFileActionVisible] = useState(false)
  const [addActionVisible, setAddActionVisible] = useState(false)
  const [titleInputVisible, setTitleInputVisible] = useState(false)
  const [isCreateFolder, setIsCreateFolder] = useState(false)
  const [currFile, setCurrFile] = useState<TFileRespWithoutContent>({
    title: '',
    folder: false,
    isShared: false,
    createdAt: -1,
    updatedAt: -1,
    _id: '',
  })

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

  // 卡片点击逻辑
  const handleFileCardClick = async (id: string, folder: boolean) => {
    if (folder) {
      router.push(EPagePath.FOLDER + '/' + id)
    } else {
      router.push(EPagePath.FILE + '/' + id)
    }
  }

  // 卡片右侧点击
  const handleCardActionClick = (file: TFileRespWithoutContent) => {
    setCurrFile(file)
    setFileActionVisible(true)
  }

  const goBack = () => {
    router.back()
  }

  return (
    <BaseLayout title={EPageName.FOLDER}>
      <div
        className={classnames(styles.folderWrapper, {
          [styles.hasPaddingTop]: id[0],
        })}
      >
        {/* 顶部所处文件夹名称 */}
        <div
          className={classnames(styles.header, {
            [styles.hidden]: !id[0],
          })}
        >
          <LeftOutline onClick={goBack} />
          <span>{data?.currentFolder || '文件夹'}</span>
          <div className={styles.headerRight}></div>
        </div>
        {/* 文件列表 */}
        <CustomList
          list={files}
          onRefresh={() => getFiles(id[0])}
          loadMore={() => loadMore(id[0])}
          hasMore={hasMore}
        >
          {(files as TFileRespWithoutContent[]).map(file => (
            <FileCard
              key={file._id}
              file={file}
              onClick={() => handleFileCardClick(file._id, file.folder)}
              onRightClick={() => handleCardActionClick(file)}
            />
          ))}
        </CustomList>

        {/* 文件操作面板 */}
        <FileActionSheet
          fileActionSheetVisible={fileActionVisible}
          setFileActionSheetVisible={setFileActionVisible}
          file={currFile}
          getFiles={() => getFiles(id[0])}
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
          getFiles={() => getFiles(id[0])}
          folderId={id[0]}
        />
      </div>
    </BaseLayout>
  )
}
export default Folder
