import { useEffect, MouseEvent, useRef, CSSProperties } from 'react'
import styles from './custom-drawer.module.scss'
import classNames from 'classnames'

interface ICustomDrawer {
  drawerVisible: boolean
  setDrawerVisible: (drawerVisible: boolean) => void
  onClose?: () => void
  placement?: 'left' | 'right' | 'bottom' | 'top'
  size?: string
  children?: JSX.Element
  mask?: boolean // 点击遮罩是否收回抽屉
  bodyStyle?: CSSProperties
}
function CustomDrawer(props: ICustomDrawer) {
  const {
    drawerVisible = true,
    setDrawerVisible,
    onClose,
    placement = 'left',
    size = '30%',
    children = null,
    bodyStyle = {},
    mask = true
  } = props
  // 决定初次是否执行
  const didMount = useRef(false)

  // 决定drawer方向和大小
  const getOffsetStyle = (drawerStyle: CSSProperties) => {
    if (placement === 'left' || placement === 'right') {
      drawerStyle.width = size
      drawerStyle.height = '100%'
      if (placement === 'left') drawerStyle.left = '0'
      else drawerStyle.right = 0
    } else {
      drawerStyle.height = size
      drawerStyle.width = '100%'
      if (placement === 'top') drawerStyle.top = '0'
      else drawerStyle.bottom = 0
    }
  }

  // 决定drawer 出现方向
  const getTranslateStyle = (drawerStyle: CSSProperties) => {
    if (placement === 'left' || placement === 'right') {
      drawerStyle.transform = `translateX(${
        drawerVisible ? '0' : placement === 'left' ? '-100%' : '100%'
      })`
    } else {
      drawerStyle.transform = `translateY(${
        drawerVisible ? '0' : placement === 'top' ? '-100%' : '100%'
      })`
    }
  }

  const getDrawerStyle = () => {
    const drawerStyle: CSSProperties = {}
    getOffsetStyle(drawerStyle)
    getTranslateStyle(drawerStyle)
    return { ...drawerStyle, ...bodyStyle }
  }

  useEffect(() => {
    // 初次渲染不执行，更新执行
    if (didMount.current) {
      if (!drawerVisible) {
        if (onClose) {
          onClose()
        }
      }
    }
    didMount.current = true
  }, [drawerVisible, onClose])

  const handleMaskClick = (e: MouseEvent) => {
    e.stopPropagation()
    if (mask) {
      setDrawerVisible(false)
    }
  }

  return (
    <div
      className={classNames(styles.drawerWrapper, {
        [styles.visible]: drawerVisible,
        [styles.hidden]: !drawerVisible,
      })}
    >
      {/* 抽屉 */}
      <div className={styles.drawer} style={getDrawerStyle()}>
        {children}
      </div>
      {/* 遮罩 */}
      <div
        className={classNames(styles.mask, {
          [styles.maskVisible]: drawerVisible,
          [styles.maskHidden]: !drawerVisible,
        })}
        onClick={(e) => handleMaskClick(e)}
      />
    </div>
  )
}
export default CustomDrawer
