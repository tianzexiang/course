import styled from 'styled-components'

export const DetailWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
`
export const Header = styled.div`
  height: var(--header-height-detail);
  width: 100%;
  max-width: 1280px;
  position: fixed;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
`
export const GoBackIcon = styled.i`
  font-size: 1.2rem;
  font-weight: normal;
  caret-color: transparent;
  height: 100%;
  padding: 0 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
`
export const Avatar = styled.img`
  width: 2rem;
  border-radius: 50%;
`
export const Author = styled.span`
  font-size: .9rem;
  letter-spacing: .1rem;
`
export const BannerWrapper = styled.div``

export const Banner = styled.img`
  width: 100%;
`

export const ArticleContent = styled.div`
  padding: 15px 20px;
  height: 100%;
`

export const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  padding-top: 16px;
`

export const Time = styled.div`
  font-size: .8rem;
  font-weight: lighter;
  padding: 16px 0;
`

export const DetailHtml = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: .9rem;
  & img {
    width: 100%;
  }
`



