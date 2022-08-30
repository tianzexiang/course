import RouterView from './router'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './store'
import { ITask } from './interfaces/task'
import { useState } from 'react'
import { IGetUserInfoResp } from './interfaces/response'

function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [userValue, setUserValue] = useState<IGetUserInfoResp>({
    nickname: '',
    createAt: -1,
    _id: '',
  })

  return (
    <StoreProvider
      value={{
        tasks,
        setTasks,
        userValue,
        setUserValue,
      }}
    >
      <BrowserRouter>
        <RouterView />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
