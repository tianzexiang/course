import { ReactComponent as EmptyIcon } from '../../assets/icons/empty.svg'
import styles from './custom-empty.module.scss'

interface ICustomEmpty {
  isEmpty?: boolean
  children?: JSX.Element
  emptyIconSize?: number
  emptyIcon?: JSX.Element
}

function CustomEmpty(props: ICustomEmpty) {
  const {
    isEmpty = false,
    children = null,
    emptyIconSize = 50,
    emptyIcon = null,
  } = props
  const getEmptyIconStyle = () => ({
    width: `${emptyIconSize}px`,
    height: `${emptyIconSize}px`,
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
