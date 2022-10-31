import { Sizes } from "../types";

export const minSize = (size: keyof Sizes, maxSize: keyof Sizes) => {
  const sizes: (keyof Sizes)[] = ["xs", "sm", "md", "lg", "xl"];

  if (!maxSize || !sizes.includes(maxSize)) return size;
  const maxSizeIndex = sizes.indexOf(maxSize);
  const sizeIndex = sizes.indexOf(size);
  if (maxSizeIndex > sizeIndex) return maxSize;
  return size;
};
