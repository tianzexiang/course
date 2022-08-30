<template>
  <div class="create-form-container" @click="handleCreateFormClick">
    <!-- 左边部分 -->
    <div class="left-side">
      <!-- 添加题目 -->
      <div class="add-problem-container">
        <div class="title">添加题目</div>
        <div class="problem-btn">
          <ProblemButton class="problem-item" v-for="item in problemTypeList" :key="item.type" :problemType="item.type"
            :problemTitle="item.title" @click.stop="addProblem(item.type)" />
        </div>
      </div>
      <!-- 题目模板 -->
      <div class="problem-basic-container">
        <div class="title">题目模板</div>
        <div class="problem-basic" v-if="problemBasicList.length">
          <el-button v-for="item in problemBasicList" :key="item.id" size="small"
            @click.stop="addProblemTemplate(item)">{{
                item.title
            }}</el-button>
        </div>
        <div class="tips" v-else>暂无题目模板</div>
      </div>
      <!-- 常用题 -->
      <div class="problem-star-container">
        <div class="title-container">
          <div class="title">我的常用题</div>
          <div class="title-btn" @click="dialogVisible = !dialogVisible">管理</div>
        </div>
        <div class="problem-star" v-if="problemStarList.length">
          <el-button v-for="item in problemStarList" :key="item.id" size="small" @click.stop="addProblemStar(item)">
            {{ item.problem.title }}
          </el-button>
        </div>
        <div class="tips" v-else>
          暂无我的常用题，可点击右侧卡片选项添加
        </div>
      </div>
    </div>
    <!-- 题目添加详情 -->
    <div class="problem-add-detail-container">
      <el-input class="title" v-model="formStore.newFormSettings.title" :placeholder="titlePlaceholder" type="text"
        @focus="handleTitleFocus" @blur="handleTitleBlur" @input="handleTitleInput" />
      <FormInputTitle class="sub-title" v-model="formStore.newFormSettings.subTitle" placeholder="请输入副标题" />
      <div class="problem-card-container">
        <ProblemCreateCard v-for="(item, index) in formStore.newFormSettings.problems" :key="item.id" :problem="item"
          :problemIndex="index" :problemTypeList="problemTypeList" @setProblemStar="handleProblemStar" />
      </div>
    </div>
    <!-- 右边部分 -->
    <div class="right-side">
      <div class="btn-group">
        <el-button class="preview-btn" @click="isFormPreviewVisible = !isFormPreviewVisible">预览</el-button>
        <el-button class="save-btn" @click="saveForm">保存</el-button>
      </div>
      <el-button class="create-btn" type="primary" @click="finishForm">完成创建</el-button>
    </div>
  </div>
  <!------------添加常用题目弹框------------>
  <el-dialog v-model="dialogVisible" width="850px" :showClose="false">
    <div class="my-header">
      <span>管理常用题</span>
      <el-icon @click="closeDialog">
        <Close />
      </el-icon>
    </div>
    <div class="my-body">
      <div class="manage-area">
        <!-- 显示常用题 -->
        <div class="star-problem-list">
          <el-table :data="problemStarList" style="width: 100%">
            <el-table-column prop="problem.title" label="标题" align="center"></el-table-column>
            <el-table-column label="操作" width="180px" align="center">
              <template #default="scope">
                <el-button type="danger" @click="deleteStarProblem(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-dialog>
  <!-- 预览 -->
  <FormPreview v-model:visible="isFormPreviewVisible" />
</template>

<script lang='ts' setup>
import { ref, onBeforeMount, watchEffect, onBeforeUnmount } from 'vue'
import type { TProblemType, IProblem, IProblemType, IStarProblem } from '@/interfaces/problem'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getProblemTypeList, getBasicProblemList, getStarProblemList, cancelStarProblem, starProblem } from '@/api/problem'
import { ResultEnum } from '@/enums/httpEnum'
import { useFormStore, IUpdateProblem } from '@/store/modules/form'
import { useRouter, onBeforeRouteLeave, useRoute } from 'vue-router'
import { PageNameEnum } from '@/enums/pageEnum'

const formStore = useFormStore()
const router = useRouter()
const route = useRoute()
const problemTypeList = ref<IProblemType[]>([])
const problemBasicList = ref<Omit<IProblem<TProblemType>, 'result'>[]>([])
const problemStarList = ref<IStarProblem<TProblemType>[]>([])
const titlePlaceholder = ref('请输入标题')
watchEffect(() => {
  formStore.problemCardStatusList = formStore.newFormSettings.problems.map((_, index) => ({ isSelected: index === formStore.newAddProblemIndex }))
})
const dialogVisible = ref(false)
const isFormPreviewVisible = ref(false)
const isFormCreated = ref(false) // 表单是否完成

// 初始化newFormSettings
const initNewFormSettings = async () => {
  try {
    await formStore.getFormById(route.query.formId as string)
    formStore.initNewFormSettings()
  } catch (err) { }
}

