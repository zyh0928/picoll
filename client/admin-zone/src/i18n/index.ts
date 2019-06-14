import VeeValidate from "vee-validate";
import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./en";
import enValidation from "./en/_validation";
import zhHans from "./zh-Hans";
import zhHansValidation from "./zh-Hans/_validation";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh-Hans",
  fallbackLocale: "zh-Hans",
  // silentTranslationWarn: !0,
  messages: {
    "zh-Hans": zhHans,
    en: en
  }
});

Vue.use(VeeValidate, {
  // i18nRootKey: "validation",
  i18n,
  dictionary: {
    "zh-Hans": {
      messages: zhHansValidation,
      attributes: zhHans.model
    },
    en: {
      messages: enValidation,
      attributes: en.model
    }
  }
});

export default i18n;
