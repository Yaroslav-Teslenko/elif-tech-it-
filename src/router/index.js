//import { createRouter, createWebHistory } from "vue-router";
import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
//import Home from "../views/Home.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    // разделение кода на уровне маршрута
    // генерирует отдельный фрагмент (login. [hash] .js) для этого маршрута
    // который lazy-загружается при посещении маршрута.
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Record.vue"),
  },
];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
// проверяем перед перед переходом, есть ли аутентификация,
// если нет, то роут на  /login
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});
export default router;
