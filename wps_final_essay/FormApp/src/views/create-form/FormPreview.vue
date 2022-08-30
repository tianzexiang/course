<template>
  <div class="form-preview">
    <el-drawer v-model="visible" direction="rtl" size="40%">
      <template #title>
        <h2>表单预览</h2>
      </template>
      <template #default>
        <FormLayout class="form-preview-content" :editable="true" :actionable="false" :formProp="formProp" :title="title" :subTitle="subTitle" />
      </template>
    </el-drawer>
  </div>
</template>
<script lang='ts' setup>
import { computed, ref, watchEffect } from 'vue'
import { IFormProp, useFormStore } from '@/store/modules/form'

const formStore = useFormStore()
const formProp = ref<IFormProp>({ problems: [] })
watchEffect(() => {
  formProp.value = formStore.getFormProp(formStore.newFormSettings.problems, true)
})
const title = computed(() => formStore.newFormSettings.title)
const subTitle = computed(() => formStore.newFormSettings.subTitle)

const props = withDefaults(defineProps<{
  visible: boolean,
}>(), {
  visible: false
})
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
}>()

// 设置vmodel
const visible = computed({
  set (val: boolean) {
    emit('update:visible', val)
  },
  get () {
    return props.visible
  }
})
</script>
<style scoped lang="less">
</style>