// 初始化题目类型
const initproblemTypeList = async () => {
  try {
    const res = await getProblemTypeList()
    if (res.stat === ResultEnum.SUCCESS && res.data !== undefined) {
      problemTypeList.value = res.data.problemTypes
    }
  } catch (err) { }
}

// 初始化题目模板
const initProblemBasicList = async () => {
  try {
    const res = await getBasicProblemList()
    if (res.stat === ResultEnum.SUCCESS && res.data !== undefined) {
      problemBasicList.value = res.data.basicProblems
    }
  } catch (err) { }
}

// 获取常用题
const initProblemStarList = async () => {
  try {
    const res = await getStarProblemList()
    if (res.stat === ResultEnum.SUCCESS && res.data !== undefined) {
      problemStarList.value = res.data.items
    }
  } catch (err) { }
}
// 关闭dialog
const closeDialog = () => {
  dialogVisible.value = false
}
// 删除常用题
const deleteStarProblem = (id: string) => {
  ElMessageBox.confirm(
    '删除后，创建表单时无法再使用改题进行快速创建，是否删除',
    '删除常用题',
    {
      confirmButtonText: '确定',
      cancelButtonText: '删除',
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await cancelStarProblem(id)
      if (res.stat === ResultEnum.SUCCESS) {
        ElMessage.success('删除成功')
        initProblemStarList()
      }
    } catch (err) { }
  }).catch(() => {
    ElMessage.info('已取消')
  })
}
// 处理表单标题长度
const handleTitleInput = (val: string) => {
  const maxLength = 30
  if (val.length >= maxLength) {
    formStore.newFormSettings.title = val.slice(0, maxLength)
    ElMessage.info('标题最大长度不能超过30字')
  }
}
const handleTitleFocus = () => {
  titlePlaceholder.value = ''
}
const handleTitleBlur = () => {
  if (!formStore.newFormSettings.title) {
    titlePlaceholder.value = '请输入标题'
  }
}

// 点击按钮添加题目
const addProblem = (type: TProblemType) => {
  // 返回现在正被选中的卡片index
  const index = formStore.problemCardStatusList.findIndex(val => val.isSelected === true)
  if (index !== -1) {
    // 先改变序号再增加问题
    formStore.newAddProblemIndex = index + 1
    formStore.addFormProblem(type, index + 1)
  } else {
    formStore.newAddProblemIndex = formStore.newFormSettings.problems.length
    formStore.addFormProblem(type)
  }
}

// 处理最外层容器点击
const handleCreateFormClick = () => {
  if (formStore.problemCardStatusList && formStore.problemCardStatusList.length !== 0) {
    formStore.problemCardStatusList.forEach(val => (val.isSelected = false))
  }
}

// 添加题目模板
const addProblemTemplate = (createdProblem: IProblem<TProblemType>) => {
  const _createdProblem = { ...createdProblem, isNew: true }
  // 返回现在正被选中的卡片index
  const index = formStore.problemCardStatusList.findIndex(val => val.isSelected === true)
  if (index !== -1) {
    // 先改变序号再增加问题
    formStore.newAddProblemIndex = index + 1
    formStore.addFormProblemCreated(_createdProblem, index + 1)
  } else {
    formStore.newAddProblemIndex = formStore.newFormSettings.problems.length
    formStore.addFormProblemCreated(_createdProblem)
  }
}

// 问题标星
const handleProblemStar = async (problem: IUpdateProblem) => {
  if (formStore.problemValidate(problem)) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isNew, result, id, ...params } = problem
      const res = await starProblem({ problem: params })
      if (res.stat === ResultEnum.SUCCESS) {
        initProblemStarList()
        return ElMessage.success('添加成功')
      }
    } catch (err) { }
  }
}

// 添加标星问题
const addProblemStar = ({ problem }: { problem: IProblem<TProblemType> }) => {
  const _createdProblem = { ...problem, isNew: true }
  // 返回现在正被选中的卡片index
  const index = formStore.problemCardStatusList.findIndex(val => val.isSelected === true)
  if (index !== -1) {
    // 先改变序号再增加问题
    formStore.newAddProblemIndex = index + 1
    formStore.addFormProblemCreated(_createdProblem, index + 1)
  } else {
    formStore.newAddProblemIndex = formStore.newFormSettings.problems.length
    formStore.addFormProblemCreated(_createdProblem)
  }
}

// 保存表单
const saveForm = async () => {
  if (formStore.formValidate()) {
    try {
      const res = await formStore.saveFormCreate()
      if (res.stat === ResultEnum.SUCCESS) {
        isFormCreated.value = true
        ElMessage.success('保存成功')
        router.replace({ name: PageNameEnum.HOME_MYCREATE })
      }
    } catch (err) { }
  }
}

