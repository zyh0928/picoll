import "reflect-metadata";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";
import { createConnection } from "typeorm";
import { routers } from "./controller";

createConnection()
  .then(async connection => {
    const app = new Koa();

    app.use(
      cors({
        origin: "https://admin.wjbzg.com",
        maxAge: 600
      })
    );

    app.use(bodyParser());

    // handle global exception
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        let content: any;

        if (typeof e === "number")
          content = {
            error: e
          };
        else
          content = {
            error: 9999,
            path: ctx.originalUrl,
            info: e
          };

        ctx.body = content;
      }
    });

    routers.forEach(router =>
      app.use(router.routes()).use(router.allowedMethods())
    );

    // handle http 404 error
    app.use(async ctx => {
      if (ctx.status === 404) throw 1;
    });

    const port = process.env.NODE_ENV === "development" ? 9028 : 9901;
    app.listen(port);
    console.log("Admin service is running on port", port);
  })
  .catch(e => console.log("TypeORM connection error:", e));
