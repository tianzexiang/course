import styles from './task-card.module.scss'
import { ReactComponent as UnfinishedIcon } from '../../assets/icons/unfinished.svg'
import { ReactComponent as FinishedIcon } from '../../assets/icons/finished.svg'
import { ReactComponent as UnimportantIcon } from '../../assets/icons/unimportant.svg'
import { ReactComponent as ImportantIcon } from '../../assets/icons/important.svg'
import { useTaskActions } from '../../hooks/useTaskActions'
import { ITask } from '../../interfaces/task'
import classnames from 'classnames'
import { ETaskFinishStat, ETaskImportantStat } from '../../enums/status'
import { MouseEvent } from 'react'

interface ITaskCard {
  task: ITask
  getTasks?: () => Promise<any>
  onClick?: (e: MouseEvent) => void
}

function TaskCard(props: ITaskCard) {
  const { task, onClick, getTasks } = props
  const { changeFinishTask, changeStarTask } = useTaskActions(getTasks)
  return (
    <div className={styles.cardWrapper}>
      {/* 左侧icon */}
      <span
        className={classnames(styles.iconWrapper, {
          [styles.finished]: task.finished === ETaskFinishStat.Finished,
        })}
        onClick={() => changeFinishTask(task)}
      >
        {task.finished === ETaskFinishStat.Finished ? (
          <FinishedIcon className={styles.finishedIcon} />
        ) : (
          <UnfinishedIcon className={styles.unfinishedIcon} />
        )}
      </span>
      {/* 中间任务内容 */}
      <span
        className={classnames(styles.taskContentAdded, {
          [styles.finished]: task.finished === ETaskFinishStat.Finished,
        })}
        onClick={onClick}
      >
        <span>{task.content}</span>
      </span>
      {/* 右侧icon */}
      <span
        className={classnames(styles.iconWrapper, {
          [styles.important]: task.important === ETaskImportantStat.Important,
        })}
        onClick={() => changeStarTask(task)}
      >
        {task.important === ETaskImportantStat.Important ? (
          <ImportantIcon className={styles.rateIcon} />
        ) : (
          <UnimportantIcon className={styles.rateIcon} />
        )}
      </span>
    </div>
  )
}
export default TaskCard
