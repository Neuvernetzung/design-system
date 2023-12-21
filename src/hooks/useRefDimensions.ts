import { MutableRefObject, useEffect, useState } from "react";

type UseRefDimensionValue = { width: number; height: number };

export type UseRefDimensionOptions = {
  defaultValue?: UseRefDimensionValue;
};

export const useRefDimensions = (
  ref?: MutableRefObject<Element | null>,
  options?: UseRefDimensionOptions
): UseRefDimensionValue => {
  const [dimensions, setDimensions] = useState(
    options?.defaultValue || { width: 0, height: 0 }
  );

  const recalculateDimensions = () => {
    if (ref?.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      setDimensions({ width, height });
    }
  };

  useEffect(recalculateDimensions, [ref]);

  useEffect(() => {
    window.addEventListener("resize", recalculateDimensions);
  }, []);
  return dimensions;
};
