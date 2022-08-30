<template>
  <div class="problem-btn-container">
    <el-button @click="handleClick" class="" size="small">
      <!-- 填空题 -->
      <div v-if="problemType === 'input'">
        <el-icon>
          <EditPen />
        </el-icon>
        {{ problemTitle }}
      </div>
      <!-- 单选题和下拉选择题 -->
      <div v-if="problemType === 'singleSelect' || problemType === 'pullSelect'">
        <el-icon>
          <Select />
        </el-icon>
        {{ problemTitle }}
      </div>
      <!-- 多选题 -->
      <div v-if="problemType === 'multiSelect'">
        <el-icon>
          <SemiSelect />
        </el-icon>
        {{ problemTitle }}
      </div>
      <!-- 时间题 -->
      <div v-if="problemType === 'time'">
        <el-icon>
          <Timer />
        </el-icon>
        {{ problemTitle }}
      </div>
      <!-- 日期题 -->
      <div v-if="problemType === 'date'">
        <el-icon>
          <Calendar />
        </el-icon>
        {{ problemTitle }}
      </div>
      <!-- 打分题 -->
      <div v-if="problemType === 'score'">
        <el-icon>
          <Star />
        </el-icon>
        {{ problemTitle }}
      </div>
    </el-button>
  </div>
</template>
<script lang='ts' setup>
import { toRefs } from 'vue'
import type { TProblemType } from '@/interfaces/problem'

const props = defineProps<{
  problemType: TProblemType,
  problemTitle: string
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

const { problemType, problemTitle } = toRefs(props)
const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>
<style scoped>
</style>
