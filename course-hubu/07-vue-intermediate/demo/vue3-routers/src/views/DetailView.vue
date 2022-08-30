<template>
  <h1>带参数的路由</h1>
  <p>id: {{ $route.params.id }}</p>
  <p><button @click="update">更新路由参数</button></p>
</template>

<script lang="ts">
import { defineComponent, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const update = () => {
      const id = Number.parseInt(route.params.id as string) + 1;
      router.push("/detail/" + id);
    };
    onUpdated(() => {
      console.log('component change', route.params)
    })
    return {
      update,
    };
  },
});
</script>
