import { Navigate, useRoutes, RouteObject } from 'react-router-dom'
import HomeLayout from '../layout/HomeLayout'
import { lazy, LazyExoticComponent, Suspense } from 'react'
import { PagePathEnum } from '../enums/pageEnum'

const lazyElement = (Component: LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<div> 加载中... </div>}>
      <Component />
    </Suspense>
  )
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={PagePathEnum.TODO_TASK} replace={true} />,
  },
  {
    element: <HomeLayout />,
    children: [
      {
        path: PagePathEnum.TODO_TASK,
        element: lazyElement(lazy(() => import('../pages/TodoTask'))),
      },
      {
        path: PagePathEnum.TODO_IMPORTANT,
        element: lazyElement(lazy(() => import('../pages/TodoImportant'))),
      },
      {
        path: PagePathEnum.TODO_FINISHED,
        element: lazyElement(lazy(() => import('../pages/TodoFinished'))),
      },
    ],
  },
  {
    path: '*',
    element: lazyElement(lazy(() => import('../pages/Error'))),
  },
]

export default function Routes() {
  return useRoutes(routes)
}
