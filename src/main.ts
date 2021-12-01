import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//a simple i18n service
import i18nPlugin from "./plugins/i18n";
import { i18nSetup } from "./locales/index";

const lang = i18nSetup("zh");

createApp(App).use(store).use(router).use(i18nPlugin, lang).mount("#app");
