import styled from 'styled-components'

interface ICheckBoxProps {
  isFinished: boolean
}

interface ITitleProps {
  isFinished: boolean
}

// 共有icon样式
const IconFont = styled.i`
  color: #ccc;
  font-size: 24px;
  cursor: pointer;
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`
export const Title = styled.div<ITitleProps>`
  flex: 1;
  margin: 0 15px;
  font-size: 18px;
  line-height: 1.5em;
  color: ${props => props.isFinished ? '#bbb' : 'inherit'};
  text-decoration: ${props => props.isFinished ? 'line-through' : 'none'};
`

export const CheckBoxIcon = styled(IconFont)<ICheckBoxProps>`
  color: ${props => props.isFinished ? '#4F89FF' : '#ccc'};
`
export const DeleteIcon = styled(IconFont)`
  &:hover {
    color: red;
  }
`