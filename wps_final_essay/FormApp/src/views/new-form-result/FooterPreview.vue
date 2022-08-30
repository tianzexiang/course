<template>
  <div class="footer-preview-container">
    <div class="footer-selection-container">
      <span class="input-form" @click="goToInputForm">填写表单</span>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { PageNameEnum } from '@/enums/pageEnum'
import { useFormStore } from '@/store/modules/form'
import { EFormStatus } from '@/interfaces/form'
import { ElMessage } from 'element-plus'
const router = useRouter()
const formStore = useFormStore()
const goToInputForm = () => {
  if (formStore.form.status === EFormStatus.end) {
    ElMessage.warning('该表单已停止收集')
  } else router.push({ name: PageNameEnum.INPUT_FORM, params: { formId: formStore.form.id } })
}
</script>

<style scoped lang="less">
@footer-height: 100px;
// fixed定位固定在屏幕底端
.footer-preview-container {
  position: fixed;
  bottom: 0;
  min-height: @footer-height;
  z-index: 99999;
  background-color: #fff;
  .footer-selection-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: @footer-height;
    .input-form {
      color: @primary-color;
      font-size: 16px;
      font-weight: normal;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
}
</style>
