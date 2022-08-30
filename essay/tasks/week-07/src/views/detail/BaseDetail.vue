<script lang='ts' setup>
import { watch, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { detail } from '@/services/api'
import type { IArticle } from '@/interfaces/types'
const route = useRoute()
const router = useRouter()
const articleDetail = ref<IArticle>()
// 获取详情
const getDetail = async () => {
  try {
    const res = await detail(route.params.id as string)
    if (res.stat === 'OK') {
      articleDetail.value = res.data
    }
  } catch (err) {
    window.alert(err)
  }
}
// 返回上一级
const handleGoBack = () => {
  router.back()
}
onBeforeMount(() => {
  getDetail()
})

</script>
<template>
  <div class="detail-container">
    <!-- 头部 -->
    <div class="header">
      <i class="go-back iconfont icon-arrowleft" @click="handleGoBack"></i>
      <img class="avatar" :src="articleDetail?.avatar">
      <span class="author">{{ articleDetail?.author }}</span>
    </div>
    <div class="fill"></div>
    <!-- banner -->
    <div class="banner-container">
      <img class="banner" :src="articleDetail?.banner">
    </div>
    <div class="article-content">
      <!-- 标题 -->
      <div class="title">{{ articleDetail?.title }}</div>
      <!-- 时间 -->
      <div class="time">{{ articleDetail?.time }}</div>
      <div class="article-html" v-html="articleDetail?.content" />
    </div>
  </div>
</template>
<style scoped>
.detail-container {
  height: 100%;
  width: 100%;
  background-color: white;
}

.header {
  height: 50px;
  width: 100%;
  max-width: 1280px;
  position: fixed;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
}

.header .avatar {
  width: 2rem;
  border-radius: 50%;
}

.header .go-back {
  font-size: 1.2rem;
  font-weight: normal;
  caret-color: transparent;
  height: 100%;
  padding: 0 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.header .author {
  font-size: .9rem;
  letter-spacing: .1rem;
}

.fill {
  height: 50px;
}

.banner {
  width: 100%;
}

.article-content {
  padding: 15px 20px;
  height: 100%;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  padding-top: 16px;
}

.time {
  font-size: .8rem;
  font-weight: lighter;
  padding: 16px 0;
}

.article-html {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: .9rem;
}

.article-html :deep(img) {
  width: 100%;
}
</style>
