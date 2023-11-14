import { MutableRefObject, useEffect, useState } from "react";

export const useRefDimensions = (ref?: MutableRefObject<Element | null>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
