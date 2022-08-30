<template>
  <div>
    <div>
      <input v-model="firstName" placeholder="firstNameInput" />
      <input v-model="lastName" placeholder="lastNameInput" />
      {{ fullName }}
      {{ getFullName() }}
      <HelloWorld :name="fullName" />
    </div>
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

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      list: ["鹅鹅鹅", "曲项向天歌", "白毛浮绿水", "红掌拨清波"],
      visible: false,
      msg: "",
      firstName: "Foo",
      lastName: "Bar",
      // fullName: "",
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
    fullName() {
      console.log("computed fullName 执行了");
      return this.firstName + " " + this.lastName;
    },
  },
  watch: {
    // 完整写法
    // firstName: {
    //   // 是否初次加载就监听，默认是false
    //   immediate: true,
    //   // 是否深度监听，默认是false，当监听的是一个对象时，需要监听其中的参数，就需要deep
    //   deep: true,
    //   handler(newVal, oldVal) {
    //     console.log(oldVal);
    //     this.fullName = newVal + " " + this.lastName;
    //   },
    // },
    // 简写
    // firstName(newVal, oldVal) {
    //   console.log(oldVal);
    //   this.fullName = newVal + ' ' + this.lastName;
    // },
    // lastName(newVal, oldVal) {
    //   console.log(oldVal);
    //   this.fullName = this.firstName + " " + newVal;
    // },
  },
};
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
