import {
  Header,
  Title,
  TabWrapper,
  Tabs,
  TabItem,
  TabTitle,
  TabImg,
} from './styled'
import IconArticle from '@/assets/images/icon_article.webp'
import IconHot from '@/assets/images/icon_hot.webp'
import { useNavigate, useLocation } from 'react-router-dom'
import { PagePathEnum } from '@/enums/pageEnum'
import { useEffect, useState } from 'react'

type TTabPath = PagePathEnum.GOOD_ARTICLE | PagePathEnum.HOT_NEWS

function HeaderLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  let [activeTabPath, setActiveTabPath] = useState<TTabPath>(
    PagePathEnum.GOOD_ARTICLE
  )

  // 切换路由
  const switchTab = (path: TTabPath) => {
    navigate(path)
  }

  // 监听路由变换
  useEffect(() => {
    setActiveTabPath(location.pathname as TTabPath)
  }, [location])

  return (
    <Header>
      {/* 标题 */}
      <Title>排行榜</Title>
      {/* 导航栏 */}
      <TabWrapper>
        <Tabs>
          <TabItem
            isActive={activeTabPath === PagePathEnum.GOOD_ARTICLE}
            onClick={() => switchTab(PagePathEnum.GOOD_ARTICLE)}
          >
            <TabImg src={IconArticle}></TabImg>
            <TabTitle>好文精选</TabTitle>
          </TabItem>
          <TabItem
            isActive={activeTabPath === PagePathEnum.HOT_NEWS}
            onClick={() => switchTab(PagePathEnum.HOT_NEWS)}
          >
            <TabImg src={IconHot}></TabImg>
            <TabTitle>热门资讯</TabTitle>
          </TabItem>
        </Tabs>
      </TabWrapper>
    </Header>
  )
}
export default HeaderLayout
