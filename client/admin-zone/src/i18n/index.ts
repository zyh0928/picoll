import VeeValidate from "vee-validate";
import Vue from "vue";
import VueI18n from "vue-i18n";
import enUS from "./en-US";
import enUSValidation from "./en-US/_validation";
import zhCN from "./zh-CN";
import zhCNValidation from "./zh-CN/_validation";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh-CN",
  fallbackLocale: "zh-CN",
  // silentTranslationWarn: !0,
  messages: {
    "zh-CN": zhCN,
    "en-US": enUS
  }
});

Vue.use(VeeValidate, {
  // i18nRootKey: "validation",
  i18n,
  dictionary: {
    "zh-CN": {
      messages: zhCNValidation,
      attributes: zhCN.model
    },
    "en-US": {
      messages: enUSValidation,
      attributes: enUS.model
    }
  }
});

export default i18n;
