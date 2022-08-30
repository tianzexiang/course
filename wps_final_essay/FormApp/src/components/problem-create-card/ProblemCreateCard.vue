<template>
  <el-card class="problem-create-card-container" :shadow="isSelected ? 'always' : 'never'"
    @click.stop="handleCardClick">
    <!-- 题目菜单 -->
    <el-dropdown class="problem-panel-container" trigger="click" v-show="isSelected"
      @visible-change="handleDropDownVisibleChange">
      <div class="panel-link">
        <div class="title">{{ problemType?.title }}</div>
        <el-icon :size="14">
          <CaretBottom v-show="!isDropDownVisible" />
          <CaretTop v-show="isDropDownVisible" />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="panel-menu">
          <el-dropdown-item class="menu-item" v-for="item in problemTypeList" :key="item.type"
            @click="switchProblemType(item.type)">{{ item.title }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 题目内容 -->
    <div class="problem-content">
      <FormInputTitle v-model="problem.title">
        <template #prefix>
          <div class="problem-index-container">
            <div class="required" v-show="problem.required">*</div>
            <div class="problem-index">{{ problemIndex }}</div>
          </div>
        </template>
      </FormInputTitle>
      <ProblemSetting :problem="problem" :problem-index="props.problemIndex" />
    </div>
    <!-- 题目操作 -->
    <div class="problem-actions" v-show="isSelected">
      <!-- 复制题目 -->
      <div class="copy" @click.stop="copyProblem">
        复制
      </div>
      <el-divider direction="vertical" />
      <!-- 设置必填 -->
      <div class="set-required">
        <div class="tips">必填</div>
        <el-checkbox v-model="problem.required" size="small" />
        <el-popover v-model:visible="isRequiredPopperShow" popper-class="set-all-no-required-popper" :hide-after="0"
          placement="bottom" :width="200" trigger="click">
          <div class="set-all-no-required" @click="setAllNoRequired">
            设置所有题目为非必填项
          </div>
          <template #reference>
            <el-icon class="set-required-all-icon" :size="12"
              @click.stop="isRequiredPopperShow = !isRequiredPopperShow">
              <CaretBottom v-show="!isRequiredPopperShow" />
              <CaretTop v-show="isRequiredPopperShow" />
            </el-icon>
          </template>
        </el-popover>
      </div>
      <el-divider direction="vertical" />
      <!-- 设为常用题 -->
      <div class="set-star" @click="setProblemStar">
        设为常用题
      </div>
      <!-- 删除题目 -->
      <div class="delete">
        <el-tooltip content="删除" placement="bottom" effect="light">
          <el-icon :size="14" @click.stop="deleteProblem">
            <Delete />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
  </el-card>
</template>
<script lang='ts' setup>
import { computed, ref, toRefs, watch } from 'vue'
import { IProblemType, TProblemType } from '@/interfaces/problem'
import { useFormStore, IUpdateProblem } from '@/store/modules/form'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  problem: IUpdateProblem,
  problemIndex: number,
  problemTypeList: IProblemType[],
  isSelected?: boolean
}>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'setProblemStar', problem: IUpdateProblem): void
}>()

const formStore = useFormStore()
const { problem, problemTypeList } = toRefs(props)
// 问题序号
const problemIndex = computed(() => props.problemIndex + 1 + '.')
// 问题类型
const problemType = computed(() => problemTypeList.value.find(val => val.type === problem.value.type))
// 非必填弹窗是否可以见
const isRequiredPopperShow = ref(false)
// 下拉菜单状态
const isDropDownVisible = ref(false)
// 是否被选中
const isSelected = computed(() => formStore.problemCardStatusList[props.problemIndex] ? formStore.problemCardStatusList[props.problemIndex].isSelected : props.isSelected)
// 控制card border
const isBorderShow = computed(() => isSelected.value ? '1px solid var(--el-card-border-color)' : 'none')

// 切换下拉菜单状态
const handleDropDownVisibleChange = (val: boolean) => {
  isDropDownVisible.value = val
}

// 切换问题类型
const switchProblemType = (type: TProblemType) => {
  formStore.updateFormProblem(type, props.problemIndex, props.problemIndex + 1)
  formStore.newAddProblemIndex = props.problemIndex
}
// 设置所有题目为非必填项
const setAllNoRequired = () => {
  formStore.newFormSettings.problems.forEach(val => (val.required = false))
  isRequiredPopperShow.value = false
  ElMessage.success('设置成功')
}

// 删除题目
const deleteProblem = () => {
  formStore.deleteFormProblem(props.problemIndex)
}

// 复制题目并加入题目数组
const copyProblem = () => {
  // 返回现在正被选中的卡片index
  const index = formStore.problemCardStatusList.findIndex(val => val.isSelected === true)
  formStore.copyFormProblem(problem.value, index + 1)
}

// 处理卡片点击事件
const handleCardClick = () => {
  formStore.problemCardStatusList.forEach(val => (val.isSelected = false))
  formStore.problemCardStatusList[props.problemIndex].isSelected = true
  isRequiredPopperShow.value = false
}

// 添加常用题
const setProblemStar = async () => {
  emit('setProblemStar', problem.value)
}

// 非必填弹窗不可见
watch(isSelected, () => {
  if (!isSelected.value) isRequiredPopperShow.value = false
})

</script>
<style scoped lang="less">
.problem-create-card-container {
  width: 100%;
  height: fit-content;
  border: v-bind(isBorderShow);

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .panel-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    user-select: none;
    gap: 5px;

    .title {
      height: 100%;
    }
  }

  .panel-menu {
    user-select: none;

    .menu-item {}
  }

  .problem-content {
    .problem-index-container {
      display: flex;
      gap: 2px;
      padding-top: 6px;

      .required {
        color: red;
      }

      .problem-index {
        font-size: 16px;
      }
    }
  }

  .problem-actions {
    user-select: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: @common-border-dashed;
    padding-top: 10px;

    .copy {
      display: inline-block;
      border: @common-border-style;
      border-radius: 2px;
      font-size: 12px;
      padding: 2px 5px;
      user-select: none;
      cursor: pointer;
    }

    .set-required {
      display: flex;
      align-items: center;
      height: 24px;
      gap: 8px;

      .tips {
        color: @tips-text-color;
        font-size: 12px;
        line-height: 24px;
        user-select: none;
      }

      .set-required-all-icon {
        cursor: pointer;
      }
    }

    .set-star {
      display: inline-block;
      border: @common-border-style;
      border-radius: 2px;
      font-size: 12px;
      padding: 2px 5px;
      user-select: none;
      cursor: pointer;
    }

    .delete {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-left: 6px;
    }
  }
}

.set-all-no-required-popper {
  user-select: none;

  .set-all-no-required {
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    user-select: none;

    &:hover {
      background-color: @bg-color;
    }
  }
}
</style>
