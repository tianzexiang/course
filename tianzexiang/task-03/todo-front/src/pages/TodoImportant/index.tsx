import styles from './todo-important.module.scss'
import { useEffect } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { EPagePath } from '../../enums/pageEnum'
import TaskList from '../../components/TaskList'

function TodoImportant() {
  const { tasks, hasMore, loadMore, getTasks } = useTasks(
    EPagePath.TODO_IMPORTANT
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
export default TodoImportant
