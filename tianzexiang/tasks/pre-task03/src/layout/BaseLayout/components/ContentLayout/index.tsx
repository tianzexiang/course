import { Outlet } from 'react-router-dom'
import { ContentWrapper } from './styled'
function ContentLayout() {
  return (
    <ContentWrapper>
      <Outlet />
    </ContentWrapper>
  )
}
export default ContentLayout
