import User from "../model/user";
import { Context } from "koa";
import { getRepository } from "typeorm";

export default async (ctx: Context) => {
  const id = ctx.get("user-id");
  const token = ctx.get("user-token");

  if (!id || !token) throw 2;

  const userRepository = getRepository(User);

  const [user] = await userRepository.find({
    select: ["token"],
    relations: ["auth"],
    where: { id }
  });

  if (!user || token !== user.token) throw 1000;

  return { id, token };
};
