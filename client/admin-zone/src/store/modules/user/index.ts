import RootState from "@/store/_state";
import State from "./_state";
import getters from "./_getters";
import actions from "./_actions";
import mutations from "./_mutations";
import { Module } from "vuex";

const user: Module<State, RootState> = {
  namespaced: !0,

  state: new State(),
  getters,
  actions,
  mutations
};

export default user;
