import styled from 'styled-components'

interface ITabProps {
  isActive: boolean
}

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  max-width: 1280px;
  height: var(--header-height);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background-color: var(--theme-color);
  color: #fff;
`

export const Title = styled.div`
  text-align: center;
  font-size: 1rem;
  width: 100%;
  padding: 8px 0;
`

export const TabWrapper = styled.nav`
  width: 90%;
  margin: 0 auto;
  padding: 2px 0 12px 0;
  caret-color: transparent;
`
export const Tabs = styled.ul`
  display: flex;
  justify-content: space-around;
  background-color: #ce2523;
  border-radius: 10px;
  font-size: 0.9rem;
  overflow: hidden;
`

export const TabItem = styled.li<ITabProps>`
  flex: 1;
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${props => props.isActive ? '#bb2021' : 'inherit'};
`

export const TabImg = styled.img`
  width: 1rem;
`

export const TabTitle = styled.span``
