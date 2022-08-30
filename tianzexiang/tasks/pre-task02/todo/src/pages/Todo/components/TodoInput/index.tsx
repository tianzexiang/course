import { Input } from './styled'
import { useState, KeyboardEvent } from 'react'

interface ITodoInputProps {
  createTodo(content: string): void
}

function TodoInput(props: ITodoInputProps) {
  const { createTodo } = props
  const [content, setContent] = useState('')

  const handleKeyPress = (content: string, e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      createTodo(content)
    }
  }
  return (
    <Input
      value={content}
      onChange={(e) => setContent(e.target.value)}
      type="text"
      placeholder="What needs to be done?"
      autoComplete="off"
      onKeyDown={(e) => handleKeyPress(content, e)}
    />
  )
}

export default TodoInput
