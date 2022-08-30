import { IUserInfoResp } from '@/interfaces/response/user'
import { Avatar, Button } from 'antd-mobile'
import styles from './style.module.scss'
import classnames from 'classnames'
import { MouseEvent, ReactNode } from 'react'
import { getFriendlyNum } from '@/utils/tools/getFriendlyNum'

interface IFollowItem {
  user: Omit<
    IUserInfoResp,
    'hasFollowed' | 'followCounts' | 'subscribeCounts'
  > & {
    hasFollowed?: boolean
    followCounts?: number
    subscribeCounts?: number
  }
  hasFollowed: boolean
  isSelf: boolean
  followText?: ReactNode
  unfollowText?: ReactNode
  onItemClick?: (e: MouseEvent) => void
  onFollowBtnClick?: (e: MouseEvent) => void
}

function FollowItem({
  user,
  hasFollowed,
  isSelf,
  followText = '正在关注',
  unfollowText = '关注',
  onItemClick = () => {},
  onFollowBtnClick = () => {}
}: IFollowItem) {
  return (
    <div className={styles.followItemWrapper} onClick={(e) => onItemClick(e)}>
      {/* item左侧部分 */}
      <div className={styles.left}>
        <Avatar className={styles.avatar} src={user.avatar} />
      </div>
      {/* item右侧部分 */}
      <div className={styles.right}>
        {/* item right 顶部部分 */}
        <div className={styles.top}>
          {/* 用户名称和id */}
          <div className={styles.userName}>
            <div className={styles.nickname}>{user.nickname}</div>
            <div className={styles.userId}>{user.userId}</div>
            {/* 是否存在两个数据 */}
            {user.subscribeCounts || user?.subscribeCounts === 0 ? (
              <div className={styles.userFollowInfo}>
                <div className={styles.subscribe}>
                  <span className={styles.num}>
                    {getFriendlyNum(user.subscribeCounts)}
                  </span>
                  关注者
                </div>
              </div>
            ) : null}
          </div>
          {/* 关注按钮 */}
          {isSelf ? null : (
            <Button
              shape="rounded"
              className={classnames({
                [styles.hasFollowedBtn]: hasFollowed,
                [styles.unFollowedBtn]: !hasFollowed
              })}
              loading="auto"
              onClick={(e) => onFollowBtnClick(e)}
            >
              <span className={styles.text}>
                {hasFollowed ? followText : unfollowText}
              </span>
            </Button>
          )}
        </div>
        {/* item right 底部部分 */}
        <div className={styles.bottom}>{user.bio}</div>
      </div>
    </div>
  )
}

export default FollowItem
