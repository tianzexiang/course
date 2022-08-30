<template>
  <SlotTest>我是这里是slot内容</SlotTest>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SlotTest from "./components/SlotTest.vue";
export default defineComponent({
  components: {
    SlotTest
  }
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
.btns {
  margin-bottom: 20px;
}
.btns > * {
  margin-right: 15px;
}
</style>
