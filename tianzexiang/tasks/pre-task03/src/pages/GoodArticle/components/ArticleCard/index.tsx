import {
  CardWrapper,
  Cover,
  CoverImg,
  RankImg,
  Title,
  InfoWrapper,
  Info,
  CommentWrapper,
  CommentIcon,
  Comment,
  FavorWrapper,
  FavorIcon,
  Favor,
} from './styled'
import type { IArticle } from '@/interfaces/article'
import { MouseEvent } from 'react'

interface ArticleCardProps {
  article: IArticle
  key: string | number
  rank?: number | string
  onClick?: (id: string, evt: MouseEvent) => void
}

function ArticleCard(props: ArticleCardProps) {
  const { article, rank = '1' , onClick} = props
  const getRankImgURL = (rank: string | number) => require(`@/assets/images/rank-top${rank}.png`)
  return (
    <CardWrapper  onClick={(e) => (onClick ? onClick(article.id, e) : undefined)}>
      {/* 封面 */}
      <Cover>
        <CoverImg src={article.banner} />
        {Number(rank) <= 5 ? <RankImg src={getRankImgURL(rank)} /> : ''}
      </Cover>
      {/* 标题 */}
      <Title>{article.title}</Title>
      {/* 其他信息 */}
      <InfoWrapper>
        <Info>
          {/* 评论 */}
          <CommentWrapper>
            <CommentIcon className="iconfont icon-pinglun" />
            <Comment>{article.comments}</Comment>
          </CommentWrapper>
          {/* 点赞 */}
          <FavorWrapper>
            <FavorIcon className="iconfont icon-dianzan" />
            <Favor>{article.likes}</Favor>
          </FavorWrapper>
        </Info>
      </InfoWrapper>
    </CardWrapper>
  )
}
export default ArticleCard
