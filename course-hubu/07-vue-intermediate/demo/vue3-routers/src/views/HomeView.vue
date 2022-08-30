<template>
  <h1>Home</h1>
  <p>
    <router-link to="/about">About</router-link>
  </p>
  <p>
    使用nav-link组件替代a标签进行路由的导航可以拦截用户的点击事件，然后通过
    `history.pushState` 添加浏览器的历史状态，更新url的同时又不会引起页面的刷新
  </p>
  <p>
    <a href="/about">普通a标签会导致页面刷新</a>
  </p>
  <p>
    <button @click="previewRoute">查看route</button>
    <button @click="navigate">通过API导航</button>
  </p>
  <p>
    <router-link to="/detail/1">带参数的路由</router-link>
  </p>
  <p>
    <router-link to="/hello">不存在的地址，响应404错误页面</router-link>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navigate = () => {
      router.push("/about");
    };

    const previewRoute = () => {
      console.log(route);
    };

    return {
      navigate,
      previewRoute,
    };
  },
});
</script>
