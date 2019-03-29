import Router from "vue-router";
import Vue from "vue";
import { routes } from "./list";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
