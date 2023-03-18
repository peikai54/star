import { createRouter, createWebHistory } from "vue-router";
import Project from "../views/Project.vue";

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
          component: Project,
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
        {
          path: "app-template",
          name: "app-template",
          component: () => import("../views/AppTemplate.vue"),
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
