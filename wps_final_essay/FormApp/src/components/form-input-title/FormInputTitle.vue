<template>
  <div :class="['form-input-title-container', disabled ? 'disabled' : '']">
    <span class="problem-index">{{ prefixNumberIndex }}</span>
    <slot name="prefix"></slot>
    <el-input v-model="value" :autosize="true" type="textarea" :placeholder="placeholder" :disabled="disabled"
      resize="none">
    </el-input>
    <slot name="suffix"></slot>
  </div>
</template>
<script lang='ts' setup>
import { toRefs, computed } from 'vue'

const props = withDefaults(defineProps<{
  disabled?: boolean
  modelValue: string
  prefixNumberIndex?: number | string
  placeholder?: string,
  required?: boolean
}>(), {
  disabled: false,
  modelValue: '',
  prefixNumberIndex: '',
  placeholder: '请输入问题',
  required: false
})
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
    return props.modelValue
  }
})

const { disabled, prefixNumberIndex, placeholder } = toRefs(props)

</script>
<style scoped lang="less">
.problem-index-font() {
  font-size: 14px;
  font-weight: initial;
}

.problem-index-font-disabled() {
  font-size: 14px;
  font-weight: 700;
}

.form-input-title-container {
  // 容器基本布局
  display: flex;
  gap: 8px;
  border-bottom: 1px solid rgba(25, 55, 88, .1);
  caret-color: transparent;
  width: 100%;
  height: 100%;
  // 子元素focus时改变父元素border
  &:focus-within,
  &:hover {
    border-bottom: 1px solid @primary-color;
    caret-color: auto;
  }

  // 问题序号样式
  .problem-index {
    padding: 5px 0;
    user-select: none;
    .problem-index-font();
  }

  // textarea基础样式
  :deep(.el-textarea__inner) {
    box-shadow: none;
    cursor: text;
    padding: 7px 0 0 0;
    background-color: transparent;
    .problem-index-font-disabled();
    line-height: 1.2;
  }
}

// 禁用后样式
.form-input-title-container.disabled {
  border-bottom: none;

  .problem-index {
    .problem-index-font-disabled();
  }

  :deep(.el-textarea.is-disabled .el-textarea__inner) {
    color: @primary-text-color;
    caret-color: transparent;
    height: 100% !important;
  }
}
</style>
