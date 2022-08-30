<template>
  <header class="header-bar-container">
    <HeaderBarLeft />
    <div class="header-bar-center">
      <slot name="header-center"></slot>
    </div>
    <HeaderBarRight />
  </header>
</template>
<script lang='ts' setup>
</script>
<style scoped lang="less">
.header-bar-container {
  height: @header-bar-height;
  width: 100%;
  min-width: @common-min-width;
  position: fixed;
  top: 0;
  z-index: 999;
  overflow: hidden;
  background-color: #fff;
  border-bottom: @common-border-style;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.header-bar-center {
  flex: 1;
}
</style>
