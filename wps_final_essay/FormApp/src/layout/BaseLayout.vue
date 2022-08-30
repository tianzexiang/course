<template>
  <section class="base-layout-container">
    <HeaderBar />
    <main class="layout-content">
      <router-view></router-view>
    </main>
  </section>
</template>
<script lang='ts' setup>
</script>
<style scoped lang="less">
.base-layout-container {
  height: 100%;
  width: 100%;
  padding-top: @header-bar-height;
  .layout-content {
    padding: 0;
    height: 100%;
  }
}
</style>
