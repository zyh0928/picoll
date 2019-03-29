import UserAuth from "../model/user-auth";
import { BaseController, Route } from "./__interface";
import { getRepository } from "typeorm";

export default class UserAuthController implements BaseController {
  root = "user-auth";

  routes: Route[] = [
    {
      method: "get",
      path: "list",
      unchecked: !0,
      action: async ctx => {
        const userAuthRepository = getRepository(UserAuth);
        const result = await userAuthRepository.find();

        ctx.body = { result };
      }
    },

    {
      method: "get",
      path: "find/:id",
      unchecked: !0,
      action: async ctx => {
        const userAuthRepository = getRepository(UserAuth);
        const result = await userAuthRepository.findOne(ctx.params.id);

        ctx.body = { result };
      }
    }
  ];
}
