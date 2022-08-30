import { ReactComponent as HomeIcon } from '../../../../assets/icons/home.svg'
import { ReactComponent as ImportantIcon } from '../../../../assets/icons/important.svg'
import { ReactComponent as FinishedIcon } from '../../../../assets/icons/finished.svg'
import styles from './page-header.module.scss'
import { useCurrentPage } from '../../../../hooks/useCurrentPage'
import { PagePathEnum } from '../../../../enums/pageEnum'
import { useMemo } from 'react'

function PageHeader() {
  const { currPagePath, currPageTitle } = useCurrentPage()
  // 根据currPage重新加载页面图标
  const currPageIcon = useMemo(() => {
    if (currPagePath === PagePathEnum.TODO_TASK) {
      return <HomeIcon className={styles.icon} />
    } else if (currPagePath === PagePathEnum.TODO_FINISHED) {
      return <FinishedIcon className={styles.icon} />
    } else {
      return <ImportantIcon className={styles.icon} />
    }
  }, [currPagePath])

  return (
    <div className={styles.header}>
      <div className={styles.iconWrapper}>{currPageIcon}</div>
      <span className={styles.pageTitle}>{currPageTitle}</span>
    </div>
  )
}
export default PageHeader
