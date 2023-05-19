import de from "./de";
import en from "./en";

export enum Locales {
  DE = "de",
  EN = "en",
}

const DEFAULT_LOCALE: Locales = Locales.DE;

export const getText = (locale: Locales | undefined) => {
  const locales = { de, en };

  return locales[locale || DEFAULT_LOCALE] || {};
};
