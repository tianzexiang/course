import { ITodo } from './types.js'

interface Props {
  todo: ITodo
  onToggle: () => void
  onDelete: () => void
}

export default class TodoItem extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.todo.finished ? "todo-item todo-finished" : "todo-item"}>
        <i className="iconfont icon-checkbox" onClick={this.props.onToggle} />
        <span className="todo-title">{this.props.todo.content}</span>
        <i className="iconfont icon-delete" onClick={this.props.onDelete} />
      </div>
    )
  }
}
