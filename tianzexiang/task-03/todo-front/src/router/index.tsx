import { Navigate, useRoutes, RouteObject } from 'react-router-dom'
import HomeLayout from '../layout/HomeLayout'
import { lazy, LazyExoticComponent, Suspense } from 'react'
import { EPagePath } from '../enums/pageEnum'

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
    element: <Navigate to={EPagePath.LOGIN} replace={true} />,
  },
  {
    path: EPagePath.LOGIN,
    element: lazyElement(lazy(() => import('../pages/Login'))),
  },
  {
    element: <HomeLayout />,
    children: [
      {
        path: EPagePath.TODO_TASK,
        element: lazyElement(lazy(() => import('../pages/TodoTask'))),
      },
      {
        path: EPagePath.TODO_IMPORTANT,
        element: lazyElement(lazy(() => import('../pages/TodoImportant'))),
      },
      {
        path: EPagePath.TODO_FINISHED,
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
