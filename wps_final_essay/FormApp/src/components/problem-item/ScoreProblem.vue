<template>
  <div class="rate-problem-container">
    <el-rate v-model="value" size="large"/>
    <span class="rate-info">{{rateInfo}}</span>
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
  (e: 'update:modelValue', newModelValue: number): void
}>()

// 设置vmodel
const value = computed({
  set (newModelValue: number) {
    emit('update:modelValue', newModelValue)
  },
  get () {
    return props.modelValue as number
  }
})

// 具体得分
const rateInfo = computed(() => value.value ? `${value.value}.0分` : '')
</script>
<style scoped lang="less">
.rate-problem-container {
  // 水平平齐
  display: flex;
  align-items: center;
  gap: 5px;
  :deep(.el-rate__item) {
    line-height: normal;
  }
  .rate-info {
    font-size: 14px;
  }
}
</style>
