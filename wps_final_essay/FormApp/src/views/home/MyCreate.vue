<template>
  <div class="table-header">
    <span class="title">我创建的</span>
    <div class="filter">
      <el-icon class="star" :size="20" :color="listQuery.isStar ? '#D3C240' : '#CBCBC8'" @click="toggleStarForm">
        <Star />
      </el-icon>
      <span>仅展示星标</span>
    </div>
  </div>
  <el-table :data="formList" style="width:100%" stripe>
    <el-table-column prop="title" label="表单名称" min-width="300px"></el-table-column>
    <el-table-column prop="ctime" label="创建时间" sortable width="200px" :formatter="timeFormatter"></el-table-column>
    <el-table-column prop="status" label="表单状态" width="100px" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.status === EFormStatus.normal" type="warning">草稿</el-tag>
        <el-tag v-else-if="scope.row.status === EFormStatus.ing">收集中</el-tag>
        <el-tag v-else type="danger">已结束</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="isStar" label="收藏" width="80px" align="center">
      <template #default="scope">
        <el-icon class="star" :size="20" :color="scope.row.isStar ? '#D3C240' : '#CBCBC8'"
          @click="starToggle(scope.row.isStar, scope.row.id)">
          <Star />
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="400px" align="center">
      <template #default="scope">
        <el-button type="info" v-if="scope.row.status === EFormStatus.ing" @click="shareForm(scope.row.id)">分享
        </el-button>
        <el-button type="primary" v-if="scope.row.status === EFormStatus.normal" @click="startForm(scope.row.id)">发布
        </el-button>
        <el-button v-if="scope.row.status === EFormStatus.normal" @click="editForm(scope.row.id)">编辑</el-button>
        <el-button type="success" v-if="scope.row.status !== EFormStatus.normal" @click="viewResult(scope.row.id)">查看结果
        </el-button>
        <el-button type="warning" v-if="scope.row.status === EFormStatus.ing" @click="endForm(scope.row.id)">停止
        </el-button>
        <el-button type="danger" @click="deleteForm(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-model:currentPage="offset" v-model:page-size="listQuery.limit" :page-sizes="[4, 5, 7, 8, 10, 15]"
    :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="getFormList"
    @current-change="getFormList" />
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'
import 'element-plus/dist/index.css'
import { ref, reactive, onBeforeMount, computed } from 'vue'
import * as formApi from '@/api/form'
import { ElMessage, ElMessageBox } from 'element-plus'
import { IListParams } from '@/interfaces/request'
import { IForm, EFormStatus } from '@/interfaces/form'
import { formatUnixTime } from '@/utils/dayjs'
import { ResultEnum } from '@/enums/httpEnum'

const router = useRouter()
// 分页参数, 当前页默认为0
const listQuery = reactive<IListParams>({
  offset: 0,
  limit: 8,
  isStar: undefined
})
// 页数
const offset = computed(() => listQuery.offset + 1)
// 表单列表数据
const formList = ref<IForm[]>([])
// 列表总条数
const total = ref(10)
// 获取数据
const getFormList = async () => {
  try {
    const res = await formApi.getFormList(listQuery)
    if (res.stat === ResultEnum.SUCCESS) {
      if (res.data) {
        formList.value = res.data.items
        total.value = res.data.total
      }
    }
  } catch (err) { }
}
// 格式化时间
const timeFormatter = (row: IForm) => {
  return formatUnixTime(row.ctime, 'YYYY年MM月DD日HH:mm')
}
// 在挂载前获取数据
onBeforeMount(getFormList)
// 前往详情页面携带查询参数(id和标签页的激活名称)
const shareForm = (id: string) => {
  router.push({
    path: '/new-form-result',
    query: {
      formId: id,
      activeName: 'form-share'
    }
  })
}
// 开始收集表单
const startForm = async (id: string) => {
  try {
    const res = await formApi.startForm(id)
    if (res.stat === ResultEnum.SUCCESS) {
      ElMessage.success('发布成功')
      getFormList()
    }
  } catch (err) { }
}
// 停止收集
const endForm = (id: string) => {
  ElMessageBox.confirm(
    '你确定要停止收集吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await formApi.endForm(id)
      if (res.stat === 'ok') {
        ElMessage.success('已停止收集表单')
        getFormList()
      }
    } catch (err) { }
  }).catch(() => {
    ElMessage.info('已取消')
  })
}
// 前往新建表单页面携带查询参数(id以及创建表单的类型)
const editForm = (id: string) => {
  router.push({
    path: '/create',
    query: {
      type: 'edit',
      formId: id
    }
  })
}
// 前往详情页面携带查询参数(id和标签页的激活名称)
const viewResult = (id: string) => {
  router.push({
    path: '/new-form-result',
    query: {
      formId: id,
      activeName: 'form-data'
    }
  })
}
// 删除表单
const deleteForm = (id: string) => {
  ElMessageBox.confirm(
    '你确定要删除这个表单吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await formApi.deleteForm(id)
      if (res.stat === 'ok') {
        ElMessage.success('删除成功')
        getFormList()
      }
    } catch (err) { }
  }).catch(() => {
    ElMessage.info('取消删除')
  })
}
// 收藏和取消收藏表单
const starToggle = async (isStar: boolean, id: string) => {
  // 判断是否已经被收藏
  if (isStar === true) {
    try {
      const res = await formApi.cancelStarForm(id)
      if (res.stat === 'ok') {
        ElMessage.success('取消成功')
        getFormList()
      }
    } catch (err) { }
  } else {
    try {
      const res = await formApi.starForm(id)
      if (res.stat === 'ok') {
        ElMessage.success('收藏成功')
        getFormList()
      }
    } catch (err) { }
  }
}
// 展示标星表单或者取消
const toggleStarForm = () => {
  if (listQuery.isStar === undefined) {
    listQuery.isStar = true
  } else {
    listQuery.isStar = undefined
  }
  getFormList()
}
</script>

<style scoped lang="less">
.el-pagination {
  margin-top: 30px;
  justify-content: flex-end;
}

.el-icon:hover {
  color: #14A8F4;
}

.el-icon {
  cursor: pointer;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;

  .title {
    font-size: 18px;
  }
}

.filter {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
  gap: 5px;

  span {
    font-size: 16px;
    color: #949aae;
  }
}

.star {
  cursor: pointer;
}
</style>
