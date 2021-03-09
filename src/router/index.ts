import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Root",
    components: {
      Home: () => import("@/views/Home.vue"),
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
