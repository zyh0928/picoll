import RootState from "@/store/_state";
import State from "./_state";
import isEmpty from "lodash/isEmpty";
import { ActionTree } from "vuex";
import { getSign, sendRequest } from "@/util";

const actions: ActionTree<State, RootState> = {
  verify: async ({ state, dispatch, rootGetters: { mapApiRouter } }) => {
    if (isEmpty(getSign())) return !1;

    if (isEmpty(state.profile)) await dispatch("getProfile");

    const resp = await sendRequest(mapApiRouter("user/verify"));

    const { error } = resp.data;

    if (error) throw error;

    return !0;
  },

  login: async ({ rootGetters: { mapApiRouter } }, data) => {
    const resp = await sendRequest(mapApiRouter("user/login"), "post", data);

    const { error, result } = resp.data;

    if (error) throw error;

    localStorage.user = JSON.stringify(result);
  },

  logout: async ({ dispatch, rootGetters: { mapApiRouter } }) => {
    const resp = await sendRequest(mapApiRouter("user/logout"));

    const { error } = resp.data;

    if (error) throw error;

    await dispatch("clearInfo", null, { root: !0 });
  },

  getProfile: async ({ commit, rootGetters: { mapApiRouter } }) => {
    const resp = await sendRequest(mapApiRouter("user/profile"));

    const { error, result } = resp.data;

    if (error) throw error;

    commit("setProfile", result);
  }
};

export default actions;
