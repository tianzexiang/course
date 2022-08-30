<template>
  <h1 class="test">{{ msg }}</h1>
  <h1 :class="$style.test">{{ msg }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
:global(.test) {
  color: yellow;
}
.test {
  color: red;
}
</style>
<!-- 
<style>
.test {
  color: red;
}
</style> -->
