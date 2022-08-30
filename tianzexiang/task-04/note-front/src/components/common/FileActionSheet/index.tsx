import { useFileActions } from '@/hooks/useFileActions'
import { ActionSheet, Dialog, Popup, Button, Input, Toast } from 'antd-mobile'
import { TFileRespWithoutContent } from '@/interfaces/response'
import type { Action } from 'antd-mobile/es/components/action-sheet'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { EPagePath } from '@/enums/page'
import styles from './file-action-sheet.module.scss'
import FileSvg from '../../../assets/icons/file.svg'
import FolderSvg from '../../../assets/icons/folder.svg'
import copy from 'copy-to-clipboard'
import TitleForm from '@/components/common/TitleInputForm'

interface IFileActionSheet {
  file: TFileRespWithoutContent
  getFiles: () => Promise<any>
  fileActionSheetVisible: boolean
  setFileActionSheetVisible: (visible: boolean) => void
}

function FileActionSheet(props: IFileActionSheet) {
  const { file, getFiles, fileActionSheetVisible, setFileActionSheetVisible } =
    props
  const {
    handleCreateSharedFile,
    handleDeleteFolderOrFile,
    handleGetShareId,
    handleDeleteSharedFile,
  } = useFileActions({
    getFiles,
  })
  const router = useRouter()
  const [actions, setActions] = useState<Action[]>([])
  const [shareVisible, setShareVisible] = useState(false)
  const [titleInputVisible, setTitleInputVisible] = useState(false)
  const [shareURL, setShareURL] = useState('')
  // shareURL 前缀
  const shareURLPrefix = 'http://localhost:3005/share/'
  const shareAction = {
    copyShare: (text: string) => {
      const res = copy(text)
      if (res) {
        Toast.show({
          icon: 'success',
          content: '复制成功',
        })
        setShareVisible(false)
      } else {
        Toast.show({
          icon: 'fail',
          content: '复制失败，请重试',
        })
      }
    },
    cancelShare: async () => {
      const res = await handleDeleteSharedFile({ fileId: file._id })
      if (res) {
        setShareVisible(false)
      }
    },
  }
  // file
  const fileActions: Action[] = [
    { text: '打开', key: 'open' },
    { text: '修改名称', key: 'modifyTitle' },
    { text: '分享', key: 'share' },
    { text: '取消分享', key: 'cancelShare' },
    { text: '查看链接', key: 'viewCopy' },
    { text: '删除', key: 'delete', danger: true },
  ]
  // folder
  const folderActions: Action[] = [
    { text: '打开', key: 'open' },
    { text: '修改名称', key: 'modifyTitle' },
    { text: '删除', key: 'delete', danger: true },
  ]

  // 处理文件action
  const handleFileActionItem = (fileActions: Action[]) => {
    const fileActionsByShareStat = file.isShared
      ? fileActions.filter(val => val.key !== 'share')
      : fileActions.filter(
          val => val.key !== 'viewCopy' && val.key !== 'cancelShare'
        )
    const fileActionByCurrPage =
      router.pathname === EPagePath.SHARE
        ? fileActionsByShareStat.filter(
            val => val.key !== 'delete' && val.key !== 'modifyTitle'
          )
        : fileActionsByShareStat
    return fileActionByCurrPage
  }

  // 监听file决定渲染哪一个action
  useEffect(() => {
    const action = file.folder
      ? folderActions
      : handleFileActionItem(fileActions)
    setActions(action)
  }, [file])

  // 处理事件
  const handleOnAction = async (action: Action) => {
    // 若是删除操作
    if (action.key === 'delete') {
      // 删除提示
      const result = await Dialog.confirm({
        content: '暂不支持回收站功能，您确定要删除吗？',
      })
      if (result) {
        setFileActionSheetVisible(false)
        await handleDeleteFolderOrFile({
          id: file._id,
          folder: file.folder,
        })
      }
    } else if (action.key === 'modifyTitle') {
      // 若是修改名称操作
      setFileActionSheetVisible(false)
      setTitleInputVisible(true)
    } else {
      // 若不是删除
      if (file.folder) {
        // 如果是文件夹
        if (action.key === 'open') {
          router.push(EPagePath.FOLDER + '/' + file._id)
        }
      } else {
        // 如果是文件
        if (action.key === 'open') {
          router.push(EPagePath.FILE + '/' + file._id)
        }
        if (action.key === 'share') {
          // 创建并拿到shareId
          const res = await handleCreateSharedFile({ fileId: file._id })
          if (res) {
            setFileActionSheetVisible(false)
            // 打开share面板
            setShareURL(shareURLPrefix + res)
            setShareVisible(true)
          }
        }
        if (action.key === 'cancelShare') {
          await shareAction.cancelShare()
          setFileActionSheetVisible(false)
        }
        if (action.key === 'viewCopy') {
          // 拿到shareId
          setFileActionSheetVisible(false)
          const res = await handleGetShareId({ fileId: file._id })
          if (res) {
            // 打开share面板
            setShareURL(shareURLPrefix + res)
            setFileActionSheetVisible(false)
            setShareVisible(true)
          }
        }
      }
    }
  }
  return (
    <>
      {/* 文件功能卡片 */}
      <ActionSheet
        cancelText="取消"
        actions={actions}
        visible={fileActionSheetVisible}
        onAction={(action: Action) => handleOnAction(action)}
        onClose={() => setFileActionSheetVisible(false)}
      />
      {/* 分享卡片 */}
      <Popup
        visible={shareVisible}
        onMaskClick={() => {
          setShareVisible(false)
        }}
        bodyClassName={styles.sharePopup}
      >
        <div className={styles.shareTitle}>
          {file.folder ? (
            <FolderSvg className={styles.fileIcon} />
          ) : (
            <FileSvg className={styles.fileIcon} />
          )}
          <span>{file.title}</span>
        </div>
        <Input placeholder="分享链接" value={shareURL} disabled />
        <Button
          block
          color="primary"
          onClick={() => shareAction.copyShare(shareURL)}
        >
          复制链接
        </Button>
        <Button block color="danger" onClick={shareAction.cancelShare}>
          取消分享
        </Button>
      </Popup>
      {/* 修改名称表单 */}
      <TitleForm
        isCreate={false}
        fileId={file._id}
        isFolder={file.folder}
        setFormVisible={setTitleInputVisible}
        formVisible={titleInputVisible}
        getFiles={() => getFiles()}
        initTitle={file.title}
      />
    </>
  )
}
export default FileActionSheet
