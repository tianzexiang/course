import styles from './todo-important.module.scss'
import { useTaskList } from '../../hooks/useTaskList'
import TaskCard from '../../components/TaskCard'
import CustomEmpty from '../../components/CustomEmpty'
import { useCurrentTask } from '../../hooks/useCurrentTask'
import { useTaskDrawerVis } from '../../hooks/useTaskDrawerVis'
import { ITask } from '../../interfaces/task'

function TodoImportant() {
  const { starTaskList } = useTaskList()
  const { setCurrTask } = useCurrentTask()
  const { setTaskActionDrawerVisible } = useTaskDrawerVis()

  const handleTaskClick = (task: ITask) => {
    setCurrTask(task)
    setTaskActionDrawerVisible(true)
  }
  return (
    <CustomEmpty isEmpty={starTaskList.length === 0}>
      <div className={styles.taskWrapper}>
        {starTaskList.map((task) => (
          <TaskCard
            content={task.content}
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task)}
          />
        ))}
      </div>
    </CustomEmpty>
  )
}
export default TodoImportant
