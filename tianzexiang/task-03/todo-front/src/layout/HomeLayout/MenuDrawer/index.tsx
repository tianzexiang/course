import styles from './menu-drawer.module.scss'
import { ReactComponent as ListIcon } from '../../../assets/icons/list.svg'
import { ReactComponent as HomeIcon } from '../../../assets/icons/home.svg'
import { ReactComponent as ImportantIcon } from '../../../assets/icons/important.svg'
import { ReactComponent as FinishedIcon } from '../../../assets/icons/finished.svg'
import { useNavigate } from 'react-router-dom'
import { EPagePath, EPageName } from '../../../enums/pageEnum'
import classnames from 'classnames'
import { useCurrentPage } from '../../../hooks/useCurrentPage'
import { CenterPopup, Popup } from 'antd-mobile'
import { useState } from 'react'
import { UserOutline, UserSetOutline } from 'antd-mobile-icons'
import { useAuth } from '../../../hooks/useAuth'
import UserInfoForm from './UserInfoForm'
import PwdForm from './PwdForm'
import { useUserInfo } from '../../../hooks/useUserInfo'

interface IMenuDrawer {
  drawerVisible: boolean
  setDrawerVisible: (vis: boolean) => void
}

interface IMenu {
  title: string
  path?: string
  icon: JSX.Element
}

function MenuDrawer(props: IMenuDrawer) {
  const { drawerVisible, setDrawerVisible } = props
  const navigate = useNavigate()
  const { currPagePath } = useCurrentPage()
  const { handleLogout } = useAuth()
  const [userFormVisible, setUserFormVisible] = useState(false)
  const [isPwdForm, setIsPwdForm] = useState(false)
  const { userValue } = useUserInfo()

  // 路由菜单
  const [menu] = useState<IMenu[]>([
    {
      title: EPageName.TODO_TASK,
      path: EPagePath.TODO_TASK,
      icon: <HomeIcon className={styles.menuIcon} />,
    },
    {
      title: EPageName.TODO_IMPORTANT,
      path: EPagePath.TODO_IMPORTANT,
      icon: <ImportantIcon className={styles.menuIcon} />,
    },
    {
      title: EPageName.TODO_FINISHED,
      path: EPagePath.TODO_FINISHED,
      icon: <FinishedIcon className={styles.menuIcon} />,
    },
  ])

  // 路由菜单切换
  const handleMenuItemClick = (path: string) => {
    navigate(path)
    setDrawerVisible(false)
  }

  // 显示修改用户弹窗
  const handleUpdateUserInfoClick = () => {
    setDrawerVisible(false)
    setIsPwdForm(false)
    setUserFormVisible(true)
  }

  // 显示修改密码弹窗
  const handleUpdatePwdClick = () => {
    setDrawerVisible(false)
    setIsPwdForm(true)
    setUserFormVisible(true)
  }

  // 退出登录
  const logout = async () => {
    try {
      await handleLogout()
    } catch (error) {}
  }

  return (
    <>
      <Popup
        visible={drawerVisible}
        position="left"
        onMaskClick={() => {
          setDrawerVisible(false)
        }}
        bodyClassName={styles.popup}
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
          {/* 用户信息 */}
          <div className={styles.userInfo}>用户：{userValue.nickname}</div>
          {/* 菜单 */}
          <ul className={styles.menuWrapper}>
            {/* 路由菜单 */}
            {menu.map((item) => (
              <li
                className={classnames(styles.menuItem, {
                  [styles.active]: currPagePath === item.path,
                })}
                onClick={() => handleMenuItemClick(item.path || '')}
                key={item.title}
              >
                {item.icon}
                <span className={styles.title}>{item.title}</span>
              </li>
            ))}
            {/* 用户设置 */}
            {/* 修改用户信息 */}
            <li
              className={classnames(styles.menuItem)}
              onClick={handleUpdateUserInfoClick}
            >
              <UserSetOutline />
              <span className={styles.title}>修改用户信息</span>
            </li>
            {/* 修改密码 */}
            <li
              className={classnames(styles.menuItem)}
              onClick={handleUpdatePwdClick}
            >
              <UserSetOutline />
              <span className={styles.title}>修改密码</span>
            </li>
            {/* 退出登录 */}
            <li
              className={classnames(styles.menuItem)}
              onClick={() => logout()}
            >
              <UserOutline />
              <span className={styles.title}>退出登录</span>
            </li>
          </ul>
        </div>
      </Popup>
      {/* 修改用户信息 */}
      <CenterPopup
        visible={userFormVisible}
        onMaskClick={() => {
          setUserFormVisible(false)
        }}
      >
        <div className={styles.centerWrapper}>
          {isPwdForm ? (
            <PwdForm setFormVisible={setUserFormVisible} />
          ) : (
            <UserInfoForm setFormVisible={setUserFormVisible} />
          )}
        </div>
      </CenterPopup>
    </>
  )
}
export default MenuDrawer
