import { ReactComponent as ListIcon } from '../../assets/icons/list.svg'
import { Outlet } from 'react-router-dom'
import styles from './home-layout.module.scss'
import { useEffect, useState } from 'react'
import MenuDrawer from './MenuDrawer'
import PageHeader from './PageHeader'
import { useUserInfo } from '../../hooks/useUserInfo'

function HomeLayout() {
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false)
  const { getUser } = useUserInfo()
  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <div className={styles.homeLayout}>
      {/* 头部 */}
      <header className={styles.homeHeader}>
        <div
          className={styles.iconWrapper}
          onClick={() => setMenuDrawerVisible(!menuDrawerVisible)}
        >
          <ListIcon className={styles.listIcon} />
        </div>
      </header>

      {/* 主要页面 */}
      <main className={styles.homeContent}>
        <PageHeader />
        <Outlet />
      </main>

      {/* 菜单抽屉 */}
      <MenuDrawer
        drawerVisible={menuDrawerVisible}
        setDrawerVisible={setMenuDrawerVisible}
      />
    </div>
  )
}
export default HomeLayout
