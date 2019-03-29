import Home from "@/view/home/index.vue";
import Login from "@/view/login/index.vue";

export const routes = [
  {
    path: "*",
    name: "notFound",
    component: () => import("@/view/error/404.vue")
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  }
];
