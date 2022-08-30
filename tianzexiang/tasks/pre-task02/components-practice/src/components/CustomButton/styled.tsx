import styled from 'styled-components'

// 公共button样式
const Button = styled.button`
  margin: 0;
  padding: 6px 12px;
  border: 1px solid transparent;
  outline: none;
  transition: 0.1s;
  border-radius: 2px;
  cursor: pointer;
`
export const ButtonDefault = styled(Button)`
  background-color: #fff;
  color: black;
  border: #dfdfdf 1px solid;

  &:hover {
    color: #48a9f9;
    border: #48a9f9 1px solid;
  }
`

export const ButtonPrimary = styled(Button)`
  color: white;
  background-color: #1890ff;
  border: #1890ff 1px solid;

  &:hover {
    background-color: #40a9ff;
    border: #40a9ff 1px solid;
  }
`
