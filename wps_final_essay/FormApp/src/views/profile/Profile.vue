<template>
  <div class="base">
    <!-- 用户头像和用户名和id -->
    <div class="user-logout">
      <div @click="userStore.logout">退出账号</div>
    </div>
    <div class="user-base-info">
      <!-- 用户头像 -->
      <div class="demo-image__preview">
        <el-image @error="uploadErrorAvatar" lazy :preview-src-list="[avatarSrc]" style="width: 100px; height: 100px"
          :src="avatarSrc" :initial-index="1" fit="cover" />
      </div>
      <div v-if="isChangeAvatar" class="change-avatar-container">
        <el-input v-model="inputAvatar" @change="getAvatarValue" placeholder="请输入头像地址" />
        <el-button @click="cancelChangeAvatar">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
      <div class="avatar-change" v-else><span @click="changeAvatar">修改</span></div>
      <div class="user-nickname">{{ userStore.user.nickname }}</div>
      <div class="user-id">
        <span>ID {{ userStore.user.id }}</span>
        |<span>普通用户</span>
      </div>
    </div>
    <!-- 修改真实姓名 -->
    <div class="nickname-container">
      <div>使用真实姓名，让工作伙伴认识你</div>
      <div v-if="isChangeName">
        <span>{{ userStore.user.nickname }}</span><span @click="toChangeNickName">修改</span>
      </div>
      <div class="change-name-container" v-else>
        <el-input v-model="inputName" @change="getNameValue" placeholder="请输入您的昵称" />
        <div>
          <el-button @click="cancelChangeNickName">取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </div>
    </div>
    <!-- 安全设置 -->
    <div class="save-container">
      <div>安全设置</div>
      <div><span>设置密码</span><span @click="changePass">设置</span></div>
    </div>
    <!-- 修改密码弹框 -->
    <div v-if="isChangePwd" class="cover">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item>
          修改密码
          <el-icon @click="handleCloseClick" class="arrow-right" :size="20">
            <Close />
          </el-icon>
        </el-form-item>
        <el-form-item prop="oldPass">
          <el-input placeholder="旧密码" type="password" v-model="ruleForm.oldPass" />
        </el-form-item>
        <el-form-item prop="pass">
          <el-input placeholder="密码" show-password v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input placeholder="确认密码" show-password v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCloseClick">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as authApi from '@/api/auth'
import { setUserInfo, changePwd, getUserInfo } from '@/api/user'
import { EStatus } from '@/interfaces/problem'
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { IUser } from '@/interfaces/user'
import { FormInstance, ElMessage } from 'element-plus'
import { ResultEnum } from '@/enums/httpEnum'

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
const isChangeAvatar = ref(false)
const isChangeName = ref(true)
const isChangePwd = ref(false)
const inputName = ref('')
const inputAvatar = ref('')
inputName.value = userStore.user.nickname
inputAvatar.value = userStore.user.avatar
const isValidAvatar = ref(true)
// 是否有头像决定src
const avatarSrc = computed(() => userStore.user.avatar
  ? userStore.user.avatar
  : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F5%2Fdef6ed04-6d34-402e-99c8-366266f627dd.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656136447&t=6bdbb16c4b9296dea969f85f8ce0959f')
// 错误头像上传
const uploadErrorAvatar = () => {
  isValidAvatar.value = false
  // 刷新或第一次加载时也调用获取头像
  getAvatarValue('0')
}

// 点击修改头像
const changeAvatar = () => {
  isChangeAvatar.value = true
}
// 点击修改昵称
const toChangeNickName = () => {
  isChangeName.value = false
}
// 取消修改昵称
const cancelChangeNickName = () => {
  isChangeName.value = true
}
// 取消修改头像
const cancelChangeAvatar = () => {
  isChangeAvatar.value = false
}
// 确认修改昵称
const getNameValue = async (e: string) => {
  if (e.trim() === '') {
    ElMessage({
      type: 'warning',
      message: '昵称不能为空'
    })
  } else {
    try {
      const res = await setUserInfo({
        nickname: e.trim(),
        avatar: userStore.user.avatar // 这里只修改昵称
      })
      if (res.stat === ResultEnum.SUCCESS) {
        isChangeName.value = true
        // 把数据存到全局状态变量里面
        try {
          const res = await getUserInfo()
          if (res.stat === ResultEnum.SUCCESS && res.data?.user !== undefined) {
            user = res.data.user
          }
          userStore.setUserInfo(user)
        } catch (err) {}
      }
    } catch (err) { }
  }
}
// 修改头像
const getAvatarValue = async (e: string) => {
  if (e.trim() === '') {
    ElMessage({
      type: 'warning',
      message: '头像不能为空'
    })
  } else {
    try {
      let res
      if (isValidAvatar.value === true) {
        res = await setUserInfo({
          nickname: userStore.user.nickname,
          avatar: e.trim() // 这里只修改头像
        })
      } else {
        res = await setUserInfo({
          nickname: userStore.user.nickname,
          avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F5%2Fdef6ed04-6d34-402e-99c8-366266f627dd.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656136447&t=6bdbb16c4b9296dea969f85f8ce0959f'
          // 这里只修改头像
        })
        // 改回有效头像值
        isValidAvatar.value = true
      }

      if (res.stat === ResultEnum.SUCCESS) {
        isChangeAvatar.value = false

        // 把数据存到全局状态变量里面
        try {
          const res = await getUserInfo()
          if (res.stat === ResultEnum.SUCCESS && res.data?.user !== undefined) {
            user = res.data.user
          }
          userStore.setUserInfo(user)
        } catch (err) {}
      }
    } catch (err) { }
  }
}

// 点击设置密码
const changePass = () => {
  isChangePwd.value = true
  // 禁止滚动
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

// 点击箭头不修改密码
const handleCloseClick = () => {
  isChangePwd.value = false
  // 允许滚动
  document.documentElement.style.overflow = 'scroll'
  document.body.style.overflow = 'scroll'
}
const ruleFormRef = ref<FormInstance>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkOldPass = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入旧密码！'))
  } else {
    callback(undefined)
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback(undefined)
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass2 = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码！'))
  } else if (value !== ruleForm.pass) {
    callback(new Error('两次输入的密码不一样!'))
  } else {
    callback(undefined)
  }
}
const ruleForm = reactive({
  pass: '',
  checkPass: '',
  oldPass: ''
})

