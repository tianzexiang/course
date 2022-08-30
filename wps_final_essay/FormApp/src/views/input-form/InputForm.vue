<template>
  <div class="input-form-container">
    <!-- 左边容器 -->
    <div class="input-left-container">
      <!-- 填写进度 -->
      <WriteCatalog :problems="problemsCatalog" />
    </div>
    <!-- 表单 -->
    <FormLayout class="input-form" :editable="true" :actionable="true" :formProp="formProp" :title="title"
      :subTitle="subTitle" />
    <!-- 右边容器 -->
    <div class="input-right-container">
    </div>
    <!-- 移动端填写进度 -->
    <div class="mobile-write-catalog">
      <MobileWriteCatalog :problems="problemsCatalog" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, onBeforeMount, ref, watchEffect } from 'vue'
import { IFormProp, useFormStore } from '@/store/modules/form'
import { useRoute, useRouter } from 'vue-router'
import { EFormStatus } from '@/interfaces/form'
import { PageNameEnum } from '@/enums/pageEnum'

const route = useRoute()
const router = useRouter()
const formStore = useFormStore()
const formProp = ref<IFormProp>({ problems: [] })
watchEffect(() => {
  formProp.value = formStore.formInputProp
})
const title = computed(() => formStore.form.title)
const subTitle = computed(() => formStore.form.subTitle)
const initInputFormProp = async () => {
  try {
    // 根据id拉取表单
    await formStore.getFormById(route.params.formId as string)
    // 若已停止收集跳转错误页面
    if (formStore.form.status === EFormStatus.end) {
      router.push({ name: PageNameEnum.ERROR_PAGE, query: { desc: '表单已停止收集' } })
    } else {
      // 初始化表单填写prop
      formStore.formInputProp = formStore.getFormProp(formStore.form.problems, true)
    }
  } catch (err) { }
}

const problemsCatalog = computed(() => formStore.formInputProp.problems.map(problem => {
  if (problem.type === 'multiSelect') {
    return {
      ...problem,
      done: (problem.value as string[]).length !== 0
    }
  } else {
    return {
      ...problem,
      done: !(problem.value === '' || problem.value === 0)
    }
  }
}))

onBeforeMount(() => {
  // 初始化填表项
  initInputFormProp()
})

</script>

<style scoped lang="less">
@header-bar-form-gap: 15px; // headerbar 和 inputform 间隙大小
@write-catalog-width: 240px; // 填写目录宽度

.input-form-container {
  padding-top: @header-bar-form-gap;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  min-width: 350px;

  .mobile-write-catalog {
    display: none;
  }

  .input-top-container {
    width: 0;
    display: none;
  }

  .input-left-container {
    width: @write-catalog-width;
  }

  .input-right-container {
    width: @write-catalog-width;
  }

  .input-form {
    min-height: 100%;
    width: 55%;
    padding: 48px 102px 0;
    background-color: #fff;
  }

  @media screen and (max-width: 1024px) {
    .mobile-write-catalog {
      display: block;
    }

    .input-left-container {
      width: 0;
      display: none;
    }

    .input-right-container {
      width: 0;
      display: none;
    }

    .input-form {
      width: 100%;
    }

    .input-top-container {
      width: 100%;
      display: block;
    }
  }
}
</style>
