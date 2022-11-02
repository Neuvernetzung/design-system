import isFunction from "lodash/isFunction";
import resolveConfig from "tailwindcss/resolveConfig";

import type { Config } from "tailwindcss";
import tailwindConfig from "../../tailwind.config";

const asColorObject = (
  input: any
): Exclude<typeof input, Function | undefined> => {
  if (isFunction(input) || !input) throw new Error();
  return input;
};

export const getThemeColors = (color?: string) => {
  const { theme } = resolveConfig(tailwindConfig as Config);

  if (color) return asColorObject(theme?.colors)[color];

  return asColorObject(theme?.colors);
};
