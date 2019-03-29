import cloneDeep from "lodash/cloneDeep";
import getSign from "./_get-sign";
import getTheme from "./_get-theme";
import isEmpty from "lodash/isEmpty";
import parseDate from "./_parse-date";
import sendRequest from "./_send-request";
import vuexRouterInterceptor from "./_vuex-router-interceptor";

export {
  cloneDeep,
  getSign,
  getTheme,
  isEmpty,
  parseDate,
  sendRequest,
  vuexRouterInterceptor
};

export const sleep = (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

export default interface Util {
  cloneDeep: Function;
  getSign: Function;
  getTheme: Function;
  isEmpty: Function;
  parseDate: Function;
  sendRequest: Function;
  sleep: Function;
  vuexRouterInterceptor: Function;
}
