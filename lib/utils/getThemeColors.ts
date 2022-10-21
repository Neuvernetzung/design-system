import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import isFunction from "lodash/isFunction";

const asColorObject = (
  input: any
): Exclude<typeof input, Function | undefined> => {
  if (isFunction(input) || !input) throw new Error();
  return input;
};

export const getThemeColors = (color?: string) => {
  const { theme } = resolveConfig(tailwindConfig);

  if (color) return asColorObject(theme?.colors)[color];

  return asColorObject(theme?.colors);
};
