import { useRoutes, Navigate } from 'react-router-dom'
import { PagePathEnum } from '@/enums/pageEnum'
import { lazy, Suspense } from 'react'
import BaseLayout from '@/layout/BaseLayout'

const GoodArticle = lazy(() => import('@/pages/GoodArticle'))
const HotNews = lazy(() => import('@/pages/HotNews'))
const Detail = lazy(() => import('@/pages/Detail'))

function RouterView() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to={PagePathEnum.GOOD_ARTICLE} replace={true} />,
    },
    {
      element: <BaseLayout />,
      children: [
        {
          path: PagePathEnum.GOOD_ARTICLE,
          element: (
            <Suspense>
              <GoodArticle />
            </Suspense>
          ),
        },
        {
          path: PagePathEnum.HOT_NEWS,
          element: (
            <Suspense>
              <HotNews />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: PagePathEnum.DETAIL,
      element: (
        <Suspense>
          <Detail />
        </Suspense>
      ),
    },
  ])
  return routes
}

export default RouterView
