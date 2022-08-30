import { useContext } from "react"
import { context } from '../store'

export function useCurrentTask() {
  const { currTask, setCurrTask } = useContext(context)
  return {
    currTask,
    setCurrTask
  }
}