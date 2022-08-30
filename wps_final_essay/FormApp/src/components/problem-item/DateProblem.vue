<template>
  <div class="date-problem-container">
    <el-date-picker v-model="value"  type="date" placeholder="请选择日期"/>
  </div>
</template>
<script lang='ts' setup>
import { TPropItemValue } from '@/store/modules/form'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: TPropItemValue,
}>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:modelValue', newModelValue: string): void
}>()

// 设置vmodel
const value = computed({
  set (newModelValue: string) {
    newModelValue = newModelValue || '' // 解决newModelValue可能为null
    emit('update:modelValue', newModelValue)
  },
  get () {
    return props.modelValue as string
  }
})
</script>
<style scoped lang="less">
.date-problem-container {
  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-bottom: 1px solid rgba(25, 55, 88, .1);
    border-radius: 0;
    padding-left: 0;
    &:focus-within,
    &:hover {
      border-bottom: 1px solid @primary-color;
    }
  }
}
</style>
