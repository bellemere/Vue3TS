import { App } from "vue";
import { Lang } from "../typings";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $translate: (key: string) => string;
  }
}

export default {
  install: (app: App, options: Lang): void => {
    app.config.globalProperties.$translate = (key: string) => {
      return key.split(".").reduce((o, i) => {
        return o[i] as Lang;
      }, options);
    };
  },
};
