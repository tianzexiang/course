<template>
  <div class="mobile-write-catalog-container">
    <!-- 进度条 -->
    <div class="progress-bar" v-show="!isMenuShow">
      <el-progress type="circle" :width="70" :percentage="percentage" @click="handleShowMenu">
        <template #default>
          <p class="info">填写</p>
          <p class="info-number"><span class="fill">{{ doneNum }}</span>{{ '/' + problems.length }}</p>
        </template>
      </el-progress>
    </div>
    <!-- 目录面板 -->
    <el-drawer ref="drawerRef" v-model="isMenuShow" direction="btt" size="60%" :with-header="false">
      <div class="write-catalog-menu" v-show="isMenuShow">
        <div class="info">
          <span>目录<span class="fill">1</span>/9</span>
          <el-icon class="info-progress-arrow" :size="14" @click="handleShowMenu">
            <Close />
          </el-icon>
        </div>
        <!-- 目录item -->
        <section class="menu-item-container">
          <div class="menu-item" v-for="(item, index) in problems" :key="item.id">
            <div class="title">
              <span class="required">*</span>
              <span class="problem-title">{{ (index + 1) + '、' + item.title }}</span>
            </div>
            <div class="status">
              <img class="img" src="@/assets/images/write_status_normal.svg" v-show="!item.done">
              <img class="img" src="@/assets/images/write_status_done.svg" v-show="item.done" />
            </div>
          </div>
        </section>
      </div>
    </el-drawer>
  </div>
</template>
<script lang='ts' setup>
import { IProblem, TProblemType } from '@/interfaces/problem'
import { computed, ref } from 'vue'

interface IProblemCatalog extends IProblem<TProblemType> {
  done: boolean
}
const props = defineProps<{
  problems: IProblemCatalog[]
}>()

const problems = computed(() => props.problems)
const isMenuShow = ref(false)
const handleShowMenu = () => {
  isMenuShow.value = !isMenuShow.value
}
const doneNum = computed(() => (problems.value.filter(val => val.done)).length)
const percentage = computed(() => (doneNum.value / problems.value.length) * 100)
</script>
<style scoped lang="less">
@write-catalog-width: 240px; // 填写目录宽度
@progress-bar-width: 48px; // 填写进度条宽度

.progress-bar {
  position: fixed;
  right: 10px;
  bottom: 20px;
  z-index: 100;
  cursor: pointer;
  user-select: none;
  .el-progress {
    width: 70px;
    aspect-ratio: 1;
  }

  .info {
    margin-bottom: 5px;
  }

  .fill {
    color: @primary-color;
  }

  .input-progress {
    width: 5px;
    height: 100px;
  }
}

.write-catalog-menu {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .info {
    display: flex;
    justify-content: space-between;
    padding-bottom: 14px;
    border-bottom: @common-border-style;
    letter-spacing: 2px;
    margin-bottom: 5px;

    span {
      user-select: none;
    }

    .info-progress-arrow {
      cursor: pointer;
    }

    .fill {
      color: @primary-color;
    }
  }
}

.menu-item-container {
  height: 80%;
  overflow-y: auto;
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    caret-color: transparent;
    cursor: pointer;

    .title {
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;

      .required {
        color: red;
        margin-right: 2px;
      }
    }

    .status {
      height: 16px;

      .img {
        width: 16px;
      }
    }
  }
}
</style>
