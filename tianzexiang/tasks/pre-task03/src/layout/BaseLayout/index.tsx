import ContentLayout from './components/ContentLayout'
import HeaderLayout from './components/HeaderLayout'
import { BaseLayoutWrapper } from './styled'
function BaseLayout() {
  return (
    <BaseLayoutWrapper>
      <HeaderLayout />
      <ContentLayout />
    </BaseLayoutWrapper>
  )
}

export default BaseLayout
