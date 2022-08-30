<template>
  <div class="cover-wrap">
    <img :src="song.cover" class="cover-img" />
    <div class="cover-mask"></div>
    <img src="../assets/cover_play.png" class="cover-play" />
  </div>
  <div class="song-intro nowrap">
    <a href="#" class="song-name">{{ song.name }}</a>
    <div class="song-singer nowrap">{{ song.singer.join(",") }}</div>
  </div>
  <div>{{ timeFormat(song.interval) }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ISong } from "../types";

export default defineComponent({
  name: "SongItem",
  props: {
    song: { type: Object as PropType<ISong>, required: true },
  },
  methods: {
    // 格式化时间显示
    timeFormat: (interval: number) => {
      let minutes = Math.floor(interval / 60)
        .toString()
        .padStart(2, "0");
      let seconds = (interval % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    },
  },
});
</script>
