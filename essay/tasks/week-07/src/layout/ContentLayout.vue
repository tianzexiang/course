<script lang='ts' setup>

</script>
<template>
  <main class="content-container">
    <router-view />
  </main>
</template>
<style scoped>
.content-container {
  padding: 15px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
