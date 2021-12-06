import zh_locale from "./zh.json";
import en_locale from "./en.json";
import { Lang } from "../typings";
import { DEFAULT_LANG, LOCALSTORAGE_KEY } from "../global";

const locales = {
  zh: zh_locale,
  en: en_locale,
};

export function i18nSetup(lang?: string): void {
  const default_lang =
    lang || window.localStorage.getItem(LOCALSTORAGE_KEY) || DEFAULT_LANG;
  window.localStorage.setItem(LOCALSTORAGE_KEY, default_lang);
}

export function getI18nLang(): string {
  return window.localStorage.getItem(LOCALSTORAGE_KEY) || DEFAULT_LANG;
}

export function i18nLocales(): Lang {
  return locales;
}
