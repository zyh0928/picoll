import State from "./_state";
import cloneDeep from "lodash/cloneDeep";
import { MutationTree } from "vuex";

const { toString } = Object.prototype;

const mutations: MutationTree<State> = {
  init: state => {
    state.profile = {};

    state.list = [];
  },

  setProfile: (state, data) =>
    (state.profile =
      toString.call(data) === "[object Object]" ? cloneDeep(data) : {}),

  setList: (state, data) =>
    (state.list = Array.isArray(data) ? cloneDeep(data) : [])
};

export default mutations;
