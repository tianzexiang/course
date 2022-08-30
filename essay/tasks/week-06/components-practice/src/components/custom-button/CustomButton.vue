<script lang='ts' setup>
import { computed } from 'vue'
type btnType = 'default' | 'primary'
const props = withDefaults(defineProps<{
  type: btnType
}>(), {
  type: 'default'
})
// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()
const _type = computed(() => props.type)
const handleClick = (evt: MouseEvent) => {
  emits('click', evt)
}

</script>
<template>
  <button :class="['cus-btn', _type]" @click="handleClick">
    <span>
      <slot />
    </span>
  </button>
</template>
<style scoped lang="less">
.cus-btn {
  margin: 0;
  padding: 6px 12px;
  border: 1px solid transparent;
  outline: none;
  transition: 0.1s;
  border-radius: 2px;
  cursor: pointer;
}

.default {
  background-color: #fff;
  color: black;
  border: #DFDFDF 1px solid;

  &:hover {
    color: #48A9F9;
    border: #48A9F9 1px solid;
  }
}

.primary {
  color: white;
  background-color: #1890FF;
  border: #1890FF 1px solid;

  &:hover {
    background-color: #40A9FF;
    border: #40A9FF 1px solid;
  }
}
</style>
