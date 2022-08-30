import styles from './todo-task.module.scss'
import InputCard from './InputCard'
import { useEffect } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { EPagePath } from '../../enums/pageEnum'
import TaskList from '../../components/TaskList'

function TodoTask() {
  const { tasks, hasMore, loadMore, getTasks } = useTasks(EPagePath.TODO_TASK)

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <>
      {/* 任务列表 */}

      <div className={styles.taskWrapper}>
        <TaskList
          tasks={tasks}
          loadMore={loadMore}
          hasMore={hasMore}
          onRefresh={getTasks}
        />
      </div>

      {/* 添加任务 */}
      <InputCard getTasks={getTasks} />
    </>
  )
}
export default TodoTask
