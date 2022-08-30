<template>
  <div class="problem-item-container">
    <SingleSelectProblem v-if="problem.type === 'singleSelect'" v-model="value" :setting="problem.setting!" />
    <MultiSelectProblem v-else-if="problem.type === 'multiSelect'" v-model="value" :setting="problem.setting!" />
    <PullSelectProblem v-else-if="problem.type === 'pullSelect'" v-model="value" :setting="problem.setting!" />
    <DateProblem v-else-if="problem.type === 'date'" v-model="value" />
    <InputProblem v-else-if="problem.type === 'input'" v-model="value" />
    <ScoreProblem v-else-if="problem.type === 'score'" v-model="value" />
    <TimeProblem v-else-if="problem.type === 'time'" v-model="value" />
  </div>
</template>
<script lang='ts' setup>
import { computed, toRefs } from 'vue'
import type { IProblem, TProblemType } from '@/interfaces/problem'
import { TPropItemValue } from '@/store/modules/form'

const props = defineProps<{
  problem: IProblem<TProblemType>
  modelValue: TPropItemValue
}>()

const { problem } = toRefs(props)

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:modelValue', newModelValue: TPropItemValue): void
}>()

// 设置vmodel
const value = computed({
  set (newModelValue: TPropItemValue) {
    emit('update:modelValue', newModelValue)
  },
  get () {
    return props.modelValue
  }
})
</script>
<style scoped lang="less">
.problem-item-container {
  width: 100%;
}
</style>
