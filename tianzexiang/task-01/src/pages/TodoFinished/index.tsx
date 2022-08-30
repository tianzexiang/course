import TaskCard from '../../components/TaskCard'
import { useTaskList } from '../../hooks/useTaskList'
import styles from './todo-finished.module.scss'
import CustomEmpty from '../../components/CustomEmpty'
import { useCurrentTask } from '../../hooks/useCurrentTask'
import { useTaskDrawerVis } from '../../hooks/useTaskDrawerVis'
import { ITask } from '../../interfaces/task'

function TodoFinished() {
  const { finishedTaskList } = useTaskList()
  const { setCurrTask } = useCurrentTask()
  const { setTaskActionDrawerVisible } = useTaskDrawerVis()

  const handleTaskClick = (task: ITask) => {
    setCurrTask(task)
    setTaskActionDrawerVisible(true)
  }
  return (
    <CustomEmpty isEmpty={finishedTaskList.length === 0}>
      <div className={styles.taskWrapper}>
        {finishedTaskList.map((task) => (
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
export default TodoFinished
