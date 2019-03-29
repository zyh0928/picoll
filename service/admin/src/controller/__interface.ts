import { Context } from "koa";

export interface Route {
  method: string;
  path: string;
  unchecked?: boolean;
  action(ctx: Context): void;
}

export interface BaseController {
  root: string;

  routes: Route[];
}
