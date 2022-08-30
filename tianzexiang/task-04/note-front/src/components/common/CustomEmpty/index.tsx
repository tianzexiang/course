import { ReactNode } from 'react'
import EmptyIcon from '../../../assets/icons/empty.svg'
import styles from './custom-empty.module.scss'

interface ICustomEmpty {
  isEmpty?: boolean
  children?: ReactNode
  emptyIconSize?: number
  emptyIcon?: ReactNode
  color?: string
}

function CustomEmpty(props: ICustomEmpty) {
  const {
    isEmpty = false,
    children = null,
    emptyIconSize = 50,
    emptyIcon = null,
    color = 'inherit',
  } = props
  const getEmptyIconStyle = () => ({
    width: `${emptyIconSize}px`,
    height: `${emptyIconSize}px`,
    color,
  })
  return (
    <>
      {isEmpty ? (
        <div className={styles.emptyWrapper}>
          {emptyIcon ? emptyIcon : <EmptyIcon style={getEmptyIconStyle()} />}
        </div>
      ) : (
        children
      )}
    </>
  )
}
export default CustomEmpty
