<template>
  <div>
    <div>
      <input v-model="firstName" placeholder="firstNameInput" />
      <input v-model="lastName" placeholder="lastNameInput" />
      {{ fullName }}
      {{ getFullName() }}
    </div>
    <HelloWorld :user="user" />
    <button @click="toggle">开关</button>
    <h1>鹅【v-if】</h1>
    <template v-if="visible">
      <p v-for="item in list" :key="item + 'v-if'">{{ item }}</p>
    </template>
    <h1>鹅【v-show】</h1>
    <p v-show="visible" v-for="item in list" :key="item + 'v-show'">
      {{ item }}
    </p>
    <input type="text" placeholder="打个招呼吧" v-model="msg" /><button
      @click="greet"
    >
      打招呼
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from "./components/HelloWorld.vue";
import { IUser } from './types';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      list: ["鹅鹅鹅", "曲项向天歌", "白毛浮绿水", "红掌拨清波"],
      visible: false,
      msg: "",
      firstName: "Foo",
      lastName: "Bar",
      user: {
        name: "",
        age: 0
      } as IUser
    };
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    greet() {
      alert(this.msg || "hello");
    },
    getFullName() {
      console.log("getFullName 执行了");
      return this.firstName + " " + this.lastName;
    },
  },
  computed: {
    fullName(): string {
      console.log("computed fullName 执行了");
      return this.firstName + " " + this.lastName;
    },
  },
  created() {
    this.user.name = this.fullName;
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
