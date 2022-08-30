import { ActionSheet, FloatingBubble } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
import type { Action } from 'antd-mobile/es/components/action-sheet'
import styles from './floating-bubble-sheet.module.scss'

interface IFloatingBubbleSheet {
  visible: boolean
  setVisible: (visible: boolean) => void
  actions: Action[]
  onAction?: (action: Action, index: number) => void
  onClose?: () => void
}

function FloatingBubbleSheet(props: IFloatingBubbleSheet) {
  const {
    visible,
    setVisible,
    actions,
    onAction = () => {},
    onClose = () => {},
  } = props
  return (
    <div>
      {/* 浮动按钮 */}
      <FloatingBubble axis="xy" magnetic="x" className={styles.bubble}>
        <div className={styles.bubble} onClick={() => setVisible(true)}>
          <AddOutline />
        </div>
      </FloatingBubble>
      {/* 新增文件或文件夹 */}
      <ActionSheet
        cancelText="取消"
        visible={visible}
        actions={actions}
        onAction={(action: Action, index: number) => onAction(action, index)}
        onClose={onClose}
      />
    </div>
  )
}

export default FloatingBubbleSheet
