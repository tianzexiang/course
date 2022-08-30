<template>
  <el-container>
    <el-header>
      <img src="@/assets/images/logo.svg" class="logo" />
      <span class="title">金山表单</span>
    </el-header>
    <el-container>
      <el-main>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
          class="demo-ruleForm">
          <el-form-item>
            <el-icon @click="handleArrowLeftClick" class="arrow-left" :size="20">
              <ArrowLeft />
            </el-icon>
            <!-- 账号注册 -->
          </el-form-item>
          <el-form-item prop="id">
            <el-input placeholder="账号" v-model="ruleForm.id" />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input placeholder="密码" show-password v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input placeholder="确认密码" show-password v-model="ruleForm.checkPass" type="password"
              autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { register, login } from '@/api/auth'
import * as userAPi from '@/api/user'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { ResultEnum } from '@/enums/httpEnum'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { IUser } from '@/interfaces/user'
import { EStatus } from '@/interfaces/problem'
const userStore = useUserStore()
const router = useRouter()
let user: IUser = reactive({
  id: '',
  nickname: '',
  account: '',
  status: EStatus.normal,
  pwd: '',
  avatar: '',
  ctime: 0,
  utime: 0
})

// 点击箭头回到登录页面进行登录
const handleArrowLeftClick = () => router.back()
const ruleFormRef = ref<FormInstance>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkId = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入账号！'))
  } else {
    callback()
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码！'))
  } else if (value !== ruleForm.pass) {
    callback(new Error('两次输入的密码不一样!'))
  } else {
    callback()
  }
}
const ruleForm = reactive({
  pass: '',
  checkPass: '',
  id: ''
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  id: [{ validator: checkId, trigger: 'blur' }]
})
// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: unknown) => {
    const account = ruleForm.id
    const pwd = ruleForm.pass
    const confirmPwd = ruleForm.checkPass
    if (valid) {
      try {
        const res = await register({
          account,
          pwd,
          confirmPwd
        })
        if (res.stat === ResultEnum.SUCCESS) {
          ElMessage({
            type: 'success',
            message: '注册成功'
          })
          const res = await login({
            account,
            pwd
          })
          if (res.stat === ResultEnum.SUCCESS) {
            document.cookie = 'login=yes'
            // 跳转到首页
            router.push({
              path: '/home'
            })
            try {
              //   // 获取用户全部信息
              const res = await userAPi.getUserInfo()
              if (res.stat === ResultEnum.SUCCESS && res.data?.user !== undefined) {
                user = res.data.user
                // 设置初始头像昵称
                const nickname = 'user'
                const avatar =
                  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F5%2Fdef6ed04-6d34-402e-99c8-366266f627dd.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656136447&t=6bdbb16c4b9296dea969f85f8ce0959f'

                //     // 设置用户的昵称和头像为store里面的默认值
                try {
                  const res = await userAPi.setUserInfo({
                    nickname,
                    avatar
                  })
                  if (res.stat === ResultEnum.SUCCESS) {
                    // 保存用户信息到本地
                    user.avatar = avatar
                    user.nickname = nickname
                    userStore.setUserInfo(user)
                  }
                } catch (err) {}
              }
            } catch (err) {}
          }
        }
      } catch (err) { }
    } else {
      ElMessage.info('注册失败')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped lang="less">
.el-header {
  display: flex;
  align-items: center;
  color: @primary-text-color;
  user-select: none;
  border-bottom: 1px solid #e8e8e8;
  background: #fff;

  .logo {
    margin-right: 5px;
  }

  .title {
    font-size: 18px;
  }
}

.el-container {
  height: 100%;
  background-color: rgb(247, 247, 247);
}

.el-form {
  margin: 80px auto;
  width: 350px;
  border: 1px solid #e8e8e8;
  background: #fff;
  padding: 30px;
  padding-top: 20px;
  border-radius: 10px;
}

:deep(.el-form-item__content) {
  margin: 0 auto !important;
  display: flex;
  justify-content: center;
}

.el-form-item {
  height: 40px !important;

  .el-form-item__content {
    .el-input {
      height: 40px;
    }
  }
}

.el-form-item:nth-child(1) {
  position: relative;

  :deep(.el-form-item__content) {
    font-size: 18px;
  }
}

.arrow-left {
  cursor: pointer;
  position: absolute;
  left: 0;
}
</style>
