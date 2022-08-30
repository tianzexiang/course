<template>
  <div class="pull-select-container">
    <!-- 问题选项 -->
    <el-select v-model="value" filterable placeholder="请选择" no-match-text="无匹配项" clearable>
      <!-- 搜索图标前缀1 -->
      <template #prefix>
        <el-icon>
          <Search />
        </el-icon>
      </template>
      <el-option v-for="item in options" :key="item.id" :label="item.title ? item.title : ' '" :value="item.id" />
    </el-select>
  </div>
</template>
<script lang='ts' setup>
import { computed, ref, watchEffect } from 'vue'
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
.pull-select-container {
  .input-title {
    padding-bottom: 5px;
  }
}
</style>
