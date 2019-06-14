import RootState from "@/store/_state";
import State from "./_state";
import isEmpty from "lodash/isEmpty";
import { ActionTree } from "vuex";
import { getSign, sendRequest } from "@/util";

const actions: ActionTree<State, RootState> = {
  verify: async ({ state, dispatch, rootGetters: { mapApiRouter } }) => {
    if (isEmpty(getSign())) return !1;

    if (isEmpty(state.profile)) await dispatch("getProfile");

    return await sendRequest(mapApiRouter("user/verify"));
  },

  login: async ({ rootGetters: { mapApiRouter } }, data) => {
    const result = await sendRequest(mapApiRouter("user/login"), "post", data);

    localStorage.user = JSON.stringify(result);
  },

  logout: async ({ dispatch, rootGetters: { mapApiRouter } }) => {
    await sendRequest(mapApiRouter("user/logout"));
    await dispatch("clearInfo", null, { root: !0 });
  },

  getProfile: async ({ commit, rootGetters: { mapApiRouter } }) =>
    commit("setProfile", await sendRequest(mapApiRouter("user/profile")))
};

export default actions;
