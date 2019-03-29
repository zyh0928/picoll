import State from "./_state";
import { MutationTree } from "vuex";

const mutations: MutationTree<State> = {
  init: state => {
    state.drawer = !0;

    state.loading = { icon: "heart", i18n: {} };
  },

  showDrawer: state => (state.drawer = !0),

  setLoading: (state, data = {}) => {
    let {
      show = !1,
      background = "rgba(255,255,255,0.5)",
      size = 200,
      icon = "heart",
      i18n = {},
      color = "primary"
    } = data;

    if (!show) {
      background = state.loading.background || "rgba(255,255,255,0.5)";
      size = state.loading.size || 200;
      icon = state.loading.icon || "heart";
      i18n = state.loading.i18n || {};
      color = state.loading.color || "primary";
    }

    state.loading = {
      show,
      background,
      size,
      icon,
      i18n,
      color
    };
  },

  setNotification: (state, data = {}) => {
    const {
      show = !1,
      color = void 0,
      i18n = {},
      x = void 0,
      y = void 0,
      time = 6000
    } = data;

    state.notification = {
      show,
      color,
      i18n,
      x,
      y,
      time
    };
  }
};

export default mutations;
