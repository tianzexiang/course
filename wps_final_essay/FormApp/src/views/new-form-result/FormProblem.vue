<template>
  <div class="form-problem-container">
    <FormLayout :editable="true" :actionable="false" :formProp="formProp" :title="title" :subTitle="subTitle" />
  </div>
</template>

<script lang='ts' setup>
import { computed, ref, watchEffect } from 'vue'
import { IFormProp, useFormStore } from '@/store/modules/form'
const formStore = useFormStore()
const formProp = ref<IFormProp>({ problems: [] })
watchEffect(() => {
  formProp.value = formStore.getFormProp(formStore.form.problems, true)
})
const title = computed(() => formStore.form.title)
const subTitle = computed(() => formStore.form.subTitle)
</script>

<style scoped lang="less">
@footer-height: 100px;

.form-problem-container {
  width: 100%;
  height: 100%;
  padding-bottom: @footer-height;
}
</style>
