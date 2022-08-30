<template>
  <div class="problem-setting-container">
    <SingleSelectSetting v-if="problem.type === 'singleSelect'" :problem="problem" :problemIndex="problemIndex" />
    <MultiSelectSetting v-else-if="problem.type === 'multiSelect'" :problem="problem" :problemIndex="problemIndex" />
    <PullSelectSetting v-else-if="problem.type === 'pullSelect'" :problem="problem" :problemIndex="problemIndex" />
    <DateSetting v-else-if="problem.type === 'date'" />
    <InputSetting v-else-if="problem.type === 'input'" />
    <ScoreSetting v-else-if="problem.type === 'score'" />
    <TimeSetting v-else-if="problem.type === 'time'" />
  </div>
</template>
<script lang='ts' setup>
import { toRefs } from 'vue'
import type { IProblem, TProblemType } from '@/interfaces/problem'
// 传入问题类型
const props = defineProps<{
  problem:(IProblem<TProblemType> & { isNew: boolean })
  problemIndex: number
}>()
const { problem, problemIndex } = toRefs(props)
</script>
<style scoped lang="less">
.setting-item-container {
  width: 100%;
}
</style>
