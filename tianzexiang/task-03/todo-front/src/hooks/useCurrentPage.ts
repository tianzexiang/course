import { useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { EPageName, EPagePath } from '../enums/pageEnum'

export function useCurrentPage() {
  const [currPagePath, setCurrPagePath] = useState('')
  const location = useLocation()


  useEffect(() => {
    setCurrPagePath(location.pathname)
  }, [location])

  const currPageTitle = useMemo(() => {
    if (currPagePath === EPagePath.TODO_TASK) {
      return EPageName.TODO_TASK
    } else if (currPagePath === EPagePath.TODO_FINISHED) {
      return EPageName.TODO_FINISHED
    } else {
      return EPageName.TODO_IMPORTANT
    }
  }, [currPagePath])
  return {
    currPagePath,
    setCurrPagePath,
    currPageTitle
  }
}