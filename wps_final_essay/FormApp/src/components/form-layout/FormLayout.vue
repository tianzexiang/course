<template>
  <div class="form-layout-container">
    <!-- 主标题 -->
    <div class="form-title">{{ title }}</div>
    <!-- 副标题 -->
    <div class="form-sub-title">{{ subTitle }}</div>
    <!-- 表单问题 -->
    <el-form :model="formProp" label-position="top" ref="formRef" :disabled="!editable" hide-required-asterisk>
      <el-form-item v-for="(item, index) in formProp.problems" :key="formProp.problems[index].id"
        :prop="`problems.${index}.value`" :rules="formProp.problems[index].rules">
        <!-- 问题title -->
        <template #label>
          <FormInputTitle class="input-title" v-model="item.title" :disabled="true">
            <template #prefix>
              <div class="problem-index-container">
                <!-- 必填 -->
                <div class="required" v-show="item.required">*</div>
                <!-- 序号 -->
                <div class="problem-index">{{ `${index + 1}.` }}</div>
                <!-- 多选 -->
                <span class="multi-tips" v-if="item.type === 'multiSelect'">
                  [多选]
                </span>
              </div>
            </template>
          </FormInputTitle>
        </template>
        <!-- 问题 -->
        <ProblemItem :problem="item" v-model="formProp.problems[index].value" />
      </el-form-item>
      <!-- 提交和重置按钮 -->
      <el-form-item class="form-btn" v-if="actionable">
        <div class="form-btn-container">
          <el-button type="primary" @click="handleSubmit(formRef)">提交</el-button>
          <el-button @click="handleReset(formRef)">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts' setup>
import { ref, toRefs } from 'vue'
import { useFormStore, IFormProp } from '@/store/modules/form'
import { FormInstance, ElMessageBox, ElMessage } from 'element-plus'
import { ResultEnum } from '@/enums/httpEnum'
import { useRouter } from 'vue-router'
import { PageNameEnum } from '@/enums/pageEnum'

const props = withDefaults(defineProps<{
  editable: boolean,
  actionable: boolean,
  title: string,
  subTitle?: string,
  formProp: IFormProp
}>(), {
  editable: true,
  actionable: true,
  title: '表单标题',
  subTitle: ''
})
const { editable, actionable, formProp, title, subTitle } = toRefs(props)
const formStore = useFormStore()
const formRef = ref<FormInstance>()
const router = useRouter()

// 提交表单
const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm(
        '您确定要提交表单吗？',
        '提交表单',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        try {
          const res = await formStore.submitForm(formProp.value)
          if (res.stat === ResultEnum.SUCCESS) {
            router.replace({ name: PageNameEnum.ERROR_PAGE, query: { desc: '表单提交成功' } })
            ElMessage({
              type: 'success',
              message: '提交成功'
            })
          }
        } catch (err) { }
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '提交失败'
        })
      })
    } else {
      return false
    }
  })
}

// 重置表单
const handleReset = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.resetFields()
}
</script>

<style lang="less">
.form-layout-container {

  // 取消必填时红色样式
  .el-form-item.is-error .el-select-v2__wrapper,
  .el-form-item.is-error .el-select-v2__wrapper:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus {
    box-shadow: none !important;
  }

  .el-form-item.is-error .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--el-select-border-color-hover) inset !important;
  }

  // require 红色星
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label-wrap>.el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    color: black;
    display: inline-block;
  }

  // 取消disabled样式
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: inherit;
  }
}
</style>

<style scoped lang="less">
.form-layout-container {
  :deep(.el-textarea__inner) {
    padding-top: 8px;
  }

  :deep(.el-form-item) {
    padding: 24px 0;
    margin: 0;
  }

  :deep(.el-form-item__label) {
    display: flex;
  }

  .form-title {
    font-size: 24px;
    font-weight: 700;
    color: @primary-text-color;
    text-align: center;
  }

  .form-sub-title {
    font-size: 14px;
    text-align: center;
    padding: 22px 0 10px 0;
  }

  .form-btn-container {
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }

  .input-title {
    .problem-index-container {
      display: flex;
      gap: 4px;
      padding-top: 5px;

      .required {
        color: red;
      }

      .problem-index {
        font-size: 15px;
      }
    }

    .multi-tips {
      white-space: nowrap;
      height: auto;
      font-size: 14px;
      margin-left: 4px;
    }

  }
}
</style>
