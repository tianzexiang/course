<template>
  <div id="app">
    <HelloWorld />
    <el-button @click="handleClick">{{
      !!!name ? "点击登录" : "点击退出"
    }}</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import store from "./store";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  computed: {
    name: () => store.state.user.name,
  },
  methods: {
    handleClick: function () {
      store.commit("setName", store.state.user.name ? "" : "Zykee");
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
