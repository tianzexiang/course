<script lang='ts' setup>
import { IArticle } from '@/interfaces/types'
import { reactive } from 'vue'

const props = defineProps<{
  news: IArticle
}>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'click', id: string, evt: MouseEvent): void
}>()
const handleClick = (evt: MouseEvent) => emit('click', news.id, evt)
const news = reactive(props.news)
</script>
<template>
  <div class="news-card-sku" @click="handleClick">
    <!-- 图片 -->
    <div class="cover-cotainer">
      <img class="cover" :src="news.banner">
    </div>
    <!-- 描述 -->
    <div class="info">
      <div class="title">{{ news.title }}</div>
      <div class="author">{{ news.author }}</div>
    </div>
  </div>
</template>
<style scoped>
.news-card-sku {
  display: flex;
  width: 100%;
  gap: 15px;
  background-color: white;
  padding: 15px 10px;
  border-radius: 10px;
  min-width: 225px;
  cursor: pointer;
}

.cover {
  width: 8rem;
  height: 6rem;
  border-radius: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 0;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: .1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.author {
  font-size: .8rem;
  font-weight: lighter;
}
</style>
