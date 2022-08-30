<script lang='ts' setup>
import { onBeforeMount, ref } from 'vue'
import type { IThumbnail } from '@/interfaces/dataTypes'
import { getThumbnailList } from '@/api/inspiration'

const thumbnailList = ref<IThumbnail[]>([])
onBeforeMount(async () => {
  thumbnailList.value = await getThumbnailList()
})

</script>
<template>
  <main class="site-main">
    <!-- banner & text -->
    <div class="banner-container">
      <div class="banner-wrap">
        <img class="img" src="../assets/images/banner.webp" />
        <div class="text-content">
          <h1>Discover the world’s top designers & creatives</h1>
          <p>
            Dribbble is the leading destination to find & showcase creative
            work and home to the world's best design professionals.
          </p>
          <a class="sign-btn" href="#">Sign up</a>
        </div>
      </div>
    </div>

    <!-- 缩略图列表 -->
    <div class="thumbnail-container">
      <ol class="thumbnail-list">
        <li class="item" v-for="item in thumbnailList" :key="item.avatar">
          <div class="cover">
            <img class="img" :src="item.cover" />
          </div>
          <div class="info">
            <a href="#" class="avatar-container">
              <img class="avatar" :src="item.avatar" />
              <p>{{ item.name }}</p>
            </a>
            <div class="statistics-container">
              <div class="likes-container">
                <img class="likes-icon" src="../assets/images/icon-like.svg" width="14" />
                <p>{{ item.likes }}</p>
              </div>
              <div class="views-container">
                <img class="views-icon" src="../assets/images/icon-view.svg" width="14" />
                <p>{{ item.views }}</p>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </main>
</template>
<style scoped>
.site-main {
  margin: 0 0 40px 0;
}

.banner-container {
  padding: 40px 20px;
  background-color: #f9f8fd;
  display: flex;
  justify-content: center;
}

.banner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1536px;
}

.banner-container .img {
  width: 40%;
}

.banner-container .text-content {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.banner-container h1 {
  font-size: 24px;
}

.banner-container p {
  margin: 16px 0;
  line-height: 28px;
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

.thumbnail-container {
  padding: 16px 20px;
}

.item>.cover>.img {
  width: 100%;
  border-radius: 10px;
  min-width: 270px;
}

.thumbnail-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
}

.info {
  display: flex;
}

.info>.avatar-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 5px;
}

.avatar-container>.avatar {
  width: 24px;
  border-radius: 50%;
}

.avatar-container>p {
  font-size: 14px;
  color: #0d0c22;
  font-weight: bold;
}

.info>.statistics-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.likes-container {
  display: flex;
  font-size: 12px;
  font-weight: bold;
  color: #3d3d4e;
  align-items: center;
  gap: 2px;
}

.views-container {
  display: flex;
  font-size: 12px;
  font-weight: bold;
  color: #3d3d4e;
  align-items: center;
  gap: 2px;
}

@media screen and (min-width: 768px) {
  .thumbnail-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .banner-wrap {
    flex-direction: row;
    padding: 0 32px;
  }

  .banner-container .img {
    order: 1;
  }
  .banner-container .text-content {
    order: 0;
    text-align: left;
    align-items: flex-start;
  }

  .banner-container h1 {
    font-size: 32px;
  }
}
@media screen and (min-width: 920px) {
  .thumbnail-list {
    grid-template-columns: repeat(3, 1fr);
  }
  .banner-wrap {
    padding: 0 72px;
  }
}

@media screen and (min-width: 1366px) {
  .thumbnail-list {
    grid-template-columns: repeat(4, 1fr);
  }
  .thumbnail-container {
    padding: 16px 72px;
  }
  .banner-container h1 {
    font-size: 48px;
  }
  .banner-wrap {
    gap: 10%;
  }
}
</style>
