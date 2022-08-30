import styles from './task-card.module.scss'
import CustomCard from '../CustomCard'
import { ReactComponent as UnfinishedIcon } from '../../assets/icons/unfinished.svg'
import { ReactComponent as FinishedIcon } from '../../assets/icons/finished.svg'
import { ReactComponent as UnimportantIcon } from '../../assets/icons/unimportant.svg'
import { ReactComponent as ImportantIcon } from '../../assets/icons/important.svg'
import { useTaskActions } from '../../hooks/useTaskActions'
import { ITask } from '../../interfaces/task'
import classnames from 'classnames'
import { CSSProperties, MouseEvent } from 'react'

interface ITaskCard {
  content: string
  task: ITask
  onClick?: (e: MouseEvent) => void
}

function TaskCard(props: ITaskCard) {
  const { content, task, onClick } = props
  const { changeFinishTask, changeStarTask } = useTaskActions()
  const taskCardStyle: CSSProperties = {
    margin: '0 0 5px 0',
    minHeight: '50px',
    cursor: 'pointer',
  }
  return (
    <CustomCard bodyStyle={taskCardStyle}>
      <>
        {/* 左侧icon */}
        <span
          className={classnames(styles.iconWrapper, {
            [styles.finished]: task.finished,
          })}
          onClick={() => changeFinishTask(task.id)}
        >
          {task.finished ? (
            <FinishedIcon className={styles.finishedIcon} />
          ) : (
            <UnfinishedIcon className={styles.unfinishedIcon} />
          )}
        </span>
        {/* 中间任务内容 */}
        <span
          className={classnames(styles.taskContentAdded, {
            [styles.finished]: task.finished,
          })}
          onClick={onClick}
        >
          <span>{content}</span>
        </span>
        {/* 右侧icon */}
        <span
          className={classnames(styles.iconWrapper, {
            [styles.important]: task.important,
          })}
        >
          {task.important ? (
            <ImportantIcon
              className={styles.rateIcon}
              onClick={() => changeStarTask(task.id)}
            />
          ) : (
            <UnimportantIcon
              className={styles.rateIcon}
              onClick={() => changeStarTask(task.id)}
            />
          )}
        </span>
      </>
    </CustomCard>
  )
}
export default TaskCard
