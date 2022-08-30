<script lang='ts' setup>
import { computed, ref } from 'vue'
import { useDialogStore } from '@/store'

const dialogStore = useDialogStore()
const isDialogShow = computed(() => dialogStore.isShow)

</script>
<template>
  <div :class="['nav-dialog', isDialogShow ? 'dialog-show' : 'dialog-hide']">
    <ul class="nav">
      <li class="item">
        <a href="#">Inspiration</a>
      </li>
      <li class="item">
        <a href="#">Find Work</a>
      </li>
      <li class="item">
        <a href="#">Learn Design</a>
      </li>
      <li class="item">
        <a href="#">Marketplace</a>
      </li>
      <li class="item">
        <a href="#">Hire Designers</a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.nav-dialog {
  position: fixed;
  top: 68px;
  left: 0;
  top: 68px;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
}

.nav-dialog .nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 25px 20px;
}

.nav-dialog .item {
  padding: 12px 0;
}

.nav-dialog .nav a {
  font-size: 18px;
  color: #6e6d7a;
  font-weight: bold;
}

.dialog-show {
  transform: translate(0);
}

.dialog-hide {
  transform: translate(-200vw);
}
</style>
