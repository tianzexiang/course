import { Button, Form, Input, Space, Toast } from 'antd-mobile'
import {
  EyeInvisibleOutline,
  EyeOutline,
  UserAddOutline,
} from 'antd-mobile-icons'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { IRegister } from '@/interfaces/request'
import styles from './register-form.module.scss'

function RegisterForm() {
  const [pwdVisible, setPwdVisible] = useState(false)
  const [rPwdVisible, setRPwdVisible] = useState(false)
  const [registerForm] = Form.useForm<IRegister & { repeat_password: string }>()
  const { handleRegister, handleLogin } = useAuth()
  // 注册
  const register = async () => {
    try {
      // validate login info
      await registerForm.validateFields()
      const value = registerForm.getFieldsValue()
      if (value.password !== value.repeat_password) {
        Toast.show({
          content: '两次密码不一致',
          icon: 'fail',
        })
        return
      }
      // use login api
      const res = await handleRegister(value)
      if (!res) registerForm.resetFields()
      else await handleLogin(value)
    } catch (error) {}
  }
  return (
    <Form
      layout="horizontal"
      mode="card"
      form={registerForm}
      initialValues={{
        username: '',
        password: '',
        nickname: '',
        repeat_password: '',
      }}
      footer={
        <div className={styles.registerBtnWrapper}>
          <Button block color="primary" onClick={register} shape="rounded">
            <Space>
              <UserAddOutline />
              <span>注册</span>
            </Space>
          </Button>
        </div>
      }
    >
      <Form.Item name="nickname" rules={[{ required: true, min: 3, max: 20 }]}>
        <Input placeholder="昵称" clearable />
      </Form.Item>
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
          placeholder="注册密码"
          autoComplete="off"
          clearable
          type={pwdVisible ? 'text' : 'password'}
        />
      </Form.Item>
      <Form.Item
        name="repeat_password"
        rules={[{ required: true, min: 6, max: 20 }]}
        extra={
          <div className={styles.eye}>
            {!rPwdVisible ? (
              <EyeInvisibleOutline onClick={() => setRPwdVisible(true)} />
            ) : (
              <EyeOutline onClick={() => setRPwdVisible(false)} />
            )}
          </div>
        }
      >
        <Input
          placeholder="重复注册密码"
          autoComplete="off"
          clearable
          type={rPwdVisible ? 'text' : 'password'}
        />
      </Form.Item>
    </Form>
  )
}

export default RegisterForm
