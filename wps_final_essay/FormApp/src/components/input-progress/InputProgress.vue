<template>
  <div class="input-progress-container">
    <div class="progress-outer">
      <div class="progress-inner"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  percentage?: number,
  color?: string,
  duration?: number
}>(), {
  percentage: 20,
  color: '#409eff',
  duration: 0.25
})
const percentage = computed(() => {
  if (props.percentage < 0) return '0'
  else if (props.percentage > 100) return '100%'
  else return `${props.percentage}%`
})

const color = computed(() => props.color)
const duration = computed(() => props.duration + 's')

</script>

<style scoped lang="less">
.input-progress-container {
  height: 100%;
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
  .progress-outer {
    height: 100%;
    height: 100%;
    background-color: #F2F2F2;

    .progress-inner {
      transition: all v-bind(duration) ease-in-out;
      height: v-bind(percentage);
      width: 100%;
      background-color: v-bind(color);
    }
  }
}
</style>
