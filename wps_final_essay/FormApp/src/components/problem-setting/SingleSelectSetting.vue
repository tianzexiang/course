<template>
  <div class="singleSelect-problem-setting">
    <div v-for="(item, index) in options" :key="item.id" class="one-problem-setting">
      <div class="radio"></div>
      <FormInputTitle class="input-content" v-model="item.title" :disabled="false" :placeholder="placeholder[index]" />
      <div class="close-icon">
        <el-icon v-show="formStore.problemCardStatusList[problemIndex].isSelected" @click="deleteOption(item.id)">
          <Close />
        </el-icon>
      </div>
    </div>
    <el-button v-show="formStore.problemCardStatusList[problemIndex].isSelected" type="primary" text @click="addOption">
      + 选项</el-button>
  </div>
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
.singleSelect-problem-setting {
  margin: 20px 10px 0;

  .one-problem-setting {
    display: flex;
    margin: 1rem 0;

    .input-content {
      width: 300px;
      margin-left: 1rem;
    }

    .close-icon {
      margin: 8px 0 0 40px;
      cursor: pointer;
    }
  }

  .radio {
    width: 15px;
    height: 15px;
    border: 1px solid #C0C4CC;
    border-radius: 50%;
    margin-top: 8px;
    user-select: none;
  }
}
</style>
