import styles from './custom-card.module.scss'
import { CSSProperties } from 'react'

interface ICustomCard {
  children?: JSX.Element
  bodyStyle?: CSSProperties
}

function CustomCard(props: ICustomCard) {
  const { children, bodyStyle = {} } = props
  const getCardStyle = () => ({
    ...bodyStyle,
  })
  return (
    <div className={styles.cardWrapper} style={getCardStyle()}>
      {children}
    </div>
  )
}
export default CustomCard
