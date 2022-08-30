import { useContext } from "react";
import { context } from '../store'

export function useTaskDrawerVis() {
  const { taskActionDrawerVisible, setTaskActionDrawerVisible } = useContext(context)

  return {
    taskActionDrawerVisible,
    setTaskActionDrawerVisible
  }
}