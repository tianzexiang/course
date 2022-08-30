<script lang='ts' setup>
import { computed } from 'vue'
import type { ITodo } from '@/interfaces/todo'
// 需要的数据
const props = withDefaults(defineProps<{
  todo: ITodo | Record<string, unknown>
}>(), {
  todo: () => ({})
})

// todo
const todo = computed(() => props.todo)

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'deleteTodo', id: string): void
  (e: 'changeTodoStat', id: string): void
}>()

// 删除todo
const handleDeleteTodo = () => {
  if (typeof todo.value.id === 'string') emits('deleteTodo', todo.value.id)
}
// 改变todo状态
const handleChangeTodoStat = () => {
  if (typeof todo.value.id === 'string') emits('changeTodoStat', todo.value.id)
}

</script>
<template>
  <div :class="['todo-item',todo.finished ? 'todo-finished' : '']">
    <i class="iconfont icon-checkbox" @click="handleChangeTodoStat"></i>
    <span class="todo-title">{{ todo.content }}</span>
    <i class="iconfont icon-delete" @click="handleDeleteTodo"></i>
  </div>
</template>
<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.todo-item .iconfont {
  color: #ccc;
  font-size: 24px;
  cursor: pointer;
}

.todo-title {
  flex: 1;
  margin: 0 15px;
  font-size: 18px;
  line-height: 1.5em;
}

.todo-finished .icon-checkbox {
  color: #4F89FF;
}

.icon-delete:hover {
  color: red;
}

.todo-finished .todo-title {
  text-decoration: line-through;
  color: #bbb;
}
</style>
