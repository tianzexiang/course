import { useEffect, useRef, MouseEvent } from 'react'
import {
  ModalWrapper,
  Dialog,
  TitleWrapper,
  Title,
  CloseIcon,
  Content,
  Footer,
  Mask,
} from './styled'

import CustomButton from '../CustomButton'

interface ICustomModal {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
  title?: string
  footer?: JSX.Element | string
  onClose?: () => void
  onConfirm?: () => void
}

const useDidMountEffect = (callback:() => any, deps: any[]) => {
  const didMount = useRef(false)
  useEffect(() => {
    if(didMount.current) callback()
    didMount.current = true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function CustomModal(props: ICustomModal) {
  const {
    modalVisible,
    setModalVisible,
    title = '标题',
    footer,
    onClose,
    onConfirm,
  } = props

  useDidMountEffect(() => {
    if (!modalVisible) {
      if (onClose) {
        onClose()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible])

  const handleClose = () => {
    setModalVisible(false)
  }

  const handleConfirm = () => { 
    if (onConfirm) {
      onConfirm()
    }
    handleClose()
  }

  const handleMaskClick = (e: MouseEvent) => {
    e.stopPropagation()
    handleClose()
  }

  return (
    <ModalWrapper modalVisible={modalVisible}>
      <Dialog modalVisible={modalVisible}>
        <TitleWrapper>
          <Title>{title}</Title>
          <CloseIcon onClick={handleClose}>×</CloseIcon>
        </TitleWrapper>
        <Content>
          <div>这是内容</div>
          <br />
          <div>这是内容</div>
          <br />
          <div>这是内容</div>
          <br />
          <div>这是内容</div>
        </Content>
        {footer ? (
          footer
        ) : (
          <Footer>
            <CustomButton type="default" onClick={handleClose}>
              取消
            </CustomButton>
            <CustomButton type="primary" onClick={handleConfirm}>
              确认
            </CustomButton>
          </Footer>
        )}
      </Dialog>
      <Mask modalVisible={modalVisible} onClick={(e) => handleMaskClick(e)} />
    </ModalWrapper>
  )
}
export default CustomModal
