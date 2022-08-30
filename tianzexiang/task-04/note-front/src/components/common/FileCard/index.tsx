import styles from './file-card.module.scss'
import { MouseEvent } from 'react'
import { MoreOutline } from 'antd-mobile-icons'
import FileSvg from '../../../assets/icons/file.svg'
import FolderSvg from '../../../assets/icons/folder.svg'
import { TFileRespWithoutContent } from '@/interfaces/response'
import { getLastTimeStr } from '@/utils/dayjs'
import { Tag } from 'antd-mobile'
import classnames from 'classnames'

interface IFileCard {
  file: TFileRespWithoutContent
  time?: number
  onClick?: (e: MouseEvent) => void
  onRightClick?: (e: MouseEvent) => void
}

function FileCard(props: IFileCard) {
  const { file, onClick = () => {}, onRightClick = () => {}, time } = props
  return (
    <div className={styles.cardWrapper}>
      {file.folder ? (
        <FolderSvg className={styles.fileIcon} />
      ) : (
        <FileSvg className={styles.fileIcon} />
      )}
      <div className={styles.content} onClick={e => onClick(e)}>
        <div className={styles.title}>{file.title}</div>
        <div className={styles.time}>
          {getLastTimeStr(time || file.updatedAt, 1000 * 3600 * 24 * 15)}
          <span
            className={classnames(styles.shareTag, {
              [styles.visible]: file.isShared ?? false,
            })}
          >
            <Tag round color="#64CBFF">
              分享中
            </Tag>
          </span>
        </div>
      </div>
      <MoreOutline className={styles.moreIcon} onClick={e => onRightClick(e)} />
    </div>
  )
}
export default FileCard
