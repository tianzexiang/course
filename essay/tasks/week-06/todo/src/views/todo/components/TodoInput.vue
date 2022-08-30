<script lang='ts' setup>
import { ref } from 'vue'

const inputContent = ref('')
// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'createTodo', content: string): void
}>()
const createTodo = () => {
  if (inputContent.value.trim() !== '') emits('createTodo', inputContent.value)
}
</script>
<template>
  <input id="input" type="text" class="input" placeholder="What needs to be done?" autocomplete="off"
    v-model="inputContent" @keydown.enter="createTodo">
</template>
<style scoped>
.input {
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 18px;
  color: #333;
}
</style>
