import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import { Files, Setting, User } from "@element-plus/icons-vue";
import "./assets/styles/index.less";
import "element-plus/dist/index.css";

const app = createApp(App);
app.component("icon-user", User);
app.component("icon-files", Files);
app.component("icon-setting", Setting);
app.use(ElementPlus).use(store).use(router).mount("#app");
