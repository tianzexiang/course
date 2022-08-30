<template>
  <div class="pull-select-item" v-for="(item, index) in options" :key="item.id">
    <FormInputTitle class="input-content" v-model="item.title" :disabled="false" :placeholder="placeholder[index]">
      <template v-slot:prefix>
        <span class="option-index">
          {{ index + 1 }}.
        </span>
      </template>
    </FormInputTitle>
    <el-icon v-show="formStore.problemCardStatusList[problemIndex].isSelected" class="close-icon"
      @click="deleteOption(item.id)">
      <Close />
    </el-icon>
  </div>
  <el-button v-show="formStore.problemCardStatusList[problemIndex].isSelected" class="add" type="primary" text
    @click="addOption">+ 选项</el-button>
</template>
<script lang='ts' setup>
import { useFormStore } from '@/store/modules/form'
import { toRefs, computed } from 'vue'
import { IProblem, TProblemType, ESelectOptionStatus } from '@/interfaces/problem'
import { nanoid } from 'nanoid'
import { ElMessage } from 'element-plus'
const props = defineProps<{
  problem:(IProblem<TProblemType> & { isNew: boolean }),
  problemIndex: number,
}>()

const { problem, problemIndex } = toRefs(props)

const formStore = useFormStore()

const options = computed(() => problem.value.setting?.options.filter(val => val.status === ESelectOptionStatus.normal))
const placeholder = computed(() => {
  if (options.value) {
    return options.value?.map((_, index) => `选项${index + 1}`)
  } else {
    return []
  }
})

const addOption = () => {
  if (problem.value.setting !== null) {
    problem.value.setting.options.push({
      id: nanoid(),
      title: '',
      status: ESelectOptionStatus.normal
    })
  }
}
const deleteOption = (id: string) => {
  if (problem.value.setting !== null) {
    if (options.value?.length !== 1) {
      problem.value.setting.options.forEach(val => {
        if (val.id === id) {
          val.status = ESelectOptionStatus.delete
        }
      })
    } else return ElMessage.info('至少要有一个选项')
  }
}
</script>
<style scoped lang="less">
.pull-select-item {
  display: flex;
  justify-content: space-around;
  padding: 1rem 0 0 0;

  .option-index {
    padding-top: 8px;
  }

  .close-icon {
    cursor: pointer;
    margin: 4px 0 0 20px;
  }
}

.add {
  margin-top: 5px;
}
</style>
