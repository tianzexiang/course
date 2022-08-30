<template>
  <div class="write-catalog-container">
    <!-- 进度条 -->
    <div class="progress-bar" v-show="!isMenuShow">
      <p class="info">填写</p>
      <p class="info-number"><span class="fill">{{ doneNum }}</span>{{ '/' + problems.length }}</p>
      <InputProgress class="input-progress" :percentage="percentage" />
      <el-icon class="info-menu-arrow" :size="30" @click="handleShowMenu">
        <ArrowLeft />
      </el-icon>
    </div>
    <!-- 目录面板 -->
    <div class="write-catalog-menu" v-show="isMenuShow">
      <div class="info">
        <span>目录<span class="fill">1</span>/9</span>
        <el-icon class="info-progress-arrow" :size="14" @click="handleShowMenu">
          <ArrowRight />
        </el-icon>
      </div>
      <!-- 目录item -->
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
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, ref } from 'vue'
import { IProblem, TProblemType } from '@/interfaces/problem'

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

.write-catalog-container {
  width: @write-catalog-width;
  position: fixed;
  height: 100vh;
}

.progress-bar {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: #fff;
  border-radius: 999px;
  width: @progress-bar-width;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  user-select: none;

  .fill {
    color: @primary-color;
  }

  .input-progress {
    width: 5px;
    height: 100px;
  }

  .info-menu-arrow {
    padding: 8px;
    background-color: #F7F9FB;
    border-radius: 50%;
    cursor: pointer;
  }
}

.write-catalog-menu {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
  padding: 20px 20px 72px;

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

@media screen and (max-width: 1280px) {
  .write-catalog-container {
    position: relative;
  }
}
</style>
