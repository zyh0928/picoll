import State from "@/store/_state";
import router from "@/routes";
import { Store } from "vuex";

let reverify = !0;

export default () => ({ commit, dispatch }: Store<State>) =>
  router.beforeEach(async (to, from, next) => {
    try {
      if (!reverify) {
        reverify = !0;
        commit("setLoading");
        next();
        return;
      }

      await dispatch("showLoading");
      const valid = await dispatch("user/verify");

      const { name } = to;

      if (valid && name === "login") {
        reverify = !1;
        next("/home");
        return;
      }

      if (!valid && name !== "login") {
        await dispatch("clearInfo");
        reverify = !1;
        next("/login");
        return;
      }

      commit("setLoading");
      next();
    } catch (e) {
      await dispatch("sayWhoops", e);

      if (typeof e === "number" && e === 1000) {
        await dispatch("clearInfo");
        reverify = !1;
        next("/login");
        return;
      }

      commit("setLoading");
      next();
    }
  });
