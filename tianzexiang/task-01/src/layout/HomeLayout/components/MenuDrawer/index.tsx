import CustomDrawer from '../../../../components/CustomDrawer'
import styles from './menu-drawer.module.scss'
import { ReactComponent as ListIcon } from '../../../../assets/icons/list.svg'
import { ReactComponent as HomeIcon } from '../../../../assets/icons/home.svg'
import { ReactComponent as ImportantIcon } from '../../../../assets/icons/important.svg'
import { ReactComponent as FinishedIcon } from '../../../../assets/icons/finished.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PagePathEnum, PageNameEnum } from '../../../../enums/pageEnum'
import classnames from 'classnames'
import { useCurrentPage } from '../../../../hooks/useCurrentPage'

interface IMenuDrawer {
  drawerVisible: boolean
  setDrawerVisible: (vis: boolean) => void
}

interface IMenu {
  title: string
  path: string
  icon: JSX.Element
}
function MenuDrawer(props: IMenuDrawer) {
  const { drawerVisible, setDrawerVisible } = props
  const navigate = useNavigate()
  const { currPagePath } = useCurrentPage()
  const [menu] = useState<IMenu[]>([
    {
      title: PageNameEnum.TODO_TASK,
      path: PagePathEnum.TODO_TASK,
      icon: <HomeIcon className={styles.menuIcon} />,
    },
    {
      title: PageNameEnum.TODO_IMPORTANT,
      path: PagePathEnum.TODO_IMPORTANT,
      icon: <ImportantIcon className={styles.menuIcon} />,
    },
    {
      title: PageNameEnum.TODO_FINISHED,
      path: PagePathEnum.TODO_FINISHED,
      icon: <FinishedIcon className={styles.menuIcon} />,
    },
  ])

  const handleMenuItemClick = (path: string) => {
    navigate(path)
    setDrawerVisible(false)
  }

  return (
    <CustomDrawer
      drawerVisible={drawerVisible}
      setDrawerVisible={setDrawerVisible}
      size="240px"
      placement="left"
    >
      <div className={styles.drawerWrapper}>
        {/* 头部 */}
        <div className={styles.header}>
          <div
            className={styles.iconWrapper}
            onClick={() => setDrawerVisible(false)}
          >
            <ListIcon className={styles.listIcon} />
          </div>
        </div>
        {/* 菜单 */}
        <ul className={styles.menuWrapper}>
          {menu.map((item) => (
            <li
              className={classnames(styles.menuItem, {
                [styles.active]: currPagePath === item.path,
              })}
              onClick={() => handleMenuItemClick(item.path)}
              key={item.title}
            >
              {item.icon}
              <span className={styles.title}>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </CustomDrawer>
  )
}
export default MenuDrawer
