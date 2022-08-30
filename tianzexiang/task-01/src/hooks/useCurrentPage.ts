import { useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { PageNameEnum, PagePathEnum } from '../enums/pageEnum'

export function useCurrentPage() {
  const [currPagePath, setCurrPagePath] = useState('')
  const location = useLocation()


  useEffect(() => {
    setCurrPagePath(location.pathname)
  }, [location])

  const currPageTitle = useMemo(() => {
    if (currPagePath === PagePathEnum.TODO_TASK) {
      return PageNameEnum.TODO_TASK
    } else if (currPagePath === PagePathEnum.TODO_FINISHED) {
      return PageNameEnum.TODO_FINISHED
    } else {
      return PageNameEnum.TODO_IMPORTANT
    }
  }, [currPagePath])
  return {
    currPagePath,
    setCurrPagePath,
    currPageTitle
  }
}