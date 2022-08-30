import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 18px;
  color: #333;
  caret-color: transparent;
  &:focus {
    caret-color: auto;
  }
`