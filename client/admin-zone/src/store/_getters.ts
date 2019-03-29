import State from "./_state";
import { GetterTree } from "vuex";

const getters: GetterTree<State, State> = {
  mapApiRouter: (state, getters) => (path: string, ...args: any) =>
    state["domain.api"] +
    (typeof getters[path] === "string" ? getters[path] : getters[path](...args))
};

export default getters;
