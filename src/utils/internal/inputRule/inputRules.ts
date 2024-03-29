import isBoolean from "lodash/isBoolean";
import isNumber from "lodash/isNumber";
import isRegExp from "lodash/isRegExp";
import isString from "lodash/isString";
import type { ValidationRule } from "react-hook-form";

import type {
  MaxLengthRule,
  MaxRule,
  MinLengthRule,
  MinRule,
  PatternRule,
  RequiredRule,
} from "../../../components";
import { getText, type Locale } from "../../../locales/getText";

export const baseInputRule = <T extends ValidationRule>(
  rule: T | undefined,
  customMessage: string
) => {
  if (rule === undefined) return undefined;
  if (isString(rule)) {
    return { value: true, message: rule } as T;
  }
  if (isBoolean(rule) || isNumber(rule) || isRegExp(rule)) {
    return { value: rule, message: customMessage } as T;
  }

  return rule;
};

export const requiredInputRule = (required?: RequiredRule, locale?: Locale) =>
  baseInputRule<RequiredRule>(required, getText(locale).required);

export const minLengthInputRule = (
  minLength?: MinLengthRule,
  locale?: Locale
) =>
  baseInputRule<MinLengthRule>(
    minLength,
    getText(locale).minLength(
      isNumber(minLength) ? minLength?.toString() : minLength?.value?.toString()
    )
  );

export const maxLengthInputRule = (
  maxLength?: MaxLengthRule,
  locale?: Locale
) =>
  baseInputRule<MaxLengthRule>(
    maxLength,
    getText(locale).maxLength(
      isNumber(maxLength) ? maxLength?.toString() : maxLength?.value?.toString()
    )
  );

export const minInputRule = (min?: MinRule, locale?: Locale) =>
  baseInputRule<MinRule>(
    min,
    getText(locale).min(
      isNumber(min) || isString(min) ? min?.toString() : min?.value?.toString()
    )
  );

export const maxInputRule = (max?: MaxRule, locale?: Locale) =>
  baseInputRule<MaxRule>(
    max,
    getText(locale).max(
      isNumber(max) || isString(max) ? max?.toString() : max?.value?.toString()
    )
  );

export const patternInputRule = (pattern?: PatternRule, locale?: Locale) =>
  baseInputRule<PatternRule>(pattern, getText(locale).pattern);

export const validationInputResult = <T>(value: T, message?: string) => {
  if (message && !value) return message;
  return value;
};
