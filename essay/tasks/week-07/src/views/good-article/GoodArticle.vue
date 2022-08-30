<script lang='ts' setup>
import ArticleCard from './components/ArticleCard.vue'
import { posts } from '@/services/api'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IArticle } from '@/interfaces/types'
import { PageNameEnum } from '@/enums/pageEnum'

const articleList = ref<IArticle[]>([])
const router = useRouter()
// 获取所有文章
const getArticleList = async () => {
  try {
    const res = await posts()
    if (res.stat === 'OK') {
      articleList.value = res.rows
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
  getArticleList()
})
</script>
<template>
  <ArticleCard v-for="(item, index) in articleList" :key="item.id" :article="item" :rank="index + 1"
    @click="handleClick" />
</template>
<style scoped>
</style>
