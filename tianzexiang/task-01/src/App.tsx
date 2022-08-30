import RouterView from './router'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './store'
import { useEffect, useState } from 'react'
import { ITask } from './interfaces/task'

function App() {
  const [taskList, setTaskList] = useState<ITask[]>(
    localStorage.getItem('taskList')
      ? JSON.parse(localStorage.getItem('taskList') as string)
      : []
  )

  const [currTask, setCurrTask] = useState<ITask>({
    id: '',
    content: '',
    finished: false,
    ctime: -1,
    important: false,
  })

  const [taskActionDrawerVisible, setTaskActionDrawerVisible] = useState(false)

  // 统一进行数据存储
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList))
  }, [taskList])

  return (
    <StoreProvider
      value={{
        taskList,
        setTaskList,
        currTask,
        setCurrTask,
        taskActionDrawerVisible,
        setTaskActionDrawerVisible,
      }}
    >
      <BrowserRouter>
        <RouterView />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
