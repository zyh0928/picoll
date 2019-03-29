import { Context } from "koa";
import { userVerify } from "../util";

export const validAuthentication = async (ctx: Context, next: Function) => {
  ctx.state.user = await userVerify(ctx);

  // TODO handle verify user auth
  console.log("call valid auth:", ctx.originalUrl);

  await next();
};
