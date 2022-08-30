import ArticleCard from './components/ArticleCard'
import { getPosts } from '@/api/article'
import { useState, useEffect } from 'react'
import { IArticle } from '@/interfaces/article'
import { useNavigate } from 'react-router-dom'
import { PagePathEnum } from '@/enums/pageEnum'

function GoodArticle() {
  const [articleList, setArticleList] = useState<IArticle[]>([])
  const navigate = useNavigate()
  const handleGetArticleList = async () => {
    try {
      const res = await getPosts()
      setArticleList(res.rows)
    } catch (err) {}
  }

  useEffect(() => {
    handleGetArticleList()
  }, [])

  const handleCardClick = (id: string) => {
    navigate(PagePathEnum.DETAIL.replace(':id', id))
  }
  return (
    <>
      {articleList.map((article, index) => (
        <ArticleCard
          article={article}
          key={article.id}
          rank={index + 1}
          onClick={(id) => handleCardClick(id)}
        />
      ))}
    </>
  )
}
export default GoodArticle
