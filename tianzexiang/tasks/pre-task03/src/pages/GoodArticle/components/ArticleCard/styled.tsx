import styled from 'styled-components'

export const CardWrapper = styled.div`
  position: relative;
  display: block;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  cursor: pointer;
`
export const Cover = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`

export const CoverImg = styled.img`
  width: 100%;
  border-radius: 5px;
`
export const RankImg = styled.img`
  position: absolute;
  width: 12%;
  left: 0;
  right: 0;
` 
export const Title = styled.div`
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  margin: 15px 0;
`

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const Info = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  font-size: 0.75rem;
  color: #b6b6b6;
  justify-content: flex-end;
  align-items: center;
  margin-right: 15px;
  white-space: nowrap;
  letter-spacing: .05rem;
`

export const CommentWrapper = styled.div``

export const CommentIcon = styled.i``

export const Comment = styled.span`
  margin-left: 5px;
`

export const FavorWrapper = styled.div``

export const FavorIcon = styled.i``

export const Favor = styled.span``