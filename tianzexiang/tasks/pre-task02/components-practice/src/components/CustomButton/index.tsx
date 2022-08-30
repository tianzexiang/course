import { ButtonDefault, ButtonPrimary } from './styled'
import { MouseEvent } from 'react'

interface ICustomButtonProps {
  type?: 'primary' | 'default'
  onClick?: (e: MouseEvent) => void
  children: JSX.Element | string
}
function CustomButton(props: ICustomButtonProps) {
  const { type = 'default', children, onClick } = props
  return (
    <>
      {type === 'default' ? (
        <ButtonDefault onClick={(e) => (onClick ? onClick(e) : undefined)}>
          {children}
        </ButtonDefault>
      ) : (
        <ButtonPrimary onClick={(e) => (onClick ? onClick(e) : undefined)}>
          {children}
        </ButtonPrimary>
      )}
    </>
  )
}
export default CustomButton
