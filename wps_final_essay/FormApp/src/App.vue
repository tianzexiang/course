<template>
  <el-config-provider :message="messageConfig" :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang='ts' setup>
import { reactive } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const messageConfig = reactive({
  max: 3
})
const locale = reactive(zhCn)
</script>
<style scoped lang="less">
</style>
