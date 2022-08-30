<template>
  <div class="album">
    <div class="cover">
      <img :src="album.cover" />
      <div class="mask">
        <img src="../assets/imgs/delete.png" @click="$emit('delete')" />
      </div>
    </div>
    <a class="title nowrap" href="#"> {{album.name}} </a>
    <a href="#">{{album.singer}}</a>
    <div>{{album.release_time}}</div>
  </div>
</template>

<script lang="ts">
import { IAlbum } from "../types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AlbumItem",
  props: {
    album: { type: Object as PropType<IAlbum>, required: true },
  },
  // 通过emit向父组件抛出事件
  emits: ['delete']
});
</script>
