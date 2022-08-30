import { NewsCardWrapper, Cover, CoverImg, Info, Title, Author } from './styled'
import { IArticle } from '@/interfaces/article'
import { MouseEvent } from 'react'

interface NewsCardProps {
  news: IArticle
  key: string | number
  onClick?: (id: string, evt: MouseEvent) => void
}

function NewsCard(props: NewsCardProps) {
  const { news, onClick } = props
  return (
    <NewsCardWrapper
      onClick={(e) => (onClick ? onClick(news.id, e) : undefined)}
    >
      <Cover>
        <CoverImg src={news.banner} />
      </Cover>
      <Info>
        <Title>{news.title}</Title>
        <Author>{news.author}</Author>
      </Info>
    </NewsCardWrapper>
  )
}
export default NewsCard
