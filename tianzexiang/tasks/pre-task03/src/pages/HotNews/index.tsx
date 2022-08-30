import NewsCard from './components/NewsCard'
import { getNews } from '@/api/article'
import { useState, useEffect } from 'react'
import { IArticle } from '@/interfaces/article'
import { useNavigate } from 'react-router-dom'
import { PagePathEnum } from '@/enums/pageEnum'

function HotNews() {
  const [newsList, setNewsList] = useState<IArticle[]>([])
  const navigate = useNavigate()
  const handleGetNewsList = async () => {
    try {
      const res = await getNews()
      setNewsList(res.rows)
    } catch (err) {}
  }

  useEffect(() => {
    handleGetNewsList()
  }, [])

  const handleCardClick = (id: string) => {
    navigate(PagePathEnum.DETAIL.replace(':id', id))
  }

  return (
    <>
      {newsList.map((news) => (
        <NewsCard
          news={news}
          key={news.id}
          onClick={(id) => handleCardClick(id)}
        />
      ))}
    </>
  )
}
export default HotNews
