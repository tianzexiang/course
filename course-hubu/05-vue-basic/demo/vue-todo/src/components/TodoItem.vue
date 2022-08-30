<template>
  <div :class="todo.finished ? 'todo-item todo-finished' : 'todo-item'">
    <i class="iconfont icon-checkbox" @click="onToggle" />
    <span class="todo-title">{{ todo.content }}</span>
    <i class="iconfont icon-delete" @click="onDelete" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ITodo } from "../types";

export default defineComponent({
  name: "TodoItem",
  props: {
    todo: { type: Object as PropType<ITodo>, required: true },
    onToggle: Function as PropType<() => void>,
    onDelete: Function as PropType<() => void>,
  },
});
</script>
