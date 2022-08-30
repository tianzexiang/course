import { ReactComponent as ListIcon } from '../../assets/icons/list.svg'
import { Outlet } from 'react-router-dom'
import styles from './home-layout.module.scss'
import { useState } from 'react'
import MenuDrawer from './components/MenuDrawer'
import PageHeader from './components/PageHeader'
import TaskActionDrawer from './components/TaskActionDrawer'
import { useCurrentTask } from '../../hooks/useCurrentTask'
import { ITask } from '../../interfaces/task'

function HomeLayout() {
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false)
  const currTask = useCurrentTask().currTask as ITask
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

      {/* task操作抽屉 */}
      <TaskActionDrawer  task={currTask} />
    </div>
  )
}
export default HomeLayout
