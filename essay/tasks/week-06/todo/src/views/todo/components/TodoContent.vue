<script lang='ts' setup>
import TodoItem from './TodoItem.vue'
import TodoInput from './TodoInput.vue'
import { ref, onBeforeMount } from 'vue'
import type { ITodo } from '@/interfaces/todo'
import { createTodo, getTodoList, doneTodo, deleteTodo } from '@/services/api'

const todoList = ref<ITodo[]>([])

// 获取todo列表
const handleGetTodoList = async () => {
  const res = await getTodoList()
  if (res.stat === 'ok') todoList.value = res.data
}
// 创建todo
const handleCreateTodo = async (content: string) => {
  await createTodo(content)
  handleGetTodoList()
}
// 改变todo状态
const handleChangeTodoStat = async (id: string) => {
  await doneTodo(id)
  handleGetTodoList()
}
// 删除todo
const handleDeleteTodo = async (id: string) => {
  await deleteTodo(id)
  handleGetTodoList()
}

onBeforeMount(() => {
  handleGetTodoList()
})
</script>
<template>
  <section id="todos">
    <!-- 输入框 -->
    <TodoInput @createTodo="handleCreateTodo" />
    <!-- 待办事项列表 -->
    <TodoItem v-for="item in todoList" :key="item.id" :todo="item" @changeTodoStat="handleChangeTodoStat"
      @deleteTodo="handleDeleteTodo" />
  </section>
</template>
<style scoped>
</style>
