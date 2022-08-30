<template>
  <div class="header-bar-left-container">
    <el-icon class="arrow-left" :size="20" v-if="title !== '金山表单'" @click="handleArrowLeftClick">
      <ArrowLeft />
    </el-icon>
    <img class="logo" src="@/assets/images/logo.svg">
    <span class="title">{{ title }}</span>
  </div>
</template>
<script lang='ts' setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// headerbar标题
const title = computed(() => route.meta.title)
// 返回上一级
const handleArrowLeftClick = () => router.back()

</script>
<style scoped lang="less">
.header-bar-left-container {
  height: 100%;
  display: flex;
  align-items: center;
  color: @primary-text-color;
  user-select: none;
  caret-color: transparent;
  .arrow-left {
    cursor: pointer;
    margin-right: 15px;
  }
  .logo {
    margin-right: 5px;
  }
  .title {
    font-size: 18px;
  }
}
</style>
