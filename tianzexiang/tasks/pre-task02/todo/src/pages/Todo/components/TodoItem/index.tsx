import { CheckBoxIcon, DeleteIcon, Item, Title } from './styled'
import { ITodo } from '../../../../interfaces/todo'

interface TodoItemProps {
  todo: ITodo
  key: string | number
  changeTodoStat(id: string): void
  deleteTodo(id: string): void
}

function TodoItem(props: TodoItemProps) {
  const { todo, changeTodoStat, deleteTodo } = props
  return (
    <Item>
      <CheckBoxIcon
        className="iconfont icon-checkbox"
        isFinished={todo.finished}
        onClick={() => changeTodoStat(todo.id)}
      />
      <Title isFinished={todo.finished}>{todo.content}</Title>
      <DeleteIcon
        className="iconfont icon-delete"
        onClick={() => deleteTodo(todo.id)}
      />
    </Item>
  )
}
export default TodoItem
