import User from "../model/user";
import UserAuth from "../model/user-auth";
import { BaseController, Route } from "./__interface";
import { createHash } from "crypto";
import { getRepository } from "typeorm";
import { userVerify } from "../util";
import { v4 } from "uuid";

export default class UserController implements BaseController {
  root = "user";

  routes: Route[] = [
    {
      method: "get",
      path: "verify",
      unchecked: !0,
      action: async ctx => {
        await userVerify(ctx);

        ctx.body = { result: !0 };
      }
    },

    {
      method: "post",
      path: "register",
      action: async ctx => {
        const {
          account = null,
          password = null,
          nickname = null
        } = ctx.request.body;

        if (!account || !password || !nickname) throw 3;

        const regexAccount = /^[a-zA-Z]\w{5,15}$/g.test(account);
        const regexPassword = /^\S{6,20}$/g.test(password);
        const regexNickname = /^\S{2,12}$/g.test(nickname);
        if (!regexAccount || !regexPassword || !regexNickname) throw 5;

        const userRepository = getRepository(User);

        if (await userRepository.findOne({ account })) throw 1003;

        if (await userRepository.findOne({ nickname })) throw 1004;

        let id = v4();

        for (let index = 0; index < account.length; index++) {
          id = id.slice(0, index * 2) + account[index] + id.slice(index * 2);
        }

        id = id.substr(0, 36);

        const salt = v4();

        const pwd = createHash("md5")
          .update(account + salt + password)
          .digest("hex");

        const auth = new UserAuth();
        auth.id = 14;

        const user = userRepository.create({
          id,
          account,
          password: pwd,
          salt,
          nickname,
          createdAt: Date.now(),
          auth
        });
        const result = await userRepository.save(user);

        ctx.body = { result };
      }
    },

    {
      method: "post",
      path: "login",
      unchecked: !0,
      action: async ctx => {
        const { account = null, password = null } = ctx.request.body;

        if (!account || !password) throw 3;

        const userRepository = getRepository(User);

        let user = await userRepository.findOne(
          { account },
          { select: ["salt"] }
        );
        if (!user) throw 1005;

        const pwd = createHash("md5")
          .update(account + user.salt + password)
          .digest("hex");

        user = await userRepository.findOne(
          {
            account,
            password: pwd
          },
          { select: ["id", "deletedAt"] }
        );

        if (!user) throw 1005;

        if (user.deletedAt) throw 1002;

        user.token = v4();
        user.loginAt = Date.now();

        await userRepository.save(user);

        ctx.body = {
          result: {
            id: user.id,
            token: user.token
          }
        };
      }
    },

    {
      method: "get",
      path: "logout",
      unchecked: !0,
      action: async ctx => {
        const { id } = await userVerify(ctx);

        const userRepository = getRepository(User);

        const user = await userRepository.findOne(id);

        user.token = null;

        await userRepository.save(user);

        ctx.body = { success: !0 };
      }
    },

    {
      method: "get",
      path: "profile",
      action: async ctx => {
        const { id } = ctx.state.user;

        const userRepository = getRepository(User);

        const [user] = await userRepository.find({
          select: [
            "account",
            "nickname",
            "email",
            "phone",
            "createdAt",
            "loginAt"
          ],
          relations: ["auth"],
          where: { id }
        });

        ctx.body = { result: user };
      }
    },

    {
      method: "get",
      path: "list",
      action: async ctx => {
        const userRepository = getRepository(User);
        const result = await userRepository.find();

        ctx.body = { result };
      }
    }
  ];
}
