import TodoInput from '../TodoInput'
import TodoItem from '../TodoItem'
import { ITodo } from '../../../../interfaces/todo'
import {
  createTodo,
  getTodoList,
  doneTodo,
  deleteTodo,
} from '../../../../api/todo'
import { useState, useEffect } from 'react'

function TodoContent() {
  const [todoList, setTodoList] = useState<ITodo[]>([])

  // 获取todo列表
  const handleGetTodoList = async () => {
    try {
      const res = await getTodoList()
      setTodoList(res.data)
    } catch (error) {}
  }
  
  // 创建todo
  const handleCreateTodo = async (content: string) => {
    try {
      await createTodo(content)
      handleGetTodoList()
    } catch (error) {}
  }

  // 改变todo状态
  const handleChangeTodoStat = async (id: string) => {
    try {
      await doneTodo(id)
      handleGetTodoList()
    } catch (error) {}
  }

  // 删除todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id)
      handleGetTodoList()
    } catch (error) {}
  }

  useEffect(() => {
    handleGetTodoList()
  }, [])

  return (
    <section>
      {/* 输入框 */}
      <TodoInput createTodo={(content) => handleCreateTodo(content)} />
      {/* 待办事项列表 */}
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          changeTodoStat={(id) => handleChangeTodoStat(id)}
          deleteTodo={(id) => handleDeleteTodo(id)}
        />
      ))}
    </section>
  )
}
export default TodoContent
