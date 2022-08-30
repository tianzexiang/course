import styles from './todo-task.module.scss'
import InputCard from '../../components/InputCard'
import TaskCard from '../../components/TaskCard'
import { useTaskList } from '../../hooks/useTaskList'
import CustomEmpty from '../../components/CustomEmpty'
import { useCurrentTask } from '../../hooks/useCurrentTask'
import { useTaskDrawerVis } from '../../hooks/useTaskDrawerVis'
import { ITask } from '../../interfaces/task'

function TodoTask() {
  const { unfinishedTaskList } = useTaskList()
  const { setCurrTask } = useCurrentTask()
  const { setTaskActionDrawerVisible } = useTaskDrawerVis()

  const handleTaskClick = (task: ITask) => {
    setCurrTask(task)
    setTaskActionDrawerVisible(true)
  }
  return (
    <>
      {/* 任务列表 */}
      <CustomEmpty isEmpty={unfinishedTaskList.length === 0}>
        <div className={styles.taskWrapper}>
          {unfinishedTaskList.map((task) => (
            <TaskCard
              content={task.content}
              task={task}
              key={task.id}
              onClick={() => handleTaskClick(task)}
            />
          ))}
        </div>
      </CustomEmpty>

      {/* 添加任务 */}
      <InputCard />
    </>
  )
}
export default TodoTask
