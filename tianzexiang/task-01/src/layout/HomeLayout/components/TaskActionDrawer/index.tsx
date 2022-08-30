import styles from './task-action-drawer.module.scss'
import CustomDrawer from '../../../../components/CustomDrawer'
import { ITask } from '../../../../interfaces/task'
import classnames from 'classnames'
import { useTaskDrawerVis } from '../../../../hooks/useTaskDrawerVis'
import { useTaskActions } from '../../../../hooks/useTaskActions'
import { CSSProperties } from 'react'
interface ITaskActionDrawer {
  task: ITask
}

function TaskActionDrawer(props: ITaskActionDrawer) {
  const { taskActionDrawerVisible, setTaskActionDrawerVisible } = useTaskDrawerVis()
  const { removeTask, changeFinishTask, changeStarTask } = useTaskActions()
  const { task } = props
  const drawerStyle: CSSProperties = {
    borderRadius: '5px 5px 0 0',
  }

  const handleTaskFinish = (id: string) => {
    changeFinishTask(id)
    setTaskActionDrawerVisible(false)
  }

  const handleTaskStar = (id: string) => {
    changeStarTask(id)
    setTaskActionDrawerVisible(false)
  }

  const handleTaskRemove = (id: string) => {
    removeTask(id)
    setTaskActionDrawerVisible(false)
  }

  return (
    <CustomDrawer
      drawerVisible={taskActionDrawerVisible}
      setDrawerVisible={setTaskActionDrawerVisible}
      placement="bottom"
      size="auto"
      bodyStyle={drawerStyle}
    >
      <div className={styles.taskActionDrawer}>
        <div className={styles.header}>选择操作</div>
        <div className={styles.actionMenu}>
          <div
            className={styles.actionItem}
            onClick={() => handleTaskFinish(task.id)}
          >
            {task.finished ? '标记为未完成' : '标记为已完成'}
          </div>
          <div
            className={styles.actionItem}
            onClick={() => handleTaskStar(task.id)}
          >
            {task.important ? '取消标记重要' : '标记为重要'}
          </div>
          <div
            className={classnames(styles.actionItem, styles.remove)}
            onClick={() => handleTaskRemove(task.id)}
          >
            删除任务
          </div>
        </div>
        <div className={styles.gap}></div>
        <div
          className={styles.cancel}
          onClick={() => setTaskActionDrawerVisible(false)}
        >
          取消
        </div>
      </div>
    </CustomDrawer>
  )
}
export default TaskActionDrawer
