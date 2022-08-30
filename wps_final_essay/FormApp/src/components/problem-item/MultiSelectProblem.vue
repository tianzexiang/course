<template>
  <div class="multi-select-container">
    <!-- 问题选项 -->
    <span></span>
    <el-checkbox-group class="checkbox-container" v-model="value">
      <el-checkbox v-for="item in options" :key="item.id" :label="item.id">
        {{ item.title }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script lang='ts' setup>
import { computed, watchEffect, ref } from 'vue'
import { ESelectOptionStatus, TSetting, ISelectOption } from '@/interfaces/problem'
import { TPropItemValue } from '@/store/modules/form'

const props = defineProps<{
  setting: TSetting<'multiSelect'>,
  modelValue: TPropItemValue
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:modelValue', newModelValue: string[]): void
}>()

// 设置vmodel
const value = computed({
  set (newModelValue: string[]) {
    emit('update:modelValue', newModelValue)
  },
  get () {
    return props.modelValue as string[]
  }
})

const options = ref<ISelectOption[]>()
watchEffect(() => {
  options.value = props.setting.options.filter(val => val.status === ESelectOptionStatus.normal)
})
</script>
<style scoped lang="less">
.multi-select-container {
  .checkbox-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px 0;
  }
}
</style>
