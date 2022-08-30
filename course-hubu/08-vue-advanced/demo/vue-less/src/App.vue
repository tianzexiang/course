<template>
  <div class="a">
    <div class="b">Hello World!</div>
    <div :class="style.module">hahh</div>
  </div>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import style from "./style.module.css";

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    return {
      style
    }
  }
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.a {
  .b {
    color: red;
  }
}
</style>
