import { TabBar } from 'antd-mobile'
import { ReactNode, useState } from 'react'
import RecentSvg from '../../../assets/icons/recent.svg'
import ShareSvg from '../../../assets/icons/share.svg'
import { EPageName, EPagePath } from '@/enums/page'
import { FolderOutline, UserOutline } from 'antd-mobile-icons'
import { useRouter } from 'next/router'
import styles from './note-tabbar.module.scss'

interface ITab {
  key: string
  title: string
  icon: ReactNode
}

function NoteTabBar() {
  const tabs: ITab[] = [
    {
      key: EPagePath.RECENT,
      title: EPageName.RECENT,
      icon: <RecentSvg />,
    },
    {
      key: EPagePath.FOLDER,
      title: EPageName.FOLDER,
      icon: <FolderOutline />,
    },
    {
      key: EPagePath.SHARE,
      title: EPageName.SHARE,
      icon: <ShareSvg />,
    },
    {
      key: EPagePath.ME,
      title: EPageName.ME,
      icon: <UserOutline />,
    },
  ]
  const router = useRouter()
  const [activeKey, setActiveKey] = useState(router.pathname.split('/[')[0])

  const handleTabChange = (key: string) => {
    setActiveKey(key)
    router.push(key)
  }
  return (
    <TabBar
      activeKey={activeKey}
      onChange={(key: string) => handleTabChange(key)}
      className={styles.tabBarTextColor}
    >
      {tabs.map(tab => (
        <TabBar.Item key={tab.key} title={tab.title} icon={tab.icon} />
      ))}
    </TabBar>
  )
}
export default NoteTabBar
