import * as KoaRouter from "koa-router";
import User from "./_user";
import UserAuth from "./_user-auth";
import { validAuthentication } from "./interceptor";

const controllers = [new User(), new UserAuth()];

const routers: KoaRouter[] = [];
routers.push(
  new KoaRouter().get(
    "/admin/eco",
    async ctx => (ctx.body = { NODE_ENV: process.env.NODE_ENV })
  )
);

controllers.forEach(({ root, routes }) => {
  const router = new KoaRouter({ prefix: `/admin/${root}/` });

  routes.forEach(({ method, path, unchecked, action }) => {
    if (unchecked) router[method](path, action);
    else router[method](path, validAuthentication, action);
  });

  routers.push(router);
});

export { routers };
