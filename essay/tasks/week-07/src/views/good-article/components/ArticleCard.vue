<script lang='ts' setup>
import { ref, reactive } from 'vue'
import type { IArticle } from '@/interfaces/types'

const props = withDefaults(defineProps<{
  article: IArticle
  rank?: string | number
}>(), {
  rank: '1'
})
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'click', id: string, evt: MouseEvent): void
}>()

const article = reactive(props.article)
const rank = ref(props.rank)
// 获取rank图片
const getRankImgURL = (rank: string | number) => require(`@/assets/images/rank-top${rank}.png`)
const handleClick = (evt: MouseEvent) => emit('click', article.id, evt)
</script>
<template>
  <div href="#" class="card-sku" @click="handleClick">
    <div class="cover">
      <img class="img" :src="article.banner" alt="动漫" title="动漫" />
      <img v-if="Number(rank) <= 5" class="rank" :src="getRankImgURL(rank)" />
    </div>
    <div class="outline">
      {{article.title}}
    </div>
    <div class="info">
      <div class="comment_favor">
        <div>
          <i class="iconfont icon-pinglun"></i>
          <span class="comment"> {{ article.comments }} </span>
        </div>
        <div>
          <i class="iconfont icon-dianzan"></i>
          <span class="favor">{{ article.likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card-sku {
  position: relative;
  display: block;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  cursor: pointer;
}

.cover {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.cover>.img {
  width: 100%;
  border-radius: 5px;
}

.cover>.rank {
  position: absolute;
  width: 12%;
  left: 0;
  right: 0;
}

.outline {
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  margin: 15px 0;
}

.info {
  display: flex;
  align-items: center;
}

.comment_favor {
  flex: 1;
  display: flex;
  gap: 20px;
  font-size: 0.75rem;
  color: #b6b6b6;
  justify-content: flex-end;
  align-items: center;
  margin-right: 15px;
  white-space: nowrap;
  letter-spacing: .05rem;
}

.comment,
.favor {
  margin-left: 5px;
}
</style>
