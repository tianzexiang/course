<template>
  <el-container>
    <el-header>
      <img src="@/assets/images/logo.svg" class="logo" />
      <span class="title">金山表单</span>
    </el-header>
    <el-container>
      <el-main>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px"
          class="demo-ruleForm">
          <el-form-item>账号登录</el-form-item>
          <el-form-item prop="id">
            <el-input placeholder="账号" v-model="ruleForm.id" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input show-password placeholder="密码" v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item @click="register()">没有账号？去注册</el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { login } from '@/api/auth'
import { getUserInfo } from '@/api/user'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { EStatus } from '@/interfaces/problem'
import { IUser } from '@/interfaces/user'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { ResultEnum } from '@/enums/httpEnum'
const router = useRouter()
const userStore = useUserStore()
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
const ruleFormRef = ref<FormInstance>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkId = (rule: unknown, value: unknown, callback: any) => {
  if (!value) {
    return callback(new Error('请输入账号！'))
  }
  setTimeout(() => {
    callback()
  }, 1000)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass = (rule: unknown, value: unknown, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else {
    if (ruleForm.pass !== '') {
      if (!ruleFormRef.value) return
    }
    callback()
  }
}
const ruleForm = reactive({
  pass: '',
  id: ''
})
const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  id: [{ validator: checkId, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: unknown) => {
    const account = ruleForm.id
    const pwd = ruleForm.pass
    if (valid) {
      try {
        const res = await login({
          account,
          pwd
        })
        if (res.stat === ResultEnum.SUCCESS) {
          ElMessage({
            type: 'success',
            message: '登录成功'
          })
          // 登录成功,自定义标志存到cookie中
          document.cookie = 'login=yes'
          // 跳转到首页
          router.push({
            path: '/home'
          })
          // 更新store里面的数据，变成登录人的信息
          try {
            const res = await getUserInfo()
            if (res.stat === ResultEnum.SUCCESS && res.data?.user !== undefined) {
              user = res.data.user
            }
            userStore.setUserInfo(user)
          } catch (err) { }
        }
      } catch (err) { }
    } else {
      return false
    }
  })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 没有账号，去注册
const register = () => {
  router.push({
    path: '/register'
  })
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

.el-form-item:nth-child(1) {
  :deep(.el-form-item__content) {
    font-size: 18px;
  }
}

.el-form-item:nth-child(4) {
  width: 100px;
  user-select: none;
  cursor: pointer;

  :deep(.el-form-item__content) {
    color: rgb(65, 127, 249);
    font-size: 1px;
    margin-right: 0 !important;
    justify-content: start;
  }
}

.el-form-item {
  height: 40px !important;

  .el-form-item__content {
    .el-input {
      height: 40px;
    }
  }
}
</style>
