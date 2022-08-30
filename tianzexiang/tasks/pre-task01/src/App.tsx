import HomeHeader from './pages/home/HomeHeader.js'
import HomeFooter from './pages/home/HomeFooter.js'
import HomeBanner from './pages/home/HomeBanner.js'
import NavDialog from './components/NavDialog.js'
import Thumbnail from './components/Thumbnail.js'
import { IThumbnail } from './types.js'
import { get } from './request.js'

function App() {
  const [thumbnailList, setThumbnailList] = React.useState<IThumbnail[]>([])
  const [dialogVisible, setDialogVisible] = React.useState(false)

  // 获取json数据
  const loadData = async () => {
    try {
      const res = await get<IThumbnail[]>('data/task.json')
      setThumbnailList(res)
    } catch (err) {}
  }

  React.useEffect(() => {
    // 加载数据
    loadData()
    // 横竖屏切换重置dialog
    window.addEventListener('orientationchange', () => setDialogVisible(false))
  }, [])
  return (
    <div className="site-container">
      <HomeHeader
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
      />
      {/* 填充头部 */}
      <div className="fill"></div>
      <main className="site-main">
        <HomeBanner />
        {/* 缩略图列表 */}
        <div className="thumbnail-container">
          <ol className="thumbnail-list">
            {thumbnailList.map((thumbnail) => (
              <Thumbnail thumbnail={thumbnail} key={thumbnail.cover} />
            ))}
          </ol>
        </div>
      </main>
      <HomeFooter />
      <NavDialog dialogVisible={dialogVisible} />
    </div>
  )
}

export default App
