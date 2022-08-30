import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg'
import styles from './input-card.module.scss'
import { useInputVal } from '../../../hooks/useInputVal'
import { useTaskActions } from '../../../hooks/useTaskActions'
import { KeyboardEvent } from 'react'

interface IInputCard {
  getTasks?: () => Promise<any>
}

function InputCard(props: IInputCard) {
  const { getTasks } = props
  const taskContent = useInputVal('')
  const { addTask } = useTaskActions(getTasks)
  const handleAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && taskContent.inputAttr.value.trim() !== '') {
      addTask(taskContent.inputAttr.value)
      taskContent.setValue('')
    }
  }
  return (
    <div className={styles.cardWrapper}>
      {/* 卡片左边图标 */}
      <span className={styles.iconWrapper}>
        <PlusIcon className={styles.plusIcon} />
      </span>
      {/* input输入框 */}
      <input
        className={styles.taskInput}
        placeholder="添加任务"
        {...taskContent.inputAttr}
        onKeyDown={(e) => handleAddTask(e)}
      />
    </div>
  )
}
export default InputCard
