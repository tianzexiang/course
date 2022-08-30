<template>
  <div class="input-problem-container">
    <FormInputTitle class="input-content" v-model="value" :disabled="false" placeholder="请输入" />
  </div>
</template>
<script lang='ts' setup>
import { TPropItemValue } from '@/store/modules/form'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: TPropItemValue
}>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:modelValue', newModelValue: string): void
}>()

// 设置vmodel
const value = computed({
  set (newModelValue: string) {
    emit('update:modelValue', newModelValue)
  },
  get () {
    return props.modelValue as string
  }
})

</script>
<style scoped lang="less">
.input-title {
  padding-bottom: 5px;
}

.input-content {
  :deep(.el-textarea__inner) {
    font-size: 14px;
    font-weight: normal;
  }
}
</style>
