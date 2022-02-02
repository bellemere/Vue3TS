import { App } from "vue";
import { Lang } from "../typings";
import { DEFAULT_LANG, LOCALSTORAGE_KEY } from "../global";

export default {
  install: (app: App, options: Lang): void => {
    app.config.globalProperties.$translate = (key: string) => {
      const lang = options[
        window.localStorage.getItem(LOCALSTORAGE_KEY) || DEFAULT_LANG
      ] as Lang;
      return key.split(".").reduce((o, i) => {
        return o[i] as Lang;
      }, lang);
    };
  },
};
