import {
  DetailWrapper,
  Header,
  GoBackIcon,
  Avatar,
  Author,
  BannerWrapper,
  Banner,
  ArticleContent,
  Title,
  Time,
  DetailHtml,
} from './styled'
import { getDetail } from '@/api/article'
import { useState, useEffect } from 'react'
import { IArticle } from '@/interfaces/article'
import { useParams, useNavigate } from 'react-router-dom'

function Detail() {
  const [detail, setDetail] = useState<IArticle>()
  const navigate = useNavigate()
  let { id } = useParams()

  const handleGetDetail = async () => {
    try {
      if (id) {
        const res = await getDetail(id)
        setDetail(res.data)
      }
    } catch (err) {}
  }
  const goBack = () => {
    navigate(-1)
  }
  useEffect(() => {
    handleGetDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <DetailWrapper>
      <Header>
        <GoBackIcon className="iconfont icon-arrowleft" onClick={goBack} />
        <Avatar src={detail?.avatar} />
        <Author>{detail?.author}</Author>
      </Header>
      <BannerWrapper>
        <Banner src={detail?.banner} />
      </BannerWrapper>
      <ArticleContent>
        <Title>{detail?.title}</Title>
        <Time>{detail?.time}</Time>
        <DetailHtml
          dangerouslySetInnerHTML={{
            __html: detail?.content ? detail.content : '',
          }}
        />
      </ArticleContent>
    </DetailWrapper>
  )
}
export default Detail
