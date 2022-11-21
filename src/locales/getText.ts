import de from "./de";
import en from "./en";

const DEFAULT_LOCALE = "de";

interface Locales {
  de: any;
  en: any;
}

export const getText = (locale: keyof Locales) => {
  const locales = { de, en };

  return locales[locale || DEFAULT_LOCALE] || {};
};
