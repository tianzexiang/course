import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import PersonListView from "../views/PersonListView.vue";
import PersonDetailView from "../views/PersonDetailView.vue";
import PostListView from "../views/PostListView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    redirect: {
      name: "person",
    },
    children: [
      {
        path: "person",
        name: "person",
        component: PersonListView,
      },
      {
        path: "person/view/:id",
        name: "personDetail",
        component: PersonDetailView,
      },
      {
        path: "post",
        name: "post",
        component: PostListView,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
