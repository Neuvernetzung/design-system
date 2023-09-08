import { type Size, sizes } from "../types";

export const capSize = (size: Size, maxSize: Size) => {
  if (!maxSize || !sizes.includes(maxSize)) return size;
  const maxSizeIndex = sizes.indexOf(maxSize);
  const sizeIndex = sizes.indexOf(size);
  if (maxSizeIndex < sizeIndex) return maxSize;
  return size;
};

export const minSize = (size: Size, minSize: Size) => {
  if (!minSize || !sizes.includes(minSize)) return size;
  const minSizeIndex = sizes.indexOf(minSize);
  const sizeIndex = sizes.indexOf(size);
  if (minSizeIndex > sizeIndex) return minSize;
  return size;
};

export const smallerSize = (size: Size) => {
  const sizeIndex = sizes.indexOf(size);
  if (sizeIndex === 0) return size;
  return sizes[sizeIndex - 1];
};
