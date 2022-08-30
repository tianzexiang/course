<template>
  <div>Hello {{ user.name }}!</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IUser } from "../types";

export default defineComponent({
  name: "HelloWorld",
  props: {
    user: { type: Object as PropType<IUser>, required: true },
  },
});
</script>
