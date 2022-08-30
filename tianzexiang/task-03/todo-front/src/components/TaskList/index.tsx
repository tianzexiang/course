import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh'
import { useState } from 'react'
import { ITask } from '../../interfaces/task'
import CustomEmpty from '../CustomEmpty'
import TaskActionDrawer from '../TaskActionDrawer'
import TaskCard from '../TaskCard'
import styles from './task-list.module.scss'

interface ITaskList {
  tasks: ITask[]
  onRefresh?: (() => Promise<any>) | undefined
  loadMore: (isRetry: boolean) => Promise<void>
  hasMore: boolean
}

const InfiniteScrollContent = ({ hasMore }: { hasMore?: boolean }) => {
  return (
    <>
      {hasMore ? (
        <div className={styles.hasMore}>
          <span>Loading...</span>
        </div>
      ) : (
        <span className={styles.hasMore}> 我是有底线的 ~ </span>
      )}
    </>
  )
}

function TaskList(props: ITaskList) {
  const { tasks, onRefresh, loadMore, hasMore } = props
  const statusRecord: Record<PullStatus, string> = {
    pulling: '用力拉',
    canRelease: '松开吧',
    refreshing: '玩命加载中...',
    complete: '好啦',
  }
  const [currTask, setCurrTask] = useState<ITask>({
    _id: '',
    content: '',
    finished: 1,
    ctime: -1,
    important: 1,
  })

  const [taskActionDrawerVisible, setTaskActionDrawerVisible] = useState(false)

  const handleTaskClick = (task: ITask) => {
    setCurrTask(task)
    setTaskActionDrawerVisible(true)
  }

  return (
    <div className={styles.taskListWrapper}>
      <PullToRefresh
        onRefresh={onRefresh}
        renderText={(status) => {
          return <div className={styles.renderText}>{statusRecord[status]}</div>
        }}
      >
        <CustomEmpty isEmpty={tasks.length === 0}>
          <>
            {tasks.map((task) => (
              <TaskCard
                task={task}
                key={task._id}
                getTasks={onRefresh}
                onClick={() => handleTaskClick(task)}
              />
            ))}

            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
              threshold={80}
            >
              <InfiniteScrollContent hasMore={hasMore} />
            </InfiniteScroll>

            {/* task操作抽屉 */}
            <TaskActionDrawer
              taskActionDrawerVisible={taskActionDrawerVisible}
              setTaskActionDrawerVisible={setTaskActionDrawerVisible}
              task={currTask}
              getTasks={onRefresh}
            />
          </>
        </CustomEmpty>
      </PullToRefresh>
    </div>
  )
}
export default TaskList
