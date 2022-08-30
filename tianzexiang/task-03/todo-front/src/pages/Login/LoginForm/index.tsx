import { Button, Form, Input, Space } from 'antd-mobile'
import {
  EyeInvisibleOutline,
  EyeOutline,
  UploadOutline,
} from 'antd-mobile-icons'
import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { ILogin } from '../../../interfaces/request'
import styles from './login-form.module.scss'

function LoginForm() {
  const [pwdVisible, setPwdVisible] = useState(false)
  const [loginForm] = Form.useForm<ILogin>()
  const { handleLogin } = useAuth()
  // 登录
  const login = async () => {
    try {
      // validate login info
      await loginForm.validateFields()
      const value = loginForm.getFieldsValue()
      // use login api
      await handleLogin(value)
    } catch (error) {}
  }
  return (
    <Form
      layout="horizontal"
      mode="card"
      form={loginForm}
      initialValues={{ username: '', password: '' }}
      footer={
        <div className={styles.loginBtnWrapper}>
          <Button block color="primary" onClick={login} shape="rounded">
            <Space>
              <UploadOutline />
              <span>登录</span>
            </Space>
          </Button>
        </div>
      }
    >
      <Form.Item name="username" rules={[{ required: true, min: 6, max: 20 }]}>
        <Input placeholder="用户名" clearable />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, min: 6, max: 20 }]}
        extra={
          <div className={styles.eye}>
            {!pwdVisible ? (
              <EyeInvisibleOutline onClick={() => setPwdVisible(true)} />
            ) : (
              <EyeOutline onClick={() => setPwdVisible(false)} />
            )}
          </div>
        }
      >
        <Input
          placeholder="登录密码"
          clearable
          autoComplete="off"
          type={pwdVisible ? 'text' : 'password'}
        />
      </Form.Item>
    </Form>
  )
}

export default LoginForm
