<template>
  <button :class="'button button-'+type" @click="handleClick"><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    type: String as PropType<"primary" | "default">,
  },
  emits: ["click"],
  methods: {
    handleClick: function () {
      this.$emit("click");
    },
  },
  // beforeCreate: function () {
  //   console.log("beforeCreate");
  // },
  // created: function () {
  //   console.log("created");
  // },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  background: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  outline: none;
  font-size: 14px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 15px;
  transition: all 0.3s ease-in-out;
}
.button-default:hover {
  color: #40a9ff;
  border-color: #40a9ff;
}
.button-primary {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}
.button-primary:hover {
  background: #40a9ff;
  border-color: #40a9ff;
}
</style>