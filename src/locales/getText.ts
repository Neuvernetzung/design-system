import de from "./de";
import en from "./en";

export const locales = ["de", "en"] as const;

export type Locales = typeof locales;

export type Locale = Locales[number];

const DEFAULT_LOCALE: Locale = "de";

export const getText = (locale: Locale | undefined) => {
  const locales = { de, en };

  return locales[locale || DEFAULT_LOCALE] || {};
};
