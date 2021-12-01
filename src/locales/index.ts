import zh_locale from "./zh.json";
import en_locale from "./en.json";
import { Lang } from "../typings";

const DEFAULT_LANG = "zh";
const LOCALSTORAGE_KEY = "language_key";

const locales = {
  zh: zh_locale,
  en: en_locale,
};

/* eslint-disable */
export function i18nSetup(lang?: string): Lang {
  const setting_lang: string =
    lang || window.localStorage.getItem(LOCALSTORAGE_KEY) || DEFAULT_LANG;
  window.localStorage.setItem(LOCALSTORAGE_KEY, setting_lang);

  return locales[setting_lang as keyof typeof locales];
}
