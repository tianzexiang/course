import styled from 'styled-components'

export const NewsCardWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  background-color: white;
  padding: 15px 10px;
  border-radius: 10px;
  min-width: 225px;
  cursor: pointer;
`

export const Cover = styled.div``

export const CoverImg = styled.img`
  width: 8rem;
  height: 6rem;
  border-radius: 10px;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 0;
`

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: .1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Author = styled.div`
  font-size: .8rem;
  font-weight: lighter;
`