import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
      children: [
        {
          path: "project",
          name: "project",
          component: import("../views/Project.vue"),
        },
        {
          path: "story",
          name: "story",
          component: () => import("../views/Story.vue"),
        },
        {
          path: "user",
          name: "user",
          component: () => import("../views/UserInfo.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
  ],
});

export default router;
