import { Button, Form, Input, Space } from 'antd-mobile'
import { UploadOutline } from 'antd-mobile-icons'
import { useUserInfo } from '@/hooks/useUserInfo'
import { IGetUserInfoResp } from '@/interfaces/response'
import styles from './user-info-form.module.scss'

interface IUserInfoForm {
  userValue: IGetUserInfoResp
  setUser: (params: Pick<IGetUserInfoResp, 'nickname'>) => Promise<boolean>
  setFormVisible: (visible: boolean) => void
}

function UserInfoForm(props: IUserInfoForm) {
  const { setFormVisible, setUser, userValue } = props
  const [userInfoForm] = Form.useForm<Pick<IGetUserInfoResp, 'nickname'>>()
  // 登录
  const setUserInfo = async () => {
    try {
      // validate login info
      await userInfoForm.validateFields()
      const value = userInfoForm.getFieldsValue()
      // use login api
      const res = await setUser(value)
      if (res) {
        setFormVisible(false)
      }
    } catch (error) {}
  }
  return (
    // 修改用户昵称菜单
    <Form
      layout="horizontal"
      mode="card"
      form={userInfoForm}
      initialValues={{ nickname: userValue.nickname }}
      footer={
        <div className={styles.centerBtnWrapper}>
          <Button block color="primary" shape="rounded" onClick={setUserInfo}>
            <Space>
              <UploadOutline />
              <span>提交修改</span>
            </Space>
          </Button>
        </div>
      }
    >
      <Form.Header>
        <div className={styles.formTitle}>修改信息</div>
      </Form.Header>
      <Form.Item name="nickname" rules={[{ required: true, min: 3, max: 20 }]}>
        <Input placeholder="昵称" clearable />
      </Form.Item>
    </Form>
  )
}
export default UserInfoForm
