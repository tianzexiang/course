<template>
  <div class="form-data-container">
    <!-- 表单头部信息 -->
    <div class="header">
      <div class="form-status">共收集<span>{{ formStore.formResult.length }}</span>{{ `份数据（${formStatus}）` }}</div>
      <div class="current-form-index" v-if="hasData">
        当前查看第<span>{{ currentPage }}</span>份表单数据
      </div>
      <div class="form-pagination" v-if="hasData">
        <el-pagination v-model:currentPage="currentPage" :page-size="1" :small="true" :background="true"
          layout="prev, pager, next, jumper" :total="formStore.formResult.length" />
      </div>
    </div>
    <!-- 表单填写详情 -->
    <div class="form-detail">
      <FormLayout :editable="false" :actionable="false" :title="title" :subTitle="subTitle"
        :formProp="formPropList[currentPage - 1]" v-if="hasData" />
      <el-empty description="暂无数据" v-else />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed } from 'vue'
import { useFormStore } from '@/store/modules/form'

const formStore = useFormStore()
const formPropList = computed(() => formStore.formResult.map(res => formStore.getFormProp(res.result, false)))
const title = computed(() => formStore.form.title)
const subTitle = computed(() => formStore.form.subTitle)
const currentPage = ref(1)
const formStatus = computed(() => {
  if (formStore.form.status === 2) return '未开始收集'
  else if (formStore.form.status === 3) return '正在收集中'
  else return '已结束收集'
})
const hasData = computed(() => formPropList.value.length !== 0)
</script>
<style scoped lang="less">
.form-data-container {

  // 调整数据间距
  span {
    margin: 0 5px;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 15px;
    letter-spacing: 2px;

    .current-form-index {
      font-size: 14px;
      color: @primary-text-color;
    }

    .form-status {
      font-size: 20px;
      color: @primary-text-color;
    }

    .form-pagination {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .form-detail {
    margin: 60px 0;
    height: 450px;
    overflow-y: scroll;
  }
}
</style>
