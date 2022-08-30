<script lang='ts' setup>
import { } from 'vue'
import { useDialogStore } from '@/store'
const dialogStore = useDialogStore()
const handleDialogClick = () => { dialogStore.isShow = !dialogStore.isShow }
</script>
<template>
  <header class="site-header">
    <!-- 移动端header -->
    <div class="mobile-container">
      <div class="icon-container">
        <img v-show="!dialogStore.isShow" class="menu-icon" src="../assets/images/icon-menu.svg" width="18" @click="handleDialogClick" />
        <img v-show="dialogStore.isShow" class="close-icon" src="../assets/images/icon-close.svg" width="24" @click="handleDialogClick"/>
      </div>
      <div class="title-container">
        <a href="#">
          <img class="title" src="../assets/images/logo-black.svg" width="76" />
        </a>
      </div>
      <div class="sign-container">
        <a class="sign" href="#"> Sign in </a>
      </div>
    </div>

    <!-- 桌面端header -->
    <div class="desktop-container">
      <div class="title-container">
        <a href="#">
          <img class="title" src="../assets/images/logo-black.svg" width="76" />
        </a>
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
      <div class="action-container">
        <a class="sign-in" href="#"> Sign in </a>
        <a class="sign-btn" href="#">Sign up</a>
      </div>
    </div>
  </header>
  <!-- 填充头部 -->
  <div class="fill"></div>
</template>
<style scoped>
.site-header {
  height: 68px;
  padding: 0 24px;
  position: fixed;
  width: 100vw;
  background-color: #fff;
}

.fill {
  height: 68px;
}

.mobile-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.mobile-container .icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 30px;
}

.mobile-container .icon-container:hover {
  cursor: pointer;
}

.mobile-container .title-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-container .sign-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6e6d7a;
}

.desktop-container {
  display: none;
  width: 100%;
  height: 100%;
  gap: 24px;
  justify-content: space-between;
}

.desktop-container .title-container {
  display: flex;
  gap: 15px;
  align-items: center;
}

.desktop-container .nav {
  display: flex;
  gap: 12px;
  align-items: center;
  color: #6e6d7a;
  font-size: 14px;
  font-weight: bold;
}

.desktop-container .nav .item:hover a {
  color: var(--theme-color);
}

.desktop-container .action-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 12px;
}

.action-container .sign-in {
  color: #6e6d7a;
}

.sign-btn {
  padding: 10px 16px;
  background-color: var(--theme-color);
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
}

.sign-btn:hover {
  background-color: #e797b6;
}

@media screen and (min-width: 920px) {
  .site-header {
    height: 80px;
    position: static;
  }

  .fill {
    display: none;
  }

  .mobile-container {
    display: none;
  }

  .desktop-container {
    display: flex;
  }
}

@media screen and (min-width: 1366px) {
  .desktop-container .nav {
    gap: 32px;
  }

  .desktop-container .title-container {
    gap: 32px;
  }
}
</style>
