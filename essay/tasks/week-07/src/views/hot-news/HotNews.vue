<script lang='ts' setup>
import { ref, onBeforeMount } from 'vue'
import { news } from '@/services/api'
import NewsCard from './components/NewsCard.vue'
import { useRouter } from 'vue-router'
import type { IArticle } from '@/interfaces/types'
import { PageNameEnum } from '@/enums/pageEnum'

const newsList = ref<IArticle[]>()
const router = useRouter()
const getNewsList = async () => {
  try {
    const res = await news()
    if (res.stat === 'OK') {
      newsList.value = res.rows
    }
  } catch (err) {
    window.alert(err)
  }
}

// 点击跳转详情
const handleClick = (id: string) => {
  router.push({ name: PageNameEnum.DETAIL, params: { id } })
}

onBeforeMount(() => {
  getNewsList()
})
</script>
<template>
  <NewsCard v-for="item in newsList" :key="item.id" :news="item" @click="handleClick"/>
</template>
<style scoped>
</style>
