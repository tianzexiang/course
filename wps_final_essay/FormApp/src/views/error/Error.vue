<template>
  <div class="error-page-container">
    <el-empty :image-size="400" :description="desc" />
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const desc = ref(route.query.desc as string || '404 Not Found')
</script>

<style scoped lang="less">
.error-page-container {
  height: 100%;
  width: 100%;
  .el-empty {
    height: 100%;
    width: 100%;
  }
}
</style>
