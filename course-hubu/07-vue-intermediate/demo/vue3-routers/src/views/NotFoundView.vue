<template>
  <div class="not-found">404</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    onMounted(() => {
      console.log(route.params, route.path);
    });
  },
});
</script>

<style>
.not-found {
  font-size: 100px;
  font-weight: bold;
  text-align: center;
}
</style>
