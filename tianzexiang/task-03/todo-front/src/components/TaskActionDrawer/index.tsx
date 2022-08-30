import styles from './task-action-drawer.module.scss'
import { ITask } from '../../interfaces/task'
import classnames from 'classnames'
import { useTaskActions } from '../../hooks/useTaskActions'
import { ETaskFinishStat, ETaskImportantStat } from '../../enums/status'
import { Popup } from 'antd-mobile'
interface ITaskActionDrawer {
  task: ITask
  getTasks?: () => Promise<any>
  taskActionDrawerVisible: boolean
  setTaskActionDrawerVisible: (visible: boolean) => void
}

function TaskActionDrawer(props: ITaskActionDrawer) {
  const {
    task,
    taskActionDrawerVisible,
    setTaskActionDrawerVisible,
    getTasks,
  } = props
  const { removeTask, changeFinishTask, changeStarTask } =
    useTaskActions(getTasks)

  const handleTaskFinish = (task: ITask) => {
    changeFinishTask(task)
    setTaskActionDrawerVisible(false)
  }

  const handleTaskStar = (task: ITask) => {
    changeStarTask(task)
    setTaskActionDrawerVisible(false)
  }

  const handleTaskRemove = (task: ITask) => {
    removeTask(task)
    setTaskActionDrawerVisible(false)
  }

  return (
    <Popup
      visible={taskActionDrawerVisible}
      onMaskClick={() => {
        setTaskActionDrawerVisible(false)
      }}
      bodyClassName={styles.popup}
    >
      <div className={styles.taskActionDrawer}>
        <div className={styles.header}>选择操作</div>
        <div className={styles.actionMenu}>
          <div
            className={styles.actionItem}
            onClick={() => handleTaskFinish(task)}
          >
            {task.finished === ETaskFinishStat.Finished
              ? '标记为未完成'
              : '标记为已完成'}
          </div>
          <div
            className={styles.actionItem}
            onClick={() => handleTaskStar(task)}
          >
            {task.important === ETaskImportantStat.Important
              ? '取消标记重要'
              : '标记为重要'}
          </div>
          <div
            className={classnames(styles.actionItem, styles.remove)}
            onClick={() => handleTaskRemove(task)}
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
    </Popup>
  )
}
export default TaskActionDrawer
