import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/main",
    name: "Main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
    children: [
      {
        path: "chat",
        name: "Chat",
        component: () =>
          import(/* webpackChunkName: "chat" */ "../components/Main/Chat.vue"),
      },
      {
        path: "anime",
        name: "Anime",
        component: () =>
          import(
            /* webpackChunkName: "anime" */ "../components/Main/Anime.vue"
          ),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: () =>
      import(
        /* webpackChunkName: "pagenotfound" */ "../views/PageNotFound.vue"
      ),
  },
];

const router = createRouter({
  history:
    process.env.NODE_ENV === "production"
      ? createWebHashHistory(process.env.BASE_URL)
      : createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
