import CustomButton from './components/CustomButton'
import CustomModal from './components/CustomModal'
import { useState } from 'react'
import styled from 'styled-components'

const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
`

function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const handleClick = (visible: boolean) => {
    setModalVisible(visible)
  }

  const handleClose = () => {
    console.log('close')
  }

  const handleConfirm = () => {
    console.log('confirm');
    
  }
  return (
    <div>
      <ButtonWrap>
        <CustomButton type="default" onClick={() => handleClick(false)}>
          隐藏modal
        </CustomButton>
        <CustomButton type="primary" onClick={() => handleClick(true)}>
          显示modal
        </CustomButton>
      </ButtonWrap>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onClose={handleClose}
        onConfirm={handleConfirm}
      ></CustomModal>
    </div>
  )
}

export default App
