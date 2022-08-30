<template>
  <el-container class="container">
    <el-header class="header">
      <h1 class="title">控制台</h1>
      <div class="info">
        <span>{{ store.state.user?.username }}</span>
        <el-dropdown
          ><el-avatar :src="store.state.user?.avatar"></el-avatar
          ><template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template></el-dropdown
        >
      </div>
    </el-header>
    <el-container class="content">
      <el-aside class="aside" width="200px">
        <el-menu
          style="height: 100%"
          default-active="/home/person"
          :router="true"
        >
          <el-menu-item index="/home/person"
            ><el-icon><icon-user /></el-icon>人员管理</el-menu-item
          >
          <el-menu-item index="/home/post"
            ><el-icon><icon-files /></el-icon>文字列表</el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main class="main"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import {
  ElMenu,
  ElContainer,
  ElAside,
  ElMenuItem,
  ElMain,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElIcon,
  ElHeader,
  ElMessage,
} from "element-plus";
import store from "@/store";
import * as api from "@/services/api";

export default defineComponent({
  name: "HomeView",
  components: {
    ElMenu,
    ElContainer,
    ElAside,
    ElAvatar,
    ElMain,
    ElMenuItem,
    ElDropdown,
    ElDropdownItem,
    ElHeader,
    ElDropdownMenu,
    ElIcon,
  },
  setup() {
    const router = useRouter();
    const userInfo = async () => {
      let res = await api.userInfo();
      if (res.stat === "OK") {
        store.commit("setUser", res.user);
      } else {
        ElMessage.warning("请先登录");
        router.push("/login");
      }
    };
    const logout = async () => {
      const res = await store.dispatch("logout");
      if (res) {
        router.push("/login");
      }
    };
    onBeforeMount(async () => {
      await userInfo();
    });
    return {
      store,
      logout,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .header {
    color: var(--el-text-color-primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    .info {
      display: flex;
      align-items: center;
      width: 100px;
      justify-content: space-around;
    }
  }
  .content {
    .aside {
      width: 240px;
      color: var(--el-text-color-primary);
      background: #fff !important;
      box-sizing: border-box;
    }
  }
}
</style>
