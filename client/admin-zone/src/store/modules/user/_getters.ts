import RootState from "@/store/_state";
import State from "./_state";
import { GetterTree } from "vuex";

const getters: GetterTree<State, RootState> = {
  verify: () => `user/verify`,
  login: () => `user/login`,
  logout: () => `user/logout`,
  profile: () => `user/profile`
};

export default getters;
