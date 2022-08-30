<template>
  <header>
    <div class="header-inner">
      <img src="./assets/imgs/logo.png" />
    </div>
  </header>
  <main>
    <ul class="tabs">
      <li
        v-for="area in areas"
        :class="area.id === currentArea ? 'tab-item tab-active' : 'tab-item'"
        :key="area.id"
        @click="() => changeTab(area.id)"
      >
        {{ area.name }}
      </li>
    </ul>
    <section class="list">
      <AlbumItem
        v-for="album in currentAlbums"
        :key="album.id"
        :album="album"
        @delete="() => deleteAlbum(album)"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlbumItem from "./components/AlbumItem.vue";
import { IAlbum, IArea } from "./types";
import * as request from "./request";
import "./assets/styles/style.css";

export default defineComponent({
  name: "App",
  components: {
    AlbumItem,
  },
  data() {
    return {
      areas: [] as IArea[],
      albums: [] as IAlbum[],
      currentArea: null as number | null,
    };
  },
  methods: {
    load: async function () {
      let [areas, albums] = await Promise.all([
        request.get<IArea[]>("data/areas.json"),
        request.get<IAlbum[]>("data/albums.json"),
      ]);
      this.areas = areas;
      this.albums = albums;
      this.currentArea = areas[0].id;
    },
    changeTab(id: number) {
      this.currentArea = id;
    },
    deleteAlbum(album: IAlbum) {
      const index = this.albums.indexOf(album);
      this.albums.splice(index, 1);
    },
  },
  computed: {
    currentAlbums(): IAlbum[] {
      console.log(this.albums, this.currentArea)
      return this.albums.filter((album) => album.area === this.currentArea);
    },
  },
  created() {
    this.load();
  },
});
</script>