const rules = reactive({
  oldPass: [{ validator: checkOldPass, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }]
})
// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: unknown) => {
    const oldPwd = ruleForm.oldPass
    const pwd = ruleForm.pass
    const confirmPwd = ruleForm.checkPass
    if (valid) {
      try {
        const res = await changePwd({
          oldPwd,
          pwd,
          confirmPwd
        })
        if (res.stat === ResultEnum.SUCCESS) {
          ElMessage({
            type: 'success',
            message: '修改密码成功'
          })
          // 修改密码后再次登录
          const res = await authApi.login({
            account: userStore.user.account,
            pwd
          })
          if (res.stat === ResultEnum.SUCCESS) {
            document.cookie = 'login=yes'
            isChangePwd.value = false
            // 允许滚动
            document.documentElement.style.overflow = 'scroll'
            document.body.style.overflow = 'scroll'
          }
        }

        // 登录成功,自定义标志存到cookie中
      } catch (err) { }
    } else {
      return false
    }
  })
}
</script>

<style lang="less" scoped>
.base {
  margin: 40px 175px;
  padding-bottom: 40px;
}

.user-logout {
  position: relative;
  cursor: pointer;
  background-color: #fff;

  div {
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px 0;
    color: rgb(170, 170, 170);
  }
}

.avatar-change {
  text-align: center;

  span {
    display: inline-block;
    width: 40px;
    color: rgb(46, 128, 250);
    cursor: pointer;
  }
}

.user-base-info {
  background: #fff;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .demo-image__preview {
    display: block;
    margin: 0 auto;
    width: 100px;
    height: 100px;

    img {
      width: 100px;
    }
  }

  .user-nickname {
    text-align: center;
    font-weight: 700;
    font-size: large;
    margin-top: 30px;
  }

  .user-id {
    span {
      display: inline-block;
      margin: 30px 10px;
    }

    color: rgb(124, 126, 125);
    text-align: center;
  }
}

.nickname-container,
.save-container {
  background: #fff;
  height: 135px;
  margin-top: 20px;
  padding-top: 15px;
  padding: 20px 25px;

  div:nth-child(1) {
    color: rgb(150, 150, 150);
    margin-bottom: 30px;
  }

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    font-size: 16px;

    span:nth-child(2) {
      color: rgb(46, 128, 250);
      cursor: pointer;

      span {
        display: inline-block;
      }
    }
  }
}

.change-name-container {
  .el-input {
    width: 280px;
  }
}

.change-avatar-container {
  padding-top: 30px;
  margin: 0 auto;
  padding-top: 10px;
  display: flex;
  align-items: center;

  .el-button {
    margin-left: 10px;
  }
}

// 修改密码
.cover {
  z-index: 999;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
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

.el-form-item:nth-child(1) {
  position: relative;

  :deep(.el-form-item__content) {
    font-size: 18px;
  }
}

.arrow-right {
  cursor: pointer;
  position: absolute;
  right: 0px;
}

// 预览头像
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

// 错误头像
.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image__error .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.demo-image__error .el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
</style>
