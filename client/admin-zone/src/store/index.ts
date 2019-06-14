import State from "./_state";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import actions from "./_actions";
import getters from "./_getters";
import modules from "./modules";
import mutations from "./_mutations";
import { vuexRouterInterceptor } from "@/util";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: new State(),
  getters,
  actions,
  mutations,
  modules,

  plugins: [vuexRouterInterceptor()]
});

export default store;
