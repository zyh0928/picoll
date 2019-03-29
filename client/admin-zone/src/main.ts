import "./style/app.styl";
import App from "./App.vue";
import Util, * as util from "./util";
import Vue from "vue";
import Vuetify from "vuetify";
import i18n from "./i18n";
import router from "./routes";
import store from "./store";

Vue.use(Vuetify, {
  theme: util.getTheme(),
  options: {
    customProperties: !0
  }
});

declare module "vue/types/vue" {
  interface Vue {
    readonly $util: Util;
  }
}
Vue.prototype.$util = util;

Vue.config.errorHandler = async (e, vm) => {
  await vm.$store.dispatch("sayWhoops", e);

  if (typeof e === "number" && e === 1000) {
    await vm.$store.dispatch("clearInfo");
    vm.$router.push("/login");
  }
};

Vue.config.productionTip = !0;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
