<template>
  <div class="avatar-area-container">
    <!-- 当在个人中心的时候这个就不显示 -->
    <el-popover trigger="hover" v-if="title !== '个人中心'">
      <ul class="action">
        <li>
          <h1 class="nickname">{{ userStore.user.nickname }}</h1>
        </li>
        <li class="action-item" @click="goToCenter">个人中心</li>
        <li class="action-item" @click="userStore.logout">退出登录</li>
      </ul>
      <template #reference>
        <el-avatar :src="userStore.user.avatar"></el-avatar>
      </template>
    </el-popover>
  </div>
</template>

<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { computed } from 'vue'
const router = useRouter()
const userStore = useUserStore()
const route = useRoute()
const title = computed(() => route.meta.title)
const goToCenter = () => {
  router.push({
    path: `/profile/${userStore.user.id}`
  })
}
</script>

<style scoped>
.action {
  background-color: white;
}

.action li {
  font-size: 12px;
  padding: 5px 10px;
}

.nickname {
  font-size: 18px;
  border-bottom: 1px solid #D3D3D3;
  padding-bottom: 10px;
}

.action-item {
  cursor: pointer;
}

.action-item:hover {
  background-color: rgb(230, 235, 235);
}
</style>
