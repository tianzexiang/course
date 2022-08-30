<template>
  <header>
    <div class="title">TS Todo</div>
    <input
      id="input"
      type="text"
      class="input"
      placeholder="What needs to be done?"
      autoComplete="off"
      v-model="value"
      @keydown.enter="keyPress"
    />
  </header>
  <section id="todos">
    <!-- 在这里 onToggle 与 onDelete 是通过props的方式传入，但是它们实际上是一个事件 event -->
    <!-- 这样的写法不是最佳实践，在Vue中使用emit由子组件向父组件抛出event更加合适，而不是回调函数 -->
    <TodoItem
      v-for="(todo, index) in todos"
      :key="todo.content + index"
      :todo="todo"
      :onToggle="() => toggleItem(todo)"
      :onDelete="() => delItem(index)"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoItem from "./components/TodoItem.vue";
import "./assets/styles/main.css";
import "./assets/styles/iconfont.css";
import { ITodo } from "./types";
export default defineComponent({
  name: "App",
  components: {
    TodoItem,
  },
  data() {
    return {
      value: "",
      todos: [] as ITodo[],
    };
  },
  methods: {
    dump() {
      let json = JSON.stringify(this.todos);
      localStorage.setItem("todos", json);
    },
    keyPress() {
      let value = this.value.trim();
      if (value !== "") {
        this.todos.push({
          content: value,
          finished: false,
        });
        this.value = "";
        this.dump();
      }
    },
    delItem(index: number) {
      this.todos.splice(index, 1);
      this.dump();
    },
    toggleItem(todo: ITodo) {
      todo.finished = !todo.finished;
      this.dump();
    },
  },
  created() {
    try {
      let _todos = localStorage.getItem("todos");
      if (_todos) {
        let todos: ITodo[] = JSON.parse(_todos);
        this.todos = todos;
      }
    } catch (error) {
      console.log("invalid cache");
    }
  },
});
</script>
