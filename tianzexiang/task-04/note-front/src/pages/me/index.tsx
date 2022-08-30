import BaseLayout from '@/layout/BaseLayout'
import { CenterPopup, List, Avatar } from 'antd-mobile'
import styles from './me.module.scss'
import { LockOutline, UserSetOutline } from 'antd-mobile-icons'
import LogoutSvg from '../../assets/icons/logout.svg'
import { useState } from 'react'
import PwdForm from '@/components/me/PwdForm'
import UserInfoForm from '@/components/me/UserInfoForm'
import { GetServerSideProps } from 'next'
import { getMeProps } from '@/api/ssr'
import { IGetUserInfoResp, IResp } from '@/interfaces/response'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useAuth } from '@/hooks/useAuth'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const props = await getMeProps(req.headers.cookie)
  return props
}

function Me(props: IResp<IGetUserInfoResp>) {
  const { data } = props
  const { userValue, changeUserPwd, setUser } = useUserInfo(
    data ?? { nickname: '', createAt: -1, _id: '' }
  )
  const { handleLogout } = useAuth()
  const [userFormVisible, setUserFormVisible] = useState(false)
  const [isPwdForm, setIsPwdForm] = useState(false)
  // 显示修改用户弹窗
  const handleUpdateUserInfoClick = () => {
    setIsPwdForm(false)
    setUserFormVisible(true)
  }

  // 显示修改密码弹窗
  const handleUpdatePwdClick = () => {
    setIsPwdForm(true)
    setUserFormVisible(true)
  }
  return (
    <BaseLayout title="我的">
      <div className={styles.meWrapper}>
        <div className={styles.header}>
          <Avatar
            className={styles.avatar}
            src="/images/avatar.webp"
            fallback={null}
          />
          <div className={styles.userInfo}>{userValue.nickname}</div>
        </div>
        <List mode="card">
          <List.Item
            prefix={<UserSetOutline />}
            onClick={handleUpdateUserInfoClick}
          >
            <span>修改用户名</span>
          </List.Item>
          <List.Item prefix={<LockOutline />} onClick={handleUpdatePwdClick}>
            <span>修改密码</span>
          </List.Item>
          <List.Item prefix={<LogoutSvg />} onClick={handleLogout}>
            <span>退出登录</span>
          </List.Item>
        </List>
      </div>
      {/* 修改用户信息 */}
      <CenterPopup
        visible={userFormVisible}
        onMaskClick={() => {
          setUserFormVisible(false)
        }}
      >
        <div className={styles.centerWrapper}>
          {isPwdForm ? (
            <PwdForm
              setFormVisible={setUserFormVisible}
              changeUserPwd={changeUserPwd}
            />
          ) : (
            <UserInfoForm
              setFormVisible={setUserFormVisible}
              userValue={userValue}
              setUser={setUser}
            />
          )}
        </div>
      </CenterPopup>
    </BaseLayout>
  )
}
export default Me
