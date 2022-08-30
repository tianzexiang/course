<template>
  <CustomNav />
  <div class="container">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CustomNav from "./components/CustomNav.vue";
export default defineComponent({
  components: {
    CustomNav,
  },
});
</script>
<style>
.container {
  padding: 20px;
}
</style>
