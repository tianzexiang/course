import { Button, Form, Input, Space, Toast } from 'antd-mobile'
import {
  EyeInvisibleOutline,
  EyeOutline,
  UploadOutline,
} from 'antd-mobile-icons'
import { useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'
import { useUserInfo } from '../../../../hooks/useUserInfo'
import { IChangePwd } from '../../../../interfaces/request'
import styles from './pwd-form.module.scss'

interface IPwdForm {
  setFormVisible: (visible: boolean) => void
}

function PwdForm(props: IPwdForm) {
  const { setFormVisible } = props
  const [pwdVisible, setPwdVisible] = useState(false)
  const [rPwdVisible, setRPwdVisible] = useState(false)
  const [oPwdVisible, setOPwdVisible] = useState(false)
  const [pwdForm] = Form.useForm<IChangePwd & { repeat_password: string }>()
  const { changeUserPwd } = useUserInfo()
  const { handleLogout } = useAuth()
  // 注册
  const register = async () => {
    try {
      // validate login info
      await pwdForm.validateFields()
      const value = pwdForm.getFieldsValue()
      if (value.password !== value.repeat_password) {
        Toast.show({
          content: '两次密码不一致',
          icon: 'fail',
        })
        return
      }
      // use login api
      const res = await changeUserPwd(value)
      if (res) {
        setFormVisible(false)
        await handleLogout()
      }
    } catch (error) {}
  }
  return (
    <Form
      layout="horizontal"
      mode="card"
      form={pwdForm}
      initialValues={{
        old_password: '',
        password: '',
        repeat_password: '',
      }}
      footer={
        <div className={styles.centerBtnWrapper}>
          <Button block color="primary" onClick={register} shape="rounded">
            <Space>
              <UploadOutline />
              <span>提交修改</span>
            </Space>
          </Button>
        </div>
      }
    >
      <Form.Item
        name="old_password"
        rules={[{ required: true, min: 6, max: 20 }]}
        extra={
          <div className={styles.eye}>
            {!oPwdVisible ? (
              <EyeInvisibleOutline onClick={() => setOPwdVisible(true)} />
            ) : (
              <EyeOutline onClick={() => setOPwdVisible(false)} />
            )}
          </div>
        }
      >
        <Input
          placeholder="旧密码"
          autoComplete="off"
          clearable
          type={oPwdVisible ? 'text' : 'password'}
        />
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
          placeholder="新密码"
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
          placeholder="重复新密码"
          autoComplete="off"
          clearable
          type={rPwdVisible ? 'text' : 'password'}
        />
      </Form.Item>
    </Form>
  )
}
export default PwdForm
