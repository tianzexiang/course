import styles from './todo-finished.module.scss'
import { useEffect } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { EPagePath } from '../../enums/pageEnum'
import TaskList from '../../components/TaskList'

function TodoFinished() {
  const { tasks, hasMore, loadMore, getTasks } = useTasks(
    EPagePath.TODO_FINISHED
  )

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div className={styles.taskWrapper}>
      <TaskList
        tasks={tasks}
        loadMore={loadMore}
        hasMore={hasMore}
        onRefresh={getTasks}
      />
    </div>
  )
}
export default TodoFinished
