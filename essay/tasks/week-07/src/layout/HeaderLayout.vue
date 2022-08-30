<script lang='ts' setup>
import { computed } from 'vue'
import { useCommunityStore, TTabName } from '@/store/index'
import { PageNameEnum } from '@/enums/pageEnum'
import { useRouter } from 'vue-router'
const commStore = useCommunityStore()
const router = useRouter()
const tabActived = computed(() => commStore.tabActived)
// 点击切换tab
const handleClick = (tab: TTabName) => {
  router.push({ name: tab })
}
</script>
<template>
  <header class="top">
    <!-- 标题 -->
    <div class="title">排行榜</div>
    <!-- 导航栏 -->
    <nav class="tabs">
      <ul>
        <li :class="['tab-item', tabActived === PageNameEnum.GOOD_ARTICLE ? 'tab-active' : '']"
          @click="handleClick(PageNameEnum.GOOD_ARTICLE)">
          <img class="img" src="@/assets/images/icon_article.webp" />
          <span>好文精选</span>
        </li>
        <li :class="['tab-item', tabActived === PageNameEnum.HOT_NEWS ? 'tab-active' : '']"
          @click="handleClick(PageNameEnum.HOT_NEWS)">
          <img class="img" src="@/assets/images/icon_hot.webp" />
          <span>热门资讯</span>
        </li>
      </ul>
    </nav>
  </header>
  <div class="fill"></div>
</template>
<style scoped>
.fill {
  height: 100px;
}

.top {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  max-width: 1280px;
  height: 100px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background-color: var(--theme-color);
  color: #fff;
}

.top>.title {
  text-align: center;
  font-size: 1rem;
  width: 100%;
  padding: 8px 0;
}

.tabs {
  width: 90%;
  margin: 0 auto;
  padding: 2px 0 12px 0;
  caret-color: transparent;
}

.tabs>ul {
  display: flex;
  justify-content: space-around;
  background-color: #ce2523;
  border-radius: 10px;
  font-size: 0.9rem;
  overflow: hidden;
}

.tab-item {
  flex: 1;
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.tab-item>.img {
  width: 1rem;
}

.tab-active {
  background-color: #bb2021;
}
</style>
