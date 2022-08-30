<template>
  <div class="single-select-container">
    <!-- 问题选项 -->
    <el-radio-group class="radio-container" v-model="value">
      <el-radio v-for="item in options" :key="item.id" :label="item.id">{{item.title}}</el-radio>
    </el-radio-group>
  </div>
</template>
<script lang='ts' setup>
import { watchEffect, ref, computed } from 'vue'
import { ESelectOptionStatus, TSetting, ISelectOption } from '@/interfaces/problem'
import { TPropItemValue } from '@/store/modules/form'

const props = defineProps<{
  setting: TSetting<'multiSelect'>,
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

const options = ref<ISelectOption[]>()
watchEffect(() => {
  options.value = props.setting.options.filter(val => val.status === ESelectOptionStatus.normal)
})

</script>
<style scoped lang="less">
.single-select-container {
  .radio-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px 0;
  }
}
</style>
