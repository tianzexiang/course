<template>
  <el-container>
    <el-aside width="230px">
      <div class="create">
        <el-button type="primary" size="large" @click="createForm">+ 新建</el-button>
      </div>
      <ul class="menu">
        <li>
          <router-link to="/mycreate" active-class="active">
            <img src="@/assets/images/create.svg">
            <span>我创建的</span>
          </router-link>
        </li>
      </ul>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { useFormStore } from '@/store/modules/form'
const router = useRouter()
const formStore = useFormStore()
// 前往新建表单页面,携带查询查询参数创建表单的类型
const createForm = () => {
  formStore.resetNewFormSettings()
  router.push({
    path: '/create',
    query: {
      type: 'create'
    }
  })
}
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
  background-color: #ffffff;
  min-width: @common-min-width;
}

.el-header {
  border-bottom: 1px solid #E8E8E8;
}

.el-aside {
  border-right: 1px solid #DDDDDD;
  padding: 20px;
}

.create {
  width: 100%;
  display: flex;
  justify-content: center;

  .el-button {
    width: 100%;
    font-size: 16px;
  }
}

.menu {
  width: 100%;
  margin-top: 30px;
  user-select: none;

  a {
    height: 42px;
    width: 100%;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
  }
}

.active {
  background-color: #F2F5FA;
}
</style>
