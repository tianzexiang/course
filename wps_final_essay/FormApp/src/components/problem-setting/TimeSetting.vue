<template>
  <div class="input-result-container">
    <el-icon :size="20" color="#1488ED"><Clock/></el-icon>
    <el-time-select
      placeholder="时间：时 分 秒"
      disabled
    />
  </div>
</template>
<script lang='ts' setup>
</script>
<style scoped lang="less">
.input-result-container {
  width: 100%;
  color: #aeb5c0;
  font-size: 12px;
  margin: 15px 0;
  display: flex;
  align-items: center;
  margin: 20px 0 0 0;
  .el-icon {
    margin-right: 10px;
  }
}
</style>
