<template>
  <div class="new-form-result-container">
    <el-tabs class="tab-container" v-model="activeName">
      <!-- 表单数据分析 -->
      <el-tab-pane label="数据分析&统计" name="form-data">
        <FormData />
      </el-tab-pane>
      <!-- 表单问题 -->
      <el-tab-pane label="表单问题" name="form-problem">
        <FormProblem />
      </el-tab-pane>
      <!-- 表单分享 -->
      <el-tab-pane label="分享" name="form-share">
        <FormShare />
      </el-tab-pane>
    </el-tabs>
    <div class="new-form-result-footer clearfix" v-show="activeName === 'form-problem'">
      <FooterPreview class="footer-preview" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onBeforeMount } from 'vue'
import { useFormStore } from '@/store/modules/form'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeName = ref(route.query.activeName || 'form-data')
const formStore = useFormStore()
const initFormDetail = async () => {
  try {
    // 根据formId请求form
    await formStore.getFormById(route.query.formId as string)
    // 根据formId请求formResult
    await formStore.getFormResultList(route.query.formId as string)
    // 初始化填写表单prop
    formStore.formInputProp = formStore.getFormProp(formStore.form.problems, true)
  } catch (err) {}
}

onBeforeMount(async () => {
  initFormDetail()
})
</script>

<style scoped lang="less">
@tab-nav-height: 50px; // tab-item的高度撑起tab-header 并填充fill
@tab-nav-width: 65%; // tab-nav宽度与content保持一致，使得居中相同
@tab-nav-content-gap: 15px; // tab-nav 和 tab-content 间隙大小

.new-form-result-container {
  width: 100%;
  height: 100%;
  min-width: @common-min-width;
}

.new-form-result-footer {
  width: 100%;
  display: flex;
  justify-content: center;

  .footer-preview {
    width: @tab-nav-width;
  }
}

.tab-container {
  width: 100%;
  height: 100%;
  user-select: none;
  padding-top: @tab-nav-height;

  // tab-header 使用fixed定位
  :deep(.el-tabs__header) {
    width: 100%;
    min-width: @common-min-width;
    background-color: #fff;
    position: fixed;
    top: @header-bar-height;
    z-index: 999;
  }

  // 扩大tab-item高度并使文字居中
  :deep(.el-tabs__item) {
    height: @tab-nav-height;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  // 居中el-tabs__nav
  :deep(.el-tabs__nav-scroll) {
    display: flex;
    justify-content: center;

    // 设置宽度，使得nav居中与content对齐
    .el-tabs__nav {
      width: @tab-nav-width;
    }
  }

  // 居中tab-content & 解决tab-header fixed定位后脱离文档流
  :deep(.el-tabs__content) {
    width: @tab-nav-width;
    background-color: #fff;
    min-height: calc(100% - @tab-nav-content-gap);
    margin: @tab-nav-content-gap auto 0 auto;
    padding: 40px 100px;
  }

}
</style>