// 完成表单创建
const finishForm = async () => {
  if (formStore.formValidate()) {
    ElMessageBox.confirm(
      '请问是否确定完成表单创建',
      '创建表单',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(async () => {
      try {
        // 保存表单获取id
        const idRes = await formStore.saveFormCreate()
        if (idRes.stat === ResultEnum.SUCCESS && idRes.data) {
          // 发布表单
          const res = await formStore.publishForm(idRes.data.id)
          if (res.stat === ResultEnum.SUCCESS) {
            ElMessage.success('创建成功')
            isFormCreated.value = true // 跳过路由守卫直接回到首页1
            router.replace({ name: PageNameEnum.HOME_MYCREATE })
          }
        }
      } catch (err) { }
    }).catch(() => {
      ElMessage.info('已取消')
    })
  }
}

// 提醒用户未保存表单
const isFormSaveInfo = () => {
  return ElMessageBox.confirm(
    '您可能未保存表单为草稿,确定要离开吗？',
    '保存表单',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
}
// 刷新前触发confirm
const handleWindowConfirm = async (event: Event) => {
  event = event || window.event
  if (event) {
    event.preventDefault()
    event.returnValue = false
  }
  return ''
}

onBeforeMount(() => {
  initproblemTypeList()
  initProblemBasicList()
  initProblemStarList()
  if (route.query.formId) {
    initNewFormSettings()
    formStore.newAddProblemIndex = 0
  }
  // 监听刷新页面前操作
  window.addEventListener('beforeunload', handleWindowConfirm, false)
})

onBeforeUnmount(() => {
  // 离开页面移除事件
  window.removeEventListener('beforeunload', handleWindowConfirm, false)
})
// 离开路由前
onBeforeRouteLeave(async () => {
  if (!isFormCreated.value) {
    try {
      await isFormSaveInfo()
    } catch (err) {
      return false
    }
  }
})

</script>

<style scoped lang="less">
@header-main-gap: 15px; // 头部与整体内容间隙
@left-side-width: 212px; // 左边宽度
@right-side-width: 300px; // 右边宽度
@main-width: 776px; // 中间主要部分宽度

.left-side-grid-common() {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.create-form-container {
  padding: @header-main-gap 20px 0;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  min-width: 1020px;

  :deep(.el-button+.el-button) {
    // 取消相邻button间距
    margin-left: 0 !important;
  }
}

.left-side {
  padding: 24px 16px 0;
  max-height: 640px;
  background-color: #fff;
  width: @left-side-width;

  .title {
    font-weight: 700;
    line-height: 20px;
    font-size: 14px;
    margin-bottom: 20px;
    color: @primary-text-color;
  }

  .problem-btn {
    .left-side-grid-common();
  }

  .problem-basic-container {
    margin: 20px 0;

    .problem-basic {
      .left-side-grid-common();
    }
  }

  .problem-star-container {
    .el-button {
      max-width: calc(@left-side-width / 2 - 20px);
    }

    .title-container {
      color: @primary-text-color;
      font-weight: 700;
      line-height: 20px;
      font-size: 14px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        margin: 0;
      }

      .title-btn {
        color: @primary-color;
        user-select: none;
        cursor: pointer;
      }
    }

    :deep(.el-button > span) {
      display: inline-block;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .problem-star {
      .left-side-grid-common();
    }
  }
}

.right-side {
  width: @right-side-width;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: fit-content;
  max-height: 50%;
  overflow-y: auto;

  .btn-group {
    display: flex;
    gap: 10px;

    .preview-btn,
    .save-btn {
      flex: 1;
    }
  }
}

.problem-add-detail-container {
  width: @main-width;
  min-height: 100%;
  padding: 50px 88px;
  background-color: #fff;
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title,
  .sub-title {
    height: fit-content;
  }

  .title {
    :deep(.el-input__wrapper) {
      box-shadow: none;
    }

    :deep(.el-input__inner) {
      &::-webkit-input-placeholder {
        color: @primary-text-color;
      }

      font-size: 24px;
      font-weight: bold;
      text-align: center;
      color: @primary-text-color;
    }
  }

  .sub-title {
    border-bottom: none;
    margin: 40px 0 60px;

    &:hover {
      caret-color: transparent;
      border-bottom: @common-border-style;
    }

    &:focus-within {
      border-bottom: 1px solid @primary-color;
    }

    :deep(.el-textarea__inner) {
      text-align: center;
    }
  }

  .problem-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
}

.my-header {
  padding-bottom: 15px;
  margin-right: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;

  .el-icon {
    cursor: pointer;
  }
}

.my-body {
  max-height: 60vh;
  overflow-y: auto;
  padding-top: 30px;
  padding-right: 30px;
}

.star-problem-list {
  height: 360px;
  border: 1px solid #e2e6ed;
  border-radius: 2px;
  overflow-y: auto;
}
</style>
