import $i18n from "@/i18n";
import State from "./_state";
import { ActionTree } from "vuex";

const actions: ActionTree<State, State> = {
  clearInfo: ({ commit }) => {
    commit("init");
    commit("user/init");

    localStorage.clear();
  },

  showLoading: ({ state, commit }, data = {}) => {
    let {
      background = void 0,
      size = void 0,
      icon = void 0,
      i18n = void 0,
      color = void 0
    } = data;

    if (!icon) {
      const rand = Math.floor(Math.random() * state.icons.length);
      icon = state.icons[rand];
    }

    commit("setLoading", { show: !0, background, size, icon, i18n, color });
  },

  sayOkay: ({ commit }, key) => {
    const i18n = typeof key === "string" ? { key } : key;

    commit("setNotification", { show: !0, color: "success", i18n });
  },

  sayWhoops: ({ commit }, error) => {
    const { key, values } = error;

    let i18n;

    if (typeof key === "string") i18n = { key, values };
    else if (typeof error === "number") i18n = { key: `errmsg.${error}` };
    else if (typeof error === "string")
      i18n = { key: $i18n.te(`errmsg.${error}`) ? `errmsg.${error}` : error };
    else if (error.constructor === Error)
      i18n = { key: "errmsg.http", values: [error.response.status] };
    else i18n = { key: "errmsg.unknown" };

    commit("setNotification", { show: !0, color: "error", i18n });
  }
};

export default actions;
