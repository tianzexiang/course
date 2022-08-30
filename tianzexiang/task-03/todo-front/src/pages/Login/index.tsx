import { Card, Space } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import styles from './login.module.scss'
import { useUserInfo } from '../../hooks/useUserInfo'
function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const { getUser } = useUserInfo()
  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <div className={styles.loginWrapper}>
      <Card
        title={
          <div className={styles.loginTitleWrapper}>
            <span>{isLoginForm ? '登录' : '注册'}</span>
            <div className={styles.divider}></div>
            <div
              className={styles.toOtherForm}
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              <Space>
                <span>
                  {isLoginForm ? '没有账号？立即注册' : '已有账号,立即登录'}
                </span>
                <RightOutline fontSize={10} />
              </Space>
            </div>
          </div>
        }
        headerClassName={styles.loginCardHeader}
      >
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
      </Card>
    </div>
  )
}
export default Login
