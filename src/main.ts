import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//a simple i18n service
import i18nPlugin from "./plugins/i18n";
import { i18nSetup, i18nLocales } from "./locales/index";

i18nSetup();
const locales = i18nLocales();

createApp(App).use(store).use(router).use(i18nPlugin, locales).mount("#app");
