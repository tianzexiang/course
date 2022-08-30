import { useFileActions } from '@/hooks/useFileActions'
import { ICreateFolderOrFile } from '@/interfaces/request'
import { Button, CenterPopup, Form, Input, Space } from 'antd-mobile'
import { UploadOutline } from 'antd-mobile-icons'
import { useEffect } from 'react'
import styles from './title-input.module.scss'

interface ITitleForm {
  isCreate: boolean // 决定是创建还是修改
  getFiles: () => Promise<any>
  formVisible: boolean
  setFormVisible: (visible: boolean) => void
  isFolder: boolean
  fileId?: string
  initTitle?: string
  folderId?: string
}

function TitleInputForm({
  formVisible,
  setFormVisible,
  getFiles,
  fileId,
  initTitle = '',
  isFolder = false,
  folderId,
  isCreate,
}: ITitleForm) {
  const [titleForm] = Form.useForm<Pick<ICreateFolderOrFile, 'title'>>()
  // 重置表单最新初始值
  useEffect(() => {
    titleForm.resetFields()
  }, [initTitle])
  const { addFolderOrFile, handleSaveFolderOrFile } = useFileActions({
    getFiles,
  })
  const handleUpdate = async () => {
    try {
      await titleForm.validateFields()
      const value = titleForm.getFieldsValue()
      let res = false
      if (isCreate) {
        res = await addFolderOrFile({
          title: value.title,
          folder: isFolder,
          folderId,
        })
      } else {
        res = await handleSaveFolderOrFile({
          id: fileId || '',
          title: value.title,
        })
        if (res) {
          await getFiles()
        }
      }
      if (res) {
        setFormVisible(false)
      }
    } catch (error) {}
  }

  return (
    // 创建文件菜单
    <CenterPopup
      forceRender  // 解决未挂载时form报错问题
      visible={formVisible}
      onMaskClick={() => {
        setFormVisible(false)
      }}
    >
      <div className={styles.centerWrapper}>
        <Form
          layout="horizontal"
          mode="card"
          form={titleForm}
          initialValues={{ title: initTitle }}
          footer={
            <div className={styles.centerBtnWrapper}>
              <Button
                block
                color="primary"
                shape="rounded"
                onClick={handleUpdate}
              >
                <Space>
                  <UploadOutline />
                  <span>{isCreate ? '创建' : '修改'}</span>
                </Space>
              </Button>
            </div>
          }
        >
          <Form.Header>
            <div className={styles.formTitle}>
              {isFolder ? '文件夹' : '笔记'}
            </div>
          </Form.Header>
          <Form.Item name="title" rules={[{ required: true, min: 1, max: 30 }]}>
            <Input
              placeholder={`请输入${isFolder ? '文件夹' : '笔记'}名称`}
              clearable
            />
          </Form.Item>
        </Form>
      </div>
    </CenterPopup>
  )
}
export default TitleInputForm
