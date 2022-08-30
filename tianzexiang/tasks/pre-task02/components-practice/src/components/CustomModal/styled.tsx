import styled, { css } from 'styled-components'

interface IModalProps {
  modalVisible: boolean
}

// 基础modal样式
const ModalBase = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
// 控制是否可见
const VisibleController = css<IModalProps>`
  visibility: ${(props) => (props.modalVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.modalVisible ? '1' : '0')};
`
// 控制过渡效果
const TransitionController = css`
  transition: all 0.3s ease-in-out;
`

export const ModalWrapper = styled(ModalBase)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  ${TransitionController};
  ${VisibleController};
`

export const Dialog = styled.div<IModalProps>`
  position: fixed;
  width: 600px;
  margin: auto;
  background: #fff;
  border-radius: 5px;
  box-shadow: inset 0 0 1px 0 #000;
  z-index: 2000;
  transform: ${props => props.modalVisible ? 'scale(1)' : 'scale(0.00001)'};
  ${TransitionController};
  ${VisibleController};
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between; 
  padding: 15px 20px;
  font-size: 16px;
`
export const Title = styled.div``

export const CloseIcon = styled.div`
  font-size: 22px;
  cursor: pointer;
`
export const Content = styled.div`
  padding: 30px 20px;
  border: #f1f1f1 1px solid;
`
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  gap: 20px;
`

export const Mask = styled(ModalBase)`
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  ${TransitionController};
  ${VisibleController};
`
